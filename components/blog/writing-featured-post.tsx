import { EditorialSection } from "components/interior/editorial-section";
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from "components/interior/split-section";
import { editorialLink } from "components/shared/spacing";
import type { Blog } from "lib/blog";
import { blogListingImageSrc } from "lib/blog-listing-image";
import { categoryDisplayNames } from "lib/blog-taxonomy";
import { primaryBrowseCategory } from "lib/blog-trail";
import { cn, formatBlogListDate } from "lib/utils";
import Image from "next/image";
import Link from "next/link";

export function WritingFeaturedPost({ post }: { post: Blog }) {
  const category = primaryBrowseCategory({ categories: post.category });
  const categoryLabel = category
    ? categoryDisplayNames[category].toLowerCase()
    : null;

  return (
    <EditorialSection label="Featured">
      <SplitSection>
        <SplitSectionContent mediaPosition="right" span={6}>
          <Link
            href={`/blog/${post.slug}`}
            className={cn(editorialLink, "block")}
          >
            {categoryLabel ? (
              <p className="mb-3 text-sm text-accent">{categoryLabel}</p>
            ) : null}
            <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              {post.title}
            </h2>
            {post.summary ? (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300">
                {post.summary}
              </p>
            ) : null}
            <time
              dateTime={post.publishedAt}
              className="mt-4 block text-sm text-neutral-500"
            >
              {formatBlogListDate(post.publishedAt)}
            </time>
          </Link>
        </SplitSectionContent>
        <SplitSectionMedia mediaPosition="right" span={6}>
          <Link
            href={`/blog/${post.slug}`}
            className={cn(editorialLink, "block overflow-hidden rounded-lg")}
          >
            <Image
              alt={post.title}
              className="aspect-[16/10] w-full object-cover"
              height={900}
              sizes="(max-width: 1023px) 100vw, min(42vw, 36rem)"
              src={blogListingImageSrc(post)}
              width={1600}
            />
          </Link>
        </SplitSectionMedia>
      </SplitSection>
    </EditorialSection>
  );
}
