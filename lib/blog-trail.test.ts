import { describe, expect, test } from "bun:test";

import { primaryBrowseCategory } from "./blog-trail";

describe("primaryBrowseCategory", () => {
  test("returns the slug when exactly one browse category maps", () => {
    expect(
      primaryBrowseCategory({ categories: ["Artificial Intelligence"] })
    ).toBe("ai");
  });

  test("returns null when no categories map", () => {
    expect(primaryBrowseCategory({ categories: ["Finance"] })).toBeNull();
  });

  test("returns null when multiple browse slugs map", () => {
    expect(
      primaryBrowseCategory({ categories: ["Web3", "Artificial Intelligence"] })
    ).toBeNull();
  });
});
