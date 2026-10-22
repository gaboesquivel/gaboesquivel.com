"use client";

import type { SearchRecord } from "components/search/types";
import { createContext, useContext } from "react";

interface SiteSearchContextValue {
  records: SearchRecord[];
  requestSearch: () => void;
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
