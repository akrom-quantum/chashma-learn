# IELTS Reading — Topics Update

Drop contents into `src/content/ielts/reading/`. Merges with existing `overview.mdx`, `subject.js`, and `guides/*.mdx` from phase-1 bundle.

## What's included

**Meta files (2):**
- `guides/_meta.js` — relational metadata for the 14 guides (groups, priorities, study hours, related-guide links)
- `topics/_meta.js` — 18 category definitions with difficulty, frequency, display order, and featured list

**Topic files (14 of 36 planned):**

| Category | Topics |
|---|---|
| natural-sciences | `dark-matter`, `periodic-table` |
| social-sciences | `dunbars-number`, `urban-density` |
| history | `silk-road`, `printing-press` |
| technology | `ai-training-data`, `lithium-batteries` |
| environment | `coral-bleaching`, `urban-trees` |
| health-medicine | `antibiotic-resistance`, `sleep-research` |
| education | `montessori-method`, `forgetting-curve` |
| business-economics | `sharing-economy`, `fair-trade` |

## What's pending (22 topic files, 11 categories)

Not yet drafted — to be added in a later session:

- arts-culture
- psychology
- language-linguistics
- architecture-design
- sports-leisure
- food-agriculture
- transport-travel
- space-astronomy
- archaeology
- animals-biology

The category directories and `_meta.js` entries are already defined, so adding topic MDX files later requires no structural changes — just drop the MDX into the right folder.

## Topic file structure

Each topic file follows:

```
---
title: "..."
level: "B2-C1"
time: "15 min"
category: "..."           # matches topics/_meta.js category id
tags: [...]
vocabIndex: "...-vocab"   # reserved for future Shape 5 index list
estimatedBand: "6.5-7.5"
---

# Title

## Passage
[700-900 word IELTS-style passage]

## Key Vocabulary
[15-19 targeted terms with brief definitions]

## Collocations to Note
[8-12 phrases]
```

Vocabulary is listed as markdown (per your decision) — `<VocabCard>` component wiring comes later. When the component is live, the vocab lists can be converted with a simple regex codemod.

## Validation note

The build-time validation (`scripts/validate-content.mjs` from phase 0) should pass on these files. Frontmatter follows your schema from architecture §4. No `[[wiki-links]]` in topic files yet — those will be added when Shape 5 vocabulary index lists are built in a later phase.

## Next steps

Phase 1 checklist from architecture §10:

- [x] Subject hub (`overview.mdx`)
- [x] Question-type guides ×14 (Shape 3)
- [ ] Topic categories ×18 with topic MDX files (Shape 2) — **39% complete (14/36)**
- [ ] Practice Test engine (full mode)
- [ ] Single-question mode
- [ ] Drill mode
- [ ] Attempts tracking + analytics dashboard
- [ ] Bookmarks

Ready to pick up from any of these in the next session. Share Obsidian test markdown whenever you want the test engine work to begin.
