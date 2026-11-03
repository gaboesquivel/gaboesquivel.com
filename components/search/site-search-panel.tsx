"use client";

import { GeneratedRegion } from "components/genui/generated-region";
import { useGenuiDraft } from "components/genui/genui-draft-context";
import { GenuiSearchCombobox } from "components/genui/genui-search-combobox";
import { GenuiReceipt } from "components/genui/genui-session";
import { ClearSearchButton } from "components/genui/prompt-field";
import type { GenuiComposition } from "components/genui/use-genui-composition";
import {
  dialogGenuiSearchScopeId,
  dialogGenuiSuggestionsListboxId,
  dialogSearchInputId,
} from "components/search/search-ids";
import { useHydrated } from "hooks/use-hydrated";
import { searchCopy } from "lib/search/copy";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * The dialog presentation of site search (same state machine and outcome
 * region as `/`). The composition and the draft session live in
 * `SiteSearchShell`, above the dialog, so closing and reopening it keeps the
 * last result, drafts and receipts for the session; "Clear search" resets.
 */
export function SiteSearchPanel({
  closeControl,
  genui,
  onNavigate,
}: {
  /** Visible close control placed beside the field. */
  closeControl?: ReactNode;
  genui: GenuiComposition;
  onNavigate?: () => void;
}) {
  const hydrated = useHydrated();
  const { clear } = useGenuiDraft();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusField = () => inputRef.current?.focus();
  const handleQueryChange = (value: string) => genui.setQuery(value);

  return (
    <>
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
                      clear();
                      focusField();
                    }}
                  />
                ) : undefined
              }
              listboxId={dialogGenuiSuggestionsListboxId}
              onQueryChange={handleQueryChange}
              onSearchSubmit={(value, label) => {
                genui.runQuery(value, label).catch(() => {});
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
        <GenuiReceipt className="mt-2 space-y-1 text-xs text-neutral-400" />
      </div>
      {genui.active ? (
        <div className="pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <GeneratedRegion
            envelope={genui.envelope}
            error={genui.error}
            onExample={(example, label) => {
              genui.runQuery(example, label).catch(() => {});
              focusField();
            }}
            onNavigate={onNavigate}
            onRetry={() => {
              genui.retry();
              focusField();
            }}
            onStop={() => {
              genui.stop();
              focusField();
            }}
            revealKey={genui.requestKey}
            stage={genui.stage}
            status={genui.status}
            submitted={genui.submitted}
          />
        </div>
      ) : null}
    </>
  );
}
