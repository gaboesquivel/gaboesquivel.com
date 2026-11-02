"use client";

import { GeneratedRegion } from "components/genui/generated-region";
import { GenuiSearchCombobox } from "components/genui/genui-search-combobox";
import {
  GenuiReceipt,
  GenuiSessionProvider,
  genuiWritesEnabled,
} from "components/genui/genui-session";
import { ClearSearchButton } from "components/genui/prompt-field";
import { useGenuiComposition } from "components/genui/use-genui-composition";
import {
  dialogGenuiSearchScopeId,
  dialogGenuiSuggestionsListboxId,
  dialogSearchInputId,
} from "components/search/search-ids";
import { useHydrated } from "hooks/use-hydrated";
import { searchCopy } from "lib/search/copy";
import type { ReactNode } from "react";
import { useRef } from "react";

/** The dialog presentation of site search (same state machine and outcome region as `/`). */
export function SiteSearchPanel({
  closeControl,
  onNavigate,
}: {
  /** Visible close control placed beside the field. */
  closeControl?: ReactNode;
  onNavigate?: () => void;
}) {
  const hydrated = useHydrated();
  const genui = useGenuiComposition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusField = () => inputRef.current?.focus();
  const handleQueryChange = (value: string) => genui.setQuery(value);

  return (
    <GenuiSessionProvider writesEnabled={genuiWritesEnabled(genui)}>
      <div
        className="sticky top-0 z-10 -mx-4 bg-black px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 sm:pt-4"
        data-search-field-bar=""
      >
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <GenuiSearchCombobox
              autoFocus
              describedById={dialogGenuiSearchScopeId}
              disabled={!hydrated}
              inlineSuggestions
              inputId={dialogSearchInputId}
              inputRef={inputRef}
              leadingAction={
                genui.active ? (
                  <ClearSearchButton
                    onClear={() => {
                      genui.reset();
                      focusField();
                    }}
                  />
                ) : undefined
              }
              listboxId={dialogGenuiSuggestionsListboxId}
              onQueryChange={handleQueryChange}
              onSearchSubmit={(value) => {
                genui.runQuery(value).catch(() => {});
              }}
              query={genui.query}
            />
          </div>
          {closeControl}
        </div>
        <p className="sr-only" id={dialogGenuiSearchScopeId}>
          {searchCopy.dialogHint}
          {searchCopy.suggestionsHint}
        </p>
      </div>
      {genui.active ? (
        <div className="pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <GenuiReceipt className="mb-3 space-y-1 text-xs text-neutral-400" />
          <GeneratedRegion
            envelope={genui.envelope}
            error={genui.error}
            onExample={(example) => {
              genui.runQuery(example).catch(() => {});
              focusField();
            }}
            onNavigate={onNavigate}
            onRetry={() => {
              genui.retry();
              focusField();
            }}
            status={genui.status}
            submitted={genui.submitted}
          />
        </div>
      ) : null}
    </GenuiSessionProvider>
  );
}
