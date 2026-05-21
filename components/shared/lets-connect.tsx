import Link from 'next/link'

export function LetsConnect() {
  return (
    <div className="prose prose-neutral dark:prose-invert print:hidden">
      <p>
        I’m open to long term or short term engagements, including direct hire,
        international hire, or{' '}
        <Link
          href="/blog/2025-11-1099-contracting"
          className="prose-link"
        >
          contractor setups
        </Link>{' '}
        through my US-based company,{' '}
        <Link
          href="/blog/2025-11-1099-contracting"
          className="prose-link"
        >
          Blockmatic Labs LLC
        </Link>
        . Based in{' '}
        <Link
          href="/blog/2014-01-developing-software-in-costa-rica"
          className="prose-link"
        >
          Costa Rica
        </Link>{' '}
        and aligned with US Mountain Time. Unable to work as W2.
      </p>
      <p>
        If you're building innovative solutions in{' '}
        <Link href="/ai" className="prose-link">
          AI
        </Link>{' '}
        or{' '}
        <Link href="/web3" className="prose-link">
          Web3
        </Link>
        ,{' '}
        <Link href="/connect" className="cta-link">
          let's connect
        </Link>
        .
      </p>
      <p>
        You can view my work portfolio{' '}
        <Link href="/work" className="cta-link">
          here
        </Link>
        .
      </p>
    </div>
  )
}
