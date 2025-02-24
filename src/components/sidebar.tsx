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
  onClose?: () => void;
}

interface SidebarItemProps {
  path: string;
  label: string;
  level: number;
  isActive: boolean;
  hasChildren: boolean;
  isExpanded: boolean;
  docsBase?: string;
  onClose?: () => void;
}

function SidebarItemComponent({
  path,
  label,
  level,
  isActive,
  hasChildren,
  isExpanded,
  docsBase,
  onClose,
}: SidebarItemProps) {
  return (
    <li
      className={`sh:min-w-[14rem] sh:max-w-[18rem] sh:list-none ${
        level === 2 ? "sh:pl-4" : ""
      }`}
      onClick={onClose}
    >
      <div className="sh:flex sh:items-center">
        <Link
          href={`${docsBase ? docsBase : "/docs"}/${path}`}
          className={`sh:flex sh:w-full sh:justify-between sh:items-center sh:text-sm sh:no-underline sh:transition-all sh:duration-200 sh:ease-in-out ${
            level === 0 ? "sh:font-semibold" : ""
          } ${
            isActive
              ? "sh:text-primary sh:opacity-100"
              : "sh:text-content-transparent sh:hover:text-content"
          }`}
        >
          <span>{label}</span>
          {hasChildren && (
            <span>
              {isExpanded ? (
                <IconChevronDown size={18} />
              ) : (
                <IconChevronRight size={18} />
              )}
            </span>
          )}
        </Link>
      </div>
    </li>
  );
}

export default function Sidebar({ meta, docsBase, onClose }: SidebarProps) {
  const pathname = usePathname();
  let currentPath = pathname;
  if (docsBase && pathname.startsWith(docsBase)) {
    currentPath = pathname.slice(docsBase.length);
  }
  currentPath = currentPath.replace(/^\/+|\/+$/g, "");

  const items: SidebarItem[] = React.useMemo(() => {
    return Object.entries(meta)
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
  }, [meta]);

  const childrenMap = React.useMemo(() => {
    const map: Record<string, SidebarItem[]> = {};
    items.forEach((item) => {
      if (item.parentPath) {
        if (!map[item.parentPath]) {
          map[item.parentPath] = [];
        }
        map[item.parentPath].push(item);
      }
    });
    return map;
  }, [items]);

  const renderItems = React.useCallback(() => {
    return items.map((item) => {
      if (item.level === 0) {
        return (
          <React.Fragment key={item.path}>
            <ul className="sh:py-2 sh:list-none sh:m-0">
              <SidebarItemComponent
                key={item.path}
                path={item.path}
                label={item.label}
                level={item.level}
                isActive={currentPath === item.path}
                hasChildren={false}
                isExpanded={false}
                docsBase={docsBase}
                onClose={onClose}
              />
            </ul>
          </React.Fragment>
        );
      }
      if (item.level === 1) {
        const children = childrenMap[item.path] || [];
        const hasChildren = children.length > 0;
        const isExpanded =
          currentPath === item.path || currentPath.startsWith(`${item.path}/`);

        return (
          <React.Fragment key={item.path}>
            <ul className="sh:py-2 sh:list-none sh:m-0">
              <SidebarItemComponent
                key={item.path}
                path={item.path}
                label={item.label}
                level={item.level}
                isActive={currentPath === item.path}
                hasChildren={hasChildren}
                isExpanded={isExpanded}
                docsBase={docsBase}
                onClose={onClose}
              />
              {isExpanded &&
                hasChildren &&
                children.map((child) => (
                  <SidebarItemComponent
                    key={child.path}
                    path={child.path}
                    label={child.label}
                    level={child.level}
                    isActive={currentPath === child.path}
                    hasChildren={false}
                    isExpanded={false}
                    docsBase={docsBase}
                    onClose={onClose}
                  />
                ))}
            </ul>
          </React.Fragment>
        );
      }
      return null;
    });
  }, [items, childrenMap, currentPath, docsBase]);

  return (
    <aside className="sh:p-4 sh:max-h-full sh:overflow-y-scroll shiori-scrollbar">
      <ul>{renderItems()}</ul>
    </aside>
  );
}
