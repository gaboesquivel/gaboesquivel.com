import { describe, expect, test } from "bun:test";
import { join } from "node:path";

import { projects } from "gaboesquivel";
import sharp from "sharp";

import {
  evidenceUsesEditorial,
  projectCoverMaxWidth,
  projectCoverPosition,
  resolveProjectImage,
  smallCoverThreshold,
} from "./project-cover";

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

describe("projectCoverMaxWidth", () => {
  test("lists every package cover narrower than the frame at its intrinsic width", async () => {
    const covers = projects.flatMap((project) => {
      const image = resolveProjectImage({ project });
      return image ? [image.src] : [];
    });
    for (const src of new Set(covers)) {
      const { width = 0 } = await sharp(
        join(process.cwd(), "public", src)
      ).metadata();
      expect({ src, width: projectCoverMaxWidth({ src }) ?? null }).toEqual({
        src,
        width: width < smallCoverThreshold ? width : null,
      });
    }
  });
});

describe("projectCoverPosition", () => {
  test("keeps the Bitlauncher wordmark in frame and centers the rest", () => {
    expect(projectCoverPosition({ slug: "bitlauncher" })).toBe("20% 20%");
    expect(projectCoverPosition({ slug: "wink" })).toBe("50% 50%");
  });
});
