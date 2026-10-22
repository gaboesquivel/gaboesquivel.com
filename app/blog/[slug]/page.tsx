import { BlogPostChips } from "components/blog/blog-post-chips";
import { LatestPosts } from "components/blog/latest-posts";
import { Mdx } from "components/mdx";
import { indexTitle } from "components/shared/page-layout";
import { PageTrail } from "components/shared/page-trail";
import { allBlogs } from "lib/blog";
import { blogJsonLd } from "lib/blog-json-ld";
import { getRelatedPosts } from "lib/blog-related";
import { categoryDisplayNames, isArchivePost } from "lib/blog-taxonomy";
import { primaryBrowseCategory } from "lib/blog-trail";
import { blogOgMetadataImages } from "lib/og/resolve";
import { metadataWithMarkdownAlternate } from "lib/page-metadata";
import { siteOrigin } from "lib/site-path";
import { cn, formatDate } from "lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allBlogs.find((post) => post.slug === slug);
  if (!post) {
    notFound();
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    ogImage,
    slug: postSlug,
  } = post;
  const images = blogOgMetadataImages({
    ogImage,
    siteOrigin,
    slug: postSlug,
  });
  const twitterImages = images.map((img) =>
    img.url.startsWith("http") ? img.url : `${siteOrigin}${img.url}`
  );

  return metadataWithMarkdownAlternate({
    metadata: {
      description,
      openGraph: {
        description,
        publishedTime,
        title,
        type: "article",
        url: `${siteOrigin}/blog/${postSlug}`,
        images,
      },
      title,
      twitter: {
        card: "summary_large_image",
        description,
        title,
        images: twitterImages,
      },
    },
    path: `/blog/${postSlug}`,
  });
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allBlogs.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts({ allPosts: allBlogs, post });
  const archived = isArchivePost(post.publishedAt);
  const browseCategory = primaryBrowseCategory({ categories: post.category });
  const trail = [
    { label: "writing", href: "/blog" },
    ...(browseCategory
      ? [
          {
            label: categoryDisplayNames[browseCategory].toLowerCase(),
            href: `/blog/category/${browseCategory}`,
          },
        ]
      : []),
    { label: post.title },
  ];

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd(post)),
        }}
      />
      <PageTrail segments={trail} />
      <h1 className={cn(indexTitle, "mt-4 mb-2 text-balance")}>{post.title}</h1>
      <p
        className={cn(
          "max-w-[650px] text-sm text-neutral-600 dark:text-neutral-400",
          archived ? "mb-2" : "mb-6"
        )}
      >
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </p>
      {archived ? (
        <p className="mb-6 max-w-[650px] text-sm text-neutral-500 dark:text-neutral-500">
          Historical post — views and technology at time of publication.
        </p>
      ) : null}
      <Mdx code={post.body} />
      <BlogPostChips categories={post.category} />
      {relatedPosts.length > 0 ? (
        <LatestPosts
          slugs={relatedPosts.map((post) => post.slug)}
          title="Related writing"
          variant="editorial"
        />
      ) : null}
    </section>
  );
}
