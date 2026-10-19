import { cardLink, proseClass } from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import Image from "next/image";

export function ProjectMedia({ project }: { project: Project }) {
  const src = project.image?.replace("https://gaboesquivel.com", "");
  const href = `/project/${project.slug}`;
  const label = `${project.title} (opens in a new tab)`;

  return (
    <a
      aria-label={label}
      className={cn(cardLink, "flex-row items-stretch gap-3 p-3")}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {src ? (
        <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg">
          <Image alt="" className="object-cover" fill sizes="112px" src={src} />
        </div>
      ) : null}
      <div className="min-w-0 flex-1 py-0.5">
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          {project.title}
        </p>
        <p className={cn(proseClass, "mt-1 line-clamp-2 text-sm")}>
          {project.description}
        </p>
      </div>
    </a>
  );
}

export function ProjectMediaStack({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <ul className="mt-3 flex flex-col gap-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectMedia project={project} />
        </li>
      ))}
    </ul>
  );
}
