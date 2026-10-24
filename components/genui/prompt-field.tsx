"use client";

import {
  genuiSearchPlaceholder,
  homepageGenuiSearchInputId,
  homepageGenuiSuggestionsListboxId,
} from "components/search/search-copy";
import { useHydrated } from "hooks/use-hydrated";
import Link from "next/link";

import {
  GenuiSearchCombobox,
  genuiSuggestionsOpenHint,
} from "./genui-search-combobox";

const genuiSearchScopeId = "homepage-genui-search-scope";

export const PromptField = ({
  onChange,
  onSubmit,
  value,
}: {
  onChange: (query: string) => void;
  onSubmit: (query: string) => void;
  value: string;
}) => {
  const hydrated = useHydrated();

  return (
    <>
      <GenuiSearchCombobox
        describedById={genuiSearchScopeId}
        inputId={homepageGenuiSearchInputId}
        listboxId={homepageGenuiSuggestionsListboxId}
        onQueryChange={onChange}
        onSearchSubmit={onSubmit}
        placeholder={genuiSearchPlaceholder}
        query={value}
        showGenuiBetaBadge
        showShortcutHint
      />
      {hydrated ? (
        <p className="mt-2 text-xs text-neutral-500" id={genuiSearchScopeId}>
          Press Enter to search. Results replace the sections below.
          {genuiSuggestionsOpenHint}
        </p>
      ) : (
        <p className="mt-2 text-xs text-neutral-500">
          Browse the sections below, or{" "}
          <Link className="text-accent hover:underline" href="/contact">
            contact
          </Link>{" "}
          to reach out.
        </p>
      )}
    </>
  );
};
