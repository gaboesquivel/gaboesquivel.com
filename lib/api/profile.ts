import { siteOrigin } from "lib/site-path";

const BASE_URL = siteOrigin;

export const siteProfile = () => ({
  email: "contact@gaboesquivel.com",
  links: {
    about: `${BASE_URL}/about`,
    ask: `${BASE_URL}/ask`,
    docs: `${BASE_URL}/docs`,
    llms: `${BASE_URL}/llms.txt`,
    mcp: `${BASE_URL}/mcp`,
    openapi: `${BASE_URL}/openapi.json`,
  },
  location: "Costa Rica",
  name: "Gabo Esquivel",
  role: "Agentic Product Engineer",
  tagline:
    "I build useful and delightful software products across AI, Web3, and full-stack applications.",
  timeZone: "America/Denver",
  timeZoneLabel: "US Mountain Time",
  url: BASE_URL,
});
