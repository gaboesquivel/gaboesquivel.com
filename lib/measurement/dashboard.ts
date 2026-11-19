import {
  CONTACT_EVENTS,
  contactHashKey,
  marketOf,
  monthKey,
  parseContactHash,
} from "./contact";
import type { ContactCount, ContactEvent, Market } from "./contact";
import { measurementRedis } from "./record";

export interface MonthSummary {
  byEvent: Record<ContactEvent, Record<Market, number>>;
  month: string;
  total: number;
  totalByMarket: Record<Market, number>;
}

const emptyMarkets = (): Record<Market, number> => ({
  latam: 0,
  rest: 0,
  us: 0,
});

export const summarizeMonth = (
  month: string,
  counts: ContactCount[]
): MonthSummary => {
  const byEvent = Object.fromEntries(
    CONTACT_EVENTS.map((event) => [event, emptyMarkets()])
  ) as MonthSummary["byEvent"];
  const totalByMarket = emptyMarkets();
  let total = 0;
  for (const { count, country, event } of counts) {
    const market = marketOf(country);
    byEvent[event][market] += count;
    totalByMarket[market] += count;
    total += count;
  }
  return { byEvent, month, total, totalByMarket };
};

export const previousMonth = (date: Date) =>
  monthKey(
    new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1))
  );

export const loadContactMonths = async (now = new Date()) => {
  const months = [monthKey(now), previousMonth(now)];
  const client = measurementRedis();
  if (!client) return { configured: false as const, months: [] };
  const hashes = await Promise.all(
    months.map((month) =>
      client.hgetall<Record<string, unknown>>(contactHashKey(month))
    )
  );
  return {
    configured: true as const,
    months: months.map((month, index) =>
      summarizeMonth(month, parseContactHash(hashes[index] ?? null))
    ),
  };
};

const HISTORY_CSV_URL =
  "https://raw.githubusercontent.com/gaboesquivel/gaboesquivel.com/main/perf/history.csv";
const IS_AGENTIC_URL =
  "https://is-agentic.com/api/v1/report?url=https%3A%2F%2Fgaboesquivel.com";

export interface LighthouseRow {
  accessibility: string;
  best_practices: string;
  date: string;
  form_factor: string;
  page: string;
  performance: string;
  seo: string;
}

/** Latest weekly rows written by docs/specs/006; null until the job has run. */
export const loadLatestLighthouse = async (): Promise<
  LighthouseRow[] | null
> => {
  try {
    const response = await fetch(HISTORY_CSV_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const [header, ...lines] = (await response.text()).trim().split("\n");
    if (!header || lines.length === 0) return null;
    const columns = header.split(",");
    const rows = lines.map(
      (line) =>
        Object.fromEntries(
          line.split(",").map((value, index) => [columns[index], value])
        ) as unknown as LighthouseRow
    );
    const latest = rows.at(-1)?.date;
    return rows.filter((row) => row.date === latest);
  } catch {
    return null;
  }
};

export const loadIsAgentic = async () => {
  try {
    const response = await fetch(IS_AGENTIC_URL, {
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const report = (await response.json()) as {
      scanned_at?: string;
      score?: number;
      score_label?: string;
    };
    return typeof report.score === "number" ? report : null;
  } catch {
    return null;
  }
};
