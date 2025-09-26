import { Calendar, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function ContactInfo() {
  return (
    <>
      <div className="hidden print:block mb-8 pt-6 ">
        <h2 className="text-xl font-semibold text-black mb-4">Contact Info</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-black" />
            <span className="text-black">CR +50670367089</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-black" />
            <span className="text-black">US +13156452818</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-black" />
            <span className="text-black">contact@gaboesquivel.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-black" />
            <span className="text-black">gaboesquivel.com/cal</span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-black" />
            <span className="text-black">github.com/gaboesquivel</span>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-black" />
            <span className="text-black">linkedin.com/in/gaboesquivel</span>
          </div>
        </div>
      </div>
      <div className="hidden print:block text-black">
        More details on my work can be found on my website{' '}
        <Link href="/work/ai" className="text-green-700 pointer">
          gaboesquivel.com
        </Link>
        .
      </div>
    </>
  )
}
