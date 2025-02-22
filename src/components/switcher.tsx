import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MetaData {
  title?: string;
  [key: string]: string | undefined;
}

interface SwitcherProps {
  meta: MetaData;
  docsBase?: string;
}

const Switcher: React.FC<SwitcherProps> = ({ meta, docsBase }) => {
  const pathname = usePathname();

  let currentPath = pathname;
  if (docsBase && pathname.startsWith(docsBase)) {
    currentPath = pathname.slice(docsBase.length);
  }
  currentPath = currentPath.replace(/^\/+|\/+$/g, "");

  const paths = Object.keys(meta).filter((key) => key !== "title");
  const currentIndex = paths.indexOf(currentPath);

  const prevDoc = currentIndex > 0 ? paths[currentIndex - 1] : null;
  const nextDoc =
    currentIndex >= 0 && currentIndex < paths.length - 1
      ? paths[currentIndex + 1]
      : null;

  return (
    <div className="sh:flex sh:justify-between sh:items-center sh:mt-10 sh:pt-6 sh:border-t sh:border-content-transparent">
      {prevDoc ? (
        <Link
          href={`${docsBase ? docsBase : "/docs"}/${prevDoc}`}
          className="sh:flex sh:items-center sh:gap-2 sh:transition sh:duration-200 sh:ease-in-out sh:no-underline sh:hover:text-primary"
        >
          <IconChevronLeft size={20} />
          <span className="sh:text-sm sh:font-medium">{meta[prevDoc]}</span>
        </Link>
      ) : (
        <div />
      )}

      {nextDoc ? (
        <Link
          href={`${docsBase ? docsBase : "/docs"}/${nextDoc}`}
          className="sh:flex sh:items-center sh:gap-2 sh:transition sh:duration-200 sh:ease-in-out sh:no-underline sh:hover:text-primary"
        >
          <span className="sh:text-sm sh:font-medium">{meta[nextDoc]}</span>
          <IconChevronRight size={20} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Switcher;
