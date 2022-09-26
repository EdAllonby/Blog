import Link from "next/link";

export const AboutLink = () => {
  return (
    <Link href="/about">
      <a className="hover:underline">About</a>
    </Link>
  );
};
