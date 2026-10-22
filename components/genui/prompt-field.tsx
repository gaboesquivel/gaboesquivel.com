"use client";

import { cn } from "lib/utils";
import { useRef, useState } from "react";

export const PromptField = ({
  disabled,
  onSubmit,
  value,
}: {
  disabled?: boolean;
  onSubmit: (query: string) => void;
  value: string;
}) => {
  const [draft, setDraft] = useState(value);
  const composing = useRef(false);

  return (
    <form
      className="w-full"
      onSubmit={(event) => {
        event.preventDefault();
        const query = draft.trim();
        if (!query) return;
        onSubmit(query);
      }}
    >
      <label className="sr-only" htmlFor="homepage-genui-search">
        Search Gabo&apos;s work, writing, and career
      </label>
      <input
        className={cn(
          "w-full rounded-md border border-hairline bg-black px-4 py-3 text-base text-white",
          "placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-accent"
        )}
        disabled={disabled}
        id="homepage-genui-search"
        onChange={(event) => setDraft(event.target.value)}
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
        value={draft}
      />
      <p className="mt-2 text-xs text-neutral-500">
        Press Enter to search. Results replace the sections below.
      </p>
    </form>
  );
};
