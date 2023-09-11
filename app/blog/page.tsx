import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">read my blog</h1>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col mb-4 space-y-1"
            href={`/blog/${post.slug}`}
          >
            <ul className="flex flex-col w-full">
              <li className="tracking-tight text-neutral-900 dark:text-neutral-100">
                {post.title}
              </li>

            </ul>
          </Link>
        ))}
    </section>
  );
}
