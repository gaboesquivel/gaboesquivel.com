// Weekly quality history (docs/specs/006).
//   PSI_API_KEY=... bun scripts/measure/weekly.ts [--dry-run]
// Appends PageSpeed Insights (with CrUX field data when Google has it) to
// perf/history.csv and the is-agentic.com score to perf/is-agentic.csv. A rerun
// on the same date replaces that date's rows. A failed call writes no partial
// rows for its file. The API key never appears in output.
import {
  appendFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const ORIGIN = "https://gaboesquivel.com";
const PERF_DIR = join(import.meta.dir, "../../perf");
const HISTORY = join(PERF_DIR, "history.csv");
const IS_AGENTIC = join(PERF_DIR, "is-agentic.csv");
const HISTORY_COLUMNS = [
  "date",
  "page",
  "form_factor",
  "performance",
  "accessibility",
  "best_practices",
  "seo",
  "lcp_ms",
  "cls",
  "tbt_ms",
  "crux_lcp_p75",
  "crux_inp_p75",
  "crux_cls_p75",
] as const;
const IS_AGENTIC_COLUMNS = ["date", "score", "label", "scanned_at"] as const;
const FORM_FACTORS = ["mobile", "desktop"] as const;
const SCORE_COLUMNS = [
  "performance",
  "accessibility",
  "best_practices",
  "seo",
] as const;

type Row = Record<string, string>;

const dryRun = process.argv.includes("--dry-run");
const summaryLines: string[] = [];
const say = (line: string) => {
  console.log(line);
  summaryLines.push(line);
};

const apiKey = process.env.PSI_API_KEY?.trim();
if (!apiKey) {
  console.error(
    "PSI_API_KEY is not set. Create a key in a free Google Cloud project with the PageSpeed Insights API enabled (no billing)."
  );
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const pages = JSON.parse(
  readFileSync(join(PERF_DIR, "pages.json"), "utf-8")
) as string[];

const score = (value: unknown) =>
  typeof value === "number" ? String(Math.round(value * 100)) : "";
const number = (value: unknown, digits = 0) =>
  typeof value === "number" ? value.toFixed(digits) : "";

interface CruxMetrics {
  CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile?: number };
  INTERACTION_TO_NEXT_PAINT?: { percentile?: number };
  LARGEST_CONTENTFUL_PAINT_MS?: { percentile?: number };
}

interface PsiResponse {
  lighthouseResult?: {
    audits?: Record<string, { numericValue?: number }>;
    categories?: Record<string, { score?: number }>;
  };
  loadingExperience?: { metrics?: CruxMetrics; origin_fallback?: boolean };
}

const cruxValue = (
  metrics: CruxMetrics | undefined,
  key: keyof CruxMetrics,
  scale = 1
) => {
  const percentile = metrics?.[key]?.percentile;
  return typeof percentile === "number"
    ? String(Number((percentile / scale).toFixed(scale === 1 ? 0 : 3)))
    : "none";
};

const runPsi = async (page: string, formFactor: string): Promise<Row> => {
  const params = new URLSearchParams({
    key: apiKey,
    strategy: formFactor,
    url: `${ORIGIN}${page}`,
  });
  for (const category of [
    "PERFORMANCE",
    "ACCESSIBILITY",
    "BEST_PRACTICES",
    "SEO",
  ]) {
    params.append("category", category);
  }
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`,
    { signal: AbortSignal.timeout(120_000) }
  );
  if (!response.ok) {
    throw new Error(`PageSpeed ${page} ${formFactor}: HTTP ${response.status}`);
  }
  const body = (await response.json()) as PsiResponse;
  const categories = body.lighthouseResult?.categories ?? {};
  const audits = body.lighthouseResult?.audits ?? {};
  const metrics = body.loadingExperience?.metrics;
  return {
    accessibility: score(categories.accessibility?.score),
    best_practices: score(categories["best-practices"]?.score),
    cls: number(audits["cumulative-layout-shift"]?.numericValue, 3),
    crux_cls_p75: cruxValue(metrics, "CUMULATIVE_LAYOUT_SHIFT_SCORE", 100),
    crux_inp_p75: cruxValue(metrics, "INTERACTION_TO_NEXT_PAINT"),
    crux_lcp_p75: cruxValue(metrics, "LARGEST_CONTENTFUL_PAINT_MS"),
    date,
    form_factor: formFactor,
    lcp_ms: number(audits["largest-contentful-paint"]?.numericValue),
    page,
    performance: score(categories.performance?.score),
    seo: score(categories.seo?.score),
    tbt_ms: number(audits["total-blocking-time"]?.numericValue),
  };
};

const readRows = (file: string): Row[] => {
  if (!existsSync(file)) return [];
  const [header, ...lines] = readFileSync(file, "utf-8").trim().split("\n");
  if (!header) return [];
  const columns = header.split(",");
  return lines
    .filter(Boolean)
    .map((line) =>
      Object.fromEntries(
        line.split(",").map((value, index) => [columns[index], value])
      )
    );
};

const csvValue = (value: string | undefined) =>
  (value ?? "").replaceAll(",", ";").replaceAll("\n", " ");

/** Drops this date's rows (rerun) and appends the new ones. */
const writeRows = (file: string, columns: readonly string[], rows: Row[]) => {
  const kept = readRows(file).filter((row) => row.date !== date);
  const lines = [
    columns.join(","),
    ...[...kept, ...rows].map((row) =>
      columns.map((column) => csvValue(row[column])).join(",")
    ),
  ];
  if (dryRun) {
    console.log(`\n[dry run] ${file} would get:`);
    for (const row of rows) {
      console.log(columns.map((column) => csvValue(row[column])).join(","));
    }
    return;
  }
  writeFileSync(file, `${lines.join("\n")}\n`);
};

const previousRows = (file: string) => {
  const rows = readRows(file).filter((row) => row.date !== date);
  const last = rows.at(-1)?.date;
  return rows.filter((row) => row.date === last);
};

let failed = false;

// PageSpeed Insights: two at a time to stay well inside the quota.
const tasks = pages.flatMap((page) =>
  FORM_FACTORS.map((formFactor) => ({ formFactor, page }))
);
const results: Row[] = [];
const errors: string[] = [];
for (let index = 0; index < tasks.length; index += 2) {
  const batch = tasks.slice(index, index + 2);
  const settled = await Promise.allSettled(
    batch.map(({ formFactor, page }) => runPsi(page, formFactor))
  );
  for (const result of settled) {
    if (result.status === "fulfilled") results.push(result.value);
    else
      errors.push(
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason)
      );
  }
}

say(`## Weekly quality measurement, ${date}`);
if (errors.length > 0) {
  failed = true;
  say(`\n**PageSpeed failed; no history rows written.**`);
  for (const error of errors) say(`- ${error}`);
} else {
  const previous = previousRows(HISTORY);
  writeRows(HISTORY, HISTORY_COLUMNS, results);
  say("\n| Page | Device | Perf | A11y | Best | SEO | Field data |");
  say("|---|---|---|---|---|---|---|");
  for (const row of results) {
    say(
      `| ${row.page} | ${row.form_factor} | ${row.performance} | ${row.accessibility} | ${row.best_practices} | ${row.seo} | ${row.crux_lcp_p75 === "none" ? "none" : `LCP ${row.crux_lcp_p75} ms`} |`
    );
  }
  const drops = results.flatMap((row) => {
    const before = previous.find(
      (prior) =>
        prior.page === row.page && prior.form_factor === row.form_factor
    );
    if (!before) return [];
    return SCORE_COLUMNS.filter(
      (column) => Number(row[column]) < Number(before[column])
    ).map(
      (column) =>
        `${row.page} ${row.form_factor} ${column}: ${before[column]} → ${row[column]}`
    );
  });
  say(
    drops.length > 0
      ? `\n**Below last week:**\n${drops.map((drop) => `- ${drop}`).join("\n")}`
      : "\nNo score below last week."
  );
}

// is-agentic.com: read the stored report only; never trigger a scan.
try {
  const response = await fetch(
    `https://is-agentic.com/api/v1/report?url=${encodeURIComponent(ORIGIN)}`,
    { signal: AbortSignal.timeout(20_000) }
  );
  if (!response.ok) throw new Error(`is-agentic.com: HTTP ${response.status}`);
  const report = (await response.json()) as {
    scanned_at?: string;
    score?: number;
    score_label?: string;
  };
  if (typeof report.score !== "number") {
    throw new TypeError("is-agentic.com: no score in report");
  }
  const before = previousRows(IS_AGENTIC)[0];
  writeRows(IS_AGENTIC, IS_AGENTIC_COLUMNS, [
    {
      date,
      label: report.score_label ?? "",
      scanned_at: report.scanned_at ?? "",
      score: String(report.score),
    },
  ]);
  const drop =
    before && Number(before.score) > report.score
      ? ` **Below last week (${before.score}).**`
      : "";
  say(
    `\nis-agentic.com: ${report.score}/100, ${report.score_label ?? "no label"} (scanned ${report.scanned_at?.slice(0, 10) ?? "unknown"}).${drop}`
  );
} catch (error) {
  failed = true;
  say(
    `\n**is-agentic.com failed; no row written.** ${error instanceof Error ? error.message : String(error)}`
  );
}

const summaryFile = process.env.GITHUB_STEP_SUMMARY;
if (summaryFile) appendFileSync(summaryFile, `${summaryLines.join("\n")}\n`);

if (failed) process.exit(1);
