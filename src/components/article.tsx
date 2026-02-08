import type { ReactNode } from "react";

export function Article({ children }: { children: ReactNode }) {
  return (
    <article className="mdx-article mx-auto mt-8 w-full max-w-3xl text-[1.25rem] leading-[1.8] text-gray-700 dark:text-gray-200">
      {children}
    </article>
  );
}
