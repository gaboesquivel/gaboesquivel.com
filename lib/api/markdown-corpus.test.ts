import { describe, expect, test } from "bun:test";

import {
  getPublishedPageMarkdown,
  listPublishedPagePaths,
  resolvePageRouteKey,
} from "./markdown-corpus";

describe("markdown corpus API helpers", () => {
  test("lists manifest paths including /about", () => {
    const paths = listPublishedPagePaths();
    expect(paths).toContain("/about");
    expect(paths).toContain("/");
  });

  test("resolves _root to home and loads markdown", () => {
    const key = resolvePageRouteKey({ search: "", segments: ["_root"] });
    expect(key).toBe("/");
    const page = getPublishedPageMarkdown(key);
    expect(page?.path).toBe("/");
    expect(page?.markdown.length).toBeGreaterThan(100);
  });

  test("returns undefined for unknown paths", () => {
    expect(
      getPublishedPageMarkdown(
        resolvePageRouteKey({ search: "", segments: ["not-a-real-page"] })
      )
    ).toBeUndefined();
  });
});
