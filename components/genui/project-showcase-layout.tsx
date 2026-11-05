"use client";

import type { Project } from "gaboesquivel";
import {
  comparisonDimensionLabel,
  comparisonValue,
  defaultComparisonDimensions,
  missingComparisonValue,
} from "lib/genui/comparison-dimensions";
import type {
  ComparisonDimension,
  ComparisonValue,
} from "lib/genui/comparison-dimensions";
import { materializeProjectSlots } from "lib/genui/composition-plan";
import type {
  ProjectCompositionRecipe,
  ProjectCompositionRole,
} from "lib/genui/composition-plan";
import { projectSlugFromPublicId } from "lib/genui/project-from-id";
import { cn } from "lib/utils";

import { ProjectShowcaseCard } from "./project-showcase-card";
import { ProjectTimeline } from "./project-timeline";

const showcaseSizes = {
  lead: "(max-width: 47.99rem) 100vw, (max-width: 63.99rem) 50vw, 36rem",
  secondary: "(max-width: 47.99rem) 100vw, (max-width: 63.99rem) 50vw, 18rem",
  list: "(max-width: 47.99rem) 100vw, 24rem",
};

const lgSpan = {
  1: "@min-[64rem]/project-showcase:col-span-12",
  2: "@min-[64rem]/project-showcase:col-span-6",
  3: "@min-[64rem]/project-showcase:col-span-4",
} as const;

/**
 * Row sizes (1 to 3 cards) that fill a 12-column grid for any card count, so a
 * row never ends with a hole: 4 becomes 2+2, 5 becomes 3+2.
 */
const rowSizes = (count: number): (1 | 2 | 3)[] => {
  if (count <= 0) return [];
  if (count <= 3) return [count as 1 | 2 | 3];
  if (count === 4) return [2, 2];
  return [3, ...rowSizes(count - 3)];
};

/** Column span per card, from the card's index in the flow. */
const flowSpans = (count: number) =>
  rowSizes(count).flatMap((size) =>
    Array.from({ length: size }, () => lgSpan[size])
  );

/** Two columns from 36rem; a trailing odd card spans both so it never floats. */
const flowGrid =
  "grid grid-cols-1 gap-4 @min-[36rem]/project-showcase:grid-cols-2 @min-[64rem]/project-showcase:grid-cols-12 @min-[64rem]/project-showcase:gap-6";
/** Cards in one row share its height; no card is ever taller than its row. */
const rowCard = "[&>article]:h-full";
const flowOrphan =
  "@min-[36rem]/project-showcase:@max-[63.99rem]/project-showcase:[&:last-child:nth-child(odd)]:col-span-2";

const ComparisonCell = ({ value }: { value: ComparisonValue }) => {
  if (!value) {
    return <p className="text-neutral-400">{missingComparisonValue}</p>;
  }
  if (typeof value === "string") {
    return <p className="text-neutral-200">{value}</p>;
  }
  return (
    <ul className="space-y-2 text-neutral-200">
      {value.map((item) => (
        <li key={item} className="border-l border-hairline pl-3">
          {item}
        </li>
      ))}
    </ul>
  );
};

const comparisonRole: ProjectCompositionRole = "comparison-item";

/** Two or three projects side by side, one aligned row per requested dimension. */
const ProjectComparison = ({
  dimensions,
  projects,
}: {
  dimensions: ComparisonDimension[];
  projects: Project[];
}) => {
  const columns =
    projects.length === 3
      ? "@min-[40rem]/project-showcase:grid-cols-3"
      : "@min-[40rem]/project-showcase:grid-cols-2";
  return (
    <div className="@container/project-showcase space-y-8">
      <div className={`grid grid-cols-1 gap-6 ${columns}`}>
        {projects.map((project, index) => (
          <ProjectShowcaseCard
            index={index}
            key={project.slug}
            priority={index === 0}
            project={project}
            role={comparisonRole}
            sizes={showcaseSizes.secondary}
          />
        ))}
      </div>
      <dl className="divide-y divide-hairline border-y border-hairline text-sm">
        {dimensions.map((dimension) => (
          <div key={dimension} className="py-5" data-comparison-row={dimension}>
            <dt className="mb-3 font-semibold text-white">
              {comparisonDimensionLabel(dimension)}
            </dt>
            <dd className={`grid grid-cols-1 gap-x-6 gap-y-4 ${columns}`}>
              {projects.map((project) => (
                <div key={project.slug} className="min-w-0">
                  <p className="mb-1 text-xs text-neutral-400 @min-[40rem]/project-showcase:sr-only">
                    {project.title}
                  </p>
                  <ComparisonCell
                    value={comparisonValue({ dimension, project })}
                  />
                </div>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export const ProjectShowcaseLayout = ({
  composite,
  dimensions,
  projectIds,
  projects,
}: {
  composite: ProjectCompositionRecipe;
  dimensions?: ComparisonDimension[];
  domain?: "ai" | "web3" | "all";
  projectIds: string[];
  projects: Project[];
}) => {
  const plan = materializeProjectSlots(composite, projectIds);
  const ordered = plan.slots.flatMap((slot) => {
    const slug = projectSlugFromPublicId(slot.projectId);
    const project = projects.find((item) => item.slug === slug);
    return project ? [{ project, role: slot.role }] : [];
  });

  if (composite === "project-compact-list") {
    return (
      <div className="@container/project-showcase">
        <ul className="divide-y divide-hairline border-y border-hairline">
          {ordered.map(({ project }) => (
            <li key={project.slug} className="py-4">
              <a
                className="group block text-accent hover:underline"
                href={`/project/${project.slug}`}
              >
                <span className="text-lg font-semibold text-white group-hover:text-accent">
                  {project.title}
                </span>
                <p className="mt-1 text-sm text-neutral-400">
                  {project.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (composite === "project-timeline") {
    return <ProjectTimeline projects={ordered.map(({ project }) => project)} />;
  }

  if (composite === "project-comparison") {
    return (
      <ProjectComparison
        dimensions={
          dimensions?.length ? dimensions : defaultComparisonDimensions
        }
        projects={ordered.map(({ project }) => project)}
      />
    );
  }

  if (composite === "project-feature-grid") {
    const [lead, ...supporting] = ordered;
    return (
      <div className="@container/project-showcase min-w-0 space-y-4 @min-[64rem]/project-showcase:space-y-6">
        {lead ? (
          <ProjectShowcaseCard
            project={lead.project}
            role={lead.role}
            sizes={showcaseSizes.lead}
            priority
            wide
          />
        ) : null}
        <div className="grid grid-cols-1 gap-4 @min-[36rem]/project-showcase:grid-cols-2 @min-[64rem]/project-showcase:gap-6">
          {supporting.map(({ project, role }, index) => (
            <div
              className={cn("min-w-0", rowCard, flowOrphan)}
              key={project.slug}
            >
              <ProjectShowcaseCard
                index={index + 1}
                project={project}
                role={role}
                sizes={showcaseSizes.secondary}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (composite === "project-bento") {
    const byRole = new Map(ordered.map((item) => [item.role, item]));
    const lead = byRole.get("lead");
    const rest = (
      ["top-right", "bottom-left", "bottom-right"] as const
    ).flatMap((role) => byRole.get(role) ?? []);
    return (
      <div className="@container/project-showcase min-w-0 space-y-4 @min-[64rem]/project-showcase:space-y-6">
        {lead ? (
          <ProjectShowcaseCard
            project={lead.project}
            role={lead.role}
            sizes={showcaseSizes.lead}
            priority
            wide
          />
        ) : null}
        <div className="grid grid-cols-1 gap-4 @min-[36rem]/project-showcase:grid-cols-2 @min-[64rem]/project-showcase:grid-cols-3 @min-[64rem]/project-showcase:gap-6">
          {rest.map(({ project, role }, index) => (
            <div
              className={cn("min-w-0", rowCard, flowOrphan)}
              key={project.slug}
            >
              <ProjectShowcaseCard
                index={index + 1}
                project={project}
                role={role}
                sizes={showcaseSizes.secondary}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (composite === "project-asymmetric-closing") {
    const lead = ordered.find((item) => item.role === "lead");
    const closing = ordered.find((item) => item.role === "closing-feature");
    const firstSupporting = ordered.find((item) => item.role === "supporting");
    const flow = ordered.filter(
      (item) => item !== lead && item !== closing && item !== firstSupporting
    );
    const spans = flowSpans(flow.length);
    return (
      <div className="@container/project-showcase min-w-0 space-y-4 @min-[64rem]/project-showcase:space-y-6">
        {lead || firstSupporting ? (
          <div className="grid grid-cols-1 gap-4 @min-[64rem]/project-showcase:grid-cols-12 @min-[64rem]/project-showcase:gap-6">
            {lead ? (
              <div className="min-w-0 @min-[64rem]/project-showcase:col-span-8">
                <ProjectShowcaseCard
                  project={lead.project}
                  role={lead.role}
                  sizes={showcaseSizes.lead}
                  priority
                />
              </div>
            ) : null}
            {firstSupporting ? (
              <div className="min-w-0 @min-[64rem]/project-showcase:col-span-4">
                <ProjectShowcaseCard
                  index={1}
                  project={firstSupporting.project}
                  role={firstSupporting.role}
                  sizes={showcaseSizes.secondary}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        {flow.length > 0 ? (
          <div className={flowGrid}>
            {flow.map(({ project, role }, index) => (
              <div
                className={cn("min-w-0", rowCard, flowOrphan, spans[index])}
                key={project.slug}
              >
                <ProjectShowcaseCard
                  index={index + 2}
                  project={project}
                  role={role}
                  sizes={showcaseSizes.secondary}
                />
              </div>
            ))}
          </div>
        ) : null}
        {closing ? (
          <ProjectShowcaseCard
            index={flow.length + 2}
            project={closing.project}
            role={closing.role}
            sizes={showcaseSizes.lead}
            wide
          />
        ) : null}
      </div>
    );
  }

  return null;
};
