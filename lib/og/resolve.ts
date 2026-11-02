import type { Project } from "gaboesquivel";
import type { Blog } from "lib/blog";

import { ogHeight, ogWidth, personalOgImage } from "./constants";

export const blogOgImagePath = (slug: string) => `/images/og/blog/${slug}.png`;

export const projectOgImagePath = (slug: string) =>
  `/images/og/projects/${slug}.png`;

const absolute = (url: string, siteOrigin: string) =>
  url.startsWith("http") ? url : `${siteOrigin}${url}`;

/** Frontmatter `ogImage` wins; otherwise the generated title card. */
export const blogOgMetadataImages = ({
  slug,
  ogImage,
  siteOrigin,
}: Pick<Blog, "slug"> & { ogImage?: string; siteOrigin: string }) => [
  {
    url: absolute(ogImage || blogOgImagePath(slug), siteOrigin),
    width: ogWidth,
    height: ogHeight,
    alt: "Article preview",
  },
];

/** Projects with a hero use its derivative; others fall back to the personal card. */
export const projectOgMetadataImages = ({
  slug,
  image,
  siteOrigin,
}: Pick<Project, "slug" | "image"> & { siteOrigin: string }) => [
  image?.trim()
    ? {
        url: `${siteOrigin}${projectOgImagePath(slug)}`,
        width: ogWidth,
        height: ogHeight,
        alt: "Project preview",
      }
    : { ...personalOgImage, url: `${siteOrigin}${personalOgImage.url}` },
];

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
