"use client";

import { GeneratedRegion } from "components/genui/generated-region";
import { useGenuiDraft } from "components/genui/genui-draft-context";
import { GenuiSearchCombobox } from "components/genui/genui-search-combobox";
import { GenuiReceipt } from "components/genui/genui-session";
import type { GenuiComposition } from "components/genui/use-genui-composition";
import {
  dialogGenuiSearchScopeId,
  dialogGenuiSuggestionsListboxId,
  dialogSearchInputId,
} from "components/search/search-ids";
import { siteColumn } from "components/shared/spacing";
import { useHydrated } from "hooks/use-hydrated";
import { searchCopy } from "lib/search/copy";
import type { ReactNode, RefObject } from "react";
import { useLayoutEffect, useRef } from "react";

/**
 * The dialog presentation of site search (same state machine and outcome
 * region as `/`). The composition and the draft session live in
 * `SiteSearchShell`, above the dialog, so closing and reopening it keeps the
 * last result, drafts and receipts for the session; the in-field × resets.
 */
export function SiteSearchPanel({
  closeControl,
  genui,
  onNavigate,
  originRef,
}: {
  /** The back arrow left of the field: closes the overlay. */
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
      [{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }],
      { duration: 320, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    );
    return () => animation.cancel();
  }, [originRef]);

  const focusField = () => inputRef.current?.focus();
  const handleQueryChange = (value: string) => genui.setQuery(value);

  return (
    <div className={siteColumn}>
      <div
        className="sticky top-0 z-10 bg-black pt-[max(1rem,env(safe-area-inset-top))] pb-2 sm:pt-6"
        ref={barRef}
      >
        <div className="relative flex items-start gap-2">
          {closeControl}
          <div className="min-w-0 flex-1">
            <GenuiSearchCombobox
              autoFocus
              describedById={dialogGenuiSearchScopeId}
              disabled={!hydrated}
              inlineSuggestions
              inputId={dialogSearchInputId}
              inputRef={inputRef}
              listboxId={dialogGenuiSuggestionsListboxId}
              onClear={() => {
                genui.reset();
                clear();
                focusField();
              }}
              onQueryChange={handleQueryChange}
              onSearchSubmit={(value, label) => {
                genui.runQuery(value, label).catch(() => {});
              }}
              query={genui.query}
              showShortcutHint
            />
          </div>
        </div>
        <p className="sr-only" id={dialogGenuiSearchScopeId}>
          {searchCopy.dialogHint}
          {searchCopy.suggestionsHint}
        </p>
        <GenuiReceipt className="mt-2 space-y-1 text-xs text-neutral-400" />
      </div>
      {genui.active ? (
        <div className="pt-10 pb-[max(1rem,env(safe-area-inset-bottom))]">
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
    </div>
  );
}
