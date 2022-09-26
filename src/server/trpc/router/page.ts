import { getAboutPage } from "src/server/api/page";
import { t } from "../trpc";
import { enhanceWithMdx } from "src/utils/mdx";

export const pageRouter = t.router({
  about: t.procedure.query(async () => {
    const data = await getAboutPage();
    if (!data) {
      throw `About page not found`;
    }

    return enhanceWithMdx(data);
  }),
});
