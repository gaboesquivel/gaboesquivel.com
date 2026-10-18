import type { Metadata } from 'next'
import { markdownSiblingPath } from './markdown-sibling'

export const pageMetadata = ({
  title,
  description,
  path,
  images,
}: {
  title: string
  description: string
  path?: string
  images?: Array<{
    url: string
    width?: number
    height?: number
    alt?: string
  }>
}): Metadata => ({
  title,
  description,
  ...(path
    ? {
        alternates: {
          types: { 'text/markdown': markdownSiblingPath(path) },
        },
      }
    : {}),
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

export const metadataWithMarkdownAlternate = ({
  metadata,
  path,
}: {
  metadata: Metadata
  path: string
}): Metadata => ({
  ...metadata,
  alternates: {
    ...metadata.alternates,
    types: {
      ...metadata.alternates?.types,
      'text/markdown': markdownSiblingPath(path),
    },
  },
})
