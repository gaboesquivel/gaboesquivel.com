import {
  IndexHeading,
  PageSection,
  proseLink,
  Prose,
} from "components/shared/page-layout";
import { pageMetadata } from "lib/page-metadata";
import { siteOrigin } from "lib/site-path";
import Link from "next/link";

const endpoint = `${siteOrigin}/mcp`;
const cvAppEndpoint = `${siteOrigin}/mcp/cv`;

export default function DocsPage() {
  return (
    <section>
      <IndexHeading>
        Gabo Esquivel MCP and Site API — developer documentation
      </IndexHeading>
      <Prose>
        The Gabo Esquivel MCP server is how another agent reaches the same site
        agent as{" "}
        <Link href="/ask" className={proseLink}>
          /ask
        </Link>
        : ask about published work on gaboesquivel.com, leave a note, or request
        a 15- or 30-minute call. Humans can use the chat UI; MCP clients
        delegate durable work over Streamable HTTP.
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
          . Task execution is not on that REST surface — use the MCP{" "}
          <code className="text-neutral-200">agent_*</code> tools documented
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
            {endpoint}
          </Link>
          . The route registers GET, POST, and DELETE. Access rules and
          invocation-id handling are under Gabo Esquivel MCP authentication
          below.
        </Prose>
      </PageSection>

      <PageSection title="Gabo Esquivel MCP invocation protocol">
        <Prose>
          The channel exposes four MCP tools. Start with{" "}
          <code className="text-neutral-200">agent_start</code> and a{" "}
          <code className="text-neutral-200">message</code> string (up to 64 KiB
          UTF-8). It returns an invocation id immediately; work continues after
          the HTTP response. Poll with{" "}
          <code className="text-neutral-200">agent_get</code> and{" "}
          <code className="text-neutral-200">invocationId</code> until the
          status is terminal. While status is{" "}
          <code className="text-neutral-200">working</code>, wait at least{" "}
          <code className="text-neutral-200">pollAfterMs</code> before polling
          again.
        </Prose>
        <Prose>
          Status values: <code className="text-neutral-200">working</code>,{" "}
          <code className="text-neutral-200">input_required</code>,{" "}
          <code className="text-neutral-200">authorization_required</code>,{" "}
          <code className="text-neutral-200">completed</code>,{" "}
          <code className="text-neutral-200">failed</code>,{" "}
          <code className="text-neutral-200">cancelled</code>. Use{" "}
          <code className="text-neutral-200">agent_update</code> only when
          status is <code className="text-neutral-200">input_required</code>,
          sending the full answer batch in{" "}
          <code className="text-neutral-200">responses</code>.{" "}
          <code className="text-neutral-200">agent_cancel</code> requests
          cooperative cancellation; keep polling{" "}
          <code className="text-neutral-200">agent_get</code> until the
          invocation reaches a terminal state.
        </Prose>
        <Prose>
          Rejected tool calls use{" "}
          <code className="text-neutral-200">isError: true</code> with{" "}
          <code className="text-neutral-200">structuredContent.error</code>{" "}
          codes: <code className="text-neutral-200">invalid_input</code>,{" "}
          <code className="text-neutral-200">not_found</code>,{" "}
          <code className="text-neutral-200">conflict</code> (retryable),{" "}
          <code className="text-neutral-200">internal</code>. A{" "}
          <code className="text-neutral-200">failed</code> invocation status
          means the call succeeded but the task failed — handle that separately
          from a rejected call.
        </Prose>
        <Prose>
          <code className="text-neutral-200">agent_start</code> is not
          idempotent. If the response is lost, there is no id to poll; a second
          start begins a second task. The whole MCP request body is limited to 1
          MiB.
        </Prose>
      </PageSection>

      <PageSection title="Published tools on /mcp">
        <Prose>
          The channel also publishes{" "}
          <code className="text-neutral-200">cv</code>, a read-only tool that
          returns PDF and HTML links for the CV variants (
          <code className="text-neutral-200">full</code>,{" "}
          <code className="text-neutral-200">ai</code>,{" "}
          <code className="text-neutral-200">web3</code>,{" "}
          <code className="text-neutral-200">fullstack</code>). Call it with{" "}
          <code className="text-neutral-200">tools/call</code> or let{" "}
          <code className="text-neutral-200">agent_start</code> handle a CV
          request. Direct <code className="text-neutral-200">cv</code> calls do
          not count toward message limits.
        </Prose>
        <Prose>
          For MCP Apps hosts (ChatGPT and similar), connect a separate
          Streamable HTTP server at{" "}
          <Link href="/mcp/cv" className={proseLink}>
            {cvAppEndpoint}
          </Link>
          . It exposes the same <code className="text-neutral-200">cv</code>{" "}
          tool with a UI resource that renders a download card.
        </Prose>
      </PageSection>

      <PageSection title="What a message can do">
        <Prose>
          The site agent answers from the published corpus (same retrieval as
          the chat). It can also book a call or send email through internal
          tools that are not published on the MCP surface:{" "}
          <code className="text-neutral-200">list_slots</code>,{" "}
          <code className="text-neutral-200">book</code>, and{" "}
          <code className="text-neutral-200">send</code>. On this channel those
          tools do not wait for browser approval.
        </Prose>
        <Prose>
          A note needs a name, an email, and what you want to discuss (10–5000
          characters). The site emails contact@gaboesquivel.com with your
          address as reply-to; it does not send you a receipt. A booking needs
          name, email, 15- or 30-minute duration, an ISO start time, a time
          zone, and what you want to discuss. Open weekday slots are 9:00–17:00
          America/Denver. When two bookings are already on the calendar for that
          Denver day, the agent points to{" "}
          <Link href="/cal" className={proseLink}>
            gaboesquivel.com/cal
          </Link>
          .
        </Prose>
        <Prose>
          Hire terms and human-facing context live on{" "}
          <Link href="/ask" className={proseLink}>
            /ask
          </Link>
          . Data handling for chat, notes, and bookings is in{" "}
          <Link href="/privacy" className={proseLink}>
            /privacy
          </Link>
          .
        </Prose>
      </PageSection>

      <PageSection title="Public limits">
        <Prose>
          Limits reset on America/Denver calendar days: 30 messages per IP, 5
          notes per email and per IP, 2 bookings site-wide. Do not send
          passwords, payment card numbers, or other secrets through the agent.
        </Prose>
      </PageSection>

      <PageSection title="Gabo Esquivel MCP authentication">
        <Prose>
          Access is public: no API key, no OAuth, and no scoped credentials.
          Every caller shares the anonymous principal. An invocation id is a
          bearer capability until workflow retention expires — keep invocation
          ids out of logs and public URLs.
        </Prose>
      </PageSection>

      <PageSection title="Not offered on Gabo Esquivel MCP">
        <Prose>
          There is no separate write API, webhooks, API-key authentication, or
          OAuth scopes for this endpoint. Booking and note tools (
          <code className="text-neutral-200">list_slots</code>,{" "}
          <code className="text-neutral-200">book</code>,{" "}
          <code className="text-neutral-200">send</code>) and skills are not
          published on <code className="text-neutral-200">/mcp</code> — only{" "}
          <code className="text-neutral-200">agent_*</code> and{" "}
          <code className="text-neutral-200">cv</code>. For a plain-text index
          of site facts, use{" "}
          <Link href="/llms.txt" className={proseLink}>
            llms.txt
          </Link>
          .
        </Prose>
      </PageSection>
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "Gabo Esquivel MCP and Site API: OpenAPI at /openapi.json, Streamable HTTP at /mcp, protocol at /docs (also /developers), public auth, agent_start and agent_get.",
  path: "/docs",
  title: "Gabo Esquivel MCP and Site API — Developer documentation",
});
