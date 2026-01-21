import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import institutionsImg from 'public/images/work/amex.jpg'
import { ContactInfo } from '../../components/shared/contact-info'

export default function InstitutionsExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Enterprise & Institutional Engineering Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My journey into institutional engineering began with a realization that
        some of the most impactful technology work happens within established
        organizations that touch millions of lives daily. While the startup
        world often captures more attention, I've been drawn to the unique
        challenges of bringing innovation to enterprises operating under complex
        constraints. I still remember my first day at American Express, walking
        through their data center and grasping the scale of systems that
        processed millions of transactions daily—understanding that even small
        improvements could create enormous real-world impact. Throughout my
        career working with financial institutions, professional services firms,
        and major corporations, I've approached enterprise engineering as a
        balance of transformation and stability—introducing innovation while
        respecting the regulatory, security, and operational realities that
        these organizations face. This perspective reflects my belief that
        meaningful technological change in established institutions requires
        both technical expertise and an understanding of organizational
        context—combining "what could be" with "what must be" to create
        solutions that drive genuine progress.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
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

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        American Express: Financial Services Technology
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My first institutional experience came at{' '}
        <Link href="/project/american-express" className="prose-link">
          American Express
        </Link>{' '}
        (2009-2012), where I joined as a UI Engineer focused on their credit
        card platforms. This environment introduced me to the unique demands of
        enterprise-scale financial technology—systems used by millions of
        cardmembers worldwide where even minor interface improvements could
        significantly impact how people managed their finances. I recall the
        weight of responsibility when releasing my first major update to the
        account interface, knowing that any confusion could result in thousands
        of customer service calls. This experience taught me the importance of
        thorough testing and meticulous deployment processes—practices that
        would become foundational to my approach in all future institutional
        work.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Beyond purely technical implementation, my work at American Express gave
        me insight into how large financial organizations evaluate and implement
        change. Collaborating with their data analytics teams showed me how A/B
        testing could transform interface design from subjective opinions to
        measurable outcomes, creating a framework for data-driven decision
        making that I would carry throughout my career. I also contributed to
        the{' '}
        <Link href="/project/amex-money-talk" className="prose-link">
          National Money Night Talk
        </Link>{' '}
        campaign, developing a landing page focused on financial literacy—my
        first exposure to how institutional engineering can serve broader social
        goals beyond immediate product features. These experiences shaped my
        understanding of how technology operates within the complex ecosystem of
        a global financial institution, where innovation must coexist with
        stability, security, and regulatory compliance.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        AMC Networks: Media & Entertainment Systems
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/amc-yeah-tv-facebook-app" className="prose-link">
          AMC Networks
        </Link>{' '}
        (2012-2014), I faced a different kind of institutional
        challenge—bringing digital innovation to an established media company
        navigating the early stages of streaming transformation. As the frontend
        team lead for YEAH! TV, launched at SXSW 2013, I needed to bridge
        creative vision with technical feasibility while working within
        corporate brand guidelines and content requirements. This project
        revealed the unique tension in media organizations between creative
        ambition and technical constraints—I remember lengthy discussions with
        film curators who wanted interactive features that pushed beyond what
        our technology could reliably deliver at scale.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The solution required both technical innovation and organizational
        adaptation. I implemented back-office systems with Brightcove
        integration and developed a video player with interactive capabilities,
        creating a platform optimized for curated films with 400+ interactive
        elements each. What made this project particularly valuable was learning
        to manage the complex stakeholder environment of a major media
        company—balancing the needs of creative teams, technical staff, business
        strategists, and executives with different priorities and perspectives.
        This experience broadened my understanding of institutional engineering
        beyond purely technical implementation, showing how successful
        enterprise technology requires navigating organizational dynamics as
        much as solving technical problems.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Coopenae Bank: Digital Transformation
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2015, I faced perhaps my most complex institutional challenge as
        Software Architect for{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first digital banking platform, developed in partnership
        with Coopenae, one of the country's largest cooperative banks. This
        project required navigating the intersection of emerging fintech
        capabilities and traditional banking regulations—creating a mobile-first
        experience that could satisfy both customer expectations for modern
        interfaces and regulatory requirements for security and compliance. I
        recall the pivotal moment when presenting our biometric verification
        approach to banking regulators, carefully explaining how our solution
        could satisfy both security standards and usability requirements that
        initially seemed at odds.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The technical implementation included developing secure integrations
        with core banking systems, implementing biometric verification for KYC
        compliance, and creating transaction workflows that balanced security
        with usability. Beyond technical architecture, I needed to collaborate
        extensively with banking stakeholders, regulatory compliance officers,
        and security teams—translating between technical possibilities and
        institutional requirements. This project taught me how digital
        transformation in regulated industries requires patience and
        persistence, as innovation must progress at a pace that allows for
        proper risk assessment and compliance verification. The resulting
        platform allowed Coopenae to offer a modern banking experience while
        maintaining the security and reliability expected of an established
        financial institution, demonstrating how thoughtful engineering can
        bridge traditional institutional values with contemporary user
        expectations.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Grant Thornton: Enterprise Blockchain Solutions
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020 at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I had the opportunity to design and implement a custom private
        blockchain solution for Grant Thornton, one of the world's largest
        professional services networks. This project represented a fascinating
        intersection of emerging technology and institutional
        requirements—exploring how blockchain could address specific pain points
        in corporate financial processes while satisfying the rigorous security,
        privacy, and compliance standards of a Big Four accounting firm. As main
        architect and tech lead, I designed a system using Azure, Terraform,
        EOSIO, and a React client that streamlined intercompany transactions and
        tax management using stablecoins with immutable audit trails via IPFS.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        What made this project particularly challenging was introducing a
        relatively new technology like blockchain into a conservative
        institutional environment with strict risk management protocols. I
        remember detailed discussions with partners and security officers,
        explaining blockchain concepts and addressing concerns about data
        privacy, transaction finality, and regulatory compliance. The process
        required translating complex financial requirements into technical
        specifications while ensuring enterprise-grade security—recruiting and
        building a development team specifically equipped to navigate these
        constraints. This experience demonstrated how even the most innovative
        technologies can find valuable applications within traditional
        institutions when implemented with careful attention to organizational
        context and compliance requirements.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Tractor Supply: Retail Technology Innovation
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2021, I consulted with{' '}
        <Link href="/project/tractor-supply" className="prose-link">
          Tractor Supply Company
        </Link>
        , a major retail chain with over 1,900 stores, on enhancing their mobile
        application. This project presented a different kind of institutional
        challenge—balancing innovation with the practical realities of a
        large-scale retail operation where technology needed to support both
        e-commerce and in-store experiences across diverse geographic locations
        and customer segments. I focused on improving app performance and code
        quality while developing an augmented reality feature for product
        previews that allowed customers to visualize items in their actual
        environment before purchase.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        What distinguished this institutional experience was navigating the
        complex integration requirements between the mobile application,
        inventory systems, and in-store operations. I implemented TypeScript for
        improved maintainability and scalability, ensuring the codebase would
        remain robust as the company expanded both physically and digitally. The
        project required close collaboration with product merchandising teams
        and store operations staff to ensure that technical features aligned
        with the company's broader retail strategy. This experience reinforced
        my understanding that successful institutional engineering requires
        situating technology within the organization's complete operational
        context—creating solutions that complement existing business processes
        while introducing new capabilities that drive growth and customer
        satisfaction.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Institutional Projects"
          projects={projects.filter(
            (project) =>
              (project.type.includes('featured') ||
                project.title === 'Tractor Supply' ||
                project.title === 'American Express') &&
              !project.type.includes('web3'),
          )}
        />

        <LatestPosts category="Institutions" title="Latest Institutional Articles" />
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
