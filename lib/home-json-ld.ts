const siteUrl = "https://gaboesquivel.com";

const description =
  "I build useful and delightful software products across AI, Web3, and full-stack applications.";

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
