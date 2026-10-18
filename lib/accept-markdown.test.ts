import { describe, expect, test } from "bun:test";

import { preferredContentType } from "./accept-markdown";

describe("preferredContentType", () => {
  test("defaults to HTML when Accept is missing", () => {
    expect(preferredContentType(null)).toBe("text/html");
  });

  test("defaults to HTML for */*", () => {
    expect(preferredContentType("*/*")).toBe("text/html");
  });

  test("prefers Markdown when listed first", () => {
    expect(preferredContentType("text/markdown, text/html, */*")).toBe(
      "text/markdown"
    );
  });

  test("prefers HTML for typical browser Accept", () => {
    expect(
      preferredContentType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      )
    ).toBe("text/html");
  });

  test("honors higher q for Markdown", () => {
    expect(preferredContentType("text/html;q=0.5, text/markdown;q=0.9")).toBe(
      "text/markdown"
    );
  });

  test("falls back to Markdown when text/html;q=0 but */* remains", () => {
    expect(preferredContentType("text/html;q=0, */*;q=1")).toBe(
      "text/markdown"
    );
  });

  test("rejects unsupported types", () => {
    expect(preferredContentType("application/pdf")).toBe(null);
  });
});
