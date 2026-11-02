import { afterEach, describe, expect, test } from "bun:test";

import { formatSlotSelectionLine } from "../connect/slot-display";
import { labCapabilityCaller, labSlotStarts } from "./fixtures/write-scenarios";
import {
  CapabilityRequestError,
  WRITE_ERROR_COPY,
  fetchCapability,
  groupSlotsByDay,
  identityForAttempt,
  isSettledWrite,
  timeZoneNames,
  writeErrorMessage,
} from "./write-flow";

const realFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = realFetch;
});

const stubFetch = (impl: () => Promise<Response>) => {
  globalThis.fetch = Object.assign(impl, {
    preconnect: () => {},
  }) as unknown as typeof fetch;
};

describe("fetchCapability", () => {
  test("network failure throws a network error", async () => {
    stubFetch(() => Promise.reject(new TypeError("Failed to fetch")));
    const call = fetchCapability();
    const error = await call({ input: {}, operation: "book_call" }).catch(
      (error: unknown) => error
    );
    expect(error).toBeInstanceOf(CapabilityRequestError);
    expect(writeErrorMessage(error)).toBe(WRITE_ERROR_COPY.network);
  });

  test("non-JSON 5xx throws a server error", async () => {
    stubFetch(() =>
      Promise.resolve(new Response("<html>Bad gateway</html>", { status: 502 }))
    );
    const error = await fetchCapability()({
      input: {},
      operation: "send_note",
    }).catch((error: unknown) => error);
    expect((error as CapabilityRequestError).kind).toBe("server");
    expect(writeErrorMessage(error)).toBe(WRITE_ERROR_COPY.server);
  });

  test("JSON 4xx returns the payload so its message can show", async () => {
    stubFetch(() =>
      Promise.resolve(
        Response.json({ message: "Unknown operation." }, { status: 400 })
      )
    );
    const payload = await fetchCapability()({ input: {}, operation: "x" });
    expect(payload.message).toBe("Unknown operation.");
    expect(isSettledWrite(payload)).toBe(false);
  });
});

describe("identityForAttempt", () => {
  const payload = { email: "a@example.com", name: "Ada" };
  let created = 0;
  const create = () => {
    created += 1;
    return `new-${created}`;
  };

  test("first attempt and retries of the same draft keep one identity", () => {
    const first = identityForAttempt({
      create,
      payload,
      state: { fingerprint: null, identity: "draft-1" },
    });
    expect(first.identity).toBe("draft-1");
    const retry = identityForAttempt({
      create,
      payload: { name: "Ada", email: "a@example.com" },
      state: first,
    });
    expect(retry.identity).toBe("draft-1");
    expect(created).toBe(0);
  });

  test("a changed payload starts a new identity", () => {
    const next = identityForAttempt({
      create,
      payload: { ...payload, name: "Grace" },
      state: { fingerprint: JSON.stringify(payload), identity: "draft-1" },
    });
    expect(next.identity).not.toBe("draft-1");
  });
});

describe("groupSlotsByDay", () => {
  test("shows the next three days and puts the rest behind More times", () => {
    const now = new Date("2026-11-02T12:00:00Z");
    const starts = labSlotStarts(now);
    const { more, soon } = groupSlotsByDay({
      now,
      starts: [...starts, starts[0], "2026-11-01T15:00:00Z"],
      timeZone: "UTC",
    });
    expect(soon).toHaveLength(3);
    expect(more).toHaveLength(2);
    expect(soon[0].starts).toHaveLength(4);
    expect(soon[0].label).toBe("Tue, Nov 3");
  });
});

describe("time zone names", () => {
  test("copy names the same zone abbreviation slot labels use", () => {
    const start = "2026-11-03T15:00:00Z";
    for (const timeZone of ["America/Costa_Rica", "America/Denver", "UTC"]) {
      const names = timeZoneNames({ date: new Date(start), timeZone });
      const label = formatSlotSelectionLine({ duration: 30, start, timeZone });
      expect(label.endsWith(` ${names.short}`)).toBe(true);
    }
  });
});

describe("lab write scenarios", () => {
  test("failure fails once at the network, then confirms on retry", async () => {
    const calls: string[] = [];
    const call = labCapabilityCaller("failure", (entry) =>
      calls.push(entry.operation)
    );
    const request = { input: {}, operation: "book_call" };
    expect(await call(request).catch((error: unknown) => error)).toBeInstanceOf(
      CapabilityRequestError
    );
    expect(isSettledWrite(await call(request))).toBe(true);
    expect(calls).toEqual(["book_call", "book_call"]);
  });

  test("availability error rejects instead of returning an empty list", async () => {
    const call = labCapabilityCaller("availability-error", () => {});
    const result = await call({
      input: {},
      operation: "list_availability",
    }).catch((error: unknown) => error);
    expect(result).toBeInstanceOf(CapabilityRequestError);
  });
});
