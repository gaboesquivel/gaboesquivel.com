import './cv.css'
import { LatestPosts } from 'components/blog/latest-posts'
import {
  PageSection,
  PageTitle,
  Prose,
  proseClass,
  sectionHeadingRow,
  sectionSpacing,
  sectionTitle,
} from 'components/shared/page-layout'
import { cn } from 'lib/utils'
import type { Metadata } from 'next'
import { PrintButton } from '../../components/print-button'
import { ContactInfo } from '../../components/shared/contact-info'
import { cvPdfFile, cvSectionBreak, resolveCv } from './variants'

type CvPageProps = {
  searchParams?: Promise<{ focus?: string | string[] }>
}

const bulletItemClass =
  "cv-content cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•']"

const cvHeadingRow = 'mb-4'
const bulletListClass = cn(proseClass, 'mb-0 list-none pl-0')

export default async function CVPage({ searchParams }: CvPageProps) {
  const resolved = await searchParams
  const { key, variant, entries } = resolveCv({ focus: resolved?.focus })

  return (
    <section className="p-0 m-0 cv-content cv-print print:block print:w-full print:max-w-none">
      <div className="no-break-inside" data-cv-block="intro">
        <header className="cv-header">
          <PageTitle className="flex items-center justify-between">
            <span>Gabo Esquivel</span>
            <PrintButton file={cvPdfFile({ key })} />
          </PageTitle>
          <p className="cv-print-professional-title font-medium tracking-tight text-neutral-400">
            {variant.professionalTitle}
          </p>
        </header>

        <div className="cv-summary">
          <Prose className="cv-content">{variant.summary}</Prose>
        </div>
        <PageSection
          className="print:mt-0"
          headingRowClassName={cvHeadingRow}
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

      <div className="cv-experience-list space-y-8 list-none list-inside print:space-y-0">
        {entries.map((exp, index) => (
          <div
            key={exp.company}
            data-cv-block={exp.company}
            className={`${exp.pageBreak ? 'page-break-before ' : ''}cv-entry-group no-break-inside${index === 0 ? ` ${sectionSpacing} print:mt-0` : ''}`}
          >
            {index === 0 ? (
              <div className={cn(sectionHeadingRow, cvHeadingRow)}>
                <h2 className={sectionTitle}>Experience</h2>
              </div>
            ) : null}
            <div className="cv-entry">
              <h3 className="mb-1 font-bold text-xl cv-entry-title">
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
                  'mb-4 exp-description cv-content cv-entry-description',
                )}
              >
                {exp.description}
              </p>
              <ul
                className={cn(
                  proseClass,
                  'mb-4 list-none pl-0 cv-content cv-entry-achievements',
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
          className={`${cvSectionBreak({ key, id: 'also' })}no-break-inside`}
        >
          <PageSection
            className="print:mt-0"
            headingRowClassName={cvHeadingRow}
            title="Additional experience"
          >
            <Prose className="cv-content cv-also">{variant.also}</Prose>
          </PageSection>
        </div>
      ) : null}

      <div
        data-cv-block="skills"
        className={`${cvSectionBreak({ key, id: 'skills' })}no-break-inside`}
      >
        <PageSection
          className="print:mt-0"
          headingRowClassName={cvHeadingRow}
          title="Skills"
        >
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
        className={`${cvSectionBreak({ key, id: 'contact' })}no-break-inside`}
      >
        <ContactInfo />
      </div>

      <div className="print:hidden">
        <LatestPosts />
      </div>
    </section>
  )
}

export async function generateMetadata({
  searchParams,
}: CvPageProps): Promise<Metadata> {
  const resolved = await searchParams
  const { variant } = resolveCv({ focus: resolved?.focus })

  return {
    title: variant.metadata.title,
    description: variant.metadata.description,
    keywords: variant.metadata.keywords,
    openGraph: {
      ...variant.metadata.openGraph,
      type: 'profile',
    },
    alternates: { canonical: '/cv' },
  }
}
