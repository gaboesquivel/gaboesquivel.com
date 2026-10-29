import { ReadingPageShell } from "components/interior/reading-page-shell";
import { PageTitle, proseLink, Prose } from "components/shared/page-layout";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <ReadingPageShell>
      <PageTitle>Privacy</PageTitle>
      <Prose>
        This site is gaboesquivel.com, a public portfolio and writing site
        operated by Gabo Esquivel. It does not sell your data or run third-party
        advertising trackers beyond what is described here.
      </Prose>
      <Prose>
        The contact form on{" "}
        <Link href="/contact" className={proseLink}>
          /contact
        </Link>{" "}
        sends your name, email address, subject, and message to
        contact@gaboesquivel.com through Resend. The reply-to address is yours.
        The site does not email you a receipt.
      </Prose>
      <Prose>
        The homepage search, when you ask it to book a call or leave a note, and
        the public MCP tools at /mcp (documented on{" "}
        <Link href="/docs" className={proseLink}>
          /docs
        </Link>
        ) can send a note or request a 15- or 30-minute call. A note sends your
        name, email address, and what you want to discuss to
        contact@gaboesquivel.com through Resend. The reply-to address is yours.
        The site does not email you a receipt. A booking adds you as a guest on
        Gabo&apos;s calendar and Google sends the invitation. The event includes
        the time, the length, and what you wanted to discuss.
      </Prose>
      <Prose>
        Notes and bookings are counted per day in Upstash so the public limits
        hold. Those counts use your IP address and, for a note, your email
        address. Do not send passwords, payment card numbers, or other secrets
        through the search or the MCP tools.
      </Prose>
      <Prose>
        The site loads Vercel Web Analytics to understand aggregate traffic
        (page views and referrers). Analytics runs from the root layout on
        public pages. Standard server and CDN logs on Vercel may also record IP
        addresses, URLs, and request headers for security and reliability.
      </Prose>
      <Prose>
        Public pages, CV PDFs, and the llms corpus at{" "}
        <Link href="/llms.txt" className={proseLink}>
          /llms.txt
        </Link>{" "}
        are meant to be read by people and by AI tools. If you need a record
        removed or corrected, email{" "}
        <Link href="mailto:contact@gaboesquivel.com" className={proseLink}>
          contact@gaboesquivel.com
        </Link>
        .
      </Prose>
    </ReadingPageShell>
  );
}

export const metadata = pageMetadata({
  description:
    "How gaboesquivel.com handles the contact form, notes, calendar invites, the public MCP tools, and Vercel Web Analytics.",
  path: "/privacy",
  title: "Privacy | Gabo Esquivel",
});
