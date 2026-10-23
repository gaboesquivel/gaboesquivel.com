"use client";

import { formatSlotSelectionLine } from "lib/connect/slot-display";
import { useEffect, useMemo, useState } from "react";

import { useGenuiDraft } from "./genui-draft-context";
import { useGenuiInteraction } from "./genui-interaction-context";

export const GenuiBookingFlow = () => {
  const { booking, setBooking } = useGenuiDraft();
  const { setReceipt, writesEnabled } = useGenuiInteraction();
  const [slots, setSlots] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!booking.duration) return;
    let cancelled = false;
    void fetch("/api/capabilities", {
      body: JSON.stringify({
        input: {
          duration: booking.duration,
          timeZone: booking.timeZone,
        },
        operation: "list_availability",
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((response) => response.json())
      .then((payload) => {
        if (!cancelled) setSlots(payload.data?.starts ?? []);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      });
    return () => {
      cancelled = true;
    };
  }, [booking.duration, booking.timeZone]);

  const slotOptions = useMemo(() => {
    if (!booking.duration) return [];
    const seen = new Set<string>();
    return slots.flatMap((slot) => {
      if (seen.has(slot)) return [];
      seen.add(slot);
      if (!booking.duration) return [];
      return [
        {
          label: formatSlotSelectionLine({
            duration: booking.duration,
            start: slot,
            timeZone: booking.timeZone,
          }),
          value: slot,
        },
      ];
    });
  }, [booking.duration, booking.timeZone, slots]);

  const canConfirm =
    writesEnabled &&
    Boolean(booking.duration) &&
    Boolean(booking.start) &&
    booking.name.trim().length > 0 &&
    booking.email.trim().length > 0 &&
    booking.description.trim().length > 0 &&
    booking.reviewed;

  const confirm = async () => {
    if (!canConfirm || !booking.duration) return;
    setPending(true);
    const retryIdentity = crypto.randomUUID();
    const response = await fetch("/api/capabilities", {
      body: JSON.stringify({
        input: {
          description: booking.description,
          duration: booking.duration,
          email: booking.email,
          name: booking.name,
          retryIdentity,
          start: booking.start,
          timeZone: booking.timeZone,
        },
        operation: "book_call",
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const payload = await response.json();
    setPending(false);
    if (payload.status === "confirmed" || payload.status === "pending") {
      setReceipt({
        message: payload.message,
        receiptId: payload.data?.eventId ?? undefined,
      });
      setStatus(null);
      return;
    }
    setStatus(payload.message);
  };

  return (
    <div className="space-y-4 text-sm">
      <label className="block space-y-2">
        <span>Duration</span>
        <select
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          disabled={!writesEnabled}
          onChange={(event) =>
            setBooking({
              duration: Number(event.target.value) as 15 | 30,
              start: "",
            })
          }
          value={booking.duration ?? ""}
        >
          <option value="">Select</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
        </select>
      </label>
      <label className="block space-y-2">
        <span>Start time</span>
        <select
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          disabled={!writesEnabled || !booking.duration}
          onChange={(event) => setBooking({ start: event.target.value })}
          value={booking.start ?? ""}
        >
          <option value="">Select a slot</option>
          {slotOptions.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2">
        <span>Name</span>
        <input
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          disabled={!writesEnabled}
          onChange={(event) => setBooking({ name: event.target.value })}
          value={booking.name}
        />
      </label>
      <label className="block space-y-2">
        <span>Email</span>
        <input
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          disabled={!writesEnabled}
          onChange={(event) => setBooking({ email: event.target.value })}
          type="email"
          value={booking.email}
        />
      </label>
      <label className="block space-y-2">
        <span>Agenda</span>
        <textarea
          className="min-h-24 w-full rounded-md border border-hairline bg-black px-3 py-2"
          disabled={!writesEnabled}
          onChange={(event) => setBooking({ description: event.target.value })}
          value={booking.description}
        />
      </label>
      <label className="flex items-center gap-2">
        <input
          checked={booking.reviewed}
          disabled={!writesEnabled}
          onChange={(event) => setBooking({ reviewed: event.target.checked })}
          type="checkbox"
        />
        <span>Reviewed details</span>
      </label>
      <button
        className="rounded-md bg-accent px-4 py-2 font-medium text-black disabled:opacity-50"
        disabled={pending || !canConfirm}
        onClick={() => {
          confirm().catch(() => {});
        }}
        type="button"
      >
        Confirm booking
      </button>
      {status && (
        <p className="text-neutral-300" role="status">
          {status}
        </p>
      )}
    </div>
  );
};
