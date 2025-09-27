import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-28 print:hidden">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
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
            </ul>
          </div>

          <div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="/work"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/tech"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tech Stack
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="text-gray-300 mb-2">
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
