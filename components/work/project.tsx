import { InnerPageHero } from "components/shared/inner-page-hero";
import {
  PageSection,
  proseLink,
  Prose,
  projectMedia,
} from "components/shared/page-layout";
import {
  blockSpacing,
  editorialLink,
  projectRole,
  proseClass,
  readingMeasure,
} from "components/shared/spacing";
import { VimeoPlayer } from "components/vimeo";
import { YouTubePlayer } from "components/youtube";
import { getTechStackByTag } from "gaboesquivel";
import type { Project, Tag } from "gaboesquivel";
import { allBlogs } from "lib/blog";
import { comparePublishedAtDesc } from "lib/blog-order";
import { siteRelativePath } from "lib/site-path";
import { cn } from "lib/utils";
import { workCoverSizes } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LatestPosts } from "../blog/latest-posts";
import { ProjectHero } from "./project-hero";

const capabilityTypeMap: Record<
  string,
  { display: string; url: string } | undefined
> = {
  ai: { display: "AI", url: "/ai" },
  backend: { display: "Backend", url: "/backend" },
  frontend: { display: "Frontend", url: "/frontend" },
  fullstack: { display: "Fullstack", url: "/fullstack" },
  mobile: { display: "React Native", url: "/mobile" },
  web3: { display: "Web3", url: "/web3" },
};

const blogSummaryBySlug = new Map(
  allBlogs.map((post) => [post.slug, post.summary])
);

export function ProjectDetails({
  project,
  full = false,
}: {
  project: Project;
  full?: boolean;
}) {
  const validExperienceTypes = (project.type ?? []).flatMap((type) => {
    const mapped = capabilityTypeMap[type];
    return mapped ? [mapped] : [];
  });

  const hasProjectLinks =
    full &&
    Boolean(project.repo || (project.link && project.link !== project.repo));

  const primaryImageHref = full
    ? (project.link ?? null)
    : `/project/${project.slug}`;

  const relatedSlugs =
    full && project.related && project.related.length > 0
      ? [...project.related]
          .sort(comparePublishedAtDesc)
          .map((post) => post.url)
      : undefined;

  return (
    <div className="mb-10">
      <InnerPageHero
        className={full && project.role ? "mb-3" : undefined}
        compact
        description={
          full && project.role
            ? undefined
            : project.description.replaceAll("\n", " ")
        }
        title={project.title}
        trail={[{ href: "/work", label: "work" }, { label: project.title }]}
      />

      {full && project.role ? (
        <>
          <p className={cn(readingMeasure, projectRole)}>{project.role}</p>
          <p className={cn(proseClass, "mt-4 max-w-[55ch] text-neutral-300")}>
            {project.description.replaceAll("\n", " ")}
          </p>
        </>
      ) : null}

      <div className="mt-8">
        <ProjectHero href={primaryImageHref} preload={full} project={project} />
      </div>

      {full && project.story && project.story.length > 0 ? (
        <div className={cn(readingMeasure, "mt-12")}>
          <PageSection title="Implementation">
            {project.story.map((paragraph) => (
              <Prose
                key={`${project.slug}-story-${paragraph}`}
                className="mt-4"
              >
                {paragraph}
              </Prose>
            ))}
          </PageSection>
        </div>
      ) : null}

      {full && project.video ? (
        <div className={cn(projectMedia, "mt-8")}>
          {project.video.includes("youtube") ? (
            <YouTubePlayer title={project.title} url={project.video} />
          ) : project.video.includes("vimeo") ? (
            <VimeoPlayer title={project.title} url={project.video} />
          ) : null}
        </div>
      ) : null}

      {full && project.achievements && project.achievements.length > 0 ? (
        <div className={cn(readingMeasure, "mt-12")}>
          <PageSection title="Selected contributions">
            <ul className="list-disc space-y-4 pl-5">
              {project.achievements.map((achievement) => (
                <li
                  key={`${project.slug}-achievement-${achievement}`}
                  className="text-base leading-relaxed"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </PageSection>
        </div>
      ) : null}

      {full && project.images && project.images.length > 0 ? (
        <div className="mt-8 space-y-6">
          {project.images.map((image) => (
            <div
              key={image}
              className="relative aspect-video overflow-hidden rounded-lg bg-black"
            >
              <Image
                src={siteRelativePath(image)}
                alt={project.title}
                fill
                sizes={workCoverSizes}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      ) : null}

      {hasProjectLinks ? (
        <div className={cn(readingMeasure, "mt-12")}>
          <PageSection title="Project links">
            {project.link && project.link !== project.repo ? (
              <p className={cn(blockSpacing, "text-sm")}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(proseLink, "break-all")}
                >
                  {project.link}
                </a>
              </p>
            ) : null}
            {project.repo ? (
              <p className="text-sm">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(proseLink, "break-all")}
                >
                  {project.repo}
                </a>
              </p>
            ) : null}
          </PageSection>
        </div>
      ) : null}

      {full ? (
        <div className={cn(readingMeasure, "mt-12")}>
          <PageSection title="Technologies">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {project.tech.map((tech) => {
                const techItem = getTechStackByTag(tech as Tag);
                if (!techItem) {
                  return null;
                }
                return (
                  <li key={`${project.slug}-${techItem.slug}`}>
                    <Link
                      href={`/tech/${techItem.slug}`}
                      className={editorialLink}
                    >
                      {techItem.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </PageSection>
        </div>
      ) : null}

      {full && validExperienceTypes.length > 0 ? (
        <div className={cn(readingMeasure, "mt-12")}>
          <PageSection title="Experience">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {validExperienceTypes.map((item) => (
                <li key={`${project.slug}-type-${item.url}`}>
                  <Link href={item.url} className={editorialLink}>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </PageSection>
        </div>
      ) : null}

      {full &&
        (relatedSlugs && relatedSlugs.length > 0 ? (
          <LatestPosts
            slugs={relatedSlugs}
            title="Related writing"
            variant="editorial"
          />
        ) : (
          <LatestPosts variant="editorial" />
        ))}
    </div>
  );
}
