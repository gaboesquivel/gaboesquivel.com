import { capabilityContextFromRequest } from "lib/capabilities/server-context";
import { admitChat } from "lib/connect/caps";
import { capsEnforced, readRequestIp, requestHost } from "lib/connect/ip";
import { composeQuery } from "lib/genui/compose";
import { armComposeDeadline, timedOutEvent } from "lib/genui/compose-deadline";
import { logComposeTelemetry } from "lib/genui/telemetry";
import { searchCopy } from "lib/search/copy";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
      let closed = false;
      const write = (event: Record<string, unknown>) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };
      const close = () => {
        if (closed) return;
        closed = true;
        controller.close();
      };
      const abortController = new AbortController();
      const onClientAbort = () => abortController.abort();
      request.signal.addEventListener("abort", onClientAbort);
      // At the deadline the client gets an explicit timed-out error, not a
      // silent end of stream that reads as a generic failure.
      const disarm = armComposeDeadline({
        controller: abortController,
        onTimeout: () => {
          if (request.signal.aborted) return;
          write(timedOutEvent(context.correlationId));
          close();
        },
      });
      try {
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
            write(event);
          },
          signal: abortController.signal,
        });
        tier = result.tier;
        jevCalls = result.jevCalls;
        modelCalls = result.modelCalls;
        parseErrors = result.parseErrors;
        if (abortController.signal.aborted) {
          logComposeTelemetry({
            cancellation: "aborted",
            correlationId: context.correlationId,
            jevCalls,
            modelCalls,
            parseErrors,
            taskCount: result.metadata.taskCount,
            tier,
            timingMs: Date.now() - started,
          });
          return;
        }
        logComposeTelemetry({
          cancellation: undefined,
          catalogOperationTypes: result.metadata.catalogOperationTypes,
          composite: result.metadata.composite,
          correlationId: context.correlationId,
          displayedCount: result.metadata.displayedCount,
          domain: result.metadata.domain,
          experience: result.metadata.experience,
          jevCalls,
          matchedCount: result.metadata.matchedCount,
          mediaBackedProjectCount: result.metadata.mediaBackedProjectCount,
          modelCalls,
          parseErrors,
          planningPath: result.metadata.planningPath,
          projectCount: result.metadata.projectCount,
          recoveryReason: result.metadata.recoveryReason,
          taskCount: result.metadata.taskCount,
          taskIntent: result.metadata.taskIntent,
          taskStatuses: result.metadata.taskStatuses,
          tier,
          timingMs: Date.now() - started,
          validationOutcome: result.metadata.validationOutcome,
        });
      } catch (error) {
        if (
          request.signal.aborted ||
          abortController.signal.aborted ||
          (error instanceof Error && error.name === "AbortError")
        ) {
          return;
        }
        write({
          code: "failed",
          message: searchCopy.serverFailed,
          requestId: context.correlationId,
          sequence: 0,
          type: "error",
        });
      } finally {
        disarm();
        request.signal.removeEventListener("abort", onClientAbort);
        close();
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
