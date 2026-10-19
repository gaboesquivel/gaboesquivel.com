import { Redis } from "@upstash/redis";

import { memoryCapStore } from "./caps";
import type { CapStore } from "./caps";

const DAY_SECONDS = 60 * 60 * 48;

let memory: CapStore | undefined;

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
        ex: DAY_SECONDS,
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
      await redis.expire(key, DAY_SECONDS);
      return count;
    },
    set: async (key, value) => {
      await redis.set(key, value, { ex: DAY_SECONDS });
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
  if (config) return redisStore(config);
  const hosted =
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview";
  if (hosted) return null;
  memory ??= memoryCapStore();
  return memory;
};
