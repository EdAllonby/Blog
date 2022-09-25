import dayjs from "dayjs";
import { GetPostsQuery } from "generated/graphql";
import React from "react";
import { BlogLink } from "./blog-link";

export function BlogLinks({ posts }: { posts?: GetPostsQuery["posts"] }) {
  return (
    <ul className="flex flex-col gap-4">
      {posts?.map((post) => (
        <li key={post.slug}>
          <BlogLink
            slug={post.slug}
            title={post.title}
            publishDate={dayjs(post.date)}
          />
        </li>
      ))}
    </ul>
  );
}
