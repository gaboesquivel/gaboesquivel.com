"use client";

import { newRetryIdentity } from "lib/genui/write-flow";
import type { RetryIdentityState } from "lib/genui/write-flow";
import { createContext, useContext, useMemo, useState } from "react";

export interface NoteDraft {
  description: string;
  email: string;
  name: string;
}

export interface BookingDraft {
  description: string;
  duration: 15 | 30 | null;
  email: string;
  name: string;
  reviewed: boolean;
  start: string | null;
  timeZone: string;
}

/** A write the server accepted; rendered in place and locks the form. */
export interface WriteReceipt {
  lines: string[];
  message: string;
  /** Short line kept under the prompt after the result tree is replaced. */
  summary: string;
}

type WriteKind = "booking" | "note";

interface DraftState {
  attempts: Record<WriteKind, RetryIdentityState>;
  booking: BookingDraft;
  clear: () => void;
  note: NoteDraft;
  receipts: Record<WriteKind, WriteReceipt | null>;
  setAttempt: (kind: WriteKind, value: RetryIdentityState) => void;
  setBooking: (value: Partial<BookingDraft>) => void;
  setNote: (value: Partial<NoteDraft>) => void;
  setReceipt: (kind: WriteKind, value: WriteReceipt | null) => void;
}

const emptyNote = (): NoteDraft => ({
  description: "",
  email: "",
  name: "",
});

const emptyBooking = (): BookingDraft => ({
  description: "",
  duration: null,
  email: "",
  name: "",
  reviewed: false,
  start: null,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
});

/** Each draft gets its retry identity when it starts, kept across retries. */
const freshAttempts = (): Record<WriteKind, RetryIdentityState> => ({
  booking: { fingerprint: null, identity: newRetryIdentity() },
  note: { fingerprint: null, identity: newRetryIdentity() },
});

const noReceipts = (): Record<WriteKind, WriteReceipt | null> => ({
  booking: null,
  note: null,
});

const DraftContext = createContext<DraftState | null>(null);

export const GenuiDraftProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [note, setNoteState] = useState(emptyNote);
  const [booking, setBookingState] = useState(emptyBooking);
  const [attempts, setAttempts] = useState(freshAttempts);
  const [receipts, setReceipts] = useState(noReceipts);
  const value = useMemo(
    () => ({
      attempts,
      booking,
      clear: () => {
        setNoteState(emptyNote());
        setBookingState(emptyBooking());
        setAttempts(freshAttempts());
        // Accepted writes keep their receipt; reset clears unsent drafts only.
      },
      note,
      receipts,
      setAttempt: (kind: WriteKind, next: RetryIdentityState) =>
        setAttempts((current) => ({ ...current, [kind]: next })),
      setBooking: (patch: Partial<BookingDraft>) =>
        setBookingState((current) => ({
          ...current,
          ...patch,
          reviewed:
            patch.reviewed ??
            (patch.start || patch.name || patch.email
              ? false
              : current.reviewed),
        })),
      setNote: (patch: Partial<NoteDraft>) =>
        setNoteState((current) => ({ ...current, ...patch })),
      setReceipt: (kind: WriteKind, next: WriteReceipt | null) =>
        setReceipts((current) => ({ ...current, [kind]: next })),
    }),
    [attempts, booking, note, receipts]
  );
  return (
    <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
  );
};

export const useGenuiDraft = () => {
  const value = useContext(DraftContext);
  if (!value) throw new Error("GenuiDraftProvider is required.");
  return value;
};
