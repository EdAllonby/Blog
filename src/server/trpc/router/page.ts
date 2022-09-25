import { getAboutPage } from "src/server/api/page";
import { serialize } from "next-mdx-remote/serialize";
import { t } from "../trpc";

export const pageRouter = t.router({
  about: t.procedure.query(async () => {
    const data = await getAboutPage();
    if (!data) {
      return null;
    }

    const mdxSource = await serialize(data?.content.markdown);
    return { ...data, mdxSource };
  }),
});
