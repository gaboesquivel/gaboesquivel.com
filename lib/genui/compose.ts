import { getProjectBySlug } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";
import { featuredProjectSlugs } from "lib/work-types";
import { nanoid } from "nanoid";

import type { CapabilityContext } from "../capabilities/types";
import { cvDownloadPayload } from "../connect/cv-download";
import {
  bookingDocument,
  contactDocument,
  cvDocument,
  projectDocument,
} from "./builders";
import { evaluateWithJev } from "./decisions";
import { buildSearchDocument, tierZeroDocument } from "./deterministic";
import type { CompositionEnvelope, PublicRecord } from "./envelope";

const MAX_QUERY_LENGTH = 2000;

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
    return projectDocument({
      projectIds: records.map((record) => record.id),
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
  return bookingDocument({
    records: [
      {
        id: "profile",
        kind: "profile",
        title: "Book",
        url: `${siteOrigin}/contact`,
      },
    ],
    requestId,
  });
};

export const composeQuery = async ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: ComposeInput;
}): Promise<{
  events: ComposeStreamEvent[];
  modelCalls: number;
  tier: 0 | 1 | 2;
}> => {
  const query = input.query.trim();
  if (!query || query.length > MAX_QUERY_LENGTH) {
    throw new Error("invalid-query");
  }
  const requestId = context.correlationId || nanoid();
  let sequence = 0;
  const events: ComposeStreamEvent[] = [
    { requestId, sequence: sequence++, type: "start" },
  ];
  let modelCalls = 0;
  let tier: 0 | 1 | 2 = 0;

  const exact = tierZeroDocument({ query, requestId });
  if (exact) {
    events.push({
      envelope: exact,
      requestId,
      sequence: sequence++,
      type: "complete",
    });
    return { events, modelCalls, tier };
  }

  tier = 1;
  const decision = await evaluateWithJev({ query });
  if (decision && !decision.needsSynthesis) {
    const doc = documentFromDecision({ decision, requestId });
    if (doc) {
      events.push({
        envelope: doc,
        requestId,
        sequence: sequence++,
        type: "complete",
      });
      return { events, modelCalls, tier };
    }
  }

  tier = 2;
  modelCalls += 1;
  const searched = await buildSearchDocument({ context, query, requestId });
  if (searched) {
    events.push({
      envelope: searched,
      requestId,
      sequence: sequence++,
      type: "partial",
    });
    events.push({
      envelope: searched,
      requestId,
      sequence: sequence++,
      type: "complete",
    });
    return { events, modelCalls, tier };
  }

  events.push({
    message: "No matching experience. Try /work, /cv, or /contact.",
    requestId,
    sequence: sequence++,
    type: "error",
  });
  return { events, modelCalls, tier };
};
