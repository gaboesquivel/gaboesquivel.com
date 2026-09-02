import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'

export default async function WorkPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type: rawType } = await params
  const type = rawType || 'featured'
  const filteredProjects =
    type === 'all'
      ? projects
      : projects.filter((project) => project.type.includes(type))
  return (
    <>
      <Projects projects={filteredProjects} type={type} />
      <LatestPosts />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Work & Projects | Gabo Esquivel',
  description:
    'Selected projects across AI, Web3, fintech, and full-stack product engineering.',
  openGraph: {
    title: 'Work & Projects | Gabo Esquivel',
    description:
      'Selected projects across AI, Web3, fintech, and full-stack product engineering.',
    type: 'website',
  },
}
