import { describe, expect, test } from "bun:test";

import {
  activeWorkTypeFromPathname,
  featuredProjectSlugs,
  workTypeCopy,
  workTypeFromPathname,
  workTypeHref,
  workTypeOptions,
  workTypeRoutes,
} from "./work-types";

const MOBILE_VIEWPORT_PX = 320;
const APPROX_CHAR_WIDTH_PX = 7.2;

describe("workTypeFromPathname", () => {
  test("maps root /work to featured", () => {
    expect(workTypeFromPathname("/work")).toBe("featured");
    expect(workTypeFromPathname("/work/")).toBe("featured");
  });

  test("maps category paths and trailing slashes", () => {
    for (const type of workTypeOptions) {
      if (type === "featured") continue;
      expect(workTypeFromPathname(`/work/${type}`)).toBe(type);
      expect(workTypeFromPathname(`/work/${type}/`)).toBe(type);
    }
  });

  test("returns null for invalid paths", () => {
    expect(workTypeFromPathname("/work/unknown")).toBeNull();
    expect(workTypeFromPathname("/projects")).toBeNull();
  });
});

describe("workTypeHref", () => {
  test("featured uses /work and others use /work/[type]", () => {
    expect(workTypeHref({ type: "featured" })).toBe("/work");
    expect(workTypeHref({ type: "ai" })).toBe("/work/ai");
    expect(workTypeHref({ type: "full-time" })).toBe("/work/full-time");
  });
});

describe("workTypeRoutes", () => {
  test("lists one href per work type in option order", () => {
    expect(workTypeRoutes).toHaveLength(workTypeOptions.length);
    expect(workTypeRoutes[0]).toBe("/work");
    for (let index = 1; index < workTypeOptions.length; index += 1) {
      expect(workTypeRoutes[index]).toBe(
        workTypeHref({ type: workTypeOptions[index] })
      );
    }
  });
});

describe("activeWorkTypeFromPathname", () => {
  test("defaults unknown paths to featured", () => {
    expect(activeWorkTypeFromPathname("/projects")).toBe("featured");
    expect(activeWorkTypeFromPathname(null)).toBe("featured");
  });
});

describe("workTypeCopy editorial fields", () => {
  for (const type of workTypeOptions) {
    test(`${type} has two desktop and mobile lines`, () => {
      const copy = workTypeCopy[type];
      expect(copy.desktopLines).toHaveLength(2);
      expect(copy.mobileLines).toHaveLength(2);
      expect(copy.desktopLines[0].length).toBeGreaterThan(0);
      expect(copy.desktopLines[1].length).toBeGreaterThan(0);
      expect(copy.mobileLines[0].length).toBeGreaterThan(0);
      expect(copy.mobileLines[1].length).toBeGreaterThan(0);
      expect(copy.heroTitle.length).toBeGreaterThan(0);
      expect(copy.trailLabel.length).toBeGreaterThan(0);
    });

    test(`${type} mobile lines fit ~${MOBILE_VIEWPORT_PX}px width`, () => {
      const copy = workTypeCopy[type];
      const maxChars = Math.floor(MOBILE_VIEWPORT_PX / APPROX_CHAR_WIDTH_PX);
      for (const line of copy.mobileLines) {
        expect(line.length).toBeLessThanOrEqual(maxChars);
      }
    });
  }

  test("all hero titles are distinct", () => {
    const heroTitles = workTypeOptions.map(
      (type) => workTypeCopy[type].heroTitle
    );
    expect(new Set(heroTitles).size).toBe(workTypeOptions.length);
  });
});

describe("featuredProjectSlugs", () => {
  test("unchanged membership and order", () => {
    expect(featuredProjectSlugs).toEqual([
      "legal-agent",
      "wink",
      "ztx",
      "bitlauncher",
      "opyn",
      "eos-costa-rica",
    ]);
  });
});
