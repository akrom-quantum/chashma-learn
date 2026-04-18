# Chashma Learn — Universal Architecture

**Purpose:** one model that handles every content shape across General English, IELTS, and SAT so we never re-architect.
**Audience:** you, me, any future Claude chat.
**Status:** v1 — approved to build against.

---

## 1. The Five Content Shapes

Every page on the platform is one of these. Nothing else exists.

| # | Shape | Example | Route template |
|---|---|---|---|
| 1 | **Book-Unit** | Grammar Unit 1, OWS Unit 1, Writing Unit 3 | `/[product]/[subject]/[book]/[unit]` |
| 2 | **Topic-Page** | IELTS Reading "Climate Change", SAT Vocab "Human Character" | `/[product]/[subject]/topics/[category]/[topic]` |
| 3 | **Guide-Page** | "How to solve Matching Headings", "How to tackle Bar Charts" | `/[product]/[subject]/guides/[guide]` |
| 4 | **Practice-Test** | IELTS Reading Test 12, SAT Math Module 1 Test 4 | `/[product]/[subject]/tests/[test]` — three modes |
| 5 | **Index-List** | Vocabulary cards list, Phrasal Verbs A-Z | `/[product]/[subject]/index/[list]` |

Everything else (overview pages, book-contents pages, subject hubs) is a **directory page** — auto-generated from registries, not authored.

---

## 2. Universal Routing

```
/[product]                          → product hub (general | ielts | sat)
/[product]/[subject]                → subject hub (overview + children)
/[product]/[subject]/books/[book]   → book contents (unit list)
/[product]/[subject]/books/[book]/[unit]
                                    → Book-Unit (shape 1)
/[product]/[subject]/topics         → topics directory (categories)
/[product]/[subject]/topics/[category]/[topic]
                                    → Topic-Page (shape 2)
/[product]/[subject]/guides         → guides directory
/[product]/[subject]/guides/[guide] → Guide-Page (shape 3)
/[product]/[subject]/tests          → tests directory (filters + bookmarks)
/[product]/[subject]/tests/[test]   → test detail (start/resume)
/[product]/[subject]/tests/[test]/take
                                    → test-taking interface
/[product]/[subject]/drill          → drill setup (pick type, count)
/[product]/[subject]/drill/session/[sessionId]
                                    → drill session (20 questions by type)
/[product]/[subject]/index/[list]   → Index-List (shape 5)
/[product]/[subject]/index/[list]/[item]
                                    → individual item (vocab word, phrasal verb)
```

**Why `/books/` and `/topics/` segments?** So the `[book]` slug can't collide with `topics`, `guides`, `tests`, `drill`, `index`. Today's route `/english/grammar/unified-grammar/unit-1` becomes `/english/grammar/books/unified-grammar/unit-1`. This is a breaking change — we do it once.

**Product slugs:** `english`, `ielts`, `sat`. Current `/english/...` stays.

---

## 3. Content Registry (single source of truth)

Every piece of content is registered in `src/content/registry.js`. This is the one file that every page queries.

```
src/content/
├── registry.js                 ← master index
├── products.js                 ← { english, ielts, sat } with their subjects
│
├── english/
│   ├── grammar/
│   │   ├── books/unified-grammar/
│   │   │   ├── index.js        ← book manifest
│   │   │   ├── unit-1.mdx
│   │   │   └── unit-2.mdx
│   │   └── subject.js          ← subject manifest
│   │
│   ├── oxford-word-skills/
│   │   ├── books/unified-word-skills/
│   │   │   ├── index.js
│   │   │   └── unit-1.mdx
│   │   ├── index/ows-vocabulary/
│   │   │   ├── manifest.js     ← list metadata
│   │   │   └── items/          ← individual word files
│   │   └── subject.js
│   │
│   ├── writing/ ...
│   ├── vocabulary/ ...
│   └── ... (all 9 Gen-English subjects)
│
├── ielts/
│   ├── listening/
│   │   ├── guides/             ← 7 question-type guides (shape 3)
│   │   │   ├── multiple-choice.mdx
│   │   │   ├── map-labeling.mdx
│   │   │   └── ...
│   │   ├── topics/             ← 4 parts × categories (shape 2)
│   │   │   ├── part-1/
│   │   │   │   ├── accommodation.mdx
│   │   │   │   ├── travel.mdx
│   │   │   │   └── ...
│   │   │   └── part-4/ ...
│   │   ├── tests/              ← JSON practice tests (shape 4)
│   │   │   ├── test-001.json
│   │   │   └── ...
│   │   └── subject.js
│   │
│   ├── reading/ ... (same shape)
│   ├── writing/ ...
│   └── speaking/ ...
│
└── sat/
    ├── reading-writing/
    │   ├── guides/             ← 11 question types
    │   ├── topics/             ← by domain
    │   ├── tests/
    │   └── subject.js
    ├── math/ ...
    └── vocabulary/
        ├── topics/             ← 21 categories
        └── affixes/            ← 12 categories
```

---

## 4. Authoring Format: MDX

**Every content file is MDX.** Markdown you write in Obsidian, dropped into `.mdx`, compiles to a React component at build time.

### Obsidian → MDX conversion rules

Handled by a single preprocessor (`src/lib/mdx-obsidian.js`) so you don't change how you write:

| Obsidian | MDX output |
|---|---|
| `> [!tip] Title\n> body` | `<Callout type="tip" title="Title">body</Callout>` |
| `> [!warning]`, `[!info]`, `[!example]`, `[!quote]`, `[!abstract]`, `[!success]`, `[!failure]`, `[!danger]`, `[!note]` | same — 10 callout types already exist |
| `[[Some Page]]` | `<WikiLink to="some-page">Some Page</WikiLink>` |
| `==highlight==` | `<mark>highlight</mark>` |
| GFM tables | `<Table>` wrapper (horizontal scroll) |
| Frontmatter | `export const meta = {...}` |

### Standard frontmatter for every file

```mdx
---
title: "Climate Change"
level: "B2-C1"           # CEFR or SAT/IELTS band
time: "15 min"           # reading time
category: "natural-sciences"
tags: ["environment", "science"]
vocabIndex: "climate-change-vocab"  # optional, links to Index-List
audio: "/audio/topics/climate-change.mp3"  # optional, for listening
---

## Section 1
> [!tip] Key insight
> Write normally.

<VocabCard word="anthropogenic" def="caused by humans" />
```

### Available inline components (all already exist or trivial to add)

`<Callout>`, `<Table>`, `<VocabCard>`, `<AudioPlayer>`, `<QuizInline>`, `<Image>`, `<YouTube>`, `<Highlight>`, `<WikiLink>`.

---

## 5. Practice Test Schema (JSON)

One file per test. Validated on build via Zod.

```json
{
  "id": "ielts-reading-test-001",
  "product": "ielts",
  "subject": "reading",
  "type": "full-test",                  // full-test | section | mini
  "title": "IELTS Academic Reading Test 1",
  "difficulty": "standard",             // standard | hard
  "status": "free",                     // free | premium
  "timeLimit": 3600,                    // seconds
  "passages": [
    {
      "id": "p1",
      "title": "The Rise of Modern Farming",
      "body": "...",                    // markdown
      "questions": [
        {
          "id": "q1",
          "type": "multiple-choice",    // one of the 14 IELTS Reading types
          "prompt": "...",
          "options": ["A", "B", "C", "D"],
          "answer": "B",
          "explanation": "...",
          "skill": "inference",         // tag for analytics
          "difficulty": 3               // 1-5
        }
      ]
    }
  ]
}
```

### Why JSON not MDX for tests

- Same question object powers full-test, single-question, and drill modes — no duplication.
- Type-safe, validatable on build (catch missing answers before deploy).
- Filterable: drill mode queries `questions.where(type == 'matching-headings')` across all tests.
- Reusable: question can appear in multiple drills without copying.

### Conversion path for your Obsidian tests

You send me the `.md` files. I write a **one-time converter script** (`scripts/convert-tests.js`) that parses your markdown test format into JSON. Runs locally, commits the JSON files.

---

## 6. Three Practice Modes — one engine

| Mode | Route | Source | Scoring |
|---|---|---|---|
| Full Test | `/tests/[testId]/take` | Load full test JSON | Timed, graded at end |
| Single Question | `/tests/[testId]/q/[qId]` | Load one question from test | Instant feedback |
| Drill | `/drill/session/[sessionId]` | Runtime-built from filter (type + count) | Adaptive, instant feedback |

**The drill engine pulls questions across all tests** via the master question index (`src/lib/questionIndex.js`, built at startup from all test JSONs). Filter by: product, subject, question type, difficulty, skill tag, unseen-only, previously-incorrect-only.

---

## 7. Firestore Schema — tracking everything

### Existing collections (keep as-is)
`users`, `groups`, `assignments`, `progress` — already fine.

### New collections

```
attempts/{attemptId}
  uid, testId (nullable — null for drill), sessionId (nullable — drill only),
  mode: "full" | "single" | "drill",
  startedAt, completedAt, totalTimeSec,
  score: { correct, total, percent, band? },
  product, subject                       // denormalized for queries

attempts/{attemptId}/answers/{questionId}
  questionId, selected, correct (bool),
  timeSec, attemptNumber (1st try, 2nd try...),
  skill, type, difficulty                // denormalized for analytics

bookmarks/{uid}/items/{bookmarkId}
  refType: "test" | "question" | "topic" | "unit" | "guide",
  refId, product, subject, title, bookmarkedAt

drillSessions/{sessionId}
  uid, filters: { product, subject, type, count, difficulty? },
  questionIds: [...],                    // frozen at session start
  status: "active" | "completed" | "abandoned",
  createdAt
```

### Why subcollections for `answers`

One attempt has 40+ answers. Subcollection keeps the parent doc small and enables efficient per-question queries ("show me every time uid X answered matching-headings wrong"). Critical for spaced repetition later.

### Cost sanity-check

40-question test = 1 attempt doc + 40 answer docs = 41 writes ≈ $0.000007. Even 1000 students doing 10 tests/month = $7/month. Safe.

---

## 8. Universal Page Shell

Every content-rendering page uses the same shell:

```
<PageShell>
  <TopNav />
  <Breadcrumb />
  <Layout>
    <LeftSidebar />              {/* product/subject nav — toggleable */}
    <Main>
      <TabBar />                 {/* Topic | Practice | (Index) */}
      <ContentArea />            {/* renders MDX or TestRunner */}
    </Main>
    <RightSidebar />             {/* TOC — sticky, toggleable */}
  </Layout>
  <CompletionBar />              {/* Mark as Read | Mark as Done */}
</PageShell>
```

Shape differences (Book-Unit has Practice tab, Topic-Page has Vocab-Index tab when `vocabIndex` frontmatter present, Guide-Page has no tabs) are **flags on the shell**, not separate layouts.

---

## 9. Build-Time Validation

Runs on `npm run build`. Fails the build if:
- Any MDX file has invalid frontmatter (missing title/level)
- Any test JSON has a question without an answer, or answer not in options
- Any WikiLink or vocabIndex points to non-existent slug
- Registry has duplicate IDs

One script: `scripts/validate-content.mjs`. This is how the platform stays coherent at scale.

---

## 10. Implementation Phases

### Phase 0 — Foundation (what I do first)
1. Migrate routes to new pattern (`/books/` prefix)
2. Install MDX + build Obsidian preprocessor
3. Build universal `PageShell` + `ContentRenderer`
4. Build `registry.js` + `products.js`
5. Write Zod schemas + `validate-content.mjs`
6. Firestore: add new collections, update rules
7. Migrate existing 3 units to new structure
8. Fix known issues from handover doc (unified-grammar cleanup, rules deploy, mobile CSS)

### Phase 1 — Prove with IELTS Reading (the full vertical)
1. Subject hub + overview
2. All 14 question-type guides (Shape 3)
3. All 18 topic categories × topics (Shape 2)
4. Practice Test engine (full mode)
5. Single-question mode
6. Drill mode
7. Attempts tracking + analytics dashboard
8. Bookmarks

### Phase 2 — Replicate to remaining subjects
IELTS Listening → IELTS Writing → IELTS Speaking → SAT R&W → SAT Math → SAT Vocab → Gen-English subjects.
Each takes ~30% of the effort of IELTS Reading because the engine is built.

### Phase 3 — Premium features
Spaced repetition (data already tracked) · Weakness dashboard · Certificates · Study streaks · AI-powered writing feedback (you already have API-in-artifacts capability baked into stack).

---

## 11. What NOT to build (yet)

- CMS / admin content editor — Obsidian + git is your CMS.
- Per-topic forum/comments — noise, not learning.
- Gamification badges — build after 100+ real students.
- Mobile app — PWA-ify the web first (Phase 3).

---

## 12. Breaking changes this introduces

1. URL change: `/english/grammar/unified-grammar/unit-1` → `/english/grammar/books/unified-grammar/unit-1`. Redirects handled in `next.config.js`.
2. `.jsx` unit files → `.mdx`. One-time migration of 3 files.
3. Old `UnitClient.js` deleted. Generic `PageShell` replaces it.
4. `src/content/index.js` → `src/content/registry.js` with new shape.

All breaking changes happen in Phase 0, single PR, before any new content is written.
