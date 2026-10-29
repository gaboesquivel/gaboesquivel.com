import { eventBody } from "../connect/calendar";
import { denverDay, digest } from "../connect/caps";
import {
  ALREADY_BOOKED,
  BOOKING_CAP,
  BUSY_SLOT,
  CALENDAR_FAILED,
  CALENDAR_UNCONNECTED,
  STORE_UNAVAILABLE_BOOK,
} from "../connect/copy";
import { bookSchema } from "../connect/schema";
import { overlaps } from "../connect/slots";
import {
  loadReceipt,
  rejectChangedPayload,
  saveReceipt,
} from "./action-receipts";
import { writeResult } from "./result";
import { calendarEventIdFromRetry } from "./retry";
import { bookCallInput } from "./schemas";
import { offeredSlot } from "./slot-validation";
import type { CapabilityContext } from "./types";

export const bookCallCapability = async ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = bookCallInput.safeParse(input);
  if (!parsed.success) {
    return writeResult({
      data: { eventId: null },
      message: parsed.error.issues[0]?.message ?? "Invalid booking.",
      operation: "book_call",
      requestId: context.correlationId,
      status: "failed",
    });
  }
  if (!context.store) {
    return writeResult({
      data: { eventId: null },
      message: STORE_UNAVAILABLE_BOOK,
      operation: "book_call",
      requestId: context.correlationId,
      status: "failed",
    });
  }
  const store = context.store;
  const payload = {
    description: parsed.data.description,
    duration: parsed.data.duration,
    email: parsed.data.email,
    name: parsed.data.name,
    start: parsed.data.start,
    timeZone: parsed.data.timeZone,
  };
  const admission = await rejectChangedPayload({
    operation: "book_call",
    payload,
    retryIdentity: parsed.data.retryIdentity,
    store,
  });
  if (!admission.ok) {
    return writeResult({
      data: { eventId: null },
      message: "Retry identity does not match the original payload.",
      operation: "book_call",
      requestId: context.correlationId,
      status: "failed",
    });
  }
  if (admission.replay && admission.existing?.status === "confirmed") {
    return writeResult({
      data: { eventId: admission.existing.providerRef ?? null },
      message: ALREADY_BOOKED,
      operation: "book_call",
      requestId: context.correlationId,
      status: "confirmed",
    });
  }
  if (admission.replay && admission.existing?.status === "pending") {
    return writeResult({
      data: { eventId: null },
      message: "That booking is still processing.",
      operation: "book_call",
      requestId: context.correlationId,
      status: "pending",
    });
  }

  const booking = bookSchema.parse(payload);
  const key = `connect:booked:${digest(`${booking.email}|${booking.start}|${booking.duration}|${booking.name}`)}`;
  const eventId = calendarEventIdFromRetry(parsed.data.retryIdentity);
  const reconciled = await context.calendar.get({ eventId });
  if (reconciled) {
    await store.set(key, reconciled.id);
    await saveReceipt({
      operation: "book_call",
      payload,
      providerRef: reconciled.id,
      status: "confirmed",
      store,
    });
    return writeResult({
      data: { eventId: reconciled.id },
      message: ALREADY_BOOKED,
      operation: "book_call",
      requestId: context.correlationId,
      status: "confirmed",
    });
  }

  let slotOk: boolean;
  try {
    slotOk = await offeredSlot({
      calendar: context.calendar,
      duration: booking.duration,
      now: context.clock,
      start: booking.start,
      timeZone: booking.timeZone,
    });
  } catch (error) {
    // Nothing is reserved yet, so a calendar failure here is a clean failure.
    return writeResult({
      data: { eventId: null },
      message:
        error instanceof Error && error.message === "calendar-unconfigured"
          ? CALENDAR_UNCONNECTED
          : CALENDAR_FAILED,
      operation: "book_call",
      requestId: context.correlationId,
      status: "failed",
    });
  }
  if (!slotOk) {
    return writeResult({
      data: { eventId: null },
      message: BUSY_SLOT,
      operation: "book_call",
      requestId: context.correlationId,
      status: "failed",
    });
  }

  const existing = await store.get(key);
  if (existing && existing !== "pending") {
    return writeResult({
      data: { eventId: existing },
      message: ALREADY_BOOKED,
      operation: "book_call",
      requestId: context.correlationId,
      status: "confirmed",
    });
  }
  if (existing === "pending" || !(await store.claim(key))) {
    return writeResult({
      data: { eventId: null },
      message: "That booking is still processing.",
      operation: "book_call",
      requestId: context.correlationId,
      status: "pending",
    });
  }

  const capKey = `connect:bookings:${denverDay(context.clock)}`;
  const releaseCap = async () => {
    if (context.rateLimitEnforced) await store.decr(capKey);
    await store.del(key);
  };
  if (context.rateLimitEnforced) {
    const count = await store.incr(capKey);
    if (count > 2) {
      await releaseCap();
      return writeResult({
        data: { eventId: null },
        message: BOOKING_CAP,
        operation: "book_call",
        requestId: context.correlationId,
        status: "failed",
      });
    }
  }

  await saveReceipt({
    operation: "book_call",
    payload,
    status: "pending",
    store,
  });

  const startMs = Date.parse(booking.start);
  const end = new Date(startMs + booking.duration * 60_000).toISOString();
  try {
    const busy = await context.calendar.freeBusy({
      timeMax: end,
      timeMin: booking.start,
    });
    if (overlaps({ busy, duration: booking.duration, start: startMs })) {
      await releaseCap();
      return writeResult({
        data: { eventId: null },
        message: BUSY_SLOT,
        operation: "book_call",
        requestId: context.correlationId,
        status: "failed",
      });
    }
    const created = await context.calendar.insert({
      event: eventBody({
        description: booking.description,
        duration: booking.duration,
        email: booking.email,
        name: booking.name,
        requestId: key,
        start: booking.start,
      }),
      eventId,
      requestId: key,
    });
    await store.set(key, created.id);
    await saveReceipt({
      operation: "book_call",
      payload,
      providerRef: created.id,
      status: "confirmed",
      store,
    });
    return writeResult({
      data: { eventId: created.id },
      message: `Booked ${booking.duration} minutes at ${booking.start}.`,
      operation: "book_call",
      requestId: context.correlationId,
      status: "confirmed",
    });
  } catch (error) {
    const maybe = await context.calendar.get({ eventId });
    if (maybe) {
      await store.set(key, maybe.id);
      await saveReceipt({
        operation: "book_call",
        payload,
        providerRef: maybe.id,
        status: "confirmed",
        store,
      });
      return writeResult({
        data: { eventId: maybe.id },
        message: `Booked ${booking.duration} minutes at ${booking.start}.`,
        operation: "book_call",
        requestId: context.correlationId,
        status: "confirmed",
      });
    }
    await releaseCap();
    await saveReceipt({
      operation: "book_call",
      payload,
      status: "uncertain",
      store,
    });
    const message =
      error instanceof Error && error.message === "calendar-unconfigured"
        ? CALENDAR_UNCONNECTED
        : CALENDAR_FAILED;
    return writeResult({
      data: { eventId: null },
      message,
      operation: "book_call",
      requestId: context.correlationId,
      retryGuidance: "Check your calendar invite before booking again.",
      status: "uncertain",
    });
  }
};
