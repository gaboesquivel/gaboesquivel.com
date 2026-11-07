import { useLayoutEffect } from "react";
import type { RefObject } from "react";

let pending = false;

/** Call from a subnav link's `onNavigate`; the next subnav to render scrolls. */
export const requestSubnavScroll = () => {
  pending = true;
};

/**
 * After a subnav navigation renders, scrolls so the sticky subnav sits at the
 * top of the viewport instead of jumping to the page top. The anchor is a
 * zero-height sibling placed before the nav, so its position stays put while
 * the nav is stuck. Runs before paint, so the new page's layout is measured.
 */
export const useSubnavScroll = (
  anchorRef: RefObject<HTMLElement | null>,
  key: string
) => {
  useLayoutEffect(() => {
    // `key` re-runs this when the active item changes without a remount.
    if (!key || !pending) return;
    pending = false;
    const anchor = anchorRef.current;
    const nav = anchor?.nextElementSibling;
    if (!anchor || !(nav instanceof HTMLElement)) return;
    const marginTop = Number.parseFloat(getComputedStyle(nav).marginTop) || 0;
    const top = anchor.getBoundingClientRect().top + window.scrollY + marginTop;
    // Only when scrolled past the nav: keep it pinned and let the new content
    // start right below it. Instant, so nothing animates or flickers.
    if (window.scrollY > top) {
      window.scrollTo({ behavior: "instant", top });
    }
  }, [anchorRef, key]);
};
