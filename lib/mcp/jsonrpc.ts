import { mcpStreamableHeaders } from "./constants";

export const mcpJsonRpcRequest = async ({
  body,
  handler,
  url = "https://gaboesquivel.test/mcp",
}: {
  body: Record<string, unknown>;
  handler: (request: Request) => Promise<Response>;
  url?: string;
}) =>
  handler(
    new Request(url, {
      body: JSON.stringify(body),
      headers: mcpStreamableHeaders,
      method: "POST",
    })
  );

export const mcpJsonRpcResult = async <T>(response: Response) => {
  const payload = (await response.json()) as {
    error?: { code: number; message: string };
    result?: T;
  };
  return payload;
};
