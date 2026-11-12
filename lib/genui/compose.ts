import { searchCopy } from "lib/search/copy";
import type { ComposeStage } from "lib/search/copy";
import { siteOrigin } from "lib/site-path";
import { nanoid } from "nanoid";

import type { CapabilityContext } from "../capabilities/types";
import {
  contactDocument,
  cvDocument,
  limitationDocument,
  projectDocument,
} from "./builders";
import { catalogOperationDocument } from "./catalog-operation";
import type { ComposeResultMetadata } from "./compose-metadata";
import { metadataFromEnvelope } from "./compose-metadata";
import { composePlannedDocument } from "./compose-planned";
import { composeSearchSections } from "./compose-search";
import type { CompiledExperience } from "./contract/errors";
import type { JevDecision } from "./decisions";
import { evaluateWithJev } from "./decisions";
import { buildSearchDocument, tierZeroDocument } from "./deterministic";
import type { CompositionEnvelope } from "./envelope";
import { featuredProjectRecords } from "./featured-records";
import { projectsFromPublicIds } from "./project-from-id";
import { cvPublicRecord } from "./public-records";
import { composeIntentDocument, safetyDocument } from "./query-intent";
import { buildRequestPlan, retrievePlanEvidence } from "./request-plan";
import { sectionToRecord } from "./search-records";
import { browseProjectsEnvelope } from "./section-compose";
import { selectProjectComposition } from "./select-project-composition";
import { generateSemanticDocument } from "./semantic";
import { genuiProviderConfigured, resolveSemanticPlan } from "./semantic-plan";
import { classifyTaskIntent } from "./task-intent";
import { validateCompositionEnvelope } from "./validate-envelope";
import {
  composeViewDocument,
  isDeadEndPlan,
  routesToViewPlanner,
} from "./view-plan";

const MAX_QUERY_CODE_POINTS = 2000;

interface ComposeInput {
  clientRequestId: string;
  locale?: string;
  query: string;
  version: number;
}

type ComposeStreamEvent =
  | { requestId: string; sequence: number; type: "start" }
  | {
      /** A slow step began; the client shows its human label, never this id. */
      requestId: string;
      sequence: number;
      stage: ComposeStage;
      type: "stage";
    }
  | {
      envelope: CompositionEnvelope;
      requestId: string;
      sequence: number;
      type: "partial" | "complete";
    }
  | {
      /** A model answer with no on-site evidence, or nothing matched. */
      envelope?: CompositionEnvelope;
      message: string;
      requestId: string;
      sequence: number;
      type: "empty";
    }
  | {
      code?: "timed_out" | "failed";
      message: string;
      requestId: string;
      sequence: number;
      type: "error";
    };

const queryCodePoints = (query: string) => [...query].length;

/** The evidence stage the first planned task waits on. */
const stageForTasks = (tasks: readonly { kind: string }[]): ComposeStage => {
  const kind = tasks[0]?.kind;
  if (kind === "booking") return "availability";
  if (kind === "projects" || kind === "compare" || kind === "count") {
    return "projects";
  }
  if (kind === "writing") return "writing";
  if (kind === "timeline" || kind === "cv") return "career";
  return "answer";
};

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
      decision.domain === "ai" ||
      decision.domain === "web3" ||
      decision.domain === "fintech"
        ? decision.domain
        : "all";
    return browseProjectsEnvelope({
      domain,
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
    return cvDocument({ record: cvPublicRecord(), requestId });
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
  let requestPlan = buildRequestPlan(query);
  const safety = safetyDocument({ query, requestId });
  let sequence = 0;
  const events: ComposeStreamEvent[] = [];
  const emit = (event: ComposeStreamEvent) => {
    events.push(event);
    onEvent?.(event);
  };
  emit({ requestId, sequence: sequence++, type: "start" });
  let lastStage: ComposeStage | null = null;
  /** Announces a slow step (model or decision calls) once per change. */
  const emitStage = (stage: ComposeStage) => {
    if (stage === lastStage) return;
    lastStage = stage;
    emit({ requestId, sequence: sequence++, stage, type: "stage" });
  };
  let modelCalls = 0;
  let jevCalls = 0;
  let parseErrors = 0;
  let tier: 0 | 1 | 2 = 0;
  let lastCompiled: CompiledExperience | undefined;
  const composeMetadata = ({
    envelope,
    executions,
    planningPath,
    recoveryReason,
    validationOk,
  }: {
    envelope: CompositionEnvelope | null;
    executions?: Parameters<typeof metadataFromEnvelope>[0]["executions"];
    planningPath?: "deterministic" | "semantic" | "fast-path";
    recoveryReason?: string;
    validationOk?: boolean;
  }) =>
    metadataFromEnvelope({
      compiled: lastCompiled,
      envelope,
      executions,
      planningPath:
        planningPath ??
        (requestPlan.disposition === "fast-path"
          ? "fast-path"
          : "deterministic"),
      query,
      recoveryReason,
      taskCount: requestPlan.tasks.length,
      taskIntent,
      tasks: requestPlan.tasks,
      validationOk,
    });
  const emitValidated = ({
    envelope,
    type,
    validated = validateCompositionEnvelope({ envelope }),
  }: {
    envelope: CompositionEnvelope;
    type: "partial" | "complete";
    validated?: ReturnType<typeof validateCompositionEnvelope>;
  }) => {
    if (!validated.ok) {
      parseErrors += 1;
      emit({
        message: searchCopy.serverFailed,
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

  /**
   * A recovered fallback (no evidence, timeout, malformed or missing-task
   * output) that compiles to an Answer citing no records is a "no answer" for
   * this site: the client shows the empty state, never "Results ready.". A
   * model answer that cites nothing (hire terms, availability) still renders.
   */
  const emitSemantic = (envelope: CompositionEnvelope, recovered: boolean) => {
    const validated = validateCompositionEnvelope({ envelope });
    if (
      recovered &&
      validated.ok &&
      validated.compiled.experience === "Answer" &&
      validated.compiled.referencedRecordIds.length === 0
    ) {
      lastCompiled = validated.compiled;
      emit({
        envelope,
        message: searchCopy.serverNoAnswer,
        requestId,
        sequence: sequence++,
        type: "empty",
      });
      return;
    }
    emitValidated({ envelope, type: "complete", validated });
  };

  const result = (meta: Parameters<typeof composeMetadata>[0]) => ({
    events,
    jevCalls,
    metadata: composeMetadata(meta),
    modelCalls,
    parseErrors,
    tier,
  });

  if (signal?.aborted) {
    return result({ envelope: null });
  }

  if (safety) {
    emitValidated({ envelope: safety, type: "complete" });
    return result({ envelope: safety });
  }

  // A named form (spreadsheet, dashboard, chart, board) must not be claimed by
  // the card fast path. The planner decides whether a view is supported; when
  // it is not, the request continues through the existing routes.
  // A request the keyword planner would answer with the closed "I cannot
  // filter" limitation (an unsupported predicate such as "mention payments")
  // goes to the registry planner first. A named form does too.
  const deadEnd = isDeadEndPlan(requestPlan);
  if (
    routesToViewPlanner({ plan: requestPlan, query }) &&
    genuiProviderConfigured() &&
    !tierZeroDocument({ query, requestId })
  ) {
    tier = 2;
    emitStage("planning");
    const view = await composeViewDocument({ query, requestId, signal });
    modelCalls += view.modelCalls;
    if (signal?.aborted) {
      return result({ envelope: null });
    }
    if (view.envelope) {
      emitValidated({ envelope: view.envelope, type: "complete" });
      return result({
        envelope: view.envelope,
        planningPath: "semantic",
      });
    }
    // The fixed limitation replaces the dead end only; a request that merely
    // contained a form word continues through the existing routes.
    if (view.limitation && deadEnd) {
      const limitation = limitationDocument(view.limitation, requestId);
      emitValidated({ envelope: limitation, type: "complete" });
      return result({ envelope: limitation, planningPath: "semantic" });
    }
    tier = 0;
  }

  const exact =
    requestPlan.disposition === "fast-path"
      ? (catalogOperationDocument({ query, requestId }) ??
        tierZeroDocument({ query, requestId }))
      : null;
  if (exact) {
    emitValidated({ envelope: exact, type: "complete" });
    return result({ envelope: exact });
  }

  if (requestPlan.disposition === "compose") {
    if (requestPlan.needsSemanticPlanning && genuiProviderConfigured()) {
      emitStage("planning");
      const resolved = await resolveSemanticPlan({ plan: requestPlan, signal });
      modelCalls += resolved.modelCalls;
      requestPlan = resolved.plan;
      if (signal?.aborted) {
        return result({ envelope: null });
      }
    }
    if (requestPlan.needsSemanticPlanning && genuiProviderConfigured()) {
      tier = 2;
      emitStage(stageForTasks(requestPlan.tasks));
      const semantic = await generateSemanticDocument({
        plan: requestPlan,
        query,
        records: retrievePlanEvidence(requestPlan),
        requestId,
        signal,
      });
      if (signal?.aborted) {
        return result({ envelope: null });
      }
      if (semantic) {
        modelCalls += semantic.modelCalls;
        emitSemantic(semantic.envelope, semantic.recovered);
        return result({ envelope: semantic.envelope });
      }
    }
    const planned = composePlannedDocument({
      requestId,
      tasks: requestPlan.tasks,
    });
    if (planned) {
      tier = 1;
      emitValidated({ envelope: planned.envelope, type: "complete" });
      return result({
        envelope: planned.envelope,
        executions: planned.executions,
        planningPath: requestPlan.needsSemanticPlanning
          ? "semantic"
          : "deterministic",
      });
    }
  }

  const candidate =
    requestPlan.disposition === "fast-path"
      ? composeIntentDocument({ query, requestId })
      : null;
  const candidateCheck = candidate
    ? validateCompositionEnvelope({ envelope: candidate })
    : null;
  // Deterministic policy limitations must remain available without model credentials.
  const policyLimitation =
    candidateCheck?.ok &&
    candidateCheck.compiled.experience === "Answer" &&
    candidateCheck.compiled.referencedRecordIds.length === 0;
  const intent =
    !requestPlan.requiresSynthesis || policyLimitation ? candidate : null;
  if (intent) {
    tier = 1;
    emitValidated({
      envelope: intent,
      type: "complete",
      validated: candidateCheck ?? undefined,
    });
    return result({ envelope: intent });
  }

  tier = 1;
  emitStage("planning");
  const decision = await evaluateWithJev({ query, signal });
  if (decision) jevCalls += 1;
  if (signal?.aborted) {
    return result({ envelope: null });
  }
  if (decision && !decision.needsSynthesis && !requestPlan.requiresSynthesis) {
    const doc = documentFromDecision({ decision, requestId });
    if (doc) {
      emitValidated({ envelope: doc, type: "complete" });
      return result({ envelope: doc });
    }
  }

  tier = 2;
  const resolvedTaskIntent = decision?.taskIntent ?? taskIntent;
  const synthesize =
    resolvedTaskIntent === "explain-experience" ||
    requestPlan.requiresSynthesis;
  if (synthesize) {
    emitStage(stageForTasks(requestPlan.tasks));
    const semantic = await generateSemanticDocument({
      query,
      records: retrievePlanEvidence(requestPlan),
      requestId,
      signal,
    });
    if (semantic) {
      modelCalls += semantic.modelCalls;
      emitSemantic(semantic.envelope, semantic.recovered);
      return result({ envelope: semantic.envelope });
    }
  }

  const searched = requestPlan.requiresSynthesis
    ? null
    : buildSearchDocument({
        query,
        requestId,
        taskIntent: resolvedTaskIntent,
      });
  if (searched) {
    const validated = validateCompositionEnvelope({ envelope: searched });
    if (emitValidated({ envelope: searched, type: "partial", validated })) {
      emitValidated({ envelope: searched, type: "complete", validated });
    }
    return result({ envelope: searched });
  }

  if (!synthesize) emitStage("answer");
  const semantic = synthesize
    ? null
    : await generateSemanticDocument({
        query,
        records: composeSearchSections({ limit: 6, query }).flatMap((item) => {
          const record = sectionToRecord(item);
          return record ? [record] : [];
        }),
        requestId,
        signal,
      });
  if (semantic) {
    modelCalls += semantic.modelCalls;
    emitSemantic(semantic.envelope, semantic.recovered);
    return result({ envelope: semantic.envelope });
  }

  emit({
    message: searchCopy.serverNoAnswer,
    requestId,
    sequence: sequence++,
    type: "empty",
  });
  return result({
    envelope: null,
    validationOk: false,
  });
};
