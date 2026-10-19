import { createHash } from "node:crypto";

import { CHAT_CAP, STORE_UNAVAILABLE_CHAT } from "./copy";
import { DENVER, zonedDate } from "./slots";

export interface CapStore {
  claim: (key: string) => Promise<boolean>;
  decr: (key: string) => Promise<number>;
  del: (key: string) => Promise<void>;
  get: (key: string) => Promise<string | null>;
  incr: (key: string) => Promise<number>;
  set: (key: string, value: string) => Promise<void>;
}

export const memoryCapStore = (): CapStore => {
  const counts = new Map<string, number>();
  const values = new Map<string, string>();
  return {
    claim: async (key) => {
      if (values.has(key)) return false;
      values.set(key, "pending");
      return true;
    },
    decr: async (key) => {
      const next = Math.max(0, (counts.get(key) ?? 0) - 1);
      counts.set(key, next);
      return next;
    },
    del: async (key) => {
      values.delete(key);
    },
    get: async (key) => values.get(key) ?? null,
    incr: async (key) => {
      const next = (counts.get(key) ?? 0) + 1;
      counts.set(key, next);
      return next;
    },
    set: async (key, value) => {
      values.set(key, value);
    },
  };
};

export const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex").slice(0, 32);

export const denverDay = (now: Date) =>
  zonedDate({ instant: now, timeZone: DENVER });

const localCounts = new Map<string, number>();
const inflight = new Map<string, Promise<{ message: string; ok: boolean }>>();

export const admitChat = async ({
  ip,
  now,
  store,
}: {
  ip: string;
  now: Date;
  store: CapStore | null;
}) => {
  const key = `connect:chat:ip:${ip}:${denverDay(now)}`;
  if ((localCounts.get(key) ?? 0) >= 30) {
    return { message: CHAT_CAP, ok: false };
  }
  if (!store) return { message: STORE_UNAVAILABLE_CHAT, ok: false };
  const count = await store.incr(key);
  localCounts.set(key, count);
  if (count > 30) return { message: CHAT_CAP, ok: false };
  return { message: "", ok: true };
};

export const admitChatOnce = ({
  ip,
  key,
  now,
  store,
}: {
  ip: string;
  key: string;
  now: Date;
  store: CapStore | null;
}) => {
  const existing = inflight.get(key);
  if (existing) return existing;
  const promise = admitChat({ ip, now, store });
  inflight.set(key, promise);
  return promise;
};
