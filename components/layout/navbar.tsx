"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "gabo", path: "/" },
  { name: "work", path: "/work" },
  { name: "ai", path: "/ai" },
  { name: "web3", path: "/web3" },
  { name: "bio", path: "/bio" },
  { name: "writing", path: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Primary navigation"
      className="navbar -ml-[8px] tracking-tight print:hidden preview-print:hidden"
    >
      <div className="relative px-0" id="nav">
        <div className="flex flex-row flex-wrap">
          {navItems.map(({ path, name }) => {
            const isActive =
              path === "/"
                ? pathname === "/"
                : pathname === path || pathname.startsWith(`${path}/`);

            return (
              <Link
                key={path}
                href={path}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "flex align-middle transition-colors hover:text-neutral-800 dark:hover:text-accent",
                  isActive ? "text-accent" : "text-neutral-400"
                )}
              >
                <span className="px-2 py-1">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
