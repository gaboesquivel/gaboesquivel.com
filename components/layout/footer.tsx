import { ctaLink, siteColumn } from "components/shared/spacing";
import { hireTermsLocationLine } from "lib/hire-terms";
import { cn } from "lib/utils";
import Link from "next/link";

const footerLink = "text-neutral-300 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer
      className={cn(
        siteColumn,
        "mt-12 sm:mt-28 print:hidden preview-print:hidden"
      )}
    >
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
              <Link href="/lead" className={footerLink}>
                Leadership
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
              <Link href="/cv" className={footerLink}>
                Résumé
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
          <Link
            href="/contact"
            className={cn(
              ctaLink,
              "text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            )}
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Open to hire or contracting through Blockmatic Labs LLC.{" "}
            {hireTermsLocationLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
