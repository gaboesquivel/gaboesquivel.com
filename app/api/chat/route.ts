import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import type { UIMessage } from "ai";
import { chatInstructions } from "lib/ai/chat-instructions";
import {
  chatUnavailableResolution,
  resolveChatModel,
} from "lib/ai/resolve-chat-model";
import { capabilityContextFromRequest } from "lib/capabilities/server-context";
import { admitChat } from "lib/connect/caps";
import { capsEnforced, readRequestIp, requestHost } from "lib/connect/ip";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Last 20 messages keep the context, and the cost per turn, bounded. */
const MAX_MESSAGES = 20;
const MAX_TEXT = 2000;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    messages?: UIMessage[];
  } | null;
  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { message: "Messages are required." },
      { status: 400 }
    );
  }
  const tooLong = messages.some((message) =>
    message.parts?.some(
      (part) => part.type === "text" && part.text.length > MAX_TEXT
    )
  );
  if (tooLong) {
    return NextResponse.json(
      { message: "That message is too long." },
      { status: 400 }
    );
  }

  const model = resolveChatModel();
  if (!model) {
    return NextResponse.json(
      { message: chatUnavailableResolution() },
      { status: 503 }
    );
  }

  const ip = readRequestIp(request);
  const context = capabilityContextFromRequest({
    correlationId: nanoid(),
    ip,
  });
  const admitted = await admitChat({
    enforce: capsEnforced({ host: requestHost(request) }),
    ip,
    now: context.clock,
    store: context.store,
  });
  if (!admitted.ok) {
    return NextResponse.json({ message: admitted.message }, { status: 429 });
  }

  const result = streamText({
    abortSignal: request.signal,
    instructions: chatInstructions,
    messages: await convertToModelMessages(messages.slice(-MAX_MESSAGES)),
    model,
    tools: {
      showBookingForm: {
        description:
          "Show the booking form so the visitor can pick a time for a 15 or 30 minute call. Use whenever they want to book, schedule, or talk live.",
        execute: async () => "The booking form is now shown to the visitor.",
        inputSchema: z.object({}),
      },
      showMessageForm: {
        description:
          "Show the message form so the visitor can send Gabo an email note. Use whenever they want to contact, hire, email, or leave a message.",
        execute: async () => "The message form is now shown to the visitor.",
        inputSchema: z.object({}),
      },
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
