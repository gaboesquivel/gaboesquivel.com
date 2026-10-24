import { describe, expect, test } from "bun:test";

import { getProjectBySlug } from "gaboesquivel";

import { bioChapters, bioProjectSlugs } from "./chapters";

describe("bio chapters", () => {
  test("lists four chronological chapters", () => {
    expect(bioChapters).toHaveLength(4);
    expect(bioChapters.map((chapter) => chapter.startYear)).toEqual([
      "2010",
      "2015",
      "2017",
      "2024",
    ]);
  });

  test("each chapter has summary copy and primary media", () => {
    for (const chapter of bioChapters) {
      expect(chapter.summaryParagraphs.length).toBeGreaterThanOrEqual(2);
      expect(chapter.title.length).toBeGreaterThan(0);
      expect(chapter.primaryMedia).toBeDefined();
    }
  });

  test("project slugs resolve in the package", () => {
    for (const slug of bioProjectSlugs) {
      expect(getProjectBySlug(slug)).toBeDefined();
    }
  });

  test("includes expected career links", () => {
    const links = bioChapters.flatMap((chapter) => chapter.links);
    expect(links.some((link) => link.href === "/project/wink")).toBe(true);
    expect(links.some((link) => link.href === "/project/legal-agent")).toBe(
      true
    );
    expect(links.some((link) => link.href === "/web3")).toBe(true);
  });
});
