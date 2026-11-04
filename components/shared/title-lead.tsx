"use client";

import { titleLeadTransitionName } from "lib/title-view-transition";
import { ViewTransition } from "react";

/**
 * A page title's opening word. Same word on both sides of a navigation means
 * a shared pair that is never faded (`.title-lead` in `app/global.css`), so it
 * cannot move or flicker.
 */
export const TitleLead = ({ word }: { word: string }) => (
  <ViewTransition
    default="none"
    name={titleLeadTransitionName(word)}
    share="title-lead"
  >
    <span className="inline-block">{word}</span>
  </ViewTransition>
);
