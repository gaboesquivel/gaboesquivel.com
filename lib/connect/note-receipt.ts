import type { NoteFormState } from "./compose";
import { parseBookFormPayload, parseNoteFormPayload } from "./compose";
import { ALREADY_BOOKED, BUSY_SLOT } from "./copy";

interface ThreadMessage {
  id: string;
  parts: readonly {
    output?: unknown;
    state?: string;
    text?: string;
    toolName?: string;
    type: string;
  }[];
  role: string;
}

export const bookFormPayloadFromMessage = (
  message: ThreadMessage
): (NoteFormState & { duration: 15 | 30; start: string }) | null => {
  for (const part of message.parts) {
    if (part.type !== "text") continue;
    const payload = parseBookFormPayload(part.text ?? "");
    if (payload) return payload;
  }
  return null;
};

export const noteFormPayloadFromMessage = (
  message: ThreadMessage
): NoteFormState | null => {
  for (const part of message.parts) {
    if (part.type !== "text") continue;
    const payload = parseNoteFormPayload(part.text ?? "");
    if (payload) return payload;
  }
  return null;
};

export const messageHasNoteFormPayload = (message: ThreadMessage) =>
  message.role === "user" && noteFormPayloadFromMessage(message) !== null;

export const messageHasBookFormPayload = (message: ThreadMessage) =>
  message.role === "user" && bookFormPayloadFromMessage(message) !== null;

const toolPartAfterMessage = (
  messages: readonly ThreadMessage[],
  messageId: string,
  toolName: "book" | "send"
) => {
  const index = messages.findIndex((message) => message.id === messageId);
  if (index === -1) return null;
  let found: ThreadMessage["parts"][number] | null = null;
  for (let i = index; i < messages.length; i++) {
    for (const part of messages[i].parts) {
      if (part.type === "dynamic-tool" && part.toolName === toolName)
        found = part;
    }
  }
  return found;
};

export const bookPartAfterMessage = (
  messages: readonly ThreadMessage[],
  messageId: string
) => toolPartAfterMessage(messages, messageId, "book");

export const sendPartAfterMessage = (
  messages: readonly ThreadMessage[],
  messageId: string
) => toolPartAfterMessage(messages, messageId, "send");

const resolveNestedToolOutput = <T>(
  output: unknown,
  match: (record: Record<string, unknown>) => T | null
): T | null => {
  if (!output || typeof output !== "object") return null;
  const record = output as Record<string, unknown>;
  const hit = match(record);
  if (hit) return hit;
  if ("value" in record) {
    const fromValue = resolveNestedToolOutput(record.value, match);
    if (fromValue) return fromValue;
  }
  if ("output" in record) {
    const fromOutput = resolveNestedToolOutput(record.output, match);
    if (fromOutput) return fromOutput;
  }
  return null;
};

const noteSendResult = (output: unknown) =>
  resolveNestedToolOutput(output, (record) => {
    if (
      typeof record.sent !== "boolean" &&
      typeof record.message !== "string"
    ) {
      return null;
    }
    const message = typeof record.message === "string" ? record.message : "";
    return {
      message,
      sent: record.sent === true || /^sent\b/i.test(message),
    };
  });

export const threadHasNoteFormPayload = (messages: readonly ThreadMessage[]) =>
  messages.some((message) => messageHasNoteFormPayload(message));

const assistantFollowsForm = ({
  hasFormPayload,
  messageId,
  messages,
}: {
  hasFormPayload: (message: ThreadMessage) => boolean;
  messageId: string;
  messages: readonly ThreadMessage[];
}) => {
  const index = messages.findIndex((message) => message.id === messageId);
  if (index <= 0) return false;
  const message = messages[index];
  if (message.role !== "assistant") return false;
  return hasFormPayload(messages[index - 1]);
};

export const assistantFollowsFormNote = ({
  messageId,
  messages,
}: {
  messageId: string;
  messages: readonly ThreadMessage[];
}) =>
  assistantFollowsForm({
    hasFormPayload: messageHasNoteFormPayload,
    messageId,
    messages,
  });

export const assistantFollowsFormBook = ({
  messageId,
  messages,
}: {
  messageId: string;
  messages: readonly ThreadMessage[];
}) =>
  assistantFollowsForm({
    hasFormPayload: messageHasBookFormPayload,
    messageId,
    messages,
  });

export const assistantFollowsConnectForm = ({
  messageId,
  messages,
}: {
  messageId: string;
  messages: readonly ThreadMessage[];
}) =>
  assistantFollowsFormNote({ messageId, messages }) ||
  assistantFollowsFormBook({ messageId, messages });

const bookResult = (output: unknown) =>
  resolveNestedToolOutput(output, (record) => {
    if (typeof record.ok !== "boolean" && typeof record.message !== "string") {
      return null;
    }
    const message = typeof record.message === "string" ? record.message : "";
    const inserted = record.inserted === true || /^booked\b/i.test(message);
    return { inserted, message, ok: record.ok === true };
  });

export const bookReceiptStatus = ({
  fallback = "",
  output,
  settled = false,
  state,
}: {
  fallback?: string;
  output?: unknown;
  settled?: boolean;
  state: string;
}) => {
  const result = bookResult(output);
  if (result?.inserted && result.ok)
    return { error: false, text: "Booked. See you then." };
  if (result?.message === ALREADY_BOOKED && result.ok)
    return { error: false, text: ALREADY_BOOKED };
  const finished =
    settled ||
    state === "output-available" ||
    state === "output-error" ||
    state === "output-denied";
  if (!finished) return { error: false, text: "Booking the call." };
  const message = result?.message || fallback || BUSY_SLOT;
  return { error: !result?.ok, text: message };
};

export const noteReceiptStatus = ({
  fallback = "",
  output,
  settled = false,
  state,
}: {
  fallback?: string;
  output?: unknown;
  settled?: boolean;
  state: string;
}) => {
  const result = noteSendResult(output);
  if (result?.sent) return { error: false, text: "Sent." };
  const finished =
    settled ||
    state === "output-available" ||
    state === "output-error" ||
    state === "output-denied";
  if (!finished) return { error: false, text: "Sending the note." };
  return {
    error: true,
    text:
      result?.message || fallback || "The note did not send. Nothing was sent.",
  };
};
