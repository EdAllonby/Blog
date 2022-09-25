import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export const Article = ({
  source,
}: {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}) => {
  return (
    <article className="prose prose-xl mx-auto mt-8 text-gray-700 prose-headings:text-gray-700">
      <MDXRemote {...source} />
    </article>
  );
};
