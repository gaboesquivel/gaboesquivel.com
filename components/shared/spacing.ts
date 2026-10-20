import { cn } from "lib/utils";

/** Reading column: nav, page body, and /ask chat share this width and gutters. */
export const siteColumn = "mx-auto w-full max-w-4xl min-w-0 px-4 sm:px-6";

/** Sticky header: tight under accent bar; room below nav matches block cadence (2rem). */
export const headerColumnPadding = "pt-4 pb-8";

export const proseClass = "prose prose-neutral dark:prose-invert";

export const blockSpacing = "mt-8";
export const sectionSpacing = "mt-12";
export const titleSpacing = "mb-6";
export const headingSpacing = "mb-4";
export const sectionHeadingSpacing = "mb-8";
export const sectionHeadingRow = cn(
  sectionHeadingSpacing,
  "flex items-baseline justify-between gap-4"
);
export const sectionAction = "cta-link text-sm";

export const pageTitle = cn(
  titleSpacing,
  "text-2xl font-bold tracking-tighter sm:text-3xl"
);

export const indexTitle = cn(pageTitle, "max-w-[650px]");

export const sectionTitle = "text-2xl font-semibold tracking-tight";

export const subHeading = cn(headingSpacing, blockSpacing, "text-xl font-bold");

export const subHeadingSm = cn(
  headingSpacing,
  blockSpacing,
  "text-base font-bold tracking-tighter"
);

export const twoColGrid = "grid grid-cols-1 gap-4 md:grid-cols-2";

export const singleColGrid = "grid grid-cols-1 gap-4";

export const blockGrid = cn(blockSpacing, twoColGrid);

export const siteCardSurface =
  "flex flex-col gap-0 rounded-lg border border-neutral-200 bg-transparent shadow-none ring-0 dark:border-hairline";

export const siteCardInteractive =
  "transition-[color,background-color,transform] ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:duration-[160ms] motion-safe:active:scale-[0.97] motion-reduce:duration-[80ms] motion-reduce:active:scale-[0.99] hover:bg-neutral-100 hover:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:hover:bg-neutral-800 dark:hover:text-white";

export const cardLink = cn(
  siteCardSurface,
  siteCardInteractive,
  "h-full w-full p-4"
);

export const siteFieldClass =
  "min-h-11 w-full rounded-lg border border-hairline bg-transparent px-4 py-3 text-white scheme-dark focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0 focus-visible:outline-none disabled:opacity-50";

export const projectMedia =
  "relative mb-6 aspect-[16/9] h-auto w-full max-h-[400px]";
