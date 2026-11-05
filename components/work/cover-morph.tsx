"use client";

import { projectViewTransitionName } from "lib/work/project-view-transition";
import { createContext, use, ViewTransition } from "react";

/**
 * Cover morph names must be unique on a page. While the search overlay is
 * open, its generated cards can show a project the page underneath also
 * shows, so the page takes a suffix and the overlay keeps the shared name the
 * project hero morphs from.
 */
const CoverMorphScope = createContext("");

export const CoverMorphScoped = ({
  children,
  suffix,
}: {
  children: React.ReactNode;
  suffix: string;
}) => <CoverMorphScope value={suffix}>{children}</CoverMorphScope>;

/** Wraps a project cover in the card-to-detail morph (DESIGN.md, M-B). */
export const CoverMorph = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => (
  <ViewTransition
    name={`${projectViewTransitionName(slug)}${use(CoverMorphScope)}`}
    share="morph"
    default="none"
  >
    {children}
  </ViewTransition>
);
