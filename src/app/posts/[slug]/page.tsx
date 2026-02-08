import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Article } from "@/components/article";
import { BlogDate } from "@/components/blog-date";
import { Header } from "@/components/header";
import { getAllSlugs, getPostBySlug } from "@/lib/content";
import { constants } from "@/utils/constants";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllSlugs();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: constants.websiteName,
    };
  }

  return {
    title: `${constants.websiteName} - ${post.title}`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }
  const Content = post.Content;

  return (
    <main className="container mx-auto flex flex-col justify-center p-4">
      <Header />
      <div className="mx-auto">
        <h1 className="text-center text-5xl leading-normal font-extrabold md:text-[5rem]">
          {post.title}
        </h1>
        <div className="flex items-center justify-center">
          <BlogDate date={dayjs(post.date)} />
        </div>
        <Article>
          <Content />
        </Article>
      </div>
    </main>
  );
}
