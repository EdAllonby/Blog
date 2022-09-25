import { BlogLinks } from "@/components/blog-links";
import { GetStaticProps, NextPage } from "next";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { appRouter } from "../server/trpc/router";
import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import { Title } from "@/components/title";

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.post.all.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60,
  };
};

const Home: NextPage = () => {
  const allPosts = trpc.post.all.useQuery();

  return (
    <>
      <Head>
        <title>Ed Allonby</title>
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <Title />
        <BlogLinks posts={allPosts.data} />
      </main>
    </>
  );
};

export default Home;
