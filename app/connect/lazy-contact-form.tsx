'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ContactForm = dynamic(
  () => import('./contact-form').then((mod) => mod.ContactForm),
  { ssr: false },
)

const formPlaceholder = (
  <div
    aria-busy="true"
    className="min-h-[28rem] w-full rounded-lg border border-neutral-800 bg-neutral-950/50"
    role="status"
  >
    <span className="sr-only">Loading contact form</span>
  </div>
)

export function LazyContactForm() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mount = () => setReady(true)
    if ('requestIdleCallback' in window)
      window.requestIdleCallback(mount, { timeout: 3500 })
    else mount()
  }, [])

  if (!ready) return formPlaceholder

  return <ContactForm />
}
