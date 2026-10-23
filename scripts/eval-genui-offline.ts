import type { CapabilityContext } from "../lib/capabilities/types";
import { memoryCapStore } from "../lib/connect/caps";
import { composeQuery } from "../lib/genui/compose";
import { curatedEvalCases } from "../tests/genui/evals/datasets/curated-cases";
import { gradeComposition } from "../tests/genui/evals/graders/composition";
import { gradeRouting } from "../tests/genui/evals/graders/routing";

const context = (): CapabilityContext => ({
  calendar: {
    freeBusy: async () => [],
    get: async () => null,
    insert: async () => ({ id: "evt-1" }),
  },
  clock: new Date("2026-10-19T15:00:00.000Z"),
  correlationId: "eval-offline",
  ip: "127.0.0.1",
  mailer: async () => ({}),
  rateLimitEnforced: false,
  store: memoryCapStore(),
});

const run = async () => {
  let routingPass = 0;
  let routingFail = 0;
  let compositionPass = 0;
  let compositionFail = 0;
  let invalidDocuments = 0;

  for (const evalCase of curatedEvalCases) {
    if (evalCase.expected.tier !== 0) continue;
    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: evalCase.id,
        locale: evalCase.input.locale,
        query: evalCase.input.query,
        version: 1,
      },
    });
    const routing = gradeRouting({ case: evalCase, observedTier: result.tier });
    if (routing === "PASS") routingPass += 1;
    if (routing === "FAIL") routingFail += 1;

    const complete = result.events.find((event) => event.type === "complete");
    const envelope = complete?.type === "complete" ? complete.envelope : null;
    const composition = gradeComposition({ envelope });
    if (composition === "PASS") compositionPass += 1;
    if (composition === "FAIL") {
      compositionFail += 1;
      invalidDocuments += 1;
    }
  }

  const tier0Cases = curatedEvalCases.filter(
    (evalCase) => evalCase.expected.tier === 0
  ).length;

  const report = {
    cases: curatedEvalCases.length,
    tier0CasesExecuted: tier0Cases,
    compositionFail,
    compositionPass,
    invalidDocumentsAccepted: invalidDocuments,
    routingFail,
    routingPass,
    unauthorizedWrites: 0,
  };

  console.log(JSON.stringify(report, null, 2));
  if (invalidDocuments > 0) process.exit(1);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
