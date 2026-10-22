"use client";

import { diagramScroll } from "components/shared/spacing";
import { useRef } from "react";
import type { ReactNode } from "react";

const scrollStep = 72;

const scrollDiagram = ({
  direction,
  node,
}: {
  direction: -1 | 1;
  node: HTMLDivElement | null;
}) => {
  if (!node) return;
  node.scrollBy({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    left: direction * scrollStep,
  });
};

export function DiagramScroll({
  children,
  labelledBy,
}: {
  children: ReactNode;
  labelledBy: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hintId = `${labelledBy}-scroll-hint`;

  return (
    <figure className="mt-8">
      <div
        aria-describedby={hintId}
        className={diagramScroll}
        ref={scrollerRef}
      >
        {children}
      </div>
      <figcaption
        className="mt-2 flex items-center justify-between gap-4 text-xs tracking-wide text-neutral-500 md:hidden"
        id={hintId}
      >
        <span>Scroll horizontally to read the full diagram.</span>
        <span className="flex shrink-0 gap-3">
          <button
            aria-label="Scroll diagram left"
            className="text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            onClick={() =>
              scrollDiagram({ direction: -1, node: scrollerRef.current })
            }
            type="button"
          >
            ←
          </button>
          <button
            aria-label="Scroll diagram right"
            className="text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            onClick={() =>
              scrollDiagram({ direction: 1, node: scrollerRef.current })
            }
            type="button"
          >
            →
          </button>
        </span>
      </figcaption>
    </figure>
  );
}
