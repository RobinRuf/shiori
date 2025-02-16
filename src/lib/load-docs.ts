import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMarkdown from "remove-markdown";

export interface MetaData {
  title?: string;
  [key: string]: string | undefined;
}

/**
 * Generates (or loads) the search index from the provided docsDirectory
 * @param meta Meta data, which are used for titles
 * @returns An array with documentation data
 */
export const loadDocs = (meta: MetaData) => {
  const docsPath = "/docs";

  // Der physische Pfad, in dem die MDX-Dateien liegen, wird immer als "/app/<docsPath>" interpretiert.
  const physicalDocsDirectory = path.join(process.cwd(), "app", docsPath);

  // Der Pfad zur statischen Suchindex-Datei wird im physischen Verzeichnis abgelegt.
  const indexPath = path.join(
    physicalDocsDirectory,
    "shiori-search-index.json",
  );

  // Falls die Suchindex-Datei existiert, wird sie geladen.
  if (fs.existsSync(indexPath)) {
    const data = fs.readFileSync(indexPath, "utf-8");
    return JSON.parse(data);
  }

  const docs: { id: string; title: string; content: string; url: string }[] =
    [];

  const traverseDirectory = (directory: string) => {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      if (fs.statSync(fullPath).isDirectory()) {
        traverseDirectory(fullPath);
      } else if (file.endsWith(".mdx")) {
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const { content, data } = matter(fileContents);

        // Remove all lines starting with "import"
        const withoutImports = content
          .split("\n")
          .filter((line) => !line.trim().startsWith("import"))
          .join("\n");

        // Remove <CodeBlock> ... </CodeBlock> blocks completely
        const withoutCodeBlocks = withoutImports.replace(
          /<CodeBlock[\s\S]*?<\/CodeBlock>/gi,
          "",
        );

        // Remove Markdown syntax
        const plainText = removeMarkdown(withoutCodeBlocks);

        // Remove HTML/JSX tags
        const cleanText = plainText.replace(/<[^>]+>/g, "").trim();

        // Ermittele den relativen Pfad vom physischen Dokumentationsverzeichnis aus
        const relativePath = path
          .relative(physicalDocsDirectory, fullPath)
          .replace(/\/page\.mdx$/, "")
          .replace(/\.mdx$/, "");

        // Erstelle die URL: Der physische Pfad "/app/<docsPath>" wird als URL-Basis zu "/<docsPath>".
        const url = `${docsPath}/${relativePath}`;
        if (relativePath === "page") {
          docs.push({
            id: "introduction",
            title: "Introduction",
            content: cleanText,
            url: `${docsPath}`,
          });
          return;
        }

        docs.push({
          id: relativePath,
          title: data.title || meta[relativePath] || relativePath,
          content: cleanText,
          url,
        });
      }
    });
  };

  traverseDirectory(physicalDocsDirectory);

  // Schreibe den generierten Suchindex in die Datei ab
  fs.writeFileSync(indexPath, JSON.stringify(docs, null, 2));
  console.log(`[SHIORI]: Search index generated at: ${indexPath}`);
  return docs;
};
