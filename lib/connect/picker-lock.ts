import { parseBookFormPayload, parseBookTimeZone } from "./compose";
import { formatSlotSelectionLine } from "./slot-display";

interface ThreadMessage {
  id: string;
  parts: readonly {
    text?: string;
    toolCallId?: string;
    toolName?: string;
    type: string;
  }[];
  role: string;
}

export const listSlotsToolCallBeforeBookForm = ({
  bookUserMessageId,
  messages,
}: {
  bookUserMessageId: string;
  messages: readonly ThreadMessage[];
}) => {
  const index = messages.findIndex(
    (message) => message.id === bookUserMessageId
  );
  if (index <= 0) return null;
  for (let i = index - 1; i >= 0; i--) {
    for (const part of messages[i].parts) {
      if (
        part.type === "dynamic-tool" &&
        part.toolName === "list_slots" &&
        part.toolCallId
      ) {
        return part.toolCallId;
      }
    }
  }
  return null;
};

export const lockedPickerSummaries = (
  messages: readonly ThreadMessage[]
): Record<string, string> => {
  const locks: Record<string, string> = {};
  for (const message of messages) {
    if (message.role !== "user") continue;
    let payload = null as ReturnType<typeof parseBookFormPayload>;
    let timeZone = "UTC";
    for (const part of message.parts) {
      if (part.type !== "text") continue;
      const text = part.text ?? "";
      payload = parseBookFormPayload(text);
      if (payload) {
        timeZone = parseBookTimeZone(text);
        break;
      }
    }
    if (!payload) continue;
    const toolCallId = listSlotsToolCallBeforeBookForm({
      bookUserMessageId: message.id,
      messages,
    });
    if (!toolCallId) continue;
    locks[toolCallId] = formatSlotSelectionLine({
      duration: payload.duration,
      start: payload.start,
      timeZone,
    });
  }
  return locks;
};
