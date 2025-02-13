import React, { useEffect } from "react";

const AnchorLinkHandler: React.FC = () => {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;

      if (target.tagName === "A" && target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          event.preventDefault();

          const yOffset = -90;
          const yPosition =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: yPosition, behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
};

export default AnchorLinkHandler;
