import { ProjectDetails } from 'components/work/project'
import { getProjectBySlug, projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) redirect('/')

  return <ProjectDetails project={project} full={true} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) redirect('/')

  return {
    title: project.title,
    description: project.description.split('\n')[0],
    openGraph: {
      title: project.title,
      description: project.description.split('\n')[0],
      images: [project.image],
    },
  }
}
