import {
  McpServer,
  WebStandardStreamableHTTPServerTransport,
} from "@modelcontextprotocol/server";
import { z } from "zod";

import { cvDownloadPayload } from "../connect/cv-download";
import { CV_APP_RESOURCE_URI, cvAppWidgetHtml } from "./cv-app-widget-html";

const toolMeta = {
  ui: { resourceUri: CV_APP_RESOURCE_URI },
  "openai/outputTemplate": CV_APP_RESOURCE_URI,
  "openai/toolInvocation/invoking": "Preparing CV download…",
  "openai/toolInvocation/invoked": "CV ready.",
};

export const createCvMcpServer = () => {
  const server = new McpServer(
    { name: "gaboesquivel-cv", version: "1.0.0" },
    {
      instructions:
        "Call cv to get Gabo Esquivel's CV as a PDF download card. Optional focus: full (default), ai, web3, or fullstack.",
    }
  );

  server.registerResource(
    "cv-card",
    CV_APP_RESOURCE_URI,
    {
      _meta: {
        ui: { prefersBorder: true },
      },
    },
    async () => ({
      contents: [
        {
          mimeType: "text/html;profile=mcp-app",
          text: cvAppWidgetHtml(),
          uri: CV_APP_RESOURCE_URI,
          _meta: {
            ui: {
              csp: {
                connectDomains: ["https://gaboesquivel.com"],
                resourceDomains: ["https://gaboesquivel.com"],
              },
              domain: "https://gaboesquivel.com",
              prefersBorder: true,
            },
          },
        },
      ],
    })
  );

  server.registerTool(
    "cv",
    {
      _meta: toolMeta,
      description:
        "Return Gabo Esquivel's CV PDF and HTML page links. Optional focus: full (default), ai, web3, or fullstack.",
      inputSchema: {
        focus: z
          .enum(["full", "ai", "web3", "fullstack"])
          .optional()
          .describe("CV variant; default is full."),
      },
      outputSchema: {
        filename: z.string(),
        pageUrl: z.string(),
        pdfUrl: z.string(),
        title: z.string(),
        variant: z.enum(["full", "ai", "web3", "fullstack"]),
      },
      title: "Download CV",
    },
    async ({ focus }) => {
      const payload = cvDownloadPayload({ focus });
      return {
        content: [
          {
            text: `${payload.title}: ${payload.pdfUrl}`,
            type: "text" as const,
          },
        ],
        structuredContent: { ...payload },
      };
    }
  );

  return server;
};

export const handleCvMcpRequest = async (request: Request) => {
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
  });
  const server = createCvMcpServer();
  await server.connect(transport);
  return transport.handleRequest(request);
};
