import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './contact-form'

// THIS PAGE IS A IDEA TO LATER ADD A CONTACT PAGE WITH ALL MY INFO, HOW I WORK, WHERE I LIFE AND MAIL FROM PAGE AND CALENDAR
//
export default function ContractWorkPage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none ">
      <h1 className="text-2xl font-bold tracking-tighter  mb-4">
        Let's Work Together
      </h1>
      {/* <p className="prose prose-neutral dark:prose-invert">
        I’m Gabo Esquivel, a product-focused engineer with 15+ years of
        experience building at the intersection of AI, crypto, and finance. I
        help teams bring new ideas to market by bridging deep technical work
        with clear user experience and business strategy.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I typically work through remote 1099 contracts via my US-based company,
        Blockmatic Labs LLC. This setup gives clients straightforward contracts,
        built-in compliance, and IP protection. Based in Costa Rica, I operate
        on US Mountain Time and am just a short flight from major US cities.
      </p> */}
      <p className="prose prose-neutral dark:prose-invert">
        If you’re exploring something ambitious—a decentralized system, an
        AI-powered product, or an idea that needs a strong technical
        foundation—I’d be happy to hear from you.
      </p>

      <div className="mt-6">
        <ContactForm />
      </div>

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
