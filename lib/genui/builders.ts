import { getProjectBySlug } from "gaboesquivel";
import { careerChapters, careerProjectSlugs } from "lib/bio/career-timeline";
import { siteOrigin } from "lib/site-path";

import type { CompositeName } from "./composites";
import { openUiStringList, openUiStringLiteral } from "./contract/serialize";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { GENUI_LIBRARY_VERSION } from "./envelope";
import { projectToPublicRecord } from "./public-records";

const envelope = ({
  fallbackText,
  openuiText,
  records,
  requestId,
}: {
  fallbackText: string;
  openuiText: string;
  records: PublicRecord[];
  requestId: string;
}): CompositionEnvelope => ({
  fallbackText,
  libraryVersion: GENUI_LIBRARY_VERSION,
  openuiText,
  records,
  requestId,
});

export const cvDocument = ({
  composite = "cv-document",
  focus = "full",
  record,
  requestId,
}: {
  composite?: CompositeName;
  focus?: string;
  record: PublicRecord;
  requestId: string;
}) =>
  envelope({
    fallbackText: `CV (${focus}): ${record.kind === "cv" ? record.title : "CV"}`,
    openuiText: `root = CVExperience(${openUiStringLiteral(composite)}, ${openUiStringLiteral(focus)}, ${openUiStringLiteral(record.id)})`,
    records: [record],
    requestId,
  });

export const answerDocument = ({
  body,
  requestId,
  sourceIds,
  records,
}: {
  body: string;
  requestId: string;
  sourceIds: string[];
  records: PublicRecord[];
}) =>
  envelope({
    fallbackText: body,
    openuiText: `root = Answer(${openUiStringLiteral(body)}, ${openUiStringList(sourceIds)})`,
    records,
    requestId,
  });

export const projectDocument = ({
  composite,
  domain,
  projectIds,
  records,
  requestId,
}: {
  composite: CompositeName;
  domain?: "ai" | "web3" | "all";
  projectIds: string[];
  records: PublicRecord[];
  requestId: string;
}) => {
  let domainArg = "";
  if (domain) {
    domainArg = `, ${openUiStringLiteral(domain)}`;
  }
  return envelope({
    fallbackText: "Selected projects",
    openuiText: `root = ProjectExperience(${openUiStringLiteral(composite)}, ${openUiStringList(projectIds)}${domainArg})`,
    records,
    requestId,
  });
};

export const writingDocument = ({
  composite,
  postIds,
  records,
  requestId,
}: {
  composite: CompositeName;
  postIds: string[];
  records: PublicRecord[];
  requestId: string;
}) =>
  envelope({
    fallbackText: "Writing",
    openuiText: `root = WritingExperience(${openUiStringLiteral(composite)}, ${openUiStringList(postIds)})`,
    records,
    requestId,
  });

export const capabilityShowcaseDocument = ({
  domain,
  projectIds,
  records,
  requestId,
}: {
  domain: "ai" | "web3";
  projectIds: string[];
  records: PublicRecord[];
  requestId: string;
}) =>
  envelope({
    fallbackText: `${domain === "ai" ? "AI" : "Web3"} engineering evidence`,
    openuiText: `root = CapabilityShowcaseExperience(${openUiStringLiteral(domain)}, ${openUiStringList(projectIds)})`,
    records,
    requestId,
  });

export const contactDocument = ({
  records,
  requestId,
}: {
  records: PublicRecord[];
  requestId: string;
}) =>
  envelope({
    fallbackText: "Contact Gabo",
    openuiText: `root = ContactExperience(${openUiStringLiteral("hire-split")}, ${openUiStringLiteral(records[0]?.id ?? "profile")})`,
    records,
    requestId,
  });

export const bookingDocument = ({
  records,
  requestId,
}: {
  records: PublicRecord[];
  requestId: string;
}) =>
  envelope({
    fallbackText: "Book a call",
    openuiText: `root = BookingExperience(${openUiStringLiteral("hire-split")})`,
    records,
    requestId,
  });

export const timelineDocument = ({ requestId }: { requestId: string }) => {
  const projects = careerProjectSlugs.flatMap((slug) => {
    const project = getProjectBySlug(slug);
    return project ? [projectToPublicRecord(project)] : [];
  });
  return envelope({
    fallbackText: careerChapters
      .map(
        (chapter) => `${chapter.period}: ${chapter.title}. ${chapter.summary}`
      )
      .join("\n\n"),
    openuiText: `root = TimelineExperience("chapter-stack", "/bio", ${openUiStringList(projects.map((project) => project.id))})`,
    records: [
      {
        id: "/bio",
        kind: "profile",
        title: "Career story",
        url: `${siteOrigin}/bio`,
      },
      ...projects,
    ],
    requestId,
  });
};
