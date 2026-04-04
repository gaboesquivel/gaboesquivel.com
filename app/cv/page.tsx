import './cv.css'
import { LatestPosts } from 'components/blog/latest-posts'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PrintButton } from '../../components/print-button'
import { ContactInfo } from '../../components/shared/contact-info'
import { experience } from './experience'
import { skillGroups } from './skills'

export default function CVPage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Senior Full Stack Engineer
        </span>
        <span className="print:hidden">Curriculum Vitae</span>
        <PrintButton />
      </h1>

      <p className="prose prose-neutral dark:prose-invert mb-8">
        Gabo Esquivel  is a Senior Full Stack Engineer with 15+ years shipping production applications. Owns architecture and delivery across the TypeScript/React/Next.js/Node.js stack, PostgreSQL and cloud data stores, EVM integrations (viem, wagmi), and AI products (LLMs, RAG, AI SDKs). Builds APIs, onchain indexers, and high-traffic frontends for fintech, Web3, and AI. Fluent in English, Spanish, Portuguese, and Italian.
      </p>


      <div className="space-y-8">
        {experience.map((exp) => (
          <div
            key={exp.company}
            className={exp.pageBreak ? 'page-break-before' : ''}
          >
            <h3 className="text-xl font-semibold mb-1 print:text-black">
              {exp.company}
            </h3>
            {exp.title && (
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 print:text-black mb-1">
                {exp.title}
              </p>
            )}
            <p className="text-sm exp-duration dark:text-gray-400 mb-2 print:text-xs">
              {exp.location} • {exp.duration}
            </p>
            <p className="mb-4 exp-description prose prose-neutral dark:prose-invert">
              {exp.description}
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1 ">
              {exp.achievements.map((achievement) => (
                <li
                  className="prose prose-neutral dark:prose-invert"
                  key={achievement}
                >
                  {achievement}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech) => (
                <Link href={`/tech/${tech}`} key={exp.company + tech}>
                  <span className="rounded-md px-2 py-1 hidden print:hidden bg-neutral-200 dark:bg-neutral-800 text-xs font-medium text-gray-700 dark:text-gray-200">
                    {tech}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 hidden print:block">
        <h2 className="text-xl font-semibold mb-4 print:text-black">
          Education
        </h2>
        <div>
          <h3 className="text-lg font-medium mb-1 print:text-black">
            Universidad Cenfotec
          </h3>
          <p className="text-sm exp-duration dark:text-gray-400 mb-1 print:text-xs">
            Bachelor of Science (BS), Software Engineering
          </p>
          <p className="text-sm exp-duration dark:text-gray-400 print:text-xs">
            2006 – 2009
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3 mt-12 print:text-black hidden print:block">
        Skills
      </h2>
      <div className="space-y-2 mb-10 prose prose-neutral dark:prose-invert text-sm hidden print:block">
        {skillGroups.map(({ label, keywords }) => (
          <p key={label} className="!my-1">
            <strong>{label}:</strong> {keywords}
          </p>
        ))}
      </div>

      <div className="mt-10 prose prose-neutral dark:prose-invert hidden print:block">
        <h2 className="text-xl font-semibold mb-3 print:text-black not-prose">
          Additional Information
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>Languages:</strong> English, Spanish, Portuguese, Italian
          </li>
          <li>
            <strong>Engagement:</strong> Remote 1099 contracts via US-based
            company Blockmatic Labs LLC (see{' '}
            <Link href="/blog/2025-11-1099-contracting" className="prose-link">
              contracting details
            </Link>
            ).
          </li>
          <li>
            <strong>Portfolio:</strong>{' '}
            <Link href="/" className="prose-link">
              gaboesquivel.com
            </Link>
          </li>
        </ul>
      </div>

      <ContactInfo />

      <LatestPosts />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Gabo Esquivel - Curriculum Vitae',
  description:
    'Senior Full Stack Engineer (Web3 + AI) with 15+ years in TypeScript, React, Next.js, Node.js, PostgreSQL, EVM, viem, wagmi, LLMs, and RAG.',
  keywords: [
    'software engineer',
    'senior full stack engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'web3',
    'EVM',
    'viem',
    'wagmi',
    'LLM',
    'RAG',
    'AI SDK',
    'fintech',
    'blockchain',
  ],
  openGraph: {
    title: 'Gabo Esquivel - Curriculum Vitae',
    description:
      'Senior Full Stack Engineer (Web3 + AI) with 15+ years in Web3, AI, and fintech.',
    type: 'profile',
  },
}
