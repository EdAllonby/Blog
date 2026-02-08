import type { Metadata } from "next";

import { Article } from "@/components/article";
import { Header } from "@/components/header";
import { getAboutPage } from "@/lib/content";
import { constants } from "@/utils/constants";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();

  return {
    title: `${constants.websiteName} - ${data.title}`,
  };
}

export default async function AboutPage() {
  const data = await getAboutPage();
  const Content = data.Content;

  return (
    <main className="container mx-auto flex flex-col p-4">
      <Header />
      <div className="mx-auto">
        <h1 className="text-center text-5xl leading-normal font-extrabold md:text-[5rem]">
          {data.title}
        </h1>
        <Article>
          <Content />
        </Article>
      </div>
    </main>
  );
}
