import { describe, expect, test } from "bun:test";

import {
  bookFormMessage,
  initialNoteFormState,
  noteFormLead,
  noteFormMessage,
  noteFormVisible,
  parseBookFormPayload,
  parseNoteFormPayload,
} from "./compose";
import { noteOpener } from "./intent";
import { noteEmailHtml, noteMessageSegments } from "./note-present";

describe("note form", () => {
  test("note form state carries visitor values separately from static lead copy", () => {
    const state = initialNoteFormState({
      description: "Discuss the lending integration.",
      email: "ada@example.com",
      name: "Ada",
    });
    const lead = noteFormLead();
    expect(lead).not.toContain("Ada");
    expect(JSON.stringify(state)).toContain("Ada");
    expect(JSON.stringify(state)).toContain("ada@example.com");
    expect(lead.toLowerCase()).toContain("discuss");
  });

  test("a send-email opener stays on the page", () => {
    expect(noteOpener("[site:note America/Denver]\nSend email")).toBe(true);
    expect(noteOpener("Pass it along")).toBe(true);
    expect(noteOpener("Email me about the lending integration")).toBe(false);
  });

  test("parseBookFormPayload round-trips the book form message", () => {
    const message = bookFormMessage({
      description: "Walk through the lending integration.",
      duration: 15,
      email: "ada@example.com",
      name: "Ada",
      start: "2026-10-19T15:00:00.000Z",
      timeZone: "America/Denver",
    });
    expect(parseBookFormPayload(message)).toEqual({
      description: "Walk through the lending integration.",
      duration: 15,
      email: "ada@example.com",
      name: "Ada",
      start: "2026-10-19T15:00:00.000Z",
    });
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
