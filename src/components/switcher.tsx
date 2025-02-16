import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/docs.css";

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
    <div className="shiori-switcher">
      {prevDoc ? (
        <Link
          href={`${docsBase ? docsBase : "/docs"}/${prevDoc}`}
          className="shiori-switcher-link"
        >
          <IconChevronLeft size={20} />
          <span className="shiori-switcher-text">{meta[prevDoc]}</span>
        </Link>
      ) : (
        <div />
      )}

      {nextDoc ? (
        <Link
          href={`${docsBase ? docsBase : "/docs"}/${nextDoc}`}
          className="shiori-switcher-link"
        >
          <span className="shiori-switcher-text">{meta[nextDoc]}</span>
          <IconChevronRight size={20} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Switcher;
