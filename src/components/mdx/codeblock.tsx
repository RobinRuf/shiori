"use client";

import React, { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCopy, IconCheck } from "@tabler/icons-react";

import { Ts } from "../../icons/codeblock";
import { Js } from "../../icons/codeblock";
import { TerminalLightmode } from "../../icons/codeblock";
import { TerminalDarkmode } from "../../icons/codeblock";

interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: React.ReactNode;
  primitive?: boolean;
}

function processCode(code: string): {
  processedCode: string;
  highlightedLines: number[];
} {
  const lines = code.split("\n");
  let outputLines: string[] = [];
  let highlightedLines: number[] = [];
  let isInBlock = false;
  let pendingHighlightAfterEnd = false;
  let blockStartIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes("// highlight-start")) {
      isInBlock = true;
      blockStartIndex = outputLines.length;
      continue;
    }

    if (line.includes("// highlight-end")) {
      if (isInBlock) {
        for (let j = blockStartIndex + 1; j < outputLines.length; j++) {
          if (!highlightedLines.includes(j)) {
            highlightedLines.push(j);
          }
        }
        isInBlock = false;
      }
      pendingHighlightAfterEnd = true;
      continue;
    }

    outputLines.push(line);

    if (pendingHighlightAfterEnd) {
      highlightedLines.push(outputLines.length - 1);
      pendingHighlightAfterEnd = false;
    } else if (isInBlock && outputLines.length - 1 > blockStartIndex) {
      highlightedLines.push(outputLines.length - 1);
    }
  }

  return {
    processedCode: outputLines.join("\n"),
    highlightedLines,
  };
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language = "bash",
  filename,
  children,
  primitive = false,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const code =
    React.Children.map(children, (child) =>
      typeof child === "string" ? child : "",
    )?.join("") || "";

  const { processedCode, highlightedLines } = useMemo(
    () => processCode(code),
    [code],
  );

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };

  const getLogo = () => {
    if (language === "typescript" || language === "ts") {
      return Ts;
    } else if (language === "javascript" || language === "js") {
      return Js;
    } else if (["bash", "shell", "sh", "terminal"].includes(language)) {
      return theme === "light" ? TerminalLightmode : TerminalDarkmode;
    }
    return theme === "light" ? TerminalLightmode : TerminalDarkmode;
  };

  const isSingleLine = processedCode.split("\n").length === 1;
  const Logo = getLogo();

  if (primitive) {
    return (
      <div
        className="sh:relative sh:overflow-x-auto sh:my-10 sh:rounded-lg sh:border sh:border-gray-300 sh:shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SyntaxHighlighter
          language={language}
          style={theme === "light" ? oneLight : oneDark}
          showLineNumbers={!isSingleLine}
          wrapLines={true}
          lineProps={(lineNumber: number) => {
            if (highlightedLines.includes(lineNumber)) {
              return {
                style: {
                  backgroundColor: theme === "light" ? "#f0f0f0" : "#333333",
                },
              };
            }
            return {};
          }}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          {processedCode}
        </SyntaxHighlighter>

        {isHovered && (
          <button
            onClick={handleCopy}
            className="sh:absolute sh:top-2 sh:right-2 sh:border-0 sh:bg-transparent sh:rounded sh:cursor-pointer sh:transition-all sh:duration-200 sh:ease-in-out sh:hover:opacity-80"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <IconCheck size={20} stroke={1.5} />
            ) : (
              <IconCopy size={20} stroke={1.5} />
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="sh:relative sh:border sh:border-gray-300 sh:rounded-lg sh:shadow-sm sh:bg-sitebg sh:my-10 sh:overflow-hidden">
      <div className="sh:flex sh:items-center sh:justify-between sh:p-2 sh:border-b sh:border-gray-300">
        <div className="sh:flex sh:items-center sh:gap-2 sh:ml-2">
          {Logo && (
            <div className="w-[16px] h-[16px]">
              <Logo />
            </div>
          )}
          {filename && (
            <span className="sh:text-sm sh:font-light">{filename}</span>
          )}
        </div>
        <div className="sh:flex sh:items-center sh:gap-2 sh:mr-2">
          <button
            onClick={handleCopy}
            className="sh:absolute sh:top-2 sh:right-2 sh:border-0 sh:bg-transparent sh:rounded sh:cursor-pointer sh:transition-all sh:duration-200 sh:ease-in-out sh:hover:opacity-80"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <IconCheck size={20} stroke={1.5} />
            ) : (
              <IconCopy size={20} stroke={1.5} />
            )}
          </button>
        </div>
      </div>
      <div className="sh:overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={theme === "light" ? oneLight : oneDark}
          showLineNumbers={!isSingleLine}
          wrapLines={true}
          lineProps={(lineNumber: number) => {
            if (highlightedLines.includes(lineNumber)) {
              return {
                style: {
                  backgroundColor:
                    theme === "light"
                      ? "rgba(173, 216, 230, 0.3)"
                      : "rgba(100, 149, 237, 0.25)",
                },
              };
            }
            return {};
          }}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.5rem 0.5rem",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          {processedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
