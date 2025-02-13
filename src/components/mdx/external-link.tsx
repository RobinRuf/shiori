import React from "react";
import { IconExternalLink } from "@tabler/icons-react";
import '../../styles/docs.css';

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
      className="mdx-external-link"
    >
      {children}
      <IconExternalLink size={16} className="mdx-external-link-icon" />
    </a>
  );
};

export default ExternalLink;
