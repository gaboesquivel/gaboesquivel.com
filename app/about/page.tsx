import { blockGrid, PageTitle, Prose } from "components/shared/page-layout";
import { PathLink } from "components/shared/path-link";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section>
      <PageTitle>About Gabo Esquivel</PageTitle>
      <Prose>
        Gabo Esquivel is a product engineer based in Costa Rica. His work spans
        AI assistants, mobile banking, blockchain systems, and the interfaces
        that connect them. He works across product decisions, design,
        architecture, and implementation.
      </Prose>
      <Prose>
        For examples of that work, explore the selected projects on{" "}
        <Link href="/work" className="prose-link">
          /work
        </Link>
        . The longer career story is on{" "}
        <Link href="/bio" className="prose-link">
          /bio
        </Link>
        , and the roles, dates, and technical skills are documented in{" "}
        <Link href="/cv" className="prose-link">
          /cv
        </Link>
        .
      </Prose>
      <Prose>
        This site also makes its published information available to AI tools.
        Read{" "}
        <Link href="/llms.txt" className="prose-link">
          llms.txt
        </Link>{" "}
        for the text index, or visit{" "}
        <Link href="/docs" className="prose-link">
          /docs
        </Link>{" "}
        for the MCP and Site API documentation.
      </Prose>
      <Prose>
        For hiring, contracting, or a project conversation, use{" "}
        <Link href="/contact" className="prose-link">
          /contact
        </Link>
        .
      </Prose>
      <ul className={blockGrid}>
        <li className="h-full">
          <PathLink
            href="/bio"
            title="Career story"
            note="The only complete career narrative on the site."
          />
        </li>
        <li className="h-full">
          <PathLink
            href="/work"
            title="Work"
            note="Featured projects and recent writing."
          />
        </li>
        <li className="h-full">
          <PathLink
            href="/contact"
            title="Contact"
            note="Hire terms and the contact form."
          />
        </li>
        <li className="h-full">
          <PathLink
            href="/docs"
            title="Gabo Esquivel MCP"
            note="Developer docs for the Streamable HTTP site agent at /mcp."
          />
        </li>
      </ul>
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "Background and public information for Gabo Esquivel, with links to selected software projects, career history, CV, and agent-readable resources.",
  path: "/about",
  title: "About Gabo Esquivel",
});
