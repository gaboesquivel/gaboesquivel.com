import { describe, expect, test } from "bun:test";

import type { CalendarClient } from "../connect/calendar";
import { memoryCapStore } from "../connect/caps";
import { cvDownloadPayload } from "../connect/cv-download";
import { capabilityRegistry, runCapability } from "./registry";
import type { CapabilityContext } from "./types";

const calendarStub: CalendarClient = {
  freeBusy: async () => [],
  get: async () => null,
  insert: async () => ({ id: "evt-1" }),
};

const baseContext = (): CapabilityContext => ({
  calendar: calendarStub,
  clock: new Date("2026-10-19T15:00:00.000Z"),
  correlationId: "req-test",
  ip: "127.0.0.1",
  mailer: async () => ({ providerId: "mail-1" }),
  rateLimitEnforced: false,
  store: memoryCapStore(),
});

describe("public capabilities", () => {
  test("registry exposes nine operations", () => {
    expect(Object.keys(capabilityRegistry).sort()).toEqual([
      "book_call",
      "contact_gabo",
      "get_cv",
      "get_profile",
      "list_availability",
      "list_projects",
      "list_writing",
      "search_site",
      "send_note",
    ]);
  });

  test("get_cv returns canonical CV payload", async () => {
    const result = await runCapability({
      context: baseContext(),
      input: { focus: "ai" },
      name: "get_cv",
    });
    expect(result).toMatchObject({
      operation: "get_cv",
      status: "ok",
      data: cvDownloadPayload({ focus: "ai" }),
    });
  });

  test("search_site returns empty without inventing evidence", async () => {
    const result = await runCapability({
      context: baseContext(),
      input: { query: "zzzznotarealqueryzzzz" },
      name: "search_site",
    });
    expect(result).toMatchObject({
      operation: "search_site",
      status: "empty",
      data: { results: [] },
    });
  });

  test("send_note confirms without duplicate provider writes", async () => {
    let sends = 0;
    const context = {
      ...baseContext(),
      mailer: async () => {
        sends += 1;
        return { providerId: "mail-1" };
      },
    };
    const payload = {
      description: "Discuss the lending integration and timeline.",
      email: "ada@example.com",
      name: "Ada",
      retryIdentity: "retry-note-12345678",
    };
    const first = await runCapability({
      context,
      input: payload,
      name: "send_note",
    });
    const second = await runCapability({
      context,
      input: payload,
      name: "send_note",
    });
    expect(first).toMatchObject({ status: "confirmed" });
    expect(second).toMatchObject({ status: "confirmed" });
    expect(sends).toBe(1);
  });

  test("rejects changed payload under the same retry identity", async () => {
    const context = baseContext();
    const identity = "retry-note-abcdefgh";
    await runCapability({
      context,
      input: {
        description: "First note body long enough to send.",
        email: "ada@example.com",
        name: "Ada",
        retryIdentity: identity,
      },
      name: "send_note",
    });
    const changed = await runCapability({
      context,
      input: {
        description: "Different note body still long enough.",
        email: "ada@example.com",
        name: "Ada",
        retryIdentity: identity,
      },
      name: "send_note",
    });
    expect(changed).toMatchObject({ status: "failed" });
  });
});
