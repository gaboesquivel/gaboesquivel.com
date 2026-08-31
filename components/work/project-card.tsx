import type { Project } from 'gaboesquivel'
import Image from 'next/image'
import Link from 'next/link'

export function ProjectCard({
  project,
  priority = false,
  showRole = false,
  wide = false,
}: {
  project: Project
  priority?: boolean
  showRole?: boolean
  wide?: boolean
}) {
  const src = project.image?.replace('https://gaboesquivel.com', '')

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-zinc-200/50 transition-all duration-300 dark:border-zinc-700/50"
    >
      {src ? (
        wide ? (
          <Image
            src={src}
            alt={project.title}
            width={1600}
            height={1067}
            priority={priority}
            sizes="(max-width: 768px) 100vw, 896px"
            className="h-auto w-full transition-transform duration-500 group-hover:scale-110"
            style={{ width: '100%', height: 'auto' }}
          />
        ) : (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={src}
              alt={project.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )
      ) : null}
      <div className="flex-grow p-4">
        <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h3>
        {showRole && project.role ? (
          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
            {project.role}
          </p>
        ) : null}
        <p className="prose prose-neutral line-clamp-3 dark:prose-invert">
          {project.description}
        </p>
      </div>
    </Link>
  )
}
