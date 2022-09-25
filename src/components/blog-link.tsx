import { Dayjs } from "dayjs";
import Link from "next/link";

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
          <span className="text-xl">{title}</span>{" "}
        </a>
      </Link>
      <p className="italic text-slate-500">
        {publishDate.format("D MMMM YYYY")}
      </p>
    </>
  );
};
