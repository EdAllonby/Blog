import dayjs, { type Dayjs } from "dayjs";

export function BlogDate({ date }: { date: Dayjs | string }) {
  const publishDate = typeof date === "string" ? dayjs(date) : date;

  return (
    <p className="italic text-slate-500 dark:text-zinc-400">
      {publishDate.format("D MMMM YYYY")}
    </p>
  );
}
