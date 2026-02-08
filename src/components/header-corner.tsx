import { AboutLink } from "@/components/about-link";
import { ThemeToggle } from "@/components/theme-toggle";

export function HeaderCorner() {
  return (
    <div className="flex h-fit items-center gap-4">
      <AboutLink />
      <ThemeToggle />
    </div>
  );
}
