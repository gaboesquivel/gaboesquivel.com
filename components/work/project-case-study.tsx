import { LatestPosts } from "components/blog/latest-posts";
import { EditorialSection } from "components/interior/editorial-section";
import { FullBleedMedia } from "components/interior/full-bleed-media";
import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import { SectionLabel } from "components/interior/section-label";
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from "components/interior/split-section";
import {
  PageSection,
  proseLink,
  Prose,
  projectMedia,
} from "components/shared/page-layout";
import { editorialLink, projectRole } from "components/shared/spacing";
import { VimeoPlayer } from "components/vimeo";
import { YouTubePlayer } from "components/youtube";
import { getTechStackByTag } from "gaboesquivel";
import type { Project, Tag } from "gaboesquivel";
import { comparePublishedAtDesc } from "lib/blog-order";
import { siteRelativePath } from "lib/site-path";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";

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

export function ProjectCaseStudy({
  project,
  context = "page",
}: {
  project: Project;
  /** In-panel GenUI search uses tighter intro and section rhythm. */
  context?: "page" | "genui";
}) {
  const genui = context === "genui";
  const sectionGap = genui ? "mt-8 lg:mt-10" : undefined;
  const validExperienceTypes = (project.type ?? []).flatMap((type) => {
    const mapped = capabilityTypeMap[type];
    return mapped ? [mapped] : [];
  });

  const hasProjectLinks = Boolean(
    project.repo || (project.link && project.link !== project.repo)
  );

  const primaryImageHref = project.link ?? null;

  const relatedSlugs =
    project.related && project.related.length > 0
      ? [...project.related]
          .sort(comparePublishedAtDesc)
          .map((post) => post.url)
      : undefined;

  const storyLead = project.story?.[0];
  const storyRest = project.story?.slice(1) ?? [];

  return (
    <InteriorPageShell>
      <PageIntro
        compact
        density={genui ? "panel" : "default"}
        description={project.description.replaceAll("\n", " ")}
        title={project.title}
        trail={[{ href: "/work", label: "work" }, { label: project.title }]}
      >
        {genui && (project.role || project.year) ? (
          <div className="mt-4 space-y-1">
            {project.role ? (
              <p className={cn(projectRole, "max-w-3xl")}>{project.role}</p>
            ) : null}
            {project.year ? (
              <p className="text-sm text-neutral-500">{project.year}</p>
            ) : null}
          </div>
        ) : null}
      </PageIntro>

      {!genui && project.role ? (
        <p className={cn(projectRole, "mt-2 max-w-3xl")}>{project.role}</p>
      ) : null}
      {!genui && project.year ? (
        <p className="mt-3 text-sm text-neutral-500">{project.year}</p>
      ) : null}

      <FullBleedMedia className={genui ? "mt-6" : "mt-10"}>
        <ProjectHero href={primaryImageHref} preload project={project} />
      </FullBleedMedia>

      {storyLead ? (
        <EditorialSection className={sectionGap} label="Context">
          <SplitSection sectionSpacing={false}>
            <SplitSectionContent mediaPosition="right" span={5}>
              <Prose className="mt-0">{storyLead}</Prose>
              {storyRest.map((paragraph) => (
                <Prose key={`${project.slug}-story-${paragraph}`}>
                  {paragraph}
                </Prose>
              ))}
            </SplitSectionContent>
            {project.achievements && project.achievements.length > 0 ? (
              <SplitSectionMedia mediaPosition="right" span={6}>
                <SectionLabel className="mb-3">
                  Selected contributions
                </SectionLabel>
                <ul className="list-disc space-y-4 pl-5 text-base leading-relaxed">
                  {project.achievements.map((achievement) => (
                    <li key={`${project.slug}-achievement-${achievement}`}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </SplitSectionMedia>
            ) : null}
          </SplitSection>
        </EditorialSection>
      ) : null}

      {!storyLead && project.achievements && project.achievements.length > 0 ? (
        <PageSection className={sectionGap} title="Selected contributions">
          <ul className="max-w-3xl list-disc space-y-4 pl-5 text-base leading-relaxed">
            {project.achievements.map((achievement) => (
              <li key={`${project.slug}-achievement-${achievement}`}>
                {achievement}
              </li>
            ))}
          </ul>
        </PageSection>
      ) : null}

      {project.video ? (
        <div className={cn(projectMedia, "mt-12 max-w-4xl")}>
          {project.video.includes("youtube") ? (
            <YouTubePlayer title={project.title} url={project.video} />
          ) : project.video.includes("vimeo") ? (
            <VimeoPlayer title={project.title} url={project.video} />
          ) : null}
        </div>
      ) : null}

      {project.images && project.images.length > 0 ? (
        <EditorialSection className={sectionGap} title="Artifacts">
          <div className="space-y-10">
            {project.images.map((image, index) => (
              <div
                key={image}
                className={cn(
                  "relative overflow-hidden rounded-lg bg-black",
                  index % 2 === 1 ? "ml-auto max-w-4xl" : "max-w-5xl"
                )}
              >
                <div className="relative aspect-video w-full">
                  <Image
                    alt={project.title}
                    className="object-contain"
                    fill
                    sizes="(max-width: 1023px) 100vw, min(80rem, 90vw)"
                    src={siteRelativePath(image)}
                  />
                </div>
              </div>
            ))}
          </div>
        </EditorialSection>
      ) : null}

      {hasProjectLinks ? (
        <PageSection className={sectionGap} title="Project links">
          {project.link && project.link !== project.repo ? (
            <p className="text-sm">
              <a
                className={cn(proseLink, "break-all")}
                href={project.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {project.link}
              </a>
            </p>
          ) : null}
          {project.repo ? (
            <p className="mt-4 text-sm">
              <a
                className={cn(proseLink, "break-all")}
                href={project.repo}
                rel="noopener noreferrer"
                target="_blank"
              >
                {project.repo}
              </a>
            </p>
          ) : null}
        </PageSection>
      ) : null}

      {project.tech.length > 0 ? (
        <PageSection className={sectionGap} title="Technologies">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {project.tech.map((tech) => {
              const techItem = getTechStackByTag(tech as Tag);
              if (!techItem) {
                return null;
              }
              return (
                <li key={`${project.slug}-${techItem.slug}`}>
                  <Link
                    className={editorialLink}
                    href={`/tech/${techItem.slug}`}
                  >
                    {techItem.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </PageSection>
      ) : null}

      {validExperienceTypes.length > 0 ? (
        <PageSection className={sectionGap} title="Experience">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {validExperienceTypes.map((item) => (
              <li key={`${project.slug}-type-${item.url}`}>
                <Link className={editorialLink} href={item.url}>
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>
      ) : null}

      {relatedSlugs && relatedSlugs.length > 0 ? (
        <LatestPosts
          slugs={relatedSlugs}
          title="Related writing"
          variant="editorial"
        />
      ) : (
        <LatestPosts variant="editorial" />
      )}
    </InteriorPageShell>
  );
}
