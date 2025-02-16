"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import "../styles/docs.css";

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
        className="flex items-center gap-2 px-4 py-2 rounded-full text-black bg-transparent border-0 cursor-pointer transition-all duration-200 ease-in-out dark:text-white"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? (
          <IconSun width={20} height={20} strokeWidth={1} />
        ) : (
          <IconMoon width={20} height={20} strokeWidth={1} />
        )}
        <span className="text-sm font-medium">{modeLabel}</span>
      </button>
    );
  }

  return (
    <button
      className={
        isDark
          ? "flex justify-center items-center p-2 rounded bg-transparent border-0 cursor-pointer transition-all duration-200 ease-in hover:bg-[rgba(240,240,240,0.1)]"
          : "flex justify-center items-center p-2 rounded bg-transparent border-0 cursor-pointer transition-all duration-200 ease-in hover:bg-[rgba(0,0,0,0.1)]"
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
