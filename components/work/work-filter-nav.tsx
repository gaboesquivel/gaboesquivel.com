"use client";

import { press } from "components/shared/motion";
import { cn } from "lib/utils";
import { workTypeHref, workTypeOptions } from "lib/work-types";
import type { WorkType } from "lib/work-types";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";

const scrollWorkToTop = () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  window.scrollTo({
    behavior: reducedMotion ? "instant" : "smooth",
    top: 0,
  });
};

const edgeFade = "2rem";

/** Fade only the edges that hide more chips, so overflow reads as scrollable. */
const edgeMask = ({ start, end }: { start: boolean; end: boolean }) =>
  start || end
    ? `linear-gradient(to right, ${start ? "transparent" : "#000"}, #000 ${edgeFade}, #000 calc(100% - ${edgeFade}), ${end ? "transparent" : "#000"})`
    : undefined;

export const WorkFilterNav = ({ type }: { type: WorkType }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ end: false, start: false });

  const updateEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const next = {
      end: scroller.scrollLeft < maxScroll - 1,
      start: scroller.scrollLeft > 1,
    };
    setEdges((prev) =>
      prev.start === next.start && prev.end === next.end ? prev : next
    );
  }, []);

  // Center the selected chip inside the scroller (never scrolls the page).
  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>(
      `[data-work-type="${type}"]`
    );
    if (scroller && active) {
      scroller.scrollLeft =
        active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
    }
    updateEdges();
  }, [type, updateEdges]);

  useEffect(() => {
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const mask = edgeMask(edges);

  return (
    <div data-work-filter>
      <nav
        aria-label="Work types"
        className="rounded-lg border border-hairline p-1"
      >
        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          onFocus={(event) => {
            // Keep a keyboard-focused chip clear of the faded edges.
            const scroller = scrollerRef.current;
            const chip = event.target;
            if (!scroller || !(chip instanceof HTMLElement)) return;
            scroller.scrollLeft =
              chip.offsetLeft - (scroller.clientWidth - chip.offsetWidth) / 2;
          }}
          className="relative flex min-w-0 flex-nowrap gap-1 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]"
          style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
        >
          {workTypeOptions.map((option) => {
            const isActive = option === type;
            return (
              <Link
                key={option}
                data-work-type={option}
                href={workTypeHref({ type: option })}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                onNavigate={scrollWorkToTop}
                className={cn(
                  press,
                  "relative inline-flex min-h-11 shrink-0 items-center rounded-md px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                  isActive
                    ? "text-accent"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                )}
              >
                {isActive ? (
                  <ViewTransition name="work-filter-indicator">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-md bg-neutral-800"
                    />
                  </ViewTransition>
                ) : null}
                <span className="relative z-10">{option}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
