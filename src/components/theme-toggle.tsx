import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonButton } from "./moon-button";
import { SunButton } from "./sun-button";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SunButton />;
  }

  if (theme === "light") {
    return <SunButton onClick={() => setTheme("dark")} />;
  }

  return <MoonButton onClick={() => setTheme("light")} />;
};
