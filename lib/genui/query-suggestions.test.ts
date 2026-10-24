import { describe, expect, test } from "bun:test";

import { normalizeGenuiQuery } from "./normalize-query";
import {
  buildGenuiAutosuggest,
  filterCuratedGenuiSuggestions,
} from "./query-suggestions";

describe("filterCuratedGenuiSuggestions", () => {
  test("matches résumé prompt when user types your cv", () => {
    const matches = filterCuratedGenuiSuggestions("your cv");
    expect(matches.some((item) => item.query === "download cv")).toBe(true);
    expect(matches.some((item) => item.label.includes("résumé"))).toBe(true);
  });

  test("shows interview examples when field is empty and focused", () => {
    const suggestions = buildGenuiAutosuggest({
      includeRecentWhenEmpty: true,
      query: "",
      records: [],
    });
    expect(suggestions.some((item) => item.source === "curated")).toBe(true);
    expect(suggestions[0]?.label).toMatch(/\?$/);
  });

  test("returns nothing for whitespace", () => {
    expect(filterCuratedGenuiSuggestions("   ")).toEqual([]);
  });
});

describe("buildGenuiAutosuggest", () => {
  test("merges curated and site matches without duplicate queries", () => {
    const suggestions = buildGenuiAutosuggest({
      query: "cv",
      records: [
        {
          description: "Résumé",
          href: "/cv",
          title: "Download CV",
        },
      ],
    });
    const downloadCv = suggestions.filter(
      (item) => normalizeGenuiQuery(item.query) === "download cv"
    );
    expect(downloadCv).toHaveLength(1);
  });

  test("prioritizes matching search history", () => {
    const suggestions = buildGenuiAutosuggest({
      history: ["My custom AI query", "Download CV"],
      query: "custom",
      records: [],
    });
    expect(suggestions[0]?.source).toBe("history");
    expect(suggestions[0]?.query).toBe("My custom AI query");
  });
});
