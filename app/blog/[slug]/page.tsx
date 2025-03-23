import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Mdx } from 'components/mdx';
import { allBlogs } from 'contentlayer/generated';
import Balancer from 'react-wrap-balancer';
import { formatDate } from 'lib/utils';
import {PostCard} from '../../../components/blog/post-card';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) redirect('/blog');

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://gaboesquivel.com${image}`
    : `https://gaboesquivel.com/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://gaboesquivel.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

function getLatestPosts(currentPost, limit = 4) {
  // Filter out the current post and get only published posts
  const otherPosts = allBlogs.filter(
    (post) => post.slug !== currentPost.slug
  );

  // Sort by date descending to get the most recent posts
  const sortedPosts = [...otherPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Take only the specified number of posts
  return sortedPosts.slice(0, limit);
}

export default async function Blog({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const latestPosts = getLatestPosts(post);

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script>
      <h1 className="font-bold text-2xl tracking-tighter max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <Mdx code={post.body.code} />
      
      {latestPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-bold text-xl mb-4">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestPosts.map((post) => (
             <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

