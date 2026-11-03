import type { SearchRecord } from "components/search/types";

import index from "../generated/agent-index.json";
import type { RankSection } from "./connect/rank";
import { searchRecordFromSection } from "./search/rank-records";

/**
 * The site search records the layout sends to the client: the same agent
 * index MCP `search_site` ranks (`lib/search/agent-sections.ts`), in the same
 * order, so keyword matches and `search_site` agree for the same text.
 */
export const getSiteSearchRecords = (): SearchRecord[] =>
  (index as RankSection[]).map((section) => searchRecordFromSection(section));
