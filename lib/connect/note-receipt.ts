import type { NoteFormState } from "./compose";
import { parseNoteFormPayload } from "./compose";

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
