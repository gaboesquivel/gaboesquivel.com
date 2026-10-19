import { listPublishedPagePaths } from "lib/api/markdown-corpus";
import { jsonResponse, methodNotAllowed } from "lib/api/problem";

export const runtime = "nodejs";

export const GET = () => jsonResponse({ paths: listPublishedPagePaths() });

export const POST = () => methodNotAllowed();
export const PUT = () => methodNotAllowed();
export const PATCH = () => methodNotAllowed();
export const DELETE = () => methodNotAllowed();
