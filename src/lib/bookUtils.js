import { readFile } from "fs/promises";
import path from "path";
import { getMdxComponent } from "./mdxUtils";
import { Callout } from "@/components/mdx/Callout";
import { GrammarTable } from "@/components/mdx/GrammarTable";
import { ExampleBlock } from "@/components/mdx/ExampleBlock";
import { IPA } from "@/components/mdx/IPA";
import AudioPlaceholder from "@/components/pronunciation/AudioPlaceholder";
import { Prose } from "@/components/mdx/Prose";

export const MDX_COMPONENTS = {
  Callout, GrammarTable, ExampleBlock, IPA, AudioPlaceholder,
  ...Prose,
};

export async function getUnitMdx(unitPath) {
  return getMdxComponent(unitPath);
}

export async function loadUnitJson(unitPath, filename) {
  try {
    const p = path.join(process.cwd(), "src/content",
      unitPath.replace("/lesson", `/${filename}`));
    return JSON.parse(await readFile(p, "utf-8"));
  } catch {
    return null;
  }
}

export function buildSectionsFromUnits(units, bookSlug, sectionOrder = null) {
  const map = {};
  for (const u of units) {
    const sec = u.section ?? u.subSection ?? "default";
    if (!map[sec]) map[sec] = [];
    map[sec].push(u);
  }
  const keys = sectionOrder
    ? sectionOrder.filter(id => map[id])
    : Object.keys(map);
  return keys.map(id => ({
    id,
    label: formatSectionLabel(id),
    units: (map[id] ?? [])
      .sort((a, b) => (a.unit ?? 0) - (b.unit ?? 0))
      .map(u => ({ id: u.slug, label: u.title, href: `/${bookSlug}/${u.slug}` })),
  }));
}

export function formatSectionLabel(id) {
  if (!id) return id;
  return id
    .replace(/^(section|part|phase|appendix)-(\d+)-/, (_, type, n) =>
      `${type.charAt(0).toUpperCase() + type.slice(1)} ${parseInt(n)} — `)
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}
