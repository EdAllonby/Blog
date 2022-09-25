import { z } from "zod";
import { getAllPostsForHome, getPostBySlug } from "../../api/post";
import { t } from "../trpc";

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
      return await getPostBySlug(input.slug);
    }),
});
