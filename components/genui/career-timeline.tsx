"use client";

import {
  ctaLink,
  editorialLink,
  sectionTitle,
} from "components/shared/spacing";
import { ProjectCover } from "components/work/editorial-work-card";
import { getProjectBySlug } from "gaboesquivel";
import type { CareerChapter } from "lib/bio/career-timeline";
import { careerChapters } from "lib/bio/career-timeline";
import { cn } from "lib/utils";
import Link from "next/link";
import { useId } from "react";

import { useGenuiRecords } from "./genui-record-context";

export function TimelineChapter({
  chapter,
  id,
  projectIds,
}: {
  chapter: CareerChapter;
  id: string;
  projectIds: string[];
}) {
  const projects = chapter.projectSlugs.flatMap((slug) => {
    const project = projectIds.includes(`/project/${slug}`)
      ? getProjectBySlug(slug)
      : undefined;
    return project ? [project] : [];
  });
  const lead = projects[0];
  return (
    <li className="relative min-w-0 border-l border-hairline pb-14 pl-6 last:pb-0 @min-[48rem]:pl-10">
      <span
        aria-hidden="true"
        className="absolute top-1 -left-[5px] size-[9px] rounded-full bg-accent"
      />
      <article
        id={id}
        aria-labelledby={`${id}-title`}
        tabIndex={-1}
        className="scroll-mt-28 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <p className="mb-3 text-sm text-accent">{chapter.period}</p>
        <div className="grid min-w-0 gap-6 @min-[48rem]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] @min-[48rem]:gap-10">
          <div className="min-w-0">
            <h3 id={`${id}-title`} className={cn(sectionTitle, "text-balance")}>
              {chapter.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-neutral-300">
              {chapter.summary}
            </p>
            <details className="group mt-5">
              <summary className="w-fit cursor-pointer rounded-sm py-2 text-sm text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                Read the full story
                <span className="sr-only">: {chapter.title}</span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-neutral-300">
                {chapter.detail}
              </p>
              <ul className="mt-5 space-y-4">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link className={ctaLink} href={`/project/${project.slug}`}>
                      {project.title} →
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                      {project.description}
                    </p>
                  </li>
                ))}
              </ul>
            </details>
          </div>
          {lead && (
            <Link
              href={`/project/${lead.slug}`}
              className={cn(
                editorialLink,
                "block min-w-0 self-start rounded-lg"
              )}
              aria-label={`View ${lead.title}`}
            >
              <ProjectCover
                slug={lead.slug}
                className="aspect-[16/10] border border-hairline"
                sizes="(max-width: 767px) 90vw, 480px"
              />
              <p className="mt-3 text-sm text-neutral-400">
                {lead.title}{" "}
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              </p>
            </Link>
          )}
        </div>
      </article>
    </li>
  );
}

export function CareerTimeline({
  sourceId,
  projectIds,
}: {
  sourceId: string;
  projectIds: string[];
}) {
  const prefix = useId();
  const records = useGenuiRecords();
  const source = records.find(
    (record) => record.id === sourceId && record.kind === "profile"
  );
  if (!source || source.id !== "/bio") return null;
  const groundedProjectIds = projectIds.filter((id) =>
    records.some((record) => record.id === id && record.kind === "project")
  );
  return (
    <section
      className="@container min-w-0 text-white"
      aria-labelledby={`${prefix}-title`}
      data-career-timeline
    >
      <header className="max-w-[65ch]">
        <h2
          id={`${prefix}-title`}
          className="text-3xl font-semibold tracking-tight @min-[48rem]:text-4xl"
        >
          My journey
        </h2>
        <p className="mt-5 text-base leading-relaxed text-neutral-300">
          From web interfaces and a JavaScript community to mobile banking,
          blockchain systems, and intelligent interfaces.
        </p>
      </header>
      <nav aria-label="Career chapters" className="my-10">
        <ol className="grid grid-cols-2 gap-x-4 gap-y-6 @min-[36rem]:grid-cols-4">
          {careerChapters.map((chapter) => (
            <li key={chapter.id} className="border-t border-hairline pt-3">
              <a
                className="block rounded-sm py-1 text-sm text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                href={`#${prefix}-${chapter.id}`}
              >
                <span className="mb-2 block text-lg text-accent">
                  {chapter.year}
                </span>
                {chapter.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <ol className="ml-1">
        {careerChapters.map((chapter) => (
          <TimelineChapter
            key={chapter.id}
            chapter={chapter}
            id={`${prefix}-${chapter.id}`}
            projectIds={groundedProjectIds}
          />
        ))}
      </ol>
      <footer className="mt-10 flex flex-wrap gap-6 text-sm">
        <Link className={ctaLink} href="/bio">
          Read my career story →
        </Link>
        <Link className={ctaLink} href="/cv">
          View résumé / CV →
        </Link>
      </footer>
    </section>
  );
}
