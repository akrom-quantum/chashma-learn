// next.config.mjs
// Turbopack-compatible MDX setup. Custom remark plugins can't run through
// Turbopack's loader (functions aren't serializable across the Rust boundary),
// so we use only string-named published plugins here, and handle Obsidian
// syntax at conversion time via scripts/convert-obsidian.mjs.

import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      "remark-gfm",           // GitHub Flavored Markdown (tables, strikethrough, task lists)
    ],
    rehypePlugins: [
      "rehype-slug",                                     // Adds id attributes to headings
      ["rehype-autolink-headings", { behavior: "wrap" }], // Makes headings clickable links
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx"],
  async redirects() {
    return [
      {
        source: "/english/grammar/unified-grammar/:unit",
        destination: "/english/grammar/books/unified-grammar/:unit",
        permanent: true,
      },
      {
        source: "/english/oxford-word-skills/unified-word-skills/:unit",
        destination: "/english/oxford-word-skills/books/unified-word-skills/:unit",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
