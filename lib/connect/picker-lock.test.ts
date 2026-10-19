import { describe, expect, test } from "bun:test";

import { bookFormMessage } from "./compose";
import {
  listSlotsToolCallBeforeBookForm,
  lockedPickerSummaries,
} from "./picker-lock";

describe("picker lock", () => {
  test("locks the list_slots tool that preceded a book form message", () => {
    const user = {
      id: "user-1",
      parts: [
        {
          text: bookFormMessage({
            description: "Discuss the lending integration.",
            duration: 30,
            email: "ada@example.com",
            name: "Ada",
            start: "2026-10-19T15:00:00.000Z",
            timeZone: "America/Denver",
          }),
          type: "text",
        },
      ],
      role: "user",
    };
    const assistant = {
      id: "assistant-1",
      parts: [
        {
          toolCallId: "slots-1",
          toolName: "list_slots",
          type: "dynamic-tool",
        },
      ],
      role: "assistant",
    };
    const messages = [assistant, user];
    expect(
      listSlotsToolCallBeforeBookForm({
        bookUserMessageId: "user-1",
        messages,
      })
    ).toBe("slots-1");
    const locks = lockedPickerSummaries(messages);
    expect(locks["slots-1"]).toContain("30 min");
    expect(locks["slots-1"]).toContain("Mon");
  });
});
