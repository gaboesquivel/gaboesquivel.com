import {
  IndexHeading,
  Prose,
  projectMedia,
  subHeadingSm,
} from 'components/shared/page-layout'
import { blockSpacing } from 'components/shared/spacing'
import { VimeoPlayer } from 'components/vimeo'
import { YouTubePlayer } from 'components/youtube'
import { type Project, type Tag, getTechStackByTag } from 'gaboesquivel'
import { cn } from 'lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LatestPosts } from '../blog/latest-posts'
import { PostGrid } from '../blog/posts-grid'

export function ProjectDetails({
  project,
  full = false,
}: { project: Project; full?: boolean }) {
  return (
    <div className="mb-10">
      <IndexHeading>{project.title}</IndexHeading>

      {project.description.split('\n').map((item, descriptionId) => (
        <Prose key={`${project.slug}-${descriptionId}`}>
          {item}
          <br />
        </Prose>
      ))}

      {full && !project.link ? (
        <div className={projectMedia}>
          <Image
            src={project.image.replace('https://gaboesquivel.com', '')}
            alt={`${project.title} Image`}
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : full ? (
        <Link
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          href={project.link!}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={projectMedia}>
            <Image
              src={project.image.replace('https://gaboesquivel.com', '')}
              alt={`${project.title} Image`}
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Link>
      ) : (
        <Link href={`/project/${project.slug}`}>
          <div className={projectMedia}>
            <Image
              src={project.image.replace('https://gaboesquivel.com', '')}
              alt={`${project.title} Image`}
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Link>
      )}

      {full && project.story && project.story.length > 0 && (
        <div className="mb-4">
          {project.story.map((achievement, index) => (
            <p key={`${project.slug}-achievement-${index}`}>{achievement}</p>
          ))}
        </div>
      )}

      {full && project.video && (
        <div className={projectMedia}>
          {project.video.includes('youtube') ? (
            <YouTubePlayer title={project.title} url={project.video} />
          ) : project.video.includes('vimeo') ? (
            <VimeoPlayer title={project.title} url={project.video} />
          ) : null}
        </div>
      )}

      {full && project.achievements && project.achievements.length > 0 && (
        <>
          <h3 className={subHeadingSm}>Achievements</h3>
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
            <div key={`${image}`} className={projectMedia}>
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
        <p className={cn(blockSpacing, 'text-sm')}>
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

      {project.type && project.type.length > 0 && (
        <p className="text-sm mt-1">
          <span className="font-bold">Experience:</span> {(() => {
            // Map of types to their display names and URLs
            const typeMap: Record<
              string,
              { display: string; url: string } | undefined
            > = {
              frontend: { display: 'Frontend', url: '/frontend' },
              backend: { display: 'Backend', url: '/backend' },
              fullstack: { display: 'Fullstack', url: '/fullstack' },
              mobile: { display: 'React Native', url: '/mobile' },
              web3: { display: 'Web3', url: '/web3' },
              ai: { display: 'AI', url: '/ai' },
            }

            // Filter types that have entries in the map
            const validTypes = project.type
              .map((type) => typeMap[type])
              .filter(Boolean) as { display: string; url: string }[]

            // Return the links
            return validTypes.map((item, index) => (
              <React.Fragment key={`${project.slug}-type-${index}`}>
                <Link href={item.url}>
                  <span>{item.display}</span>
                </Link>
                {index !== validTypes.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))
          })()}
        </p>
      )}

      {full && project.repo && (
        <p className="text-sm">
          <span className="font-bold">Repo:</span>{' '}
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            {project.repo}
          </a>
        </p>
      )}

      {full &&
        (project.related && project.related.length > 0 ? (
          <PostGrid
            posts={project.related.map((post) => ({
              slug: post.url,
              title: post.title,
              publishedAt: post.publishedAt,
            }))}
            title="Related Posts"
          />
        ) : (
          <LatestPosts />
        ))}
    </div>
  )
}
