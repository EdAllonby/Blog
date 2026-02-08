import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AboutLink() {
  return (
    <Button asChild className="text-base font-normal" variant="link">
      <Link href="/about">About</Link>
    </Button>
  );
}
