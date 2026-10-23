"use client";

import { GenuiSearchBetaBadge } from "components/genui/genui-search-beta-badge";
import {
  searchHint,
  searchLabel,
  searchPlaceholder,
} from "components/search/search-copy";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "components/ui/input-group";
import { Kbd, KbdGroup } from "components/ui/kbd";
import { useHydrated } from "hooks/use-hydrated";
import { cn } from "lib/utils";
import { Search } from "lucide-react";
import type { RefObject } from "react";
import { useSyncExternalStore } from "react";

const subscribePointer = (onStoreChange: () => void) => {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
};

const getFinePointer = () => window.matchMedia("(pointer: fine)").matches;

const useFinePointer = () =>
  useSyncExternalStore(subscribePointer, getFinePointer, () => false);

export function SiteSearchField({
  inputId,
  query,
  disabled,
  showShortcutHint,
  showGenuiBetaBadge,
  autoFocus,
  describedById,
  composingRef,
  onQueryChange,
  onCompositionStart,
  onCompositionEnd,
}: {
  inputId: string;
  query: string;
  disabled?: boolean;
  showShortcutHint?: boolean;
  showGenuiBetaBadge?: boolean;
  autoFocus?: boolean;
  describedById: string;
  composingRef: RefObject<boolean>;
  onQueryChange: (value: string) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
}) {
  const hydrated = useHydrated();
  const finePointer = useFinePointer();
  const showKbd = showShortcutHint && hydrated && finePointer;
  const isMac =
    hydrated &&
    typeof navigator !== "undefined" &&
    /Mac/.test(navigator.platform);

  return (
    <>
      <label htmlFor={inputId} className="sr-only">
        {searchLabel}
      </label>
      <InputGroup
        className={cn(
          "h-auto min-h-16 gap-4 rounded-lg border-accent/50 bg-transparent px-5 shadow-none! dark:bg-transparent",
          "has-[[data-slot=input-group-control]:focus-visible]:border-accent/50 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-accent has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0"
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
          id={inputId}
          disabled={disabled}
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder={searchPlaceholder}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              (event.nativeEvent.isComposing || composingRef.current)
            ) {
              event.preventDefault();
            }
          }}
          className="min-h-16 py-4 text-base text-white placeholder:text-neutral-400"
          aria-describedby={describedById}
        />
        {showGenuiBetaBadge ? (
          <InputGroupAddon align="inline-end" className="pr-0">
            <GenuiSearchBetaBadge />
          </InputGroupAddon>
        ) : null}
        {showKbd ? (
          <InputGroupAddon align="inline-end" className="pr-0">
            <KbdGroup aria-hidden="true">
              {isMac ? <Kbd>⌘</Kbd> : <Kbd>Ctrl</Kbd>}
              <Kbd>K</Kbd>
            </KbdGroup>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
      <p id={describedById} className="sr-only">
        {searchHint}
      </p>
    </>
  );
}
