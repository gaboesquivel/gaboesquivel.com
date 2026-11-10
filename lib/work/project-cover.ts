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

/**
 * `object-position` per project slug when a centered `object-cover` crop would
 * clip the subject (adjust focal position, never edit the asset).
 */
const coverFocus: Record<string, string> = {
  // Logos on the left edge of 2:1 legacy screenshots.
  "arinc-microfids": "0% 50%",
  // Wordmark sits top-left; keep it inside 21:9 and 16:10 frames.
  bitlauncher: "20% 20%",
  its: "0% 50%",
  staples: "0% 50%",
};

export const projectCoverPosition = ({ slug }: { slug: string }) =>
  coverFocus[slug] ?? "50% 50%";

/**
 * Intrinsic widths of package covers narrower than the project-page frame.
 * Frames cap at this width so legacy sources never upscale into a blur.
 */
const smallCoverWidths: Record<string, number> = {
  "/images/work/abolicao.jpg": 660,
  "/images/work/amex.jpg": 660,
  "/images/work/arinc.png": 660,
  "/images/work/eatarcade.jpg": 660,
  "/images/work/jockey-hollow-menu.png": 660,
  "/images/work/jockey-hollow.png": 660,
  "/images/work/living-with-dryness.jpg": 660,
  "/images/work/mobtion.jpg": 660,
  "/images/work/money-talk.jpg": 660,
  "/images/work/panini.jpg": 660,
  "/images/work/proparques.jpg": 660,
  "/images/work/scotiatico.jpg": 660,
  "/images/work/staples.jpg": 660,
  "/images/work/suntrust-1.jpg": 660,
  "/images/work/tikr.jpg": 688,
  "/images/work/tribenzor.jpg": 660,
  "/images/work/website-its.jpg": 660,
  "/images/work/wordpress-earth-pai.jpg": 660,
};

export const projectCoverMaxWidth = ({ src }: { src: string }) =>
  smallCoverWidths[src];

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
