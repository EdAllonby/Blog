import { Dayjs } from "dayjs";

export const BlogDate = ({ date }: { date: Dayjs }) => {
  return (
    <p className="italic text-slate-500 dark:text-zinc-400">
      {date.format("D MMMM YYYY")}
    </p>
  );
};
