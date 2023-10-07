import Image from 'next/image';
import { projects } from 'gaboesquivel'
import Balancer from 'react-wrap-balancer';
import { YouTubePlayer } from 'app/components/youtube';

export default function WorkPAge() {
  return (
    <section>
        <ul>
        {projects.map((project, index) => (
          <li key={index}>


             <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
            <Balancer>{project.title}</Balancer>
            </h2>

            <p>{project.description}</p>

              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <div className='h-[400px] w-full relative mb-6'>
                  <Image
                    src={project.image.replace("https://gaboesquivel.com","")}
                    alt={`${project.title} Image`} // Provide alt text
                    // width={'100%'} // Set your desired width
                    // height={400} // Set your desired height
                    fill={true}
                  />
                </div>
              </a> 
     
            <p>
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex}>{tech} {techIndex !== project.technologies.length - 1 ? ", ": ""}</span>
              ))}
            </p>
                
            <p>
        
              {project.repo && (
                <span>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                   { project.repo}
                  </a>  
                </span>
                           
              )}
            </p>

            {project.video && (<YouTubePlayer url={project.video}/>)}
          </li>
        ))}
      </ul>
      
    </section>
  );
}
