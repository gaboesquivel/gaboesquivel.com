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
import type { ReactNode, RefObject } from "react";
import { useLayoutEffect, useRef } from "react";

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
  originRef,
}: {
  /** Visible close control placed beside the field. */
  closeControl?: ReactNode;
  genui: GenuiComposition;
  onNavigate?: () => void;
  /** The trigger's rect, so the field bar can glide up from it. */
  originRef?: RefObject<DOMRect | null>;
}) {
  const hydrated = useHydrated();
  const { clear } = useGenuiDraft();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const barRef = useRef<HTMLDivElement | null>(null);

  // Netflix-style: the field starts where the trigger was and glides to the
  // top (FLIP with the Web Animations API; transform only). A nav icon origin
  // is small and above the fold, so it only drifts in from a short offset.
  useLayoutEffect(() => {
    const bar = barRef.current;
    const origin = originRef?.current;
    if (!bar || !origin) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const field = bar.querySelector<HTMLElement>("[data-slot=input-group]");
    const target = (field ?? bar).getBoundingClientRect();
    const wide = origin.width > 200;
    const dy = wide ? origin.top - target.top : -12;
    if (!dy) return;
    const animation = bar.animate(
      [
        { opacity: wide ? 1 : 0, transform: `translateY(${dy}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 320, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    );
    return () => animation.cancel();
  }, [originRef]);

  const focusField = () => inputRef.current?.focus();
  const handleQueryChange = (value: string) => genui.setQuery(value);

  return (
    <>
      <div
        className="sticky top-0 z-10 -mx-4 bg-black px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 sm:-mx-6 sm:px-6 sm:pt-6 lg:-mx-8 lg:px-8"
        data-search-field-bar=""
        ref={barRef}
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
