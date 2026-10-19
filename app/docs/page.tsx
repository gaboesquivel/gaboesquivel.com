import { PageSection, PageTitle, Prose } from "components/shared/page-layout";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

const endpoint = "https://gaboesquivel.com/mcp";

export default function DocsPage() {
  return (
    <section>
      <PageTitle>Gabo Esquivel MCP</PageTitle>
      <Prose>
        The Gabo Esquivel MCP server is how another agent reaches the same site
        agent as{" "}
        <Link href="/ask" className="prose-link">
          /ask
        </Link>
        : ask about published work on gaboesquivel.com, leave a note, or request
        a 15- or 30-minute call. Humans can use the chat UI; MCP clients
        delegate durable work over Streamable HTTP.
      </Prose>

      <PageSection title="Endpoint">
        <Prose>
          Connect a Streamable HTTP MCP client to{" "}
          <Link href="/mcp" className="prose-link">
            {endpoint}
          </Link>
          . The route registers GET, POST, and DELETE. Access is public: no API
          key and no OAuth. Every caller shares the anonymous principal, so an
          invocation id is a bearer capability until workflow retention expires.
          Keep invocation ids out of logs and public URLs.
        </Prose>
      </PageSection>

      <PageSection title="Invocation protocol">
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

      <PageSection title="What a message can do">
        <Prose>
          The site agent answers from the published corpus (same retrieval as
          the chat). It can also book a call or send a note through internal
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
          <Link href="/cal" className="prose-link">
            gaboesquivel.com/cal
          </Link>
          .
        </Prose>
        <Prose>
          Hire terms and human-facing context live on{" "}
          <Link href="/ask" className="prose-link">
            /ask
          </Link>
          . Data handling for chat, notes, and bookings is in{" "}
          <Link href="/privacy" className="prose-link">
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

      <PageSection title="Not offered">
        <Prose>
          There is no separate write API, webhooks, API-key authentication, or
          OAuth scopes for this endpoint. The agent&apos;s own tools and skills
          are not published on the MCP channel — only the{" "}
          <code className="text-neutral-200">agent_*</code> invocation tools.
          For a plain-text index of site facts, use{" "}
          <Link href="/llms.txt" className="prose-link">
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
    "Streamable HTTP MCP at gaboesquivel.com/mcp: agent_start and agent_get to ask about published work, leave a note, or book a call.",
  path: "/docs",
  title: "Gabo Esquivel MCP",
});
