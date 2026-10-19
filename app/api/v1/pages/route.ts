import { generatedPagesList } from "lib/api/generated/pages-list";
import { jsonResponse, methodNotAllowed } from "lib/api/problem";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const GET = () => jsonResponse(generatedPagesList());

export const POST = () => methodNotAllowed();
export const PUT = () => methodNotAllowed();
export const PATCH = () => methodNotAllowed();
export const DELETE = () => methodNotAllowed();
