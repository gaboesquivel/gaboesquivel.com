import { Calendar, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function ContactInfo({ hidden = true, intro = false, email = false }) {
  return (
    <>
      <div className={`${hidden ? 'hidden' : ''} print:block mb-8 pt-6 `}>
        <h2 className="text-xl font-semibold  mb-4">Let's Work Together</h2>
        {intro ? <p className="">INTRO TEXT HERE</p> : null}
        <p className="prose prose-neutral dark:prose-invert">
          I prefer to work through remote 1099 arrangements via my US-based
          company, Blockmatic Labs LLC. This structure makes it easy for clients
          to engage me, with clear contracts, built-in compliance, and IP
          protection. Based in Costa Rica, I work on US Mountain Time and am
          just a short flight from major US cities.
        </p>
        {email ? (
          <>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Send me a message</h3>
              <form className="space-y-4">
                <textarea
                  placeholder="Tell me about your project, timeline, and how I can help..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2 border-accent border text-accent font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </>
        ) : null}
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
