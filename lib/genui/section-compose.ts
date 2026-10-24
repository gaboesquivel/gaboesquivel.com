import { hireTermsPlainIndexLine, publicBookingUrl } from "lib/hire-terms";
import { siteOrigin } from "lib/site-path";

import {
  answerDocument,
  bookingDocument,
  childExpressionsFromOpenUi,
  contactDocument,
  cvDocument,
  projectDocument,
  stackDocument,
  timelineDocument,
  writingDocument,
} from "./builders";
import { chooseWritingComposite } from "./composites";
import type { ComposeSection } from "./compound-intent";
import { postRecord, profileRecord, publishedPosts } from "./content-records";
import { openUiStringList, openUiStringLiteral } from "./contract/serialize";
import type { CompositionEnvelope } from "./envelope";
import { featuredProjectRecords } from "./featured-records";
import { orderBrowseProjects } from "./project-browse";
import { filterProjectsByDomain } from "./project-domain";
import type { GenuiProjectDomain } from "./project-domain";
import { cvPublicRecord, projectToPublicRecord } from "./public-records";
import {
  selectProjectComposition,
  splitLeadAndRemainderProjects,
} from "./select-project-composition";

export const browseProjectsEnvelope = ({
  domain,
  requestId,
}: {
  domain: GenuiProjectDomain;
  requestId: string;
}): CompositionEnvelope | null => {
  const filtered = filterProjectsByDomain({ domain });
  if (!filtered.length) return null;
  const ordered = orderBrowseProjects({ domain, projects: filtered });
  const records = ordered.map(projectToPublicRecord);
  const domainArg = domain === "ai" || domain === "web3" ? domain : undefined;
  const { lead, leadComposite, remainder } =
    splitLeadAndRemainderProjects(ordered);

  if (!remainder.length) {
    return projectDocument({
      composite: selectProjectComposition({
        intent: "browse-projects",
        projects: ordered,
      }),
      domain: domainArg,
      projectIds: records.map((record) => record.id),
      records,
      requestId,
    });
  }

  const leadRecords = lead.map(projectToPublicRecord);
  const leadIds = leadRecords.map((record) => record.id);
  const remainderRecords = remainder.map(projectToPublicRecord);
  const remainderIds = remainderRecords.map((record) => record.id);
  const domainSuffix = domainArg ? `, ${openUiStringLiteral(domainArg)}` : "";

  return stackDocument({
    childExpressions: [
      `ProjectExperience(${openUiStringLiteral(leadComposite)}, ${openUiStringList(leadIds)}${domainSuffix})`,
      `ProjectExperience(${openUiStringLiteral("project-compact-list")}, ${openUiStringList(remainderIds)}${domainSuffix})`,
    ],
    fallbackText: "Selected projects",
    records: [...leadRecords, ...remainderRecords],
    requestId,
  });
};

export const sectionToEnvelope = ({
  requestId,
  section,
}: {
  requestId: string;
  section: ComposeSection;
}): CompositionEnvelope | null => {
  if (section.type === "projects") {
    return browseProjectsEnvelope({ domain: section.domain, requestId });
  }
  if (section.type === "timeline") return timelineDocument({ requestId });
  if (section.type === "cv") {
    return cvDocument({ record: cvPublicRecord(), requestId });
  }
  if (section.type === "booking") {
    return bookingDocument({
      records: [
        profileRecord({
          title: "Book a call",
          url: `${siteOrigin}/contact`,
        }),
      ],
      requestId,
    });
  }
  if (section.type === "contact") {
    return contactDocument({
      records: [
        profileRecord({
          title: "Contact",
          url: `${siteOrigin}/contact`,
        }),
      ],
      requestId,
    });
  }
  if (section.type === "engagement") {
    const contact = profileRecord({
      id: "/contact",
      title: "Contact",
      url: `${siteOrigin}/contact`,
    });
    const cv = cvPublicRecord();
    const booking = profileRecord({
      id: "booking",
      title: "Book a call",
      url: publicBookingUrl,
    });
    return answerDocument({
      body: hireTermsPlainIndexLine,
      records: [contact, cv, booking],
      requestId,
      sourceIds: [contact.id, cv.id, booking.id],
    });
  }
  if (section.type === "writing") {
    const posts = publishedPosts().filter((post) =>
      section.category
        ? (post.category ?? []).some(
            (item) => item.toLowerCase() === section.category
          )
        : true
    );
    const slice = posts.slice(0, 6);
    if (!slice.length) return null;
    const records = slice.map(postRecord);
    const postIds = records.map((record) => record.id);
    const featured = publishedPosts()[0];
    return writingDocument({
      composite: chooseWritingComposite({
        featuredSlug: featured?.slug,
        leadPostId: postIds[0],
      }),
      postIds,
      records,
      requestId,
    });
  }
  return null;
};

export const composeSectionsDocument = ({
  requestId,
  sections,
}: {
  requestId: string;
  sections: ComposeSection[];
}): CompositionEnvelope | null => {
  const envelopes = sections.flatMap((section) => {
    const doc = sectionToEnvelope({ requestId, section });
    return doc ? [doc] : [];
  });
  if (!envelopes.length) return null;
  if (envelopes.length === 1) return envelopes[0];

  const records = envelopes.flatMap((envelope) => envelope.records);
  const uniqueRecords = [...new Map(records.map((r) => [r.id, r])).values()];
  const childExpressions = envelopes.flatMap((envelope) =>
    childExpressionsFromOpenUi(envelope.openuiText)
  );

  return stackDocument({
    childExpressions,
    fallbackText: envelopes[0]?.fallbackText ?? "Results",
    records: uniqueRecords,
    requestId,
  });
};

export const exploreWorkEnvelope = ({ requestId }: { requestId: string }) => {
  const records = featuredProjectRecords();
  const projectIds = records.map((record) => record.id);
  const body =
    "Start with the featured portfolio set below—one lead case study, then supporting shipped work. Homepage selected work may differ from this featured set; each card links to the full case study.";
  return stackDocument({
    childExpressions: [
      `Answer(${openUiStringLiteral(body)}, ${openUiStringList(projectIds.slice(0, 3))})`,
      `ProjectExperience(${openUiStringLiteral("work-gallery")}, ${openUiStringList(projectIds)})`,
    ],
    fallbackText: body,
    records,
    requestId,
  });
};
