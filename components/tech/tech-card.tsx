import { SiteCardLink } from "components/shared/site-card-link";
import { proseClass } from "components/shared/spacing";
import type { TechStackItem } from "gaboesquivel";
import { getProjectsByTechnology } from "gaboesquivel";
import { cn } from "lib/utils";

export function TechCard({ tech }: TechCardProps) {
  const projects = getProjectsByTechnology(tech.tag);
  const projectCount = projects.length;

  return (
    <SiteCardLink href={`/tech/${tech.slug}`}>
      <h3 className="mb-1 font-medium">
        {tech.name}
        <span className="ml-1 text-xs text-neutral-400">
          - {projectCount} {projectCount === 1 ? "project" : "projects"}
        </span>
      </h3>
      <p className={cn(proseClass, "line-clamp-2 flex-grow text-sm")}>
        {tech.description}
      </p>
    </SiteCardLink>
  );
}

interface TechCardProps {
  tech: TechStackItem;
}
