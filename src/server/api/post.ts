import { gql } from "graphql-request";
import {
  GetPostBySlugQuery,
  GetPostSlugsQuery,
  GetPostsQuery,
} from "../../../generated/graphql";
import { request } from "./client";

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

  return (await request<GetPostsQuery>(query)).posts;
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

  return (await request<GetPostBySlugQuery>(query, { slug })).post;
}

export async function getAllSlugs() {
  const query = gql`
    query GetPostSlugs {
      posts {
        slug
      }
    }
  `;

  return (await request<GetPostSlugsQuery>(query)).posts;
}
