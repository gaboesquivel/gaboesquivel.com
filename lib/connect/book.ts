import { eventBody } from "./calendar";
import type { CalendarClient } from "./calendar";
import { denverDay, digest } from "./caps";
import type { CapStore } from "./caps";
import {
  ALREADY_BOOKED,
  BOOKING_CAP,
  BUSY_SLOT,
  CALENDAR_FAILED,
  CALENDAR_UNCONNECTED,
  STORE_UNAVAILABLE_BOOK,
} from "./copy";
import { bookSchema } from "./schema";

const overlaps = ({
  busy,
  duration,
  start,
}: {
  busy: { end: number; start: number }[];
  duration: number;
  start: number;
}) => {
  const end = start + duration * 60_000;
  return busy.some((block) => start < block.end && end > block.start);
};

export const bookCall = async ({
  calendar,
  input,
  now,
  store,
}: {
  calendar: CalendarClient;
  input: unknown;
  now: Date;
  store: CapStore | null;
}) => {
  const parsed = bookSchema.safeParse(input);
  if (!parsed.success) {
    return {
      inserted: false,
      message:
        parsed.error.issues[0]?.message ??
        "The booking is incomplete. Nothing was booked.",
      ok: false,
    };
  }
  if (!store) {
    return { inserted: false, message: STORE_UNAVAILABLE_BOOK, ok: false };
  }

  const booking = parsed.data;
  const key = `connect:booked:${digest(`${booking.email}|${booking.start}|${booking.duration}|${booking.name}`)}`;
  const existing = await store.get(key);
  if (existing && existing !== "pending") {
    return { inserted: false, message: ALREADY_BOOKED, ok: true };
  }
  if (existing === "pending" || !(await store.claim(key))) {
    return { inserted: false, message: ALREADY_BOOKED, ok: true };
  }

  const capKey = `connect:bookings:${denverDay(now)}`;
  const count = await store.incr(capKey);
  if (count > 2) {
    await store.decr(capKey);
    await store.del(key);
    return { inserted: false, message: BOOKING_CAP, ok: false };
  }

  const startMs = Date.parse(booking.start);
  const end = new Date(startMs + booking.duration * 60_000).toISOString();
  try {
    const busy = await calendar.freeBusy({
      timeMax: end,
      timeMin: booking.start,
    });
    if (overlaps({ busy, duration: booking.duration, start: startMs })) {
      await store.decr(capKey);
      await store.del(key);
      return { inserted: false, message: BUSY_SLOT, ok: false };
    }
    const created = await calendar.insert({
      event: eventBody({
        description: booking.description,
        duration: booking.duration,
        email: booking.email,
        name: booking.name,
        requestId: key,
        start: booking.start,
      }),
      requestId: key,
    });
    await store.set(key, created.id);
    return {
      inserted: true,
      message: `Booked ${booking.duration} minutes at ${booking.start}.`,
      ok: true,
    };
  } catch (error) {
    await store.decr(capKey);
    await store.del(key);
    const message =
      error instanceof Error && error.message === "calendar-unconfigured"
        ? CALENDAR_UNCONNECTED
        : CALENDAR_FAILED;
    return { inserted: false, message, ok: false };
  }
};
