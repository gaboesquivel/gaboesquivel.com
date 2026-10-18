import { PageTitle, Prose } from "components/shared/page-layout";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <section>
      <PageTitle>Privacy</PageTitle>
      <Prose>
        This site is gaboesquivel.com, a public portfolio and writing site
        operated by Gabo Esquivel. It does not sell your data or run third-party
        advertising trackers beyond what is described here.
      </Prose>
      <Prose>
        When you use the connect form on{" "}
        <Link href="/connect" className="prose-link">
          /connect
        </Link>
        , you send your name, email address, subject line, and message. That
        information is delivered by email so Gabo can read and reply. The form
        is sent through Resend from the site&apos;s hosting on Vercel; Gabo
        receives the message at his work inbox. Do not send passwords, payment
        card numbers, or other secrets through the form.
      </Prose>
      <Prose>
        The site loads Vercel Web Analytics to understand aggregate traffic
        (page views and referrers). Analytics runs from the root layout on
        public pages. Standard server and CDN logs on Vercel may also record IP
        addresses, URLs, and request headers for security and reliability.
      </Prose>
      <Prose>
        Public pages, CV PDFs, and the llms corpus at{" "}
        <Link href="/llms.txt" className="prose-link">
          /llms.txt
        </Link>{" "}
        are meant to be read by people and by AI tools. If you need a record
        removed or corrected, email{" "}
        <Link href="mailto:contact@gaboesquivel.com" className="prose-link">
          contact@gaboesquivel.com
        </Link>
        .
      </Prose>
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "How gaboesquivel.com handles the connect form, email delivery, and Vercel Web Analytics.",
  path: "/privacy",
  title: "Privacy | Gabo Esquivel",
});
