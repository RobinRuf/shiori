import Image, { StaticImageData } from "next/image";
import Search from "./search";
import Link from "next/link";
import { useTheme } from "next-themes";

import { GithubLightmode } from "../icons";
import { GithubDarkmode } from "../icons";
import ThemeToggle from "./theme-toggle";

export interface NavbarProps {
  logo?: string | StaticImageData;
  navItems?: [string, string][];
  githubLink?: string;
}

/**
 * Renders the navigation bar for the documentation site.
 *
 * This component displays:
 * - An optional logo on the left. If no logo is provided, it renders a fallback text ("Shiori").
 * - A list of navigation items as links.
 * - A search component for quick documentation lookup.
 * - A GitHub link (if provided) that displays a theme-dependent GitHub icon.
 * - A theme toggle button to switch between light and dark modes.
 *
 * The component uses the `useTheme` hook from `next-themes` to determine the current theme and
 * conditionally renders the appropriate GitHub icon (either `GithubLightmode` or `GithubDarkmode`).
 *
 * @param logo - An optional logo image. If provided, it is rendered using Next.js' Image component.
 * @param navItems - An array of navigation items, where each item is a tuple with the label and the URL.
 * @param githubLink - An optional URL for the GitHub repository. If provided, a theme-dependent GitHub icon is rendered as a link.
 * @returns The rendered Navbar component.
 */
export function Navbar({ logo, navItems, githubLink }: NavbarProps) {
  const { theme } = useTheme();
  const GithubLogo = theme === "light" ? GithubLightmode : GithubDarkmode;

  return (
    <div className="sh:w-full sh:flex sh:justify-center sh:px-6 sh:z-50">
      <div className="sh:fixed sh:top-3 sh:w-full sh:flex sh:justify-center sh:px-6">
        <div className="sh:w-full sh:max-w-screen-xl sh:bg-accent sh:rounded-lg sh:h-14 sh:flex sh:items-center sh:justify-between sh:px-2 sh:shadow">
          <div className="sh:flex sh:items-center">
            {logo ? <Image src={logo} height={40} alt="Logo" /> : <b>Shiori</b>}
          </div>
          <div className="sh:flex sh:items-center sh:bg-transparent sh:gap-4">
            {navItems && navItems.length > 0 && (
              <div className="sh:flex sh:items-center sh:gap-4">
                {navItems.map(([label, link], index) => (
                  <Link
                    key={index}
                    href={link}
                    className="sh:font-light sh:cursor-pointer sh:transition-opacity sh:duration-200 sh:ease-out sh:mr-4 sh:no-underline sh:text-inherit sh:hover:opacity-80"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
            <Search />
            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                className="sh:flex sh:justify-center sh:items-center sh:h-7 sh:w-7"
              >
                <GithubLogo />
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
