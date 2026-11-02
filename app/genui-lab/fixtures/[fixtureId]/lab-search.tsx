"use client";

import { GeneratedRegion } from "components/genui/generated-region";
import { useHydrated } from "components/genui/genui-write-status";
import type { CompositionEnvelope } from "lib/genui/envelope";
import type { GenuiSearchState } from "lib/genui/fixtures/registry";
import type { SearchStatus } from "lib/search/compose-outcome";
import { searchCopy } from "lib/search/copy";
import { useRef, useState } from "react";

declare global {
  interface Window {
    /** Queries Try again or an example chip would have sent (lab only). */
    __genuiLabSearches?: string[];
  }
}

/**
 * Fixture-lab search harness: a field plus the shared region. The region
 * mounts idle and moves to the fixture state after hydration, so the live
 * region announces as it does after a real request. Try again and example
 * chips record the query, refocus the field and show composing; nothing is
 * sent to `/api/genui/compose`.
 */
export const LabSearch = ({
  envelope,
  state,
}: {
  envelope: CompositionEnvelope | null;
  state: GenuiSearchState;
}) => {
  const fieldRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(state.submitted);
  // The last query Try again or a chip re-ran; null while the fixture holds.
  const [rerunQuery, setRerunQuery] = useState<string | null>(null);
  const hydrated = useHydrated();
  const submitted = rerunQuery ?? state.submitted;
  let status: SearchStatus = "idle";
  if (hydrated) status = rerunQuery === null ? state.status : "composing";
  const error = status === "error" ? (state.error ?? null) : null;

  const rerun = (query: string) => {
    window.__genuiLabSearches = [...(window.__genuiLabSearches ?? []), query];
    setRerunQuery(query);
    setValue(query);
    fieldRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <input
        aria-label={searchCopy.accessibleName}
        className="w-full rounded-md border border-hairline bg-black px-3 py-2"
        id="genui-lab-search"
        onChange={(event) => setValue(event.target.value)}
        ref={fieldRef}
        type="text"
        value={value}
      />
      <GeneratedRegion
        envelope={status === "composing" ? envelope : null}
        error={error}
        onExample={rerun}
        onRetry={() => rerun(submitted)}
        status={status}
        submitted={submitted}
      />
    </div>
  );
};
