"use client";

import { useSiteSearch } from "components/search/site-search-context";
import { SiteSearchPanel } from "components/search/site-search-panel";

export function HomePrompt() {
  const { records } = useSiteSearch();

  return (
    <div className="mt-8 lg:mt-10">
      <SiteSearchPanel records={records} variant="home" />
    </div>
  );
}
