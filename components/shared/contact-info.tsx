import { Calendar, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function ContactInfo() {
  return (
    <>
      <div className="hidden print:block mb-8 pt-6">
        <h2 className="text-xl font-semibold  mb-4">Let's Work Together</h2>
        <p className="prose prose-neutral dark:prose-invert">
          I prefer to work through remote 1099 arrangements via my US-based
          company, Blockmatic Labs LLC. This structure makes it easy for clients
          to engage me, with clear contracts, built-in compliance, and IP
          protection. Based in Costa Rica, I work on US Mountain Time and am
          just a short flight from major US cities.
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 pt-4">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 " />
            <span className=" prose prose-neutral dark:prose-invert">
              CR +50670367089
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 " />
            <span className=" prose prose-neutral dark:prose-invert">
              US +13156452818
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 " />
            <span className=" prose prose-neutral dark:prose-invert">
              contact@gaboesquivel.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 " />
            <span className=" prose prose-neutral dark:prose-invert">
              gaboesquivel.com/cal
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 " />
            <span className=" prose prose-neutral dark:prose-invert">
              github.com/gaboesquivel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 " />
            <span className=" prose prose-neutral dark:prose-invert">
              linkedin.com/in/gaboesquivel
            </span>
          </div>
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
