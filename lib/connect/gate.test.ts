import { describe, expect, test } from "bun:test";

import { bookCall } from "./book";
import { memoryCapStore } from "./caps";
import { fixedSpec } from "./compose";
import { BOOKING_CAP } from "./copy";
import { bookSchema } from "./schema";
import { listOpenSlots, zonedInstant } from "./slots";

const booking = {
  description: "Discuss the lending integration and where it is stuck.",
  duration: 30 as const,
  email: "ada@example.com",
  name: "Ada",
  start: "2026-10-19T15:00:00.000Z",
  timeZone: "America/Denver",
};

const fakeCalendar = () => {
  const inserts: unknown[] = [];
  return {
    calendar: {
      freeBusy: async () => [],
      insert: async (input: { event: Record<string, unknown> }) => {
        inserts.push(input.event);
        return { id: `evt-${inserts.length}` };
      },
    },
    inserts,
  };
};

describe("connect gate", () => {
  test("rejects a missing description and a duration outside 15 or 30", () => {
    expect(bookSchema.safeParse({ ...booking, description: "" }).success).toBe(
      false
    );
    expect(
      bookSchema.safeParse({ ...booking, description: "short" }).success
    ).toBe(false);
    expect(bookSchema.safeParse({ ...booking, duration: 15 }).success).toBe(
      true
    );
    expect(bookSchema.safeParse(booking).success).toBe(true);
    expect(bookSchema.safeParse({ ...booking, duration: 45 }).success).toBe(
      false
    );
    expect(bookSchema.safeParse({ ...booking, duration: 20 }).success).toBe(
      false
    );
  });

  test("a third booking the same day does not insert", async () => {
    const store = memoryCapStore();
    const { calendar, inserts } = fakeCalendar();
    const now = new Date("2026-10-19T12:00:00.000Z");
    const first = await bookCall({
      calendar,
      input: booking,
      now,
      store,
    });
    const replay = await bookCall({
      calendar,
      input: booking,
      now,
      store,
    });
    const second = await bookCall({
      calendar,
      input: { ...booking, start: "2026-10-19T16:00:00.000Z" },
      now,
      store,
    });
    const third = await bookCall({
      calendar,
      input: { ...booking, start: "2026-10-19T17:00:00.000Z" },
      now,
      store,
    });

    expect(first.inserted).toBe(true);
    expect(replay.inserted).toBe(false);
    expect(second.inserted).toBe(true);
    expect(third.inserted).toBe(false);
    expect(third.message).toBe(BOOKING_CAP);
    expect(inserts).toHaveLength(2);
  });

  test("a third booking the same day succeeds when caps are not enforced", async () => {
    const store = memoryCapStore();
    const { calendar, inserts } = fakeCalendar();
    const now = new Date("2026-10-19T12:00:00.000Z");
    const starts = [
      "2026-10-19T15:00:00.000Z",
      "2026-10-19T16:00:00.000Z",
      "2026-10-19T17:00:00.000Z",
    ];
    for (const start of starts) {
      const result = await bookCall({
        calendar,
        enforce: false,
        input: { ...booking, start },
        now,
        store,
      });
      expect(result.inserted).toBe(true);
    }
    expect(inserts).toHaveLength(3);
  });

  test("lists 15- and 30-minute starts and skips busy time", () => {
    const denverNine = zonedInstant({
      date: "2026-10-19",
      time: "09:00",
      timeZone: "America/Denver",
    });
    expect(denverNine.toISOString()).toBe("2026-10-19T15:00:00.000Z");

    const now = new Date("2026-10-19T12:00:00.000Z");
    const open = listOpenSlots({
      busy: [],
      now,
      timeZone: "America/Denver",
      weekdays: 1,
    });
    expect(open.slots["15"]["2026-10-19"]?.[0]).toBe(
      "2026-10-19T15:00:00.000Z"
    );
    expect(open.slots["15"]["2026-10-19"]?.length).toBeGreaterThan(
      open.slots["30"]["2026-10-19"]?.length ?? 0
    );

    const busy = listOpenSlots({
      busy: [
        {
          end: Date.parse("2026-10-19T15:30:00.000Z"),
          start: Date.parse("2026-10-19T15:00:00.000Z"),
        },
      ],
      now,
      timeZone: "America/Denver",
      weekdays: 1,
    });
    expect(busy.slots["15"]["2026-10-19"]).not.toContain(
      "2026-10-19T15:00:00.000Z"
    );
    expect(busy.slots["15"]["2026-10-19"]).not.toContain(
      "2026-10-19T15:15:00.000Z"
    );
    expect(busy.slots["30"]["2026-10-19"]).not.toContain(
      "2026-10-19T15:00:00.000Z"
    );
    expect(busy.slots["15"]["2026-10-19"]).toContain(
      "2026-10-19T15:30:00.000Z"
    );
  });

  test("the fixed picker spec keeps clock strings out of props", () => {
    const spec = fixedSpec({
      day: "2026-10-19",
      days: ["2026-10-19"],
      duration: 15,
      slots: {
        "15": { "2026-10-19": ["2026-10-19T15:00:00.000Z"] },
        "30": { "2026-10-19": ["2026-10-19T15:00:00.000Z"] },
      },
      timeZone: "America/Denver",
    });
    const props = JSON.stringify(
      Object.values(spec.elements).map((element) => element.props)
    );
    expect(props).not.toContain("10:00");
    expect(props).not.toContain("15:00");
    expect(JSON.stringify(spec.state)).toContain("2026-10-19T15:00:00.000Z");
  });
});
