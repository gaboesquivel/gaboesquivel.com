import { describe, expect, test } from "bun:test";

import type { CapabilityContext } from "../capabilities/types";
import type { CalendarClient } from "../connect/calendar";
import { memoryCapStore } from "../connect/caps";
import { composeQuery } from "./compose";

const calendarStub: CalendarClient = {
  freeBusy: async () => [],
  get: async () => null,
  insert: async () => ({ id: "evt-1" }),
};

const context = (): CapabilityContext => ({
  calendar: calendarStub,
  clock: new Date("2026-10-19T15:00:00.000Z"),
  correlationId: "compose-test",
  ip: "127.0.0.1",
  mailer: async () => ({}),
  rateLimitEnforced: false,
  store: memoryCapStore(),
});

describe("composeQuery", () => {
  test("career timeline completes with grounded records and no model calls", async () => {
    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: "career",
        query: "Show me your career timeline",
        version: 1,
      },
    });
    expect(result.events.at(-1)?.type).toBe("complete");
    expect(result.modelCalls).toBe(0);
    expect(result.jevCalls).toBe(0);
    expect(result.parseErrors).toBe(0);
    expect(result.metadata.experience).toBe("TimelineExperience");
    expect(result.metadata.composite).toBe("chapter-stack");
  });
  test("tier 0 cv uses zero model calls", async () => {
    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: "c1",
        query: "cv",
        version: 1,
      },
    });
    expect(result.tier).toBe(0);
    expect(result.modelCalls).toBe(0);
    expect(result.jevCalls).toBe(0);
    expect(result.events.at(-1)?.type).toBe("complete");
  });

  test("Show me your AI projects uses evidence stack without model calls", async () => {
    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: "c-ai",
        query: "Show me your AI projects",
        version: 1,
      },
    });
    expect(result.tier).toBe(0);
    expect(result.modelCalls).toBe(0);
    expect(result.jevCalls).toBe(0);
    const complete = result.events.find((event) => event.type === "complete");
    expect(complete?.type).toBe("complete");
    expect(result.metadata.experience).toBe("ExperienceStack");
    expect(result.metadata.taskIntent).toBe("browse-projects");
    if (complete?.type === "complete") {
      expect(complete.envelope.openuiText).toContain("ProjectExperience");
      expect(complete.envelope.openuiText).toContain("project-bento");
      expect(complete.envelope.openuiText).not.toContain(
        "CapabilityShowcaseExperience"
      );
    }
  });

  test("tier 0 explore my work uses work-gallery composite", async () => {
    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: "c2",
        query: "explore my work",
        version: 1,
      },
    });
    expect(result.tier).toBe(0);
    const complete = result.events.find((event) => event.type === "complete");
    expect(complete?.type).toBe("complete");
    if (complete?.type === "complete") {
      expect(complete.envelope.openuiText).toContain("work-gallery");
    }
  });
});
