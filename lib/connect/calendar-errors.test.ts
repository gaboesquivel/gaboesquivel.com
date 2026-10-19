import { describe, expect, test } from "bun:test";

import {
  CALENDAR_UNCONNECTED,
  SLOTS_FAILED,
  slotsMessageForError,
} from "./copy";

describe("calendar slots errors", () => {
  test("maps unconfigured separately from token failures", () => {
    expect(slotsMessageForError(new Error("calendar-unconfigured"))).toBe(
      CALENDAR_UNCONNECTED
    );
    expect(
      slotsMessageForError(new Error("calendar-token:invalid_grant"))
    ).toBe(SLOTS_FAILED);
    expect(
      slotsMessageForError(
        new Error("calendar-request:insufficientPermissions")
      )
    ).toBe(SLOTS_FAILED);
  });
});
