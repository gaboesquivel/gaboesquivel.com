import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import { PageCard } from "components/shared/page-card";
import { blockGrid, PageSection } from "components/shared/page-layout";
import { blockSpacing } from "components/shared/spacing";
import { featuredLandingPages, landingPageGroups } from "lib/landing-pages";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import type { Metadata } from "next";

const featuredGrid = cn(blockSpacing, "grid grid-cols-1 gap-4 md:grid-cols-3");

export default function ExplorePage() {
  return (
    <InteriorPageShell>
      <PageIntro
        description="Browse the main pages by project work, engineering capability, and career context."
        title="Explore"
      />

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
    </InteriorPageShell>
  );
}

// pageMetadata gives /explore its landing card. Without page-level images the
// route inherits app/opengraph-image.png, which next dev resolves against the
// request host (localhost) instead of metadataBase.
export const metadata: Metadata = {
  ...pageMetadata({
    description:
      "Every page on the site, grouped by domain, engineering capability, and career context.",
    path: "/explore",
    title: "Explore | Gabo Esquivel",
  }),
  robots: {
    follow: true,
    index: false,
  },
};
