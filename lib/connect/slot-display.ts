import { addIsoDate, zonedInstant } from "./slots";

const durationKey = (duration: 15 | 30) => (duration === 30 ? "30" : "15");

export type SlotBuckets = Record<"15" | "30", Record<string, string[]>>;

export const visitorDayKey = ({
  iso,
  timeZone,
}: {
  iso: string;
  timeZone: string;
}) =>
  new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone,
    year: "numeric",
  }).format(new Date(iso));

export const rebucketSlots = ({
  slots,
  timeZone,
}: {
  slots: SlotBuckets;
  timeZone: string;
}) => {
  const next: SlotBuckets = { "15": {}, "30": {} };
  for (const duration of ["15", "30"] as const) {
    for (const starts of Object.values(slots[duration])) {
      for (const iso of starts) {
        const day = visitorDayKey({ iso, timeZone });
        const bucket = next[duration][day] ?? [];
        if (!bucket.includes(iso)) next[duration][day] = [...bucket, iso];
      }
    }
    for (const day of Object.keys(next[duration])) {
      next[duration][day].sort((a, b) => Date.parse(a) - Date.parse(b));
    }
  }
  return next;
};

export const filterFutureStarts = ({
  now,
  starts,
}: {
  now: Date;
  starts: string[];
}) => starts.filter((iso) => Date.parse(iso) > now.getTime());

export const sortedDays = (slots: SlotBuckets, duration: 15 | 30) => {
  const key = durationKey(duration);
  return Object.keys(slots[key])
    .filter((day) => (slots[key][day]?.length ?? 0) > 0)
    .sort();
};

export const upcomingAppointments = ({
  duration,
  limit = 5,
  now,
  slots,
  timeZone,
}: {
  duration: 15 | 30;
  limit?: number;
  now: Date;
  slots: SlotBuckets;
  timeZone: string;
}) => {
  const bucketed = rebucketSlots({ slots, timeZone });
  const key = durationKey(duration);
  const flat = Object.values(bucketed[key]).flat();
  return filterFutureStarts({ now, starts: flat })
    .sort((a, b) => Date.parse(a) - Date.parse(b))
    .slice(0, limit)
    .map((start) => ({ duration, start }));
};

export const addCalendarDays = ({
  date,
  days,
}: {
  date: string;
  days: number;
}) => addIsoDate({ date, days });

const weekdayIndex = ({
  date,
  timeZone,
}: {
  date: string;
  timeZone: string;
}) => {
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(zonedInstant({ date, time: "12:00", timeZone }));
  const map: Record<string, number> = {
    Fri: 5,
    Mon: 1,
    Sat: 6,
    Sun: 0,
    Thu: 4,
    Tue: 2,
    Wed: 3,
  };
  return map[label] ?? 0;
};

export const startOfWeek = ({
  date,
  timeZone,
}: {
  date: string;
  timeZone: string;
}) => {
  const index = weekdayIndex({ date, timeZone });
  const offset = index === 0 ? -6 : 1 - index;
  return addCalendarDays({ date, days: offset });
};

export const weekDayRange = ({
  timeZone,
  weekStart,
}: {
  timeZone: string;
  weekStart: string;
}) =>
  Array.from({ length: 7 }, (_, index) =>
    addCalendarDays({ date: weekStart, days: index })
  ).filter((date) => {
    const label = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
    }).format(zonedInstant({ date, time: "12:00", timeZone }));
    return label !== "Sat" && label !== "Sun";
  });

export const formatSlotSelectionLine = ({
  duration,
  start,
  timeZone,
}: {
  duration: 15 | 30;
  start: string;
  timeZone: string;
}) => {
  const date = new Date(start);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone,
    weekday: "short",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    minute: "2-digit",
    timeZone,
  }).format(date);
  const zone = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
  return `${duration} min · ${day} ${time}${zone ? ` ${zone}` : ""}`;
};

export const isOpenStart = ({
  duration,
  now,
  slots,
  start,
  timeZone,
}: {
  duration: 15 | 30;
  now: Date;
  slots: SlotBuckets;
  start: string;
  timeZone: string;
}) => {
  if (Date.parse(start) <= now.getTime()) return false;
  const day = visitorDayKey({ iso: start, timeZone });
  return slotsForDay({
    day,
    duration,
    now,
    slots,
    timeZone,
  }).includes(start);
};

export const slotsForDay = ({
  day,
  duration,
  now,
  slots,
  timeZone,
}: {
  day: string;
  duration: 15 | 30;
  now: Date;
  slots: SlotBuckets;
  timeZone: string;
}) => {
  const bucketed = rebucketSlots({ slots, timeZone });
  const key = durationKey(duration);
  return filterFutureStarts({
    now,
    starts: bucketed[key][day] ?? [],
  });
};

export const COMMON_TIME_ZONES = [
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Costa_Rica",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "UTC",
] as const;

export const timeZoneOptions = (detected: string) => {
  const set = new Set<string>([detected, ...COMMON_TIME_ZONES]);
  return [...set];
};
