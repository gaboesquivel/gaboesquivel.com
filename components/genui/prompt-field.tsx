"use client";

import { GenuiSearchBetaBadge } from "components/genui/genui-search-beta-badge";
import { cn } from "lib/utils";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";

export const PromptField = ({
  onChange,
  onSubmit,
  value,
}: {
  onChange: (query: string) => void;
  onSubmit: (query: string) => void;
  value: string;
}) => {
  const composing = useRef(false);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <form
      className="w-full"
      onSubmit={(event) => {
        event.preventDefault();
        const query = value.trim();
        if (!query) return;
        onSubmit(query);
      }}
    >
      <label className="sr-only" htmlFor="homepage-genui-search">
        Search Gabo&apos;s work, writing, and career
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute top-3 right-3 z-10">
          <GenuiSearchBetaBadge />
        </div>
        <input
          className={cn(
            "w-full rounded-md border border-hairline bg-black py-3 pr-20 pl-4 text-base text-white",
            "placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-accent"
          )}
          id="homepage-genui-search"
          onChange={(event) => onChange(event.target.value)}
          onCompositionEnd={() => {
            composing.current = false;
          }}
          onCompositionStart={() => {
            composing.current = true;
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && composing.current) {
              event.preventDefault();
            }
          }}
          placeholder="Ask about my work, writing, CV, or booking…"
          type="search"
          value={value}
        />
      </div>
      {hydrated ? (
        <p className="mt-2 text-xs text-neutral-500">
          Press Enter to search. Results replace the sections below.
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
    </form>
  );
};
