import Link from "next/link";
import { formatDate } from "lib/utils";

export function PostCard({
	post,
}: { post: { slug: string; title: string; publishedAt: string } }) {
	return (
		<Link
			key={post.slug}
			href={`/blog/${post.slug}`}
			className="block p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
		>
			<h3 className="font-medium mb-1">{post.title}</h3>
			{post.publishedAt && (
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.publishedAt)}
				</p>
			)}
		</Link>
	);
}
