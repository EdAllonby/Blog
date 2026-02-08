import type { GetPostsQuery } from "generated/graphql";
import Link from "next/link";

import { BlogDate } from "@/components/blog-date";

type PostLink = GetPostsQuery["posts"][number];

export function BlogLink({ post }: { post: PostLink }) {
  return (
    <div>
      <Link
        className="text-xl font-normal text-foreground underline-offset-4 hover:underline"
        href={`/posts/${post.slug}`}
      >
        {post.title}
      </Link>
      <BlogDate date={post.date} />
    </div>
  );
}
