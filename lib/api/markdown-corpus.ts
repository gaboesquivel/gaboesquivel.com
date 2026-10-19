import { canonicalizePath } from "lib/canonical-path";

import corpus from "../../generated/markdown-routes.json";

const routes = corpus as Record<string, string>;

export { listPublishedPagePaths } from "./published-page-paths";

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
