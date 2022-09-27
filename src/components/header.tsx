import Link from "next/link";
import { constants } from "src/utils/constants";
import { HeaderCorner } from "./header-corner";

export const Header = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <a className="self-start text-3xl font-extrabold leading-normal hover:underline md:text-4xl">
          {constants.websiteName}
        </a>
      </Link>
      <HeaderCorner />
    </header>
  );
};
