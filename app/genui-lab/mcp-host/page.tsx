import { McpHostLab } from "components/mcp-apps/mcp-host-lab";
import { fixtureLabEnabled } from "lib/genui/fixtures/registry";
import type { McpHostCapabilityProfile } from "lib/mcp/mcp-host-capabilities";
import { notFound } from "next/navigation";

export default async function McpHostLabPage({
  searchParams,
}: {
  searchParams?: Promise<{ capabilities?: string; mcp?: string }>;
}) {
  if (!fixtureLabEnabled()) notFound();
  const resolved = await searchParams;
  const capabilityProfile: McpHostCapabilityProfile =
    resolved?.capabilities === "read-only" ? "read-only" : "full";
  const mcpUrl = resolved?.mcp?.startsWith("/") ? resolved.mcp : "/mcp";

  return (
    <McpHostLab
      capabilityProfile={capabilityProfile}
      mcpUrl={mcpUrl}
      referenceViewPath="/genui-lab/mcp-reference-view"
    />
  );
}
