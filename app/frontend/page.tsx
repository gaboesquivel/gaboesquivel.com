import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function FrontendExperiencePage() {
  const type = 'frontend'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Frontend Engineer
        </span>
        <span className="print:hidden">Frontend Engineering Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        Throughout my career, I've focused on crafting exceptional user
        experiences through clean, performant frontend code. My approach
        combines technical excellence with design sensibility, creating
        interfaces that are both beautiful and functional. I believe great
        frontend engineering isn't just about making things look good—it's about
        creating intuitive, accessible experiences that solve real problems.
      </p>

      <h2 className="text-xl font-bold mb-4">
        American Express: Banking UI (2010-2012)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey in frontend engineering began at American Express, where I
        worked on transitioning their credit card systems from DoJo to jQuery.
        This experience taught me how to build responsive layouts and implement
        A/B testing while maintaining strict compatibility and security
        standards required in financial applications.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        AMC Networks: Streaming Experience (2012-2014)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At AMC Networks, I led the frontend team for YEAH! TV, an interactive
        video streaming service launched at SXSW 2013. I built an engaging
        streaming frontend as a Facebook app and implemented a back-office
        interface with Brightcove integration. One of my key achievements was
        adding interactive elements (trivia, interviews, quizzes) to the video
        player, creating an enriched viewing experience with 400+ interactive
        elements per film.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        React & Modern Frontend (2015-2018)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As React gained prominence, I embraced the component-based architecture
        and built several single-page applications. At Wink, I developed a fully
        compliant banking platform with a seamless mobile-first interface.
        During this period, I refined my skills in state management, reusable
        component libraries, and responsive design. I also led the refactoring
        of MyPhoto.com's photo editor, implementing modern ReactJS architecture
        while maintaining seamless e-commerce integration.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Web3 Interfaces: NFT & DeFi (2021-2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As the Web3 space evolved, I contributed to several innovative
        interfaces. At RareMint, I helped build a platform for NFTs backed by
        physical collectibles, focusing on smart contract integration, metadata
        pipelines, and a user-friendly marketplace UI. The implementation used
        Remix for server-side rendering and WalletConnect for seamless
        blockchain interactions.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At ZTX, I delivered a gaming-centric NFT platform interface with React,
        focusing on wallet connectivity, minting workflows, and WebGL
        integration. The architecture emphasized modular design patterns and
        creator-friendly UX, making complex blockchain interactions accessible
        to users without technical knowledge.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Modern Frontend: Opyn & Next.js (2023-Present)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My recent work with Opyn involved building their testnet private beta
        frontend using Next.js 14 and shadcn/ui components. I created custom
        components for trading interfaces, vault positions, and margin
        mechanics, while integrating the protocol for internal user testing.
        This experience deepened my expertise in component-driven design
        systems, TypeScript, and Tailwind CSS for creating polished, performant
        UIs.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        Today, I continue to embrace frontend innovations, focusing on type-safe
        patterns, accessibility, and data-driven interfaces. I'm particularly
        interested in the intersection of AI and frontend engineering, exploring
        how we can create more intelligent, responsive user experiences through
        modern web technologies.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Frontend" title="Latest Frontend Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Frontend Engineering Experience - Gabo Esquivel',
  description:
    'Frontend Engineer with 15+ years in web development, specializing in React, Next.js, TypeScript and data-driven interfaces',
  keywords: [
    'frontend engineer',
    'React developer',
    'Next.js',
    'TypeScript',
    'UI/UX',
    'Tailwind CSS',
    'data-driven interfaces',
    'component libraries',
    'web development',
    'responsive design',
    'frontend architecture',
    'JavaScript',
  ],
  openGraph: {
    title: 'Frontend Engineering Experience - Gabo Esquivel',
    description:
      'Frontend Engineer with 15+ years in web development, specializing in React, Next.js, TypeScript and data-driven interfaces',
    type: 'profile',
  },
}
