import { describe, expect, test } from "bun:test";

import type { CapabilityContext } from "lib/capabilities/types";
import { memoryCapStore } from "lib/connect/caps";
import { composeQuery } from "lib/genui/compose";

import { queryMatrixFixtures } from "../evals/datasets/query-matrix";
import { gradeQueryMatrixFixture } from "../evals/graders/query-matrix";
import { catalogHasOpyn } from "../fixtures/catalog-ground-truth";

const calendarStub = {
  freeBusy: async () => [],
  get: async () => null,
  insert: async () => ({ id: "evt-1" }),
};

const context = (): CapabilityContext => ({
  calendar: calendarStub,
  clock: new Date("2026-10-19T15:00:00.000Z"),
  correlationId: "query-matrix",
  ip: "127.0.0.1",
  mailer: async () => ({}),
  rateLimitEnforced: false,
  store: memoryCapStore(),
});

const envelopeFromCompose = async (query: string) => {
  try {
    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: "matrix",
        query,
        version: 1,
      },
    });
    const complete = result.events.find((event) => event.type === "complete");
    return {
      envelope: complete?.type === "complete" ? complete.envelope : null,
      error: null as string | null,
      modelCalls: result.modelCalls,
    };
  } catch (error) {
    return {
      envelope: null,
      error: error instanceof Error ? error.message : String(error),
      modelCalls: 0,
    };
  }
};

describe("query matrix catalog invariants", () => {
  test("Opyn exists before strict entity assertions", () => {
    expect(catalogHasOpyn).toBe(true);
  });
});

describe("query matrix deterministic layer", () => {
  const deterministic = queryMatrixFixtures.filter(
    (fixture) => fixture.evaluationMode === "deterministic"
  );

  for (const fixture of deterministic) {
    test(`${fixture.id} — ${fixture.query.slice(0, 48) || "(empty)"}`, async () => {
      const { envelope, error, modelCalls } = await envelopeFromCompose(
        fixture.query
      );
      if (!fixture.requiresLiveIntegration) {
        expect(modelCalls).toBe(0);
      }
      const { grade, reason } = gradeQueryMatrixFixture({
        envelope,
        error,
        fixture,
      });
      expect(grade, reason).toBe("PASS");
    });
  }
});
