import { siteBrandRole, sitePublicDescription } from "lib/site-identity";
import { siteOrigin } from "lib/site-path";

const siteUrl = siteOrigin;

export const homeJsonLd = () => [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    description: sitePublicDescription,
    email: "contact@gaboesquivel.com",
    jobTitle: siteBrandRole,
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
