"use client";

import { createLibrary, defineComponent } from "@openuidev/react-lang";
import { getProjectBySlug } from "gaboesquivel";
import { allBlogs } from "lib/blog";
import { compositeNames, isCompositeName } from "lib/genui/composites";
import type { PublicRecord } from "lib/genui/envelope";
import { cn } from "lib/utils";
import Link from "next/link";
import { z } from "zod";

import { CapabilityShowcase } from "./capability-showcase";
import { GenuiBookingFlow } from "./genui-booking-flow";
import { GenuiContactForm } from "./genui-contact-form";
import { ProjectCompositeView } from "./project-composite-view";
import { WritingCompositeView } from "./writing-composite-view";

const wideRail =
  "min-[48rem]:grid min-[48rem]:grid-cols-[1fr_1.1fr] min-[48rem]:gap-10";

const compositeSchema = z.enum(compositeNames);

export const readGenuiRecords = () =>
  (globalThis as { __genuiRecords?: PublicRecord[] }).__genuiRecords ?? [];

export const setGenuiRecords = (records: PublicRecord[]) => {
  (globalThis as { __genuiRecords?: PublicRecord[] }).__genuiRecords = records;
};

const Answer = defineComponent({
  component: ({ props }) => (
    <div className="max-w-2xl space-y-4 text-base leading-relaxed text-neutral-200">
      <p>{props.body}</p>
      {props.sourceIds.length > 0 && (
        <ul className="space-y-2 text-sm text-neutral-400">
          {props.sourceIds.map((id) => {
            const record = readGenuiRecords().find((item) => item.id === id);
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
  ),
  description: "Short prose answer with source references.",
  name: "Answer",
  props: z.object({
    body: z.string(),
    sourceIds: z.array(z.string()).default([]),
  }),
});

const CVExperience = defineComponent({
  component: ({ props }) => {
    const record = readGenuiRecords().find(
      (item) => item.id === props.sourceId
    );
    const cv =
      record?.kind === "cv"
        ? record
        : readGenuiRecords().find((item) => item.kind === "cv");
    if (!cv || cv.kind !== "cv") {
      return <p className="text-neutral-400">CV unavailable.</p>;
    }
    if (props.composite === "cv-document") {
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
  },
  description: "CV focus and download links.",
  name: "CVExperience",
  props: z.object({
    composite: compositeSchema.default("cv-document"),
    focus: z.string().optional(),
    sourceId: z.string(),
  }),
});

const ProjectExperience = defineComponent({
  component: ({ props }) => {
    const composite = isCompositeName(props.composite)
      ? props.composite
      : "editorial-grid";
    const projects = props.projectIds.flatMap((id) => {
      const record = readGenuiRecords().find((item) => item.id === id);
      if (record?.kind !== "project") return [];
      const project = getProjectBySlug(record.slug);
      return project ? [project] : [];
    });
    return <ProjectCompositeView composite={composite} projects={projects} />;
  },
  description: "Project cards from canonical records.",
  name: "ProjectExperience",
  props: z.object({
    composite: compositeSchema.default("editorial-grid"),
    projectIds: z.array(z.string()),
  }),
});

const WritingExperience = defineComponent({
  component: ({ props }) => {
    const composite = isCompositeName(props.composite)
      ? props.composite
      : "dated-row";
    return (
      <WritingCompositeView
        composite={composite}
        postIds={props.postIds}
        records={readGenuiRecords()}
      />
    );
  },
  description: "Writing list from canonical records.",
  name: "WritingExperience",
  props: z.object({
    composite: compositeSchema.default("dated-row"),
    postIds: z.array(z.string()),
  }),
});

const CapabilityShowcaseExperience = defineComponent({
  component: ({ props }) => {
    const projects = props.projectIds.flatMap((id) => {
      const record = readGenuiRecords().find((item) => item.id === id);
      if (record?.kind !== "project") return [];
      const project = getProjectBySlug(record.slug);
      return project ? [project] : [];
    });
    return (
      <CapabilityShowcase
        domain={props.domain}
        projects={projects}
        records={readGenuiRecords()}
      />
    );
  },
  description: "Capability page diagram and evidence grid.",
  name: "CapabilityShowcaseExperience",
  props: z.object({
    domain: z.enum(["ai", "web3"]),
    projectIds: z.array(z.string()),
  }),
});

const AboutExperience = defineComponent({
  component: ({ props }) => {
    const record = readGenuiRecords().find(
      (item) => item.id === props.sourceId
    );
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
  },
  description: "About/profile context.",
  name: "AboutExperience",
  props: z.object({
    sourceId: z.string(),
  }),
});

const ContactExperience = defineComponent({
  component: ({ props }) => (
    <div className={cn(wideRail)}>
      <aside className="hidden text-sm text-neutral-400 min-[48rem]:block">
        <p>Send a note about hiring, a project, or collaboration.</p>
      </aside>
      <GenuiContactForm contextId={props.contextId} />
    </div>
  ),
  description: "Contact note form.",
  name: "ContactExperience",
  props: z.object({
    contextId: z.string(),
    composite: compositeSchema.optional(),
  }),
});

const BookingExperience = defineComponent({
  component: () => (
    <div className={cn(wideRail)}>
      <aside className="hidden text-sm text-neutral-400 min-[48rem]:block">
        <p>15- or 30-minute intro calls in US Mountain Time.</p>
      </aside>
      <GenuiBookingFlow />
    </div>
  ),
  description: "Booking flow with review step.",
  name: "BookingExperience",
  props: z.object({
    composite: compositeSchema.optional(),
  }),
});

const ExperienceStack = defineComponent({
  component: ({ props }) => (
    <div className="space-y-10">
      {props.segments.map((segment, index) => (
        <p key={`${segment}-${index}`} className="text-sm text-neutral-400">
          {segment}
        </p>
      ))}
    </div>
  ),
  description: "Ordered experiences for multi-intent results.",
  name: "ExperienceStack",
  props: z.object({
    segments: z.array(z.string()).default([]),
  }),
});

export const genuiLibrary = createLibrary({
  components: [
    Answer,
    AboutExperience,
    ProjectExperience,
    WritingExperience,
    CapabilityShowcaseExperience,
    ContactExperience,
    BookingExperience,
    CVExperience,
    ExperienceStack,
  ],
  root: "CVExperience",
});
