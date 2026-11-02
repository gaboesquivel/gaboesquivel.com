"use client";

import { useEffect, useRef } from "react";

import type { WriteReceipt } from "./genui-draft-context";

export const inputClass =
  "w-full rounded-md border border-hairline bg-black px-3 py-2 disabled:opacity-60";

export const primaryButtonClass =
  "rounded-md bg-accent px-4 py-2 text-sm font-medium text-black disabled:opacity-50";

const retryButtonClass =
  "rounded-md border border-hairline px-3 py-1.5 text-sm text-white hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none";

/** Inline error with a retry control; announced once via role="alert". */
export const WriteError = ({
  message,
  onRetry,
  retryLabel = "Try again",
}: {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}) => (
  <div
    className="flex flex-wrap items-center gap-3 text-sm"
    data-genui-write-error
    role="alert"
  >
    <p className="text-red-400">{message}</p>
    {onRetry ? (
      <button className={retryButtonClass} onClick={onRetry} type="button">
        {retryLabel}
      </button>
    ) : null}
  </div>
);

const focusedReceipts = new WeakSet<WriteReceipt>();

/** Settled write: replaces the form in place, so it cannot submit again. */
export const WriteReceiptCard = ({ receipt }: { receipt: WriteReceipt }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Focus a receipt once, when it settles; a later result that remounts the
    // same receipt leaves focus in the search field.
    if (focusedReceipts.has(receipt)) return;
    focusedReceipts.add(receipt);
    ref.current?.focus();
  }, [receipt]);
  return (
    <div
      className="space-y-2 rounded-lg border border-hairline p-4 text-sm outline-none"
      data-genui-receipt
      ref={ref}
      role="status"
      tabIndex={-1}
    >
      <p className="font-medium text-white">{receipt.message}</p>
      {receipt.lines.length > 0 ? (
        <ul className="space-y-1 text-neutral-400">
          {receipt.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
