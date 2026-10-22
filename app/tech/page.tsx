import { InnerPageHero } from "components/shared/inner-page-hero";
import {
  blockGrid,
  PageSection,
  sectionSpacing,
} from "components/shared/page-layout";
import { SiteCardLink } from "components/shared/site-card-link";
import { cardArrow } from "components/shared/spacing";
import { techBrowseCategories } from "components/tech/categories";
import { TechList } from "components/tech/tech-list";
import { pageMetadata } from "lib/page-metadata";

export default function TechStackPage() {
  return (
    <section>
      <InnerPageHero
        description="I group the stack by area so you can scan what shows up in shipped products, then follow each technology to projects and writing that back it up."
        title="Technology stack"
      />

      <PageSection title="Browse by area">
        <div className={blockGrid}>
          {techBrowseCategories.map(({ href, name, description }) => (
            <SiteCardLink
              cardClassName="gap-2 p-4"
              className="group"
              href={href}
              key={href}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{name}</h3>
                <span aria-hidden className={cardArrow}>
                  →
                </span>
              </div>
              <p className="text-sm text-neutral-400">{description}</p>
            </SiteCardLink>
          ))}
        </div>
      </PageSection>

      <TechList
        heading="Featured technologies"
        showNavigation={false}
        className={sectionSpacing}
      />
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "Technologies used across AI, Web3, frontend, backend, and cloud project work, grouped by area and linked to evidence.",
  path: "/tech",
  title: "Technology stack | Gabo Esquivel",
});
