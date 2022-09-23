import { createRouter } from "./context";
import { gql, GraphQLClient } from "graphql-request";
import { env } from "../../env/server.mjs";
import { z } from "zod";
import {
  GetPostBySlugQuery,
  GetPostSlugsQuery,
  GetPostsQuery,
} from "../../../generated/graphql";

export const postRouter = createRouter()
  .query("all", {
    async resolve() {
      return await getAllPostsForHome();
    },
  })
  .query("bySlug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      return await getPostBySlug(input.slug);
    },
  });

async function getAllPostsForHome() {
  const query = gql`
    query GetPosts {
      posts {
        slug
        title
      }
    }
  `;

  const client = new GraphQLClient(env.CMS_SCHEMA_URL);
  return (await client.request<GetPostsQuery>(query)).posts;
}

async function getPostBySlug(slug: string) {
  const query = gql`
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        slug
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
