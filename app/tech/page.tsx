import {
  blockGrid,
  PageSection,
  PageTitle,
  Prose,
  sectionSpacing,
} from 'components/shared/page-layout'
import { techBrowseCategories } from 'components/tech/categories'
import { TechList } from 'components/tech/tech-list'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'

export default function TechStackPage() {
  return (
    <section>
      <PageTitle>Technology stack</PageTitle>
      <Prose>
        I group the stack by area so you can scan what shows up in shipped
        products, then follow each technology to projects and writing that back
        it up.
      </Prose>

      <PageSection title="Browse by area">
        <div className={blockGrid}>
          {techBrowseCategories.map(({ href, name, description }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-zinc-700/50 p-4"
            >
              <h3 className="font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-neutral-400">{description}</p>
            </Link>
          ))}
        </div>
      </PageSection>

      <TechList
        heading="Featured technologies"
        showNavigation={false}
        className={sectionSpacing}
      />
    </section>
  )
}

export const metadata = pageMetadata({
  title: 'Technology stack | Gabo Esquivel',
  description:
    'Technologies used across AI, Web3, frontend, backend, and cloud project work, grouped by area and linked to evidence.',
})
