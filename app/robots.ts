export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://gaboesquivel.com/sitemap.xml',
    host: 'https://gaboesquivel.com',
    // LLM index: https://gaboesquivel.com/llms.txt
  }
}
