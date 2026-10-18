import { BlogPostChips } from "components/blog/blog-post-chips";
import { PostGrid } from "components/blog/posts-grid";
import { Mdx } from "components/mdx";
import { indexTitle } from "components/shared/page-layout";
import { allBlogs } from "lib/blog";
import { blogJsonLd } from "lib/blog-json-ld";
import { getRelatedPosts } from "lib/blog-related";
import { isArchivePost } from "lib/blog-taxonomy";
import { metadataWithMarkdownAlternate } from "lib/page-metadata";
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
    image,
    slug: postSlug,
  } = post;
  const ogImage = image ? `https://gaboesquivel.com${image}` : undefined;

  return metadataWithMarkdownAlternate({
    metadata: {
      description,
      openGraph: {
        description,
        publishedTime,
        title,
        type: "article",
        url: `https://gaboesquivel.com/blog/${postSlug}`,
        ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      },
      title,
      twitter: {
        card: "summary_large_image",
        description,
        title,
        ...(ogImage ? { images: [ogImage] } : {}),
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

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd(post)),
        }}
      />
      <h1 className={cn(indexTitle, "mb-2 text-balance")}>{post.title}</h1>
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
        <div className="[contain-intrinsic-size:auto_24rem] [content-visibility:auto]">
          <PostGrid posts={relatedPosts} title="Related writing" />
        </div>
      ) : null}
    </section>
  );
}
