"use client";

import { GenuiDraftProvider, useGenuiDraft } from "./genui-draft-context";
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
  error: unknown;
  isStreaming: boolean;
}) => active && complete && !isStreaming && !error;

/**
 * Draft and interaction state shared by every surface that renders generated
 * experiences (homepage and the off-homepage search dialog). Accepted writes
 * keep their receipt here, outside any replaced component, and render in place.
 */
export const GenuiSessionProvider = ({
  children,
  writesEnabled,
}: {
  children: React.ReactNode;
  writesEnabled: boolean;
}) => (
  <GenuiDraftProvider>
    <GenuiInteractionProvider writesEnabled={writesEnabled}>
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
    <ul className={className ?? "mt-3 space-y-1 text-xs text-neutral-400"}>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
};
