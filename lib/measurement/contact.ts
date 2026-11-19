// Contact actions: the primary metric (PRODUCT.md, Measurement; docs/specs/005).

export type ContactEvent =
  | "booking"
  | "cal_click"
  | "call_booked"
  | "contact_sent"
  | "note_sent";

export type ContactChannel = "calendly" | "mcp" | "site";

export type Market = "latam" | "rest" | "us";

export const CONTACT_EVENTS: readonly ContactEvent[] = [
  "contact_sent",
  "cal_click",
  "booking",
  "note_sent",
  "call_booked",
];

export const MARKETS: readonly Market[] = ["us", "latam", "rest"];

/** Unknown or missing country (local dev, server-to-server webhooks). */
export const UNKNOWN_COUNTRY = "XX";

// Mexico, Central America, the Caribbean, and South America (ISO 3166-1 alpha-2).
const LATAM = new Set([
  "AR",
  "BO",
  "BR",
  "BZ",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "GT",
  "GY",
  "HN",
  "HT",
  "JM",
  "MX",
  "NI",
  "PA",
  "PE",
  "PR",
  "PY",
  "SR",
  "SV",
  "TT",
  "UY",
  "VE",
]);

export const normalizeCountry = (value: string | null | undefined) => {
  const code = value?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) ? code : UNKNOWN_COUNTRY;
};

export const marketOf = (country: string): Market => {
  if (country === "US") return "us";
  return LATAM.has(country) ? "latam" : "rest";
};

/** Redis hash per UTC month: `measure:contact:2026-11`. */
export const monthKey = (date: Date) => date.toISOString().slice(0, 7);

const isProduction = () => process.env.VERCEL_ENV === "production";

/** Local and preview runs share the production Upstash database; keep their counts apart. */
export const measurementKey = (key: string) =>
  isProduction() ? key : `dev:${key}`;

export const contactHashKey = (month: string) =>
  measurementKey(`measure:contact:${month}`);

/** Only production reports to Umami, so tests never reach the real dashboard. */
export const reportsToUmami = isProduction;

export const contactCounterField = ({
  channel,
  country,
  event,
}: {
  channel: ContactChannel;
  country: string;
  event: ContactEvent;
}) => `${event}:${channel}:${country}`;

export interface ContactCount {
  channel: ContactChannel;
  count: number;
  country: string;
  event: ContactEvent;
}

export const parseContactHash = (
  hash: Record<string, unknown> | null
): ContactCount[] =>
  Object.entries(hash ?? {}).flatMap(([field, raw]) => {
    const [event, channel, country] = field.split(":");
    const count = Number(raw);
    if (
      !CONTACT_EVENTS.includes(event as ContactEvent) ||
      !["calendly", "mcp", "site"].includes(channel ?? "") ||
      !country ||
      !Number.isFinite(count)
    ) {
      return [];
    }
    return [
      {
        channel: channel as ContactChannel,
        count,
        country,
        event: event as ContactEvent,
      },
    ];
  });
