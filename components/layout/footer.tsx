import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-28 print:hidden">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Projects
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
            </ul>
          </div>

          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/fullstack"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fullstack
                </Link>
              </li>
              <li>
                <Link
                  href="/frontend"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Frontend
                </Link>
              </li>
              <li>
                <Link
                  href="/backend"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Backend
                </Link>
              </li>
              <li>
                <Link
                  href="/lead"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tech Lead
                </Link>
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
                  href="/institutions"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Institutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-gray-300 mb-2">
              I work on 1099 through{' '}
              <Link
                href="/blog/2025-11-1099-contracting"
                className="text-gray-300 hover:text-white transition-colors underline"
              >
                Blockmatic Labs LLC
              </Link>
              . <br />
              <br />
              Interested in working together? <br />
              <Link href="/connect" className="cta-link pt-2">
                Let's connect
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
