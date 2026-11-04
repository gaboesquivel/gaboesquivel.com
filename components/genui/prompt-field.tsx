"use client";

import { searchCopy } from "lib/search/copy";
import { ArrowLeft } from "lucide-react";

/** The "Clear search" control shown in the overlay once a search is active. */
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
