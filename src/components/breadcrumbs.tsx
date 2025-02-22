import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";

export interface MetaData {
  title?: string;
  [key: string]: string | undefined;
}

interface BreadcrumbsProps {
  meta: MetaData;
  docsBase?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ meta, docsBase }) => {
  const base = docsBase || "/docs";
  const pathname = usePathname();

  const pathWithoutBase = pathname.replace(new RegExp(`^${base}/`), "");
  const pathSegments = pathWithoutBase.split("/");

  if (
    pathname === base ||
    (pathSegments.length === 1 && pathSegments[0] === "")
  ) {
    return null;
  }

  let breadcrumbSegments = pathSegments.map((segment, index) => {
    const currentPath = pathSegments.slice(0, index + 1).join("/");
    const label = meta[currentPath] || segment;
    return {
      path: `${base}/${currentPath}`,
      label,
    };
  });

  if (breadcrumbSegments.length < 3) {
    breadcrumbSegments = [
      { path: base, label: "Introduction" },
      ...breadcrumbSegments,
    ];
  }

  return (
    <nav className="sh:text-sm sh:flex sh:items-center sh:space-x-2">
      {breadcrumbSegments.map((segment, index) => {
        const isLast = index === breadcrumbSegments.length - 1;

        return (
          <React.Fragment key={segment.path}>
            {isLast ? (
              <span className="sh:font-semibold sh:opacity-100">
                {segment.label}
              </span>
            ) : (
              <Link
                href={segment.path}
                className="sh:hover:no-underline sh:cursor-pointer sh:text-content-transparent sh:hover:text-content sh:transition sh:duration-200 sh:ease-in-out"
              >
                {segment.label}
              </Link>
            )}
            {!isLast && <IconChevronRight size={16} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
