"use client";

import { createLibrary, defineComponent } from "@openuidev/react-lang";
import { EditorialProjectList } from "components/work/editorial-project-list";
import { getProjectBySlug } from "gaboesquivel";
import type { PublicRecord } from "lib/genui/envelope";
import { cn } from "lib/utils";
import Link from "next/link";
import { z } from "zod";

import { GenuiBookingFlow } from "./genui-booking-flow";
import { GenuiContactForm } from "./genui-contact-form";

const wideRail =
  "min-[48rem]:grid min-[48rem]:grid-cols-[1fr_1.1fr] min-[48rem]:gap-10";

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
    focus: z.string().optional(),
    sourceId: z.string(),
  }),
});

const ProjectExperience = defineComponent({
  component: ({ props }) => {
    const projects = props.projectIds.flatMap((id) => {
      const record = readGenuiRecords().find((item) => item.id === id);
      if (record?.kind !== "project") return [];
      const project = getProjectBySlug(record.slug);
      return project ? [project] : [];
    });
    if (!projects.length) {
      return <p className="text-neutral-400">No projects to show.</p>;
    }
    return <EditorialProjectList projects={projects} />;
  },
  description: "Project cards from canonical records.",
  name: "ProjectExperience",
  props: z.object({
    projectIds: z.array(z.string()),
  }),
});

const WritingExperience = defineComponent({
  component: ({ props }) => (
    <ul className="space-y-4">
      {props.postIds.map((id) => {
        const record = readGenuiRecords().find((item) => item.id === id);
        if (!record || record.kind !== "post") return null;
        return (
          <li key={id} className="border-t border-hairline pt-4">
            <Link
              className="text-lg text-white hover:text-accent"
              href={record.url}
            >
              {record.title}
            </Link>
            <p className="mt-2 text-sm text-neutral-400">{record.excerpt}</p>
          </li>
        );
      })}
    </ul>
  ),
  description: "Writing list from canonical records.",
  name: "WritingExperience",
  props: z.object({
    postIds: z.array(z.string()),
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
  props: z.object({}),
});

const ExperienceStack = defineComponent({
  component: ({ props }) => (
    <div className="space-y-10">
      {props.experienceKeys.map((key) => (
        <p key={key} className="text-sm text-neutral-400">
          {key}
        </p>
      ))}
    </div>
  ),
  description: "Ordered experiences for multi-intent results.",
  name: "ExperienceStack",
  props: z.object({
    experienceKeys: z.array(z.string()),
  }),
});

export const genuiLibrary = createLibrary({
  components: [
    Answer,
    AboutExperience,
    ProjectExperience,
    WritingExperience,
    ContactExperience,
    BookingExperience,
    CVExperience,
    ExperienceStack,
  ],
  root: "CVExperience",
});
