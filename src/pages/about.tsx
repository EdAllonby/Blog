import { Article } from "@/components/article";
import { Header } from "@/components/header";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { createContext } from "src/server/trpc/context";
import { appRouter } from "src/server/trpc/router";
import { constants } from "src/utils/constants";
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

  const headTitle = `${constants.websiteName} - About`;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <main className="container mx-auto flex flex-col p-4">
        <Header />
        <div className="mx-auto">
          <h1 className="text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {data.title}
          </h1>
          <Article source={data.mdxSource} />
        </div>
      </main>
    </>
  );
};

export default About;
