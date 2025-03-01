
import { techStack } from   'gaboesquivel';
import Link from 'next/link';

export default function TechStackPage() {
  const techList = techStack.map((tech) => (
    <Link
    key={tech.tag}
    className="flex flex-col space-y-1"
    href={`/tech/${tech.tag}`}
  >
    <ul className="flex flex-col w-full">
      <li className="tracking-tight text-neutral-90 dark:text-neutral-100 hover:text-accent">
       <p className='my-2'>{tech.name}  <span className='text-xs text-neutral-400'> since {tech.since} </span></p>
       <p className='prose prose-neutral text-white text-sm'>  {tech.description}</p>
      </li>

    </ul>
  </Link>
  ));

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">Gabo's Tech Stack</h1>
      <ul>
        {techList}
      </ul>
    </div>
  );
}
