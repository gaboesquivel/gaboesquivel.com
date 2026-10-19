import { describe, expect, test } from "bun:test";

import {
  addCalendarDays,
  isOpenStart,
  rebucketSlots,
  slotsForDay,
  sortedDays,
  startOfWeek,
  upcomingAppointments,
  visitorDayKey,
  weekDayRange,
} from "./slot-display";

const slots = {
  "15": {
    "2026-10-20": ["2026-10-20T16:00:00.000Z", "2026-10-20T16:15:00.000Z"],
    "2026-10-21": ["2026-10-21T16:00:00.000Z"],
  },
  "30": {
    "2026-10-20": ["2026-10-20T16:00:00.000Z"],
  },
} as const;

describe("slot display", () => {
  test("visitorDayKey follows the visitor time zone", () => {
    expect(
      visitorDayKey({
        iso: "2026-10-20T06:00:00.000Z",
        timeZone: "America/Los_Angeles",
      })
    ).toBe("2026-10-19");
    expect(
      visitorDayKey({
        iso: "2026-10-20T06:00:00.000Z",
        timeZone: "America/Denver",
      })
    ).toBe("2026-10-20");
  });

  test("rebucketSlots keeps starts sorted within a day", () => {
    const rebucketed = rebucketSlots({
      slots: slots as never,
      timeZone: "America/Denver",
    });
    expect(rebucketed["15"]["2026-10-20"]).toEqual([
      "2026-10-20T16:00:00.000Z",
      "2026-10-20T16:15:00.000Z",
    ]);
  });

  test("upcomingAppointments returns the earliest future slots", () => {
    const now = new Date("2026-10-20T15:00:00.000Z");
    const upcoming = upcomingAppointments({
      duration: 15,
      limit: 3,
      now,
      slots: slots as never,
      timeZone: "America/Denver",
    });
    expect(upcoming.map((item) => item.start)).toEqual([
      "2026-10-20T16:00:00.000Z",
      "2026-10-20T16:15:00.000Z",
      "2026-10-21T16:00:00.000Z",
    ]);
  });

  test("sortedDays lists only days with availability", () => {
    expect(sortedDays(slots as never, 30)).toEqual(["2026-10-20"]);
    expect(sortedDays(slots as never, 15)).toEqual([
      "2026-10-20",
      "2026-10-21",
    ]);
  });

  test("week navigation stays on weekdays", () => {
    const weekStart = startOfWeek({
      date: "2026-10-22",
      timeZone: "America/Denver",
    });
    expect(weekStart).toBe("2026-10-19");
    expect(weekDayRange({ timeZone: "America/Denver", weekStart })).toEqual([
      "2026-10-19",
      "2026-10-20",
      "2026-10-21",
      "2026-10-22",
      "2026-10-23",
    ]);
  });

  test("slotsForDay drops expired starts", () => {
    const now = new Date("2026-10-20T16:10:00.000Z");
    expect(
      slotsForDay({
        day: "2026-10-20",
        duration: 15,
        now,
        slots: slots as never,
        timeZone: "America/Denver",
      })
    ).toEqual(["2026-10-20T16:15:00.000Z"]);
  });

  test("isOpenStart rejects expired and missing starts", () => {
    const now = new Date("2026-10-20T16:10:00.000Z");
    expect(
      isOpenStart({
        duration: 15,
        now,
        slots: slots as never,
        start: "2026-10-20T16:00:00.000Z",
        timeZone: "America/Denver",
      })
    ).toBe(false);
    expect(
      isOpenStart({
        duration: 15,
        now,
        slots: slots as never,
        start: "2026-10-20T16:15:00.000Z",
        timeZone: "America/Denver",
      })
    ).toBe(true);
  });

  test("addCalendarDays crosses month boundaries", () => {
    expect(addCalendarDays({ date: "2026-10-31", days: 1 })).toBe("2026-11-01");
  });
});
