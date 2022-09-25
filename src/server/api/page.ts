import { gql, GraphQLClient } from "graphql-request";
import { env } from "../../env/server.mjs";
import { GetAboutPageQuery } from "../../../generated/graphql";

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

  const client = new GraphQLClient(env.CMS_SCHEMA_URL);
  return (await client.request<GetAboutPageQuery>(query)).page;
}
