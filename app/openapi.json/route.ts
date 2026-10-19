import { openApiDocument } from "lib/api/openapi";

export const runtime = "nodejs";

export const GET = () =>
  Response.json(openApiDocument(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

export const POST = () => methodNotAllowed();
export const PUT = () => methodNotAllowed();
export const PATCH = () => methodNotAllowed();
export const DELETE = () => methodNotAllowed();

const methodNotAllowed = () =>
  Response.json(
    {
      code: "method_not_allowed",
      detail: "This endpoint accepts GET only.",
      message: "This endpoint accepts GET only.",
      resolution: "Request GET /openapi.json.",
      status: 405,
      title: "Method not allowed",
      type: "https://gaboesquivel.com/docs#api-errors",
    },
    {
      headers: {
        Allow: "GET",
        "Content-Type": "application/problem+json; charset=utf-8",
      },
      status: 405,
    }
  );
