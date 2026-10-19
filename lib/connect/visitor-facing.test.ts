import { describe, expect, test } from "bun:test";

import { noteFormMessage } from "./compose";
import { assistantFollowsFormNote } from "./note-receipt";
import {
  assistantTextLeaksInternals,
  visitorFacingAssistantText,
} from "./visitor-facing";

describe("visitorFacingAssistantText", () => {
  test("drops replies that leak implementation", () => {
    expect(
      assistantTextLeaksInternals(
        "Send without second confirm parseNoteFormPayload reads Name:"
      )
    ).toBe(true);
    expect(
      visitorFacingAssistantText(
        "I'm ready to send your note without waiting for browser approval."
      )
    ).toBe("");
  });

  test("drops a reply that tells the visitor to start over", () => {
    expect(
      visitorFacingAssistantText(
        "Start a fresh /ask session so the updated harness loads."
      )
    ).toBe("");
  });

  test("keeps ordinary answers", () => {
    expect(visitorFacingAssistantText("Sent.")).toBe("Sent.");
    expect(visitorFacingAssistantText("  Hello there.  ")).toBe("Hello there.");
  });

  test("assistantFollowsFormNote hides prose after a form submit", () => {
    const user = {
      id: "user-1",
      parts: [
        {
          text: noteFormMessage({
            description: "Discuss the lending integration.",
            email: "ada@example.com",
            name: "Ada",
            timeZone: "America/Denver",
          }),
          type: "text",
        },
      ],
      role: "user",
    };
    const assistant = {
      id: "assistant-1",
      parts: [{ text: "Sent.", type: "text" }],
      role: "assistant",
    };
    expect(
      assistantFollowsFormNote({
        messageId: "assistant-1",
        messages: [user, assistant],
      })
    ).toBe(true);
  });
});
