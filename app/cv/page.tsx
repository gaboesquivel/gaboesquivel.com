import "./cv.css";
import { PrintButton } from "components/print-button";
import { ContactInfo } from "components/shared/contact-info";
import {
  FilterNav,
  PageSection,
  PageTitle,
  Prose,
  proseClass,
  sectionHeadingRow,
  sectionSpacing,
  sectionTitle,
  titleSpacing,
} from "components/shared/page-layout";
import { resolveCv as resolveCvBase } from "gaboesquivel";
import { cvPath, cvPdfFile } from "lib/cv-paths";
import { markdownSiblingPath } from "lib/markdown-sibling";
import { personalOgImage } from "lib/og/constants";
import { cn } from "lib/utils";
import type { Metadata } from "next";
import { cache } from "react";

import { cvSectionBreak } from "./page-breaks";

interface CvPageProps {
  searchParams?: Promise<{
    focus?: string | string[];
    preview?: string | string[];
  }>;
}

const bulletItemClass =
  "cv-content cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•']";

const bulletListClass = cn(proseClass, "mb-0 list-none pl-0");

/** Screen-only switcher between the default CV and its focus variants. */
const cvFocusOptions = [
  { id: "full", label: "general" },
  { id: "ai", label: "ai" },
  { id: "web3", label: "web3" },
  { id: "fullstack", label: "full-stack" },
] as const;

const previewParam = ({ preview }: { preview?: string | string[] }) =>
  Array.isArray(preview) ? preview[0] : preview;

const focusCacheKey = (focus?: string | string[]) => {
  if (focus === undefined) return "";
  return Array.isArray(focus) ? focus.join("\0") : focus;
};

const resolveCv = cache((key: string) =>
  resolveCvBase({
    focus: key === "" ? undefined : key.includes("\0") ? key.split("\0") : key,
  })
);

const resolveCvForRequest = ({ focus }: { focus?: string | string[] }) =>
  resolveCv(focusCacheKey(focus));

export default async function CVPage({ searchParams }: CvPageProps) {
  const resolved = await searchParams;
  const { key, variant, entries } = resolveCvForRequest({
    focus: resolved?.focus,
  });
  const isPreviewPrint =
    previewParam({ preview: resolved?.preview }) === "print";

  return (
    <section
      className="cv-content cv-print m-0 w-full max-w-4xl p-0 print:block print:w-full print:max-w-none preview-print:max-w-none"
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
          <div className="mb-0 flex items-baseline justify-between gap-4 leading-none">
            <PageTitle className="mb-0">Gabo Esquivel</PageTitle>
            <PrintButton file={cvPdfFile({ key })} />
          </div>
          <p className="cv-print-professional-title mt-0 mb-0 font-medium tracking-tight text-neutral-400">
            {variant.professionalTitle}
          </p>
          <FilterNav
            className="mt-6 w-fit print:hidden preview-print:hidden"
            current={key}
            items={cvFocusOptions.map(({ id, label }) => ({
              href: cvPath({ key: id }),
              id,
              label,
            }))}
            label="CV focus"
          />
        </header>

        <div className="cv-summary">
          <Prose className="cv-content max-w-none">{variant.summary}</Prose>
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
            className={cn(
              cvSectionBreak({ id: exp.company, key }),
              "cv-entry-group no-break-inside",
              index === 0 && `${sectionSpacing} print:mt-0 preview-print:mt-0`
            )}
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
          className={cn(cvSectionBreak({ id: "also", key }), "no-break-inside")}
        >
          <PageSection
            className="print:mt-0 preview-print:mt-0"
            title="Additional experience"
          >
            <Prose className="cv-content cv-also max-w-none">
              {variant.also}
            </Prose>
          </PageSection>
        </div>
      ) : null}

      <div
        data-cv-block="skills"
        className={cn(cvSectionBreak({ id: "skills", key }), "no-break-inside")}
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
        className={cn(
          cvSectionBreak({ id: "contact", key }),
          "no-break-inside"
        )}
      >
        <ContactInfo />
      </div>
    </section>
  );
}

export async function generateMetadata({
  searchParams,
}: CvPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const { variant } = resolveCvForRequest({ focus: resolved?.focus });
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
      images: [personalOgImage],
      type: "profile",
    },
    title: variant.metadata.title,
    twitter: {
      card: "summary_large_image",
      description: variant.metadata.description,
      images: [personalOgImage.url],
      title: variant.metadata.title,
    },
    ...(isPreviewPrint ? { robots: { follow: false, index: false } } : {}),
  };
}
