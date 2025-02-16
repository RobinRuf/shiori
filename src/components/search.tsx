import React, { useEffect, useRef, useState } from "react";
import Fuse, { RangeTuple } from "fuse.js";
import Link from "next/link";
import "../styles/docs.css";

type FuseMatch = {
  key: string;
  indices: RangeTuple[];
  value: string;
};

export default function Search() {
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
        <span className="bg-yellow-200 text-gray-900 font-bold">
          {preview.slice(bestStart - previewStart, bestEnd - previewStart + 1)}
        </span>
        {preview.slice(bestEnd - previewStart + 1)}
        {previewEnd < text.length && "..."}
      </>
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-2 bg-[var(--color-sitebg)] px-4 py-2 rounded-lg shadow w-64">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search documentation..."
          className="flex-1 bg-transparent border-0 outline-none"
        />
        <span className="text-sm text-gray-500">⌘K</span>
      </div>
      {results.length > 0 && (
        <ul className="list-none m-0 p-0 absolute top-[calc(100%+1rem)] right-0 max-w-[30rem] w-[30rem] bg-[var(--color-accent-transparent)] rounded-lg shadow p-2 backdrop-blur">
          {results.map(({ item, matches }, index) => (
            <li
              key={`${item.id}-${index}`}
              className="p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[var(--color-sitebg-transparent)]"
            >
              <Link
                href={item.url}
                onClick={() => {
                  resetSearch();
                }}
              >
                <div className="font-semibold mb-1">{item.title}</div>
                <div className="text-sm text-gray-500">
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
