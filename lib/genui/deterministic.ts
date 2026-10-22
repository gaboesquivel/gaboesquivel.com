import { getProjectBySlug } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";
import { featuredProjectSlugs } from "lib/work-types";

import { runCapability } from "../capabilities/registry";
import type { CapabilityContext } from "../capabilities/types";
import { cvDownloadPayload } from "../connect/cv-download";
import {
  bookingDocument,
  contactDocument,
  cvDocument,
  projectDocument,
} from "./builders";
import type { CompositionEnvelope, PublicRecord } from "./envelope";

const normalize = (query: string) =>
  query.trim().toLowerCase().replace(/\s+/g, " ");

const exactMap: Record<
  string,
  (args: { requestId: string }) => CompositionEnvelope | null
> = {
  cv: ({ requestId }) => {
    const payload = cvDownloadPayload();
    const record: PublicRecord = {
      id: `/cv`,
      kind: "cv",
      pdfUrl: payload.pdfUrl,
      title: payload.title,
      url: payload.pageUrl,
      variant: payload.variant,
    };
    return cvDocument({ record, requestId });
  },
  "download cv": ({ requestId }) => exactMap.cv({ requestId }),
  "book a call": ({ requestId }) =>
    bookingDocument({
      records: [
        {
          id: "profile",
          kind: "profile",
          title: "Book a call",
          url: `${siteOrigin}/contact`,
        },
      ],
      requestId,
    }),
  "send email": ({ requestId }) =>
    contactDocument({
      records: [
        {
          id: "profile",
          kind: "profile",
          title: "Contact",
          url: `${siteOrigin}/contact`,
        },
      ],
      requestId,
    }),
  "explore my work": ({ requestId }) => {
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
  },
};

export const tierZeroDocument = ({
  query,
  requestId,
}: {
  query: string;
  requestId: string;
}) => exactMap[normalize(query)]?.({ requestId }) ?? null;

export const buildSearchDocument = async ({
  context,
  query,
  requestId,
}: {
  context: CapabilityContext;
  query: string;
  requestId: string;
}) => {
  const result = (await runCapability({
    context,
    input: { limit: 6, query },
    name: "search_site",
  })) as {
    data?: {
      results: {
        excerpt: string;
        id: string;
        kind: string;
        title: string;
        url: string;
      }[];
    };
    status: string;
  };
  if (result.status === "empty" || !result.data) return null;
  const results = result.data.results;
  const records: PublicRecord[] = results.map((item) =>
    item.kind === "project"
      ? {
          description: item.excerpt,
          id: item.id,
          kind: "project",
          slug: item.id.replace("/project/", ""),
          title: item.title,
          url: item.url,
        }
      : {
          excerpt: item.excerpt,
          id: item.id,
          kind: "profile",
          title: item.title,
          url: item.url,
        }
  );
  const projectIds = records
    .filter((record) => record.kind === "project")
    .map((record) => record.id);
  if (projectIds.length) {
    return projectDocument({ projectIds, records, requestId });
  }
  return null;
};
