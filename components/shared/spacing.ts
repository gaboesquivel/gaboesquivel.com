import { cn } from "lib/utils";

/**
 * Shared shell for nav, main, and footer. Same measure and gutters as the homepage.
 * Long-form copy uses `readingMeasure` inside this shell.
 */
export const siteColumn =
  "mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8";

/** Narrative text inside the shell. Project stories, bios, posts, and docs share it. */
export const readingMeasure = "max-w-[65ch]";

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

export const ctaLink =
  "inline-block text-accent no-underline transition-colors";

export const proseLink =
  "underline decoration-neutral-400 underline-offset-2 transition-colors dark:decoration-neutral-600";

export const sectionAction = cn(ctaLink, "text-sm");

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

export const cardArrow =
  "shrink-0 text-neutral-400 group-hover:text-accent motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover:translate-x-0.5";

export const siteFieldClass =
  "h-auto min-h-11 px-4 py-3 text-white scheme-dark focus-visible:ring-offset-0";

export const projectMedia =
  "relative mb-6 aspect-[16/9] h-auto w-full max-h-[400px]";

/** Homepage shell. Alias of `siteColumn` so `/` and every other route share one width. */
export const homeColumn = siteColumn;
export const homeSection = "mt-16 lg:mt-24";
/** Named container. Column count lives on a child via `editorialGrid`, because a container cannot query itself. */
export const editorialContainer = "@container/editorial";
export const editorialGrid =
  "grid grid-cols-1 gap-x-6 gap-y-12 @min-[48rem]/editorial:grid-cols-2";
export const editorialLink =
  "rounded-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
export const heroTitle =
  "text-[clamp(2rem,4vw,3.25rem)] sm:text-[clamp(2.5rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.045em] text-white";
export const heroPitch =
  "mt-6 max-w-[45ch] text-base leading-relaxed text-neutral-300 lg:text-lg";

export const diagramScroll =
  "mt-8 w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]";
/** Match capability diagram viewBox width (720). */
export const diagramSvg = "min-w-[720px] w-full max-w-none";

export const projectRole = "text-sm text-accent";
export const projectRoleInCard = cn(projectRole, "mt-2");
