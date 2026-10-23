"use client";

import { GeneratedRegion } from "components/genui/generated-region";
import { useGenuiComposition } from "components/genui/use-genui-composition";
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
import { useEffect, useMemo, useRef, useState } from "react";

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
  const genui = useGenuiComposition();
  const { reset: resetGenui } = genui;
  const matches = useMemo(
    () => filterSearchRecords(records, submitted),
    [records, submitted]
  );
  const inputId = variant === "home" ? homeSearchInputId : dialogSearchInputId;
  const scopeId =
    variant === "home" ? "search-scope" : "site-search-dialog-scope";

  useEffect(() => {
    if (variant !== "dialog") return;
    return () => {
      resetGenui();
    };
  }, [resetGenui, variant]);

  const showGenui =
    variant === "dialog" &&
    (genui.active || genui.isStreaming || genui.envelope || genui.error);

  const showKeywordFallback =
    variant === "dialog" &&
    genui.complete &&
    genui.error &&
    submitted.length > 0;

  return (
    <>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (!composing.current && query.trim()) {
            const trimmed = query.trim();
            setSubmitted(trimmed);
            if (variant === "dialog") {
              genui.runQuery(trimmed).catch(() => {});
            }
          }
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
            if (!value) {
              setSubmitted("");
              if (variant === "dialog") genui.reset();
            }
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
      {variant === "home" ? (
        <>
          <p role="status" className="sr-only">
            {submitted ? `${matches.length} results for ${submitted}` : ""}
          </p>
          <SearchResults
            matches={matches}
            submitted={submitted}
            onNavigate={onNavigate}
          />
        </>
      ) : null}
      {showGenui ? (
        <div className="mt-4 max-h-[min(70dvh,40rem)] overflow-x-hidden overflow-y-auto">
          <GeneratedRegion
            complete={genui.complete}
            envelope={genui.envelope}
            error={showKeywordFallback ? null : genui.error}
            isStreaming={genui.isStreaming}
            onRetry={() => {
              if (query.trim()) genui.runQuery(query.trim()).catch(() => {});
            }}
          />
        </div>
      ) : null}
      {showKeywordFallback ? (
        <div className="mt-4 border-t border-hairline pt-4">
          <p className="mb-3 text-sm text-neutral-400">
            Keyword matches for your query:
          </p>
          <SearchResults
            matches={matches}
            submitted={submitted}
            onNavigate={onNavigate}
          />
        </div>
      ) : null}
      {variant === "dialog" && !showGenui && submitted ? (
        <SearchResults
          matches={matches}
          submitted={submitted}
          onNavigate={onNavigate}
        />
      ) : null}
    </>
  );
}
