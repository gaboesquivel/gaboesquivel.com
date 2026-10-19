import Link from "next/link";

const footerLink = "text-neutral-300 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="mt-28 print:hidden preview-print:hidden">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div>
          <ul className="space-y-2">
            <li>
              <a href="https://github.com/gaboesquivel" className={footerLink}>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://twitter.com/gaboesquivel" className={footerLink}>
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/gaboesquivel"
                className={footerLink}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link href="/startups" className={footerLink}>
                Startups
              </Link>
            </li>
            <li>
              <Link href="/tech" className={footerLink}>
                Tech Stack
              </Link>
            </li>
            <li>
              <Link href="/work" className={footerLink}>
                Work
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2">
            <li>
              <Link href="/explore" className={footerLink}>
                Explore
              </Link>
            </li>
            <li>
              <Link href="/llms.txt" className={footerLink}>
                llms.txt
              </Link>
            </li>
            <li>
              <Link href="/docs" className={footerLink}>
                MCP Server
              </Link>
            </li>
            <li>
              <Link href="/about" className={footerLink}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={footerLink}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={footerLink}>
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <ul className="space-y-2">
            <li className="text-neutral-300">
              Open to direct hire, international hire, or{" "}
              <Link
                href="/blog/2025-11-1099-contracting"
                className={footerLink}
              >
                contracting through Blockmatic Labs LLC
              </Link>
              .
              <br />
              <br />
            </li>
            <li className="text-neutral-300">Have something in mind?</li>
            <li>
              <Link href="/contact" className="cta-link">
                Let’s talk
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
