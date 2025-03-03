'use client'
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from 'gaboesquivel';

/**
 * ProjectCard component displays a project in a card format
 * with image, title and description, linking to the project detail page
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link 
      href={`/project/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-300"
    >
      {/* Image container with aspect ratio and overflow control */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        {project.image && (
          <Image
            src={project.image.replace('https://gaboesquivel.com', '')}
            alt={project.title}
            fill
            priority={priority} // Load with priority if specified
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>
      {/* Content section with title and description */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 line-clamp-3">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

/**
 * Props for the ProjectCard component
 * @property {Project} project - The project data to display
 * @property {boolean} priority - Whether to prioritize loading the image
 */
interface ProjectCardProps {
    project: Project;
    priority?: boolean;
}
  