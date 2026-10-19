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

export const messageHasNoteFormPayload = (message: ThreadMessage) =>
  message.role === "user" &&
  message.parts.some(
    (part) => part.type === "text" && parseNoteFormPayload(part.text ?? "")
  );

export const messageHasBookFormPayload = (message: ThreadMessage) =>
  message.role === "user" &&
  message.parts.some(
    (part) => part.type === "text" && parseBookFormPayload(part.text ?? "")
  );

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

export const bookPartAfterMessage = (
  messages: readonly ThreadMessage[],
  messageId: string
) => {
  const index = messages.findIndex((message) => message.id === messageId);
  if (index === -1) return null;
  let found: ThreadMessage["parts"][number] | null = null;
  for (let i = index; i < messages.length; i++) {
    for (const part of messages[i].parts) {
      if (part.type === "dynamic-tool" && part.toolName === "book")
        found = part;
    }
  }
  return found;
};

export const sendPartAfterMessage = (
  messages: readonly ThreadMessage[],
  messageId: string
) => {
  const index = messages.findIndex((message) => message.id === messageId);
  if (index === -1) return null;
  let found: ThreadMessage["parts"][number] | null = null;
  for (let i = index; i < messages.length; i++) {
    for (const part of messages[i].parts) {
      if (part.type === "dynamic-tool" && part.toolName === "send")
        found = part;
    }
  }
  return found;
};

const noteSendResult = (output: unknown) => {
  if (!output || typeof output !== "object") return null;
  const record = output as {
    message?: unknown;
    output?: unknown;
    sent?: unknown;
    value?: unknown;
  };
  if (typeof record.sent === "boolean" || typeof record.message === "string") {
    const message = typeof record.message === "string" ? record.message : "";
    return {
      message,
      sent: record.sent === true || /^sent\b/i.test(message),
    };
  }
  if ("value" in record) return noteSendResult(record.value);
  if ("output" in record) return noteSendResult(record.output);
  return null;
};

export const threadHasNoteFormPayload = (messages: readonly ThreadMessage[]) =>
  messages.some((message) => messageHasNoteFormPayload(message));

export const assistantFollowsFormNote = ({
  messageId,
  messages,
}: {
  messageId: string;
  messages: readonly ThreadMessage[];
}) => {
  const index = messages.findIndex((message) => message.id === messageId);
  if (index <= 0) return false;
  const message = messages[index];
  if (message.role !== "assistant") return false;
  return messageHasNoteFormPayload(messages[index - 1]);
};

export const assistantFollowsFormBook = ({
  messageId,
  messages,
}: {
  messageId: string;
  messages: readonly ThreadMessage[];
}) => {
  const index = messages.findIndex((message) => message.id === messageId);
  if (index <= 0) return false;
  const message = messages[index];
  if (message.role !== "assistant") return false;
  return messageHasBookFormPayload(messages[index - 1]);
};

export const assistantFollowsConnectForm = ({
  messageId,
  messages,
}: {
  messageId: string;
  messages: readonly ThreadMessage[];
}) =>
  assistantFollowsFormNote({ messageId, messages }) ||
  assistantFollowsFormBook({ messageId, messages });

const bookResult = (output: unknown) => {
  if (!output || typeof output !== "object") return null;
  const record = output as {
    inserted?: unknown;
    message?: unknown;
    ok?: unknown;
    output?: unknown;
    value?: unknown;
  };
  if (typeof record.ok === "boolean" || typeof record.message === "string") {
    const message = typeof record.message === "string" ? record.message : "";
    const inserted = record.inserted === true || /^booked\b/i.test(message);
    return { inserted, message, ok: record.ok === true };
  }
  if ("value" in record) return bookResult(record.value);
  if ("output" in record) return bookResult(record.output);
  return null;
};

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
