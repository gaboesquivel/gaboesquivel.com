import Image from 'next/image';
import Balancer from 'react-wrap-balancer';
import {YouTubePlayer} from 'app/components/youtube';
import Link from 'next/link';
import { cn } from 'lib/utils';

const options = ['full-time', 'contract', 'ai', 'web3', 'lead', 'oss', 'hackathon', 'other'] // 'personal'

export function Projects({projects, tag}: {projects: any[], tag: string}) {
  return (
      <section>
              <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
            <Balancer>My Portfolio - <span className="capitalize">{tag}</span></Balancer>
            </h2>
            <nav className='flex flex-wrap gap-2 md:gap-4'>
                {options.map((option, optionIndex) => (
                    <Link key={optionIndex} href={`/projects/${option !== 'full-time' ? option : ''}`} className={cn('rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800', tag === option ? 'text-accent' : '')}>
                        {option}
                    </Link>
                ))}
            </nav>
        <ul>
        {projects.map((project, projectId) => (
          <li key={projectId} className='pt-20'>
             <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
            <Balancer>{project.title}</Balancer>
            </h2>

            {project.description.split("\n").map(function(item, descriptionId) {
                return (
                    <p key={projectId+"-"+descriptionId} className="prose prose-neutral dark:prose-invert">
                        {item}
                        <br/>
                    </p>
                )
            })}

              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <div className='h-[200px] md:h-[400px] w-full relative mb-6'>
                  <Image
                    src={project.image.replace("https://gaboesquivel.com","")}
                    alt={`${project.title} Image`} // Provide alt text
                    // width={'100%'} // Set your desired width
                    // height={400} // Set your desired height
                    fill={true}
                    style={{objectFit:"cover"}}
                  />
                </div>
              </a> 
     
            <p className='text-sm'> Stack: {' '}
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex}>{tech}{techIndex !== project.technologies.length - 1 ? ", ": ""}</span>
              ))}
            </p>
                
            <p className='text-sm'>
        
              {project.repo && (
                <span>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                   { project.repo}
                  </a>  
                </span>
                           
              )}
            </p>

               
            {project.video && (
              <div className='h-[200px] md:h-[400px] w-full relative mb-6'>
                <YouTubePlayer title={project.title} url={project.video}/> 
              </div>
              )
            }
           

          </li>
        ))}
      </ul>
      
    </section>
  )
}