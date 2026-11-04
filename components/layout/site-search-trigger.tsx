"use client";

import { useSiteSearchOptional } from "components/search/site-search-context";
import { press } from "components/shared/motion";
import { searchCopy } from "lib/search/copy";
import { cn } from "lib/utils";
import { Search } from "lucide-react";

export function SiteSearchTrigger() {
  const siteSearch = useSiteSearchOptional();
  if (!siteSearch) return null;

  return (
    <button
      type="button"
      aria-label={searchCopy.accessibleName}
      aria-keyshortcuts="Meta+K Control+K"
      data-site-search-trigger=""
      onClick={(event) =>
        siteSearch.requestSearch(event.currentTarget.getBoundingClientRect())
      }
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-md text-neutral-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent",
        press
      )}
    >
      <Search aria-hidden="true" className="size-5" strokeWidth={1.5} />
    </button>
  );
}
