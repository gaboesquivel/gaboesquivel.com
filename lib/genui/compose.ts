import { getProjectBySlug } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";
import { featuredProjectSlugs } from "lib/work-types";
import { nanoid } from "nanoid";

import type { CapabilityContext } from "../capabilities/types";
import { cvDownloadPayload } from "../connect/cv-download";
import { contactDocument, cvDocument, projectDocument } from "./builders";
import { composeSearchSections } from "./compose-search";
import { chooseProjectComposite } from "./composites";
import { evaluateWithJev } from "./decisions";
import { buildSearchDocument, tierZeroDocument } from "./deterministic";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { generateSemanticDocument } from "./semantic";
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

const sectionToRecord = (
  item: ReturnType<typeof composeSearchSections>[number]
): PublicRecord | null => {
  if (item.kind === "project") {
    const slug = item.id.replace("/project/", "");
    return {
      description: item.excerpt,
      id: item.id,
      kind: "project",
      slug,
      title: item.title,
      url: item.url,
    };
  }
  if (item.kind === "post") {
    const slug = item.id.replace("/blog/", "");
    return {
      excerpt: item.excerpt,
      id: item.id,
      kind: "post",
      publishedAt: item.publishedAt,
      slug,
      title: item.title,
      url: item.url,
    };
  }
  return {
    excerpt: item.excerpt,
    id: item.id,
    kind: "profile",
    title: item.title,
    url: item.url,
  };
};

const documentFromDecision = ({
  decision,
  requestId,
}: {
  decision: { domain?: string; intents: string[] };
  requestId: string;
}): CompositionEnvelope | null => {
  if (decision.intents.includes("projects") || decision.domain === "projects") {
    const records = featuredProjectSlugs.flatMap((slug) => {
      const project = getProjectBySlug(slug);
      if (!project) return [];
      return [
        {
          description: project.description,
          id: `/project/${slug}`,
          kind: "project" as const,
          slug,
          title: project.title,
          url: `${siteOrigin}/project/${slug}`,
        },
      ];
    });
    const projectIds = records.map((record) => record.id);
    return projectDocument({
      composite: chooseProjectComposite({ projectIds }),
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
  modelCalls: number;
  parseErrors: number;
  tier: 0 | 1 | 2;
}> => {
  const query = input.query.trim();
  if (!query || queryCodePoints(query) > MAX_QUERY_CODE_POINTS) {
    throw new Error("invalid-query");
  }
  const requestId = context.correlationId || nanoid();
  let sequence = 0;
  const events: ComposeStreamEvent[] = [];
  const emit = (event: ComposeStreamEvent) => {
    events.push(event);
    onEvent?.(event);
  };
  emit({ requestId, sequence: sequence++, type: "start" });
  const pushValidated = ({
    envelope,
    requestId: eventRequestId,
    sequence: eventSequence,
    type,
  }: {
    envelope: CompositionEnvelope;
    requestId: string;
    sequence: number;
    type: "partial" | "complete";
  }) => {
    const validated = validateCompositionEnvelope({ envelope });
    if (!validated.ok) {
      throw new Error("invalid-envelope");
    }
    emit({
      envelope,
      requestId: eventRequestId,
      sequence: eventSequence,
      type,
    });
  };
  let modelCalls = 0;
  let jevCalls = 0;
  let parseErrors = 0;
  let tier: 0 | 1 | 2 = 0;

  const exact = tierZeroDocument({ query, requestId });
  if (exact) {
    try {
      pushValidated({
        envelope: exact,
        requestId,
        sequence: sequence++,
        type: "complete",
      });
    } catch {
      parseErrors += 1;
      emit({
        message: "Composition failed.",
        requestId,
        sequence: sequence++,
        type: "error",
      });
    }
    return { events, jevCalls, modelCalls, parseErrors, tier };
  }

  tier = 1;
  const decision = await evaluateWithJev({ query, signal });
  if (decision) jevCalls += 1;
  if (signal?.aborted) {
    return { events, jevCalls, modelCalls, parseErrors, tier };
  }
  if (decision && !decision.needsSynthesis) {
    const doc = documentFromDecision({ decision, requestId });
    if (doc) {
      try {
        pushValidated({
          envelope: doc,
          requestId,
          sequence: sequence++,
          type: "complete",
        });
      } catch {
        parseErrors += 1;
        emit({
          message: "Composition failed.",
          requestId,
          sequence: sequence++,
          type: "error",
        });
      }
      return { events, jevCalls, modelCalls, parseErrors, tier };
    }
  }

  tier = 2;
  const searched = await buildSearchDocument({ context, query, requestId });
  if (searched) {
    try {
      pushValidated({
        envelope: searched,
        requestId,
        sequence: sequence++,
        type: "partial",
      });
      pushValidated({
        envelope: searched,
        requestId,
        sequence: sequence++,
        type: "complete",
      });
    } catch {
      parseErrors += 1;
      emit({
        message: "Composition failed.",
        requestId,
        sequence: sequence++,
        type: "error",
      });
    }
    return { events, jevCalls, modelCalls, parseErrors, tier };
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
    try {
      pushValidated({
        envelope: semantic.envelope,
        requestId,
        sequence: sequence++,
        type: "complete",
      });
    } catch {
      parseErrors += 1;
      emit({
        message: "Composition failed.",
        requestId,
        sequence: sequence++,
        type: "error",
      });
    }
    return { events, jevCalls, modelCalls, parseErrors, tier };
  }

  emit({
    message: "No matching experience. Try /work, /cv, or /contact.",
    requestId,
    sequence: sequence++,
    type: "error",
  });
  return { events, jevCalls, modelCalls, parseErrors, tier };
};
