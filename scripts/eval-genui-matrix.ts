import type { CapabilityContext } from "../lib/capabilities/types";
import { memoryCapStore } from "../lib/connect/caps";
import { composeQuery } from "../lib/genui/compose";
import { queryMatrixFixtures } from "../tests/genui/evals/datasets/query-matrix";
import { gradeQueryMatrixFixture } from "../tests/genui/evals/graders/query-matrix";

const context = (): CapabilityContext => ({
  calendar: {
    freeBusy: async () => [],
    get: async () => null,
    insert: async () => ({ id: "evt-1" }),
  },
  clock: new Date("2026-10-19T15:00:00.000Z"),
  correlationId: "eval-matrix",
  ip: "127.0.0.1",
  mailer: async () => ({}),
  rateLimitEnforced: false,
  store: memoryCapStore(),
});

const run = async () => {
  const live = process.env.GENUI_EVAL_LIVE === "1";
  let pass = 0;
  let fail = 0;
  let skip = 0;
  const failures: { id: string; reason?: string }[] = [];

  for (const fixture of queryMatrixFixtures) {
    if (fixture.evaluationMode === "manual") {
      skip += 1;
      continue;
    }
    if (fixture.evaluationMode === "live" && !live) {
      skip += 1;
      continue;
    }

    let envelope = null;
    let composeError: string | null = null;
    try {
      const result = await composeQuery({
        context: context(),
        input: {
          clientRequestId: fixture.id,
          query: fixture.query,
          version: 1,
        },
      });
      const complete = result.events.find((event) => event.type === "complete");
      envelope = complete?.type === "complete" ? complete.envelope : null;
    } catch (error) {
      composeError = error instanceof Error ? error.message : String(error);
    }

    const { grade, reason } = gradeQueryMatrixFixture({
      envelope,
      error: composeError,
      fixture,
    });
    if (grade === "PASS") pass += 1;
    else {
      fail += 1;
      failures.push({ id: fixture.id, reason });
    }
  }

  const report = {
    failures,
    fail,
    fixtures: queryMatrixFixtures.length,
    live,
    pass,
    skip,
  };
  console.log(JSON.stringify(report, null, 2));
  if (fail > 0) process.exit(1);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
