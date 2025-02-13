"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import '../styles/docs.css';

const ThemeToggle = ({ large }: { large?: boolean; }) => {
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
        className="theme-toggle-large-button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? (
          <IconSun width={20} height={20} strokeWidth={1} />
        ) : (
          <IconMoon width={20} height={20} strokeWidth={1} />
        )}
        <span className="theme-toggle-large-label">{modeLabel}</span>
      </button>
    );
  }

  return (
    <button
      className={
        isDark
          ? "theme-toggle-small-button-dark"
          : "theme-toggle-small-button-light"
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
