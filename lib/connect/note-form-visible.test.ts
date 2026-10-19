import { describe, expect, test } from "bun:test";

import {
  fixedNoteSpec,
  noteFormMessage,
  noteFormVisible,
  parseNoteFormPayload,
} from "./compose";
import { NOTE_FORM_LEAD } from "./copy";
import { noteOpener } from "./intent";
import { noteEmailHtml, noteMessageSegments } from "./note-present";
import {
  messageHasNoteFormPayload,
  noteReceiptStatus,
  sendPartAfterMessage,
} from "./note-receipt";

describe("note form", () => {
  test("the fixed note spec keeps field values out of props", () => {
    const spec = fixedNoteSpec({
      description: "Discuss the lending integration.",
      email: "ada@example.com",
      name: "Ada",
    });
    const props = JSON.stringify(
      Object.values(spec.elements).map((element) => element.props)
    );
    expect(props).not.toContain("Ada");
    expect(props).not.toContain("ada@example.com");
    expect(props).not.toContain("Discuss the lending");
    expect(JSON.stringify(spec.state)).toContain("Ada");
    expect(JSON.stringify(spec.state)).toContain("ada@example.com");
    expect(props).toContain(NOTE_FORM_LEAD);
    expect(spec.elements.stack?.children).toEqual([
      "lead",
      "name",
      "email",
      "topic",
      "submit",
    ]);
  });

  test("a send-email opener stays on the page", () => {
    expect(noteOpener("[site:note America/Denver]\nSend email")).toBe(true);
    expect(noteOpener("Pass it along")).toBe(true);
    expect(noteOpener("Email me about the lending integration")).toBe(false);
  });

  test("parseNoteFormPayload round-trips the form message", () => {
    const message = noteFormMessage({
      description: "Discuss the lending integration.\nSecond line.",
      email: "ada@example.com",
      name: "Ada",
      timeZone: "America/Denver",
    });
    expect(parseNoteFormPayload(message)).toEqual({
      description: "Discuss the lending integration.\nSecond line.",
      email: "ada@example.com",
      name: "Ada",
    });
    expect(parseNoteFormPayload("Send email")).toBeNull();
  });

  test("a note message keeps paragraphs and links", () => {
    expect(
      noteMessageSegments({
        text: "See [the post](https://gaboesquivel.com/blog/agents) and https://example.com/docs.",
      })
    ).toEqual([
      { text: "See " },
      { href: "https://gaboesquivel.com/blog/agents", text: "the post" },
      { text: " and " },
      { href: "https://example.com/docs", text: "https://example.com/docs" },
      { text: "." },
    ]);
    expect(
      noteEmailHtml({
        description: "Read https://gaboesquivel.com/cal",
        email: "ada@example.com",
        name: "Ada",
      })
    ).toContain("<strong>Message:</strong>");
    expect(
      noteEmailHtml({
        description: "Read https://gaboesquivel.com/cal",
        email: "ada@example.com",
        name: "Ada",
      })
    ).toContain('href="https://gaboesquivel.com/cal"');
  });

  test("note receipt status follows the send tool", () => {
    expect(
      noteReceiptStatus({ output: { sent: true }, state: "output-available" })
    ).toEqual({ error: false, text: "Sent." });
    expect(noteReceiptStatus({ state: "input-streaming" })).toEqual({
      error: false,
      text: "Sending the note.",
    });
    expect(
      noteReceiptStatus({
        fallback: "30 messages today. The limit resets tomorrow.",
        settled: true,
        state: "pending",
      })
    ).toEqual({
      error: true,
      text: "30 messages today. The limit resets tomorrow.",
    });
    expect(
      noteReceiptStatus({
        output: { value: { message: "Sent the note.", sent: true } },
        state: "output-available",
      })
    ).toEqual({ error: false, text: "Sent." });
    expect(
      noteReceiptStatus({
        output: { message: "5 notes today. Nothing was sent." },
        state: "output-available",
      })
    ).toEqual({ error: true, text: "5 notes today. Nothing was sent." });
  });

  test("sendPartAfterMessage finds the send tool after the form note", () => {
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
    expect(messageHasNoteFormPayload(user)).toBe(true);
    const messages = [
      user,
      {
        id: "assistant-1",
        parts: [
          {
            output: { sent: true },
            state: "output-available",
            toolName: "send",
            type: "dynamic-tool",
          },
        ],
        role: "assistant",
      },
    ];
    const sendPart = sendPartAfterMessage(messages, "user-1");
    expect(sendPart?.state).toBe("output-available");
  });

  test("noteFormVisible shows on note turns without send approval", () => {
    expect(noteFormVisible({ hasSendApproval: false, mode: "note" })).toBe(
      true
    );
    expect(noteFormVisible({ hasSendApproval: true, mode: "note" })).toBe(
      false
    );
    expect(
      noteFormVisible({
        formDisabled: true,
        hasSendApproval: false,
        mode: "note",
      })
    ).toBe(false);
    expect(noteFormVisible({ hasSendApproval: false, mode: "book" })).toBe(
      false
    );
  });
});
