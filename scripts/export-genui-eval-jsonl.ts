import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { curatedEvalCases } from "../tests/genui/evals/datasets/curated-cases";

const outDir = join(import.meta.dir, "../tests/genui/evals/datasets");

const toJsonl = (cases: typeof curatedEvalCases) =>
  cases.map((line) => JSON.stringify(line)).join("\n");

writeFileSync(join(outDir, "routing.jsonl"), toJsonl(curatedEvalCases));
writeFileSync(
  join(outDir, "tier0.jsonl"),
  toJsonl(curatedEvalCases.filter((case_) => case_.expected.tier === 0))
);

console.log(`Wrote ${curatedEvalCases.length} routing cases`);
