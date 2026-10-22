import { describe, expect, test } from "bun:test";

import { memoryCapStore } from "./caps";
import { NOTE_CAP, STORE_UNAVAILABLE_NOTE } from "./copy";
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
        return {};
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
        return {};
      },
      now: new Date("2026-10-19T12:00:00.000Z"),
      store: memoryCapStore(),
    });
    expect(result.sent).toBe(true);
    expect(called).toBe(true);
  });

  test("a sixth note the same day is capped when enforce is default", async () => {
    const store = memoryCapStore();
    const now = new Date("2026-10-19T12:00:00.000Z");
    for (let index = 0; index < 5; index += 1) {
      const result = await sendNote({
        input: {
          ...noteInput,
          description: `${noteInput.description} ${index}`,
        },
        ip: "127.0.0.1",
        mailer: async () => ({}),
        now,
        store,
      });
      expect(result.sent).toBe(true);
    }
    const capped = await sendNote({
      input: {
        ...noteInput,
        description: `${noteInput.description} overflow`,
      },
      ip: "127.0.0.1",
      mailer: async () => {},
      now,
      store,
    });
    expect(capped).toMatchObject({
      message: NOTE_CAP,
      ok: false,
      sent: false,
    });
  });

  test("a sixth note the same day succeeds when caps are not enforced", async () => {
    const store = memoryCapStore();
    const now = new Date("2026-10-19T12:00:00.000Z");
    for (let index = 0; index < 6; index += 1) {
      const result = await sendNote({
        enforce: false,
        input: {
          ...noteInput,
          description: `${noteInput.description} free ${index}`,
        },
        ip: "127.0.0.1",
        mailer: async () => ({}),
        now,
        store,
      });
      expect(result.sent).toBe(true);
    }
  });
});
