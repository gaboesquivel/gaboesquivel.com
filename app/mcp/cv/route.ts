import { handleCvMcpRequest } from "../../../lib/mcp/cv-app";

export const runtime = "nodejs";

const handler = (request: Request) => handleCvMcpRequest(request);

export const GET = handler;
export const POST = handler;
export const DELETE = handler;
