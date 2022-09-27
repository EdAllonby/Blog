import { BlogLinks } from "@/components/blog-links";
import { GetStaticProps, NextPage } from "next";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { appRouter } from "../server/trpc/router";
import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import { Title } from "@/components/title";
import { AboutLink } from "@/components/about-link";
import { constants } from "src/utils/constants";
import { HeaderCorner } from "@/components/header-corner";

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
        <title>{constants.websiteName}</title>
      </Head>
      <main className="container mx-auto flex flex-col p-4">
        <div className="self-end">
          <HeaderCorner />
        </div>
        <div className="flex max-w-lg flex-col self-center">
          <Title />
          <div className="self-start">
            <BlogLinks posts={allPosts.data} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
