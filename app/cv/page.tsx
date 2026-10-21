import "./cv.css";
import { LatestPosts } from "components/blog/latest-posts";
import {
  PageSection,
  PageTitle,
  Prose,
  proseClass,
  sectionHeadingRow,
  sectionSpacing,
  sectionTitle,
  titleSpacing,
} from "components/shared/page-layout";
import { markdownSiblingPath } from "lib/markdown-sibling";
import { cn } from "lib/utils";
import type { Metadata } from "next";

import { PrintButton } from "../../components/print-button";
import { ContactInfo } from "../../components/shared/contact-info";
import { cvPdfFile, cvSectionBreak, resolveCv } from "./variants";

interface CvPageProps {
  searchParams?: Promise<{
    focus?: string | string[];
    preview?: string | string[];
  }>;
}

const bulletItemClass =
  "cv-content cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•']";

const bulletListClass = cn(proseClass, "mb-0 list-none pl-0");

const previewParam = ({ preview }: { preview?: string | string[] }) =>
  Array.isArray(preview) ? preview[0] : preview;

export default async function CVPage({ searchParams }: CvPageProps) {
  const resolved = await searchParams;
  const { key, variant, entries } = resolveCv({ focus: resolved?.focus });
  const isPreviewPrint =
    previewParam({ preview: resolved?.preview }) === "print";

  return (
    <section
      className="cv-content cv-print m-0 p-0 print:block print:w-full print:max-w-none"
      {...(isPreviewPrint ? { "data-cv-preview": "print" } : {})}
    >
      {/* Bundlers ignore `@import … print`; load print tokens via real media attr */}
      <link
        rel="stylesheet"
        href="/cv-print.css"
        media={isPreviewPrint ? "all" : "print"}
      />
      <div className="no-break-inside" data-cv-block="intro">
        <header
          className={cn(
            "cv-header flex flex-col",
            titleSpacing,
            "print:mb-0 preview-print:mb-0"
          )}
        >
          <PageTitle className="mb-0 flex items-baseline justify-between leading-none">
            <span>Gabo Esquivel</span>
            <PrintButton file={cvPdfFile({ key })} />
          </PageTitle>
          <p className="cv-print-professional-title mt-0 mb-0 font-medium tracking-tight text-neutral-400">
            {variant.professionalTitle}
          </p>
        </header>

        <div className="cv-summary">
          <Prose className="cv-content">{variant.summary}</Prose>
        </div>
        <PageSection
          className="print:mt-0 preview-print:mt-0"
          title="Highlights"
        >
          <ul className={bulletListClass}>
            {variant.highlights.map((highlight) => (
              <li className={bulletItemClass} key={highlight}>
                {highlight}
              </li>
            ))}
          </ul>
        </PageSection>
      </div>

      <div className="cv-experience-list list-inside list-none space-y-8 print:space-y-0 preview-print:space-y-0">
        {entries.map((exp, index) => (
          <div
            key={exp.company}
            data-cv-block={exp.company}
            className={`${exp.pageBreak ? "page-break-before " : ""}cv-entry-group no-break-inside${index === 0 ? ` ${sectionSpacing} print:mt-0 preview-print:mt-0` : ""}`}
          >
            {index === 0 ? (
              <div className={sectionHeadingRow}>
                <h2 className={sectionTitle}>Experience</h2>
              </div>
            ) : null}
            <div className="cv-entry">
              <h3 className="cv-entry-title mb-1 text-xl font-bold">
                {exp.title}, {exp.company}
              </h3>
              {exp.title ? (
                <p className="exp-duration cv-entry-meta mb-4 text-sm text-neutral-400">
                  {exp.location} • {exp.type} • {exp.duration}
                </p>
              ) : null}

              <p
                className={cn(
                  proseClass,
                  "exp-description cv-content cv-entry-description mb-4"
                )}
              >
                {exp.description}
              </p>
              <ul
                className={cn(
                  proseClass,
                  "cv-content cv-entry-achievements mb-4 list-none pl-0"
                )}
              >
                {exp.achievements.map((achievement) => (
                  <li className={bulletItemClass} key={achievement}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {variant.also ? (
        <div
          data-cv-block="also"
          className={`${cvSectionBreak({ id: "also", key })}no-break-inside`}
        >
          <PageSection
            className="print:mt-0 preview-print:mt-0"
            title="Additional experience"
          >
            <Prose className="cv-content cv-also">{variant.also}</Prose>
          </PageSection>
        </div>
      ) : null}

      <div
        data-cv-block="skills"
        className={`${cvSectionBreak({ id: "skills", key })}no-break-inside`}
      >
        <PageSection className="print:mt-0 preview-print:mt-0" title="Skills">
          <ul className={bulletListClass}>
            {variant.skills.map(({ label, keywords }) => (
              <li className={bulletItemClass} key={label}>
                <strong>{label}:</strong> {keywords}
              </li>
            ))}
          </ul>
        </PageSection>
      </div>

      <div
        data-cv-block="contact"
        className={`${cvSectionBreak({ id: "contact", key })}no-break-inside`}
      >
        <ContactInfo />
      </div>

      <div className="print:hidden preview-print:hidden">
        <LatestPosts />
      </div>
    </section>
  );
}

export async function generateMetadata({
  searchParams,
}: CvPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const { variant } = resolveCv({ focus: resolved?.focus });
  const isPreviewPrint =
    previewParam({ preview: resolved?.preview }) === "print";

  return {
    alternates: {
      canonical: "/cv",
      types: { "text/markdown": markdownSiblingPath("/cv") },
    },
    description: variant.metadata.description,
    keywords: variant.metadata.keywords,
    openGraph: {
      ...variant.metadata.openGraph,
      type: "profile",
    },
    title: variant.metadata.title,
    ...(isPreviewPrint ? { robots: { follow: false, index: false } } : {}),
  };
}
