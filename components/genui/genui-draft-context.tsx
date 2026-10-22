"use client";

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

interface DraftState {
  booking: BookingDraft;
  clear: () => void;
  note: NoteDraft;
  setBooking: (value: Partial<BookingDraft>) => void;
  setNote: (value: Partial<NoteDraft>) => void;
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

const DraftContext = createContext<DraftState | null>(null);

export const GenuiDraftProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [note, setNoteState] = useState(emptyNote);
  const [booking, setBookingState] = useState(emptyBooking);
  const value = useMemo(
    () => ({
      booking,
      clear: () => {
        setNoteState(emptyNote());
        setBookingState(emptyBooking());
      },
      note,
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
    }),
    [booking, note]
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
