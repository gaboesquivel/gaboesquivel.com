import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './contact-form'

export default function ContractWorkPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold tracking-tighter">Connect</h1>
      <p className="prose prose-neutral dark:prose-invert">
        Open to direct hire, international hire, or{' '}
        <Link href="/blog/2025-11-1099-contracting" className="prose-link">
          contracting through Blockmatic Labs LLC
        </Link>
        . Based in{' '}
        <Link
          href="/blog/2014-01-developing-software-in-costa-rica"
          className="prose-link"
        >
          Costa Rica
        </Link>
        , working US Mountain Time.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        If you are building a software product and need help making a complex
        system useful, send a note below. You can review project evidence in the{' '}
        <Link href="/work">work portfolio</Link>.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Work with Gabo Esquivel',
  description:
    'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Based in Costa Rica, working US Mountain Time.',
  openGraph: {
    title: 'Work with Gabo Esquivel',
    description:
      'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC.',
    type: 'website',
  },
}
