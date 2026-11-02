"use client";

import { siteProfile } from "lib/api/profile";
import { isComparisonDimension } from "lib/genui/comparison-dimensions";
import type { ComparisonDimension } from "lib/genui/comparison-dimensions";
import { isCompositeName } from "lib/genui/composites";
import { isParsedExperienceChild } from "lib/genui/contract/stack";
import { projectsFromPublicIds } from "lib/genui/project-from-id";
import { siteRelativePath } from "lib/site-path";
import { cn } from "lib/utils";
import Link from "next/link";

import { CapabilityShowcase } from "./capability-showcase";
import { CareerTimeline } from "./career-timeline";
import { CvPreview } from "./cv-preview";
import { EngagementOptions } from "./engagement-options";
import { EvidenceAnswer } from "./evidence-answer";
import { GenuiBookingFlow } from "./genui-booking-flow";
import { GenuiContactForm } from "./genui-contact-form";
import { useGenuiRecords } from "./genui-record-context";
import { ProjectCompositeView } from "./project-composite-view";
import { WritingCompositeView } from "./writing-composite-view";

const wideRail =
  "min-w-0 max-w-full @min-[48rem]:grid @min-[48rem]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] @min-[48rem]:gap-10";

const noShownIds: string[] = [];

export const AnswerView = ({
  body,
  shownIds = noShownIds,
  sourceIds,
}: {
  body: string;
  /** Records already rendered as evidence beside this answer; not relisted. */
  shownIds?: string[];
  sourceIds: string[];
}) => {
  const records = useGenuiRecords();
  const isEngagement =
    sourceIds.includes("/contact") &&
    sourceIds.includes("/cv") &&
    sourceIds.includes("booking");
  const listedIds = sourceIds.filter((id) => !shownIds.includes(id));
  const sourceLinks =
    listedIds.length > 0 && !isEngagement ? (
      <ul className="space-y-2 text-sm text-neutral-400">
        {listedIds.map((id) => {
          const record = records.find((item) => item.id === id);
          if (!record) return null;
          return (
            <li key={id}>
              <Link
                className="text-accent hover:underline"
                href={siteRelativePath(record.url) || record.url}
              >
                {record.title}
              </Link>
            </li>
          );
        })}
      </ul>
    ) : null;

  if (isEngagement) {
    return <EvidenceAnswer body={body} sources={<EngagementOptions />} />;
  }

  return (
    <div className="max-w-2xl space-y-4 text-base leading-relaxed text-neutral-200">
      <p>{body}</p>
      {sourceLinks}
    </div>
  );
};

export const CvExperienceView = ({
  composite,
  sourceId,
}: {
  composite: string;
  sourceId: string;
}) => {
  const records = useGenuiRecords();
  const record = records.find((item) => item.id === sourceId);
  const cv =
    record?.kind === "cv" ? record : records.find((item) => item.kind === "cv");
  if (!cv || cv.kind !== "cv") {
    return <p className="text-neutral-400">CV unavailable.</p>;
  }
  if (composite === "cv-preview" || composite === "cv-document") {
    if (composite === "cv-preview") {
      return <CvPreview focus={cv.variant} />;
    }
    return (
      <div className="max-w-3xl space-y-6 text-sm text-neutral-300">
        <h3 className="text-xl font-semibold text-white">{cv.title}</h3>
        <p>
          Highlights, experience, skills, and articles match the{" "}
          <Link
            className="text-accent hover:underline"
            href={siteRelativePath(cv.url) || cv.url}
          >
            online résumé
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            className="text-accent hover:underline"
            href={siteRelativePath(cv.url) || cv.url}
          >
            View online
          </Link>
          <a className="text-accent hover:underline" href={cv.pdfUrl}>
            Download PDF
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">{cv.title}</h3>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link
          className="text-accent hover:underline"
          href={siteRelativePath(cv.url) || cv.url}
        >
          View online
        </Link>
        <a className="text-accent hover:underline" href={cv.pdfUrl}>
          Download PDF
        </a>
      </div>
    </div>
  );
};

export const ProjectExperienceView = ({
  composite,
  dimensions,
  domain,
  projectIds,
}: {
  composite: string;
  dimensions?: ComparisonDimension[];
  domain?: "ai" | "web3" | "all";
  projectIds: string[];
}) => {
  const resolvedComposite = isCompositeName(composite)
    ? composite
    : "editorial-grid";
  const projects = projectsFromPublicIds(projectIds);
  return (
    <ProjectCompositeView
      composite={resolvedComposite}
      dimensions={dimensions}
      domain={domain}
      projectIds={projectIds}
      projects={projects}
    />
  );
};

export const WritingExperienceView = ({
  composite,
  postIds,
}: {
  composite: string;
  postIds: string[];
}) => {
  const resolvedComposite = isCompositeName(composite)
    ? composite
    : "dated-row";
  return (
    <WritingCompositeView composite={resolvedComposite} postIds={postIds} />
  );
};

export const CapabilityShowcaseExperienceView = ({
  domain,
  projectIds,
}: {
  domain: "ai" | "web3";
  projectIds: string[];
}) => {
  const records = useGenuiRecords();
  const projects = projectsFromPublicIds(projectIds);
  return (
    <CapabilityShowcase domain={domain} projects={projects} records={records} />
  );
};

export const AboutExperienceView = ({ sourceId }: { sourceId: string }) => {
  const records = useGenuiRecords();
  const record = records.find((item) => item.id === sourceId);
  if (!record) return null;
  return (
    <div className="max-w-2xl space-y-3 text-base leading-relaxed text-neutral-200">
      <h3 className="text-xl font-semibold text-white">{record.title}</h3>
      {"excerpt" in record && record.excerpt && (
        <p className="text-neutral-400">{record.excerpt}</p>
      )}
      <Link
        className="text-accent hover:underline"
        href={siteRelativePath(record.url) || record.url}
      >
        Read more
      </Link>
    </div>
  );
};

export const ContactExperienceView = ({ contextId }: { contextId: string }) => {
  const profile = siteProfile();
  return (
    <div className={cn("@container/genui", wideRail)}>
      <aside className="space-y-3 text-sm text-neutral-400 @min-[48rem]:block">
        <p>
          This form sends a note to Gabo about hiring, a project, or
          collaboration. Nothing is sent until you submit.
        </p>
        <p>
          Email:{" "}
          <a
            className="text-accent hover:underline"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </p>
      </aside>
      <GenuiContactForm contextId={contextId} />
    </div>
  );
};

export const BookingExperienceView = () => {
  const profile = siteProfile();
  return (
    <div className={cn("@container/genui", wideRail)}>
      <aside className="hidden space-y-3 text-sm text-neutral-400 @min-[48rem]:block">
        <p>
          Pick a 15- or 30-minute slot in {profile.timeZoneLabel}. Review your
          details before confirming—booking is not created until you approve.
        </p>
      </aside>
      <GenuiBookingFlow />
    </div>
  );
};

const evidenceIdsOf = (child: unknown) => {
  if (!isParsedExperienceChild(child) || child.typeName === "Answer") return [];
  const ids = child.props.projectIds ?? child.props.postIds;
  return Array.isArray(ids) ? ids.map(String) : [];
};

const renderStackChild = (
  child: unknown,
  index: number,
  shownIds: string[]
) => {
  if (!isParsedExperienceChild(child)) return null;
  const key = `${child.typeName}-${index}`;
  const props = child.props;
  if (child.typeName === "Answer") {
    return (
      <AnswerView
        key={key}
        body={String(props.body ?? "")}
        shownIds={shownIds}
        sourceIds={
          Array.isArray(props.sourceIds) ? props.sourceIds.map(String) : []
        }
      />
    );
  }
  if (child.typeName === "ProjectExperience") {
    return (
      <ProjectExperienceView
        key={key}
        composite={String(props.composite ?? "editorial-grid")}
        dimensions={
          Array.isArray(props.dimensions)
            ? props.dimensions.filter(isComparisonDimension)
            : undefined
        }
        domain={
          props.domain === "ai" ||
          props.domain === "web3" ||
          props.domain === "all"
            ? props.domain
            : undefined
        }
        projectIds={
          Array.isArray(props.projectIds) ? props.projectIds.map(String) : []
        }
      />
    );
  }
  if (child.typeName === "WritingExperience") {
    return (
      <WritingExperienceView
        key={key}
        composite={String(props.composite ?? "dated-row")}
        postIds={Array.isArray(props.postIds) ? props.postIds.map(String) : []}
      />
    );
  }
  if (child.typeName === "CVExperience") {
    return (
      <CvExperienceView
        key={key}
        composite={String(props.composite ?? "cv-preview")}
        sourceId={String(props.sourceId ?? "")}
      />
    );
  }
  if (child.typeName === "TimelineExperience") {
    return (
      <CareerTimeline
        key={key}
        projectIds={
          Array.isArray(props.projectIds) ? props.projectIds.map(String) : []
        }
        sourceId={String(props.sourceId ?? "/bio")}
      />
    );
  }
  if (child.typeName === "ContactExperience") {
    return (
      <ContactExperienceView
        key={key}
        contextId={String(props.contextId ?? "profile")}
      />
    );
  }
  if (child.typeName === "BookingExperience") {
    return <BookingExperienceView key={key} />;
  }
  if (child.typeName === "CapabilityShowcaseExperience") {
    return (
      <CapabilityShowcaseExperienceView
        key={key}
        domain={props.domain === "web3" ? "web3" : "ai"}
        projectIds={
          Array.isArray(props.projectIds) ? props.projectIds.map(String) : []
        }
      />
    );
  }
  return null;
};

export const ExperienceStackView = ({ items }: { items: unknown[] }) => {
  const shownIds = items.flatMap(evidenceIdsOf);
  return (
    <div className="space-y-10">
      {items.map((child, index) => renderStackChild(child, index, shownIds))}
    </div>
  );
};
