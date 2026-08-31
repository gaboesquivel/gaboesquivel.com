import { proseClass } from 'components/shared/spacing'
import { cn } from 'lib/utils'
import Link from 'next/link'

export function LetsConnect() {
  return (
    <div className={cn(proseClass, 'print:hidden')}>
      <p>
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
      <p>
        Tell me what you're building and where it's stuck.{' '}
        <Link href="/connect" className="cta-link">
          Start a conversation
        </Link>
        .
      </p>
    </div>
  )
}
