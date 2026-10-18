import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
} from 'components/shared/page-layout'
import { ProjectEvidence } from 'components/work/project-evidence'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'
import gabocoding from 'public/images/bio/gabo-coding.jpg'

export default function BioPage() {
  return (
    <section>
      <PageTitle>Career story</PageTitle>

      <Prose>
        I started with web interfaces. The work grew into complete products,
        then into financial and blockchain systems, and lately into intelligent
        interfaces.
      </Prose>
      <Prose>
        That started in 2010, and the years since have covered consumer
        products, financial institutions, startups, open-source infrastructure,
        and technical communities. The{' '}
        <Link href="/work" className="prose-link">
          work library
        </Link>{' '}
        and the project pages go deeper on the implementation. This page follows
        how one step led to the next.
      </Prose>

      <PageSection title="Interfaces and a JavaScript community">
        <Prose>
          American Express needed credit-card marketing screens it could test
          and measure inside an established financial company. As UI Engineer
          from 2010 to 2012 I built comparison sliders and landing pages, wired
          up responsive layouts, A/B testing, and analytics, and helped move a
          large frontend from Dojo to jQuery.
        </Prose>
        <Prose>
          I also founded{' '}
          <Link href="/project/costa-rica-js" className="prose-link">
            Costa Rica JS
          </Link>{' '}
          in 2010. It grew past 2,000 developers through regular meetups,
          NodeSchool, and Front End Day, just as Node.js and modern web
          frameworks were arriving in the region.
        </Prose>
        <Prose>
          At AMC Networks I was Lead UI Engineer from 2012 to 2014 and owned the
          frontend for YEAH!, an interactive streaming movie service that
          launched at SXSW 2013. In 2013 I also shipped a fantasy-tennis
          strategy game and a realtime flight-information display for ARINC.
        </Prose>

        <ProjectEvidence slugs={['costa-rica-js']} columns={1} />
      </PageSection>

      <PageSection title="From interfaces to a banking product">
        <Prose>
          Wink was Costa Rica&apos;s first neobank: banking on a phone, with no
          branch visit. I joined as Lead Engineer in 2015 and stayed through
          2018, building the first version of the React Native app and the AWS
          backend, integrating partner-bank APIs, and implementing biometric
          authentication through a native bridge.
        </Prose>
        <Prose>
          Technology selection, project planning, and partner and vendor
          coordination all came with the product, and to launch it I had to form
          a development team that didn&apos;t exist yet.
        </Prose>
        <Prose>
          Wink is also where I landed on something I still hold to: technology
          should expand access rather than create new gatekeepers. At Wink that
          meant you could open a bank account without a trip to a branch.
        </Prose>

        <ProjectEvidence slugs={['wink']} columns={1} />
      </PageSection>

      <PageSection title="Complex financial and blockchain systems">
        <Prose>
          What came next was the problem of getting from a system to an
          interface: token state, private chains, exchanges, and the wallets
          people use. The implementation detail lives on{' '}
          <Link href="/web3" className="prose-link">
            /web3
          </Link>{' '}
          and the project pages.
        </Prose>
        <Prose>
          It started with tokens and protocol infrastructure: Knowledge&apos;s
          ERC-20 token and marketplace from 2017 to 2018, AsoBlockchain, which I
          co-founded in 2017, and EOS Costa Rica from 2018 to 2020, around the
          EOS mainnet launch and a private chain for Grant Thornton Labs.
          Bitcash, from 2020 to 2021, brought exchanges and indexed chain data,
          and ChainGraph grew out of that work as an open-source GraphQL toolkit
          for EOSIO and Antelope data.
        </Prose>
        <Prose>
          RareMint, ZTX, Bitlauncher, and Opyn took the same problem into
          collectible auctions, a virtual-world wallet, a token launchpad, and
          an options trading interface.
        </Prose>

        <PageImage
          alt="Gabo Esquivel coding"
          src={gabocoding}
          objectClassName="object-top"
        />

        <ProjectEvidence slugs={['eos-costa-rica', 'ztx']} />
      </PageSection>

      <PageSection title="Intelligent interfaces">
        <Prose>
          The assistant work began with specialized assistants in Masterbots in
          2024 and Bitlauncher&apos;s RAG chatbot. In 2025 LegalAgent&apos;s
          voice and chat assistant became the largest part of it, and it lives
          on{' '}
          <Link href="/ai" className="prose-link">
            /ai
          </Link>
          .
        </Prose>

        <ProjectEvidence slugs={['legal-agent']} columns={1} />
      </PageSection>

      <LatestPosts title="Writing" />

      <PageSection title="The work now">
        <Prose>
          I work as a product engineer across AI, full-stack applications,
          financial systems, and Web3, in English, Spanish, Portuguese, and
          Italian.
        </Prose>

        <LetsConnect />
      </PageSection>
    </section>
  )
}

export const metadata = pageMetadata({
  title: 'Career Story | Gabo Esquivel',
  description:
    'Gabo Esquivel’s product engineering career from Costa Rica JS and Wink through Web3 financial systems and production AI.',
  images: [
    {
      url: '/images/bio/gabo-coding.jpg',
      width: 1200,
      height: 630,
      alt: 'Gabo Esquivel coding',
    },
  ],
})
