import Link from "next/link";

import { BlogDate } from "@/components/blog-date";
import type { PostSummary } from "@/lib/content";

export function BlogLink({ post }: { post: PostSummary }) {
  return (
    <div>
      <Link
        className="text-foreground text-xl font-normal underline-offset-4 hover:underline"
        href={`/posts/${post.slug}`}
      >
        {post.title}
      </Link>
      <BlogDate date={post.date} />
    </div>
  );
}
