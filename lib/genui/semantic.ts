import { generateText } from "ai";

import { SONNET_GATEWAY_MODEL } from "../connect/sonnet-model";
import { answerDocument } from "./builders";
import { projectCompositionRecipes } from "./composition-plan";
import { buildEvidencePacket } from "./context";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { validateCompositionEnvelope } from "./validate-envelope";

const SEMANTIC_DEADLINE_MS = 12_000;

const compositionPolicy = `Composition policy for gaboesquivel.com:
1. Browsing projects uses ProjectExperience with an approved composite (${projectCompositionRecipes.join(", ")}), or legacy composites editorial-grid, work-gallery, featured-pair, case-study.
2. Explaining professional experience uses Answer with sourceIds from evidence.
3. Comparing projects uses project-comparison or Answer with sources.
4. Architecture diagrams require explicit architecture intent; use CapabilityShowcaseExperience only then.
5. Never output CSS, HTML, custom components, layout, presentation, variant, or frame properties.
6. Project content must use canonical record IDs from evidence only.
7. Missing evidence: short truthful limitation via Answer.
8. Do not invent achievements, roles, technologies, images, or links.
9. Do not use CapabilityShowcaseExperience for generic AI or Web3 browsing.
Return a single line: root = ...`;

export const generateSemanticDocument = async ({
  query,
  records,
  requestId,
  signal,
}: {
  query: string;
  records: PublicRecord[];
  requestId: string;
  signal?: AbortSignal;
}): Promise<{ envelope: CompositionEnvelope; modelCalls: number } | null> => {
  if (
    !process.env.AI_GATEWAY_API_KEY?.trim() &&
    !process.env.ANTHROPIC_API_KEY?.trim()
  ) {
    return null;
  }
  if (signal?.aborted) return null;
  if (!records.length) {
    return {
      envelope: answerDocument({
        body: "I do not have enough on-site evidence for that question. Browse /work, /cv, or /contact.",
        records: [],
        requestId,
        sourceIds: [],
      }),
      modelCalls: 0,
    };
  }
  const packet = buildEvidencePacket({ query, records });
  const abortSignal = signal
    ? AbortSignal.any([signal, AbortSignal.timeout(SEMANTIC_DEADLINE_MS)])
    : AbortSignal.timeout(SEMANTIC_DEADLINE_MS);
  const text = await generateText({
    abortSignal,
    model: SONNET_GATEWAY_MODEL,
    prompt: `${compositionPolicy}\nEvidence: ${JSON.stringify(packet)}.\nQuery: ${query}.\nReturn a single line starting with root = `,
  })
    .then((result) => result.text)
    .catch(() => null);
  if (!text) return null;
  const line = text
    .split("\n")
    .map((item) => item.trim())
    .find((item) => item.startsWith("root = "));
  if (!line) return null;
  const envelope: CompositionEnvelope = {
    fallbackText: query.slice(0, 160),
    libraryVersion: 1,
    openuiText: line,
    records,
    requestId,
  };
  const validated = validateCompositionEnvelope({ envelope });
  if (!validated.ok) {
    const fallback = answerDocument({
      body: "I could not assemble a safe layout from the available evidence. Browse /work, /cv, or /contact.",
      records,
      requestId,
      sourceIds: records.map((record) => record.id).slice(0, 3),
    });
    return { envelope: fallback, modelCalls: 1 };
  }
  return { envelope, modelCalls: 1 };
};
