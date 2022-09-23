import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Ed Allonby</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-light-yellow">
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            Ed Allonby
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
