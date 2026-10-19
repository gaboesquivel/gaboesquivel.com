import { describe, expect, test } from "bun:test";

import { openApiDocument } from "./openapi";

describe("openApiDocument", () => {
  test("uses OpenAPI 3.1 with unique operationIds and descriptions", () => {
    const doc = openApiDocument();
    expect(doc.openapi).toBe("3.1.0");

    const operations = Object.values(doc.paths).flatMap((path) =>
      Object.values(path).filter(
        (item): item is { operationId: string; description: string } =>
          typeof item === "object" &&
          item !== null &&
          "operationId" in item &&
          "description" in item
      )
    );

    const ids = operations.map((op) => op.operationId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("getProfile");
    expect(ids).toContain("listPages");
    expect(ids).toContain("getPage");

    for (const op of operations) {
      expect(op.description.length).toBeGreaterThan(20);
    }
  });

  test("documents Problem schema with code, message, and resolution", () => {
    const problem = openApiDocument().components.schemas.Problem;
    expect(problem.required).toEqual(
      expect.arrayContaining([
        "code",
        "message",
        "resolution",
        "detail",
        "status",
      ])
    );
  });
});
