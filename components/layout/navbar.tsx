'use client'

import clsx from 'clsx'
import { LayoutGroup, motion } from 'motion/react'
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
      <LayoutGroup>
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
                    'transition-all hover:text-neutral-800 dark:hover:text-accent flex align-middle',
                    isActive ? 'text-accent' : 'text-neutral-500',
                    path === '/connect' && 'hidden md:flex',
                  )}
                >
                  <span className="relative px-2 py-1">
                    {name}
                    {isActive ? (
                      <motion.span
                        className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900"
                        layoutId="sidebar"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    ) : null}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </LayoutGroup>
    </nav>
  )
}
