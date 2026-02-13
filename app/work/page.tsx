import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'

export default function WorkPage() {
  const type = 'featured'
  const filteredProjects = projects.filter((project) =>
    project.type.includes(type),
  )
  return (
    <>
      <Projects projects={filteredProjects} type={type} />
      <LatestPosts />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Work & Projects | Gabo Esquivel',
  openGraph: {
    title: 'Work & Projects | Gabo Esquivel',
    type: 'website',
  },
}
