import { ReadingPageShell } from "components/interior/reading-page-shell";
import {
  PageSection,
  PageTitle,
  Prose,
  proseLink,
} from "components/shared/page-layout";
import { MARKETS } from "lib/measurement/contact";
import type { ContactEvent, Market } from "lib/measurement/contact";
import {
  loadContactMonths,
  loadIsAgentic,
  loadLatestLighthouse,
} from "lib/measurement/dashboard";
import type { MonthSummary } from "lib/measurement/dashboard";
import { ownerAccess } from "lib/measurement/owner-auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

// Private owner dashboard (docs/specs/005). The proxy asks for the password;
// the page checks again so a matcher change cannot expose it.

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "Analytics",
};

const EVENT_LABELS: Record<ContactEvent, string> = {
  booking: "Calendly bookings",
  cal_click: "/cal clicks",
  call_booked: "Calls booked (homepage, MCP)",
  contact_sent: "Contact form sends",
  note_sent: "Notes sent (homepage, MCP)",
};

const MARKET_LABELS: Record<Market, string> = {
  latam: "Latin America",
  rest: "Rest",
  us: "US",
};

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

const LINKS = [
  { href: "https://cloud.umami.is", label: "Umami: engagement, funnels" },
  {
    href: CLARITY_ID
      ? `https://clarity.microsoft.com/projects/view/${CLARITY_ID}/dashboard`
      : "https://clarity.microsoft.com/projects",
    label: "Clarity: recordings, heatmaps",
  },
  {
    href: "https://vercel.com/dashboard",
    label: "Vercel: Web Analytics, Speed Insights",
  },
  {
    href: "https://calendly.com/app/scheduled_events/user/me",
    label: "Calendly: scheduled events",
  },
];

const cell = "border-b border-border px-2 py-1.5 text-left tabular-nums";

function MonthTable({ summary }: { summary: MonthSummary }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="mb-2 text-left font-medium">
          {summary.month}: {summary.total} contact actions
        </caption>
        <thead>
          <tr>
            <th className={cell}>Event</th>
            {MARKETS.map((market) => (
              <th className={cell} key={market}>
                {MARKET_LABELS[market]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(Object.keys(EVENT_LABELS) as ContactEvent[]).map((event) => (
            <tr key={event}>
              <td className={cell}>{EVENT_LABELS[event]}</td>
              {MARKETS.map((market) => (
                <td className={cell} key={market}>
                  {summary.byEvent[event][market]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="font-medium">
            <td className={cell}>Total</td>
            {MARKETS.map((market) => (
              <td className={cell} key={market}>
                {summary.totalByMarket[market]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default async function AnalyticsPage() {
  if (ownerAccess((await headers()).get("authorization")) !== "granted") {
    notFound();
  }
  const [contacts, lighthouse, isAgentic] = await Promise.all([
    loadContactMonths().catch(() => null),
    loadLatestLighthouse(),
    loadIsAgentic(),
  ]);

  return (
    <ReadingPageShell>
      <PageTitle>Analytics</PageTitle>
      <Prose>
        Contact actions per month, the primary metric. Country comes from
        Vercel; Calendly bookings have none and count under Rest.
      </Prose>

      <PageSection title="Contact actions">
        {contacts === null ? (
          <Prose>Counters could not be read from Redis.</Prose>
        ) : contacts.configured ? (
          <div className="space-y-8">
            {contacts.months.map((summary) => (
              <MonthTable key={summary.month} summary={summary} />
            ))}
          </div>
        ) : (
          <Prose>Redis is not configured, so nothing is counted yet.</Prose>
        )}
      </PageSection>

      <PageSection title="Quality">
        {lighthouse ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="mb-2 text-left font-medium">
                Lighthouse, {lighthouse[0]?.date}
              </caption>
              <thead>
                <tr>
                  {["Page", "Device", "Perf", "A11y", "Best", "SEO"].map(
                    (label) => (
                      <th className={cell} key={label}>
                        {label}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {lighthouse.map((row) => (
                  <tr key={`${row.page}-${row.form_factor}`}>
                    <td className={cell}>{row.page}</td>
                    <td className={cell}>{row.form_factor}</td>
                    <td className={cell}>{row.performance}</td>
                    <td className={cell}>{row.accessibility}</td>
                    <td className={cell}>{row.best_practices}</td>
                    <td className={cell}>{row.seo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Prose>Lighthouse: not yet measured.</Prose>
        )}
        <Prose>
          is-agentic.com:{" "}
          {isAgentic
            ? `${isAgentic.score}/100, ${isAgentic.score_label ?? "no label"} (scanned ${isAgentic.scanned_at?.slice(0, 10) ?? "unknown"})`
            : "not available"}
        </Prose>
      </PageSection>

      <PageSection title="Dashboards">
        <ul className="space-y-2">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a className={proseLink} href={link.href} rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </PageSection>
    </ReadingPageShell>
  );
}
