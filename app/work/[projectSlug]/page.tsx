import { Project } from 'components/work/project';
import { getProjectBySlug } from 'gaboesquivel';

export default function ProjectPage({params}: {params: {projectSlug: string}}){
  const project = getProjectBySlug(params.projectSlug);
  return <Project project={project} full={true} />
}
