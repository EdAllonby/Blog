import { t } from "../trpc";
import { pageRouter } from "./page";
import { postRouter } from "./post";

export const appRouter = t.router({
  post: postRouter,
  page: pageRouter,
});

export type AppRouter = typeof appRouter;
