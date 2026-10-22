import { describe, expect, test } from "bun:test";

import { evidenceUsesEditorial } from "./project-cover";

describe("evidenceUsesEditorial", () => {
  test("defaults to card presentation", () => {
    expect(evidenceUsesEditorial({ slugs: ["legal-agent"] })).toBe(false);
  });

  test("card presentation is false for covered slugs", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "card",
        slugs: ["legal-agent"],
      })
    ).toBe(false);
  });

  test("registry with one covered slug is true", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "registry",
        slugs: ["legal-agent"],
      })
    ).toBe(true);
  });

  test("registry with mixed covered and uncovered slugs is false", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "registry",
        slugs: ["legal-agent", "masterbots"],
      })
    ).toBe(false);
  });

  test("registry with empty slugs is false", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "registry",
        slugs: [],
      })
    ).toBe(false);
  });

  test("editorial presentation is not evaluated by evidenceUsesEditorial", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "card",
        slugs: ["legal-agent", "masterbots"],
      })
    ).toBe(false);
  });
});
