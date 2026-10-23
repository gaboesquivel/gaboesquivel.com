import { describe, expect, test } from "bun:test";

import { projects } from "gaboesquivel";

import { aiBrowsePrioritySlugs, orderBrowseProjects } from "./project-browse";

describe("orderBrowseProjects", () => {
  test("orders AI browse with canonical bento slugs first", () => {
    const ordered = orderBrowseProjects({
      domain: "ai",
      projects: [...projects],
    });
    expect(
      ordered.slice(0, aiBrowsePrioritySlugs.length).map((p) => p.slug)
    ).toEqual([...aiBrowsePrioritySlugs]);
  });
});
