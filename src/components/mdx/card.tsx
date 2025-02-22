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
      className="sh:flex sh:flex-col sh:h-[200px] sh:w-[250px] sh:border sh:border-gray-300 sh:rounded-lg sh:shadow-sm sh:bg-sitebg sh:p-4 sh:my-4 sh:mx-auto sh:transition-all sh:duration-200 sh:ease-in-out sh:md:h-[150px] sh:md:w-[400px] sh:hover:shadow-lg sh:hover:border-primary"
    >
      <div className="sh:flex-1">
        <h4 className="sh:text-lg sh:font-semibold sh:text-primary">{title}</h4>
        <p className="sh:text-sm sh:text-gray-500 sh:mt-1">
          {truncatedExcerpt}
        </p>
      </div>
    </Link>
  );
};

export default Card;
