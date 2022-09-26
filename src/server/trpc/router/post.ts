import { z } from "zod";
import { getAllPostsForHome, getPostBySlug } from "../../api/post";
import { t } from "../trpc";
import { enhanceWithMdx } from "src/utils/mdx";

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
        throw `Blog ${input.slug} not found`;
      }

      return await enhanceWithMdx(data);
    }),
});
