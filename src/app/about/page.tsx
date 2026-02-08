import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Article } from "@/components/article";
import { Header } from "@/components/header";
import { getAboutPage } from "@/server/api/page";
import { constants } from "@/utils/constants";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();

  if (!data) {
    return {
      title: `${constants.websiteName} - About`,
    };
  }

  return {
    title: `${constants.websiteName} - ${data.title}`,
  };
}

export default async function AboutPage() {
  const data = await getAboutPage();

  if (!data) {
    notFound();
  }

  return (
    <main className="container mx-auto flex flex-col p-4">
      <Header />
      <div className="mx-auto">
        <h1 className="text-center text-5xl font-extrabold leading-normal md:text-[5rem]">
          {data.title}
        </h1>
        <Article source={data.content.markdown} />
      </div>
    </main>
  );
}
