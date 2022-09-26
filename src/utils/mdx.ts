import { serialize } from "next-mdx-remote/serialize";

export const enhanceWithMdx = async <
  T extends { content: { markdown: string } }
>(
  data: T
) => {
  const mdxSource = await serialize(data.content.markdown);

  return {
    ...data,
    mdxSource: mdxSource,
  };
};
