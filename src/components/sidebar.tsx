import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";

export interface MetaData {
  title?: string;
  [key: string]: string | undefined;
}

export interface SidebarItem {
  path: string;
  label: string;
  level: number;
  parentPath: string | null;
}

export interface SidebarProps {
  meta: MetaData;
  docsBase?: string;
}

interface SidebarItemProps {
  path: string;
  label: string;
  level: number;
  isActive: boolean;
  hasChildren: boolean;
  isExpanded: boolean;
  docsBase?: string;
}

function SidebarItemComponent({
  path,
  label,
  level,
  isActive,
  hasChildren,
  isExpanded,
  docsBase,
}: SidebarItemProps) {
  return (
    <li className={`shiori-sidebar-item ${level === 2 ? "shiori-sidebar-item-indent" : ""}`}>
      <div className="shiori-sidebar-item-container">
        <Link
          href={`${docsBase ? docsBase : "/docs}"}/${path}`}
          className={`shiori-sidebar-link ${level === 0 ? "shiori-sidebar-link-bold" : ""} ${
            isActive ? "shiori-sidebar-link-active" : "shiori-sidebar-link-inactive"
          }`}
        >
          <span>{label}</span>
          {hasChildren && (
            <span>
              {isExpanded ? <IconChevronDown size={18} /> : <IconChevronRight size={18} />}
            </span>
          )}
        </Link>
      </div>
    </li>
  );
}

export default function Sidebar({ meta, docsBase }: SidebarProps) {
  const pathname = usePathname();
  let currentPath = pathname;
  if (docsBase && pathname.startsWith(docsBase)) {
    currentPath = pathname.slice(docsBase.length);
  }
  currentPath = currentPath.replace(/^\/+|\/+$/g, "");

  const items: SidebarItem[] = Object.entries(meta)
    .filter(([key]) => key !== "title")
    .map(([path, label]) => {
      const segments = path.split("/");
      const level = segments.length - 1;
      const parentPath = level > 0 ? segments.slice(0, -1).join("/") : null;
      return {
        path,
        label: label || "",
        level,
        parentPath,
      };
    });

  const renderItems = () => {
    return items.map((item) => {
      if (item.level === 0) {
        return (
          <React.Fragment key={item.path}>
            <ul className="shiori-sidebar-list">
              <SidebarItemComponent
                key={item.path}
                path={item.path}
                label={item.label}
                level={item.level}
                isActive={currentPath === item.path}
                hasChildren={false}
                isExpanded={false}
                docsBase={docsBase}
              />
            </ul>
          </React.Fragment>
        );
      }

      if (item.level === 1) {
        const hasChildren = items.some((child) => child.parentPath === item.path);
        const isExpanded =
          currentPath === item.path || currentPath.startsWith(`${item.path}/`);

        return (
          <React.Fragment key={item.path}>
            <ul className="shiori-sidebar-list">
              <SidebarItemComponent
                key={item.path}
                path={item.path}
                label={item.label}
                level={item.level}
                isActive={currentPath === item.path}
                hasChildren={hasChildren}
                isExpanded={isExpanded}
                docsBase={docsBase}
              />
              {isExpanded &&
                hasChildren &&
                items
                  .filter((child) => child.parentPath === item.path)
                  .map((child) => (
                    <SidebarItemComponent
                      key={child.path}
                      path={child.path}
                      label={child.label}
                      level={child.level}
                      isActive={currentPath === child.path}
                      hasChildren={false}
                      isExpanded={false}
                      docsBase={docsBase}
                    />
                  ))}
            </ul>
          </React.Fragment>
        );
      }

      return null;
    });
  };

  return (
    <aside className="shiori-sidebar-container">
      <ul>{renderItems()}</ul>
    </aside>
  );
}
