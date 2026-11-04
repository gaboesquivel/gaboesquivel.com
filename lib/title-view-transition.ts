/**
 * Shared `<ViewTransition>` name for a page title's opening word. Pages that
 * open with the same word (`/` and `/work`: "Software") share a pair, so the
 * word stays painted in place while the rest of the title changes.
 */
export const titleLeadTransitionName = (word: string) =>
  `title-lead-${word.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
