"use client";

import { useEffect, useState } from "react";

import { useGenuiDraft } from "./genui-draft-context";

export const GenuiBookingFlow = () => {
  const { booking, setBooking } = useGenuiDraft();
  const [slots, setSlots] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    void fetch("/api/capabilities", {
      body: JSON.stringify({
        input: { timeZone: booking.timeZone },
        operation: "list_availability",
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((response) => response.json())
      .then((payload) => setSlots(payload.data?.starts ?? []))
      .catch(() => setSlots([]));
  }, [booking.timeZone]);

  const confirm = async () => {
    if (!booking.start || !booking.duration || !booking.reviewed) return;
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
    setStatus(payload.message);
  };

  return (
    <div className="space-y-4 text-sm">
      <label className="block space-y-2">
        <span>Duration</span>
        <select
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          onChange={(event) =>
            setBooking({
              duration: Number(event.target.value) as 15 | 30,
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
          onChange={(event) => setBooking({ start: event.target.value })}
          value={booking.start ?? ""}
        >
          <option value="">Select a slot</option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2">
        <span>Name</span>
        <input
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          onChange={(event) => setBooking({ name: event.target.value })}
          value={booking.name}
        />
      </label>
      <label className="block space-y-2">
        <span>Email</span>
        <input
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          onChange={(event) => setBooking({ email: event.target.value })}
          type="email"
          value={booking.email}
        />
      </label>
      <label className="block space-y-2">
        <span>Agenda</span>
        <textarea
          className="min-h-24 w-full rounded-md border border-hairline bg-black px-3 py-2"
          onChange={(event) => setBooking({ description: event.target.value })}
          value={booking.description}
        />
      </label>
      <label className="flex items-center gap-2">
        <input
          checked={booking.reviewed}
          onChange={(event) => setBooking({ reviewed: event.target.checked })}
          type="checkbox"
        />
        <span>Reviewed details</span>
      </label>
      <button
        className="rounded-md bg-accent px-4 py-2 font-medium text-black disabled:opacity-50"
        disabled={pending || !booking.reviewed}
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
