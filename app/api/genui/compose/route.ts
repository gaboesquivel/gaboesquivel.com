import { capabilityContextFromRequest } from "lib/capabilities/server-context";
import { composeQuery } from "lib/genui/compose";
import { logComposeTelemetry } from "lib/genui/telemetry";
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
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "127.0.0.1";
  const context = capabilityContextFromRequest({ correlationId, ip });
  context.correlationId = body?.clientRequestId?.trim() || correlationId;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { events, modelCalls, tier } = await composeQuery({
          context,
          input: {
            clientRequestId: context.correlationId,
            locale: body?.locale,
            query,
            version: body?.version ?? 1,
          },
        });
        for (const event of events) {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        }
        logComposeTelemetry({
          correlationId: context.correlationId,
          modelCalls,
          parseErrors: 0,
          tier,
          timingMs: Date.now() - started,
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
