import { McpReferenceView } from "components/mcp-apps/mcp-reference-view";
import { fixtureLabEnabled } from "lib/genui/fixtures/registry";
import { notFound } from "next/navigation";

export default function McpReferenceViewPage() {
  if (!fixtureLabEnabled()) notFound();
  return <McpReferenceView />;
}
