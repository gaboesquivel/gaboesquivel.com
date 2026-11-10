"use client";

import { ClearSearchButton } from "components/genui/prompt-field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "components/ui/input-group";
import { Kbd, KbdGroup } from "components/ui/kbd";
import { useHydrated } from "hooks/use-hydrated";
import { searchCopy } from "lib/search/copy";
import { cn } from "lib/utils";
import { Search } from "lucide-react";
import type { KeyboardEvent, RefObject } from "react";
import { useSyncExternalStore } from "react";

const subscribePointer = (onStoreChange: () => void) => {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
};

const getFinePointer = () => window.matchMedia("(pointer: fine)").matches;

const useFinePointer = () =>
  useSyncExternalStore(subscribePointer, getFinePointer, () => false);

const SM_QUERY = "(min-width: 640px)";

const subscribeSm = (onStoreChange: () => void) => {
  const media = window.matchMedia(SM_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
};

/** Server render assumes `sm` and up; phones swap to the short placeholder on hydration. */
const useSmUp = () =>
  useSyncExternalStore(
    subscribeSm,
    () => window.matchMedia(SM_QUERY).matches,
    () => true
  );

/**
 * The search field shared by the homepage prompt and the dialog: a
 * `type="text"` combobox (no native clear button, so Escape never erases
 * text), the visible Beta badge hidden from assistive tech (the accessible
 * name carries "beta"), and one ⌘K hint shown only when the caller says so
 * (idle and empty) and never below 640px.
 */
export function SiteSearchField({
  activeSuggestionId,
  autoFocus,
  composingRef,
  describedById,
  disabled,
  inputId,
  inputRef,
  onBlur,
  onClear,
  onCompositionEnd,
  onCompositionStart,
  onFocus,
  onInputKeyDown,
  onQueryChange,
  placeholder,
  placeholderFull,
  query,
  quiet,
  showShortcutHint,
  suggestionsListboxId,
  suggestionsOpen,
}: {
  activeSuggestionId?: string;
  autoFocus?: boolean;
  composingRef: RefObject<boolean>;
  describedById: string;
  disabled?: boolean;
  inputId: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onBlur?: () => void;
  /** Shows the in-field clear control while the field has text. */
  onClear?: () => void;
  onCompositionEnd: () => void;
  onCompositionStart: () => void;
  onFocus?: () => void;
  onInputKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  /** Replaces the full placeholder from 640px up; phones keep the short one. */
  placeholderFull?: string;
  query: string;
  /** Hides the focus ring while the field keeps focus (just after a search). */
  quiet?: boolean;
  showShortcutHint?: boolean;
  suggestionsListboxId: string;
  suggestionsOpen: boolean;
}) {
  const hydrated = useHydrated();
  const finePointer = useFinePointer();
  const smUp = useSmUp();
  const showKbd = showShortcutHint && !query && hydrated && finePointer;
  const isMac =
    hydrated &&
    typeof navigator !== "undefined" &&
    /Mac/.test(navigator.platform);

  return (
    <>
      <label htmlFor={inputId} className="sr-only">
        {searchCopy.accessibleName}
      </label>
      <InputGroup
        className={cn(
          "h-auto min-h-16 gap-2 rounded-lg border-accent/50 bg-transparent px-3 shadow-none! sm:gap-4 sm:px-5 dark:bg-transparent",
          "has-[[data-slot=input-group-control]:focus-visible]:border-accent/50 has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0",
          quiet
            ? "has-[[data-slot=input-group-control]:focus-visible]:ring-0"
            : "has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-accent"
        )}
      >
        <InputGroupAddon align="inline-start" className="pl-0">
          <Search
            aria-hidden="true"
            className="size-6 shrink-0 text-neutral-300"
            strokeWidth={1.5}
          />
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          id={inputId}
          disabled={disabled}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoFocus={autoFocus}
          placeholder={
            placeholder ??
            (smUp
              ? (placeholderFull ?? searchCopy.placeholder)
              : searchCopy.placeholderShort)
          }
          value={query}
          role="combobox"
          aria-autocomplete="list"
          aria-activedescendant={activeSuggestionId}
          aria-expanded={suggestionsOpen}
          aria-controls={suggestionsOpen ? suggestionsListboxId : undefined}
          aria-haspopup="listbox"
          onBlur={onBlur}
          onChange={(event) => onQueryChange(event.target.value)}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          onFocus={onFocus}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              (event.nativeEvent.isComposing || composingRef.current)
            ) {
              event.preventDefault();
              return;
            }
            onInputKeyDown?.(event);
          }}
          className="min-h-16 min-w-0 py-4 text-base text-white placeholder:text-neutral-400"
          aria-describedby={describedById}
        />
        {onClear && query ? (
          <InputGroupAddon align="inline-end" className="pr-0">
            <ClearSearchButton onClear={onClear} />
          </InputGroupAddon>
        ) : null}
        {showKbd ? (
          <InputGroupAddon align="inline-end" className="hidden pr-0 sm:flex">
            <KbdGroup aria-hidden="true">
              {isMac ? <Kbd>⌘</Kbd> : <Kbd>Ctrl</Kbd>}
              <Kbd>K</Kbd>
            </KbdGroup>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
    </>
  );
}
