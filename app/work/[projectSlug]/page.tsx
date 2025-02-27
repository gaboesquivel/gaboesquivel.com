import { Project } from 'app/components/work/project';
import {projects} from 'gaboesquivel';

export default function ProjectPage({params}: {params: {projectSlug: string}}){
  const [project] = projects.filter(project => project.slug === params.projectSlug);
  return <Project project={project} />
}
