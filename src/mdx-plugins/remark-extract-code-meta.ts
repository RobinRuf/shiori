import { visit } from "unist-util-visit";
import type { Node } from "unist";

export default function remarkExtractCodeMeta() {
  return (tree: Node) => {
    visit(tree, "code", (node: any) => {
      if (node.meta) {
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        // get 'file', if set
        const fileMatch = node.meta.match(/file=([^\s]+)/);
        if (fileMatch) {
          node.data.hProperties.filename = fileMatch[1];
        }
        // get 'primitive', if set
        if (node.meta.includes("primitive")) {
          node.data.hProperties.primitive = true;
        }
      }
    });
  };
}
