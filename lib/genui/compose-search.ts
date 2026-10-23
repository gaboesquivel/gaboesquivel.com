import { siteOrigin } from "lib/site-path";

import index from "../../generated/agent-index.json";
import bodies from "../../generated/markdown-routes.json";
import type { RankSection } from "../connect/rank";

const sections = index as RankSection[];
const corpus = bodies as Record<string, string>;

const shortTokens = new Set([
  "ai",
  "cv",
  "ui",
  "ux",
  "ip",
  "id",
  "go",
  "js",
  "ts",
]);

const meaningfulTokens = (query: string) =>
  query
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, ""))
    .filter(
      (token) => token.length > 2 || shortTokens.has(token) || token === "web3"
    );

const scoreSection = ({
  queryTokens,
  section,
}: {
  queryTokens: string[];
  section: RankSection;
}) => {
  if (!queryTokens.length) return 0;
  const hay = `${section.title} ${section.summary}`.toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (hay.includes(token)) score += 1;
    if (section.title.toLowerCase().includes(token)) score += 2;
  }
  return score;
};

export const composeSearchSections = ({
  limit,
  query,
}: {
  limit: number;
  query: string;
}) => {
  const queryTokens = meaningfulTokens(query);
  const scored = sections
    .filter(
      (section) => !(section.kind === "post" && section.publishedAt < "2020")
    )
    .map((section) => ({
      score: scoreSection({ queryTokens, section }),
      section,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ score, section }) => {
    const path = section.path.startsWith("/")
      ? section.path
      : `/${section.path}`;
    const bodyKey = section.bodyKey ?? path;
    const body = corpus[bodyKey] ?? corpus[path] ?? "";
    const excerpt = (section.summary || body.slice(0, 240)).trim();
    return {
      excerpt,
      id: path,
      kind: section.kind,
      publishedAt: section.kind === "post" ? section.publishedAt : undefined,
      score,
      title: section.title,
      url: `${siteOrigin}${path}`,
    };
  });
};
