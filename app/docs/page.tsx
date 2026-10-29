import { ReadingPageShell } from "components/interior/reading-page-shell";
import {
  IndexHeading,
  PageSection,
  proseLink,
  Prose,
} from "components/shared/page-layout";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

const code = "text-neutral-200";

export default function DocsPage() {
  return (
    <ReadingPageShell>
      <IndexHeading>
        Gabo Esquivel MCP and Site API — developer documentation
      </IndexHeading>
      <Prose>
        The Gabo Esquivel MCP server publishes the site&apos;s public capability
        registry over Streamable HTTP: profile, projects, writing, search, CV
        links, contact context, availability, notes, and bookings. People use
        the search on the{" "}
        <Link href="/" className={proseLink}>
          homepage
        </Link>{" "}
        or the{" "}
        <Link href="/contact" className={proseLink}>
          contact form
        </Link>
        .
      </Prose>

      <PageSection title="Gabo Esquivel MCP developer resources">
        <Prose>
          Canonical documentation lives at{" "}
          <Link href="/docs" className={proseLink}>
            gaboesquivel.com/docs
          </Link>
          . Predictable aliases:{" "}
          <Link href="/developers" className={proseLink}>
            /developers
          </Link>
          ,{" "}
          <Link href="/mcp/docs" className={proseLink}>
            /mcp/docs
          </Link>
          . The Streamable HTTP server is at{" "}
          <Link href="/mcp" className={proseLink}>
            gaboesquivel.com/mcp
          </Link>
          . For read-only JSON (profile and Markdown page exports), use the{" "}
          <Link href="/openapi.json" className={proseLink}>
            Gabo Esquivel Site API
          </Link>{" "}
          OpenAPI description at{" "}
          <Link href="/openapi.json" className={proseLink}>
            /openapi.json
          </Link>
          . Notes and bookings are not on that REST surface — use the MCP tools
          below. For a plain-text corpus index, use{" "}
          <Link href="/llms.txt" className={proseLink}>
            llms.txt
          </Link>
          .
        </Prose>
      </PageSection>

      <PageSection title="Gabo Esquivel MCP server endpoint">
        <Prose>
          Connect a Streamable HTTP MCP client to{" "}
          <Link href="/mcp" className={proseLink}>
            https://gaboesquivel.com/mcp
          </Link>
          . The route registers GET, POST, and DELETE and answers with JSON.
          Call <code className={code}>tools/list</code> for the input schemas,
          then <code className={code}>tools/call</code>.
        </Prose>
      </PageSection>

      <PageSection title="Published tools on /mcp">
        <Prose>
          Read tools: <code className={code}>get_profile</code> (verified
          profile and contextual links),{" "}
          <code className={code}>contact_gabo</code> (public contact
          descriptor), <code className={code}>get_cv</code> (CV download
          metadata for the full, ai, web3, and fullstack variants),{" "}
          <code className={code}>list_projects</code> (package-owned project
          records by work type), <code className={code}>list_writing</code>{" "}
          (published writing), <code className={code}>search_site</code>{" "}
          (deterministic search over the public corpus), and{" "}
          <code className={code}>list_availability</code> (open booking slots
          for a visitor time zone).
        </Prose>
        <Prose>
          Write tools: <code className={code}>send_note</code> (email a note to
          Gabo) and <code className={code}>book_call</code> (book a 15- or
          30-minute call).
        </Prose>
        <Prose>
          List tools take an optional <code className={code}>limit</code> (1–20,
          default 6) and <code className={code}>cursor</code>.{" "}
          <code className={code}>search_site</code> takes a{" "}
          <code className={code}>query</code> of up to 2000 characters.
        </Prose>
      </PageSection>

      <PageSection title="Results">
        <Prose>
          Every call returns a text message and{" "}
          <code className={code}>structuredContent</code> with{" "}
          <code className={code}>status</code>,{" "}
          <code className={code}>message</code>,{" "}
          <code className={code}>data</code>,{" "}
          <code className={code}>operation</code>,{" "}
          <code className={code}>requestId</code>, and{" "}
          <code className={code}>version</code>. Read tools report{" "}
          <code className={code}>ok</code>, <code className={code}>empty</code>,
          or <code className={code}>error</code>. Write tools report{" "}
          <code className={code}>pending</code>,{" "}
          <code className={code}>confirmed</code>,{" "}
          <code className={code}>uncertain</code>, or{" "}
          <code className={code}>failed</code>.
        </Prose>
        <Prose>
          Write tools require a <code className={code}>retryIdentity</code>{" "}
          (8–128 characters). Repeating a call with the same identity and
          payload replays the original outcome instead of sending or booking
          twice; the same identity with a changed payload fails.
        </Prose>
      </PageSection>

      <PageSection title="What notes and bookings do">
        <Prose>
          A note needs a name, an email, and a{" "}
          <code className={code}>description</code> of what you want to discuss
          (10–5000 characters). The site emails contact@gaboesquivel.com with
          your address as reply-to; it does not send you a receipt.
        </Prose>
        <Prose>
          A booking needs name, email, 15- or 30-minute duration, an ISO start
          time, a time zone, and a description. Use{" "}
          <code className={code}>list_availability</code> first. Open weekday
          slots are 9:00–17:00 America/Denver. When two bookings are already on
          the calendar for that Denver day, use{" "}
          <Link href="/cal" className={proseLink}>
            gaboesquivel.com/cal
          </Link>
          .
        </Prose>
        <Prose>
          Hire terms live on{" "}
          <Link href="/contact" className={proseLink}>
            /contact
          </Link>
          . Data handling for notes and bookings is in{" "}
          <Link href="/privacy" className={proseLink}>
            /privacy
          </Link>
          .
        </Prose>
      </PageSection>

      <PageSection title="Public limits">
        <Prose>
          Limits reset on America/Denver calendar days: 5 notes per email and
          per IP, 2 bookings site-wide. Do not send passwords, payment card
          numbers, or other secrets through these tools.
        </Prose>
      </PageSection>

      <PageSection title="Gabo Esquivel MCP authentication">
        <Prose>
          Access is public: no API key, no OAuth, and no scoped credentials.
          Every caller shares the anonymous principal.
        </Prose>
      </PageSection>

      <PageSection title="Not offered on Gabo Esquivel MCP">
        <Prose>
          There are no webhooks, API-key authentication, or OAuth scopes, and no
          conversational agent tool: callers compose the published tools
          themselves. The former CV app endpoint at{" "}
          <code className={code}>/mcp/cv</code> is retired and returns 410; use{" "}
          <code className={code}>get_cv</code> on{" "}
          <code className={code}>/mcp</code>. For a plain-text index of site
          facts, use{" "}
          <Link href="/llms.txt" className={proseLink}>
            llms.txt
          </Link>
          .
        </Prose>
      </PageSection>
    </ReadingPageShell>
  );
}

export const metadata = pageMetadata({
  description:
    "Gabo Esquivel MCP and Site API: OpenAPI at /openapi.json, Streamable HTTP at /mcp with public tools for profile, projects, writing, search, CV, notes, and bookings.",
  path: "/docs",
  title: "Gabo Esquivel MCP and Site API — Developer documentation",
});
