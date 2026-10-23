import { generateText } from "ai";

import { SONNET_GATEWAY_MODEL } from "../connect/sonnet-model";
import { answerDocument } from "./builders";
import { buildEvidencePacket } from "./context";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { validateCompositionEnvelope } from "./validate-envelope";

const SEMANTIC_DEADLINE_MS = 12_000;

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
    prompt: `You compose OpenUI for gaboesquivel.com. Use only Answer, ProjectExperience, WritingExperience, or CapabilityShowcaseExperience with allowed composite names. Evidence: ${JSON.stringify(packet)}. Query: ${query}. Return a single line starting with root = `,
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
