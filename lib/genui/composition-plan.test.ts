import { describe, expect, test } from "bun:test";

import {
  CompositionPlanError,
  materializeProjectSlots,
} from "./composition-plan";

describe("materializeProjectSlots", () => {
  test("assigns bento roles in order", () => {
    const plan = materializeProjectSlots("project-bento", [
      "/project/a",
      "/project/b",
      "/project/c",
      "/project/d",
    ]);
    expect(plan.slots.map((slot) => slot.role)).toEqual([
      "lead",
      "top-right",
      "bottom-left",
      "bottom-right",
    ]);
  });

  test("rejects duplicate ids", () => {
    expect(() =>
      materializeProjectSlots("project-bento", [
        "/project/a",
        "/project/a",
        "/project/c",
        "/project/d",
      ])
    ).toThrow(CompositionPlanError);
  });

  test("rejects wrong cardinality", () => {
    expect(() =>
      materializeProjectSlots("project-bento", ["/project/a"])
    ).toThrow(CompositionPlanError);
  });
});
