import { blockSpacing, PageTitle, Prose } from 'components/shared/page-layout'
import Link from 'next/link'
import { LazyContactForm } from './lazy-contact-form'

export function ConnectPageContent() {
  return (
    <section>
      <PageTitle>Connect</PageTitle>
      <Prose>
        Open to direct hire, international hire, or{' '}
        <Link href="/blog/2025-11-1099-contracting" className="prose-link">
          contracting through Blockmatic Labs LLC
        </Link>
        . Cannot work under W-2. Based in Costa Rica, working US Mountain Time.
        Fluent in English, Spanish, Portuguese, and Italian.
      </Prose>
      <Prose>
        I work with founders and technical or product leaders on agentic AI,
        onchain finance, and full-stack product work — usually where the product
        has to earn trust under regulation, real money, or production load. Tell
        me what you are building, where it is stuck, and whether you are hiring
        directly, hiring internationally, or contracting through Blockmatic Labs
        LLC. You can send a note below, book time at{' '}
        <Link href="/cal" className="prose-link">
          gaboesquivel.com/cal
        </Link>
        , or read the{' '}
        <Link href="/work" className="prose-link">
          work portfolio
        </Link>{' '}
        first.
      </Prose>

      <div className={blockSpacing}>
        <LazyContactForm />
      </div>
    </section>
  )
}
