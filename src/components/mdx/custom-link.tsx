import React from "react";
import ExternalLink from "./external-link";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, ...rest }) => {
  if (href.startsWith("https")) {
    return (
      <ExternalLink href={href} {...rest}>
        {children}
      </ExternalLink>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default CustomLink;
