import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode } from "react";

const HrefBlankTarget = ({
  children,
  href,
}: {
  children?: ReactNode;
  href?: string;
}) => {
  return (
    <a href={href} title={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export const Article = ({
  source,
}: {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}) => {
  const components = {
    a: HrefBlankTarget,
  };

  return (
    <article className="prose prose-xl mx-auto mt-8 prose-headings:text-gray-700 prose-a:text-gray-700">
      <MDXRemote {...source} components={components} />
    </article>
  );
};
