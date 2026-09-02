import { cn } from 'lib/utils'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  blockSpacing,
  headingSpacing,
  indexTitle,
  pageTitle,
  proseClass,
  sectionSpacing,
  sectionTitle,
} from './spacing'

export {
  blockGrid,
  blockSpacing,
  cardLink,
  headingSpacing,
  indexTitle,
  pageTitle,
  projectMedia,
  proseClass,
  sectionSpacing,
  sectionTitle,
  singleColGrid,
  subHeading,
  subHeadingSm,
  titleSpacing,
  twoColGrid,
} from './spacing'

export function Prose({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <p className={cn(proseClass, blockSpacing, className)}>{children}</p>
}

export function IndexHeading({ children }: { children: ReactNode }) {
  return <h1 className={cn(indexTitle, 'text-balance')}>{children}</h1>
}

export function PageTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <h1 className={cn(pageTitle, className)}>{children}</h1>
}

export function PageSection({
  title,
  action,
  children,
  className,
}: {
  title: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn(sectionSpacing, className)}>
      <div
        className={cn(
          headingSpacing,
          'flex items-baseline justify-between gap-4',
        )}
      >
        <h2 className={sectionTitle}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export function WritingSection({
  title,
  children,
  className,
}: {
  title: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <PageSection title={title} className={cn('print:hidden', className)}>
      {children}
    </PageSection>
  )
}

export function PageImage({
  src,
  alt,
  priority,
  className,
  objectClassName,
}: {
  src: StaticImageData | string
  alt: string
  priority?: boolean
  className?: string
  objectClassName?: string
}) {
  return (
    <div
      className={cn(
        'relative aspect-[16/9] h-auto w-full max-h-[420px]',
        blockSpacing,
        className,
      )}
    >
      <Image
        alt={alt}
        src={src}
        fill
        sizes="(max-width: 768px) 100vw, 896px"
        priority={priority}
        className={cn('rounded-lg object-cover', objectClassName)}
      />
    </div>
  )
}

export function FilterNav({
  label,
  current,
  items,
}: {
  label: string
  current: string
  items: { id: string; href: string; label: string }[]
}) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-2 md:gap-4">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          aria-current={current === item.id ? 'page' : undefined}
          className={cn(
            'rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-800',
            current === item.id ? 'text-accent' : '',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
