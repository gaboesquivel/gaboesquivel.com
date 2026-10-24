import { describe, expect, test } from "bun:test";

import {
  filterGenuiSearchHistory,
  mergeGenuiSearchHistory,
  parseGenuiSearchHistory,
} from "./search-history";

describe("mergeGenuiSearchHistory", () => {
  test("moves duplicate to front with latest casing", () => {
    const next = mergeGenuiSearchHistory({
      history: ["Download CV", "book a call"],
      query: "download cv",
    });
    expect(next).toEqual(["download cv", "book a call"]);
  });

  test("drops empty queries", () => {
    const next = mergeGenuiSearchHistory({
      history: ["ai work"],
      query: "   ",
    });
    expect(next).toEqual(["ai work"]);
  });
});

describe("parseGenuiSearchHistory", () => {
  test("ignores invalid JSON", () => {
    expect(parseGenuiSearchHistory("not-json")).toEqual([]);
  });
});

describe("filterGenuiSearchHistory", () => {
  test("returns recent items when query is empty", () => {
    const matches = filterGenuiSearchHistory({
      history: ["one", "two", "three"],
      query: "",
      limit: 2,
    });
    expect(matches).toEqual(["one", "two"]);
  });

  test("filters history by terms", () => {
    const matches = filterGenuiSearchHistory({
      history: ["Show me your AI projects", "Download CV"],
      query: "ai",
    });
    expect(matches).toEqual(["Show me your AI projects"]);
  });
});
