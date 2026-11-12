import { siteOrigin } from "lib/site-path";

import index from "../../generated/agent-index.json";
import bodies from "../../generated/markdown-routes.json";
import type { RankSection } from "../connect/rank";
import { rankSearchMatches, searchRecordFromSection } from "./rank-records";

const agentSections = index as RankSection[];
const corpus = bodies as Record<string, string>;
const agentRecords = agentSections.map((section) => ({
  ...searchRecordFromSection(section),
  section,
}));

const sectionExcerpt = (section: RankSection, path: string) => {
  const body = corpus[section.bodyKey ?? path] ?? corpus[path] ?? "";
  return (section.summary || body.slice(0, 240)).trim();
};

/** Published sections (pages, projects, posts, tech, roles) for a query, best first. */
export const rankAgentSections = ({
  limit,
  query,
}: {
  limit?: number;
  query: string;
}) =>
  rankSearchMatches(agentRecords, query, { limit }).map(({ item, score }) => ({
    excerpt: sectionExcerpt(item.section, item.href),
    id: item.href,
    kind: item.section.kind,
    publishedAt:
      item.section.kind === "post" ? item.section.publishedAt : undefined,
    score,
    title: item.title,
    url: `${siteOrigin}${item.href}`,
  }));
