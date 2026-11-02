/**
 * One lexical ranker shared by search suggestions, both search fallbacks
 * (homepage and dialog), compose evidence and MCP `search_site`, so the same
 * text finds the same pages everywhere. Pure: no I/O, no globals.
 */

export interface KeywordFields {
  /** Highest weight. */
  title: string;
  /** Tags, categories, company, path words. */
  keywords?: readonly string[];
  /** Summary or description. Lowest weight. */
  text?: string;
}

export interface KeywordMatch<T> {
  item: T;
  /** Number of distinct query terms the item matched. */
  matched: number;
  score: number;
}

const TITLE_WEIGHT = 3;
const KEYWORD_WEIGHT = 2;
const TEXT_WEIGHT = 1;
/** A synonym hit counts a little less than the visitor's own word. */
const SYNONYM_FACTOR = 0.8;

/** Each group is one concept; any member finds the others. */
export const synonymGroups: readonly (readonly string[])[] = [
  [
    "ai",
    "agent",
    "agents",
    "agentic",
    "llm",
    "llms",
    "artificial intelligence",
  ],
  ["hire", "hiring", "contact", "book", "booking", "call", "work together"],
  ["web3", "crypto", "onchain", "blockchain"],
];

const stopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "any",
  "are",
  "at",
  "be",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "for",
  "from",
  "get",
  "has",
  "have",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "see",
  "show",
  "tell",
  "that",
  "the",
  "this",
  "to",
  "us",
  "was",
  "we",
  "what",
  "which",
  "who",
  "with",
  "you",
  "your",
]);

const fold = (value: string) =>
  value
    .normalize("NFKD")
    .replaceAll(/\p{Diacritic}/gu, "")
    .toLowerCase();

const wordsOf = (value: string) =>
  fold(value)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/** Meaningful query terms: folded, deduplicated, stop words removed. */
export const queryTerms = (query: string) => [
  ...new Set(
    wordsOf(query).filter((word) => word.length > 1 && !stopWords.has(word))
  ),
];

const groupFor = (term: string) =>
  synonymGroups.find((group) => group.includes(term));

/** The term itself first, then its synonyms (single words and phrases). */
export const expandTerm = (term: string): string[] => {
  const group = groupFor(term);
  return group ? [term, ...group.filter((entry) => entry !== term)] : [term];
};

interface PreparedField {
  phrase: string;
  words: string[];
  weight: number;
}

const prepare = (fields: KeywordFields): PreparedField[] =>
  [
    { value: fields.title, weight: TITLE_WEIGHT },
    { value: (fields.keywords ?? []).join(" "), weight: KEYWORD_WEIGHT },
    { value: fields.text ?? "", weight: TEXT_WEIGHT },
  ].map(({ value, weight }) => {
    const words = wordsOf(value);
    return { phrase: ` ${words.join(" ")} `, words, weight };
  });

/**
 * Whole-word match for short terms ("ai" never matches "mail"); prefix match
 * from three characters so partial typing and plurals still hit; substring
 * match from five so compound names ("LegalAgent") still hit. Short synonyms
 * match whole words only ("book" for "hire" never matches "books").
 */
const fieldHas = (
  field: PreparedField,
  candidate: string,
  synonym: boolean
) => {
  if (candidate.includes(" ")) return field.phrase.includes(` ${candidate} `);
  if (candidate.length < 3) return field.words.includes(candidate);
  if (candidate.length < 5) {
    if (synonym) return field.words.includes(candidate);
    return field.words.some((word) => word.startsWith(candidate));
  }
  return field.words.some((word) => word.includes(candidate));
};

/** Sum over fields of the best hit in each, so title plus body beats body alone. */
const termScore = (fields: PreparedField[], term: string) => {
  const candidates = expandTerm(term);
  let total = 0;
  for (const field of fields) {
    let best = 0;
    for (const [index, candidate] of candidates.entries()) {
      if (fieldHas(field, candidate, index > 0)) {
        best = Math.max(best, index === 0 ? 1 : SYNONYM_FACTOR);
      }
    }
    total += best * field.weight;
  }
  return total;
};

/**
 * Rank items by how many query terms they match (synonyms included), then by
 * weighted score. Ties keep input order. Items that match nothing are dropped.
 */
export const rankByKeywords = <T>({
  boost,
  fields,
  items,
  limit,
  match = "any",
  query,
}: {
  /** Optional multiplier per item (for example, shipped projects over tags). */
  boost?: (item: T) => number;
  fields: (item: T) => KeywordFields;
  items: readonly T[];
  limit?: number;
  /** "all": every query term must match (type-ahead); "any": rank by coverage. */
  match?: "all" | "any";
  query: string;
}): KeywordMatch<T>[] => {
  const terms = queryTerms(query);
  if (!terms.length) return [];
  const ranked = items
    .map((item, index) => {
      const prepared = prepare(fields(item));
      let matched = 0;
      let score = 0;
      for (const term of terms) {
        const value = termScore(prepared, term);
        if (value > 0) {
          matched += 1;
          score += value;
        }
      }
      return { index, item, matched, score: score * (boost?.(item) ?? 1) };
    })
    .filter(({ matched }) =>
      match === "all" ? matched === terms.length : matched > 0
    )
    .sort(
      (a, b) => b.matched - a.matched || b.score - a.score || a.index - b.index
    )
    .map(({ item, matched, score }) => ({ item, matched, score }));
  return limit === undefined ? ranked : ranked.slice(0, limit);
};

/** Path segments as keywords: `/project/legal-agent` → `project legal agent`. */
export const pathKeywords = (path: string) =>
  path.split(/[/-]+/).filter(Boolean);
