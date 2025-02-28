
import Balancer from 'react-wrap-balancer';

import Link from 'next/link';
import { cn } from 'lib/utils';
import {Project} from './project';

const options = ['full-time', 'contract', 'ai', 'web3', 'lead', 'oss', 'hackathon', 'other'] // 'personal'

export function Projects({projects, tag, showMoreLink = true}: {projects: any[], tag?: string, showMoreLink?: boolean}) {
  return (
      <section>
              <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
            {tag ? <Balancer>My Portfolio - <span className="capitalize">{tag}</span></Balancer> : null }
            </h2>
            <nav className='flex flex-wrap gap-2 md:gap-4'>
                {options.map((option) => (
                    <Link key={option} href={`/work/t/${option !== 'full-time' ? option : ''}`} className={cn('rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800', tag === option ? 'text-accent' : '')}>
                        {option}
                    </Link>
                ))}
            </nav>
        <ul>
        {projects.map((project) => (
          <li key={project.slug} className='pt-20'>
            <Project project={project} />

           {showMoreLink ? (
             <div className='mt-4'>
               <Link 
                 href={`/work/${project.slug}`} 
                 className='text-sm focus-visible:outline-offset-2 transition-colors'
                 aria-label={`Read more about ${project.title} experience`}
               >
                 Read more about {project.title} experience →
               </Link>
             </div>
           ) : null}

          </li>
        ))}
      </ul>
      
    </section>
  )
}