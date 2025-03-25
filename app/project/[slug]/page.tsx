import { ProjectDetails } from 'components/work/project'
import { getProjectBySlug } from 'gaboesquivel'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) redirect('/')

  return <ProjectDetails project={project} full={true} />
}

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

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
