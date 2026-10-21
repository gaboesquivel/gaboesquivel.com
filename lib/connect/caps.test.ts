import { describe, expect, test } from "bun:test";

import { admitChat, admitChatOnce, memoryCapStore } from "./caps";
import { CHAT_CAP } from "./copy";

describe("admitChat", () => {
  const now = new Date("2026-10-19T12:00:00.000Z");
  const ip = "test-ip-caps";

  test("with enforce true rejects after 30 turns", async () => {
    const store = memoryCapStore();
    for (let turn = 0; turn < 30; turn += 1) {
      const admitted = await admitChat({
        enforce: true,
        ip,
        now,
        store,
      });
      expect(admitted.ok).toBe(true);
    }
    const capped = await admitChat({ enforce: true, ip, now, store });
    expect(capped.ok).toBe(false);
    expect(capped.message).toBe(CHAT_CAP);
  });

  test("admitChatOnce evicts inflight entries after settle", async () => {
    const store = memoryCapStore();
    const key = "session:1";
    await admitChatOnce({
      enforce: true,
      ip: "inflight-ip",
      key,
      now,
      store,
    });
    const second = admitChatOnce({
      enforce: true,
      ip: "inflight-ip",
      key,
      now,
      store,
    });
    await second;
    const third = admitChatOnce({
      enforce: true,
      ip: "inflight-ip",
      key,
      now,
      store,
    });
    expect(third).not.toBe(second);
    await third;
  });

  test("with enforce false stays ok past 30 turns", async () => {
    const store = memoryCapStore();
    for (let turn = 0; turn < 35; turn += 1) {
      const admitted = await admitChat({
        enforce: false,
        ip,
        now,
        store,
      });
      expect(admitted.ok).toBe(true);
    }
  });
});
