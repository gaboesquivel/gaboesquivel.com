/**
 * Every visible or announced string for site search (homepage prompt and
 * dialog) and the compose stream, in one table so tests can assert by key.
 */
export const searchCopy = {
  /** Accessible name of the nav trigger and of both search fields. */
  accessibleName: "Search this site (beta)",
  placeholder: "what agentic products have you built ?",
  /** Homepage field only, 640px and up; the dialog keeps `placeholder`. */
  homePlaceholder: "what agentic products have you built ?",
  /** Below 640px; the accessible name stays `accessibleName`. */
  placeholderShort: "Ask about my work…",
  dialogHint: "Press Enter to search. Results appear below.",
  suggestionsHint:
    " Arrow keys choose a suggestion; Enter runs it; Escape closes the list.",

  suggestions: "Suggestions",
  recent: "Recent",
  examples: "Examples",
  pages: "Pages",

  composing: "Composing results…",
  stop: "Stop",
  stopped: "Stopped.",
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

/**
 * Quiet status line per compose stage (stream `stage` events). Never a raw
 * tool or model name.
 */
export const composeStageCopy = {
  planning: "Planning…",
  projects: "Finding projects…",
  writing: "Finding posts…",
  career: "Checking the résumé…",
  availability: "Checking availability…",
  answer: "Writing the answer…",
} as const;

export type ComposeStage = keyof typeof composeStageCopy;

export const isComposeStage = (value: unknown): value is ComposeStage =>
  typeof value === "string" && Object.hasOwn(composeStageCopy, value);

const counted = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`;

/**
 * The settled result's evidence: "Based on 4 projects and 2 posts". Null
 * when the result cites no projects or posts.
 */
export const sourceLine = ({
  posts,
  projects,
}: {
  posts: number;
  projects: number;
}) => {
  const parts = [
    projects ? counted(projects, "project", "projects") : null,
    posts ? counted(posts, "post", "posts") : null,
  ].filter(Boolean);
  return parts.length ? `Based on ${parts.join(" and ")}` : null;
};

export const browseLinks = [
  { href: "/work", label: "work" },
  { href: "/cv", label: "the résumé" },
  { href: "/contact", label: "contact" },
] as const;

export const EXAMPLE_CHIP_COUNT = 3;
