"use client";

import {
  genuiSearchPlaceholder,
  homepageGenuiSearchInputId,
  homepageGenuiSuggestionsListboxId,
} from "components/search/search-copy";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  GenuiSearchCombobox,
  genuiSuggestionsOpenHint,
} from "./genui-search-combobox";

const genuiSearchScopeId = "homepage-genui-search-scope";

export const PromptField = ({
  onBack,
  onChange,
  onSubmit,
  value,
}: {
  onBack?: () => void;
  onChange: (query: string) => void;
  onSubmit: (query: string) => void;
  value: string;
}) => (
  <>
    <GenuiSearchCombobox
      describedById={genuiSearchScopeId}
      inputId={homepageGenuiSearchInputId}
      leadingAction={
        onBack ? (
          <button
            aria-label="Back to homepage"
            className="-ml-2.5 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-300 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            onClick={onBack}
            title="Back to homepage"
            type="button"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-6"
              strokeWidth={1.5}
            />
          </button>
        ) : undefined
      }
      listboxId={homepageGenuiSuggestionsListboxId}
      onQueryChange={onChange}
      onSearchSubmit={onSubmit}
      placeholder={genuiSearchPlaceholder}
      query={value}
      showGenuiBetaBadge
      showShortcutHint
    />
    <p className="sr-only" id={genuiSearchScopeId}>
      Press Enter to search. Results replace the sections below.
      {genuiSuggestionsOpenHint}
    </p>
    <noscript>
      <p className="mt-2 text-xs text-neutral-500">
        Browse the sections below, or{" "}
        <Link className="text-accent hover:underline" href="/contact">
          contact
        </Link>{" "}
        to reach out.
      </p>
    </noscript>
  </>
);
