import { imageHover } from "components/shared/motion";
import { editorialLink, sectionAction } from "components/shared/spacing";
import { CoverMorph } from "components/work/cover-morph";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import {
  projectCoverPosition,
  resolveProjectImage,
} from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

/** Homepage-only copy: what Gabo personally built, in one line per project. */
const leadContribution =
  "I built the voice and chat assistant attorneys use to retrieve case information and summarize documents.";

const supportingCaptions: Record<string, string> = {
  bitlauncher: "Token auctions and cross-chain wallets for an AI launchpad.",
  wink: "Mobile banking for Costa Rica’s first neobank.",
  ztx: "Embedded wallets and NFT trading inside a virtual world.",
};

const leadSizes =
  "(max-width: 1023px) calc(100vw - 2rem), (max-width: 1151px) calc((100vw - 4rem) * 0.6), 640px";

const supportingSizes =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1151px) calc((100vw - 5rem) / 3), 340px";

const Cover = ({
  priority = false,
  project,
  sizes,
}: {
  priority?: boolean;
  project: Project;
  sizes: string;
}) => {
  const image = resolveProjectImage({ project });
  if (!image) return null;

  return (
    <CoverMorph slug={project.slug}>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <Image
          alt={image.alt}
          className={cn("bg-neutral-900 object-cover", imageHover)}
          fill
          loading={priority ? "eager" : undefined}
          preload={priority}
          sizes={sizes}
          src={image.src}
          style={{ objectPosition: projectCoverPosition(project) }}
        />
      </div>
    </CoverMorph>
  );
};

const LeadCase = ({ project }: { project: Project }) => {
  const href = `/project/${project.slug}`;
  const meta = [project.role, project.year].filter(Boolean).join(" · ");

  return (
    <article className="grid items-center gap-6 lg:grid-cols-[3fr_2fr] lg:gap-8 xl:gap-9">
      <Link
        aria-hidden="true"
        className="group block"
        href={href}
        tabIndex={-1}
      >
        <Cover project={project} sizes={leadSizes} />
      </Link>
      <div className="min-w-0">
        {meta ? <p className="text-sm text-neutral-400">{meta}</p> : null}
        <h3 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-neutral-300">
          {leadContribution}
        </p>
        <Link
          className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          href={href}
        >
          Read the case study <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
};

const SupportingCase = ({ project }: { project: Project }) => (
  <Link
    className={cn("group block", editorialLink)}
    href={`/project/${project.slug}`}
  >
    <Cover project={project} sizes={supportingSizes} />
    <h3 className="mt-4 text-xl font-semibold tracking-tight">
      {project.title}
    </h3>
    <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-neutral-400">
      {supportingCaptions[project.slug] ??
        project.description.replaceAll("\n", " ")}
    </p>
  </Link>
);

/**
 * Homepage selected work: one lead case (image and story), then the rest as a
 * quieter row. `/work` keeps its own layouts.
 */
export const FeaturedWork = ({ projects }: { projects: Project[] }) => {
  const [lead, ...rest] = projects;
  if (!lead) return null;

  return (
    <section>
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
        <Link className={sectionAction} href="/work">
          View all work <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <LeadCase project={lead} />
      {rest.length > 0 ? (
        <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6 lg:mt-12 lg:gap-8">
          {rest.map((project) => (
            <li key={project.slug}>
              <SupportingCase project={project} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};
