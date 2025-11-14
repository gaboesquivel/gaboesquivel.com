import { getProjectsByTechnology, techStack } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export default function TechStackPage() {
  return (
    <div>
      <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
        <Balancer>Gabo's Tech Stack</Balancer>
      </h2>
      <ul>
        {techStack.map((tech) => {
          const projects = getProjectsByTechnology(tech.tag)
          return (
            <Link
              key={tech.tag}
              className="flex flex-col space-y-1"
              href={`/tech/${tech.slug}`}
            >
              <ul className="flex flex-col w-full">
                <li className="tracking-tight text-neutral-900 dark:text-neutral-100 hover:text-accent">
                  <p className="my-2">
                    {tech.name}{' '}
                    <span className="text-xs text-neutral-400">
                      {' '}
                      since {tech.since} · {projects.length}{' '}
                      {projects.length === 1 ? 'project' : 'projects'}{' '}
                    </span>
                  </p>
                  <p className="prose prose-neutral dark:prose-invert text-sm">
                    {' '}
                    {tech.description}
                  </p>
                </li>
              </ul>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Tech Stack | Gabo Esquivel',
  openGraph: {
    title: 'Tech Stack | Gabo Esquivel',
    type: 'website',
  },
}
