import { AboutLink } from "./about-link";
import { ThemeToggle } from "./theme-toggle";

export const HeaderCorner = () => {
  return (
    <span className="flex h-fit items-center gap-4">
      <AboutLink />
      <ThemeToggle />
    </span>
  );
};
