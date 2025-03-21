import { Projects } from 'components/work/projects';
import {projects} from 'gaboesquivel';

export default function WorkPage({params}: {params: {type: string}}){
  const type = params.type || 'featured'
  const filteredProjects = type === 'all' ? projects : projects.filter(project => project.type.includes(type));
  return <Projects projects={filteredProjects} type={type} />
}
