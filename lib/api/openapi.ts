import { siteOrigin } from "lib/site-path";

const BASE_URL = siteOrigin;

const problemSchema = {
  properties: {
    code: {
      description: "Stable machine-readable error code.",
      enum: ["not_found", "method_not_allowed", "invalid_path"],
      type: "string",
    },
    detail: {
      description: "Human-readable explanation of the error.",
      type: "string",
    },
    message: {
      description:
        "Same as detail; included for agent clients that expect message.",
      type: "string",
    },
    resolution: {
      description: "Hint for how to fix or continue.",
      type: "string",
    },
    status: { description: "HTTP status code.", type: "integer" },
    title: { description: "Short error title.", type: "string" },
    type: { description: "Problem type URI.", format: "uri", type: "string" },
  },
  required: [
    "type",
    "title",
    "status",
    "detail",
    "code",
    "message",
    "resolution",
  ],
  type: "object",
};

export const openApiDocument = () => ({
  components: {
    schemas: {
      PageContent: {
        properties: {
          markdown: {
            description: "Markdown export of the page body.",
            type: "string",
          },
          path: {
            description:
              "Canonical site path, including query when applicable.",
            example: "/about",
            type: "string",
          },
        },
        required: ["path", "markdown"],
        type: "object",
      },
      PageList: {
        properties: {
          paths: {
            description: "Published HTML paths with Markdown exports.",
            items: { type: "string" },
            type: "array",
          },
        },
        required: ["paths"],
        type: "object",
      },
      Problem: problemSchema,
      Profile: {
        properties: {
          email: { format: "email", type: "string" },
          links: {
            properties: {
              about: { format: "uri", type: "string" },
              ask: { format: "uri", type: "string" },
              docs: { format: "uri", type: "string" },
              llms: { format: "uri", type: "string" },
              mcp: { format: "uri", type: "string" },
              openapi: { format: "uri", type: "string" },
            },
            required: ["about", "ask", "docs", "llms", "mcp", "openapi"],
            type: "object",
          },
          location: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          tagline: { type: "string" },
          timeZone: { type: "string" },
          timeZoneLabel: { type: "string" },
          url: { format: "uri", type: "string" },
        },
        required: [
          "name",
          "role",
          "tagline",
          "email",
          "location",
          "timeZone",
          "timeZoneLabel",
          "url",
          "links",
        ],
        type: "object",
      },
    },
  },
  info: {
    description:
      "Read-only JSON API for published site facts and Markdown page exports. Task execution for ask, note, and book flows uses the public MCP capability tools at /mcp (book_call, contact_gabo, get_cv, list_availability, and others), documented at /docs.",
    title: "Gabo Esquivel Site API",
    version: "1.0.0",
  },
  openapi: "3.1.0",
  paths: {
    "/api/v1/pages": {
      get: {
        description:
          "List every published site path that has a Markdown export. Use getPage to retrieve the body.",
        operationId: "listPages",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PageList" },
              },
            },
            description: "Published paths.",
          },
          "405": {
            content: {
              "application/problem+json": {
                schema: { $ref: "#/components/schemas/Problem" },
              },
            },
            description: "Method not allowed.",
          },
        },
        summary: "List published page paths",
      },
    },
    "/api/v1/pages/{pagePath}": {
      get: {
        description:
          "Return the Markdown export for one published path. Use the special segment _root for the home page (/). For paths with query strings, pass the query on this request (for example /api/v1/pages/cv?focus=ai).",
        operationId: "getPage",
        parameters: [
          {
            description:
              "Path segments after /api/v1/pages/, without a leading slash. Use _root for /.",
            in: "path",
            name: "pagePath",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PageContent" },
              },
            },
            description: "Page Markdown.",
          },
          "404": {
            content: {
              "application/problem+json": {
                schema: { $ref: "#/components/schemas/Problem" },
              },
            },
            description: "Unknown or unpublished path.",
          },
          "405": {
            content: {
              "application/problem+json": {
                schema: { $ref: "#/components/schemas/Problem" },
              },
            },
            description: "Method not allowed.",
          },
        },
        summary: "Get one page as Markdown JSON",
      },
    },
    "/api/v1/profile": {
      get: {
        description:
          "Return public identity facts for Gabo Esquivel: role, location, contact email, and links to ask, MCP docs, and the OpenAPI description.",
        operationId: "getProfile",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Profile" },
              },
            },
            description: "Public profile.",
          },
          "405": {
            content: {
              "application/problem+json": {
                schema: { $ref: "#/components/schemas/Problem" },
              },
            },
            description: "Method not allowed.",
          },
        },
        summary: "Public site profile",
      },
    },
  },
  servers: [{ url: BASE_URL }],
});
