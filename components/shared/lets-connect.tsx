import { Prose } from 'components/shared/page-layout'
import Link from 'next/link'

export function LetsConnect() {
  return (
    <>
      <Prose className="print:hidden">
        Open to direct hire, international hire, or{' '}
        <Link href="/blog/2025-11-1099-contracting" className="prose-link">
          contracting through Blockmatic Labs LLC
        </Link>
        . Cannot work under W-2. Based in Costa Rica, working US Mountain Time.
      </Prose>
      <Prose className="print:hidden">
        Tell me what you're building and where it's stuck.{' '}
        <Link href="/connect" className="cta-link">
          Start a conversation
        </Link>
        .
      </Prose>
    </>
  )
}
