import Balancer from 'react-wrap-balancer'

import { ProjectsMasonry } from 'components/work/projects-masonry'
import { cn } from 'lib/utils'
import Link from 'next/link'

const options = [
  'featured',
  'full-time',
  'contract',
  'web3',
  'ai',
  'lead',
  'oss',
  'all',
]

export function Projects({
  projects,
  type,
  showMoreLink = true,
}: { projects: any[]; type?: string; showMoreLink?: boolean }) {
  return (
    <section>
      <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
        {type ? (
          <Balancer>
            My Portfolio - <span className="capitalize">{type}</span>
          </Balancer>
        ) : null}
      </h2>
      <nav className="flex flex-wrap gap-2 md:gap-4">
        {options.map((option) => (
          <Link
            key={option}
            href={`/work/${option !== 'featured' ? option : ''}`}
            className={cn(
              'rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800',
              type === option ? 'text-accent' : '',
            )}
          >
            {option}
          </Link>
        ))}
      </nav>
      <ul>
        <ProjectsMasonry projects={projects} identifier={type} />
      </ul>
    </section>
  )
}
