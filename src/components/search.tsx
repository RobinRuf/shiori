import React, { useEffect, useRef, useState } from "react";
import Fuse, { RangeTuple } from "fuse.js";
import Link from "next/link";

type FuseMatch = {
  key: string;
  indices: RangeTuple[];
  value: string;
};

export default function Search({ onClose }: { onClose?: () => void }) {
  const [searchIndex, setSearchIndex] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/shiori/docs");
      const data = await res.json();
      setSearchIndex(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (
        event.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        resetSearch();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        resetSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fuse = new Fuse(searchIndex, {
    keys: ["title", "content"],
    threshold: 0.3,
    includeMatches: true,
    ignoreLocation: true,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const result = fuse.search(event.target.value).map((res) => ({
      item: res.item,
      matches: res.matches,
    }));
    setResults(result);
  };

  const resetSearch = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.blur();
  };

  const getBestMatchPreview = (text: string, matchIndices: RangeTuple[]) => {
    const sortedIndices = matchIndices.sort(
      ([startA, endA], [startB, endB]) => endB - startB - (endA - startA),
    );

    const [bestStart, bestEnd] = sortedIndices[0];
    const previewStart = Math.max(0, bestStart - 30);
    const previewEnd = Math.min(text.length, bestEnd + 270);

    const preview = text.slice(previewStart, previewEnd);

    return (
      <>
        {previewStart > 0 && "..."}
        {preview.slice(0, bestStart - previewStart)}
        <span className="sh:bg-yellow-200 sh:text-gray-900 sh:font-bold">
          {preview.slice(bestStart - previewStart, bestEnd - previewStart + 1)}
        </span>
        {preview.slice(bestEnd - previewStart + 1)}
        {previewEnd < text.length && "..."}
      </>
    );
  };

  return (
    <div className="sh:relative" ref={containerRef}>
      <div className="sh:flex sh:items-center sh:gap-2 sh:bg-sitebg sh:px-4 sh:py-2 sh:rounded-lg sh:shadow sh:w-full sh:md:w-64">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search documentation..."
          className="sh:flex-1 sh:bg-transparent sh:border-0 sh:outline-none"
        />
        <span className="sh:hidden sh:md:flex sh:text-sm sh:text-gray-500">
          ⌘K
        </span>
      </div>
      {results.length > 0 && (
        <ul className="sh:max-h-96 sh:overflow-y-auto shiori-scrollbar sh:list-none sh:m-0 sh:p-0 sh:absolute sh:top-[calc(100%+1rem)] sh:md:right-0 sh:md:max-w-[30rem] sh:md:w-[30rem] sh:w-full sh:px-6 sh:md:px-0 sh:bg-sitebg-transparent sh:md:bg-accent-transparent sh:rounded-lg sh:shadow sh:backdrop-blur">
          {results.map(({ item, matches }, index) => (
            <li
              key={`${item.id}-${index}`}
              className="sh:m-2 sh:p-2 sh:rounded-lg sh:cursor-pointer sh:transition-colors sh:duration-200 sh:ease-in-out sh:md:hover:bg-sitebg-transparent"
              onClick={onClose}
            >
              <Link
                href={item.url}
                onClick={() => {
                  resetSearch();
                }}
              >
                <div className="sh:font-semibold sh:mb-1">{item.title}</div>
                <div className="sh:text-sm sh:text-content-transparent">
                  {matches
                    ?.filter((match: FuseMatch) => match.key === "content")
                    .slice(0, 1)
                    .map((match: FuseMatch, matchIndex: number) => (
                      <span key={`${item.id}-match-${matchIndex}`}>
                        {getBestMatchPreview(
                          match.value as string,
                          match.indices as RangeTuple[],
                        )}
                      </span>
                    ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
