export const markdownSiblingPath = (pathname: string) =>
  pathname === "/" || pathname === "" ? "/index.md" : `${pathname}.md`;
