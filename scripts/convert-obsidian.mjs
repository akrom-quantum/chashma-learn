#!/usr/bin/env node
// scripts/convert-obsidian.mjs
// Bulk converter: takes Obsidian .md files, outputs .mdx files with:
//   - frontmatter scaffolding
//   - [!tip] callouts → <Callout> JSX
//   - [[wiki-links]] → <WikiLink> JSX
//   - ==highlight== → <mark> JSX
//
// This is a one-time transformation. The resulting .mdx files are portable
// and work with Turbopack (no build-time custom plugins required).
//
// Usage:
//   node scripts/convert-obsidian.mjs <input-dir> <output-dir>

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from "node:fs";
import { join, relative, dirname, basename, extname } from "node:path";
import matter from "gray-matter";

const [,, inputDir, outputDir] = process.argv;

if (!inputDir || !outputDir) {
  console.error("Usage: node scripts/convert-obsidian.mjs <input-dir> <output-dir>");
  process.exit(1);
}
if (!existsSync(inputDir)) {
  console.error(`Input directory does not exist: ${inputDir}`);
  process.exit(1);
}

let converted = 0;
let skipped = 0;

function slugify(s) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function titleFromFilename(filename) {
  return basename(filename, extname(filename))
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ---------- Obsidian syntax transformations ----------

// Convert Obsidian callout blocks to <Callout> JSX
// > [!tip] Optional Title
// > Body line 1
// > Body line 2
//
// becomes:
//
// <Callout type="tip" title="Optional Title">
// Body line 1
// Body line 2
// </Callout>
function convertCallouts(markdown) {
  const lines = markdown.split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^>\s*\[!(\w+)\](?:\s+(.*))?$/);

    if (match) {
      const type = match[1].toLowerCase();
      const title = (match[2] || "").trim();
      const body = [];
      i++;

      // Collect subsequent quoted lines as body
      while (i < lines.length && lines[i].startsWith(">")) {
        body.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }

      out.push(`<Callout type="${type}"${title ? ` title="${title.replace(/"/g, '\\"')}"` : ""}>`);
      out.push(...body);
      out.push("</Callout>");
      out.push("");
    } else {
      out.push(line);
      i++;
    }
  }

  return out.join("\n");
}

// [[Some Page]] or [[slug|Display Text]] → <WikiLink to="slug">Display</WikiLink>
function convertWikiLinks(markdown) {
  return markdown.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, slug, display) => {
    const cleanSlug = slug.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const label = (display || slug).trim();
    return `<WikiLink to="${cleanSlug}">${label}</WikiLink>`;
  });
}

// ==highlighted== → <mark>highlighted</mark>
function convertHighlights(markdown) {
  return markdown.replace(/==([^=\n]+)==/g, "<mark>$1</mark>");
}

// Run all transformations in sequence
function transformObsidianSyntax(markdown) {
  let result = markdown;
  result = convertCallouts(result);
  result = convertWikiLinks(result);
  result = convertHighlights(result);
  return result;
}

// ---------- File conversion ----------

function convert(inPath, outPath) {
  const raw = readFileSync(inPath, "utf8");
  let parsed;
  try {
    parsed = matter(raw);
  } catch (e) {
    console.error(`  ! Skipped (frontmatter error): ${inPath}`);
    skipped++;
    return;
  }

  const fm = parsed.data;
  const filename = basename(inPath);
  const title = fm.title || titleFromFilename(filename);

  const mergedFm = {
    title,
    level: fm.level || "B1-B2",
    time: fm.time || "10 min",
    ...fm,
  };

  const frontmatterYaml = Object.entries(mergedFm)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}: [${v.map(x => `"${x}"`).join(", ")}]`;
      if (typeof v === "object" && v !== null) return `${k}: ${JSON.stringify(v)}`;
      if (typeof v === "string") return `${k}: "${v.replace(/"/g, '\\"')}"`;
      return `${k}: ${v}`;
    })
    .join("\n");

  const metaExport = `export const meta = ${JSON.stringify(mergedFm, null, 2)};`;
  const transformedContent = transformObsidianSyntax(parsed.content.trim());

  const output = `---
${frontmatterYaml}
---

${metaExport}

${transformedContent}
`;

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, output, "utf8");
  converted++;
}

function walk(dir, outBase) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      walk(full, outBase);
      continue;
    }
    if (!entry.endsWith(".md")) continue;
    const rel = relative(inputDir, full);
    const dir2 = dirname(join(outBase, rel));
    const base = slugify(basename(entry, ".md")) + ".mdx";
    const outPath = join(dir2, base);
    convert(full, outPath);
    console.log(`  ✓ ${rel} → ${relative(".", outPath)}`);
  }
}

console.log(`Converting ${inputDir} → ${outputDir}\n`);
walk(inputDir, outputDir);
console.log(`\nConverted: ${converted}`);
if (skipped) console.log(`Skipped: ${skipped}`);
console.log(`\nNext:
  1. Review a sample of generated .mdx files
  2. Fill in missing fields (category, vocabIndex) in frontmatter where needed
  3. Register the content in src/content/registry.js
  4. Run: npm run validate-content`);
