"use client";

import { press } from "components/shared/motion";
import { cn } from "lib/utils";
import { workTypeHref, workTypeOptions } from "lib/work-types";
import type { WorkType } from "lib/work-types";
import Link from "next/link";
import { ViewTransition } from "react";

const scrollWorkToTop = () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  window.scrollTo({
    behavior: reducedMotion ? "instant" : "smooth",
    top: 0,
  });
};

const keepActiveFilterVisible = (node: HTMLAnchorElement | null) => {
  node?.scrollIntoView({
    behavior: "instant",
    block: "nearest",
    inline: "nearest",
  });
};

export const WorkFilterNav = ({ type }: { type: WorkType }) => (
  <div data-work-filter className="sticky top-0 z-30 bg-black">
    <nav
      aria-label="Work types"
      className="rounded-lg border border-hairline p-1"
    >
      <div className="flex min-w-0 flex-nowrap gap-1 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        {workTypeOptions.map((option) => {
          const isActive = option === type;
          return (
            <Link
              key={option}
              ref={isActive ? keepActiveFilterVisible : undefined}
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
