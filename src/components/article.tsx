import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode } from "react";

export const Article = ({
  source,
}: {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}) => {
  const components = {
    a: ({ children, href }: { children?: ReactNode; href?: string }) => {
      return (
        <a
          href={href}
          title={href}
          target="_blank"
          rel="noreferrer"
          className="text-gray-700 dark:text-gray-200"
        >
          {children}
        </a>
      );
    },
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-gray-700 dark:text-gray-200">{children}</h1>
    ),
  };

  return (
    <article className="prose prose-xl prose-stone mx-auto mt-8 dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </article>
  );
};
