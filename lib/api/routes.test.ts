import { describe, expect, test } from "bun:test";

import { GET as unknownApi } from "../../app/api/[[...slug]]/route";
import { GET as getPage } from "../../app/api/v1/pages/[...path]/route";
import { GET as listPages } from "../../app/api/v1/pages/route";
import {
  GET as getProfile,
  POST as profilePost,
} from "../../app/api/v1/profile/route";

describe("public JSON API routes", () => {
  test("GET /api/v1/profile returns profile JSON", async () => {
    const res = await getProfile();
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("application/json");
    const body = await res.json();
    expect(body.name).toBe("Gabo Esquivel");
    expect(body.links.openapi).toContain("/openapi.json");
  });

  test("GET /api/v1/pages returns path list", async () => {
    const res = await listPages();
    const body = await res.json();
    expect(body.paths).toContain("/docs");
  });

  test("GET /api/v1/pages/about returns markdown JSON", async () => {
    const res = await getPage(
      new Request("https://gaboesquivel.com/api/v1/pages/about"),
      { params: Promise.resolve({ path: ["about"] }) }
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.path).toBe("/about");
    expect(body.markdown).toContain("Gabo Esquivel");
  });

  test("unknown /api path returns problem+json", async () => {
    const res = await unknownApi(
      new Request("https://gaboesquivel.com/api/unknown-endpoint")
    );
    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toContain(
      "application/problem+json"
    );
  });

  test("POST /api/v1/profile returns 405 problem+json", async () => {
    const res = await profilePost();
    expect(res.status).toBe(405);
    expect(res.headers.get("Content-Type")).toContain(
      "application/problem+json"
    );
  });
});
