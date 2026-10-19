import { afterEach, describe, expect, test } from "bun:test";

import { liveCapStore, restRedisEnv } from "./store";

describe("liveCapStore redis env", () => {
  const previous = {
    kvToken: process.env.KV_REST_API_TOKEN,
    kvUrl: process.env.KV_REST_API_URL,
    upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    upstashUrl: process.env.UPSTASH_REDIS_REST_URL,
    vercelEnv: process.env.VERCEL_ENV,
  };

  afterEach(() => {
    process.env.KV_REST_API_TOKEN = previous.kvToken;
    process.env.KV_REST_API_URL = previous.kvUrl;
    process.env.UPSTASH_REDIS_REST_TOKEN = previous.upstashToken;
    process.env.UPSTASH_REDIS_REST_URL = previous.upstashUrl;
    process.env.VERCEL_ENV = previous.vercelEnv;
  });

  test("accepts KV_REST_API_URL and KV_REST_API_TOKEN", () => {
    process.env.UPSTASH_REDIS_REST_URL = "";
    process.env.UPSTASH_REDIS_REST_TOKEN = "";
    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "kv-token";
    expect(restRedisEnv()).toEqual({
      token: "kv-token",
      url: "https://example.upstash.io",
    });
    expect(liveCapStore()).not.toBeNull();
  });

  test("returns null on hosted env when no redis pair is set", () => {
    process.env.UPSTASH_REDIS_REST_URL = "";
    process.env.UPSTASH_REDIS_REST_TOKEN = "";
    process.env.KV_REST_API_URL = "";
    process.env.KV_REST_API_TOKEN = "";
    process.env.VERCEL_ENV = "production";
    expect(restRedisEnv()).toBeNull();
    expect(liveCapStore()).toBeNull();
  });
});
