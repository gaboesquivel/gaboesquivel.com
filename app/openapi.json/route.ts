import { generatedOpenApiDocument } from "lib/api/generated/openapi-document";
import { methodNotAllowed } from "lib/api/problem";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const GET = () =>
  Response.json(generatedOpenApiDocument(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

export const POST = () => methodNotAllowed();
export const PUT = () => methodNotAllowed();
export const PATCH = () => methodNotAllowed();
export const DELETE = () => methodNotAllowed();
