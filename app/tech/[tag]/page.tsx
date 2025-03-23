import TechStack from 'components/tech/tech-stack';
import {getTechStackBySlug} from 'gaboesquivel';

export default function TechPage({params}: {params: {tag: string}}){
  const tech = getTechStackBySlug(params.tag); 
  if (!tech) return <div>Tech not found</div>
  return <TechStack tech={tech} />
}
