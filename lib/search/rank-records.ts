import type { SearchRecord } from "components/search/types";

import {
  kindBoost,
  kindOfPath,
  pathKeywords,
  rankByKeywords,
} from "./keyword-rank";

export const KEYWORD_MATCH_LIMIT = 8;

/** Site search records (projects, posts, key pages) ranked by the shared ranker. */
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
  rankByKeywords({
    boost: (record) => kindBoost[kindOfPath(record.href)],
    fields: (record) => ({
      keywords: pathKeywords(record.href),
      text: record.description,
      title: record.title,
    }),
    items: records,
    limit,
    match,
    query,
  }).map(({ item }) => item);
