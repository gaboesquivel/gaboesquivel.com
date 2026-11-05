"use client";

import type { SearchSubmission } from "components/genui/use-genui-composition";
import type { SearchRecord } from "components/search/types";
import { createContext, useContext } from "react";

interface SiteSearchContextValue {
  records: SearchRecord[];
  /**
   * `origin` is the trigger's rect; the field animates from it to the top.
   * `submission` opens the overlay already running that query (the homepage
   * field, which only animates once the visitor searches).
   */
  requestSearch: (origin?: DOMRect, submission?: SearchSubmission) => void;
}

const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

export const SiteSearchProvider = SiteSearchContext.Provider;

export const useSiteSearch = () => {
  const value = useContext(SiteSearchContext);
  if (!value) {
    throw new Error("useSiteSearch must be used within SiteSearchShell");
  }
  return value;
};

export const useSiteSearchOptional = () => useContext(SiteSearchContext);
