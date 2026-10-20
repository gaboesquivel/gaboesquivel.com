import { LatestPosts } from "components/blog/latest-posts";
import { PageSection, PageTitle, Prose } from "components/shared/page-layout";
import Link from "next/link";
import type { ReactNode } from "react";

import { ProjectEvidence } from "./project-evidence";

export function CapabilityPage({
  title,
  intro,
  sections,
  postSlugs,
  writingTitle,
  children,
}: {
  title: string;
  intro: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    projectSlugs: string[];
  }[];
  postSlugs: string[];
  writingTitle: string;
  children?: ReactNode;
}) {
  return (
    <section>
      <PageTitle>{title}</PageTitle>
      {intro.map((paragraph) => (
        <Prose key={paragraph}>{paragraph}</Prose>
      ))}

      {sections.map(({ heading, paragraphs, projectSlugs }) => (
        <PageSection key={heading} title={heading}>
          {paragraphs.map((paragraph) => (
            <Prose key={paragraph}>{paragraph}</Prose>
          ))}
          <ProjectEvidence slugs={projectSlugs} />
        </PageSection>
      ))}

      <LatestPosts title={writingTitle} slugs={postSlugs} />

      <PageSection title="See the work">
        <Prose>
          Browse the full{" "}
          <Link href="/work" className="prose-link">
            project archive
          </Link>{" "}
          for implementation details and technology choices.
        </Prose>
        {children}
      </PageSection>
    </section>
  );
}
