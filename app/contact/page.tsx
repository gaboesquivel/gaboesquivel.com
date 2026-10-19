import { blockGrid, PageTitle, Prose } from "components/shared/page-layout";
import { PathLink } from "components/shared/path-link";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

export default function ContactPage() {
  return (
    <section>
      <PageTitle>Contact Gabo Esquivel</PageTitle>
      <Prose>
        Gabo Esquivel is an agentic product engineer based in Costa Rica,
        working US Mountain Time. This page is how you reach him for
        professional inquiries about hiring, contracting, or collaboration on
        agentic AI, onchain finance, and full-stack product work.
      </Prose>
      <Prose>
        The fastest path is the site agent on{" "}
        <Link href="/ask" className="prose-link">
          /ask
        </Link>
        : ask about published work, leave a note with your name and email, or
        book a 15- or 30-minute call from the chat. Notes go to
        contact@gaboesquivel.com with your address as reply-to; the site does
        not send a receipt email. When two bookings are already on the calendar
        for that Denver day, use{" "}
        <Link href="/cal" className="prose-link">
          /cal
        </Link>{" "}
        for a self-serve slot.
      </Prose>
      <Prose>
        You can also email{" "}
        <Link href="mailto:contact@gaboesquivel.com" className="prose-link">
          contact@gaboesquivel.com
        </Link>{" "}
        directly. For background before you write, read the{" "}
        <Link href="/work" className="prose-link">
          work portfolio
        </Link>
        , the career story on{" "}
        <Link href="/bio" className="prose-link">
          /bio
        </Link>
        , or the printable record on{" "}
        <Link href="/cv" className="prose-link">
          /cv
        </Link>
        .
      </Prose>
      <Prose>
        Another agent can delegate the same flows through the Gabo Esquivel MCP
        server at{" "}
        <Link href="/mcp" className="prose-link">
          /mcp
        </Link>{" "}
        (<code className="text-neutral-200">agent_start</code>, then{" "}
        <code className="text-neutral-200">agent_get</code>). Protocol,
        authentication, and limits are documented at{" "}
        <Link href="/docs" className="prose-link">
          /docs
        </Link>
        . Read-only JSON and Markdown exports for the site are described in{" "}
        <Link href="/openapi.json" className="prose-link">
          openapi.json
        </Link>
        ; the plain-text corpus index is{" "}
        <Link href="/llms.txt" className="prose-link">
          llms.txt
        </Link>
        . Data handling for chat, notes, and bookings is in{" "}
        <Link href="/privacy" className="prose-link">
          /privacy
        </Link>
        .
      </Prose>
      <ul className={blockGrid}>
        <li className="h-full">
          <PathLink
            href="/ask"
            title="Ask"
            note="Chat, a note, or a 15- or 30-minute call."
          />
        </li>
        <li className="h-full">
          <PathLink
            href="/docs"
            title="Gabo Esquivel MCP"
            note="Developer docs for agents integrating at /mcp."
          />
        </li>
        <li className="h-full">
          <PathLink
            href="/about"
            title="About"
            note="Public identity and how this site is organized."
          />
        </li>
      </ul>
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "Contact Gabo Esquivel: /ask for chat, notes, and bookings, contact@gaboesquivel.com, or Gabo Esquivel MCP at /mcp for agents.",
  path: "/contact",
  title: "Contact Gabo Esquivel",
});
