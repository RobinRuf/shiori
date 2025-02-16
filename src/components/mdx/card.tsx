import React from "react";
import Link from "next/link";

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
    <Link
      key={path}
      href={`/docs/${path}`}
      className="flex flex-col h-[200px] w-[250px] border border-gray-300 rounded-lg shadow-sm bg-[var(--color-sitebg)] p-4 my-4 mx-auto transition-all duration-200 ease-in-out md:h-[150px] md:w-[400px] hover:shadow-lg hover:border-[var(--color-primary)]"
    >
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-[var(--color-primary)]">
          {title}
        </h4>
        <p className="text-sm text-gray-500 mt-1">{truncatedExcerpt}</p>
      </div>
    </Link>
  );
};

export default Card;
