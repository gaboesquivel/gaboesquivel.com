"use client";

import { searchCopy } from "lib/search/copy";
import { XIcon } from "lucide-react";

/** The "Clear search" control inside the field, shown while it has text. It clears the text and never closes the overlay. */
export const ClearSearchButton = ({ onClear }: { onClear: () => void }) => (
  <button
    aria-label={searchCopy.clear}
    className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-300 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
    onClick={onClear}
    onMouseDown={(event) => event.preventDefault()}
    title={searchCopy.clear}
    type="button"
  >
    <XIcon aria-hidden="true" className="size-5" strokeWidth={1.5} />
  </button>
);
