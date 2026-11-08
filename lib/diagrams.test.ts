import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Rules: docs/agents/design/editorial-images.md#in-article-diagrams
const dir = join(process.cwd(), "public", "images", "diagrams");
const diagrams = readdirSync(dir).filter((file) => file.endsWith(".svg"));
const fontSizes = new Set([12, 13, 16]);

describe.each(diagrams)("%s", (file) => {
  const svg = readFileSync(join(dir, file), "utf-8");
  const root = svg.match(/<svg\b[^>]*>/)?.[0] ?? "";

  test("canvas is 640–768 wide with matching size attributes", () => {
    const viewBox = root.match(/viewBox="0 0 (\d+) (\d+)"/);
    expect(viewBox).not.toBeNull();
    const [, width, height] = viewBox ?? [];
    expect(Number(width)).toBeGreaterThanOrEqual(640);
    expect(Number(width)).toBeLessThanOrEqual(768);
    expect(root).toContain(`width="${width}"`);
    expect(root).toContain(`height="${height}"`);
  });

  test("text uses the 16 / 13 / 12 scale", () => {
    const sizes = [...svg.matchAll(/font-size="([\d.]+)"/g)].map(([, size]) =>
      Number(size)
    );
    expect(sizes.length).toBeGreaterThan(0);
    expect(sizes.filter((size) => !fontSizes.has(size))).toEqual([]);
  });

  test("has an accessible title and description", () => {
    expect(svg).toMatch(/<title[^>]*>[^<]+<\/title>/);
    expect(svg).toMatch(/<desc[^>]*>[^<]+<\/desc>/);
  });
});
