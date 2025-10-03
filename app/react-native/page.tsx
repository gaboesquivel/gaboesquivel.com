import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import mobileImg from 'public/images/work/nodeschool.jpg'

export default function ReactNativeExperiencePage() {
  const type = 'mobile'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        React Native & Mobile Development Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My journey into React Native development began with a desire to bridge
        the gap between web and native experiences—seeking the perfect balance
        between development efficiency and platform-specific excellence. Having
        started my career in{' '}
        <Link href="/frontend" className="prose-link">
          web development
        </Link>
        , I was immediately drawn to React Native when it emerged in 2015,
        recognizing its potential to transform how we build cross-platform
        applications. I still remember the moment I deployed my first React
        Native app simultaneously to iOS and Android—watching the same codebase
        render natively on different devices felt revolutionary. What began as
        technical curiosity quickly became a passion for creating mobile
        experiences that combine the best of both worlds: the development
        velocity of React with the performance and capabilities of native
        platforms. Throughout my career, I've approached mobile development with
        a focus on creating interfaces that feel natural to users while
        maintaining the cross-platform efficiency that makes React Native so
        powerful. This philosophy reflects my belief that the best mobile
        experiences disappear into the background, becoming seamless extensions
        of how people live and work rather than drawing attention to the
        technology itself.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Mobile App Development"
            src={mobileImg}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Digital Banking & Biometric Integration
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My first significant React Native project came in 2015 at{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first mobile neobank. This was a pivotal moment in my
        development journey, as React Native had only been publicly released
        months earlier, making our implementation one of Latin America's first
        production React Native apps. The technical challenge was substantial—I
        needed to create custom native bridges for biometric authentication that
        would work consistently across different devices while satisfying the
        strict security requirements of financial services. I remember the
        breakthrough moment when we successfully integrated TouchID with our
        transaction workflow, creating a secure verification process that felt
        almost magical in its simplicity from the user perspective.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        What made this project particularly significant was combining
        cutting-edge mobile technology with the conservative requirements of
        banking. The application needed to handle sensitive financial operations
        while providing an intuitive interface that would encourage adoption
        among users accustomed to traditional branch banking. The experience
        taught me how to balance technical innovation with security and
        reliability—creating native bridges that exposed platform capabilities
        to JavaScript without compromising on performance or security. This
        foundational project shaped my approach to mobile development,
        establishing patterns for native module integration and cross-platform
        consistency that I would refine in future projects.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Encrypted Messaging & Blockchain Wallets
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2019, my React Native journey continued at{' '}
        <Link href="/project/make-sense-labs" className="prose-link">
          Sense Chat
        </Link>
        , where I worked on a secure messaging platform with integrated
        blockchain wallet functionality. This project presented unique technical
        challenges—combining end-to-end encrypted communication with
        cryptocurrency transactions in a single mobile interface. The
        implementation required careful optimization of React Native components
        and deep integration with the EOS blockchain, ensuring both security and
        performance on resource-constrained mobile devices. I focused
        particularly on creating a seamless user experience around key
        management—traditionally one of the most friction-filled aspects of
        blockchain applications.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        What made this project especially rewarding was solving complex
        cryptographic challenges while maintaining an intuitive user experience.
        I remember the satisfaction of watching new users send their first
        encrypted message with attached tokens—a process that required multiple
        cryptographic operations but appeared to users as a simple chat
        interaction. This project demonstrated how React Native could bridge
        sophisticated blockchain functionality with familiar mobile interfaces,
        making complex technologies accessible to mainstream users. The
        experience deepened my expertise in optimizing React Native for
        performance-critical applications and integrating with native
        cryptographic libraries—skills that would prove valuable across my later
        mobile projects.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Augmented Reality Product Visualization
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2021, my work with{' '}
        <Link href="/project/tractor-supply" className="prose-link">
          Tractor Supply Company
        </Link>{' '}
        pushed the boundaries of what could be achieved with React Native, as I
        implemented augmented reality product previews in their mobile
        application. This feature allowed customers to visualize large outdoor
        equipment in their actual environment before purchasing—a capability
        that significantly enhanced the shopping experience while reducing
        returns of bulky items. The technical implementation required
        integrating ViroAR within React Native and optimizing 3D model rendering
        for diverse device capabilities, ensuring smooth performance even on
        older hardware.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Beyond the technical challenges of AR implementation, this project
        taught me valuable lessons about the product lifecycle in large retail
        organizations. I worked closely with merchandising teams to understand
        how customers evaluated products and what information they needed when
        making purchase decisions. This collaboration ensured that the AR
        feature addressed genuine customer needs rather than simply showcasing
        technology. The experience reinforced my belief that successful mobile
        development requires understanding both technical possibilities and user
        contexts—creating features that solve real problems rather than
        implementing technology for its own sake.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        NFT-Based Mobile Gaming
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2022, I explored the intersection of mobile gaming and blockchain
        through{' '}
        <Link href="/project/fantasy-top-shots" className="prose-link">
          Fantasy Top Shots
        </Link>
        , an Expo-based mobile game that integrated Flow blockchain NFTs into a
        fantasy sports experience. This project was particularly exciting as it
        represented a new paradigm for digital ownership in mobile
        games—allowing players to use their NBA Top Shot collectibles as
        playable assets with real utility beyond collection value. The
        implementation leveraged Expo for rapid cross-platform deployment while
        integrating with Flow blockchain for secure NFT ownership verification
        and gameplay mechanics.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        What I found most interesting about this project was exploring the game
        design possibilities created by verifiable digital ownership. Unlike
        traditional mobile games where all assets exist only within the game
        ecosystem, Fantasy Top Shots connected to NFTs that had independent
        value and could be traded on external marketplaces. This created
        entirely new dynamics around asset acquisition and utilization. The
        development process taught me how to balance on-chain verification
        (which requires network connectivity and transaction time) with
        responsive gameplay (which demands immediate feedback). These lessons in
        creating hybrid on-chain/off-chain experiences have proven valuable
        across multiple projects at the intersection of mobile and blockchain
        technologies.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Voice & Chat AI Legal Assistant
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My most recent and technically sophisticated React Native project has
        been at{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        (2024-2025), where I developed a mobile application featuring an
        advanced AI assistant with both voice and chat capabilities. This
        project represents the cutting edge of what's possible in mobile
        experiences—combining the efficiency of React Native with sophisticated
        AI interactions that adapt to users' natural communication preferences.
        The implementation uses OpenAI's Realtime API for voice transcription
        and synthesis, alongside the Vercel AI SDK for chat, all integrated into
        a responsive Expo application styled with Tailwind CSS.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The most technically challenging aspect was creating a unified
        experience across voice and text modalities—allowing users to seamlessly
        switch between speaking and typing while maintaining conversation
        context. The assistant connects to a sophisticated RAG architecture that
        provides contextual legal support, document summaries, and procedural
        guidance in both Spanish and English. What makes this project
        particularly rewarding is seeing how it transforms how lawyers interact
        with their case information—turning what was previously a tedious
        document search process into a natural conversation. This project
        exemplifies my belief in technology that adapts to human behavior rather
        than forcing humans to adapt to technology, creating mobile experiences
        that feel like extensions of natural human capabilities rather than
        separate tools to be learned and managed.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts
        category="Mobile"
        title="Latest Mobile Development Articles"
      />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'React Native & Mobile Development Experience - Gabo Esquivel',
  description:
    'React Native Developer with extensive experience in mobile-first applications, cross-platform development, wallet integrations, and AI assistants',
  keywords: [
    'react native developer',
    'mobile app development',
    'cross-platform mobile',
    'wallet integrations',
    'AI assistants',
    'mobile-first design',
    'Expo',
    'biometric authentication',
    'augmented reality',
    'voice interfaces',
    'blockchain mobile',
    'React Native bridges',
  ],
  openGraph: {
    title: 'React Native & Mobile Development Experience - Gabo Esquivel',
    description:
      'React Native Developer with extensive experience in mobile-first applications, cross-platform development, wallet integrations, and AI assistants',
    type: 'profile',
  },
}
