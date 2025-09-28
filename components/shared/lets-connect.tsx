import Link from 'next/link'
export function LetsConnect() {
  return (
    <div className="prose prose-neutral dark:prose-invert print:hidden">
      <p>
        I usually work through remote 1099 contracts with my US-based company,
        Blockmatic Labs LLC. This gives clients straightforward contracts,
        compliance peace of mind, and IP protection. I’m based in Costa Rica,
        aligned with US Mountain Time, and conveniently close for quick trips to
        major US cities.
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
