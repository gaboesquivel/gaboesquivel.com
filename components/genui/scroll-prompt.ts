export const scrollPromptToViewportTop = ({
  element,
}: {
  element: HTMLElement | null;
}) => {
  if (!element) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  element.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};
