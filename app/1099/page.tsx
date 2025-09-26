import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function ContractWorkPage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Senior Software Engineer
        </span>
        <span className="print:hidden">Contract Work</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        I'm a senior software engineer focused on Web3 and AI. For over 15
        years, I've worked remotely with teams across the globe, leading
        projects and building products end to end. More in my video below, so
        you can get to know me better.
      </p>

      <h2 className="text-xl font-bold mb-4">How I Work</h2>
      <p className="prose prose-neutral dark:prose-invert">
        I prefer to work through 1099 arrangements—either short-term contracts
        or full-time engagements—through my US-based company, Blockmatic Labs,
        LLC. This setup makes it simple for clients to engage me with clear
        contracts, compliance, and IP protection built in. Based in Costa Rica,
        I operate on US Mountain Time with quick flights to major US cities.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        If you're interested in working with me, feel free to book time on my
        calendar at{' '}
        <a href="https://gaboesquivel.com/cal" className="prose-link">
          gaboesquivel.com/cal
        </a>{' '}
        or drop me a message at{' '}
        <a href="mailto:contact@gaboesquivel.com" className="prose-link">
          contact@gaboesquivel.com
        </a>
        .
      </p>

      <div className="print:hidden">
        <LatestPosts />
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Contract Work - Gabo Esquivel',
  description:
    'Senior software engineer focused on Web3 and AI. Available for 1099 contract work through Blockmatic Labs, LLC.',
  keywords: [
    'contract work',
    '1099',
    'senior software engineer',
    'Web3',
    'AI',
    'remote work',
    'Blockmatic Labs',
    'Costa Rica',
    'US Mountain Time',
    'software development',
    'consulting',
  ],
  openGraph: {
    title: 'Contract Work - Gabo Esquivel',
    description:
      'Senior software engineer focused on Web3 and AI. Available for 1099 contract work through Blockmatic Labs, LLC.',
    type: 'profile',
  },
}
