import type { Metadata } from 'next'

export const pageMetadata = ({
  title,
  description,
  images,
}: {
  title: string
  description: string
  images?: Array<{
    url: string
    width?: number
    height?: number
    alt?: string
  }>
}): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    ...(images ? { images } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    ...(images ? { images } : {}),
  },
})
