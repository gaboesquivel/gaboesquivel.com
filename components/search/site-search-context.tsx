"use client";

import type { SearchRecord } from "components/search/types";
import { createContext, useContext } from "react";

interface SiteSearchContextValue {
  records: SearchRecord[];
  /** `origin` is the trigger's rect; the field animates from it to the top. */
  requestSearch: (origin?: DOMRect) => void;
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
