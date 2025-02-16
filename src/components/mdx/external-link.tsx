import React from "react";
import { IconExternalLink } from "@tabler/icons-react";
import "../../styles/docs.css";

export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Renders an external link that opens in a new browser tab.
 *
 * @param href - The URL to which the link should navigate.
 * @param children - The content to display inside the link.
 * @returns The rendered ExternalLink component.
 */
const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-primary)] inline-flex items-center gap-1 no-underline transition-opacity duration-200 ease-in-out hover:opacity-90"
    >
      {children}
      <IconExternalLink size={16} />
    </a>
  );
};

export default ExternalLink;
