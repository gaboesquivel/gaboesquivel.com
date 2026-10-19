import { describe, expect, test } from "bun:test";

import { apiNotFound, methodNotAllowed, problemResponse } from "./problem";

describe("api problem responses", () => {
  test("returns application/problem+json with resolution", async () => {
    const res = apiNotFound("Missing resource.");
    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toContain(
      "application/problem+json"
    );
    const body = await res.json();
    expect(body.code).toBe("not_found");
    expect(body.message).toBe("Missing resource.");
    expect(body.resolution).toContain("openapi.json");
  });

  test("method not allowed sets Allow header", () => {
    const res = methodNotAllowed("GET");
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("GET");
    expect(problemResponse).toBeDefined();
  });
});
