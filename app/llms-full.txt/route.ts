import { plainTextResponse } from "lib/plain-text-response";

import { getLlmsFull } from "../../scripts/llms/corpus";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  return plainTextResponse(getLlmsFull());
}
