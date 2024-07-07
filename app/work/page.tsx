import { Projects } from 'app/components/projects';
import {projects} from 'gaboesquivel';

export default function WorkPage() {
const tag = 'full-time'
  const filteredProjects = projects.filter(project => project.tags.includes(tag));
  return <Projects projects={filteredProjects} tag={tag} />
}
