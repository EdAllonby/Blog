import { createProxySSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { appRouter } from "../../server/trpc/router";
import superjson from "superjson";
import { trpc } from "../../utils/trpc";
import { getAllSlugs } from "../../server/trpc/router/post";

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const slug = context.params?.slug as string;

  await ssg.post.bySlug.fetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("getting slugs");
  const posts = await getAllSlugs();

  console.log(posts);
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: "blocking",
  };
};

export default function PostViewPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { slug } = props;
  const postQuery = trpc.post.bySlug.useQuery({ slug });
  if (postQuery.status !== "success") {
    // won't happen since we're using `fallback: "blocking"`
    return <>Loading...</>;
  }

  const { data } = postQuery;

  return (
    <>
      <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
        {data?.title}
      </h1>
    </>
  );
}
