import { siteOrigin } from "lib/site-path";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
    // LLM index: https://gaboesquivel.com/llms.txt
  };
}
