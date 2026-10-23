import { capabilityRegistry, runCapability } from "lib/capabilities/registry";
import { capabilityContextFromRequest } from "lib/capabilities/server-context";
import { readRequestIp } from "lib/connect/ip";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    input?: unknown;
    operation?: string;
  } | null;
  const operation = body?.operation?.trim();
  if (!operation || !capabilityRegistry[operation]) {
    return NextResponse.json(
      { message: "Unknown operation." },
      { status: 400 }
    );
  }
  const correlationId = nanoid();
  const ip = readRequestIp(request);
  try {
    const result = await runCapability({
      context: capabilityContextFromRequest({ correlationId, ip }),
      input: body?.input ?? {},
      name: operation,
    });
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Capability request failed.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
