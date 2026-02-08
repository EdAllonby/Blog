import { gql } from "graphql-request";
import { cacheLife } from "next/cache";

import type { GetAboutPageQuery } from "generated/graphql";

import { request } from "./client";

const getAboutPageQuery = gql`
  query GetAboutPage {
    page(where: { slug: "about" }) {
      title
      slug
      content {
        markdown
      }
    }
  }
`;

export async function getAboutPage() {
  "use cache";
  cacheLife("hours");

  return (await request<GetAboutPageQuery>(getAboutPageQuery)).page;
}
