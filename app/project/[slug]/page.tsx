import { Project } from 'components/work/project';
import { getProjectBySlug } from 'gaboesquivel';

export default function ProjectPage({params}: {params: {slug: string}}){
  const project = getProjectBySlug(params.slug);
  return <Project project={project} full={true} />
}
