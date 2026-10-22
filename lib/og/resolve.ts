import type { Project } from "gaboesquivel";
import type { Blog } from "lib/blog";
import { siteOgAlt } from "lib/site-identity";

import { articleOgVisualBySlug } from "./article-visuals";
import type { ArticleOgVisualKey } from "./article-visuals";
import { ogHeight, ogWidth, personalOgImage, personalOgUrl } from "./constants";

export const blogOgImagePath = (slug: string) => `/images/og/blog/${slug}.png`;

export const projectOgImagePath = (slug: string) =>
  `/images/og/projects/${slug}.png`;

export type BlogOgSource =
  | { kind: "override"; path: string }
  | { kind: "generated"; slug: string; visual: ArticleOgVisualKey | null }
  | { kind: "personal" };

export const resolveBlogOg = ({
  slug,
  ogImage,
}: Pick<Blog, "slug"> & { ogImage?: string }): BlogOgSource => {
  if (ogImage) return { kind: "override", path: ogImage };
  const visual = articleOgVisualBySlug[slug] ?? null;
  return { kind: "generated", slug, visual };
};

export const blogOgMetadataImages = ({
  slug,
  ogImage,
  siteOrigin,
}: Pick<Blog, "slug"> & {
  ogImage?: string;
  siteOrigin: string;
}) => {
  const source = resolveBlogOg({ slug, ogImage });
  if (source.kind === "override")
    return [
      {
        url: source.path.startsWith("http")
          ? source.path
          : `${siteOrigin}${source.path}`,
        width: ogWidth,
        height: ogHeight,
        alt: "Article preview",
      },
    ];
  if (source.kind === "generated")
    return [
      {
        url: `${siteOrigin}${blogOgImagePath(source.slug)}`,
        width: ogWidth,
        height: ogHeight,
        alt: "Article preview",
      },
    ];
  return [personalOgImage];
};

export type ProjectOgSource =
  | { kind: "hero"; path: string; slug: string }
  | { kind: "personal" };

export const resolveProjectOg = ({
  slug,
  image,
}: Pick<Project, "slug" | "image">): ProjectOgSource => {
  if (!image?.trim()) return { kind: "personal" };
  return { kind: "hero", path: image, slug };
};

export const projectOgMetadataImages = ({
  slug,
  image,
  siteOrigin,
}: Pick<Project, "slug" | "image"> & { siteOrigin: string }) => {
  const source = resolveProjectOg({ slug, image });
  if (source.kind === "personal")
    return [
      {
        url: `${siteOrigin}${personalOgUrl}`,
        width: ogWidth,
        height: ogHeight,
        alt: siteOgAlt,
      },
    ];

  return [
    {
      url: `${siteOrigin}${projectOgImagePath(source.slug)}`,
      width: ogWidth,
      height: ogHeight,
      alt: "Project preview",
    },
  ];
};

export const projectOgPublicSourcePath = ({
  image,
  siteOrigin,
}: {
  image: string;
  siteOrigin: string;
}) => {
  const relative = image.replace(siteOrigin, "");
  return relative.startsWith("/") ? `public${relative}` : `public/${relative}`;
};
