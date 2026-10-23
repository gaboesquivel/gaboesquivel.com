import { siteOrigin } from "lib/site-path";
import { nanoid } from "nanoid";

import type { CapabilityContext } from "../capabilities/types";
import { cvDownloadPayload } from "../connect/cv-download";
import { contactDocument, cvDocument, projectDocument } from "./builders";
import type { ComposeResultMetadata } from "./compose-metadata";
import { metadataFromEnvelope } from "./compose-metadata";
import { composeSearchSections } from "./compose-search";
import type { CompiledExperience } from "./contract/errors";
import type { JevDecision } from "./decisions";
import { evaluateWithJev } from "./decisions";
import { buildSearchDocument, tierZeroDocument } from "./deterministic";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { featuredProjectRecords } from "./featured-records";
import { projectsFromPublicIds } from "./project-from-id";
import { browseProjectsDocument, composeIntentDocument } from "./query-intent";
import { sectionToRecord } from "./search-records";
import { selectProjectComposition } from "./select-project-composition";
import { generateSemanticDocument } from "./semantic";
import { classifyTaskIntent } from "./task-intent";
import { validateCompositionEnvelope } from "./validate-envelope";

const MAX_QUERY_CODE_POINTS = 2000;

export interface ComposeInput {
  clientRequestId: string;
  locale?: string;
  query: string;
  version: number;
}

export type ComposeStreamEvent =
  | { requestId: string; sequence: number; type: "start" }
  | {
      envelope: CompositionEnvelope;
      requestId: string;
      sequence: number;
      type: "partial" | "complete";
    }
  | { message: string; requestId: string; sequence: number; type: "error" };

const queryCodePoints = (query: string) => [...query].length;

const documentFromDecision = ({
  decision,
  requestId,
}: {
  decision: JevDecision;
  requestId: string;
}): CompositionEnvelope | null => {
  if (
    decision.taskIntent === "explain-experience" ||
    decision.taskIntent === "explain-architecture"
  ) {
    return null;
  }
  if (decision.taskIntent === "browse-projects") {
    const domain =
      decision.domain === "ai" || decision.domain === "web3"
        ? decision.domain
        : "all";
    return browseProjectsDocument({
      domain,
      intent: "browse-projects",
      requestId,
    });
  }
  if (decision.intents.includes("projects") || decision.domain === "projects") {
    const records = featuredProjectRecords();
    const projectIds = records.map((record) => record.id);
    const projects = projectsFromPublicIds(projectIds);
    return projectDocument({
      composite: selectProjectComposition({
        intent: "browse-projects",
        projects,
      }),
      projectIds,
      records,
      requestId,
    });
  }
  if (decision.domain === "cv") {
    const payload = cvDownloadPayload();
    const record: PublicRecord = {
      id: "/cv",
      kind: "cv",
      pdfUrl: payload.pdfUrl,
      title: payload.title,
      url: payload.pageUrl,
      variant: payload.variant,
    };
    return cvDocument({ record, requestId });
  }
  if (decision.domain === "contact") {
    return contactDocument({
      records: [
        {
          id: "profile",
          kind: "profile",
          title: "Contact",
          url: `${siteOrigin}/contact`,
        },
      ],
      requestId,
    });
  }
  if (decision.domain === "writing") {
    return null;
  }
  return null;
};

const lastEnvelope = (events: ComposeStreamEvent[]) => {
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index];
    if (
      event &&
      (event.type === "complete" || event.type === "partial") &&
      "envelope" in event
    ) {
      return event.envelope;
    }
  }
  return null;
};

export const composeQuery = async ({
  context,
  input,
  onEvent,
  signal,
}: {
  context: CapabilityContext;
  input: ComposeInput;
  onEvent?: (event: ComposeStreamEvent) => void;
  signal?: AbortSignal;
}): Promise<{
  events: ComposeStreamEvent[];
  jevCalls: number;
  metadata: ComposeResultMetadata;
  modelCalls: number;
  parseErrors: number;
  tier: 0 | 1 | 2;
}> => {
  const query = input.query.trim();
  if (!query || queryCodePoints(query) > MAX_QUERY_CODE_POINTS) {
    throw new Error("invalid-query");
  }
  const requestId = context.correlationId || nanoid();
  const taskIntent = classifyTaskIntent(query);
  let sequence = 0;
  const events: ComposeStreamEvent[] = [];
  const emit = (event: ComposeStreamEvent) => {
    events.push(event);
    onEvent?.(event);
  };
  emit({ requestId, sequence: sequence++, type: "start" });
  let modelCalls = 0;
  let jevCalls = 0;
  let parseErrors = 0;
  let tier: 0 | 1 | 2 = 0;
  let lastCompiled: CompiledExperience | undefined;
  const composeMetadata = ({
    envelope,
    validationOk,
  }: {
    envelope: CompositionEnvelope | null;
    validationOk?: boolean;
  }) =>
    metadataFromEnvelope({
      compiled: lastCompiled,
      envelope,
      query,
      taskIntent,
      validationOk,
    });
  const emitValidated = ({
    envelope,
    type,
  }: {
    envelope: CompositionEnvelope;
    type: "partial" | "complete";
  }) => {
    const validated = validateCompositionEnvelope({ envelope });
    if (!validated.ok) {
      parseErrors += 1;
      emit({
        message: "Composition failed.",
        requestId,
        sequence: sequence++,
        type: "error",
      });
      return false;
    }
    lastCompiled = validated.compiled;
    emit({
      envelope,
      requestId,
      sequence: sequence++,
      type,
    });
    return true;
  };

  const exact = tierZeroDocument({ query, requestId });
  if (exact) {
    emitValidated({ envelope: exact, type: "complete" });
    return {
      events,
      jevCalls,
      metadata: composeMetadata({ envelope: exact }),
      modelCalls,
      parseErrors,
      tier,
    };
  }

  const intent = composeIntentDocument({ query, requestId });
  if (intent) {
    tier = 1;
    emitValidated({ envelope: intent, type: "complete" });
    return {
      events,
      jevCalls,
      metadata: composeMetadata({ envelope: intent }),
      modelCalls,
      parseErrors,
      tier,
    };
  }

  tier = 1;
  const decision = await evaluateWithJev({ query, signal });
  if (decision) jevCalls += 1;
  if (signal?.aborted) {
    return {
      events,
      jevCalls,
      metadata: composeMetadata({ envelope: null }),
      modelCalls,
      parseErrors,
      tier,
    };
  }
  if (decision && !decision.needsSynthesis) {
    const doc = documentFromDecision({ decision, requestId });
    if (doc) {
      emitValidated({ envelope: doc, type: "complete" });
      return {
        events,
        jevCalls,
        metadata: composeMetadata({ envelope: doc }),
        modelCalls,
        parseErrors,
        tier,
      };
    }
  }

  tier = 2;
  const resolvedTaskIntent = decision?.taskIntent ?? taskIntent;
  if (resolvedTaskIntent === "explain-experience") {
    const evidenceRecords = composeSearchSections({ limit: 6, query }).flatMap(
      (item) => {
        const record = sectionToRecord(item);
        return record ? [record] : [];
      }
    );
    const semantic = await generateSemanticDocument({
      query,
      records: evidenceRecords,
      requestId,
      signal,
    });
    if (semantic) {
      modelCalls += semantic.modelCalls;
      emitValidated({ envelope: semantic.envelope, type: "complete" });
      return {
        events,
        jevCalls,
        metadata: composeMetadata({ envelope: semantic.envelope }),
        modelCalls,
        parseErrors,
        tier,
      };
    }
  }

  const searched = buildSearchDocument({
    query,
    requestId,
    taskIntent: resolvedTaskIntent,
  });
  if (searched) {
    if (emitValidated({ envelope: searched, type: "partial" })) {
      emitValidated({ envelope: searched, type: "complete" });
    }
    return {
      events,
      jevCalls,
      metadata: composeMetadata({ envelope: searched }),
      modelCalls,
      parseErrors,
      tier,
    };
  }

  const evidenceRecords = composeSearchSections({ limit: 6, query }).flatMap(
    (item) => {
      const record = sectionToRecord(item);
      return record ? [record] : [];
    }
  );
  const semantic = await generateSemanticDocument({
    query,
    records: evidenceRecords,
    requestId,
    signal,
  });
  if (semantic) {
    modelCalls += semantic.modelCalls;
    emitValidated({ envelope: semantic.envelope, type: "complete" });
    return {
      events,
      jevCalls,
      metadata: composeMetadata({ envelope: semantic.envelope }),
      modelCalls,
      parseErrors,
      tier,
    };
  }

  emit({
    message: "No matching experience. Try /work, /cv, or /contact.",
    requestId,
    sequence: sequence++,
    type: "error",
  });
  return {
    events,
    jevCalls,
    metadata: composeMetadata({
      envelope: lastEnvelope(events),
      validationOk: false,
    }),
    modelCalls,
    parseErrors,
    tier,
  };
};
