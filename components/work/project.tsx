import {
  IndexHeading,
  PageSection,
  Prose,
  projectMedia,
} from "components/shared/page-layout";
import { blockSpacing } from "components/shared/spacing";
import { VimeoPlayer } from "components/vimeo";
import { YouTubePlayer } from "components/youtube";
import { getTechStackByTag } from "gaboesquivel";
import type { Project, Tag } from "gaboesquivel";
import { allBlogs } from "lib/blog";
import { comparePublishedAtDesc } from "lib/blog-order";
import { siteRelativePath } from "lib/site-path";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LatestPosts } from "../blog/latest-posts";
import { PostGrid } from "../blog/posts-grid";

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

const projectImageSizes = "(max-width: 768px) 100vw, 896px";

const blogSummaryBySlug = new Map(
  allBlogs.map((post) => [post.slug, post.summary])
);

const ProjectImage = ({ project, src }: { project: Project; src: string }) => (
  <div className={projectMedia}>
    <Image
      src={src}
      alt={project.title}
      fill={true}
      sizes={projectImageSizes}
      style={{ objectFit: "cover" }}
    />
  </div>
);

export function ProjectDetails({
  project,
  full = false,
}: {
  project: Project;
  full?: boolean;
}) {
  const primarySrc = siteRelativePath(project.image);
  const validExperienceTypes = (project.type ?? []).flatMap((type) => {
    const mapped = capabilityTypeMap[type];
    return mapped ? [mapped] : [];
  });

  const hasProjectLinks =
    full &&
    Boolean(project.repo || (project.link && project.link !== project.repo));

  const primaryImage = <ProjectImage project={project} src={primarySrc} />;
  const primaryImageHref = full
    ? (project.link ?? null)
    : `/project/${project.slug}`;

  return (
    <div className="mb-10">
      <IndexHeading>{project.title}</IndexHeading>

      {project.description.split("\n").map((item) => (
        <Prose key={`${project.slug}-${item}`}>
          {item}
          <br />
        </Prose>
      ))}

      {primaryImageHref ? (
        <Link
          href={primaryImageHref}
          {...(full && project.link
            ? {
                "aria-label": `Open ${project.title} website`,
                rel: "noopener noreferrer",
                target: "_blank",
              }
            : {})}
        >
          {primaryImage}
        </Link>
      ) : (
        primaryImage
      )}

      {full && project.story && project.story.length > 0 ? (
        <PageSection title="Implementation">
          {project.story.map((paragraph) => (
            <Prose key={`${project.slug}-story-${paragraph}`} className="mt-4">
              {paragraph}
            </Prose>
          ))}
        </PageSection>
      ) : null}

      {full && project.video ? (
        <div className={projectMedia}>
          {project.video.includes("youtube") ? (
            <YouTubePlayer title={project.title} url={project.video} />
          ) : project.video.includes("vimeo") ? (
            <VimeoPlayer title={project.title} url={project.video} />
          ) : null}
        </div>
      ) : null}

      {full && project.achievements && project.achievements.length > 0 ? (
        <PageSection title="Selected contributions">
          <ol className="list-inside list-disc space-y-4">
            {project.achievements.map((achievement) => (
              <li
                key={`${project.slug}-achievement-${achievement}`}
                className="text-base"
              >
                {achievement}
              </li>
            ))}
          </ol>
        </PageSection>
      ) : null}

      {full && project.images && project.images.length > 0 ? (
        <div className="mb-4">
          {project.images.map((image) => (
            <div key={image} className={projectMedia}>
              <Image
                src={siteRelativePath(image)}
                alt={project.title}
                fill={true}
                sizes={projectImageSizes}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      ) : null}

      {hasProjectLinks ? (
        <PageSection title="Project links">
          {project.link && project.link !== project.repo ? (
            <p className={cn(blockSpacing, "text-sm")}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all"
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
                className="break-all"
              >
                {project.repo}
              </a>
            </p>
          ) : null}
        </PageSection>
      ) : null}

      {full ? (
        <PageSection title="Technologies">
          <p className="text-sm">
            {project.tech.map((tech) => {
              const techItem = getTechStackByTag(tech as Tag);
              if (!techItem) {
                return null;
              }
              return (
                <Link
                  href={`/tech/${techItem.slug}`}
                  key={`${project.slug}-${techItem.slug}`}
                >
                  <span>
                    {techItem.name}
                    {tech === project.tech.at(-1) ? "" : ", "}
                  </span>
                </Link>
              );
            })}
          </p>
        </PageSection>
      ) : null}

      {full && validExperienceTypes.length > 0 ? (
        <PageSection title="Experience">
          <p className="text-sm">
            {validExperienceTypes.map((item) => (
              <React.Fragment key={`${project.slug}-type-${item.url}`}>
                <Link href={item.url}>
                  <span>{item.display}</span>
                </Link>
                {item === validExperienceTypes.at(-1) ? "" : ", "}
              </React.Fragment>
            ))}
          </p>
        </PageSection>
      ) : null}

      {full &&
        (project.related && project.related.length > 0 ? (
          <PostGrid
            posts={[...project.related]
              .sort(comparePublishedAtDesc)
              .map((post) => ({
                publishedAt: post.publishedAt,
                slug: post.url,
                summary: blogSummaryBySlug.get(post.url),
                title: post.title,
              }))}
            title="Related writing"
          />
        ) : (
          <LatestPosts />
        ))}
    </div>
  );
}
