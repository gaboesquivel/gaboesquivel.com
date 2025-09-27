import Link from 'next/link'
export function LetsConnect() {
  return (
    <>
      <p className="prose prose-neutral dark:prose-invert">
        I usually work through remote 1099 contracts with my US-based company,
        Blockmatic Labs LLC. This gives clients straightforward contracts,
        compliance peace of mind, and IP protection. I’m based in Costa Rica,
        aligned with US Mountain Time, and conveniently close for quick trips to
        major US cities.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        If you're building innovative solutions in{' '}
        <Link href="/ai" className="prose-link">
          AI
        </Link>{' '}
        or{' '}
        <Link href="/web3" className="prose-link">
          Web3
        </Link>
        ,{' '}
        <a href="mailto:contact@gaboesquivel.com" className="prose-link">
          let's connect
        </a>
        .
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        You can view my work portfolio{' '}
        <Link href="/work" className="prose-link">
          here
        </Link>
        .
      </p>
    </>
  )
}
