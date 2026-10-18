import { blockGrid, PageTitle, Prose } from 'components/shared/page-layout'
import { PathLink } from 'components/shared/path-link'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <section>
      <PageTitle>About Gabo Esquivel</PageTitle>
      <Prose>
        Gabo Esquivel is an agentic product engineer based in Costa Rica,
        aligned with US Mountain Time. He builds useful and delightful software
        products across AI, Web3, and full-stack applications, with fifteen
        years shipping software and more than twelve leading 0→1 product work
        for startups and growth-stage teams.
      </Prose>
      <Prose>
        His public role on this site is product engineer across product,
        interface, and systems — not a second résumé page. The full career
        narrative lives on{' '}
        <Link href="/bio" className="prose-link">
          /bio
        </Link>
        ; selected implementation evidence lives on{' '}
        <Link href="/work" className="prose-link">
          /work
        </Link>{' '}
        and the project pages. AI agents and tools can read{' '}
        <Link href="/llms.txt" className="prose-link">
          llms.txt
        </Link>{' '}
        for a plain-text index of the same facts.
      </Prose>
      <Prose>
        Gabo is open to long-term and short-term work: direct hire,
        international hire, or contracting through Blockmatic Labs LLC. He
        cannot work under W-2. For hire terms, scheduling, and the contact form,
        use{' '}
        <Link href="/connect" className="prose-link">
          /connect
        </Link>
        .
      </Prose>
      <ul className={blockGrid}>
        <li className="h-full">
          <PathLink
            href="/bio"
            title="Career story"
            note="The only complete career narrative on the site."
          />
        </li>
        <li className="h-full">
          <PathLink
            href="/work"
            title="Work"
            note="Featured projects and recent writing."
          />
        </li>
        <li className="h-full">
          <PathLink
            href="/connect"
            title="Connect"
            note="Hire paths, contact form, and scheduling."
          />
        </li>
      </ul>
    </section>
  )
}

export const metadata = pageMetadata({
  title: 'About Gabo Esquivel',
  description:
    'Agentic product engineer in Costa Rica (US Mountain Time). Open to direct hire, international hire, or contracting through Blockmatic Labs LLC.',
})
