import type { Project } from "gaboesquivel";
import type { Blog } from "lib/blog";
import { absoluteUrl, siteRelativePath } from "lib/site-path";

import { ogHeight, ogWidth, personalOgImage } from "./constants";

const blogOgImagePath = (slug: string) => `/images/og/blog/${slug}.png`;

const projectOgImagePath = (slug: string) => `/images/og/projects/${slug}.png`;

/** Frontmatter `ogImage` wins; otherwise the generated title card. */
export const blogOgMetadataImages = ({
  slug,
  ogImage,
}: Pick<Blog, "slug"> & { ogImage?: string }) => [
  {
    url: absoluteUrl(ogImage || blogOgImagePath(slug)),
    width: ogWidth,
    height: ogHeight,
    alt: "Article preview",
  },
];

/** Projects with a hero use its derivative; others fall back to the personal card. */
export const projectOgMetadataImages = ({
  slug,
  image,
}: Pick<Project, "slug" | "image">) => [
  image?.trim()
    ? {
        url: absoluteUrl(projectOgImagePath(slug)),
        width: ogWidth,
        height: ogHeight,
        alt: "Project preview",
      }
    : { ...personalOgImage, url: absoluteUrl(personalOgImage.url) },
];

export const projectOgPublicSourcePath = ({ image }: { image: string }) => {
  const relative = siteRelativePath(image);
  return relative.startsWith("/") ? `public${relative}` : `public/${relative}`;
};
