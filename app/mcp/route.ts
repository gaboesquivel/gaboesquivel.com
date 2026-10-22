import { handlePublicMcpRequest } from "lib/mcp/public-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handlePublicMcpRequest(request);
}

export async function POST(request: Request) {
  return handlePublicMcpRequest(request);
}

export async function DELETE(request: Request) {
  return handlePublicMcpRequest(request);
}
