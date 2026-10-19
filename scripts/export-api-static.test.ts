import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");

describe("export-llms API artifacts", () => {
  test("public/openapi.json is OpenAPI 3.1 with getProfile", () => {
    const file = join(root, "public/openapi.json");
    expect(existsSync(file)).toBe(true);
    const doc = JSON.parse(readFileSync(file, "utf-8"));
    expect(doc.openapi).toBe("3.1.0");
    expect(doc.paths["/api/v1/profile"].get.operationId).toBe("getProfile");
  });

  test("generated profile and pages list exist", () => {
    const profile = JSON.parse(
      readFileSync(join(root, "generated/api/profile.json"), "utf-8")
    );
    expect(profile.name).toBe("Gabo Esquivel");

    const pages = JSON.parse(
      readFileSync(join(root, "generated/api/pages.json"), "utf-8")
    );
    expect(pages.paths).toContain("/docs");
  });
});
