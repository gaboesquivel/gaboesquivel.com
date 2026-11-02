import {
  McpServer,
  WebStandardStreamableHTTPServerTransport,
} from "@modelcontextprotocol/server";

import { capabilityOutputSchema } from "../capabilities/output-schemas";
import type { CapabilityName } from "../capabilities/output-schemas";
import { capabilityRegistry, runCapability } from "../capabilities/registry";
import { capabilityContextFromRequest } from "../capabilities/server-context";
import { readRequestIp } from "../connect/ip";
import { PUBLIC_MCP_APP_RESOURCE_URI } from "./constants";
import { mcpToolMetadata, toolResultText } from "./tool-metadata";

const APP_RESOURCE_URI = PUBLIC_MCP_APP_RESOURCE_URI;

const FAILED = new Set(["error", "failed"]);

export const toolResult = (name: string, result: unknown) => {
  const payload = result as Record<string, unknown> & {
    message?: string;
    status?: string;
  };
  return {
    content: [{ text: toolResultText(name, payload), type: "text" as const }],
    ...(FAILED.has(payload.status ?? "") ? { isError: true } : {}),
    structuredContent: payload,
  };
};

const humanError = (error: unknown) => {
  const raw = error instanceof Error ? error.message : String(error);
  return raw.startsWith("unknown-capability:")
    ? `Unknown tool ${raw.slice("unknown-capability:".length)}.`
    : raw || "The tool failed. Try again.";
};

export const createPublicMcpServer = ({ ip }: { ip: string }) => {
  const server = new McpServer(
    { name: "gaboesquivel", version: "2.0.0" },
    {
      instructions:
        "Public portfolio tools for profile, projects, writing, search, CV, contact, availability, notes, and bookings. Each result's text is a short summary followed by the full JSON, which is also in structuredContent.",
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
    const name = entry.name as CapabilityName;
    const meta = mcpToolMetadata[name];
    server.registerTool(
      entry.name,
      {
        annotations: meta.annotations,
        description: entry.description,
        inputSchema: entry.inputSchema,
        outputSchema: capabilityOutputSchema({ kind: entry.kind, name }),
        title: meta.title,
      },
      async (input) => {
        const correlationId = crypto.randomUUID();
        try {
          const result = await runCapability({
            context: capabilityContextFromRequest({ correlationId, ip }),
            input,
            name: entry.name,
          });
          return toolResult(entry.name, result);
        } catch (error) {
          return {
            content: [{ text: humanError(error), type: "text" as const }],
            isError: true,
          };
        }
      }
    );
  }

  return server;
};

const jsonError = (status: number, message: string) =>
  Response.json(
    { error: { code: -32_000, message }, id: null, jsonrpc: "2.0" },
    { status }
  );

/** The SDK answers 400/406/415 with JSON; never let an error status leave with an empty body. */
const ensureJsonErrorBody = async (response: Response) => {
  if (response.status < 400) return response;
  const text = await response.clone().text();
  if (text.trim()) return response;
  return jsonError(
    response.status,
    response.statusText || `Request failed with status ${response.status}.`
  );
};

export const handlePublicMcpRequest = async (request: Request) => {
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
  });
  const server = createPublicMcpServer({ ip: readRequestIp(request) });
  await server.connect(transport);
  return ensureJsonErrorBody(await transport.handleRequest(request));
};
