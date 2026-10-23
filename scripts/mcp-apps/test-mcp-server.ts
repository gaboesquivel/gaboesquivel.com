/**
 * Standalone public MCP server for optional basic-host Playwright runs.
 * Default port: MCP_TEST_PORT or 3101.
 */
import { handlePublicMcpRequest } from "../../lib/mcp/public-server";

const port = Number(process.env.MCP_TEST_PORT ?? "3101");

const server = Bun.serve({
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/mcp" || url.pathname === "/") {
      return handlePublicMcpRequest(request);
    }
    return new Response("MCP test server", { status: 404 });
  },
  port,
});

console.log(`MCP test server listening on http://localhost:${server.port}/mcp`);
