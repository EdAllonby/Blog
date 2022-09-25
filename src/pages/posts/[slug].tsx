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
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";

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
    revalidate: 1,
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
  const postQuery = trpc.post.bySlug.useQuery({ slug });

  const { data } = postQuery;

  if (!data) {
    return null;
  }

  const headTitle = `Ed Allonby - ${data.title}`;
  console.log(data.mdxSource);
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <main className="container mx-auto flex flex-col justify-center p-4">
        <Link href="/">
          <a className="self-start text-3xl font-extrabold leading-normal text-gray-700 hover:underline md:text-4xl">
            Ed Allonby
          </a>
        </Link>
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
