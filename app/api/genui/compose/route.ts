import { capabilityContextFromRequest } from "lib/capabilities/server-context";
import { admitChat } from "lib/connect/caps";
import { capsEnforced, readRequestIp, requestHost } from "lib/connect/ip";
import { composeQuery } from "lib/genui/compose";
import { logComposeTelemetry } from "lib/genui/telemetry";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const OVERALL_DEADLINE_MS = 15_000;

export async function POST(request: Request) {
  const started = Date.now();
  const body = (await request.json().catch(() => null)) as {
    clientRequestId?: string;
    locale?: string;
    query?: string;
    version?: number;
  } | null;
  const query = body?.query?.trim() ?? "";
  if (!query) {
    return NextResponse.json(
      { message: "Query is required." },
      { status: 400 }
    );
  }
  const correlationId = nanoid();
  const ip = readRequestIp(request);
  const host = requestHost(request);
  const context = capabilityContextFromRequest({ correlationId, ip });
  context.correlationId = body?.clientRequestId?.trim() || correlationId;

  const admitted = await admitChat({
    enforce: capsEnforced({ host }),
    ip,
    now: context.clock,
    store: context.store,
  });
  if (!admitted.ok) {
    return NextResponse.json({ message: admitted.message }, { status: 429 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let tier: 0 | 1 | 2 = 0;
      let jevCalls = 0;
      let modelCalls = 0;
      let parseErrors = 0;
      try {
        const abortController = new AbortController();
        const onClientAbort = () => abortController.abort();
        request.signal.addEventListener("abort", onClientAbort);
        const deadline = setTimeout(
          () => abortController.abort(),
          OVERALL_DEADLINE_MS
        );
        const result = await composeQuery({
          context,
          input: {
            clientRequestId: context.correlationId,
            locale: body?.locale,
            query,
            version: body?.version ?? 1,
          },
          onEvent: (event) => {
            if (abortController.signal.aborted) return;
            controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
          },
          signal: abortController.signal,
        });
        clearTimeout(deadline);
        request.signal.removeEventListener("abort", onClientAbort);
        tier = result.tier;
        jevCalls = result.jevCalls;
        modelCalls = result.modelCalls;
        parseErrors = result.parseErrors;
        logComposeTelemetry({
          cancellation: abortController.signal.aborted ? "aborted" : undefined,
          composite: result.metadata.composite,
          correlationId: context.correlationId,
          domain: result.metadata.domain,
          experience: result.metadata.experience,
          fallbackReason: result.metadata.fallbackReason,
          jevCalls,
          mediaBackedProjectCount: result.metadata.mediaBackedProjectCount,
          modelCalls,
          parseErrors,
          projectCount: result.metadata.projectCount,
          taskIntent: result.metadata.taskIntent,
          tier,
          timingMs: Date.now() - started,
          validationOutcome: result.metadata.validationOutcome,
        });
      } catch {
        controller.enqueue(
          encoder.encode(
            `${JSON.stringify({
              message: "Composition failed.",
              requestId: context.correlationId,
              sequence: 0,
              type: "error",
            })}\n`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/x-ndjson",
    },
  });
}
