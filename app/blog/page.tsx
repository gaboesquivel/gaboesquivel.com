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
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">Gabo's Blog</h1>
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
              <li className="tracking-tight text-neutral-90 dark:text-neutral-100 hover:text-accent">
               {post.title}  <span className='text-xs text-neutral-400'>| {new Date(post.publishedAt).toLocaleString('en-US', { year: 'numeric'})}</span>
              </li>

            </ul>
          </Link>
        ))}
    </section>
  );
}
