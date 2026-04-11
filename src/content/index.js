// ─── Global Content Registry ─────────────────────────────────────────────────
// To add a new book:
// 1. Create src/content/[subject]/[book]/index.js
// 2. Import it here and add an entry below
//
// To add a new unit to an existing book:
// 1. Create src/content/[subject]/[book]/unit-N.jsx
// 2. Register it in that book's index.js

import * as unifiedGrammar      from "./grammar/unified-grammar/index";
import * as unifiedWordSkills   from "./oxford-word-skills/unified-word-skills/index";

const REGISTRY = {
  "grammar/unified-grammar":                    unifiedGrammar,
  "oxford-word-skills/unified-word-skills":     unifiedWordSkills,
};

/**
 * Get a specific unit's content.
 * @param {string} subject  - e.g. "grammar"
 * @param {string} book     - e.g. "unified-grammar"
 * @param {string} unitId   - e.g. "unit-1"
 * @returns {{ meta, tocItems, TopicContent, PracticeContent } | null}
 */
export function getUnit(subject, book, unitId) {
  const bookRegistry = REGISTRY[`${subject}/${book}`];
  if (!bookRegistry) return null;
  return bookRegistry.getUnit(unitId) || null;
}
