import { Projects } from 'app/components/work/projects';
import {projects} from 'gaboesquivel';

export default function WorkPage({params}: {params: {tag: string}}){
const tag = params.tag || 'full-time'
  const filteredProjects = projects.filter(project => project.tags.includes(tag));
  return <Projects projects={filteredProjects} tag={tag} />
}
