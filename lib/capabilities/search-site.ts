import { siteOrigin } from "lib/site-path";

import index from "../../generated/agent-index.json";
import bodies from "../../generated/markdown-routes.json";
import { rankSections } from "../connect/rank";
import type { RankSection } from "../connect/rank";
import { paginate } from "./pagination";
import { readResult } from "./result";
import { searchSiteInput } from "./schemas";
import type { CapabilityContext } from "./types";

const sections = index as RankSection[];
const corpus = bodies as Record<string, string>;

const toRecord = (section: RankSection) => {
  const path = section.path.startsWith("/") ? section.path : `/${section.path}`;
  const bodyKey = section.bodyKey ?? path;
  const body = corpus[bodyKey] ?? corpus[path] ?? "";
  const excerpt = (section.summary || body.slice(0, 240)).trim();
  return {
    excerpt,
    id: path,
    kind: section.kind,
    title: section.title,
    url: `${siteOrigin}${path}`,
  };
};

export const searchSite = ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = searchSiteInput.safeParse(input);
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid search query.",
      operation: "search_site",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const { cursor, limit, query } = parsed.data;
  const ranked = rankSections({
    bodies: corpus,
    question: query,
    sections,
  });
  const matched =
    ranked.paths.length > 0
      ? ranked.paths
          .map((path) => sections.find((section) => section.path === path))
          .filter((section): section is RankSection => Boolean(section))
      : sections.filter((section) => {
          if (section.kind === "post" && section.publishedAt < "2020") {
            return false;
          }
          const hay = `${section.title} ${section.summary}`.toLowerCase();
          return query
            .toLowerCase()
            .split(/\s+/)
            .filter((token) => token.length > 2)
            .some((token) => hay.includes(token));
        });
  const records = matched.map(toRecord);
  const page = paginate({ cursor, items: records, limit });
  if ("error" in page) {
    return readResult({
      data: null,
      message: page.error ?? "Invalid cursor.",
      operation: "search_site",
      requestId: context.correlationId,
      status: "error",
    });
  }
  return readResult({
    data: { nextCursor: page.nextCursor, results: page.items, query },
    message: page.items.length ? "Search results ready." : "No matches found.",
    operation: "search_site",
    requestId: context.correlationId,
    status: page.items.length ? "ok" : "empty",
  });
};
