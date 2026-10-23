import type { ComposeSpanEvent } from "./telemetry";

/** Optional Langfuse export; requires LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY. */
export const exportSpan = async (event: ComposeSpanEvent) => {
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY?.trim();
  const secretKey = process.env.LANGFUSE_SECRET_KEY?.trim();
  const baseUrl =
    process.env.LANGFUSE_BASE_URL?.trim() ?? "https://cloud.langfuse.com";
  if (!publicKey || !secretKey) return;

  await fetch(`${baseUrl}/api/public/ingestion`, {
    body: JSON.stringify({
      batch: [
        {
          body: {
            metadata: event.attributes,
            name: event.name,
            traceId: event.correlationId,
          },
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          type: "trace-create",
        },
      ],
    }),
    headers: {
      Authorization: `Bearer ${publicKey}:${secretKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  }).catch(() => {});
};
