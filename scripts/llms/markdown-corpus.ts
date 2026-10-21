import { loadBlogPosts } from "./blog";
import type { MarkdownRouteContext } from "./markdown-route";
import { getMarkdownForPath } from "./markdown-route";
import { loadNarrativePages } from "./pages";
import { sortProjects, sortTech } from "./projects";
import { buildRouteManifest } from "./routes";

export const buildMarkdownCorpus = () => {
  const manifest = buildRouteManifest();
  const context: MarkdownRouteContext = {
    manifest,
    pages: loadNarrativePages(),
    posts: loadBlogPosts(),
    projects: sortProjects(),
    tech: sortTech(),
  };
  const corpus: Record<string, string> = {};

  for (const routeKey of manifest) {
    const qIndex = routeKey.indexOf("?");
    const pathname = qIndex === -1 ? routeKey : routeKey.slice(0, qIndex);
    const search = qIndex === -1 ? "" : routeKey.slice(qIndex + 1);
    const body = getMarkdownForPath({ context, pathname, search });
    if (body) {
      corpus[routeKey] = body;
    }
  }

  return corpus;
};
