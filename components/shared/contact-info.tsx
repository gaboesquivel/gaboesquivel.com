import { Calendar, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function ContactInfo({ hidden = true }) {
  return (
    <>
      <div
        className={`${hidden ? 'hidden' : ''} print:block mb-8 pt-14 print-keep-links cv-contact-section cv-print `}
      >
        <h2 className="text-xl font-semibold mb-4 text-[#2563EB] pt-8">
          Let's Work Together
        </h2>

        <div className="cv-contact-lede">
          <p className="prose prose-neutral dark:prose-invert">
            I’m open to long term or short term engagements, including direct
            hire, international hire, or contractor setups through my US-based
            company, Blockmatic Labs LLC. Based in Costa Rica and aligned with
            US Mountain Time. Unable to work as W2. Available for travel when
            needed.
          </p>
 
        </div>

        <div className="cv-contact-grid grid grid-cols-2 gap-x-8 pt-4">
          <Link
            href="tel:17865537670"
            className="group flex items-center gap-2 no-underline"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              US: +1 (786) 229 4440

            </span>
          </Link>
          <Link
            href="https://wa.me/50670367089"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              WhatsApp: +506 7036 7089
            </span>
          </Link>
          <Link
            href="mailto:contact@gaboesquivel.com"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              contact@gaboesquivel.com
            </span>
          </Link>
          <Link
            href="https://gaboesquivel.com/cal"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert"
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              gaboesquivel.com/cal
            </span>
          </Link>
          <Link
            href="https://github.com/gaboesquivel"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert"
          >
            <Github className="h-4 w-4 shrink-0" />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              github.com/gaboesquivel
            </span>
          </Link>
          <Link
            href="https://linkedin.com/in/gaboesquivel"
            className="group flex items-center gap-2 no-underline prose prose-neutral dark:prose-invert"
          >
            <Linkedin className="h-4 w-4 shrink-0" />
            <span className="prose prose-neutral dark:prose-invert hover:text-accent !m-0 !p-0">
              linkedin.com/in/gaboesquivel
            </span>
          </Link>
        </div>
      </div>
      <p className="hidden print:block prose prose-neutral dark:prose-invert print-keep-links cv-contact-footer">
        More details on my work can be found on my website{' '}
        <Link href="/work/ai" className="no-underline">
          gaboesquivel.com
        </Link>
        .
      </p>
    </>
  )
}
