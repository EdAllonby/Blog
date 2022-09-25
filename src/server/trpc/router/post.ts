import { z } from "zod";
import { getAllPostsForHome, getPostBySlug } from "../../api/post";
import { t } from "../trpc";
import { serialize } from "next-mdx-remote/serialize";

export const postRouter = t.router({
  all: t.procedure.query(async () => {
    return await getAllPostsForHome();
  }),
  bySlug: t.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await getPostBySlug(input.slug);
      if (!data) {
        return null;
      }

      const mdxSource = await serialize(data?.content.markdown);
      return { ...data, mdxSource };
    }),
});
