'use client'

import dynamic from 'next/dynamic'

export const LazyContactForm = dynamic(
  () => import('./contact-form').then((mod) => mod.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div
        aria-busy="true"
        className="min-h-[28rem] w-full rounded-lg border border-neutral-800 bg-neutral-950/50"
        role="status"
      >
        <span className="sr-only">Loading contact form</span>
      </div>
    ),
  },
)
