import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  blockGrid,
  PageImage,
  PageSection,
  PageTitle,
  Prose,
  proseClass,
  sectionAction,
} from 'components/shared/page-layout'
import { ProjectCard } from 'components/work/project-card'
import { projects } from 'gaboesquivel'
import { cn } from 'lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import workshop from 'public/images/gabo-workshop.jpg'

function PathLink({
  href,
  title,
  note,
}: {
  href: string
  title: string
  note?: string
}) {
  return (
    <Link
      href={href}
      aria-label={title}
      className="group flex h-full flex-col rounded-lg p-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
          {href}
        </span>
        <span
          aria-hidden
          className="shrink-0 text-neutral-400 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
      <span className="font-medium">{title}</span>
      {note ? (
        <p className={cn(proseClass, 'mt-2 flex-grow text-sm')}>{note}</p>
      ) : null}
    </Link>
  )
}

const selectedProjectSlugs = ['legal-agent', 'wink', 'ztx', 'bitlauncher']
const selectedProjects = selectedProjectSlugs.flatMap((slug) =>
  projects.filter((project) => project.slug === slug),
)

export default function HomePage() {
  return (
    <section>
      <PageTitle>Gabo Esquivel — Product Engineer</PageTitle>
      <Prose>
        I build useful and delightful software products. I move between
        architecture and interface, deciding what belongs in the product and
        what should recede behind it.
      </Prose>

      <Prose>
        15+ years of shipping software, 12+ of them leading 0→1 product work:
        regulated finance, consumer Web3, production AI. I work from Costa Rica
        on US Mountain Time with distributed teams.
      </Prose>

      <PageImage
        alt="Gabo Esquivel giving a workshop in 2019"
        src={workshop}
        priority
      />

      <PageSection
        title="Selected work"
        action={
          <Link href="/work" className={sectionAction}>
            More work
          </Link>
        }
      >
        <ul className={blockGrid}>
          {selectedProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} priority={index === 0} showRole />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection title="Focus">
        <Prose>
          Right now I build AI products and Web3 products. Both are domains
          where the interesting work is the product around the technology:
          assistants people can talk to and teams can operate, wallets and
          markets people can follow.
        </Prose>
        <ul className={blockGrid}>
          <li className="flex h-full">
            <PathLink
              href="/ai"
              title="AI product engineering"
              note="Voice and retrieval in the product, tools the assistant can call, and controls a team can change."
            />
          </li>
          <li className="flex h-full">
            <PathLink
              href="/web3"
              title="Web3 product engineering"
              note="Signing, indexed state, and interfaces around the chain."
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
        <Prose>
          The bio is the career told in sequence. The CV is what I send when
          someone asks for titles, dates, and a printable PDF.
        </Prose>
        <ul className={blockGrid}>
          <li className="flex h-full">
            <PathLink href="/bio" title="Career story" />
          </li>
          <li className="flex h-full">
            <PathLink href="/cv" title="Employment record" />
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
  title: 'Gabo Esquivel | Product Engineer',
  description:
    'Product engineer across regulated finance, consumer Web3, and production AI. Selected work includes LegalAgent, Wink, ZTX, and Bitlauncher.',
  openGraph: {
    title: 'Gabo Esquivel | Product Engineer',
    description:
      'Product engineer across regulated finance, consumer Web3, and production AI. Selected work includes LegalAgent, Wink, ZTX, and Bitlauncher.',
    type: 'website',
  },
}
