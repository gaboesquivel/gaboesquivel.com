const siteUrl = "https://gaboesquivel.com";

const description =
  "Gabo Esquivel builds useful, delightful software for humans and agents, connecting product, careful design, and architecture across AI, Web3, and finance.";

export const homeJsonLd = () => [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    description,
    email: "contact@gaboesquivel.com",
    jobTitle: "Agentic Product Engineer",
    name: "Gabo Esquivel",
    sameAs: [
      "https://github.com/gaboesquivel",
      "https://twitter.com/gaboesquivel",
      "https://linkedin.com/in/gaboesquivel",
    ],
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional inquiries",
      email: "contact@gaboesquivel.com",
    },
    name: "Gabo Esquivel",
    url: siteUrl,
  },
];
