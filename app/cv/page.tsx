import './cv.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PrintButton } from '../../components/print-button'
import { experience } from './experience'

export default function CVPage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. Engineer
        </span>
        <span className="print:hidden ">Curriculum Vitae</span>
        <PrintButton />
      </h1>

      <div className="mb-8 print:block hidden print:text-gray-700">
        <p className="mb-4">
          Full-stack engineer with 15+ years of experience in Web3, AI, and
          fintech. I specialize in designing scalable systems, leading
          engineering teams, and leveraging blockchain and AI for product
          innovation. Fluent in English, Spanish, Portuguese, and Italian.
        </p>
        <p className="mb-4">
          My focus is emerging technologies and user-centric innovation. My
          expertise spans web3, cloud, and full-stack web and mobile
          development, complemented by ongoing explorations in artificial
          intelligence.
        </p>
        <p className="mb-4">
          My approach is rooted in agile methodologies, striving for precision
          in technology implementation.
        </p>
      </div>

      <div className="space-y-8">
        {experience.map((experience) => (
          <div key={experience.company}>
            <h2 className="text-xl font-semibold mb-2 print:text-black">
              {experience.company}
            </h2>
            <p className="text-sm exp-duration dark:text-gray-400 mb-2">
              {experience.location} • {experience.duration}
            </p>
            <p className="mb-4 exp-description dark:text-gray-300">
              {experience.description}
            </p>
            <h3 className="font-medium mb-2 exp-description">
              Key Achievements:
            </h3>
            <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700 dark:text-gray-300 !print:text-gray-700">
              {experience.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <Link href={`/tech/${tech}`} key={experience.company + tech}>
                  <span className="rounded-md px-2 py-1 hidden print:hidden bg-neutral-200 dark:bg-neutral-800 text-xs font-medium text-gray-700 dark:text-gray-200 text-accent">
                    {tech}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
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
