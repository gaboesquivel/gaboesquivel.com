import { rankAgentSections } from "lib/search/agent-sections";

import { paginate } from "./pagination";
import { readResult } from "./result";
import { searchSiteInput } from "./schemas";
import type { CapabilityContext } from "./types";

export const searchSite = ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = searchSiteInput.safeParse(input);
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid search query.",
      operation: "search_site",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const { cursor, limit, query } = parsed.data;
  const records = rankAgentSections({ query }).map(
    ({ excerpt, id, kind, title, url }) => ({ excerpt, id, kind, title, url })
  );
  const page = paginate({ cursor, items: records, limit });
  if ("error" in page) {
    return readResult({
      data: null,
      message: page.error ?? "Invalid cursor.",
      operation: "search_site",
      requestId: context.correlationId,
      status: "error",
    });
  }
  return readResult({
    data: { nextCursor: page.nextCursor, results: page.items, query },
    message: page.items.length ? "Search results ready." : "No matches found.",
    operation: "search_site",
    requestId: context.correlationId,
    status: page.items.length ? "ok" : "empty",
  });
};
