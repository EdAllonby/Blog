import type { ReactNode } from "react";

export function Article({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto mt-8 w-full max-w-3xl text-[1.25rem] leading-[1.8] text-gray-700 dark:text-gray-200 [&_a]:text-gray-700 [&_a]:underline dark:[&_a]:text-gray-200 [&_h1]:my-8 [&_h1]:text-5xl [&_h1]:leading-normal [&_h1]:font-extrabold [&_h1]:text-gray-700 dark:[&_h1]:text-gray-200 [&_h2]:my-8 [&_h2]:text-5xl [&_h2]:leading-normal [&_h2]:font-extrabold [&_h2]:text-gray-700 dark:[&_h2]:text-gray-200 [&_h3]:my-6 [&_h3]:text-4xl [&_h3]:leading-normal [&_h3]:font-extrabold [&_ol]:my-8 [&_ol]:list-decimal [&_ol]:pl-8 [&_p]:my-8 [&_ul]:my-8 [&_ul]:list-disc [&_ul]:pl-8">
      {children}
    </article>
  );
}
