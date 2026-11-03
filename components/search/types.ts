import type { kindBoost } from "lib/search/keyword-rank";

/**
 * One published section in the shape site search ranks: the dialog and
 * homepage keyword matches and suggestions on the client, and MCP
 * `search_site` and compose evidence on the server, all built from the same
 * agent index (`lib/search/site-records.ts`).
 */
export interface SearchRecord {
  title: string;
  description: string;
  href: string;
  /** Tags, categories and company (keyword weight). */
  keywords?: readonly string[];
  kind?: keyof typeof kindBoost;
  /** Posts only: archive posts stay out unless the query names them. */
  publishedAt?: string;
}
