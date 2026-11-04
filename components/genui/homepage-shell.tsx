"use client";

import { useSiteSearchOptional } from "components/search/site-search-context";
import { Kbd, KbdGroup } from "components/ui/kbd";
import { useHydrated } from "hooks/use-hydrated";
import { searchCopy } from "lib/search/copy";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { GenuiSearchBetaBadge } from "./genui-search-beta-badge";

const finePointerQuery = "(pointer: fine)";

const subscribeFinePointer = (onChange: () => void) => {
  const media = window.matchMedia(finePointerQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/**
 * The homepage "Ask me something" entry. It looks like the search field but is
 * a trigger for the one search overlay (nav icon and Cmd/Ctrl+K open the same
 * surface): on click the field animates up to the top of the full-screen
 * search. Without JavaScript it falls back to browse/contact copy.
 */
const HomeSearchTrigger = () => {
  const siteSearch = useSiteSearchOptional();
  const hydrated = useHydrated();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(finePointerQuery).matches,
    () => false
  );
  const showKbd = hydrated && finePointer;
  const isMac = hydrated && /Mac/.test(navigator.platform);

  return (
    <div className="mt-8 lg:mt-10">
      <button
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className="flex h-auto min-h-16 w-full cursor-text items-center gap-3 rounded-lg border border-accent/50 bg-transparent px-4 text-left text-base text-neutral-400 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-accent sm:gap-4 sm:px-5"
        data-home-search-trigger=""
        disabled={!siteSearch}
        onClick={(event) =>
          siteSearch?.requestSearch(event.currentTarget.getBoundingClientRect())
        }
        type="button"
      >
        <span className="sr-only">{searchCopy.accessibleName}</span>
        <Search
          aria-hidden="true"
          className="size-6 shrink-0 text-neutral-300"
          strokeWidth={1.5}
        />
        <span aria-hidden="true" className="min-w-0 flex-1 truncate">
          <span className="hidden sm:inline">{searchCopy.placeholder}</span>
          <span className="sm:hidden">{searchCopy.placeholderShort}</span>
        </span>
        <GenuiSearchBetaBadge />
        {showKbd ? (
          <KbdGroup aria-hidden="true" className="hidden sm:flex">
            {isMac ? <Kbd>⌘</Kbd> : <Kbd>Ctrl</Kbd>}
            <Kbd>K</Kbd>
          </KbdGroup>
        ) : null}
      </button>
      <noscript>
        <p className="mt-2 text-xs text-neutral-400">
          Browse the sections below, or{" "}
          <Link className="text-accent hover:underline" href="/contact">
            contact
          </Link>{" "}
          to reach out.
        </p>
      </noscript>
    </div>
  );
};

export const HomepageGenUiShell = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="relative">
    <HomeSearchTrigger />
    {children}
  </div>
);
