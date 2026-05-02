import { readFile } from "fs/promises";
import path from "path";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * Server-only. Reads an MDX file from src/content/, compiles it,
 * and returns the React component.
 *
 * contentPath: path relative to src/content/, without extension
 *   e.g. "general-english/grammar/section-01-be-and-have/01-be-forms-and-uses/lesson"
 *
 * Returns a React component. Pass custom components via the `components` prop.
 */
export async function getMdxComponent(contentPath) {
  const filePath = path.join(
    process.cwd(),
    "src/content",
    `${contentPath}.mdx`
  );
  const source = await readFile(filePath, "utf-8");

  const { default: MDXContent } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  });

  return MDXContent;
}
