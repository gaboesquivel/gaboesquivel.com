import type { SearchRecord } from "components/search/types";

import type { RankSection } from "../connect/rank";
import {
  kindBoost,
  kindOfPath,
  pathKeywords,
  rankByKeywords,
} from "./keyword-rank";

export const KEYWORD_MATCH_LIMIT = 8;

const ARCHIVE_BEFORE = "2020";

const sectionPath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

/**
 * The one record shape every search surface ranks. The layout sends these to
 * the client (dialog and homepage keyword matches, suggestions) and MCP
 * `search_site` ranks the same list, so the same text finds the same pages.
 */
export const searchRecordFromSection = (
  section: RankSection
): SearchRecord => ({
  description: section.summary,
  href: sectionPath(section.path),
  keywords: [...section.tags, ...section.categories, section.company].filter(
    Boolean
  ),
  kind: section.kind,
  title: section.title,
  ...(section.kind === "post" ? { publishedAt: section.publishedAt } : {}),
});

/** Routes that only redirect; never offer them as a match. */
const REDIRECT_ONLY = new Set(["/ask"]);

/** Archive posts stay out unless the query names them or their year. */
const eligible = (record: SearchRecord, query: string) => {
  if (REDIRECT_ONLY.has(record.href)) return false;
  if (
    record.kind !== "post" ||
    !record.publishedAt ||
    record.publishedAt >= ARCHIVE_BEFORE
  ) {
    return true;
  }
  const title = record.title.toLowerCase();
  if (title.length > 4 && query.toLowerCase().includes(title)) return true;
  return [...query.matchAll(/\b(?:19|20)\d{2}\b/g)].some(
    ([year]) =>
      year < ARCHIVE_BEFORE && Boolean(record.publishedAt?.startsWith(year))
  );
};

/** Records ranked by the shared ranker, with scores (best first). */
export const rankSearchMatches = <R extends SearchRecord>(
  records: readonly R[],
  query: string,
  {
    limit,
    match = "any",
  }: {
    limit?: number;
    match?: "all" | "any";
  } = {}
) => {
  // Several records can share a page (every CV role links to /cv); keep the
  // best-ranked one per href so a match list never repeats a destination.
  const seen = new Set<string>();
  const unique = rankByKeywords({
    boost: (record) => kindBoost[record.kind ?? kindOfPath(record.href)],
    fields: (record) => ({
      keywords: [...(record.keywords ?? []), ...pathKeywords(record.href)],
      text: record.description,
      title: record.title,
    }),
    items: records.filter((record) => eligible(record, query)),
    match,
    query,
  }).filter(({ item }) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
  return limit === undefined ? unique : unique.slice(0, limit);
};

/** Site search records (projects, posts, pages, roles, tech) ranked by the shared ranker. */
export const rankSearchRecords = (
  records: readonly SearchRecord[],
  query: string,
  {
    limit = KEYWORD_MATCH_LIMIT,
    match = "any",
  }: {
    limit?: number;
    match?: "all" | "any";
  } = {}
) =>
  rankSearchMatches(records, query, { limit, match }).map(({ item }) => item);
