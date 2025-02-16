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
    <aside className="shiori-toc-aside">
      <div className="shiori-toc-header">On this page</div>
      <ul className="shiori-toc-list">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`shiori-toc-item ${item.level === 3 ? "shiori-toc-item-indent" : ""} ${isActive ? "shiori-toc-item-active" : "shiori-toc-item-inactive"}`}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="shiori-toc-button"
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
