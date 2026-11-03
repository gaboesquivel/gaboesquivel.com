"use client";

import { projectViewTransitionName } from "lib/work/project-view-transition";
import { createContext, use, ViewTransition } from "react";

/**
 * Cover morph names must be unique on a page. Generated results (homepage
 * search and the dialog) can render a card for a project the page already
 * shows, so they turn the morph off for everything inside them.
 */
const CoverMorphEnabled = createContext(true);

export const CoverMorphOff = ({ children }: { children: React.ReactNode }) => (
  <CoverMorphEnabled value={false}>{children}</CoverMorphEnabled>
);

/** Wraps a project cover in the card-to-detail morph (DESIGN.md, M-B). */
export const CoverMorph = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) =>
  use(CoverMorphEnabled) ? (
    <ViewTransition
      name={projectViewTransitionName(slug)}
      share="morph"
      default="none"
    >
      {children}
    </ViewTransition>
  ) : (
    children
  );
