import GithubSlugger from "github-slugger";

export interface BlogTocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const stripFrontmatter = (source: string) =>
  source.replace(/^---[\s\S]*?---\n?/, "");

const cleanHeadingText = (raw: string) =>
  raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*|__/g, "")
    .trim();

/** Matches `rehype-slug` / `github-slugger` ids for ## and ### headings. */
export const extractBlogToc = (source: string): BlogTocItem[] => {
  const body = stripFrontmatter(source);
  const slugger = new GithubSlugger();
  const items: BlogTocItem[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!match) continue;

    const level = match[1].length;
    if (level !== 2 && level !== 3) continue;

    const text = cleanHeadingText(match[2]);
    if (!text) continue;

    items.push({
      id: slugger.slug(text),
      text,
      level: level as 2 | 3,
    });
  }

  return items;
};

export const showBlogToc = (items: readonly BlogTocItem[]) => items.length >= 2;
