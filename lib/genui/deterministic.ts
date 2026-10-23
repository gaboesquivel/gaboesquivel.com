import { allBlogs } from "lib/blog";
import { siteOrigin } from "lib/site-path";

import { cvDownloadPayload } from "../connect/cv-download";
import {
  bookingDocument,
  capabilityShowcaseDocument,
  contactDocument,
  cvDocument,
  projectDocument,
  writingDocument,
} from "./builders";
import { composeSearchSections } from "./compose-search";
import { chooseProjectComposite, chooseWritingComposite } from "./composites";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { featuredProjectRecords } from "./featured-records";
import { sectionToRecord } from "./search-records";

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
    const records = featuredProjectRecords();
    return projectDocument({
      composite: "work-gallery",
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

export const buildSearchDocument = ({
  query,
  requestId,
}: {
  query: string;
  requestId: string;
}) => {
  const sections = composeSearchSections({ limit: 6, query });
  const records = sections.flatMap((item) => {
    const record = sectionToRecord(item);
    return record ? [record] : [];
  });
  if (!records.length) return null;

  const lower = query.toLowerCase();
  if (
    (lower.includes("ai") || lower.includes("agent")) &&
    !lower.includes("web3")
  ) {
    const projectIds = records
      .filter((record) => record.kind === "project")
      .map((record) => record.id);
    if (projectIds.length) {
      return capabilityShowcaseDocument({
        domain: "ai",
        projectIds,
        records,
        requestId,
      });
    }
  }
  if (
    lower.includes("web3") ||
    lower.includes("wallet") ||
    lower.includes("onchain")
  ) {
    const projectIds = records
      .filter((record) => record.kind === "project")
      .map((record) => record.id);
    if (projectIds.length) {
      return capabilityShowcaseDocument({
        domain: "web3",
        projectIds,
        records,
        requestId,
      });
    }
  }

  const postRecords = records.filter((record) => record.kind === "post");
  if (postRecords.length) {
    const postIds = postRecords.map((record) => record.id);
    const featured = allBlogs[0];
    return writingDocument({
      composite: chooseWritingComposite({
        featuredSlug: featured?.slug,
        leadPostId: postIds[0],
      }),
      postIds,
      records: postRecords,
      requestId,
    });
  }

  const projectSections = sections.filter((item) => item.kind === "project");
  const projectIds = projectSections.map((item) => item.id);
  if (projectIds.length) {
    const weakSingle =
      projectSections.length === 1 && (projectSections[0]?.score ?? 0) < 2;
    if (weakSingle) return null;
    return projectDocument({
      composite: chooseProjectComposite({ projectIds }),
      projectIds,
      records: records.filter((record) => record.kind === "project"),
      requestId,
    });
  }

  return null;
};
