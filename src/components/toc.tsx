import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function Toc() {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const updateToc = () => {
      const headings = Array.from(document.querySelectorAll("h2, h3")).map(
        (heading) => ({
          id: heading.id,
          text: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        }),
      );
      setTocItems(headings);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "0px 0px -70% 0px" },
      );

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    };

    updateToc();

    return () => {
      setTocItems([]);
      setActiveId("");
    };
  }, [pathname]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -90;
      const yPosition =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <aside className="sh:p-4 sh:text-sm sh:w-64 sh:h-full">
      <div className="sh:font-semibold sh:mb-4 sh:bg-sitebg">On this page</div>
      <ul className="sh:overflow-y-auto sh:max-h-[calc(100%-2rem)] sh:list-none sh:space-y-1">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${item.level === 3 ? "sh:pl-4" : ""}`}
            >
              <button
                onClick={() => handleClick(item.id)}
                className={`sh:text-left sh:cursor-pointer sh:transition-colors sh:duration-200 ${
                  isActive
                    ? "sh:text-primary sh:font-semibold sh:opacity-100"
                    : "sh:text-content-transparent sh:hover:text-content"
                }`}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
