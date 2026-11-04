import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("contact page", () => {
  test("asks what the visitor is building and leaves hire terms to the homepage", () => {
    const source = readFileSync(
      join(process.cwd(), "app/contact/page.tsx"),
      "utf-8"
    );

    expect(source).toContain("where it&apos;s stuck");
    expect(source).not.toContain("hire-terms");
    expect(source).not.toContain("direct hire");
    expect(source).toContain("<ContactForm />");
  });
});
