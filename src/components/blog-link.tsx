import { Dayjs } from "dayjs";
import Link from "next/link";
import { BlogDate } from "./blog-date";

export const BlogLink = ({
  slug,
  title,
  publishDate,
}: {
  slug: string;
  title: string;
  publishDate: Dayjs;
}) => {
  return (
    <>
      <Link href={`posts/${slug}`}>
        <a className="hover:underline">
          <span className="text-xl text-gray-700">{title}</span>{" "}
        </a>
      </Link>
      <BlogDate date={publishDate} />
    </>
  );
};
