import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-28 print:hidden preview-print:hidden">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/gaboesquivel"
                className="text-gray-300 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/gaboesquivel"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/gaboesquivel"
                className="text-gray-300 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link
                href="/startups"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Startups
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Writing
              </Link>
            </li>
            <li>
              <Link
                href="/work"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Work
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/bio"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Bio
              </Link>
            </li>
            <li>
              <Link
                href="/ai"
                className="text-gray-300 hover:text-white transition-colors"
              >
                AI
              </Link>
            </li>
            <li>
              <Link
                href="/web3"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Web3
              </Link>
            </li>
            <li>
              <Link
                href="/tech"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Tech Stack
              </Link>
            </li>
            <li>
              <Link
                href="/cv"
                className="text-gray-300 hover:text-white transition-colors"
              >
                CV
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Explore
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2">
            <li className="text-gray-300">
              Open to direct hire, international hire, or{' '}
              <Link
                href="/blog/2025-11-1099-contracting"
                className="text-gray-300 hover:text-white transition-colors"
              >
                contracting through Blockmatic Labs LLC
              </Link>
              .
              <br />
              <br />
            </li>
            <li className="text-gray-300">Have something in mind?</li>
            <li>
              <Link href="/connect" className="cta-link">
                Let’s talk
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
