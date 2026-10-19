import { canonicalizePath } from "lib/canonical-path";
import { buildRouteManifest } from "scripts/llms/routes";

import corpus from "../../generated/markdown-routes.json";

const routes = corpus as Record<string, string>;

export const listPublishedPagePaths = () =>
  [...buildRouteManifest()].sort((a, b) => a.localeCompare(b));

export const resolvePageRouteKey = ({
  segments,
  search,
}: {
  segments: string[];
  search: string;
}) => {
  if (segments.length === 1 && segments[0] === "_root") {
    return search ? `/?${search}` : "/";
  }

  const pathname =
    segments.length === 0 ? "/" : canonicalizePath(`/${segments.join("/")}`);

  if (!search) {
    return pathname;
  }

  return `${pathname}?${new URLSearchParams(search).toString()}`;
};

export const getPublishedPageMarkdown = (routeKey: string) => {
  const body = routes[routeKey];
  if (!body) {
    return;
  }

  return { markdown: body, path: routeKey };
};
