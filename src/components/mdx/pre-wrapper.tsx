import React from "react";
import CodeBlock from "./codeblock";

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  filename?: string;
  primitive?: boolean;
}

interface MDXPreWrapperProps {
  children: React.ReactElement<CodeProps>;
}

function MDXPreWrapper({ children }: MDXPreWrapperProps) {
  const {
    className,
    filename,
    primitive,
    children: codeContent,
  } = children.props;

  let language = "bash";
  if (className) {
    const langMatch = className.match(/language-([^\s]+)/);
    if (langMatch) {
      language = langMatch[1];
    }
  }

  const rawCode =
    typeof codeContent === "string"
      ? codeContent
      : React.Children.toArray(codeContent).join("");
  const code = rawCode.trimEnd();

  return (
    <CodeBlock language={language} filename={filename} primitive={primitive}>
      {code}
    </CodeBlock>
  );
}

export default MDXPreWrapper;
