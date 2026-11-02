"use client";

import {
  homepageGenuiSearchInputId,
  homepageGenuiSuggestionsListboxId,
} from "components/search/search-ids";
import { searchCopy } from "lib/search/copy";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { RefObject } from "react";

import { GenuiSearchCombobox } from "./genui-search-combobox";

const genuiSearchScopeId = "homepage-genui-search-scope";

/** The "Clear search" control both surfaces show once a search is active. */
export const ClearSearchButton = ({ onClear }: { onClear: () => void }) => (
  <button
    aria-label={searchCopy.clear}
    className="-ml-2.5 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-300 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
    onClick={onClear}
    title={searchCopy.clear}
    type="button"
  >
    <ArrowLeft aria-hidden="true" className="size-6" strokeWidth={1.5} />
  </button>
);

export const PromptField = ({
  idle,
  inputRef,
  onChange,
  onClear,
  onSubmit,
  value,
}: {
  idle: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  onChange: (query: string) => void;
  onClear?: () => void;
  onSubmit: (query: string) => void;
  value: string;
}) => (
  <>
    <GenuiSearchCombobox
      describedById={genuiSearchScopeId}
      inputId={homepageGenuiSearchInputId}
      inputRef={inputRef}
      leadingAction={
        onClear ? <ClearSearchButton onClear={onClear} /> : undefined
      }
      listboxId={homepageGenuiSuggestionsListboxId}
      onQueryChange={onChange}
      onSearchSubmit={onSubmit}
      query={value}
      showShortcutHint={idle && !value}
    />
    <p className="sr-only" id={genuiSearchScopeId}>
      {searchCopy.homeHint}
      {searchCopy.suggestionsHint}
    </p>
    <noscript>
      <p className="mt-2 text-xs text-neutral-400">
        Browse the sections below, or{" "}
        <Link className="text-accent hover:underline" href="/contact">
          contact
        </Link>{" "}
        to reach out.
      </p>
    </noscript>
  </>
);
