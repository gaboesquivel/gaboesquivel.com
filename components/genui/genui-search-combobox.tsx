"use client";

import { useSiteSearch } from "components/search/site-search-context";
import { SiteSearchField } from "components/search/site-search-field";
import { useHydrated } from "hooks/use-hydrated";
import { buildGenuiAutosuggest } from "lib/genui/query-suggestions";
import type { GenuiQuerySuggestion } from "lib/genui/query-suggestions";
import { cn } from "lib/utils";
import { useCallback, useMemo, useRef, useState } from "react";

import { useGenuiSearchHistory } from "./use-genui-search-history";

const suggestionOptionId = (listboxId: string, index: number) =>
  `${listboxId}-option-${index}`;

export const GenuiSearchCombobox = ({
  autoFocus,
  describedById,
  disabled,
  inputId,
  listboxId,
  onQueryChange,
  onSearchSubmit,
  placeholder,
  query,
  showGenuiBetaBadge,
  showShortcutHint,
}: {
  autoFocus?: boolean;
  describedById: string;
  disabled?: boolean;
  inputId: string;
  listboxId: string;
  onQueryChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  placeholder?: string;
  query: string;
  showGenuiBetaBadge?: boolean;
  showShortcutHint?: boolean;
}) => {
  const composing = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focused, setFocused] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
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

  const submitQuery = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      onSearchSubmit(trimmed);
    },
    [onSearchSubmit]
  );

  const closeSuggestions = useCallback(() => {
    setListOpen(false);
    setActiveIndex(-1);
  }, []);

  const openSuggestionsForTyping = useCallback(() => {
    setListOpen(true);
    setFocused(true);
  }, []);

  const selectSuggestion = useCallback(
    (item: GenuiQuerySuggestion) => {
      onQueryChange(item.query);
      closeSuggestions();
      submitQuery(item.query);
      inputRef.current?.focus();
    },
    [closeSuggestions, onQueryChange, submitQuery]
  );

  const focusOption = useCallback((index: number) => {
    setActiveIndex(index);
    optionRefs.current[index]?.focus();
    optionRefs.current[index]?.scrollIntoView({ block: "nearest" });
  }, []);

  const moveActive = useCallback(
    (delta: number) => {
      if (!suggestions.length) return;
      const next =
        activeIndex < 0
          ? delta > 0
            ? 0
            : suggestions.length - 1
          : (activeIndex + delta + suggestions.length) % suggestions.length;
      focusOption(next);
    },
    [activeIndex, focusOption, suggestions.length]
  );

  const handleRootBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setFocused(false);
    closeSuggestions();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !listOpen &&
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey &&
      !composing.current &&
      !event.nativeEvent.isComposing
    ) {
      openSuggestionsForTyping();
    }

    if (!showSuggestions) {
      if (event.key === "ArrowDown" && suggestions.length > 0) {
        openSuggestionsForTyping();
        event.preventDefault();
        focusOption(0);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeSuggestions();
      inputRef.current?.focus();
      return;
    }
    if (event.key === "Enter" && resolvedActiveIndex >= 0) {
      event.preventDefault();
      const item = suggestions[resolvedActiveIndex];
      if (item) selectSuggestion(item);
    }
  };

  const handleQueryChange = (next: string) => {
    setActiveIndex(-1);
    if (next !== query) openSuggestionsForTyping();
    onQueryChange(next);
  };

  const activeSuggestionId =
    showSuggestions && resolvedActiveIndex >= 0
      ? suggestionOptionId(listboxId, resolvedActiveIndex)
      : undefined;

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (resolvedActiveIndex >= 0) {
      const item = suggestions[resolvedActiveIndex];
      if (item) {
        selectSuggestion(item);
        return;
      }
    }
    closeSuggestions();
    submitQuery(query);
  };

  return (
    <form className="w-full" onSubmit={handleFormSubmit}>
      <div className="relative" onBlur={handleRootBlur}>
        <SiteSearchField
          activeSuggestionId={activeSuggestionId}
          autoFocus={autoFocus}
          composingRef={composing}
          describedById={describedById}
          disabled={disabled}
          inputId={inputId}
          inputRef={inputRef}
          onCompositionEnd={() => {
            composing.current = false;
          }}
          onCompositionStart={() => {
            composing.current = true;
          }}
          onFocus={() => {
            setFocused(true);
            setListOpen(true);
          }}
          onInputKeyDown={handleInputKeyDown}
          onQueryChange={handleQueryChange}
          placeholder={placeholder}
          query={query}
          showGenuiBetaBadge={showGenuiBetaBadge}
          showShortcutHint={showShortcutHint}
          suggestionsListboxId={listboxId}
          suggestionsOpen={showSuggestions}
        />
        {showSuggestions ? (
          <div
            className="absolute top-[calc(100%+0.25rem)] z-30 max-h-72 w-full overflow-y-auto rounded-lg border border-hairline bg-neutral-950 py-1 shadow-lg ring-1 ring-white/5"
            id={listboxId}
            role="listbox"
            aria-label="Example interview questions"
          >
            {suggestions.map((item, index) => (
              <button
                key={`${item.source}-${item.query}`}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                aria-selected={resolvedActiveIndex === index}
                className={cn(
                  "flex min-h-11 w-full cursor-pointer items-center gap-3 px-4 py-2 text-left text-sm text-white",
                  "hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent",
                  resolvedActiveIndex === index && "bg-white/5"
                )}
                id={suggestionOptionId(listboxId, index)}
                onFocus={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    moveActive(1);
                    return;
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    moveActive(-1);
                    return;
                  }
                  if (event.key === "Escape") {
                    event.preventDefault();
                    closeSuggestions();
                    inputRef.current?.focus();
                    return;
                  }
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectSuggestion(item);
                  }
                }}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectSuggestion(item)}
                role="option"
                type="button"
              >
                <span className="flex-1">{item.label}</span>
                {item.source === "curated" ? (
                  <span className="text-xs text-neutral-500">Example</span>
                ) : null}
                {item.source === "history" ? (
                  <span className="text-xs text-neutral-500">Recent</span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
};

export const genuiSuggestionsOpenHint =
  " Tab or arrow keys reach suggestions; Enter or click to run one.";
