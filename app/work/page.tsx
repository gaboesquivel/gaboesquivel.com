import Image from 'next/image';
import gaboesquivel from 'gaboesquivel'

export default function BioPage() {
  return (
    <section>
        <ul>
        {gaboesquivel.projects.map((project, index) => (
          <li key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>
              {project.technologies.map((tech, techIndex) => (
                <li key={techIndex}>{tech}</li>
              ))}
            </ul>
                <p>
            {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  Visit Project
                </a>
            )}
            {project.video && (
                <a href={project.video} target="_blank" rel="noopener noreferrer">
                  Video
                </a>
            )}
            {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  Video
                </a>            
            )}
            </p>
            {project.image && (
              <div>
                <Image
                  src={project.image.replace("https://gaboesquivel.com","")}
                  alt={`${project.title} Image`} // Provide alt text
                  width={400} // Set your desired width
                  height={300} // Set your desired height
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      
    </section>
  );
}
