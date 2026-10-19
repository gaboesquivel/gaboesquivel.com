import { describe, expect, test } from "bun:test";

import { memoryCapStore } from "./caps";
import { STORE_UNAVAILABLE_NOTE } from "./copy";
import { sendNote } from "./note";

const noteInput = {
  description: "Discuss the lending integration and where it is stuck.",
  email: "ada@example.com",
  name: "Ada",
};

describe("sendNote", () => {
  test("does not call the mailer when the store is unavailable", async () => {
    let called = false;
    const result = await sendNote({
      input: noteInput,
      ip: "127.0.0.1",
      mailer: async () => {
        called = true;
      },
      now: new Date("2026-10-19T12:00:00.000Z"),
      store: null,
    });
    expect(result).toEqual({
      message: STORE_UNAVAILABLE_NOTE,
      ok: false,
      sent: false,
    });
    expect(called).toBe(false);
  });

  test("calls the mailer when the store is available", async () => {
    let called = false;
    const result = await sendNote({
      input: noteInput,
      ip: "127.0.0.1",
      mailer: async () => {
        called = true;
      },
      now: new Date("2026-10-19T12:00:00.000Z"),
      store: memoryCapStore(),
    });
    expect(result.sent).toBe(true);
    expect(called).toBe(true);
  });
});
