"use client";

import { useSiteSearch } from "components/search/site-search-context";
import { SiteSearchField } from "components/search/site-search-field";
import { useHydrated } from "hooks/use-hydrated";
import { buildGenuiAutosuggest } from "lib/genui/query-suggestions";
import type { GenuiQuerySuggestion } from "lib/genui/query-suggestions";
import { searchCopy } from "lib/search/copy";
import { cn } from "lib/utils";
import type { RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useGenuiSearchHistory } from "./use-genui-search-history";

const suggestionOptionId = (listboxId: string, index: number) =>
  `${listboxId}-option-${index}`;

const groupLabels: Record<GenuiQuerySuggestion["source"], string> = {
  curated: searchCopy.examples,
  history: searchCopy.recent,
  site: searchCopy.pages,
};

const groupOrder: GenuiQuerySuggestion["source"][] = [
  "history",
  "curated",
  "site",
];

/**
 * Combobox over the shared search field. Focus always stays in the field
 * (options are reached with `aria-activedescendant`). Escape closes the list
 * first; with the list closed it is left to the surrounding surface (the
 * dialog closes, the homepage does nothing). It never clears text.
 */
export const GenuiSearchCombobox = ({
  autoFocus,
  describedById,
  disabled,
  inlineSuggestions,
  inputId,
  inputRef: externalInputRef,
  listboxId,
  onClear,
  onQueryChange,
  onSearchSubmit,
  query,
  showShortcutHint,
}: {
  autoFocus?: boolean;
  describedById: string;
  disabled?: boolean;
  /** Dialog: the list stays in flow so it never spills past the panel. */
  inlineSuggestions?: boolean;
  inputId: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  listboxId: string;
  /** Shows the in-field clear control while the field has text. */
  onClear?: () => void;
  onQueryChange: (query: string) => void;
  /** `query` is what compose routes on; `label` is the visitor's words. */
  onSearchSubmit: (query: string, label: string) => void;
  query: string;
  showShortcutHint?: boolean;
}) => {
  const composing = useRef(false);
  const ownInputRef = useRef<HTMLInputElement>(null);
  const inputRef = externalInputRef ?? ownInputRef;
  const [focused, setFocused] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  /** After a search the focus ring hides; a click or typing brings it back. */
  const [quiet, setQuiet] = useState(false);
  const { records } = useSiteSearch();
  const searchHistory = useGenuiSearchHistory();
  const hydrated = useHydrated();

  const suggestions = useMemo(
    () =>
      buildGenuiAutosuggest({
        history: searchHistory,
        includeRecentWhenEmpty: listOpen && focused,
        query,
        records,
      }),
    [focused, listOpen, records, searchHistory, query]
  );
  const showSuggestions = hydrated && listOpen && suggestions.length > 0;
  const resolvedActiveIndex =
    activeIndex >= 0 && activeIndex < suggestions.length ? activeIndex : -1;

  const closeSuggestions = () => {
    setListOpen(false);
    setActiveIndex(-1);
  };

  const submitQuery = (value: string, label?: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setQuiet(true);
    onSearchSubmit(trimmed, label?.trim() || trimmed);
  };

  /** The field echoes the clicked label; compose routes on its query. */
  const selectSuggestion = (item: GenuiQuerySuggestion) => {
    onQueryChange(item.label);
    closeSuggestions();
    submitQuery(item.query, item.label);
    inputRef.current?.focus();
  };

  const moveActive = (delta: number) => {
    if (!suggestions.length) return;
    const next =
      resolvedActiveIndex < 0
        ? delta > 0
          ? 0
          : suggestions.length - 1
        : (resolvedActiveIndex + delta + suggestions.length) %
          suggestions.length;
    setActiveIndex(next);
    document
      .querySelector(`#${suggestionOptionId(listboxId, next)}`)
      ?.scrollIntoView({ block: "nearest" });
  };

  const rootRef = useRef<HTMLDivElement>(null);
  const pointerDown = useRef(false);

  useEffect(() => {
    const down = () => {
      pointerDown.current = true;
    };
    const up = () => {
      pointerDown.current = false;
    };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("pointerup", up, true);
    window.addEventListener("pointercancel", up, true);
    return () => {
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointerup", up, true);
      window.removeEventListener("pointercancel", up, true);
    };
  }, []);

  const closeIfFocusLeft = () => {
    if (rootRef.current?.contains(document.activeElement)) return;
    setFocused(false);
    closeSuggestions();
  };

  const handleRootBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    if (pointerDown.current) {
      // Closing an in-flow list mid-click would shift the page and swallow
      // the click (for example on Try again), so wait for the click to land.
      window.addEventListener("click", closeIfFocusLeft, { once: true });
      return;
    }
    closeIfFocusLeft();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") setQuiet(false);
    if (event.key === "Escape") {
      if (!showSuggestions) return;
      // Close the list only; the dialog stays open and the text stays.
      event.preventDefault();
      event.stopPropagation();
      closeSuggestions();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!showSuggestions) {
        setListOpen(true);
        setFocused(true);
      }
      moveActive(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (
      event.key.length === 1 &&
      !listOpen &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey &&
      !composing.current &&
      !event.nativeEvent.isComposing
    ) {
      setListOpen(true);
      setFocused(true);
    }
  };

  const handleQueryChange = (next: string) => {
    setQuiet(false);
    setActiveIndex(-1);
    if (next !== query) {
      setListOpen(true);
      setFocused(true);
    }
    onQueryChange(next);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const item =
      showSuggestions && resolvedActiveIndex >= 0
        ? suggestions[resolvedActiveIndex]
        : undefined;
    if (item) {
      selectSuggestion(item);
      return;
    }
    closeSuggestions();
    submitQuery(query);
  };

  const activeSuggestionId =
    showSuggestions && resolvedActiveIndex >= 0
      ? suggestionOptionId(listboxId, resolvedActiveIndex)
      : undefined;

  const indexed = suggestions.map((item, index) => ({ index, item }));

  return (
    <form className="w-full" onSubmit={handleFormSubmit}>
      <div
        className="relative"
        onBlur={handleRootBlur}
        onPointerDown={() => setQuiet(false)}
        ref={rootRef}
      >
        <SiteSearchField
          activeSuggestionId={activeSuggestionId}
          autoFocus={autoFocus}
          composingRef={composing}
          describedById={describedById}
          disabled={disabled}
          inputId={inputId}
          inputRef={inputRef}
          onClear={onClear}
          onCompositionEnd={() => {
            composing.current = false;
          }}
          onCompositionStart={() => {
            composing.current = true;
          }}
          onFocus={() => {
            setFocused(true);
            // Empty field: show Recent and Examples. With text (for example
            // after Try again), the list waits for typing or an arrow key.
            if (!query.trim()) setListOpen(true);
          }}
          onInputKeyDown={handleInputKeyDown}
          onQueryChange={handleQueryChange}
          query={query}
          quiet={quiet}
          showShortcutHint={showShortcutHint}
          suggestionsListboxId={listboxId}
          suggestionsOpen={showSuggestions}
        />
        {showSuggestions ? (
          <div
            aria-label={searchCopy.suggestions}
            className={cn(
              "max-h-72 w-full overflow-y-auto rounded-lg border border-hairline bg-neutral-950 py-1",
              inlineSuggestions
                ? "mt-1"
                : "absolute top-[calc(100%+0.25rem)] z-30"
            )}
            id={listboxId}
            role="listbox"
          >
            {groupOrder.map((source) => {
              const members = indexed.filter(
                ({ item }) => item.source === source
              );
              if (!members.length) return null;
              const labelId = `${listboxId}-group-${source}`;
              return (
                <div aria-labelledby={labelId} key={source} role="group">
                  <div
                    className="px-4 pt-2 pb-1 text-xs text-neutral-400"
                    id={labelId}
                    role="presentation"
                  >
                    {groupLabels[source]}
                  </div>
                  {members.map(({ index, item }) => (
                    <div
                      aria-selected={resolvedActiveIndex === index}
                      className={cn(
                        "flex min-h-11 w-full cursor-pointer items-center px-4 py-2 text-left text-sm text-white hover:bg-white/5",
                        resolvedActiveIndex === index &&
                          "bg-white/5 outline-2 outline-offset-[-2px] outline-accent"
                      )}
                      id={suggestionOptionId(listboxId, index)}
                      key={`${item.source}-${item.label}`}
                      onClick={() => selectSuggestion(item)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          selectSuggestion(item);
                        }
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                      // Move, not enter: an overlay that opens under a still cursor must not highlight an option.
                      onMouseMove={() => setActiveIndex(index)}
                      role="option"
                      tabIndex={-1}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </form>
  );
};
