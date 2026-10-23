"use client";

import { getProjectBySlug } from "gaboesquivel";
import { isCompositeName } from "lib/genui/composites";
import { cn } from "lib/utils";
import Link from "next/link";

import { CapabilityShowcase } from "./capability-showcase";
import { GenuiBookingFlow } from "./genui-booking-flow";
import { GenuiContactForm } from "./genui-contact-form";
import { useGenuiRecords } from "./genui-record-context";
import { ProjectCompositeView } from "./project-composite-view";
import { WritingCompositeView } from "./writing-composite-view";

const wideRail =
  "min-w-0 max-w-full @min-[48rem]:grid @min-[48rem]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] @min-[48rem]:gap-10";

export const AnswerView = ({
  body,
  sourceIds,
}: {
  body: string;
  sourceIds: string[];
}) => {
  const records = useGenuiRecords();
  return (
    <div className="max-w-2xl space-y-4 text-base leading-relaxed text-neutral-200">
      <p>{body}</p>
      {sourceIds.length > 0 && (
        <ul className="space-y-2 text-sm text-neutral-400">
          {sourceIds.map((id) => {
            const record = records.find((item) => item.id === id);
            if (!record) return null;
            return (
              <li key={id}>
                <Link className="text-accent hover:underline" href={record.url}>
                  {record.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
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
  if (composite === "cv-document") {
    return (
      <div className="max-w-3xl space-y-6 text-sm text-neutral-300">
        <h3 className="text-xl font-semibold text-white">{cv.title}</h3>
        <p>
          Highlights, experience, skills, and articles match the{" "}
          <Link className="text-accent hover:underline" href={cv.url}>
            online résumé
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-4">
          <Link className="text-accent hover:underline" href={cv.url}>
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
        <Link className="text-accent hover:underline" href={cv.url}>
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
  domain,
  projectIds,
}: {
  composite: string;
  domain?: "ai" | "web3" | "all";
  projectIds: string[];
}) => {
  const records = useGenuiRecords();
  const resolvedComposite = isCompositeName(composite)
    ? composite
    : "editorial-grid";
  const projects = projectIds.flatMap((id) => {
    const record = records.find((item) => item.id === id);
    if (record?.kind !== "project") return [];
    const project = getProjectBySlug(record.slug);
    return project ? [project] : [];
  });
  return (
    <ProjectCompositeView
      composite={resolvedComposite}
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
  const records = useGenuiRecords();
  const resolvedComposite = isCompositeName(composite)
    ? composite
    : "dated-row";
  return (
    <WritingCompositeView
      composite={resolvedComposite}
      postIds={postIds}
      records={records}
    />
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
  const projects = projectIds.flatMap((id) => {
    const record = records.find((item) => item.id === id);
    if (record?.kind !== "project") return [];
    const project = getProjectBySlug(record.slug);
    return project ? [project] : [];
  });
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
      <Link className="text-accent hover:underline" href={record.url}>
        Read more
      </Link>
    </div>
  );
};

export const ContactExperienceView = ({ contextId }: { contextId: string }) => (
  <div className={cn("@container/genui", wideRail)}>
    <aside className="hidden text-sm text-neutral-400 @min-[48rem]:block">
      <p>Send a note about hiring, a project, or collaboration.</p>
    </aside>
    <GenuiContactForm contextId={contextId} />
  </div>
);

export const BookingExperienceView = () => (
  <div className={cn("@container/genui", wideRail)}>
    <aside className="hidden text-sm text-neutral-400 @min-[48rem]:block">
      <p>15- or 30-minute intro calls in US Mountain Time.</p>
    </aside>
    <GenuiBookingFlow />
  </div>
);

export const ExperienceStackView = ({ segments }: { segments: string[] }) => (
  <div className="space-y-10">
    {segments.map((segment, index) => (
      <p key={`${segment}-${index}`} className="text-sm text-neutral-400">
        {segment}
      </p>
    ))}
  </div>
);
