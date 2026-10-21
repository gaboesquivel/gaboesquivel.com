import { PageCard } from "components/shared/page-card";
import {
  blockGrid,
  PageSection,
  PageTitle,
  Prose,
} from "components/shared/page-layout";
import { blockSpacing } from "components/shared/spacing";
import { featuredLandingPages, landingPageGroups } from "lib/landing-pages";
import { markdownSiblingPath } from "lib/markdown-sibling";
import { cn } from "lib/utils";
import type { Metadata } from "next";

const featuredGrid = cn(blockSpacing, "grid grid-cols-1 gap-4 md:grid-cols-3");

export default function ExplorePage() {
  return (
    <section>
      <PageTitle>Explore</PageTitle>

      <Prose>
        Browse the main pages by project work, engineering capability, and
        career context.
      </Prose>

      <PageSection title="Start here">
        <ul className={featuredGrid}>
          {featuredLandingPages.map((page) => (
            <li key={page.href}>
              <PageCard
                href={page.href}
                title={page.title}
                description={page.description}
                featured
              />
            </li>
          ))}
        </ul>
      </PageSection>

      {landingPageGroups.map((group) => (
        <PageSection key={group.title} title={group.title}>
          <ul className={blockGrid}>
            {group.pages.map((page) => (
              <li key={page.href}>
                <PageCard
                  href={page.href}
                  title={page.title}
                  description={page.description}
                />
              </li>
            ))}
          </ul>
        </PageSection>
      ))}
    </section>
  );
}

export const metadata: Metadata = {
  alternates: {
    types: { "text/markdown": markdownSiblingPath("/explore") },
  },
  description:
    "Every page on the site, grouped by domain, engineering capability, and career context.",
  robots: {
    follow: true,
    index: false,
  },
  title: "Explore | Gabo Esquivel",
};
