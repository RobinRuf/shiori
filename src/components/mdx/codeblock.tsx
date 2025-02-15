"use client"

import React, { useState } from "react";
import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import '../../styles/docs.css';

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

/**
 * Renders a syntax-highlighted code block.
 *
 * @param language - The programming language for syntax highlighting (default: "bash").
 * @param filename - The filename of the code, if applicable.
 * @param primitive - A flag indicating whether to render in a simpler format (default: false).
 * @param children - The content of the code block.
 * @returns The rendered code block.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  language = "bash",
  filename,
  children,
  primitive = false,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const code = React.Children.map(children, (child) =>
    typeof child === "string" ? child : ""
  )?.join("");

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

  const isSingleLine = code?.split("\n").length === 1;

  if (primitive) {
    return (
      <div
        className="mdx-codeblock-primitive-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SyntaxHighlighter
          language={language}
          style={theme === "light" ? oneLight : oneDark}
          showLineNumbers={!isSingleLine}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          {code || ""}
        </SyntaxHighlighter>

        {isHovered && (
          <button
            onClick={handleCopy}
            className="mdx-codeblock-copy-btn"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <IconCheck size={20} stroke={1.5} />
            ) : (
              <IconCopy size={20} stroke={1.5} className="mdx-copy-icon" />
            )}
          </button>
        )}
      </div>
    );
  }

  const Logo = getLogo();

  return (
    <div className="mdx-codeblock-container">
      <div className="mdx-codeblock-header">
        <div className="mdx-codeblock-header-left">
          {Logo && (
            <div className="w-[16px] h-[16px]">
              <Logo />
            </div>
          )}
          {filename && <span className="mdx-codeblock-filename">{filename}</span>}
        </div>
        <div className="mdx-codeblock-header-right">
          <button
            onClick={handleCopy}
            className="mdx-codeblock-copy-btn"
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
      <div className="mdx-codeblock-code-container">
        <SyntaxHighlighter
          language={language}
          style={theme === "light" ? oneLight : oneDark}
          showLineNumbers={!isSingleLine}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.5rem 0.5rem",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          {code || ""}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
