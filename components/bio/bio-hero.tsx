import { PageTitle } from "components/shared/page-layout";
import { heroPitch, heroTitle } from "components/shared/spacing";
import { cn } from "lib/utils";
import Image from "next/image";

const portraitSizes =
  "(max-width: 1023px) 100vw, (max-width: 1151px) 45vw, 520px";

export function BioHero({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "grid min-w-0 grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:gap-10 xl:gap-12",
        className
      )}
    >
      <div className="max-w-[72ch] min-w-0">
        <PageTitle className={cn(heroTitle, "mb-0 max-w-none")}>
          My journey
        </PageTitle>
        <p className={cn(heroPitch, "max-w-[52ch]")}>
          A 15+ year journey building products across web, fintech, Web3, and
          AI. Different chapters, the same interest: making complex technology
          useful to people.
        </p>
      </div>
      <figure className="min-w-0 justify-self-stretch lg:justify-self-end">
        <Image
          alt="Gabo Esquivel"
          className="h-auto max-h-[min(72vh,640px)] w-full rounded-lg object-cover object-[center_12%]"
          fetchPriority="high"
          height={1098}
          preload
          sizes={portraitSizes}
          src="/images/gabo-portrait.webp"
          width={1433}
        />
      </figure>
    </header>
  );
}
