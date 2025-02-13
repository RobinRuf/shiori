import React, { useEffect, useRef, useState } from "react";
import Fuse, { RangeTuple } from "fuse.js";
import Link from "next/link";
import '../styles/docs.css';

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

      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        resetSearch();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
      ([startA, endA], [startB, endB]) => endB - startB - (endA - startA)
    );

    const [bestStart, bestEnd] = sortedIndices[0];
    const previewStart = Math.max(0, bestStart - 30);
    const previewEnd = Math.min(text.length, bestEnd + 270);

    const preview = text.slice(previewStart, previewEnd);

    return (
      <>
        {previewStart > 0 && "..."}
        {preview.slice(0, bestStart - previewStart)}
        <span className="shiori-search-highlight">
          {preview.slice(bestStart - previewStart, bestEnd - previewStart + 1)}
        </span>
        {preview.slice(bestEnd - previewStart + 1)}
        {previewEnd < text.length && "..."}
      </>
    );
  };

  return (
    <div className="shiori-search-container" ref={containerRef}>
      <div className="shiori-search-bar">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search documentation..."
          className="shiori-search-input"
        />
        <span className="shiori-search-shortcut">⌘K</span>
      </div>
      {results.length > 0 && (
        <ul className="shiori-search-suggestions">
          {results.map(({ item, matches }, index) => (
            <li key={`${item.id}-${index}`} className="shiori-search-suggestion">
              <Link
                href={item.url}
                className="shiori-search-suggestion-link"
                onClick={() => {
                  resetSearch();
                }}
              >
                <div className="shiori-search-title">{item.title}</div>
                <div className="shiori-search-preview">
                  {matches
                    ?.filter((match: FuseMatch) => match.key === "content")
                    .slice(0, 1)
                    .map((match: FuseMatch, matchIndex: number) => (
                      <span key={`${item.id}-match-${matchIndex}`}>
                        {getBestMatchPreview(
                          match.value as string,
                          match.indices as RangeTuple[]
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
