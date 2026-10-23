import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import { createPublicMcpServer } from "./public-server";

export const connectPublicMcpInMemory = async () => {
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  const server = createPublicMcpServer({ ip: "127.0.0.1" });
  await server.connect(serverTransport);
  const client = new Client({ name: "genui-test-client", version: "1.0.0" });
  await client.connect(clientTransport);
  return { client, server };
};
