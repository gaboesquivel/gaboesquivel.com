import { LatestPosts } from "components/blog/latest-posts";
import { InnerPageHero } from "components/shared/inner-page-hero";
import { PageSection, proseLink, Prose } from "components/shared/page-layout";
import { ProjectsMasonry } from "components/work/projects-masonry";
import type { TechStackItemWithProjects } from "gaboesquivel";
import { sortProjectsForTech } from "lib/tech-evidence";
import Link from "next/link";

const officialLinkLabel = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function TechStack({
  tech,
}: {
  tech: TechStackItemWithProjects;
}) {
  const projects = sortProjectsForTech({
    experience: tech.experience,
    projects: tech.projects,
  });

  return (
    <section>
      <InnerPageHero
        compact
        description={tech.description}
        title={tech.name}
        trail={[{ href: "/tech", label: "tech" }, { label: tech.name }]}
      />

      {tech.experience.length > 0 ? (
        <PageSection title="Implementation">
          {tech.experience.map((item) => (
            <Prose key={item}>{item}</Prose>
          ))}
        </PageSection>
      ) : null}

      <ProjectsMasonry
        identifier={tech.slug}
        preserveOrder
        projects={projects}
        variant="editorial"
      />

      <LatestPosts tech={tech.tag} title="Related posts" variant="editorial" />

      {tech.link ? (
        <p className="mt-6 text-sm text-neutral-400">
          <a
            href={tech.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {officialLinkLabel(tech.link)}
          </a>
        </p>
      ) : null}

      <PageSection title="See the work">
        <Prose>
          Explore the{" "}
          <Link href="/work" className={proseLink}>
            project portfolio
          </Link>{" "}
          for implementation details, systems, and technology.
        </Prose>
      </PageSection>
    </section>
  );
}
