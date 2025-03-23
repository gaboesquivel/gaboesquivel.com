import TechStack from 'components/tech/tech-stack';
import {getTechStackBySlug} from 'gaboesquivel';
import {redirect} from 'next/navigation';

export default function TechPage({params}: {params: {tag: string}}){
  const tech = getTechStackBySlug(params.tag); 
  if (!tech)  redirect('/');
  return <TechStack tech={tech} />
}
