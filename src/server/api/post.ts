import { gql } from "graphql-request";
import { cacheLife } from "next/cache";

import type {
  GetPostBySlugQuery,
  GetPostSlugsQuery,
  GetPostsQuery,
} from "generated/graphql";

import { request } from "./client";

const getPostsQuery = gql`
  query GetPosts {
    posts(orderBy: date_DESC) {
      slug
      title
      date
    }
  }
`;

const getPostBySlugQuery = gql`
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

const getPostSlugsQuery = gql`
  query GetPostSlugs {
    posts {
      slug
    }
  }
`;

export async function getAllPostsForHome() {
  "use cache";
  cacheLife("hours");

  return (await request<GetPostsQuery>(getPostsQuery)).posts;
}

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("hours");

  return (
    await request<GetPostBySlugQuery, { slug: string }>(getPostBySlugQuery, {
      slug,
    })
  ).post;
}

export async function getAllSlugs() {
  "use cache";
  cacheLife("hours");

  return (await request<GetPostSlugsQuery>(getPostSlugsQuery)).posts;
}
