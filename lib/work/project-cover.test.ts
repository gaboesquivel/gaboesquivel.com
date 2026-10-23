import { describe, expect, test } from "bun:test";

import { evidenceUsesEditorial, resolveProjectImage } from "./project-cover";

describe("resolveProjectImage", () => {
  test("strips the production site origin from package image URLs", () => {
    expect(
      resolveProjectImage({
        project: {
          title: "LegalAgent",
          image: "https://gaboesquivel.com/images/work/legalagent.webp",
        },
      })
    ).toEqual({
      src: "/images/work/legalagent.webp",
      alt: "LegalAgent",
    });
  });

  test("returns null when the package has no image", () => {
    expect(
      resolveProjectImage({
        project: { title: "Example", image: undefined },
      })
    ).toBeNull();
  });
});

describe("evidenceUsesEditorial", () => {
  test("card presentation ignores slugs", () => {
    expect(evidenceUsesEditorial({ slugs: ["legal-agent"] })).toBe(false);
    expect(
      evidenceUsesEditorial({
        presentation: "card",
        slugs: ["legal-agent"],
      })
    ).toBe(false);
  });

  test("registry with slugs uses editorial layout", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "registry",
        slugs: ["legal-agent", "masterbots"],
      })
    ).toBe(true);
  });

  test("registry with empty slugs is false", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "registry",
        slugs: [],
      })
    ).toBe(false);
  });

  test("editorial presentation is true", () => {
    expect(
      evidenceUsesEditorial({
        presentation: "editorial",
        slugs: ["legal-agent", "masterbots"],
      })
    ).toBe(true);
  });
});
