"use client";

import { GenuiDraftProvider } from "./genui-draft-context";
import {
  GenuiInteractionProvider,
  useGenuiInteraction,
} from "./genui-interaction-context";

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
 * experiences (homepage and the off-homepage search dialog).
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

export const GenuiReceipt = ({ className }: { className?: string }) => {
  const { receipt } = useGenuiInteraction();
  if (!receipt) return null;
  return (
    <p className={className ?? "mt-3 text-sm text-neutral-300"} role="status">
      {receipt.message}
      {receipt.receiptId ? ` (${receipt.receiptId})` : ""}
    </p>
  );
};
