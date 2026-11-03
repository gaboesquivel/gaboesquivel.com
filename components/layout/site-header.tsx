"use client";

import { usePathname } from "next/navigation";

import { SiteWidth } from "@/components/layout/site-width";
import { headerColumnPadding } from "@/components/shared/spacing";

import Navbar from "./navbar";

export const SiteHeader = () => {
  const pathname = usePathname() || "/";
  if (pathname === "/cv") return null;

  return (
    <header className="bg-black print:hidden preview-print:hidden">
      <div className="h-0.5 w-full bg-accent" />
      <SiteWidth className={headerColumnPadding}>
        <Navbar />
      </SiteWidth>
    </header>
  );
};
