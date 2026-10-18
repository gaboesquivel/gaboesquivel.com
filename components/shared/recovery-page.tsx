import { blockGrid, PageTitle, Prose } from 'components/shared/page-layout'
import { PathLink } from 'components/shared/path-link'
import type { ReactNode } from 'react'

const exits = [
  {
    href: '/',
    title: 'Home',
    note: 'Overview of product engineering across regulated finance, Web3, and AI.',
  },
  {
    href: '/explore',
    title: 'Explore',
    note: 'Every page on the site, grouped by domain, engineering capability, and career context.',
  },
] as const

export function RecoveryPage({
  title,
  children,
  onRetry,
  documentTitle,
}: {
  title: string
  children: ReactNode
  onRetry?: () => void
  documentTitle?: string
}) {
  return (
    <section>
      {documentTitle ? <title>{documentTitle}</title> : null}
      <PageTitle>{title}</PageTitle>
      <Prose>{children}</Prose>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 rounded-lg border border-accent px-6 py-2 font-medium text-accent transition-[color,background-color,border-color,transform] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-safe:duration-[160ms] motion-safe:active:scale-[0.97] motion-reduce:duration-[80ms] motion-reduce:active:scale-[0.99] dark:hover:bg-neutral-800"
        >
          Try again
        </button>
      ) : null}
      <ul className={blockGrid}>
        {exits.map((exit) => (
          <li key={exit.href} className="h-full">
            <PathLink href={exit.href} title={exit.title} note={exit.note} />
          </li>
        ))}
      </ul>
    </section>
  )
}
