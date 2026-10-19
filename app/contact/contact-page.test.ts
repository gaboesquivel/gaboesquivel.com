import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("contact page", () => {
  test("has at least 500 characters of prose for trust anchors", () => {
    const source = readFileSync(
      join(process.cwd(), "app/contact/page.tsx"),
      "utf-8"
    );
    const proseBlocks = [...source.matchAll(/<Prose>([\s\S]*?)<\/Prose>/g)].map(
      (match) =>
        match[1]
          .replaceAll(/<[^>]+>/g, " ")
          .replaceAll(/\s+/g, " ")
          .trim()
    );
    const text = proseBlocks.join(" ");
    expect(text.length).toBeGreaterThanOrEqual(500);
  });
});
