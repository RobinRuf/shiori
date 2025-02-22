"use client";

import React from "react";
import { GeistSans } from "geist/font/sans";
import Sidebar from "../components/sidebar";
import Toc from "../components/toc";
import Breadcrumbs from "../components/breadcrumbs";
import { ThemeProvider } from "next-themes";
import AnchorLinkHandler from "../components/anchor-link-handler";
import Switcher from "../components/switcher";
import ClientWrapper from "../components/client-wrapper";
import "../docs.css";

const font = GeistSans;

export interface DocsLayoutProps {
  children?: React.ReactNode;
  navbar: React.ReactNode;
  meta: { title?: string; [key: string]: any };
}

const docsPath = "/docs";

/**
 * Renders the documentation layout for the site.
 *
 * This layout provides the full HTML structure by rendering the `<html>`, `<head>`, and `<body>` tags.
 * It sets up the overall theme using the ThemeProvider from next-themes and applies a custom font via GeistSans.
 * Additionally, it composes several components to form the documentation page structure:
 *
 * - **Navbar (passed as prop):** A custom navigation element rendered at the top.
 * - **Sidebar:** Displays a navigational sidebar (using the provided `docsBase` and `meta` props).
 * - **Breadcrumbs:** Renders the breadcrumb navigation based on the current page context.
 * - **Switcher:** Offers navigation options or settings related to the documentation.
 * - **Table of Contents (Toc):** Displays a table of contents for the documentation.
 * - **ClientWrapper & AnchorLinkHandler:** Wrap the content to ensure proper client-side behavior and handle anchor link clicks.
 *
 * @param navbar - The navigation bar element to display at the top of the layout.
 * @param meta - An object containing metadata for the documentation pages (e.g., page titles).
 *                        The keys in this object correspond to page identifiers.
 * @param docsBase - The base path for the documentation (e.g., "docs"). This value is used by child
 *                              components (such as Sidebar and Breadcrumbs) to resolve relative paths.
 *
 * @returns The complete documentation layout wrapped in the necessary HTML structure.
 */
export function DocsLayout({ children, navbar, meta }: DocsLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={font.className}>
        <ThemeProvider
          enableSystem={true}
          defaultTheme="system"
          disableTransitionOnChange={true}
        >
          <ClientWrapper>
            <AnchorLinkHandler />
            <div className="sh:flex sh:flex-col sh:w-full sh:max-w-7xl sh:mx-auto sh:px-4">
              {navbar && navbar}
              <div className="sh:flex sh:mt-20 sh:relative">
                {/* Sidebar */}
                <div className="sh:hidden sh:md:flex sh:w-64 sh:flex-shrink-0">
                  <div className="sh:fixed sh:top-20 sh:bottom-0 sh:overflow-y-auto sh:w-64">
                    <Sidebar docsBase={docsPath} meta={meta} />
                  </div>
                </div>
                <main className="sh:flex-1 sh:p-6">
                  <div className="sh:mb-4">
                    <Breadcrumbs docsBase={docsPath} meta={meta} />
                  </div>
                  <div className="docs">{children}</div>
                  <Switcher meta={meta} docsBase={docsPath} />
                </main>
                <div className="sh:hidden sh:lg:flex sh:w-64 sh:flex-shrink-0">
                  <div className="sh:fixed sh:top-20 sh:bottom-0 sh:w-64">
                    <Toc />
                  </div>
                </div>
              </div>
            </div>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
