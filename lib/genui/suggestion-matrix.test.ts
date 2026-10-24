import { describe, expect, test } from "bun:test";

import type { CapabilityContext } from "../capabilities/types";
import type { CalendarClient } from "../connect/calendar";
import { memoryCapStore } from "../connect/caps";
import { composeQuery } from "./compose";
import { compileCompositionEnvelope } from "./contract/compiler";
import {
  composeCuratedDocument,
  resolveCuratedQueryKey,
} from "./curated-responses";
import { curatedGenuiQuerySuggestions } from "./query-suggestions";

const calendarStub: CalendarClient = {
  freeBusy: async () => [],
  get: async () => null,
  insert: async () => ({ id: "evt-1" }),
};

const context = (): CapabilityContext => ({
  calendar: calendarStub,
  clock: new Date("2026-10-19T15:00:00.000Z"),
  correlationId: "matrix-test",
  ip: "127.0.0.1",
  mailer: async () => ({}),
  rateLimitEnforced: false,
  store: memoryCapStore(),
});

const assertValidEnvelope = (envelope: {
  libraryVersion: number;
  openuiText: string;
  records: Parameters<
    typeof compileCompositionEnvelope
  >[0]["envelope"]["records"];
}) => {
  const compiled = compileCompositionEnvelope({ envelope });
  expect(compiled.ok).toBe(true);
};

describe("default suggestion matrix", () => {
  for (const { label, query } of curatedGenuiQuerySuggestions) {
    test(`label and query agree: ${query}`, async () => {
      expect(resolveCuratedQueryKey(label)).toBe(resolveCuratedQueryKey(query));
      const labelDoc = composeCuratedDocument({
        query: label,
        requestId: "r",
      });
      const queryDoc = composeCuratedDocument({
        query,
        requestId: "r",
      });
      expect(labelDoc?.openuiText).toBe(queryDoc?.openuiText);
      if (labelDoc) assertValidEnvelope(labelDoc);

      const composed = await composeQuery({
        context: context(),
        input: { clientRequestId: query, query, version: 1 },
      });
      expect(composed.modelCalls).toBe(0);
      expect(composed.events.at(-1)?.type).toBe("complete");
    });
  }
});

describe("compound suggestion matrix", () => {
  test("AI projects and CV", async () => {
    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: "c1",
        query: "Show your AI projects and let me download your CV.",
        version: 1,
      },
    });
    const complete = result.events.find((event) => event.type === "complete");
    expect(complete?.type).toBe("complete");
    if (complete?.type === "complete") {
      expect(complete.envelope.openuiText).toContain("ExperienceStack");
      expect(complete.envelope.openuiText).toContain("CVExperience");
      expect(complete.envelope.openuiText).toContain("ProjectExperience");
      assertValidEnvelope(complete.envelope);
    }
  });
});
