import type { Project } from "gaboesquivel";
import { siteRelativePath } from "lib/site-path";

/** Homepage selected-work slugs (layout only; images come from the package). */
export const homepageEditorialSlugs = [
  "legal-agent",
  "wink",
  "ztx",
  "bitlauncher",
] as const;

export const resolveProjectImage = ({
  project,
}: {
  project: Pick<Project, "title" | "image">;
}) => {
  const src = project.image ? siteRelativePath(project.image) : undefined;
  if (!src) return null;
  return { src, alt: project.title };
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
  presentation?: "card" | "registry" | "editorial";
  slugs: readonly string[];
}) =>
  presentation === "editorial" ||
  (presentation === "registry" && slugs.length > 0);
