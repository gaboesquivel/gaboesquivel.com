import { generatedProfile } from "lib/api/generated/profile";
import { jsonResponse, methodNotAllowed } from "lib/api/problem";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const GET = () => jsonResponse(generatedProfile());

export const POST = () => methodNotAllowed();
export const PUT = () => methodNotAllowed();
export const PATCH = () => methodNotAllowed();
export const DELETE = () => methodNotAllowed();
