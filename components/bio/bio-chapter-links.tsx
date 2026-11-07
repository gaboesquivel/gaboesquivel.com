import { ctaLink, editorialLink } from "components/shared/spacing";
import { getProjectBySlug } from "gaboesquivel";
import type { BioChapter } from "lib/bio/chapters";
import { cn } from "lib/utils";
import Link from "next/link";

const actionLink = cn(ctaLink, editorialLink, "text-sm");

/** Project links under a chapter summary. The full story lives in llms and the career timeline. */
export function BioChapterLinks({
  chapter,
  groundedProjectIds,
}: {
  chapter: BioChapter;
  /** When set, only list projects present in GenUI evidence. */
  groundedProjectIds?: readonly string[];
}) {
  if (groundedProjectIds) {
    const projects = chapter.projectSlugs.flatMap((slug) => {
      if (!groundedProjectIds.includes(`/project/${slug}`)) return [];
      const project = getProjectBySlug(slug);
      return project ? [project] : [];
    });
    if (projects.length === 0) return null;

    return (
      <ul className="mt-6 space-y-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link className={actionLink} href={`/project/${project.slug}`}>
              {project.title} →
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-neutral-400">
              {project.description}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  if (chapter.links.length === 0) return null;

  return (
    <p className="m-0 mt-6 flex flex-wrap gap-x-6 gap-y-3">
      {chapter.links.map((link) => (
        <Link key={link.href} className={actionLink} href={link.href}>
          {link.label}
        </Link>
      ))}
    </p>
  );
}
