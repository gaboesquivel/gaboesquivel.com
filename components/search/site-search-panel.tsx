"use client";

import { filterSearchRecords } from "components/search/filter-records";
import {
  dialogSearchInputId,
  homeSearchInputId,
} from "components/search/search-copy";
import { SearchResults } from "components/search/search-results";
import { SiteSearchField } from "components/search/site-search-field";
import type { SearchRecord } from "components/search/types";
import { useHydrated } from "hooks/use-hydrated";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

function SearchBrowseLinks() {
  return (
    <>
      <Link href="/work" className="text-accent">
        work
      </Link>
      ,{" "}
      <Link href="/blog" className="text-accent">
        writing
      </Link>
      , or{" "}
      <Link href="/contact" className="text-accent">
        contact me
      </Link>
    </>
  );
}

export function SiteSearchPanel({
  records,
  variant,
  onNavigate,
}: {
  records: SearchRecord[];
  variant: "home" | "dialog";
  onNavigate?: () => void;
}) {
  const hydrated = useHydrated();
  const composing = useRef(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const matches = useMemo(
    () => filterSearchRecords(records, submitted),
    [records, submitted]
  );
  const inputId = variant === "home" ? homeSearchInputId : dialogSearchInputId;
  const scopeId =
    variant === "home" ? "search-scope" : "site-search-dialog-scope";

  return (
    <>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (!composing.current && query.trim()) setSubmitted(query.trim());
        }}
      >
        <SiteSearchField
          inputId={inputId}
          query={query}
          disabled={!hydrated}
          showShortcutHint={variant === "home"}
          autoFocus={variant === "dialog"}
          describedById={scopeId}
          composingRef={composing}
          onQueryChange={(value) => {
            setQuery(value);
            if (!value) setSubmitted("");
          }}
          onCompositionStart={() => {
            composing.current = true;
          }}
          onCompositionEnd={() => {
            window.setTimeout(() => {
              composing.current = false;
            }, 0);
          }}
        />
      </form>
      {variant === "home" ? (
        <noscript>
          <p className="mt-3 text-sm text-neutral-300">
            Search needs JavaScript. Browse <SearchBrowseLinks />.
          </p>
        </noscript>
      ) : null}
      <p role="status" className="sr-only">
        {submitted ? `${matches.length} results for ${submitted}` : ""}
      </p>
      <SearchResults
        matches={matches}
        submitted={submitted}
        onNavigate={onNavigate}
      />
    </>
  );
}
