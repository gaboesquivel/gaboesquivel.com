import { blockSpacing, PageTitle, Prose } from 'components/shared/page-layout'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'
import { ContactForm } from './contact-form'

export default function ContractWorkPage() {
  return (
    <section>
      <PageTitle>Connect</PageTitle>
      <Prose>
        Open to direct hire, international hire, or{' '}
        <Link href="/blog/2025-11-1099-contracting" className="prose-link">
          contracting through Blockmatic Labs LLC
        </Link>
        . Cannot work under W-2. Based in Costa Rica, working US Mountain Time.
      </Prose>
      <Prose>
        Tell me what you're building and where it's stuck. Send a note below, or
        read through the{' '}
        <Link href="/work" className="prose-link">
          work portfolio
        </Link>{' '}
        first.
      </Prose>

      <div className={blockSpacing}>
        <ContactForm />
      </div>
    </section>
  )
}

export const metadata = pageMetadata({
  title: 'Work with Gabo Esquivel',
  description:
    'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.',
})
