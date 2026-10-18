export const markdownSiblingPath = (pathname: string) =>
  pathname === "/" || pathname === "" ? "/index.md" : `${pathname}.md`;

export const markdownAlternateLink = (pathname: string) => ({
  rel: "alternate" as const,
  type: "text/markdown",
  url: markdownSiblingPath(pathname),
});
