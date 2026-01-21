import './cv.css'
import { LatestPosts } from 'components/blog/latest-posts'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PrintButton } from '../../components/print-button'
import { ContactInfo } from '../../components/shared/contact-info'
import { experience } from './experience'

export default function CVPage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. Engineer
        </span>
        <span className="print:hidden">Curriculum Vitae</span>
        <PrintButton />
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        With 15+ years in full-stack engineering, I help organizations turn
        ideas into market-ready products—bridging technical execution, user
        experience, and business strategy.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I focus on emerging tech and user-driven innovation, with expertise in
        web3, cloud, full-stack web/mobile, and AI. Fluent in English, Spanish,
        Portuguese, and Italian.
      </p>

      <div className="space-y-8 mt-12">
        {experience.map((experience) => (
          <div
            key={experience.company}
            className={experience.pageBreak ? 'page-break-before' : ''}
          >
            <h2 className="text-xl font-semibold mb-2 print:text-black">
              {experience.company}
            </h2>
            <p className="text-sm exp-duration dark:text-gray-400 mb-2 print:text-xs">
              {experience.location} • {experience.duration}
            </p>
            <p className="mb-4 exp-description prose prose-neutral dark:prose-invert">
              {experience.description}
            </p>
            {/* <h3 className="font-medium mb-2 exp-description">
              Key Achievements:
            </h3> */}
            <ul className="list-disc pl-5 mb-4 space-y-1 ">
              {experience.achievements.map((achievement) => (
                <li
                  className="prose prose-neutral dark:prose-invert"
                  key={achievement}
                >
                  {achievement}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <Link href={`/tech/${tech}`} key={experience.company + tech}>
                  <span className="rounded-md px-2 py-1 hidden print:hidden bg-neutral-200 dark:bg-neutral-800 text-xs font-medium text-gray-700 dark:text-gray-200">
                    {tech}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="page-break-before">
        <ContactInfo />
      </div>
      <LatestPosts />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Gabo Esquivel - Curriculum Vitae',
  description:
    'Full-stack engineer with 15+ years of experience in Web3, AI, and fintech. Specializing in scalable systems, engineering leadership, and blockchain innovation.',
  keywords: [
    'software engineer',
    'web3',
    'AI',
    'fintech',
    'blockchain',
    'full-stack',
    'engineering leadership',
  ],
  openGraph: {
    title: 'Gabo Esquivel - Curriculum Vitae',
    description:
      'Full-stack engineer with 15+ years of experience in Web3, AI, and fintech. Specializing in scalable systems, engineering leadership, and blockchain innovation.',
    type: 'profile',
  },
}
