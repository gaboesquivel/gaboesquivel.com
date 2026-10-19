import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { comparePublishedAtDesc } from "../../lib/blog-order";
import { isArchivePost } from "../../lib/blog-taxonomy";
import { absoluteUrl } from "./format";
import { canonicalizePath } from "./routes";

const CONTENT_DIR = join(process.cwd(), "content");

const CONTRACTING_SLUG = "2025-11-1099-contracting";

export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  category?: string[];
  tech?: string[];
  body: string;
}

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return null;
  }

  const [, frontmatter, body] = match;
  const fields: Record<string, string | string[]> = {};

  for (const line of frontmatter.split("\n")) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (!keyMatch) {
      continue;
    }

    const [, key, value] = keyMatch;
    if (value.startsWith("[")) {
      fields[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      fields[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }

  return { body, fields };
};

const normalizeMdxBody = (body: string) =>
  body
    .replaceAll(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replaceAll(
      /<div[^>]*className="[^"]*(?:image-container|min-h-\[[^\]]+\])[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/div>/g,
      "$1"
    )
    .replaceAll('<div className="my-4"></div>', "")
    .replaceAll(
      /<YouTube\s+id="([^"]+)"(?:\s+title="([^"]*)")?\s*\/>/g,
      (_, id, title) =>
        `[${title || "YouTube video"}](https://www.youtube.com/watch?v=${id})`
    )
    .replaceAll(
      /<Vimeo\s+id="([^"]+)"(?:\s+title="([^"]*)")?\s*\/>/g,
      (_, id, title) => `[${title || "Vimeo video"}](https://vimeo.com/${id})`
    )
    .replaceAll(
      /!\[([^\]]*)\]\((\/[^)]+)\)/g,
      (_, alt, path) => `![${alt}](${absoluteUrl(path)})`
    )
    .replaceAll(/<[^>]+>/g, "")
    .replaceAll(/\n{3,}/g, "\n\n")
    .trim();

const rewriteBlogLinks = (text: string) =>
  text.replaceAll(/\[([^\]]+)\]\((\/[^)]+)\)/g, (_match, label, path) => {
    const canonical = canonicalizePath(path);
    if (!canonical) {
      return label;
    }
    return `[${label}](${absoluteUrl(canonical)})`;
  });

export const loadBlogPosts = () => {
  const files = readdirSync(CONTENT_DIR).filter((file) =>
    file.endsWith(".mdx")
  );

  return files
    .flatMap((file) => {
      const raw = readFileSync(join(CONTENT_DIR, file), "utf-8");
      const parsed = parseFrontmatter(raw);
      if (!parsed) {
        return [];
      }

      const slug = file.replace(/\.mdx$/, "");
      const { fields, body } = parsed;

      return [
        {
          body: normalizeMdxBody(body),
          category: Array.isArray(fields.category)
            ? fields.category
            : undefined,
          publishedAt: String(fields.publishedAt ?? ""),
          slug,
          summary: String(fields.summary ?? ""),
          tech: Array.isArray(fields.tech) ? fields.tech : undefined,
          title: String(fields.title ?? slug),
        },
      ];
    })
    .sort(comparePublishedAtDesc);
};

export const isArchivePostFromBlog = (post: BlogPost) =>
  isArchivePost(post.publishedAt);

export const renderBlogMarkdown = (post: BlogPost) => {
  const historical = isArchivePostFromBlog(post);
  const meta = [
    `**Published:** ${post.publishedAt}`,
    historical
      ? "**Status:** historical (views and technology at time of publication)"
      : "",
    post.slug === CONTRACTING_SLUG
      ? "**Content type:** personal contracting setup (not legal or tax guidance; see /ask for engagement)"
      : "",
    post.summary ? `**Summary:** ${post.summary}` : "",
    post.category?.length ? `**Categories:** ${post.category.join(", ")}` : "",
    post.tech?.length ? `**Technologies:** ${post.tech.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return rewriteBlogLinks(`${meta}\n\n${post.body}`.trim());
};
