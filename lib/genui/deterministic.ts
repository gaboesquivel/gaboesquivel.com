import { allBlogs } from "lib/blog";
import { siteOrigin } from "lib/site-path";

import { cvDownloadPayload } from "../connect/cv-download";
import {
  bookingDocument,
  contactDocument,
  cvDocument,
  projectDocument,
  writingDocument,
} from "./builders";
import { composeSearchSections } from "./compose-search";
import { chooseProjectComposite, chooseWritingComposite } from "./composites";
import { domainFromQuery } from "./domain-from-query";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { featuredProjectRecords } from "./featured-records";
import { orderBrowseProjects } from "./project-browse";
import { projectsFromPublicIds } from "./project-from-id";
import { sectionToRecord } from "./search-records";
import { selectProjectComposition } from "./select-project-composition";
import type { GenuiTaskIntent } from "./task-intent";
import { classifyTaskIntent } from "./task-intent";

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
  taskIntent,
}: {
  query: string;
  requestId: string;
  taskIntent?: GenuiTaskIntent;
}) => {
  const resolvedIntent = taskIntent ?? classifyTaskIntent(query);
  const sections = composeSearchSections({ limit: 6, query });
  const records = sections.flatMap((item) => {
    const record = sectionToRecord(item);
    return record ? [record] : [];
  });
  if (!records.length) return null;

  if (resolvedIntent === "explain-experience") {
    return null;
  }

  const projectRecords = records.filter((record) => record.kind === "project");
  const projectIds = projectRecords.map((record) => record.id);

  if (resolvedIntent === "browse-projects" && projectIds.length) {
    const projects = projectsFromPublicIds(projectIds);
    if (projects.length) {
      const domain = domainFromQuery(query) ?? "all";
      const ordered = orderBrowseProjects({ domain, projects });
      const orderedRecords = ordered.flatMap((project) => {
        const existing = projectRecords.find(
          (record) => record.slug === project.slug
        );
        return existing ? [existing] : [];
      });
      const orderedIds = orderedRecords.map((record) => record.id);
      const composite = selectProjectComposition({
        intent: "browse-projects",
        projects: ordered,
      });
      return projectDocument({
        composite,
        domain: domain === "ai" || domain === "web3" ? domain : undefined,
        projectIds: orderedIds,
        records: orderedRecords,
        requestId,
      });
    }
  }

  if (resolvedIntent === "compare-projects" && projectIds.length >= 2) {
    const projects = projectsFromPublicIds(projectIds.slice(0, 3));
    if (projects.length >= 2) {
      const composite = selectProjectComposition({
        intent: "compare-projects",
        projects,
      });
      return projectDocument({
        composite,
        projectIds: projects.map((project) => `/project/${project.slug}`),
        records: projectRecords.slice(0, projects.length),
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
  const searchProjectIds = projectSections.map((item) => item.id);
  if (searchProjectIds.length) {
    const weakSingle =
      projectSections.length === 1 && (projectSections[0]?.score ?? 0) < 2;
    if (weakSingle) return null;
    const projects = projectsFromPublicIds(searchProjectIds);
    const composite =
      projects.length > 0
        ? selectProjectComposition({
            intent: resolvedIntent,
            projects,
          })
        : chooseProjectComposite({ projectIds: searchProjectIds });
    return projectDocument({
      composite,
      projectIds: searchProjectIds,
      records: projectRecords,
      requestId,
    });
  }

  return null;
};
