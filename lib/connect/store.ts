import { Redis } from "@upstash/redis";

import { memoryCapStore } from "./caps";
import type { CapStore } from "./caps";

// Cap keys roll on Denver calendar days; keep Redis TTL at ~48h past midnight edges.
const CAP_REDIS_TTL_SECONDS = 60 * 60 * 48;

let memory: CapStore | undefined;
let cachedRedis:
  | { config: { token: string; url: string }; store: CapStore }
  | undefined;

const redisStore = ({
  token,
  url,
}: {
  token: string;
  url: string;
}): CapStore => {
  const redis = new Redis({ token, url });
  return {
    claim: async (key) => {
      const result = await redis.set(key, "pending", {
        ex: CAP_REDIS_TTL_SECONDS,
        nx: true,
      });
      return result === "OK";
    },
    decr: async (key) => redis.decr(key),
    del: async (key) => {
      await redis.del(key);
    },
    get: async (key) => {
      const value = await redis.get<string>(key);
      if (value === null || value === undefined) return null;
      return String(value);
    },
    incr: async (key) => {
      const count = await redis.incr(key);
      await redis.expire(key, CAP_REDIS_TTL_SECONDS);
      return count;
    },
    set: async (key, value) => {
      await redis.set(key, value, { ex: CAP_REDIS_TTL_SECONDS });
    },
  };
};

const envValue = (value?: string) => {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
};

export const restRedisEnv = () => {
  const url =
    envValue(process.env.UPSTASH_REDIS_REST_URL) ??
    envValue(process.env.KV_REST_API_URL);
  const token =
    envValue(process.env.UPSTASH_REDIS_REST_TOKEN) ??
    envValue(process.env.KV_REST_API_TOKEN);
  if (!url || !token) return null;
  return { token, url };
};

export const liveCapStore = (): CapStore | null => {
  const config = restRedisEnv();
  if (config) {
    if (
      cachedRedis?.config.url === config.url &&
      cachedRedis?.config.token === config.token
    ) {
      return cachedRedis.store;
    }
    cachedRedis = { config, store: redisStore(config) };
    return cachedRedis.store;
  }
  cachedRedis = undefined;
  const hosted =
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview";
  if (hosted) return null;
  memory ??= memoryCapStore();
  return memory;
};
