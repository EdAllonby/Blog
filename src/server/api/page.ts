import { gql } from "graphql-request";
import { GetAboutPageQuery } from "../../../generated/graphql";
import { request } from "./client";

export async function getAboutPage() {
  const query = gql`
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

  return (await request<GetAboutPageQuery>(query)).page;
}
