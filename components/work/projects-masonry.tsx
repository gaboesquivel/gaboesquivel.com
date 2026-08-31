'use client'
import { ProjectCard } from 'components/work/project-card'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from 'gaboesquivel'

interface ProjectsMasonryProps {
  projects: Project[]
  identifier?: string
}

export function ProjectsMasonry({
  projects,
  identifier = 'projects',
}: ProjectsMasonryProps) {
  const sortedProjects = [...projects].sort(
    (a, b) =>
      (a.order ?? Number.POSITIVE_INFINITY) -
      (b.order ?? Number.POSITIVE_INFINITY),
  )
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={identifier}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {sortedProjects.map((project, index) => (
          <motion.li
            key={project.slug}
            className="w-full h-full flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )
}
