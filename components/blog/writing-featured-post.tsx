import { EditorialSection } from "components/interior/editorial-section";
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from "components/interior/split-section";
import { editorialLink } from "components/shared/spacing";
import type { BlogCard } from "lib/blog-cards";
import { categoryDisplayNames } from "lib/blog-taxonomy";
import { primaryBrowseCategory } from "lib/blog-trail";
import { cn, formatBlogListDate } from "lib/utils";
import Image from "next/image";
import Link from "next/link";

export function WritingFeaturedPost({ post }: { post: BlogCard }) {
  const category = primaryBrowseCategory({ categories: post.category });
  const categoryLabel = category
    ? categoryDisplayNames[category].toLowerCase()
    : null;

  return (
    <EditorialSection>
      <SplitSection sectionSpacing={false}>
        <SplitSectionContent mediaPosition="right" span={post.image ? 6 : 7}>
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
              className="mt-4 block text-sm text-neutral-400"
            >
              {formatBlogListDate(post.publishedAt)}
            </time>
          </Link>
        </SplitSectionContent>
        {/* Listings omit the hero when `image` is absent. */}
        {post.image ? (
          <SplitSectionMedia mediaPosition="right" span={6}>
            <Link
              href={`/blog/${post.slug}`}
              className={cn(editorialLink, "block overflow-hidden rounded-lg")}
            >
              <Image
                alt={post.title}
                className="aspect-video w-full bg-neutral-900 object-cover"
                height={900}
                sizes="(max-width: 1023px) 100vw, min(42vw, 36rem)"
                src={post.image}
                width={1600}
              />
            </Link>
          </SplitSectionMedia>
        ) : null}
      </SplitSection>
    </EditorialSection>
  );
}
