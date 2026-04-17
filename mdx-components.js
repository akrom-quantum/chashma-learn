// mdx-components.js (project root)
// Global MDX component substitutions. Next.js auto-loads this file.

import Callout from "@/components/callouts/Callout";
import Table from "@/components/content/Table";
import VocabCard from "@/components/content/VocabCard";
import WikiLink from "@/components/content/WikiLink";

export function useMDXComponents(components) {
  return {
    Callout,
    WikiLink,
    VocabCard,
    table: Table,
    ...components,
  };
}
