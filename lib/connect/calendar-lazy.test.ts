import { afterEach, describe, expect, test } from "bun:test";

import { runCapability } from "../capabilities/registry";
import { capabilityContextFromRequest } from "../capabilities/server-context";
import { googleCalendar } from "./calendar";
import { memoryCapStore } from "./caps";
import { CALENDAR_UNCONNECTED } from "./copy";

const saved = {
  id: process.env.GOOGLE_CALENDAR_ID,
  json: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
};

afterEach(() => {
  if (saved.id === undefined) delete process.env.GOOGLE_CALENDAR_ID;
  else process.env.GOOGLE_CALENDAR_ID = saved.id;
  if (saved.json === undefined) delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  else process.env.GOOGLE_SERVICE_ACCOUNT_JSON = saved.json;
});

describe("calendar configuration is resolved lazily", () => {
  test("read-only capabilities work without calendar env", async () => {
    delete process.env.GOOGLE_CALENDAR_ID;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    expect(() => googleCalendar()).not.toThrow();
    const result = (await runCapability({
      context: capabilityContextFromRequest({
        correlationId: "lazy",
        ip: "127.0.0.1",
      }),
      input: {},
      name: "get_profile",
    })) as { data?: unknown };
    expect(result.data).toBeDefined();
  });

  test("calendar operations still report the missing configuration", async () => {
    delete process.env.GOOGLE_CALENDAR_ID;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    await expect(
      googleCalendar().freeBusy({
        timeMax: "2026-11-01T00:00:00Z",
        timeMin: "2026-10-31T00:00:00Z",
      })
    ).rejects.toThrow("calendar-unconfigured");
  });

  test("book_call fails cleanly when the calendar is not configured", async () => {
    delete process.env.GOOGLE_CALENDAR_ID;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const result = (await runCapability({
      // In-memory store: never writes to the live rate-limit store.
      context: {
        ...capabilityContextFromRequest({
          correlationId: "lazy-book",
          ip: "127.0.0.1",
        }),
        store: memoryCapStore(),
      },
      input: {
        description: "Discuss a GenUI project.",
        duration: 30,
        email: "visitor@example.test",
        name: "Visitor",
        retryIdentity: "lazy-calendar-book-1",
        start: "2026-11-02T16:00:00.000Z",
        timeZone: "America/Denver",
      },
      name: "book_call",
    })) as { message?: string; status?: string };
    expect(result.status).toBe("failed");
    expect(result.message).toBe(CALENDAR_UNCONNECTED);
  });
});
