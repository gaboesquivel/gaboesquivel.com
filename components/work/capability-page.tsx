import { LatestPosts } from "components/blog/latest-posts";
import { EditorialSection } from "components/interior/editorial-section";
import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from "components/interior/split-section";
import { PageSection, proseLink, Prose } from "components/shared/page-layout";
import Link from "next/link";
import type { ReactNode } from "react";

import { ProjectEvidence } from "./project-evidence";

interface ChapterLayout {
  mediaPosition: "left" | "right";
  textSpan: 4 | 5 | 6;
  mediaSpan: 5 | 6 | 7;
}

const chapterLayouts: ChapterLayout[] = [
  { mediaPosition: "right", textSpan: 5, mediaSpan: 6 },
  { mediaPosition: "left", textSpan: 4, mediaSpan: 7 },
  { mediaPosition: "right", textSpan: 6, mediaSpan: 5 },
  { mediaPosition: "left", textSpan: 5, mediaSpan: 6 },
  { mediaPosition: "right", textSpan: 4, mediaSpan: 7 },
];

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
    <InteriorPageShell>
      <PageIntro description={intro[0]} eyebrow="Capabilities" title={title} />
      {intro.slice(1).map((paragraph) => (
        <Prose key={paragraph}>{paragraph}</Prose>
      ))}

      {sections.map(({ heading, paragraphs, projectSlugs }, index) => {
        const layout = chapterLayouts[index % chapterLayouts.length];
        const chapterNumber = String(index + 1).padStart(2, "0");

        const hasEvidence = projectSlugs.length > 0;

        return (
          <EditorialSection key={heading} label={chapterNumber} title={heading}>
            {hasEvidence ? (
              <SplitSection sectionSpacing={false}>
                <SplitSectionContent
                  mediaPosition={layout.mediaPosition}
                  span={layout.textSpan}
                >
                  {paragraphs.map((paragraph) => (
                    <Prose key={paragraph} className="first:mt-0">
                      {paragraph}
                    </Prose>
                  ))}
                </SplitSectionContent>
                <SplitSectionMedia
                  mediaPosition={layout.mediaPosition}
                  span={layout.mediaSpan}
                >
                  <ProjectEvidence
                    columns={1}
                    presentation="registry"
                    slugs={projectSlugs}
                  />
                </SplitSectionMedia>
              </SplitSection>
            ) : (
              <div className="min-w-0">
                {paragraphs.map((paragraph) => (
                  <Prose key={paragraph} className="first:mt-0">
                    {paragraph}
                  </Prose>
                ))}
              </div>
            )}
          </EditorialSection>
        );
      })}

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
    </InteriorPageShell>
  );
}
