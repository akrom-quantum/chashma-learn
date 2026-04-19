// src/content/ielts/reading/guides/index.js
// Registers IELTS Reading question-type guides (Shape 3).
// Mirrors the book manifest pattern from books/unified-grammar/index.js.

import MultipleChoice from "./multiple-choice.jsx";

const GUIDES = {
  id: "ielts-reading-guides",
  product: "ielts",
  subject: "reading",
  title: "IELTS Reading Question Types",
  description:
    "Strategy guides for the 14 question types used in IELTS Academic Reading.",

  // Keyed by slug; order drives display on the guides directory page.
  items: {
    "multiple-choice": {
      id: "multiple-choice",
      order: 1,
      meta: MultipleChoice.meta,
      tocItems: MultipleChoice.tocItems,
      TopicContent: MultipleChoice.TopicContent,
      status: "published",
    },
    // Add remaining 13 guides here as they are converted from MDX drafts:
    // "true-false-not-given": { ... },
    // "yes-no-not-given": { ... },
    // "matching-information": { ... },
    // "matching-headings": { ... },
    // "matching-features": { ... },
    // "matching-sentence-endings": { ... },
    // "sentence-completion": { ... },
    // "summary-completion": { ... },
    // "note-completion": { ... },
    // "table-completion": { ... },
    // "flow-chart-completion": { ... },
    // "diagram-label-completion": { ... },
    // "short-answer-questions": { ... },
  },
};

export default GUIDES;
