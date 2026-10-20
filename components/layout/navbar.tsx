"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "components/ui/navigation-menu";
import { cn } from "lib/utils";
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
      <NavigationMenu className="max-w-none flex-1 justify-start" align="start">
        <NavigationMenuList className="flex flex-row flex-wrap justify-start gap-0">
          {navItems.map(({ path, name }) => {
            const isActive =
              path === "/"
                ? pathname === "/"
                : pathname === path || pathname.startsWith(`${path}/`);

            return (
              <NavigationMenuItem key={path}>
                <NavigationMenuLink
                  render={<Link href={path} />}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "align-middle transition-colors hover:text-neutral-800 dark:hover:text-accent",
                    isActive ? "text-accent" : "text-neutral-400"
                  )}
                >
                  {name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
