import type { GetPostsQuery } from "generated/graphql";

import { BlogLink } from "@/components/blog-link";

export function BlogLinks({ posts }: { posts: GetPostsQuery["posts"] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogLink post={post} />
        </li>
      ))}
    </ul>
  );
}
