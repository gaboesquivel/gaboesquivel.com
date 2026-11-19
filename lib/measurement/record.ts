import { Redis } from "@upstash/redis";
import { after } from "next/server";

import { restRedisEnv } from "../connect/store";
import {
  contactCounterField,
  contactHashKey,
  measurementKey,
  monthKey,
  normalizeCountry,
  reportsToUmami,
} from "./contact";
import type { ContactChannel, ContactEvent } from "./contact";

const UMAMI_SEND_URL =
  process.env.UMAMI_SEND_URL?.trim() || "https://gateway.umami.is/api/send";
const SITE_HOSTNAME = "gaboesquivel.com";
// Umami drops requests whose User-Agent looks like a bot; server-to-server sends without a visitor UA use this.
const FALLBACK_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";
const DEDUPE_TTL_SECONDS = 60 * 60 * 24 * 90;

const EVENT_PATH: Record<ContactEvent, string> = {
  booking: "/cal",
  cal_click: "/cal",
  call_booked: "/mcp",
  contact_sent: "/contact",
  note_sent: "/mcp",
};

let redis: { client: Redis; url: string } | undefined;

export const measurementRedis = () => {
  const config = restRedisEnv();
  if (!config) return null;
  if (redis?.url !== config.url) {
    redis = { client: new Redis(config), url: config.url };
  }
  return redis.client;
};

export interface ContactAction {
  channel: ContactChannel;
  country?: string | null;
  /** Provider id (receipt, calendar event, invitee URI); a repeat id is not counted again. */
  dedupeId?: string | null;
  event: ContactEvent;
  userAgent?: string | null;
}

const countInRedis = async ({
  channel,
  country,
  dedupeId,
  event,
}: ContactAction & { country: string }) => {
  const client = measurementRedis();
  if (!client) return false;
  if (dedupeId) {
    const fresh = await client.set(
      measurementKey(`measure:seen:${event}:${dedupeId}`),
      "1",
      {
        ex: DEDUPE_TTL_SECONDS,
        nx: true,
      }
    );
    if (fresh !== "OK") return false;
  }
  await client.hincrby(
    contactHashKey(monthKey(new Date())),
    contactCounterField({ channel, country, event }),
    1
  );
  return true;
};

const sendToUmami = async ({
  channel,
  country,
  event,
  userAgent,
}: ContactAction & { country: string }) => {
  const website = process.env.UMAMI_WEBSITE_ID?.trim();
  if (!website || !reportsToUmami()) return;
  const response = await fetch(UMAMI_SEND_URL, {
    body: JSON.stringify({
      payload: {
        data: { channel, country },
        hostname: SITE_HOSTNAME,
        language: "en-US",
        name: event,
        url: EVENT_PATH[event],
        website,
      },
      type: "event",
    }),
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent?.trim() || FALLBACK_USER_AGENT,
    },
    method: "POST",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`umami-${response.status}`);
  }
};

const recordNow = async (action: ContactAction) => {
  const country = normalizeCountry(action.country);
  try {
    // Redis decides duplicates; Umami only hears about actions counted for the first time.
    const counted = await countInRedis({ ...action, country });
    const redisMissing = !measurementRedis();
    if (counted || (redisMissing && !action.dedupeId)) {
      await sendToUmami({ ...action, country });
    }
  } catch (error) {
    console.warn(
      "[measurement] contact action not recorded",
      action.event,
      error instanceof Error ? error.message : error
    );
  }
};

/**
 * Counts one contact action after the response is sent. Never throws and never
 * delays or changes the user-facing result.
 */
export const recordContactAction = (action: ContactAction) => {
  try {
    after(() => recordNow(action));
  } catch {
    // Outside a request scope (scripts): record inline, still best effort.
    void recordNow(action);
  }
};

export const requestCountry = (headers: Headers) =>
  normalizeCountry(headers.get("x-vercel-ip-country"));
