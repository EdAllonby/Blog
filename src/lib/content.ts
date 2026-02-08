import "server-only";

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import type { ComponentType } from "react";

type PostMetadata = {
  title: string;
  date: string;
};

type AboutMetadata = {
  title: string;
};

type PostModule = {
  default: ComponentType;
  metadata?: Partial<PostMetadata>;
};

type AboutModule = {
  default: ComponentType;
  metadata?: Partial<AboutMetadata>;
};

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
};

export type PostPageData = PostSummary & {
  Content: ComponentType;
};

export type AboutPageData = {
  title: string;
  Content: ComponentType;
};

const postsDirectory = join(process.cwd(), "docs", "posts");
const draftDirectoryPrefix = "draft/";

function hasValidPostMetadata(
  metadata: PostModule["metadata"],
): metadata is PostMetadata {
  return (
    typeof metadata?.title === "string" && typeof metadata?.date === "string"
  );
}

async function getPostSlugsFromDirectory() {
  const entries = await readdir(postsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

async function importPostModule(slug: string): Promise<PostModule> {
  return (await import(`../../docs/posts/${slug}.mdx`)) as PostModule;
}

export async function getAllPostsForHome(): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");

  const slugs = await getPostSlugsFromDirectory();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const postModule = await importPostModule(slug);

      if (!hasValidPostMetadata(postModule.metadata)) {
        throw new Error(`Invalid post metadata in docs/posts/${slug}.mdx`);
      }

      return {
        slug,
        date: postModule.metadata.date,
        title: postModule.metadata.title,
      };
    }),
  );

  return posts
    .filter((post) => !post.slug.startsWith(draftDirectoryPrefix))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAllSlugs() {
  "use cache";
  cacheLife("hours");

  const slugs = await getPostSlugsFromDirectory();

  return slugs.map((slug) => ({ slug }));
}

export async function getPostBySlug(
  slug: string,
): Promise<PostPageData | null> {
  const posts = await getAllPostsForHome();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return null;
  }

  const postModule = await importPostModule(slug);

  if (!hasValidPostMetadata(postModule.metadata)) {
    throw new Error(`Invalid post metadata in docs/posts/${slug}.mdx`);
  }

  return {
    slug: post.slug,
    date: post.date,
    title: post.title,
    Content: postModule.default,
  };
}

export async function getAboutPage(): Promise<AboutPageData> {
  const aboutModule = (await import("../../docs/about.mdx")) as AboutModule;

  return {
    title:
      typeof aboutModule.metadata?.title === "string"
        ? aboutModule.metadata.title
        : "About",
    Content: aboutModule.default,
  };
}
