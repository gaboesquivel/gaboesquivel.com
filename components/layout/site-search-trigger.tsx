"use client";

import { useSiteSearchOptional } from "components/search/site-search-context";
import { Search } from "lucide-react";

export function SiteSearchTrigger() {
  const siteSearch = useSiteSearchOptional();
  if (!siteSearch) return null;

  return (
    <button
      type="button"
      aria-label="Search this site"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={() => siteSearch.requestSearch()}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-neutral-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
    >
      <Search aria-hidden="true" className="size-5" strokeWidth={1.5} />
    </button>
  );
}
