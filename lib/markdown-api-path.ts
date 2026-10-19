export const markdownApiRewritePath = (pathname: string) => {
  if (pathname.endsWith(".md")) {
    const base =
      pathname === "/index.md" ? "/" : pathname.slice(0, -".md".length);
    return base === "/" ? "/api/markdown" : `/api/markdown${base}`;
  }
  return pathname === "/" ? "/api/markdown" : `/api/markdown${pathname}`;
};

export const skipMarkdownNegotiation = (pathname: string) =>
  pathname.startsWith("/api") ||
  pathname.startsWith("/_next") ||
  pathname.startsWith("/_vercel") ||
  pathname.startsWith("/_eve_internal") ||
  pathname === "/eve" ||
  pathname.startsWith("/eve/") ||
  pathname === "/mcp" ||
  pathname.startsWith("/mcp/") ||
  pathname === "/llms.txt" ||
  pathname === "/llms-full.txt" ||
  pathname.startsWith("/.well-known") ||
  (/\.[^/]+$/.test(pathname) && !pathname.endsWith(".md"));
