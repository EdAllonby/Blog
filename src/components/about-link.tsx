import Link from "next/link";

export const AboutLink = () => {
  return (
    <Link href="/about">
      <a className="text-gray-700 hover:underline">About</a>
    </Link>
  );
};
