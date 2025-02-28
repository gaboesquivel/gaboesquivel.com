import Balancer from 'react-wrap-balancer'
import Image from 'next/image'
import { YouTubePlayer } from 'app/components/youtube'

export function Project({
  project,
  full = false,
}: { project: any; full?: boolean }) {
  return (
    <div>
      <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
        <Balancer>{project.title}</Balancer>
      </h2>

      {project.description.split('\n').map((item, descriptionId) => {
        return (
          <p
            key={`${project.slug}-${descriptionId}`}
            className="prose prose-neutral dark:prose-invert"
          >
            {item}
            <br />
          </p>
        )
      })}

      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <div className="h-[200px] md:h-[400px] w-full relative mb-6">
          <Image
            src={project.image.replace('https://gaboesquivel.com', '')}
            alt={`${project.title} Image`} // Provide alt text
            // width={'100%'} // Set your desired width
            // height={400} // Set your desired height
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </a>

      {full && project.achievements && project.achievements.length > 0 && (
        <div className="lmb-4">
          {project.achievements.map((achievement, index) => (
            <p
              key={`${project.slug}-achievement-${index}`}
              className="prose prose-neutral dark:prose-invert"
            >
              {achievement}
            </p>
          ))}
        </div>
      )}

      {project.video && (
        <div className="h-[200px] md:h-[400px] w-full relative mb-6">
          <YouTubePlayer title={project.title} url={project.video} />
        </div>
      )}

      <p className="text-sm">
        {' '}
        Stack:{' '}
        {project.technologies.map((tech, techIndex) => (
          <span key={`${project.slug}-${techIndex}`}>
            {tech}
            {techIndex !== project.technologies.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>

      <p className="text-sm">
        {project.repo && (
          <span>
            Repo:{' '}
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              {project.repo}
            </a>
          </span>
        )}
      </p>
    </div>
  )
}
