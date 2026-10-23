"use client";

import { WorkFilterNav } from "components/work/work-filter-nav";
import { WorkIndexHero } from "components/work/work-index-hero";
import { activeWorkTypeFromPathname } from "lib/work-types";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function WorkPageChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const type = activeWorkTypeFromPathname(pathname);

  return (
    <section data-work-shell>
      <WorkIndexHero type={type} />
      <WorkFilterNav type={type} />
      <div data-work-results id="work-results">
        {children}
      </div>
    </section>
  );
}
