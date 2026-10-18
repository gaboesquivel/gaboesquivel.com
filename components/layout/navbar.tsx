'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { path: '/', name: 'gabo' },
  { path: '/work', name: 'work' },
  { path: '/ai', name: 'ai' },
  { path: '/web3', name: 'web3' },
  { path: '/bio', name: 'bio' },
  { path: '/blog', name: 'writing' },
  { path: '/connect', name: 'connect' },
]

export default function Navbar() {
  const pathname = usePathname() || '/'

  return (
    <nav
      aria-label="Primary navigation"
      className="-ml-[8px] mb-10 tracking-tight navbar print:hidden preview-print:hidden"
    >
      <div className="relative px-0 pb-1" id="nav">
        <div className="flex flex-row flex-wrap">
          {navItems.map(({ path, name }) => {
            const isActive =
              path === '/'
                ? pathname === '/'
                : pathname === path || pathname.startsWith(`${path}/`)

            return (
              <Link
                key={path}
                href={path}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'flex align-middle transition-colors hover:text-neutral-800 dark:hover:text-accent',
                  isActive ? 'text-accent' : 'text-neutral-400',
                )}
              >
                <span className="relative px-2 py-2">
                  {name}
                  {isActive ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 bottom-0 z-[-1] h-px bg-neutral-200 dark:bg-neutral-800 dark:bg-gradient-to-r dark:from-transparent dark:to-neutral-900"
                    />
                  ) : null}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
