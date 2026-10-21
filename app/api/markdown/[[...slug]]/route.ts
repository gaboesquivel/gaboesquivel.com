import { markdownResponseHeaders } from "lib/accept-markdown";
import {
  getPublishedPageMarkdown,
  resolvePageRouteKey,
} from "lib/api/markdown-corpus";
import { markdownApiRewritePath } from "lib/markdown-api-path";
import { markdownNotFoundBody } from "lib/markdown-not-found";

export const runtime = "nodejs";

const prefix = "/api/markdown";

const pagePathFromApiPathname = (pathname: string) =>
  pathname === prefix || pathname === `${prefix}/`
    ? "/"
    : pathname.slice(prefix.length) || "/";

const resolveRequestTarget = (req: Request) => {
  const rewrite = req.headers.get("x-middleware-rewrite");
  if (rewrite) {
    const { pathname, search } = new URL(rewrite, "https://gaboesquivel.com");
    return {
      pagePath: pagePathFromApiPathname(pathname),
      search: search.replace(/^\?/, ""),
    };
  }

  const { pathname, search } = new URL(req.url);
  if (pathname.startsWith(prefix)) {
    return {
      pagePath: pagePathFromApiPathname(pathname),
      search: search.replace(/^\?/, ""),
    };
  }

  if (pathname.endsWith(".md")) {
    const apiPath = markdownApiRewritePath(pathname);
    const { pathname: apiPathname, search: apiSearch } = new URL(
      apiPath,
      "https://gaboesquivel.com"
    );
    return {
      pagePath: pagePathFromApiPathname(apiPathname),
      search: apiSearch.replace(/^\?/, ""),
    };
  }

  return {
    pagePath: pathname === "" ? "/" : pathname,
    search: search.replace(/^\?/, ""),
  };
};

const pageSegments = (pagePath: string) =>
  pagePath === "/" || pagePath === ""
    ? ["_root"]
    : pagePath.slice(1).split("/").filter(Boolean);

export const GET = async (req: Request) => {
  const { pagePath, search } = resolveRequestTarget(req);
  const key = resolvePageRouteKey({
    search,
    segments: pageSegments(pagePath),
  });
  const body = getPublishedPageMarkdown(key)?.markdown;

  if (!body) {
    return new Response(markdownNotFoundBody, {
      status: 404,
      headers: markdownResponseHeaders(),
    });
  }

  return new Response(body, { headers: markdownResponseHeaders() });
};
