export const DENVER = "America/Denver";

const OPEN_MINUTES = 9 * 60;
const CLOSE_MINUTES = 17 * 60;

export const validTimeZone = (timeZone: string) => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return true;
  } catch {
    return false;
  }
};

export const zonedDate = ({
  instant,
  timeZone,
}: {
  instant: Date;
  timeZone: string;
}) =>
  new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone,
    year: "numeric",
  }).format(instant);

const zoneOffsetMs = ({
  instant,
  timeZone,
}: {
  instant: Date;
  timeZone: string;
}) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone,
    year: "numeric",
  }).formatToParts(instant);
  const value = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");
  const asUtc = Date.UTC(
    value("year"),
    value("month") - 1,
    value("day"),
    value("hour") % 24,
    value("minute"),
    value("second")
  );
  return asUtc - instant.getTime();
};

export const zonedInstant = ({
  date,
  time,
  timeZone,
}: {
  date: string;
  time: string;
  timeZone: string;
}) => {
  const utcGuess = new Date(`${date}T${time}:00.000Z`);
  const first = new Date(
    utcGuess.getTime() - zoneOffsetMs({ instant: utcGuess, timeZone })
  );
  return new Date(
    utcGuess.getTime() - zoneOffsetMs({ instant: first, timeZone })
  );
};

export const addIsoDate = ({ date, days }: { date: string; days: number }) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, (day ?? 1) + days))
    .toISOString()
    .slice(0, 10);
};

const weekday = ({ date, timeZone }: { date: string; timeZone: string }) =>
  new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(
    zonedInstant({ date, time: "12:00", timeZone })
  );

const overlaps = ({
  busy,
  duration,
  start,
}: {
  busy: { start: number; end: number }[];
  duration: number;
  start: number;
}) => {
  const end = start + duration * 60_000;
  return busy.some((block) => start < block.end && end > block.start);
};

const clock = (minutes: number) => {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hours}:${mins}`;
};

const startsForDuration = ({
  busy,
  date,
  duration,
  now,
}: {
  busy: { start: number; end: number }[];
  date: string;
  duration: 15 | 30;
  now: Date;
}) => {
  const starts: string[] = [];
  for (
    let minutes = OPEN_MINUTES;
    minutes + duration <= CLOSE_MINUTES;
    minutes += duration
  ) {
    const start = zonedInstant({
      date,
      time: clock(minutes),
      timeZone: DENVER,
    });
    if (start.getTime() <= now.getTime()) continue;
    if (overlaps({ busy, duration, start: start.getTime() })) continue;
    starts.push(start.toISOString());
  }
  return starts;
};

export const listOpenSlots = ({
  busy,
  now,
  timeZone,
  weekdays = 10,
}: {
  busy: { start: number; end: number }[];
  now: Date;
  timeZone: string;
  weekdays?: number;
}) => {
  const slots: Record<"15" | "30", Record<string, string[]>> = {
    "15": {},
    "30": {},
  };
  let seen = 0;
  const today = zonedDate({ instant: now, timeZone: DENVER });

  for (let offset = 0; offset < 28 && seen < weekdays; offset += 1) {
    const date = addIsoDate({ date: today, days: offset });
    const day = weekday({ date, timeZone: DENVER });
    if (day === "Sat" || day === "Sun") continue;
    seen += 1;
    for (const duration of [15, 30] as const) {
      for (const start of startsForDuration({ busy, date, duration, now })) {
        const visitorDay = zonedDate({
          instant: new Date(start),
          timeZone,
        });
        const bucket = slots[String(duration) as "15" | "30"];
        bucket[visitorDay] = [...(bucket[visitorDay] ?? []), start];
      }
    }
  }

  const days = [
    ...new Set([...Object.keys(slots["15"]), ...Object.keys(slots["30"])]),
  ].sort();

  return { days, slots, timeZone };
};
