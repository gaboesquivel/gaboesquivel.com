/**
 * Every visible or announced string for site search (homepage prompt and
 * dialog) and the compose stream, in one table so tests can assert by key.
 */
export const searchCopy = {
  /** Accessible name of the nav trigger and of both search fields. */
  accessibleName: "Search this site (beta)",
  placeholder: "Ask about my work, writing, CV, or booking…",
  homeHint: "Press Enter to search. Results replace the sections below.",
  dialogHint: "Press Enter to search. Results appear below.",
  suggestionsHint:
    " Arrow keys choose a suggestion; Enter runs it; Escape closes the list.",

  suggestions: "Suggestions",
  recent: "Recent",
  examples: "Examples",
  pages: "Pages",

  composing: "Composing results…",
  resultReady: "Results ready.",
  empty: "No answer for that on this site.",
  emptyExamples: "Try one of these:",
  keywordMatches: "Keyword matches",

  errorRateLimited: "Too many searches right now. Try again later.",
  errorTimedOut: "That took too long. Try again.",
  errorFailed: "Search is unavailable right now.",
  renderFailed: "This result could not be displayed.",
  retry: "Try again",
  browse: "Or browse",

  clear: "Clear search",
  close: "Close search",
  dialogTitle: "Search this site",
  dialogDescription:
    "Generative search (beta) over projects, writing, career, and contact.",

  /** Server-side stream messages (never shown verbatim to visitors). */
  serverFailed: "Composition failed.",
  serverTimedOut: "Composition timed out.",
  serverNoAnswer: "No matching experience.",
} as const;

export const browseLinks = [
  { href: "/work", label: "work" },
  { href: "/cv", label: "the résumé" },
  { href: "/contact", label: "contact" },
] as const;

export const EXAMPLE_CHIP_COUNT = 3;
