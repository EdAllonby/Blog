import { BlogLinks } from "@/components/blog-links";
import { HeaderCorner } from "@/components/header-corner";
import { Title } from "@/components/title";
import { getAllPostsForHome } from "@/server/api/post";

export default async function HomePage() {
  const posts = await getAllPostsForHome();

  return (
    <main className="container mx-auto flex flex-col p-4">
      <div className="self-end">
        <HeaderCorner />
      </div>
      <div className="flex max-w-lg flex-col self-center">
        <Title />
        <div className="self-start">
          <BlogLinks posts={posts} />
        </div>
      </div>
    </main>
  );
}
