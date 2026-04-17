// src/lib/mdx-obsidian.js
// Preprocessor that converts Obsidian-flavored markdown to MDX before @mdx-js/loader compiles it.
// Runs as a unified remark plugin. Keeps your Obsidian authoring workflow intact.

import { visit } from "unist-util-visit";

// ---------- Callout converter ----------
// Obsidian syntax:
//   > [!tip] Optional Title
//   > Body line 1
//   > Body line 2
// Becomes:
//   <Callout type="tip" title="Optional Title">
//   Body line 1
//   Body line 2
//   </Callout>
const CALLOUT_TYPES = [
  "tip", "warning", "info", "example", "quote",
  "abstract", "success", "failure", "danger", "note",
];

export function remarkObsidianCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node, index, parent) => {
      const firstChild = node.children?.[0];
      if (!firstChild || firstChild.type !== "paragraph") return;
      const firstText = firstChild.children?.[0];
      if (!firstText || firstText.type !== "text") return;

      const match = firstText.value.match(/^\[!(\w+)\](?:\s+(.*))?$/);
      if (!match) return;

      const type = match[1].toLowerCase();
      const title = match[2]?.trim() || "";
      if (!CALLOUT_TYPES.includes(type)) return;

      // Strip the [!type] line and keep the rest
      const remainingText = firstText.value.replace(/^\[!\w+\](?:\s+.*)?\n?/, "");
      if (remainingText) {
        firstText.value = remainingText;
      } else {
        firstChild.children.shift();
        if (firstChild.children.length === 0) node.children.shift();
      }

      // Replace blockquote with JSX Callout wrapper
      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Callout",
        attributes: [
          { type: "mdxJsxAttribute", name: "type", value: type },
          ...(title ? [{ type: "mdxJsxAttribute", name: "title", value: title }] : []),
        ],
        children: node.children,
      };
    });
  };
}

// ---------- Wiki-link converter ----------
// [[Some Page]] or [[some-slug|Display Text]] → <WikiLink to="..."/>
export function remarkObsidianWikiLinks() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const regex = /\[\[([^\]]+)\]\]/g;
      const value = node.value;
      if (!regex.test(value)) return;
      regex.lastIndex = 0;

      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: "text", value: value.slice(lastIndex, match.index) });
        }
        const inner = match[1];
        const [slugOrTitle, display] = inner.split("|").map(s => s.trim());
        const slug = (display ? slugOrTitle : slugOrTitle)
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        const label = display || slugOrTitle;

        parts.push({
          type: "mdxJsxTextElement",
          name: "WikiLink",
          attributes: [{ type: "mdxJsxAttribute", name: "to", value: slug }],
          children: [{ type: "text", value: label }],
        });
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < value.length) {
        parts.push({ type: "text", value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}

// ---------- Highlight converter ----------
// ==highlighted text== → <mark>highlighted text</mark>
export function remarkObsidianHighlight() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const regex = /==([^=]+)==/g;
      if (!regex.test(node.value)) return;
      regex.lastIndex = 0;

      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(node.value)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: "text", value: node.value.slice(lastIndex, match.index) });
        }
        parts.push({
          type: "mdxJsxTextElement",
          name: "mark",
          attributes: [],
          children: [{ type: "text", value: match[1] }],
        });
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < node.value.length) {
        parts.push({ type: "text", value: node.value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}

// ---------- TOC auto-generation ----------
// Reads H2/H3 from the MDX tree and auto-populates `tocItems` in the exported meta
// if the author didn't provide one. Exposed via a remark plugin that adds an export.
export function remarkAutoToc() {
  return (tree) => {
    const items = [];
    visit(tree, "heading", (node) => {
      if (node.depth !== 2 && node.depth !== 3) return;
      const text = node.children
        .filter(c => c.type === "text" || c.type === "inlineCode")
        .map(c => c.value)
        .join("");
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      items.push({ id, label: text, level: node.depth - 1 });
      // Attach id so rehype-slug doesn't need to guess
      node.data = node.data || {};
      node.data.hProperties = { ...node.data.hProperties, id };
    });

    tree.children.push({
      type: "mdxjsEsm",
      value: `export const __autoToc = ${JSON.stringify(items)};`,
    });
  };
}