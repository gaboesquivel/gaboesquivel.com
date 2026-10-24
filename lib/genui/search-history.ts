import { normalizeGenuiQuery } from "./normalize-query";

export const GENUI_SEARCH_HISTORY_KEY = "gaboesquivel:genui-search-history";
export const GENUI_SEARCH_HISTORY_EVENT = "genui-search-history-updated";
export const GENUI_SEARCH_HISTORY_MAX = 12;
export const GENUI_SEARCH_HISTORY_QUERY_MAX = 240;

const stopTerms = new Set([
  "a",
  "an",
  "the",
  "my",
  "your",
  "me",
  "i",
  "can",
  "show",
  "see",
  "get",
  "please",
  "about",
]);

export const sanitizeGenuiSearchHistoryEntry = (query: string) => {
  const trimmed = query.trim().replace(/\s+/g, " ");
  if (!trimmed) return null;
  if (trimmed.length > GENUI_SEARCH_HISTORY_QUERY_MAX) return null;
  return trimmed;
};

export const mergeGenuiSearchHistory = ({
  history,
  query,
  max = GENUI_SEARCH_HISTORY_MAX,
}: {
  history: string[];
  query: string;
  max?: number;
}) => {
  const entry = sanitizeGenuiSearchHistoryEntry(query);
  if (!entry) return history;
  const key = normalizeGenuiQuery(entry);
  const kept = history.filter((item) => normalizeGenuiQuery(item) !== key);
  return [entry, ...kept].slice(0, max);
};

export const parseGenuiSearchHistory = (raw: string | null) => {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (typeof item !== "string") return [];
      const entry = sanitizeGenuiSearchHistoryEntry(item);
      return entry ? [entry] : [];
    });
  } catch {
    return [];
  }
};

export const readGenuiSearchHistory = () => {
  if (typeof window === "undefined") return [];
  return parseGenuiSearchHistory(
    window.localStorage.getItem(GENUI_SEARCH_HISTORY_KEY)
  );
};

export const writeGenuiSearchHistory = (history: string[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      GENUI_SEARCH_HISTORY_KEY,
      JSON.stringify(history)
    );
    window.dispatchEvent(new Event(GENUI_SEARCH_HISTORY_EVENT));
  } catch {
    // ignore quota or private mode
  }
};

export const recordGenuiSearchQuery = (query: string) => {
  const next = mergeGenuiSearchHistory({
    history: readGenuiSearchHistory(),
    query,
  });
  writeGenuiSearchHistory(next);
  return next;
};

export const filterGenuiSearchHistory = ({
  history,
  query,
  limit = 8,
}: {
  history: string[];
  query: string;
  limit?: number;
}) => {
  const trimmed = query.trim();
  if (!trimmed) return history.slice(0, limit);

  const normalized = normalizeGenuiQuery(trimmed);
  const terms = normalized
    .split(" ")
    .filter((term) => term.length > 1 && !stopTerms.has(term));
  if (!terms.length) return history.slice(0, limit);

  return history
    .filter((item) => {
      const haystack = normalizeGenuiQuery(item);
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, limit);
};
