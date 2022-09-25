import { gql, GraphQLClient } from "graphql-request";
import { env } from "../../env/server.mjs";
import {
  GetPostBySlugQuery,
  GetPostSlugsQuery,
  GetPostsQuery,
} from "../../../generated/graphql";

export async function getAllPostsForHome() {
  const query = gql`
    query GetPosts {
      posts(orderBy: date_DESC) {
        slug
        title
        date
      }
    }
  `;

  const client = new GraphQLClient(env.CMS_SCHEMA_URL);
  return (await client.request<GetPostsQuery>(query)).posts;
}

export async function getPostBySlug(slug: string) {
  const query = gql`
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        slug
        title
        date
        content {
          markdown
        }
        tags
      }
    }
  `;

  const client = new GraphQLClient(env.CMS_SCHEMA_URL);
  return (await client.request<GetPostBySlugQuery>(query, { slug })).post;
}

export async function getAllSlugs() {
  const query = gql`
    query GetPostSlugs {
      posts {
        slug
      }
    }
  `;

  const client = new GraphQLClient(env.CMS_SCHEMA_URL);
  return (await client.request<GetPostSlugsQuery>(query)).posts;
}
