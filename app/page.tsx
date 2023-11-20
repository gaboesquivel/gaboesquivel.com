import Image from 'next/image';
import workshop from 'public/images/gabo-workshop.jpg';

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">hi, I'm Gabo Esquivel ( gab-o )</h1>
      
      <p className="prose prose-neutral dark:prose-invert"> 
      With over 15 years in the tech industry, I'm a full-stack software engineer specializing in fintech and web3 since 2016. My career highlights include architecting Bitcash Bank, a pioneering crypto bank, and 'Wink', Costa Rica's first neo-bank which revolutionized online banking. My expertise spans NodeJS, cloud platforms, React, React Native, Docker, TypeScript, and foundational knowledge in Rust, Go, C++, and Python, complemented by ongoing AI explorations.
        </p>
      {/* <p className="prose prose-neutral dark:prose-invert"> 
        With over 15 years of experience, I am a seasoned full-stack software engineer with a specialized focus on fintech and web3 technologies, a domain I have been actively involved in since 2016. My career features a wealth of blockchain initiatives, including Bitcash Bank, a crypto bank founded on smart contracts, offering crypto collateralized stable coins across multiple countries and exchange systems. Another significant achievement is architecting 'Wink', Costa Rica's pioneering neo-bank. Wink has been a game-changer in the banking sector, introducing a mobile app that transformed traditional banking by enabling effortless online transactions, thus phasing out the need for physical branches. Alongside this, I bring a decade of deep engagement with NodeJS and cloud platforms, complemented by advanced expertise in React, React Native, Docker, and TypeScript. My solid foundation in Rust, Go, C++, and Python, along with my continuous exploration in AI, place me at the forefront of emerging tech trends. 
        </p> */}

 <div className="gap-4 my-8 columns-1">
 <div className="relative mb-4 h-60">
          <Image
            alt="Me giving a workshop at workshop 2019"
            src={workshop}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
 </div>

      <p className="prose prose-neutral dark:prose-invert">
        I am an advocate for leveraging open source technologies, embracing the transformative potential of decentralized finance (DeFi), endorsing a DevOps mindset, and applying agile methodologies with precision. My expertise is centered on the fusion of emerging tech, financial service innovations, and the delivery of outstanding user experiences.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        The allure of cryptocurrency for me lies in its revolutionary offering of asset control and financial independence. Blockchain technology acts as the bedrock for this, providing a strong guarantee of direct asset ownership that sidesteps traditional financial institution constraints. In the realm of DeFi, we’re witnessing profound advancements that pave the way for more inclusive, transparent, and robust financial services. This movement is not just about technological advancements; it’s reshaping how we engage in financial transactions across borders instantly, heralding a new era in economic interaction. The ongoing evolution in this space is a testament to the nascent stages of a more extensive financial transformation.
       </p>

       <p className="prose prose-neutral dark:prose-invert">
        Professionally, I assist organizations in crafting and evolving software products, making strategic technical decisions, and collaborating closely with stakeholders and development teams. From initial concept to successful market launch, I am involved in every phase, ensuring ideas are realized to their full potential. My consultancy services are provided through my company, Blockmatic Labs LLC.
 </p>

      <p className="prose prose-neutral dark:prose-invert">
      Blockchain, DeFi, NodeJS, Databases, Linux, Docker, Cloud, GraphQL, React, React Native
      </p>

      <p className="prose prose-neutral dark:prose-invert">
      Spoken languages: English, Spanish, Portuguese, and Italian.
      </p>

           <ul className="flex flex-col mt-8 space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        
         <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/gaboesquivel"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">linkedIn</p>
          </a>
        </li>
        
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/gaboesquivel"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">follow me</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:contact@gaboesquivel.com"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">email me</p>
          </a>
        </li>
      </ul>
    </section>
  );
}


function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}