import { Projects } from 'components/work/projects';
import {projects} from   'gaboesquivel';

export default function WorkPage() {
  const type = 'featured'
  const filteredProjects = projects.filter(project => project.type.includes(type));
  return <Projects projects={filteredProjects} type={type} />
}
