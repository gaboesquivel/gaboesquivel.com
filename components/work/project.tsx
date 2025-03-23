import { VimeoPlayer } from 'components/vimeo'
import { YouTubePlayer } from 'components/youtube'
import { type Project, type Tag, getTechStackByTag } from 'gaboesquivel'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { PostGrid } from '../blog/posts-grid'

export function ProjectDetails({
  project,
  full = false,
}: { project: Project; full?: boolean }) {
  return (
    <div className="mb-10">
      <h2 className="mb-6 max-w-[650px] font-bold text-2xl tracking-tighter">
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
        <div className="relative mb-6 h-[200px] w-full md:h-[400px]">
          <Image
            src={project.image.replace('https://gaboesquivel.com', '')}
            alt={`${project.title} Image`}
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
        <div className="relative mb-6 h-[200px] w-full md:h-[400px]">
          {project.video.includes('youtube') ? (
            <YouTubePlayer title={project.title} url={project.video} />
          ) : project.video.includes('vimeo') ? (
            <VimeoPlayer title={project.title} url={project.video} />
          ) : null}
        </div>
      )}

      {full && project.achievements && project.achievements.length > 0 && (
        <>
          <h3 className="mb-4 font-bold text-base tracking-tighter">
            Achievements
          </h3>
          <ol className="mb-4 list-inside list-disc space-y-4">
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
              className="relative mb-6 h-[200px] w-full md:h-[400px]"
            >
              <Image
                src={image.replace('https://gaboesquivel.com', '')}
                alt={`${project.title} Image`}
                fill={true}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}

      {full && project.link && project.link !== project.repo && (
        <p className="mt-10 text-sm">
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
          const techItem = getTechStackByTag(tech as Tag)
          if (!techItem) return null
          return (
            <Link
              href={`/tech/${techItem?.slug}`}
              key={`${project.slug}-${techIndex}`}
            >
              <span>
                {techItem.name}
                {techIndex !== project.tech.length - 1 ? ', ' : ''}
              </span>
            </Link>
          )
        })}
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
        <PostGrid
          posts={project.related.map((post) => ({
            slug: post.url,
            title: post.title,
            publishedAt: post.publishedAt,
          }))}
          title="Related Posts"
        />
      )}
    </div>
  )
}
