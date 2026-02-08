import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { type ComponentPropsWithoutRef } from "react";

const articleComponents = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (!href) {
      return (
        <a {...props} className="text-gray-700 underline dark:text-gray-200">
          {children}
        </a>
      );
    }

    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");

    if (isExternal) {
      return (
        <a
          className="text-gray-700 underline dark:text-gray-200"
          href={href}
          rel="noreferrer"
          target="_blank"
          title={href}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className="text-gray-700 underline dark:text-gray-200" href={href}>
        {children}
      </Link>
    );
  },
};

export function Article({ source }: { source: string }) {
  return (
    <article className="prose prose-xl prose-stone prose-headings:text-gray-700 prose-p:text-gray-700 mx-auto mt-8 dark:prose-headings:text-gray-200 dark:prose-invert dark:prose-p:text-gray-200">
      <MDXRemote components={articleComponents} source={source} />
    </article>
  );
}
