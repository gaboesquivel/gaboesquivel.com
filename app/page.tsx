import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  blockGrid,
  PageImage,
  PageSection,
  PageTitle,
  Prose,
  sectionAction,
  twoColGrid,
} from 'components/shared/page-layout'
import { PathLink } from 'components/shared/path-link'
import { ProjectCard } from 'components/work/project-card'
import { projects } from 'gaboesquivel'
import { homeJsonLd } from 'lib/home-json-ld'
import type { Metadata } from 'next'
import Link from 'next/link'
import workshop from 'public/images/gabo-workshop.jpg'

const selectedProjectSlugs = ['legal-agent', 'wink', 'ztx', 'bitlauncher']
const selectedProjects = selectedProjectSlugs.flatMap((slug) =>
  projects.filter((project) => project.slug === slug),
)

export default function HomePage() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from static homepage identity.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <PageTitle className="leading-tight">
        Gabo Esquivel
        <span className="max-md:hidden"> — </span>
        <br className="md:hidden" />
        Agentic Product Engineer
      </PageTitle>
      <Prose>
        I build useful and delightful software products, designed for humans and
        agents alike. I work across product, design, and architecture to create
        intuitive human experiences, agent-friendly interfaces, and efficient
        operational workflows.
      </Prose>

      <Prose>
        15+ years of shipping software, including 12+ years building 0→1
        products for startups and growth-stage teams across FinTech, Web3, and
        AI.
      </Prose>

      <PageImage alt="Gabo Esquivel giving a workshop in 2019" src={workshop} />

      <PageSection
        title="Selected work"
        action={
          <Link href="/work" className={sectionAction}>
            More work
          </Link>
        }
      >
        <ul className={blockGrid}>
          {selectedProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} showRole />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection title="Focus">
        <Prose>
          Right now I work on agentic AI and onchain finance. In both, the model
          or the chain does the hard part, and the product decides whether
          people can trust it with real work and real money.
        </Prose>
        <ul className={blockGrid}>
          <li className="h-full">
            <PathLink
              href="/ai"
              title="Agentic AI products"
              note="Agents that call tools and render generative UI, with clear limits on what the model decides and controls your team can change after launch."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/web3"
              title="Stablecoins and trading"
              note="Stablecoin flows, wallets, and trading interfaces that show people what they're about to sign, with WebAuthn key management and indexed balances behind them."
            />
          </li>
        </ul>
        <Prose>
          I ship in{' '}
          <Link href="/startups" className="prose-link">
            startups
          </Link>
          , where the first version still has to hold, and in{' '}
          <Link href="/institutions" className="prose-link">
            established companies
          </Link>
          , where the constraint is usually the systems already running.
        </Prose>
      </PageSection>

      <PageSection title="Career">
        <ul className={twoColGrid}>
          <li className="h-full">
            <PathLink
              href="/bio"
              title="Career story"
              note="From Costa Rica's JavaScript community to a neobank, Web3, and production AI."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/cv"
              title="Employment record"
              note="Titles, dates, and a printable PDF."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/lead"
              title="Technical leadership"
              note="Forming teams and owning architecture while staying close enough to the code to answer for what ships."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/startups"
              title="Startup product engineering"
              note="0→1 products built before there was a stack to build them on: a neobank, a launchpad, a virtual world."
            />
          </li>
        </ul>
      </PageSection>

      <LatestPosts
        title="Writing"
        action={
          <Link href="/blog" className={sectionAction}>
            More writing
          </Link>
        }
      />

      <PageSection title="Work together">
        <LetsConnect />
      </PageSection>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Gabo Esquivel | Agentic Product Engineer',
  description:
    'I build useful and delightful software products across AI, Web3, and full-stack applications.',
  alternates: {
    canonical: '/',
    types: { 'text/markdown': '/index.md' },
  },
  openGraph: {
    title: 'Gabo Esquivel | Agentic Product Engineer',
    description:
      'I build useful and delightful software products across AI, Web3, and full-stack applications.',
    type: 'website',
  },
}
