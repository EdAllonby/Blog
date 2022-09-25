import { createProxySSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { appRouter } from "../../server/trpc/router";
import superjson from "superjson";
import { trpc } from "../../utils/trpc";
import { getAllSlugs } from "../../server/api/post";
import { BlogDate } from "@/components/blog-date";
import dayjs from "dayjs";
import { MDXRemote } from "next-mdx-remote";
import { Header } from "@/components/header";

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const slug = context.params?.slug as string;

  await ssg.post.bySlug.fetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 60,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllSlugs();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: "blocking",
  };
};

export default function PostViewPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { slug } = props;
  const { data } = trpc.post.bySlug.useQuery({ slug });

  if (!data) {
    return null;
  }

  const headTitle = `Ed Allonby - ${data.title}`;
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <main className="container mx-auto flex flex-col justify-center p-4">
        <Header />
        <div className="mx-auto">
          <h1 className="text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {data.title}
          </h1>
          <div className="flex justify-center">
            <BlogDate date={dayjs(data.date)} />
          </div>
          <article className="prose mx-auto mt-8 text-gray-700 prose-headings:text-gray-700 lg:prose-xl">
            <MDXRemote {...data.mdxSource} />
          </article>
        </div>
      </main>
    </>
  );
}
