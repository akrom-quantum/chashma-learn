// mdx-components.js (project root)
// Global MDX component substitutions. Next.js auto-loads this file.

import Callout from "@/components/callouts/Callout";
import Table from "@/components/content/Table";
import VocabCard from "@/components/content/VocabCard";
import WikiLink from "@/components/content/WikiLink";

// New MDX components for the (learn)/general-english section
import { GrammarTable } from "@/components/mdx/GrammarTable";
import { ExampleBlock } from "@/components/mdx/ExampleBlock";
import { IPA } from "@/components/mdx/IPA";
import AudioPlaceholder from "@/components/pronunciation/AudioPlaceholder";

export function useMDXComponents(components) {
  return {
    // Legacy components (existing content)
    Callout,
    WikiLink,
    VocabCard,
    table: Table,
    // New components (general-english MDX files)
    GrammarTable,
    ExampleBlock,
    IPA,
    AudioPlaceholder,
    ...components,
  };
}
