#!/usr/bin/env node
// scripts/validate-content.mjs
// Pre-build validator. Fails the build if any content is malformed.
// Run via: npm run validate-content   (add to package.json scripts)

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";
import {
  UnitMetaSchema,
  TopicMetaSchema,
  GuideMetaSchema,
  TestSchema,
  IndexListManifestSchema,
  IndexItemSchema,
} from "../src/lib/schemas.js";

const ROOT = "src/content";
const errors = [];
const warnings = [];
let filesChecked = 0;

function error(msg, file) {
  errors.push(`[${file}] ${msg}`);
}
function warn(msg, file) {
  warnings.push(`[${file}] ${msg}`);
}

// Walk every file under src/content, check based on extension + location
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      walk(full);
      continue;
    }
    const rel = relative(".", full);
    if (entry.endsWith(".mdx")) checkMdx(full, rel);
    else if (entry.endsWith(".json")) checkJson(full, rel);
  }
}

function checkMdx(path, rel) {
  filesChecked++;
  let raw;
  try { raw = readFileSync(path, "utf8"); }
  catch (e) { return error(`Cannot read: ${e.message}`, rel); }

  let parsed;
  try { parsed = matter(raw); }
  catch (e) { return error(`Frontmatter parse failed: ${e.message}`, rel); }

  const fm = parsed.data;
  if (!fm || Object.keys(fm).length === 0) {
    return error("Missing frontmatter", rel);
  }

  // Detect shape by path
  if (rel.includes("/books/")) {
    const result = UnitMetaSchema.safeParse(fm);
    if (!result.success) error(`Unit meta invalid: ${JSON.stringify(result.error.flatten())}`, rel);
  } else if (rel.includes("/topics/")) {
    const result = TopicMetaSchema.safeParse(fm);
    if (!result.success) error(`Topic meta invalid: ${JSON.stringify(result.error.flatten())}`, rel);
  } else if (rel.includes("/guides/")) {
    const result = GuideMetaSchema.safeParse(fm);
    if (!result.success) error(`Guide meta invalid: ${JSON.stringify(result.error.flatten())}`, rel);
  } else {
    warn("Unknown shape — couldn't determine which schema applies", rel);
  }

  // Lightweight content checks
  if (!parsed.content.trim()) warn("Empty content body", rel);
  if (!parsed.content.match(/^#\s/m)) warn("No H1 heading found", rel);
}

function checkJson(path, rel) {
  filesChecked++;
  let raw;
  try { raw = JSON.parse(readFileSync(path, "utf8")); }
  catch (e) { return error(`JSON parse failed: ${e.message}`, rel); }

  // Tests live under tests/ directories
  if (rel.includes("/tests/")) {
    const result = TestSchema.safeParse(raw);
    if (!result.success) {
      error(`Test schema invalid:\n${JSON.stringify(result.error.flatten(), null, 2)}`, rel);
      return;
    }
    // Extra: every answer matches an option (when options exist)
    for (const p of raw.passages) {
      for (const q of p.questions) {
        if (q.options && !q.options.includes(Array.isArray(q.answer) ? q.answer[0] : q.answer)) {
          error(`Q ${q.id}: answer "${q.answer}" is not in options [${q.options.join(", ")}]`, rel);
        }
      }
    }
  } else if (rel.includes("/index/") && rel.endsWith("manifest.json")) {
    const result = IndexListManifestSchema.safeParse(raw);
    if (!result.success) error(`Index manifest invalid: ${JSON.stringify(result.error.flatten())}`, rel);
  } else if (rel.includes("/index/") && rel.includes("/items/")) {
    const result = IndexItemSchema.safeParse(raw);
    if (!result.success) error(`Index item invalid: ${JSON.stringify(result.error.flatten())}`, rel);
  }
}

// Run
if (!existsSync(ROOT)) {
  console.error(`Content root not found: ${ROOT}`);
  process.exit(1);
}

console.log("Validating content...");
walk(ROOT);

console.log(`\nFiles checked: ${filesChecked}`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  warnings.forEach(w => console.log("  " + w));
}
if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  errors.forEach(e => console.error("  " + e));
  process.exit(1);
} else {
  console.log("\n✓ All content valid.");
}
