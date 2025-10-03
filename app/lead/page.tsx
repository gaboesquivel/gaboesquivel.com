import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import blockchainCRImg from 'public/images/2018/06/blockchain-costa-rica.jpg'
import { ContactInfo } from '../../components/shared/contact-info'

export default function TechLeadExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Tech Leadership Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My journey into technical leadership began with a realization that great
        technology alone isn't enough—it requires thoughtful orchestration of
        people, processes, and tools to create meaningful impact. While I've
        always loved solving technical challenges, I discovered a deeper
        satisfaction in empowering teams to achieve outcomes beyond what any
        individual could accomplish alone. I still remember the moment during an
        early leadership role when a junior developer I'd been mentoring
        independently solved a complex problem we'd been tackling—seeing that
        growth was more rewarding than solving it myself would have been.
        Throughout my career, I've approached leadership as a balance of vision,
        empathy and pragmatism—creating environments where innovation can
        flourish while maintaining the discipline needed to ship quality
        products. This approach reflects my belief that the best leadership
        amplifies the capabilities of everyone on the team rather than
        showcasing the leader's individual talents.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Blockchain Costa Rica"
            src={blockchainCRImg}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg "
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Community Building & Developer Relations
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My leadership journey began in an unexpected place—community organizing.
        In 2010, I founded{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>
        , which started as a small meetup but grew to become Central America's
        largest JavaScript community with over 2,000 members. This experience
        taught me crucial leadership skills that would shape my approach
        throughout my career. I learned how to articulate a technical vision
        that could inspire others, how to identify and nurture talent, and
        perhaps most importantly, how to create spaces where knowledge could
        flow freely between participants of different experience levels.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Organizing{' '}
        <Link
          href="/blog/2016-06-nodeschool-international-day"
          className="prose-link"
        >
          NodeSchool Costa Rica
        </Link>{' '}
        workshops further developed my mentorship approach. I discovered that
        effective technical leadership isn't about having all the answers, but
        about asking the right questions and creating frameworks that help teams
        discover solutions collaboratively. These early community leadership
        experiences established patterns I would later apply in formal
        leadership roles—focusing on knowledge sharing, creating psychologically
        safe environments for experimentation, and balancing individual growth
        with collective progress.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Media Production
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My first formal leadership role came at{' '}
        <Link href="/project/amc-yeah-tv-facebook-app" className="prose-link">
          AMC Networks
        </Link>{' '}
        in 2013, where I led the frontend team for YEAH! TV, a streaming movie
        service launched at SXSW. This project presented a unique challenge:
        coordinating between creative teams with film expertise and backend
        engineers focused on content delivery. I remember the tension in early
        planning meetings—the creative team wanted rich interactive features
        while the backend team was concerned about technical constraints. My
        role became that of translator and facilitator, finding technical
        solutions that could fulfill creative vision without compromising system
        stability.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This experience taught me the importance of cross-functional
        communication in technical leadership. I developed processes for
        creative-technical collaboration, including joint planning sessions
        where we would prototype interactive elements directly with the creative
        team. The technical challenge of implementing a streaming platform with
        400+ interactive elements per film was significant, but the leadership
        challenge of aligning diverse teams toward a unified vision proved to be
        the more valuable learning experience. By the project's completion, I
        had established approaches to technical roadmapping and feature
        prioritization that balanced innovation with deliverability—skills that
        would serve me throughout my career.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Financial Technology
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2015, I took on a more comprehensive leadership role as Software
        Architect at{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first digital bank. This represented a significant
        evolution in my leadership journey as I was responsible not just for
        technical direction, but for building a complete engineering
        organization from the ground up. The challenge was multifaceted: I
        needed to establish technical infrastructure, develop product
        architecture, recruit talent, and create engineering processes—all while
        operating in the heavily regulated banking industry.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This experience shaped my approach to technical leadership in regulated
        environments, where I learned to balance innovation with compliance. I
        remember a pivotal moment when we were implementing biometric
        verification—we needed to satisfy both security requirements and user
        experience goals that initially seemed at odds. Finding creative
        solutions to these competing constraints required both technical
        creativity and organizational alignment. Throughout this project, I
        developed my approach to hiring and team development, creating a blend
        of structured onboarding and progressive responsibility that allowed new
        engineers to contribute quickly while growing into larger roles over
        time.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Blockchain Infrastructure
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020 at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I faced perhaps my most complex leadership challenge to date—building
        a team to support the launch of a new blockchain network while
        simultaneously developing enterprise solutions on the same technology.
        This required me to operate across multiple contexts: participating in
        the global, decentralized EOS mainnet launch while also delivering a
        custom private blockchain solution for Grant Thornton, a Big Four
        accounting firm.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The contrasting requirements of these contexts taught me to adapt my
        leadership style to different situations—sometimes serving as a hands-on
        technical guide during the mainnet launch, and other times focusing on
        client communication and project governance for enterprise work. I
        remember one particularly challenging week where we were simultaneously
        debugging mainnet validator issues and presenting architecture proposals
        to Grant Thornton executives. Navigating these contexts required
        developing a team structure that could operate effectively without my
        constant involvement—teaching me the importance of clear delegation and
        empowerment.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        During this period, I also expanded my community leadership by
        organizing{' '}
        <Link
          href="/blog/2018-06-blockchain-technology-in-costa-rica"
          className="prose-link"
        >
          Web3 meetups
        </Link>{' '}
        and co-founding the{' '}
        <Link href="/project/asoblockchain" className="prose-link">
          Costa Rica Blockchain Association
        </Link>
        . These activities complemented my organizational leadership, creating a
        talent pipeline and knowledge-sharing ecosystem that supported our
        business objectives while contributing to broader industry development.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Web3 Platform
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          Bitcash
        </Link>{' '}
        (2020-2021), my leadership expanded to include more strategic product
        direction alongside technical architecture. Leading the development of a
        peer-to-peer exchange platform required balancing complex technical
        requirements with evolving market needs in the rapidly changing
        cryptocurrency space. I found myself spending as much time on product
        strategy and market analysis as on technical architecture, learning to
        connect engineering decisions directly to business outcomes.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This role reinforced my belief in technical leadership that spans the
        full product lifecycle rather than focusing solely on implementation
        details. I worked to develop the team's capabilities in both execution
        and innovation, encouraging engineers to propose solutions to business
        challenges rather than simply implementing predefined specifications.
        The real-time nature of the trading platform meant we needed to maintain
        high reliability standards while continuously evolving the
        product—teaching me valuable lessons about change management and
        technical risk assessment that inform my leadership approach today.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Emerging Technologies Leadership
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My most recent leadership role has been at{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          Bitlauncher
        </Link>{' '}
        (2022-2023), where I've had the opportunity to integrate my{' '}
        <Link href="/web3" className="prose-link">
          blockchain experience
        </Link>{' '}
        with emerging{' '}
        <Link href="/ai" className="prose-link">
          AI technologies
        </Link>
        . This project has represented a significant evolution in my leadership
        approach—establishing AI-driven development workflows that transform how
        the team designs, implements, and evaluates software. I've worked to
        create a development environment where AI tools augment rather than
        replace human creativity, focusing on areas where automation can
        eliminate routine tasks while preserving space for innovative
        problem-solving.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Training a team of five developers in this integrated approach has been
        both challenging and rewarding. I've observed how different team members
        adapt to AI-assisted workflows at different paces, requiring
        individualized coaching and support. This experience has reinforced my
        view that technical leadership in the AI era requires a thoughtful
        balance—embracing automation where it enhances productivity while
        maintaining the human judgment and creativity that ultimately drive
        innovation.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        As part of this initiative, I've also led the development of{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>
        , applying the same principles to product development that we use
        internally. This alignment between our development approach and product
        offering has created valuable feedback loops, where our own experiences
        as users inform product direction. This integration of leadership across
        product, technology, and team development represents the culmination of
        my journey so far—bringing together the technical, organizational, and
        strategic elements of leadership into a cohesive approach.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes('lead'))}
        />

        <LatestPosts category="Tech Lead" title="Latest Tech Lead Articles" />
      </div>
      <ContactInfo />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Tech Leadership Experience - Gabo Esquivel',
  description:
    'Tech Lead with 15+ years in full-stack development, specializing in taking startups from 0 to 1.',
  keywords: [
    'tech lead',
    'startup 0 to 1',
    'software architecture',
    'product engineering',
    'full-stack development',
    'team leadership',
    'startup development',
    'technical strategy',
    'product development',
    'engineering principles',
    'scalable systems',
    'startup founder',
  ],
  openGraph: {
    title: 'Tech Leadership Experience - Gabo Esquivel',
    description:
      'Tech Lead with 15+ years in full-stack development, specializing in taking startups from 0 to 1.',
    type: 'profile',
  },
}
