import Link from "next/link";

import { Button } from "@/components/ui/button";
import { constants } from "@/utils/constants";
import { HeaderCorner } from "./header-corner";

export function Header() {
  return (
    <header className="flex justify-between">
      <Button
        asChild
        className="text-3xl font-extrabold leading-normal md:text-4xl"
        variant="link"
      >
        <Link href="/">{constants.websiteName}</Link>
      </Button>
      <HeaderCorner />
    </header>
  );
}
