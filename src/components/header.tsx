import Link from "next/link";
import { constants } from "src/utils/constants";
import { AboutLink } from "./about-link";

export const Header = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <a className="self-start text-3xl font-extrabold leading-normal text-gray-700 hover:underline md:text-4xl">
          {constants.websiteName}
        </a>
      </Link>
      <AboutLink />
    </header>
  );
};
