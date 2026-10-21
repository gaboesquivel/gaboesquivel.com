import { readdirSync } from "node:fs";
import { join } from "node:path";

import { cvKeys, projects, techStack } from "gaboesquivel";

import {
  techCategoryIds,
  techCategoryHref,
} from "../../components/tech/categories";
import { browseCategories } from "../../lib/blog-taxonomy";
import { canonicalizePath } from "../../lib/canonical-path";
import { cvPath } from "../../lib/cv-paths";
import { visibleTechStack } from "../../lib/tech-evidence";
import { workTypeHref, workTypeOptions } from "../../lib/work-types";
import { absoluteUrl } from "./format";

export { canonicalizePath };

const CONTENT_DIR = join(process.cwd(), "content");

export const buildRouteManifest = () => {
  const paths = new Set<string>([
    "/",
    "/bio",
    "/ai",
    "/web3",
    "/fullstack",
    "/frontend",
    "/backend",
    "/mobile",
    "/startups",
    "/institutions",
    "/lead",
    "/ask",
    "/cv",
    ...cvKeys.filter((key) => key !== "full").map((key) => cvPath({ key })),
    "/work",
    "/tech",
    "/blog",
    "/explore",
    "/about",
    "/contact",
    "/docs",
    "/privacy",
  ]);

  for (const project of projects) {
    paths.add(`/project/${project.slug}`);
  }
  for (const tech of visibleTechStack(techStack)) {
    paths.add(`/tech/${tech.slug}`);
  }

  for (const file of readdirSync(CONTENT_DIR).filter((f) =>
    f.endsWith(".mdx")
  )) {
    paths.add(`/blog/${file.replace(/\.mdx$/, "")}`);
  }

  for (const category of browseCategories) {
    paths.add(`/blog/category/${category}`);
  }

  for (const type of workTypeOptions) {
    paths.add(workTypeHref({ type }));
  }

  for (const id of techCategoryIds) {
    if (id !== "featured") paths.add(techCategoryHref(id));
  }

  return paths;
};

export const rewriteInternalPaths = (text: string, manifest: Set<string>) =>
  text.replaceAll(/\[([^\]]+)\]\((\/[^)]+)\)/g, (match, label, path) => {
    const canonical = canonicalizePath(path);
    if (!canonical) {
      return label;
    }
    if (!manifest.has(canonical)) {
      return match;
    }
    return `[${label}](${absoluteUrl(canonical)})`;
  });
