import Balancer from 'react-wrap-balancer'
import Image from 'next/image'
import { YouTubePlayer } from 'components/youtube'
import Link from 'next/link'
import { VimeoPlayer } from 'components/vimeo'
import {getTechStackByTag, Tag} from 'gaboesquivel';

export function Project({
  project,
  full = false,
}: { project: any; full?: boolean }) {
  return (
    <div className='mb-10'>
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

      <a
        href={full ? project.link : `/work/${project.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
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

      {full && project.story && project.story.length > 0 && (
        <div className="mb-4">
          {project.story.map((achievement, index) => (
            <p key={`${project.slug}-achievement-${index}`}>{achievement}</p>
          ))}
        </div>
      )}

      {full && project.video && (
        <div className="h-[200px] md:h-[400px] w-full relative mb-6">
          {project.video.includes('youtube') ? (
            <YouTubePlayer title={project.title} url={project.video} />
          ) : project.video.includes('vimeo') ? (
            <VimeoPlayer title={project.title} url={project.video} />
          ) : null}
        </div>
      )}

      {full && project.achievements && project.achievements.length > 0 && (
        <>
          <h3 className="font-bold text-base tracking-tighter mb-4">
            Achievements:
          </h3>
          <ol className="mb-4 list-disc list-inside space-y-4">
            {project.achievements.map((achievement, index) => (
              <li
                key={`${project.slug}-achievement-${index}`}
                className="text-base"
              >
                {achievement}
              </li>
            ))}
          </ol>
        </>
      )}

      {full && project.images && project.images.length > 0 && (
        <div className="mb-4">
          {project.images.map((image) => (
            <div
              key={`${image}`}
              className="h-[200px] md:h-[400px] w-full relative mb-6"
            >
              <Image
                src={image.replace('https://gaboesquivel.com', '')}
                alt={`${project.title} Image`} // Provide alt text
                fill={true}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}

      {full && project.link && project.link !== project.repo && (
        <p className="text-sm mt-10">
          <span className="font-bold">Link:</span>{' '}
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.link}
          </a>
        </p>
      )}
      <p className="text-sm ">
        {' '}
        <span className="font-bold">Stack:</span>{' '}
        {project.tech.map((tech, techIndex) => {
            const techItem = getTechStackByTag(tech as Tag); 
          return(
          <Link href={`/tech/${techItem?.slug}`} key={`${project.slug}-${techIndex}`}>
            <span>
              {tech.name}
              {techIndex !== project.tech.length - 1 ? ', ' : ''}
            </span>
          </Link>
        )})}
      </p>

      {full && project.repo && (
        <p className="text-sm">
          <span className="font-bold">Repo:</span>{' '}
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            {project.repo}
          </a>
        </p>
      )}

    {full && project.related && project.related.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Related Posts:</h4>
          <ul className="list-disc list-inside">
            {project.related.map((relatedLink, index) => (
              <li key={`${project.slug}-related-${index}`}>
                <a href={relatedLink.url.replace('https://gaboesquivel.com', '')} className="text-blue-500 hover:underline">
                  {relatedLink.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
