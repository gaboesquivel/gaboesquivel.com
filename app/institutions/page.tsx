import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import institutionsImg from 'public/images/work/grant-thornton.jpg'
import { ContactInfo } from '../../components/shared/contact-info'

export default function InstitutionsExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Enterprise Engineering
        </span>
        <span className="print:hidden">
          Enterprise & Institutional Engineering Experience
        </span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert print:block hidden">
        With over 15 years in software engineering, I've successfully delivered
        enterprise-grade solutions for leading institutions and corporations,
        combining technical excellence with an understanding of complex
        organizational needs.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        I bring extensive experience working with established institutions and
        enterprises, delivering robust software solutions that navigate complex
        regulatory environments and security requirements. My work spans
        financial institutions, professional services firms, retail
        organizations, and media companies, where I've consistently balanced
        innovation with enterprise-grade stability and compliance.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[400px]">
          <Image
            alt="Enterprise blockchain solution for Grant Thornton"
            src={institutionsImg}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">
        Enterprise Approach & Methodology
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        When working with established institutions, I adapt my development
        approach to address their unique challenges: complex stakeholder
        management, stringent security requirements, legacy system integration,
        and regulatory compliance. I emphasize scalable architecture,
        comprehensive documentation, and maintainable code that enterprise teams
        can support long-term.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        My institutional projects are characterized by thorough requirements
        gathering, formal testing procedures, and deployment processes that
        minimize disruption. I prioritize data security and privacy compliance,
        ensuring solutions meet industry standards while still delivering
        excellent user experiences.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Grant Thornton: Enterprise Blockchain (2018-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As the main architect and tech lead at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I designed and implemented a custom private blockchain solution for
        Grant Thornton, a leading professional services firm. I built the
        architecture using Azure, Terraform, EOSIO, and a React client, creating
        a secure and compliant environment for their enterprise needs. The
        solution streamlined intercompany transactions and tax management using
        stablecoins with immutable records via hashing and IPFS, significantly
        improving efficiency while maintaining audit trails.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I recruited and built a development team from scratch, translating
        complex financial requirements into technical specifications while
        ensuring enterprise-grade security and compliance. This project
        demonstrated my ability to deliver innovative blockchain solutions
        within the constraints of a regulated professional services environment.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Coopenae Bank: Wink Digital Banking (2015-2018)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Working with Coopenae, one of Costa Rica's largest cooperative banks, I
        led the development of{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , the country's first digital banking platform. As Software Architect, I
        navigated the complex regulatory environment of financial services while
        introducing innovative mobile banking features. I developed integrations
        with core banking systems, implemented biometric verification for KYC
        compliance, and created secure transaction workflows.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        This project required extensive collaboration with banking stakeholders,
        regulatory compliance officers, and security teams to create a solution
        that balanced innovation with the rigorous requirements of financial
        institutions. The resulting platform allowed Coopenae to offer a modern
        banking experience while maintaining the security and reliability
        expected of an established financial institution.
      </p>

      <h2 className="text-xl font-bold mb-4">
        American Express: Web Platform Modernization (2009-2011)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/american-express" className="prose-link">
          American Express
        </Link>
        , I was part of the frontend engineering team responsible for
        modernizing their web platform. I worked on enhancing user experience
        through AJAX-driven interactivity and implementing A/B testing
        strategies to optimize engagement. I developed analytics integrations to
        track usage patterns and improve performance, contributing to a more
        responsive and user-friendly online banking experience for millions of
        cardmembers.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I also contributed to the{' '}
        <Link href="/project/amex-money-talk" className="prose-link">
          National Money Night Talk
        </Link>{' '}
        campaign, developing a landing page focused on financial communication
        between parents and teenagers. This project demonstrated my ability to
        work within corporate branding guidelines while creating engaging
        digital experiences that aligned with American Express's financial
        literacy initiatives.
      </p>

      <h2 className="text-xl font-bold mb-4">
        AMC Networks: YEAH! TV Streaming Platform (2012-2014)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/amc-yeah-tv-facebook-app" className="prose-link">
          AMC Networks
        </Link>
        , I led the frontend team for YEAH! TV, a streaming movie service
        launched at SXSW 2013. I coordinated between creative and backend teams
        while building an interactive video streaming frontend for their
        Facebook app. I implemented back-office systems with Brightcove
        integration and added interactive features to the video player,
        including trivia, interviews, and quizzes.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        The platform was optimized for curated films with 400+ interactive
        elements each, creating a unique viewing experience that enhanced
        classic genre films with bonus content. This project required working
        within the constraints of a major media company while delivering
        innovative features on tight production timelines.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Tractor Supply Company: Mobile App Enhancement (2019)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        For{' '}
        <Link href="/project/tractor-supply" className="prose-link">
          Tractor Supply Company
        </Link>
        , a major retail chain with over 1,900 stores, I consulted on enhancing
        their mobile application. I improved app performance and code quality
        while developing an augmented reality feature for product previews. This
        innovative addition allowed customers to visualize products in their
        actual environment before purchase, enhancing the shopping experience
        and reducing returns.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I implemented TypeScript for improved maintainability and scalability,
        ensuring the codebase would remain robust as the company expanded. This
        project demonstrated my ability to introduce cutting-edge features
        within the constraints of an established retail organization's existing
        systems and processes.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Institutional Projects"
          projects={projects.filter(
            (project) =>
              (project.type.includes('featured') ||
                project.name === 'Tractor Supply' ||
                project.name === 'American Express') &&
              !project.type.includes('web3'),
          )}
        />

        <LatestPosts category="Enterprise" title="Latest Enterprise Articles" />
      </div>
      <ContactInfo />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Enterprise & Institutional Engineering Experience - Gabo Esquivel',
  description:
    'Senior engineer with extensive experience delivering solutions for financial institutions, professional services firms, and major corporations.',
  keywords: [
    'enterprise software',
    'institutional engineering',
    'financial services technology',
    'corporate solutions',
    'banking technology',
    'regulated industries',
    'enterprise architecture',
    'professional services',
    'retail technology',
    'media technology',
  ],
  openGraph: {
    title: 'Enterprise & Institutional Engineering Experience - Gabo Esquivel',
    description:
      'Senior engineer with extensive experience delivering solutions for financial institutions, professional services firms, and major corporations.',
    type: 'profile',
  },
}
