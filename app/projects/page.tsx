import Image from 'next/image';
import { projects } from 'gaboesquivel'
import Balancer from 'react-wrap-balancer';
import { YouTubePlayer } from 'app/components/youtube';

export default function WorkPAge() {
  return (
    <section>
        <ul>
        {projects.map((project, projectId) => (
          <li key={projectId}>


             <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
            <Balancer>{project.title}</Balancer>
            </h2>

            {project.description.split("\\n").map(function(item, descriptionId) {
                return (
                    <p key={projectId+"-"+descriptionId}>
                        {item}
                        <br/>
                    </p>
                )
            })}

              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <div className='h-[400px] w-full relative mb-6'>
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
     
            <p>
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex}>{tech}{techIndex !== project.technologies.length - 1 ? ", ": ""}</span>
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

               
            {project.video && (
              <div className='h-[400px] w-full relative mb-6'>
                <YouTubePlayer title={project.title} url={project.video}/> 
              </div>
              )
            }
           

          </li>
        ))}
      </ul>
      
    </section>
  );
}
