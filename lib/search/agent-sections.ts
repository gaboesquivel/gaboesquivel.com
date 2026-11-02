import { siteOrigin } from "lib/site-path";

import index from "../../generated/agent-index.json";
import bodies from "../../generated/markdown-routes.json";
import type { RankSection } from "../connect/rank";
import { pathKeywords, rankByKeywords } from "./keyword-rank";

export const agentSections = index as RankSection[];
const corpus = bodies as Record<string, string>;

const ARCHIVE_BEFORE = "2020";

/** Archive posts stay out unless the query names them or their year. */
const eligible = (section: RankSection, query: string) => {
  if (section.kind !== "post" || section.publishedAt >= ARCHIVE_BEFORE) {
    return true;
  }
  const title = section.title.toLowerCase();
  if (title.length > 4 && query.toLowerCase().includes(title)) return true;
  return [...query.matchAll(/\b(?:19|20)\d{2}\b/g)].some(
    ([year]) => year < ARCHIVE_BEFORE && section.publishedAt.startsWith(year)
  );
};

/** Shipped work and site pages answer more questions than tags or old posts. */
const kindBoost: Record<RankSection["kind"], number> = {
  cv: 1,
  employment: 1,
  page: 1.2,
  post: 1,
  project: 2,
  tech: 0.8,
};

const sectionPath = (section: RankSection) =>
  section.path.startsWith("/") ? section.path : `/${section.path}`;

const sectionExcerpt = (section: RankSection) => {
  const path = sectionPath(section);
  const body = corpus[section.bodyKey ?? path] ?? corpus[path] ?? "";
  return (section.summary || body.slice(0, 240)).trim();
};

/** Published sections (pages, projects, posts, tech, roles) for a query, best first. */
export const rankAgentSections = ({
  limit,
  query,
  sections = agentSections,
}: {
  limit?: number;
  query: string;
  sections?: RankSection[];
}) =>
  rankByKeywords({
    boost: (section) => kindBoost[section.kind],
    fields: (section) => ({
      keywords: [
        ...section.tags,
        ...section.categories,
        section.company,
        ...pathKeywords(sectionPath(section)),
      ],
      text: section.summary,
      title: section.title,
    }),
    items: sections.filter((section) => eligible(section, query)),
    limit,
    query,
  }).map(({ item, score }) => ({
    excerpt: sectionExcerpt(item),
    id: sectionPath(item),
    kind: item.kind,
    publishedAt: item.kind === "post" ? item.publishedAt : undefined,
    score,
    title: item.title,
    url: `${siteOrigin}${sectionPath(item)}`,
  }));
