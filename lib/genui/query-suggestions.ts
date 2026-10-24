import { filterSearchRecords } from "components/search/filter-records";
import type { SearchRecord } from "components/search/types";

import { normalizeGenuiQuery } from "./normalize-query";
import { filterGenuiSearchHistory } from "./search-history";

export interface GenuiQuerySuggestion {
  label: string;
  query: string;
  source: "curated" | "history" | "site";
}

const stopTerms = new Set([
  "a",
  "an",
  "the",
  "my",
  "your",
  "me",
  "i",
  "we",
  "can",
  "show",
  "see",
  "get",
  "please",
  "about",
  "do",
  "does",
  "did",
  "have",
  "has",
  "are",
  "is",
  "with",
  "for",
  "to",
  "how",
  "what",
  "walk",
  "through",
  "open",
]);

/** Interview-style prompts recruiters and clients tend to ask; `query` targets known compose routes. */
export const curatedGenuiQuerySuggestions: readonly {
  label: string;
  query: string;
}[] = [
  {
    label: "What agentic AI products have you shipped?",
    query: "show me your ai projects",
  },
  {
    label: "Do you have FinTech or mobile banking experience?",
    query: "show me your fintech work",
  },
  {
    label: "Have you built wallets or onchain products?",
    query: "show me your web3 projects",
  },
  {
    label: "What should I look at first on your portfolio?",
    query: "explore my work",
  },
  {
    label: "Walk me through your career path.",
    query: "show me your career timeline",
  },
  {
    label: "Can I see your résumé?",
    query: "download cv",
  },
  {
    label: "Are you open to contract or full-time work?",
    query: "how could we work together",
  },
  {
    label: "How do I book time with you?",
    query: "book a call",
  },
  {
    label: "How do I reach you by email?",
    query: "send email",
  },
];

export const filterCuratedGenuiSuggestions = (raw: string) => {
  const normalized = normalizeGenuiQuery(raw);
  if (!normalized) return [];
  const terms = normalized
    .split(" ")
    .filter((term) => term.length > 1 && !stopTerms.has(term));
  if (!terms.length) return [];
  return curatedGenuiQuerySuggestions.filter(({ label, query }) => {
    const haystack = `${label} ${query}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
};

export const buildGenuiAutosuggest = ({
  history = [],
  includeRecentWhenEmpty = false,
  query,
  records,
  limit = 8,
}: {
  history?: string[];
  includeRecentWhenEmpty?: boolean;
  query: string;
  records: SearchRecord[];
  limit?: number;
}) => {
  const trimmed = query.trim();
  if (!trimmed && !includeRecentWhenEmpty) return [];

  const historyMatches: GenuiQuerySuggestion[] = filterGenuiSearchHistory({
    history,
    query: trimmed,
    limit,
  }).map((item) => ({
    label: item,
    query: item,
    source: "history" as const,
  }));

  const seen = new Set(
    historyMatches.map((item) => normalizeGenuiQuery(item.query))
  );

  const curatedSource = trimmed
    ? filterCuratedGenuiSuggestions(trimmed)
    : includeRecentWhenEmpty
      ? curatedGenuiQuerySuggestions
      : [];

  const curated = curatedSource.map((item) => ({
    ...item,
    source: "curated" as const,
  }));

  for (const item of curated) {
    const normalized = normalizeGenuiQuery(item.query);
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    historyMatches.push(item);
  }

  const site: GenuiQuerySuggestion[] = [];

  if (trimmed) {
    for (const record of filterSearchRecords(records, trimmed)) {
      const normalized = normalizeGenuiQuery(record.title);
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      site.push({
        label: record.title,
        query: record.title,
        source: "site",
      });
    }
  }

  return [...historyMatches, ...site].slice(0, limit);
};
