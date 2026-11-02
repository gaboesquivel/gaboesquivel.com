import { describe, expect, test } from "bun:test";

import { composeQuery } from "lib/genui/compose";

import {
  announcementFor,
  errorFromEvent,
  errorFromHttp,
  searchError,
} from "./compose-outcome";
import { searchCopy } from "./copy";

describe("typed search errors", () => {
  test("429 shows the server's message", () => {
    expect(errorFromHttp(429, "Daily search limit reached.")).toEqual({
      kind: "rate_limited",
      message: "Daily search limit reached.",
    });
  });

  test("429 without a message falls back to the copy table", () => {
    expect(errorFromHttp(429).message).toBe(searchCopy.errorRateLimited);
  });

  test("a deadline event reads as timed out", () => {
    expect(errorFromEvent({ code: "timed_out", type: "error" })).toEqual({
      kind: "timed_out",
      message: "That took too long. Try again.",
    });
  });

  test("anything else is unavailable, never internal copy", () => {
    for (const error of [
      errorFromHttp(500),
      errorFromHttp(400, "Query is required."),
      errorFromEvent({ message: "Composition failed.", type: "error" }),
    ]) {
      expect(error).toEqual({
        kind: "failed",
        message: "Search is unavailable right now.",
      });
    }
  });
});

describe("announcements", () => {
  test("only a result announces Results ready.", () => {
    expect(announcementFor({ error: null, status: "result" })).toBe(
      "Results ready."
    );
    expect(announcementFor({ error: null, status: "empty" })).toBe(
      "No answer for that on this site."
    );
    expect(
      announcementFor({ error: searchError("timed_out"), status: "error" })
    ).toBe(searchCopy.errorTimedOut);
    expect(announcementFor({ error: null, status: "composing" })).toBe(
      "Composing results…"
    );
    expect(announcementFor({ error: null, status: "idle" })).toBe("");
  });
});

describe("compose stream", () => {
  test("an unmatched query ends in an empty event, not an error", async () => {
    // No model keys: the stream must settle without a paid call.
    const keys = [
      "AI_GATEWAY_API_KEY",
      "ANTHROPIC_API_KEY",
      "TYPESAFE_API_KEY",
    ];
    const previous = Object.fromEntries(
      keys.map((key) => [key, process.env[key]])
    );
    for (const key of keys) Reflect.deleteProperty(process.env, key);
    try {
      const result = await composeQuery({
        context: { correlationId: "empty-test" } as never,
        input: {
          clientRequestId: "empty-test",
          query: "zzqx vvbn wwpl",
          version: 1,
        },
      });
      const types = result.events.map((event) => event.type);
      expect(types).not.toContain("error");
      expect(types).not.toContain("complete");
      expect(types.at(-1)).toBe("empty");
    } finally {
      for (const key of keys) {
        if (previous[key] !== undefined) process.env[key] = previous[key];
      }
    }
  });
});
