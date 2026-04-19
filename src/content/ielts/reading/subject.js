// src/content/ielts/reading/subject.js
// Manifest for IELTS Reading subject. Consumed by registry.js + PageShell nav.

export const subject = {
  id: "reading",
  product: "ielts",
  title: "IELTS Reading",
  slug: "reading",
  description:
    "Master all 14 IELTS Academic Reading question types with strategy guides, topic-based practice passages, and full timed tests.",
  hub: "overview.mdx",

  // Left sidebar nav order
  children: [
    { type: "page", slug: "", label: "Overview" },
    { type: "directory", slug: "guides", label: "Question Types" },
    { type: "directory", slug: "topics", label: "Topics" },
    { type: "directory", slug: "tests", label: "Practice Tests" },
    { type: "directory", slug: "drill", label: "Drill" },
  ],

  // Question-type registry — drives /guides index + drill filters + analytics tags
  questionTypes: [
    { id: "multiple-choice", label: "Multiple Choice", order: 1 },
    { id: "true-false-not-given", label: "True / False / Not Given", order: 2 },
    { id: "yes-no-not-given", label: "Yes / No / Not Given", order: 3 },
    { id: "matching-information", label: "Matching Information", order: 4 },
    { id: "matching-headings", label: "Matching Headings", order: 5 },
    { id: "matching-features", label: "Matching Features", order: 6 },
    { id: "matching-sentence-endings", label: "Matching Sentence Endings", order: 7 },
    { id: "sentence-completion", label: "Sentence Completion", order: 8 },
    { id: "summary-completion", label: "Summary Completion", order: 9 },
    { id: "note-completion", label: "Note Completion", order: 10 },
    { id: "table-completion", label: "Table Completion", order: 11 },
    { id: "flow-chart-completion", label: "Flow-chart Completion", order: 12 },
    { id: "diagram-label-completion", label: "Diagram Label Completion", order: 13 },
    { id: "short-answer-questions", label: "Short-answer Questions", order: 14 },
  ],

  // Topic categories (Shape 2 content lives under topics/[category]/[topic].mdx)
  // Populated in Phase 1 step 3 — listed here so registry knows the shape.
  topicCategories: [
    "natural-sciences",
    "social-sciences",
    "history",
    "technology",
    "environment",
    "health-medicine",
    "education",
    "business-economics",
    "arts-culture",
    "psychology",
    "language-linguistics",
    "architecture-design",
    "sports-leisure",
    "food-agriculture",
    "transport-travel",
    "space-astronomy",
    "archaeology",
    "animals-biology",
  ],

  // Band score reference (used by score screens)
  bandScale: {
    40: 9.0, 39: 9.0,
    38: 8.5, 37: 8.5,
    36: 8.0, 35: 8.0,
    34: 7.5, 33: 7.5,
    32: 7.0, 31: 7.0, 30: 7.0,
    29: 6.5, 28: 6.5, 27: 6.5,
    26: 6.0, 25: 6.0, 24: 6.0, 23: 6.0,
    22: 5.5, 21: 5.5, 20: 5.5, 19: 5.5,
    18: 5.0, 17: 5.0, 16: 5.0, 15: 5.0,
    14: 4.5, 13: 4.5,
    12: 4.0, 11: 4.0, 10: 4.0,
    9: 3.5, 8: 3.5,
    7: 3.0, 6: 3.0,
    5: 2.5, 4: 2.5,
    3: 2.0, 2: 2.0,
    1: 1.0, 0: 0.0,
  },
};

export default subject;
