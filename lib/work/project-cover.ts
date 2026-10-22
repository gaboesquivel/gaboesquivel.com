import type { Project } from "gaboesquivel";
import { siteRelativePath } from "lib/site-path";

/** Presentation only. Project names, roles and descriptions belong to the package. */
export const homepageEditorialSlugs = [
  "legal-agent",
  "wink",
  "ztx",
  "bitlauncher",
] as const;

export type HomepageEditorialSlug = (typeof homepageEditorialSlugs)[number];

const covers: Record<HomepageEditorialSlug, { src: string; alt: string }> = {
  "legal-agent": {
    src: "/images/work/covers/legal-agent.webp",
    alt: "LegalAgent voice and bilingual chat screens",
  },
  wink: {
    src: "/images/work/covers/wink.webp",
    alt: "Wink mobile savings, spending reports and payment notification",
  },
  ztx: {
    src: "/images/work/covers/ztx.webp",
    alt: "ZTX Genesis Home Mint artwork and website",
  },
  bitlauncher: {
    src: "/images/work/covers/bitlauncher.webp",
    alt: "Bitlauncher launchpad website",
  },
};

const isHomepageEditorialSlug = (slug: string): slug is HomepageEditorialSlug =>
  slug in covers;

export const projectCover = (slug: string) =>
  isHomepageEditorialSlug(slug) ? covers[slug] : undefined;

export const resolveProjectImage = ({
  project,
}: {
  project: Pick<Project, "slug" | "title" | "image">;
}) => {
  const cover = projectCover(project.slug);
  const packageSrc = project.image
    ? siteRelativePath(project.image)
    : undefined;
  const src = cover?.src ?? packageSrc;
  if (!src) return null;
  return { src, alt: cover?.alt ?? project.title };
};

export const workCoverSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), calc(min(100vw, 72rem) - 4rem)";

/**
 * Viewport stand-in for the `@container/editorial` 48rem break inside `siteColumn`.
 * One column through ~815px; half column after that; 532px once the 6xl shell caps the slot.
 */
export const editorialCoverSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 815px) calc(100vw - 3rem), (max-width: 1023px) calc((100vw - 4.5rem) / 2), (max-width: 1151px) calc((100vw - 5.5rem) / 2), 532px";

export const evidenceUsesEditorial = ({
  presentation = "card",
  slugs,
}: {
  presentation?: "card" | "registry";
  slugs: readonly string[];
}) =>
  presentation === "registry" &&
  slugs.length > 0 &&
  slugs.every((slug) => Boolean(projectCover(slug)));
