import type { GetPostsQuery } from "generated/graphql";
import Link from "next/link";

import { BlogDate } from "@/components/blog-date";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PostLink = GetPostsQuery["posts"][number];

export function BlogLink({ post }: { post: PostLink }) {
  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <Button asChild className="text-xl font-normal" variant="link">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </Button>
        <BlogDate date={post.date} />
      </CardContent>
    </Card>
  );
}
