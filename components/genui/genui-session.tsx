"use client";

import type { CapabilityCaller } from "lib/genui/write-flow";

import { GenuiDraftProvider } from "./genui-draft-context";
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
