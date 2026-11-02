import { BioNarrativeParagraph } from "components/bio/bio-paragraph";
import { ctaLink, editorialLink } from "components/shared/spacing";
import { getProjectBySlug } from "gaboesquivel";
import type { BioChapter } from "lib/bio/chapters";
import { cn } from "lib/utils";
import Link from "next/link";

const actionLink = cn(ctaLink, editorialLink, "text-sm");

export function BioStoryDisclosure({
  chapter,
  groundedProjectIds,
}: {
  chapter: BioChapter;
  /** When set, only list projects present in GenUI evidence. */
  groundedProjectIds?: readonly string[];
}) {
  const projects = chapter.projectSlugs.flatMap((slug) => {
    const projectId = `/project/${slug}`;
    if (groundedProjectIds && !groundedProjectIds.includes(projectId)) {
      return [];
    }
    const project = getProjectBySlug(slug);
    return project ? [project] : [];
  });

  const hasExpandedBody =
    chapter.expandedParagraphs.length > 0 ||
    chapter.links.length > 0 ||
    projects.length > 0;

  if (!hasExpandedBody) return null;

  return (
    <details className="group mt-6">
      <summary
        className={cn(
          "inline-flex w-fit cursor-pointer list-none items-center gap-2 rounded-lg border border-hairline px-4 py-2.5 text-sm text-white",
          "transition-colors hover:border-neutral-600 hover:text-accent",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
          "[&::-webkit-details-marker]:hidden"
        )}
      >
        <span className="group-open:hidden">Read the full story</span>
        <span className="hidden group-open:inline">Close story</span>
        <span className="sr-only">: {chapter.title}</span>
        <span aria-hidden="true" className="text-accent group-open:rotate-180">
          ↓
        </span>
      </summary>
      <div className="mt-5 space-y-5">
        {chapter.expandedParagraphs.map((paragraph, index) => (
          <BioNarrativeParagraph
            key={`${chapter.id}-expanded-${index}`}
            paragraph={paragraph}
          />
        ))}
        {groundedProjectIds && projects.length > 0 ? (
          <ul className="space-y-4">
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
        ) : null}
        {!groundedProjectIds && chapter.links.length > 0 ? (
          <p className="m-0 flex flex-wrap gap-x-6 gap-y-3">
            {chapter.links.map((link) => (
              <Link key={link.href} className={actionLink} href={link.href}>
                {link.label}
              </Link>
            ))}
          </p>
        ) : null}
      </div>
    </details>
  );
}
