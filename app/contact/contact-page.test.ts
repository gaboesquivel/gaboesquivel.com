import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { hireTermsLanguages, hireTermsLocationLine } from "lib/hire-terms";

describe("contact page", () => {
  test("states hire facts once and asks what the visitor is building", () => {
    const source = readFileSync(
      join(process.cwd(), "app/contact/page.tsx"),
      "utf-8"
    );
    const proseBlocks = [
      ...source.matchAll(/<Prose(?:\s[^>]*)?>([\s\S]*?)<\/Prose>/g),
    ].map((match) =>
      match[1]
        .replaceAll(/<[^>]+>/g, " ")
        .replaceAll("&apos;", "'")
        .replaceAll(/\{" "\}/g, " ")
        .replaceAll(/\{[^}]+\}/g, " ")
        .replaceAll(/\s+/g, " ")
        .trim()
    );
    const text = proseBlocks.join(" ");

    expect(source).toContain("{hireTermsLocationLine}");
    expect(source).toContain("{hireTermsLanguages}");
    expect(hireTermsLocationLine).toContain("Costa Rica");
    expect(hireTermsLocationLine).toContain("US Mountain Time");
    expect(hireTermsLanguages).toContain("English");
    expect(text).toContain("Blockmatic Labs LLC");
    expect(text).toContain("W-2");
    expect(text).toContain("where it's stuck");
    expect(text.match(/direct hire/g)?.length).toBe(1);
    expect(text).not.toContain("international hire, or a contract");
  });
});
