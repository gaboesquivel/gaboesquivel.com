import { rankAgentSections } from "lib/search/agent-sections";

/** Compose evidence uses the shared keyword ranker (same matches as `search_site`). */
export const composeSearchSections = ({
  limit,
  query,
}: {
  limit: number;
  query: string;
}) => rankAgentSections({ limit, query });
