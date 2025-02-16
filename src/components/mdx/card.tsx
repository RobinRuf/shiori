import React from "react";
import Link from "next/link";
import "../../styles/docs.css";

export interface MetaData {
  title?: string;
  [key: string]: string | undefined;
}

export interface CardProps {
  path: string;
  excerpt: string;
  meta: MetaData;
}

/**
 * Renders a documentation card that links to a specific documentation page.
 *
 * @param path - The relative path identifier for the documentation page.
 * @param excerpt - A brief excerpt from the documentation content. If the excerpt is longer than 200 characters, it will be truncated.
 * @param meta - An object containing metadata for the documentation, where keys are paths and values are titles.
 * @returns The rendered Card component as a clickable link, or null if no title is found for the provided path.
 */
const Card: React.FC<CardProps> = ({ path, excerpt, meta }) => {
  const title = meta[path];

  if (!title) {
    console.warn(`Path "${path}" not found in meta.`);
    return null;
  }

  const truncatedExcerpt =
    excerpt.length > 200 ? `${excerpt.slice(0, 200)}...` : excerpt;

  return (
    <Link key={path} href={`/docs/${path}`} className="mdx-card">
      <div className="mdx-card-content">
        <h4 className="mdx-card-title">{title}</h4>
        <p className="mdx-card-excerpt">{truncatedExcerpt}</p>
      </div>
    </Link>
  );
};

export default Card;
