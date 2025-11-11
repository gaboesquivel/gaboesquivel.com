import { Calendar, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function ContactInfo({ hidden = true }) {
  return (
    <>
      <div className={`${hidden ? 'hidden' : ''} print:block mb-8 pt-6 `}>
        <h2 className="text-xl font-semibold  mb-4">Let's Work Together</h2>

        <p className="prose prose-neutral dark:prose-invert">
          I typically work through{' '}
          <Link
            href="/blog/2025-11-1099-contracting"
            className="prose-link"
          >
            remote 1099 contracts
          </Link>{' '}
          via my US-based company,{' '}
          <Link
            href="/blog/2025-11-1099-contracting"
            className="prose-link"
          >
            Blockmatic Labs LLC
          </Link>
          . This setup gives clients straightforward
          contracts, built-in compliance, and IP protection. Based in Costa
          Rica, I operate on US Mountain Time and am just a short flight from
          major US cities.
        </p>
        <p className="prose prose-neutral dark:prose-invert">
          If you’re exploring something ambitious—a decentralized system, an
          AI-powered product, or an idea that needs a strong technical
          foundation—I’d be happy to hear from you.
        </p>

        <div className="grid grid-cols-2 gap-x-8 pt-4">
          <Link
            href="tel:+13156452818"
            className="group flex items-center gap-2 no-underline"
          >
            <Phone className="h-4 w-4 " />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              US +13156452818
            </span>
          </Link>
          <Link
            href="tel:+50670367089"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert "
          >
            <Phone className="h-4 w-4 " />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              CR +50670367089
            </span>
          </Link>
          <Link
            href="mailto:contact@gaboesquivel.com"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert "
          >
            <Mail className="h-4 w-4 " />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              contact@gaboesquivel.com
            </span>
          </Link>
          <Link
            href="https://gaboesquivel.com/cal"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert "
          >
            <Calendar className="h-4 w-4 " />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              gaboesquivel.com/cal
            </span>
          </Link>
          <Link
            href="https://github.com/gaboesquivel"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert "
          >
            <Github className="h-4 w-4 " />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              github.com/gaboesquivel
            </span>
          </Link>
          <Link
            href="https://linkedin.com/in/gaboesquivel"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert "
          >
            <Linkedin className="h-4 w-4 " />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              linkedin.com/in/gaboesquivel
            </span>
          </Link>
        </div>
      </div>
      <div className="hidden print:block  prose prose-neutral dark:prose-invert ">
        More details on my work can be found on my website{' '}
        <Link href="/work/ai" className="text-green-700 pointer no-underline">
          gaboesquivel.com
        </Link>
        .
      </div>
    </>
  )
}
