"use client";

import { useHydrated } from "hooks/use-hydrated";
import { formatSlotSelectionLine } from "lib/connect/slot-display";
import {
  AVAILABILITY_EMPTY_COPY,
  AVAILABILITY_ERROR_COPY,
  groupSlotsByDay,
  identityForAttempt,
  isSettledWrite,
  newRetryIdentity,
  settleAttempt,
  timeZoneNames,
  writeErrorMessage,
} from "lib/genui/write-flow";
import type { SlotDayGroup } from "lib/genui/write-flow";
import { useEffect, useRef, useState } from "react";

import { useGenuiDraft } from "./genui-draft-context";
import { useGenuiInteraction } from "./genui-interaction-context";
import {
  WriteError,
  WriteReceiptCard,
  inputClass,
  primaryButtonClass,
} from "./genui-write-status";

type Availability =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "empty" }
  | { message: string; state: "error" }
  | { more: SlotDayGroup[]; soon: SlotDayGroup[]; state: "ready" };

const BOOKING_FAILED = "Could not book the call.";

/** Booking flow: availability, details, approval, then a receipt in place. */
export const GenuiBookingFlow = () => {
  const { attempts, booking, receipts, setAttempt, setBooking, setReceipt } =
    useGenuiDraft();
  const { callCapability, writesEnabled } = useGenuiInteraction();
  const hydrated = useHydrated();
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState<{
    key: string;
    value: Availability;
  } | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const inFlight = useRef(false);
  const receipt = receipts.booking;

  const requestKey =
    booking.duration && !receipt
      ? `${booking.duration}|${booking.timeZone}|${reload}`
      : null;

  const { duration, timeZone } = booking;

  useEffect(() => {
    if (!requestKey || !duration) return;
    let cancelled = false;
    const settle = (value: Availability) => {
      if (!cancelled) setResult({ key: requestKey, value });
    };
    callCapability({
      input: { duration, timeZone },
      operation: "list_availability",
    })
      .then((payload) => {
        if (payload.status === "error") {
          settle({
            message: payload.message ?? AVAILABILITY_ERROR_COPY,
            state: "error",
          });
          return;
        }
        const starts = Array.isArray(payload.data?.starts)
          ? payload.data.starts.map(String)
          : [];
        const groups = groupSlotsByDay({ now: new Date(), starts, timeZone });
        settle(
          groups.soon.length === 0
            ? { state: "empty" }
            : { ...groups, state: "ready" }
        );
      })
      .catch(() => {
        settle({ message: AVAILABILITY_ERROR_COPY, state: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [callCapability, duration, requestKey, timeZone]);

  if (receipt) return <WriteReceiptCard receipt={receipt} />;

  let availability: Availability = { state: "idle" };
  if (requestKey) {
    availability =
      result?.key === requestKey ? result.value : { state: "loading" };
  }

  const ready = availability.state === "ready" ? availability : null;
  const selectedInMore =
    ready?.more.some((group) => group.starts.includes(booking.start ?? "")) ??
    false;
  const expanded = showMore || selectedInMore;
  const visibleGroups = ready
    ? [...ready.soon, ...(expanded ? ready.more : [])]
    : [];
  const zone = hydrated ? timeZoneNames({ timeZone: booking.timeZone }) : null;
  const locked = !writesEnabled || pending;
  // After a network failure the booking may exist: edits wait for an answer
  // so a retry cannot become a second, different booking.
  const editLocked = locked || Boolean(attempts.booking.unresolved);

  const slotLabel = (start: string) =>
    booking.duration
      ? formatSlotSelectionLine({
          duration: booking.duration,
          start,
          timeZone: booking.timeZone,
        })
      : start;

  const canConfirm =
    writesEnabled &&
    Boolean(booking.duration) &&
    Boolean(booking.start) &&
    booking.name.trim().length > 0 &&
    booking.email.trim().length > 0 &&
    booking.description.trim().length > 0 &&
    booking.reviewed;

  const confirm = async () => {
    if (inFlight.current || !canConfirm || !booking.duration || !booking.start)
      return;
    inFlight.current = true;
    setPending(true);
    setFailure(null);
    const input = {
      description: booking.description,
      duration: booking.duration,
      email: booking.email,
      name: booking.name,
      start: booking.start,
      timeZone: booking.timeZone,
    };
    const attempt = identityForAttempt({
      create: newRetryIdentity,
      payload: input,
      state: attempts.booking,
    });
    setAttempt("booking", attempt);
    try {
      const payload = await callCapability({
        input: { ...input, retryIdentity: attempt.identity },
        operation: "book_call",
      });
      setAttempt("booking", settleAttempt({ state: attempt }));
      if (isSettledWrite(payload)) {
        setReceipt("booking", {
          lines: [slotLabel(input.start), `${input.name} · ${input.email}`],
          summary: `${payload.status === "pending" ? "Booking processing" : "Call booked"}: ${slotLabel(input.start)}`,
          message:
            payload.status === "pending"
              ? "Your booking is processing. Watch for a calendar invite."
              : `Call booked. A calendar invite is on its way to ${input.email}.`,
        });
        return;
      }
      setFailure(payload.message ?? BOOKING_FAILED);
    } catch (error) {
      setAttempt("booking", settleAttempt({ error, state: attempt }));
      setFailure(writeErrorMessage(error));
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  };

  const runConfirm = () => {
    confirm().catch(() => {});
  };

  return (
    <div aria-busy={pending} className="space-y-4 text-sm">
      <label className="block space-y-2">
        <span>Duration</span>
        <select
          className={inputClass}
          disabled={editLocked}
          onChange={(event) => {
            setShowMore(false);
            setBooking({
              duration: event.target.value
                ? (Number(event.target.value) as 15 | 30)
                : null,
              start: "",
            });
          }}
          value={booking.duration ?? ""}
        >
          <option value="">Select</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
        </select>
      </label>
      <div className="space-y-2">
        <label className="block" htmlFor="genui-booking-start">
          Start time
        </label>
        {zone ? (
          <p className="text-xs text-neutral-400" id="genui-booking-zone">
            Times in {zone.long} ({zone.short})
          </p>
        ) : null}
        {availability.state === "loading" ? (
          <p className="text-neutral-400" role="status">
            Checking open times…
          </p>
        ) : null}
        {availability.state === "error" ? (
          <WriteError
            message={availability.message}
            onRetry={() => setReload((value) => value + 1)}
          />
        ) : null}
        {availability.state === "empty" ? (
          <p className="text-neutral-400" role="status">
            {AVAILABILITY_EMPTY_COPY}
          </p>
        ) : null}
        <select
          className={inputClass}
          disabled={editLocked || !ready}
          aria-describedby={zone ? "genui-booking-zone" : undefined}
          id="genui-booking-start"
          onChange={(event) => setBooking({ start: event.target.value })}
          value={booking.start ?? ""}
        >
          <option value="">Select a time</option>
          {visibleGroups.map((group) => (
            <optgroup key={group.day} label={group.label}>
              {group.starts.map((start) => (
                <option key={start} value={start}>
                  {slotLabel(start)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {ready && ready.more.length > 0 && !expanded ? (
          <button
            className="text-sm text-accent hover:underline disabled:opacity-50"
            disabled={locked}
            onClick={() => setShowMore(true)}
            type="button"
          >
            More times
          </button>
        ) : null}
      </div>
      <label className="block space-y-2">
        <span>Name</span>
        <input
          autoComplete="name"
          className={inputClass}
          disabled={editLocked}
          onChange={(event) => setBooking({ name: event.target.value })}
          value={booking.name}
        />
      </label>
      <label className="block space-y-2">
        <span>Email</span>
        <input
          autoComplete="email"
          className={inputClass}
          disabled={editLocked}
          onChange={(event) => setBooking({ email: event.target.value })}
          type="email"
          value={booking.email}
        />
      </label>
      <label className="block space-y-2">
        <span>Agenda</span>
        <textarea
          className={`min-h-24 ${inputClass}`}
          disabled={editLocked}
          onChange={(event) => setBooking({ description: event.target.value })}
          value={booking.description}
        />
      </label>
      <label className="flex items-center gap-2">
        <input
          checked={booking.reviewed}
          disabled={editLocked}
          onChange={(event) => setBooking({ reviewed: event.target.checked })}
          type="checkbox"
        />
        <span>Reviewed details</span>
      </label>
      <button
        className={primaryButtonClass}
        disabled={pending || !canConfirm}
        onClick={runConfirm}
        type="button"
      >
        {pending ? "Booking…" : "Confirm booking"}
      </button>
      {failure ? <WriteError message={failure} onRetry={runConfirm} /> : null}
    </div>
  );
};
