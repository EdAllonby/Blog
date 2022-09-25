import { gql, GraphQLClient } from "graphql-request";
import { env } from "../../../env/server.mjs";
import { z } from "zod";
import {
  GetPostBySlugQuery,
  GetPostSlugsQuery,
  GetPostsQuery,
} from "../../../../generated/graphql";
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
