import Image, { StaticImageData } from "next/image";
import Search from "./search";
import Link from "next/link";
import { useTheme } from "next-themes";
import '../styles/docs.css';

import { GithubLightmode } from "../icons";
import { GithubDarkmode } from "../icons";
import ThemeToggle from "./theme-toggle";

export interface NavbarProps {
  logo?: string | StaticImageData
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
    <div className="shiori-navbar-wrapper">
      <div className="shiori-navbar-fixed">
        <div className="shiori-navbar-container">
          <div className="shiori-navbar-left">
            {logo ? (
              <Image src={logo} height={40} alt="Logo" />
            ) : (
                <b>Shiori</b>
              )}
          </div>
          <div className="shiori-navbar-right">
            {navItems && navItems.length > 0 && (
              <div className="shiori-navbar-navitems">
                {navItems.map(([label, link], index) => (
                  <Link key={index} href={link} className="shiori-navbar-navitem">
                    {label}
                  </Link>
                ))}
              </div>
            )}
            <Search />
            { githubLink && (
              <Link href={githubLink} target="_blank" className="shiori-navbar-github">
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
