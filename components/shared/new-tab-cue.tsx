/**
 * In-content external links open in a new tab (DESIGN.md, Links). Spread
 * `newTabProps` on the anchor and render `NewTabCue` as its last child so
 * screen readers hear the change of context. Site chrome stays same-tab.
 */
export const newTabProps = {
  rel: "noopener noreferrer",
  target: "_blank",
} as const;

export const NewTabCue = () => (
  <span className="sr-only"> (opens in new tab)</span>
);
