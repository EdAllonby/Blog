import { createRouter } from "./context";
import { gql, GraphQLClient } from "graphql-request";
import { GetPostsQuery } from "../../../generated/graphql";

export const postRouter = createRouter().query("all", {
  async resolve() {
    const response = await getAllPostsForHome(false);
    return response;
  },
});

async function getAllPostsForHome(preview: boolean) {
  const query = gql`
    query GetPosts($preview: Boolean) {
      postCollection(preview: $preview) {
        items {
          slug
        }
      }
    }
  `;

  const client = new GraphQLClient(process.env.CONTENTFUL_SCHEMA_URL ?? "", {
    headers: {
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
  });

  const response = await client.request<GetPostsQuery>(query);
  return response?.postCollection?.items;
}
