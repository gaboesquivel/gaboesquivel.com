import Image from 'next/image';
import workshop from 'public/images/gabo-workshop.jpg';

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">hi, I'm Gabo Esquivel ( gab-o )</h1>
      
      <p className="prose prose-neutral dark:prose-invert"> 
        I'm a full-stack software engineer focused on building innovative products with a great user experience. My expertise spans react, react native, typescript, nodejs, cloud platforms, evm, smart contracts and foundational knowledge in rust, go and python, complemented by ongoing AI explorations. My approach is rooted in agile methodologies, striving for precision in technology implementation.
      </p>

      {/* With over 15 years in the tech industry,  My career highlights include architect≠\≠ing Bitcash Bank, a pioneering crypto bank, and 'Wink', Costa Rica's first neo-bank which revolutionized online banking. */}

 <div className="gap-4 my-8 columns-1">
 <div className="relative mb-4 h-60">
          <Image
            alt="Me giving a workshop in 2019"
            src={workshop}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
 </div>

      {/* <p className="prose prose-neutral dark:prose-invert">
        I'm committed to the power of open source and deeply involved in advancing decentralized finance (DeFi). My fascination with cryptocurrency stems from its transformative nature in asset management and financial autonomy. Blockchain technology, the foundation of this transformation, ensures direct asset control, bypassing conventional financial systems. DeFi is at the forefront of creating more accessible, transparent, and resilient financial services. This evolution goes beyond mere technology; it signifies a paradigm shift in global financial interactions, ushering in a new era of instant, borderless economic exchanges. We are at the early stages of a significant financial revolution.
      </p> */}

       <p className="prose prose-neutral dark:prose-invert">
        I assist organizations in crafting and evolving software products, making strategic technical decisions, and collaborating closely with stakeholders and development teams. From initial concept to successful market launch, I am involved in every phase, ensuring ideas are realized to their full potential.
      </p>


      <p className="prose prose-neutral dark:prose-invert">
      I fluently speak English, Spanish, Portuguese, and Italian, and I have a diverse array of interests that enrich both my personal life and professional perspective. I am actively engaged in cryptocurrency trading and long-term fundamental investment, complementing these activities with technical analysis to gain deeper insights into market trends. On my free time I enjoy hiking, an activity that allows me to connect with nature and fuels my creative thinking, providing a refreshing counterbalance to my tech-centric professional life. </p>

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