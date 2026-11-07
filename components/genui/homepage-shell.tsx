"use client";

import { GenuiSearchCombobox } from "components/genui/genui-search-combobox";
import {
  homeGenuiSearchScopeId,
  homeGenuiSuggestionsListboxId,
  homeSearchInputId,
} from "components/search/search-ids";
import { useSiteSearchOptional } from "components/search/site-search-context";
import { useHydrated } from "hooks/use-hydrated";
import { searchCopy } from "lib/search/copy";
import Link from "next/link";
import { useRef, useState } from "react";

/**
 * The homepage "Ask me something" field. It is a real field in place: the
 * visitor types and picks suggestions here, and only when they search (Enter
 * or a suggestion) does the one search overlay open, with the field gliding
 * up to the top. The nav icon and Cmd/Ctrl+K open the overlay directly.
 * Without JavaScript it falls back to browse/contact copy.
 */
const HomeSearchField = () => {
  const siteSearch = useSiteSearchOptional();
  const hydrated = useHydrated();
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-10 lg:mt-20 lg:px-8">
      <div data-home-search-field="" ref={wrapRef}>
        <GenuiSearchCombobox
          describedById={homeGenuiSearchScopeId}
          disabled={!(hydrated && siteSearch)}
          inputId={homeSearchInputId}
          listboxId={homeGenuiSuggestionsListboxId}
          onClear={() => setQuery("")}
          onQueryChange={setQuery}
          onSearchSubmit={(value, label) => {
            siteSearch?.requestSearch(
              wrapRef.current?.getBoundingClientRect(),
              {
                label,
                query: value,
              }
            );
            setQuery("");
          }}
          placeholderFull={searchCopy.homePlaceholder}
          query={query}
          showShortcutHint={query.length === 0}
        />
      </div>
      <p className="sr-only" id={homeGenuiSearchScopeId}>
        {searchCopy.dialogHint}
        {searchCopy.suggestionsHint}
      </p>
      <noscript>
        <p className="mt-2 text-xs text-neutral-400">
          Browse the sections below, or{" "}
          <Link className="text-accent hover:underline" href="/contact">
            contact
          </Link>{" "}
          to reach out.
        </p>
      </noscript>
    </div>
  );
};

export const HomepageGenUiShell = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="relative">
    <HomeSearchField />
    {children}
  </div>
);
