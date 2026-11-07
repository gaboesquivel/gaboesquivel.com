import { ctaLink } from "components/shared/spacing";
import { cn } from "lib/utils";
import Link from "next/link";

const focusLinks = [
  { href: "/ai", label: "Agentic AI products" },
  { href: "/web3", label: "Onchain finance" },
];

/** Lightly ruled row under the projects: where to go next by area. */
export const FocusRow = () => (
  <nav
    aria-label="Explore by focus"
    className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-hairline pt-6 text-sm lg:mt-12"
  >
    <span className="text-neutral-400">Explore by focus</span>
    {focusLinks.map((link) => (
      <Link
        className={cn(
          ctaLink,
          "py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        )}
        href={link.href}
        key={link.href}
      >
        {link.label} <span aria-hidden="true">↗</span>
      </Link>
    ))}
  </nav>
);
