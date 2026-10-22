import type { CalendarClient } from "../connect/calendar";
import { listOpenSlots } from "../connect/slots";

export const offeredSlot = async ({
  calendar,
  duration,
  now,
  start,
  timeZone,
}: {
  calendar: CalendarClient;
  duration: 15 | 30;
  now: Date;
  start: string;
  timeZone: string;
}) => {
  const horizonEnd = new Date(
    now.getTime() + 28 * 24 * 60 * 60 * 1000
  ).toISOString();
  const busy = await calendar.freeBusy({
    timeMax: horizonEnd,
    timeMin: now.toISOString(),
  });
  const open = listOpenSlots({ busy, now, timeZone });
  const bucket = open.slots[String(duration) as "15" | "30"];
  return Object.values(bucket)
    .flat()
    .some((iso) => iso === start);
};
