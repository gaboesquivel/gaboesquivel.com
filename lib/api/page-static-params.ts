import {
  getPublishedPageMarkdown,
  listPublishedPagePaths,
} from "./markdown-corpus";

export const routeKeyToPathSegments = (routeKey: string) => {
  const pathname = routeKey.split("?")[0];
  if (pathname === "/") {
    return ["_root"];
  }

  return pathname.slice(1).split("/");
};

export const publishedPageStaticParams = () =>
  listPublishedPagePaths()
    .filter((routeKey) => !routeKey.includes("?"))
    .filter((routeKey) => getPublishedPageMarkdown(routeKey))
    .map((routeKey) => ({ path: routeKeyToPathSegments(routeKey) }));
