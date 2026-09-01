import './cv.css'
import { LatestPosts } from 'components/blog/latest-posts'
import { FilterNav } from 'components/shared/page-layout'
import type { Metadata } from 'next'
import { PrintButton } from '../../components/print-button'
import { ContactInfo } from '../../components/shared/contact-info'
import { cvFocusItems, resolveCv } from './variants'

type CvPageProps = {
  searchParams?: Promise<{ focus?: string | string[] }>
}

export default async function CVPage({ searchParams }: CvPageProps) {
  const resolved = await searchParams
  const { key, variant, entries } = resolveCv({ focus: resolved?.focus })

  return (
    <section className="p-0 m-0 cv-content cv-print print:block print:w-full print:max-w-none">
      <header className="cv-header mb-8">
        <h1 className="text-2xl font-bold tracking-tighter flex justify-between items-center print:text-4xl ">
          <span>Gabo Esquivel</span>
          <PrintButton />
        </h1>
        <p className="cv-print-professional-title">
          {variant.professionalTitle}
        </p>
      </header>

      <div className="print:hidden mb-8">
        <FilterNav label="CV focus" current={key} items={cvFocusItems} />
      </div>

      <div className="cv-summary">
        <p className="prose prose-neutral dark:prose-invert  cv-content ">
          {variant.summary}
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-4 mt-8">Highlights</h2>

      <ul className="mb-8 space-y-1 list-none list-inside">
        {variant.highlights.map((highlight) => (
          <li
            className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] "
            key={highlight}
          >
            {highlight}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <ul className="mb-8 space-y-1  list-none  list-inside">
        {variant.skills.map(({ label, keywords }) => (
          <li
            className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] "
            key={label}
          >
            <strong>{label}:</strong> {keywords}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-4">Experience</h2>

      <div className="cv-experience-list space-y-8 list-none list-inside">
        {entries.map((exp) => (
          <div
            key={exp.company}
            className={`${exp.pageBreak ? 'page-break-before' : ''} cv-entry no-break-inside`}
          >
            <h3 className="text-xl font-semibold mb-1 print:text-lg cv-entry-title">
              {exp.title}, {exp.company}
            </h3>
            {exp.title && (
              <p className="exp-duration cv-entry-meta text-sm font-medium text-gray-400 mb-4">
                {exp.location} • {exp.type} • {exp.duration}
              </p>
            )}

            <p className="mb-4 exp-description prose prose-neutral dark:prose-invert cv-content cv-entry-description">
              {exp.description}
            </p>
            <ul className="mb-4 space-y-1 list-none pl-0 cv-content cv-entry-achievements">
              {exp.achievements.map((achievement) => (
                <li
                  className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] "
                  key={achievement}
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {variant.also && (
        <>
          <h2 className="text-xl font-semibold mb-4 mt-8">
            Additional experience
          </h2>
          <p className="prose prose-neutral dark:prose-invert cv-content cv-also">
            {variant.also}
          </p>
        </>
      )}

      <ContactInfo />

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

  return { ...variant.metadata, alternates: { canonical: '/cv' } }
}
