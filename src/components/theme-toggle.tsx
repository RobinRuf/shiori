"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeToggle = ({ large }: { large?: boolean }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";
  const modeLabel = isDark ? "Light Mode" : "Dark Mode";

  useEffect(() => {
    if (current) {
      document.documentElement.setAttribute("data-theme", current);
    }
  }, [current]);

  if (large) {
    return (
      <button
        className="sh:flex sh:items-center sh:gap-2 sh:px-4 sh:py-2 sh:rounded-full sh:text-black sh:bg-transparent sh:border-0 sh:cursor-pointer sh:transition-all sh:duration-200 sh:ease-in-out sh:dark:text-white"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? (
          <IconSun width={20} height={20} strokeWidth={1} />
        ) : (
          <IconMoon width={20} height={20} strokeWidth={1} />
        )}
        <span className="sh:text-sm sh:font-medium">{modeLabel}</span>
      </button>
    );
  }

  return (
    <button
      className={
        isDark
          ? "sh:flex sh:justify-center sh:items-center sh:p-2 sh:rounded sh:bg-transparent sh:border-0 sh:cursor-pointer sh:transition-all sh:duration-200 sh:ease-in sh:hover:bg-[rgba(240,240,240,0.1)]"
          : "sh:flex sh:justify-center sh:items-center sh:p-2 sh:rounded sh:bg-transparent sh:border-0 sh:cursor-pointer sh:transition-all sh:duration-200 sh:ease-in sh:hover:bg-[rgba(0,0,0,0.1)]"
      }
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <IconSun width={20} height={20} strokeWidth={1} />
      ) : (
        <IconMoon width={20} height={20} strokeWidth={1} />
      )}
    </button>
  );
};

export default ThemeToggle;
