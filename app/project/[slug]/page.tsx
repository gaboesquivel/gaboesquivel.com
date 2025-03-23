import { ProjectDetails } from 'components/work/project';
import { getProjectBySlug } from 'gaboesquivel';

import { redirect } from 'next/navigation';

export default function ProjectPage({params}: {params: {slug: string}}){
  const project = getProjectBySlug(params.slug);

  if (!project)  redirect('/');

  return <ProjectDetails project={project} full={true} />
}
