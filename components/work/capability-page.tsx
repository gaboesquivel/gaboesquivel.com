import { LatestPosts } from "components/blog/latest-posts";
import { InnerPageHero } from "components/shared/inner-page-hero";
import { PageSection, proseLink, Prose } from "components/shared/page-layout";
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
      <InnerPageHero description={intro[0]} title={title} />
      {intro.slice(1).map((paragraph) => (
        <Prose key={paragraph}>{paragraph}</Prose>
      ))}

      {sections.map(({ heading, paragraphs, projectSlugs }) => (
        <PageSection key={heading} title={heading}>
          {paragraphs.map((paragraph) => (
            <Prose key={paragraph}>{paragraph}</Prose>
          ))}
          <ProjectEvidence presentation="registry" slugs={projectSlugs} />
        </PageSection>
      ))}

      <LatestPosts slugs={postSlugs} title={writingTitle} variant="editorial" />

      <PageSection title="See the work">
        <Prose>
          Browse the full{" "}
          <Link href="/work" className={proseLink}>
            project archive
          </Link>{" "}
          for implementation details and technology choices.
        </Prose>
        {children}
      </PageSection>
    </section>
  );
}
