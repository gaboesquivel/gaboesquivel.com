import { jsonResponse, methodNotAllowed } from "lib/api/problem";
import { siteProfile } from "lib/api/profile";

export const runtime = "nodejs";

export const GET = () => jsonResponse(siteProfile());

export const POST = () => methodNotAllowed();
export const PUT = () => methodNotAllowed();
export const PATCH = () => methodNotAllowed();
export const DELETE = () => methodNotAllowed();
