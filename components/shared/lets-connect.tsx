import Link from 'next/link'

export function LetsConnect() {
  return (
    <div className="prose prose-neutral dark:prose-invert print:hidden">
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
        If you're building a software product and need help making a complex
        system useful,{' '}
        <Link href="/connect" className="cta-link">
          start a conversation
        </Link>
        .
      </p>
    </div>
  )
}
