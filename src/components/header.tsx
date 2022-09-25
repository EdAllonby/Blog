import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <a className="self-start text-3xl font-extrabold leading-normal text-gray-700 hover:underline md:text-4xl">
          Ed Allonby
        </a>
      </Link>
      <Link href="/about">
        <a className="text-gray-700 hover:underline">About</a>
      </Link>
    </header>
  );
};
