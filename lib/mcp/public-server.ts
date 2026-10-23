import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { capabilityRegistry, runCapability } from "../capabilities/registry";
import { capabilityContextFromRequest } from "../capabilities/server-context";
import { readRequestIp } from "../connect/ip";

const APP_RESOURCE_URI = "ui://gaboesquivel/app";

const toolResult = (result: unknown) => {
  const payload = result as {
    data?: unknown;
    message?: string;
    status?: string;
  };
  return {
    content: [
      {
        text: payload.message ?? "Done.",
        type: "text" as const,
      },
    ],
    structuredContent: payload,
  };
};

export const createPublicMcpServer = ({ ip }: { ip: string }) => {
  const server = new McpServer(
    { name: "gaboesquivel", version: "2.0.0" },
    {
      capabilities: { resources: {}, tools: {} },
      instructions:
        "Public portfolio tools for profile, projects, writing, search, CV, contact, availability, notes, and bookings.",
    }
  );

  server.registerResource("genui-app", APP_RESOURCE_URI, {}, async () => ({
    contents: [
      {
        mimeType: "text/html;profile=mcp-app",
        text: "<!doctype html><html><body><div id='root'>Gabo Esquivel MCP App</div></body></html>",
        uri: APP_RESOURCE_URI,
      },
    ],
  }));

  for (const entry of Object.values(capabilityRegistry)) {
    server.registerTool(
      entry.name,
      {
        description: entry.description,
        inputSchema: entry.inputSchema,
        title: entry.name,
      },
      async (input) => {
        const correlationId = crypto.randomUUID();
        const result = await runCapability({
          context: capabilityContextFromRequest({
            correlationId,
            ip,
          }),
          input,
          name: entry.name,
        });
        return toolResult(result);
      }
    );
  }

  return server;
};

export const handlePublicMcpRequest = async (request: Request) => {
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
  });
  const server = createPublicMcpServer({ ip: readRequestIp(request) });
  await server.connect(transport);
  return transport.handleRequest(request);
};
