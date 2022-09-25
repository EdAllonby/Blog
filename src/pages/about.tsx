import { Header } from "@/components/header";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import { GetStaticProps, NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { createContext } from "src/server/trpc/context";
import { appRouter } from "src/server/trpc/router";
import { trpc } from "src/utils/trpc";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.page.about.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60,
  };
};

const About: NextPage = () => {
  const { data } = trpc.page.about.useQuery();

  if (!data) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Ed Allonby - About</title>
      </Head>
      <main className="container mx-auto flex flex-col p-4">
        <Header />
        <div className="mx-auto">
          <h1 className="text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {data.title}
          </h1>

          <article className="prose mx-auto mt-8 text-gray-700 prose-headings:text-gray-700 lg:prose-xl">
            <MDXRemote {...data.mdxSource} />
          </article>
        </div>
      </main>
    </>
  );
};

export default About;
