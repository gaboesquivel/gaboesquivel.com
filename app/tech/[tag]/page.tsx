import TechStack from 'components/tech/tech-stack';
import {getTechStackByTag} from 'gaboesquivel';

export default function TechPage({params}: {params: {tag: string}}){
  const tech = getTechStackByTag(params.tag); 
  if (!tech) return <div>Tech not found</div>
  return <TechStack tech={tech} />
}
