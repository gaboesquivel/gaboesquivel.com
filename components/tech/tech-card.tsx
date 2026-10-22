import { SiteCardLink } from "components/shared/site-card-link";
import { cardArrow, proseClass } from "components/shared/spacing";
import type { TechStackItem } from "gaboesquivel";
import { getProjectsByTechnology } from "gaboesquivel";
import { cn } from "lib/utils";

export function TechCard({ tech }: TechCardProps) {
  const projects = getProjectsByTechnology(tech.tag);
  const projectCount = projects.length;

  return (
    <SiteCardLink className="group" href={`/tech/${tech.slug}`}>
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="font-medium">
          {tech.name}
          <span className="ml-1 text-xs text-neutral-400">
            - {projectCount} {projectCount === 1 ? "project" : "projects"}
          </span>
        </h3>
        <span aria-hidden className={cardArrow}>
          →
        </span>
      </div>
      <p className={cn(proseClass, "line-clamp-2 flex-grow text-sm")}>
        {tech.description}
      </p>
    </SiteCardLink>
  );
}

interface TechCardProps {
  tech: TechStackItem;
}
