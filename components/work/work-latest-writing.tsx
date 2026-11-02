import { LatestPosts } from "components/blog/latest-posts";
import { sectionAction } from "components/shared/spacing";
import Link from "next/link";

export const WorkLatestWriting = () => (
  <LatestPosts
    limit={3}
    title="Writing"
    action={
      <Link href="/blog" className={sectionAction}>
        More writing
      </Link>
    }
  />
);
