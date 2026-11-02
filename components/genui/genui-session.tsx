"use client";

import type { CapabilityCaller } from "lib/genui/write-flow";

import { GenuiDraftProvider, useGenuiDraft } from "./genui-draft-context";
import type { BookingDraft, NoteDraft } from "./genui-draft-context";
import { GenuiInteractionProvider } from "./genui-interaction-context";

/** Writes (booking, notes) unlock only after a settled, error-free result. */
export const genuiWritesEnabled = ({
  active,
  complete,
  error,
  isStreaming,
}: {
  active: boolean;
  complete: boolean;
  error: string | null;
  isStreaming: boolean;
}) => active && complete && !isStreaming && !error;

/**
 * Draft and interaction state shared by every surface that renders generated
 * experiences (homepage and the off-homepage search dialog). Accepted writes
 * keep their receipt here, outside any replaced component, and render in place.
 */
export const GenuiSessionProvider = ({
  callCapability,
  children,
  initialBooking,
  initialNote,
  writesEnabled,
}: {
  callCapability?: CapabilityCaller;
  children: React.ReactNode;
  initialBooking?: Partial<BookingDraft>;
  initialNote?: Partial<NoteDraft>;
  writesEnabled: boolean;
}) => (
  <GenuiDraftProvider initialBooking={initialBooking} initialNote={initialNote}>
    <GenuiInteractionProvider
      callCapability={callCapability}
      writesEnabled={writesEnabled}
    >
      {children}
    </GenuiInteractionProvider>
  </GenuiDraftProvider>
);

/**
 * Quiet record of accepted writes, mounted outside the generated result tree
 * so it survives a later answer replacing the form (the in-place receipt
 * carries the detail and the announcement).
 */
export const GenuiReceipt = ({ className }: { className?: string }) => {
  const { receipts } = useGenuiDraft();
  const lines = [receipts.booking, receipts.note].flatMap((receipt) =>
    receipt ? [receipt.summary] : []
  );
  if (lines.length === 0) return null;
  return (
    <ul
      className={className ?? "mt-3 space-y-1 text-xs text-neutral-400"}
      data-genui-receipt-line
    >
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
};
