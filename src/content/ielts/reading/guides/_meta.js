// src/content/ielts/reading/guides/_meta.js
// Relational metadata about the set of guides. Page-level metadata (title,
// order, time, level, tags, questionType) lives in each MDX file's frontmatter
// and is auto-scanned by registry.js. This file only holds info that doesn't
// belong on any single page.

export const guidesMeta = {
  // Used by /ielts/reading/guides index page to group guides into sections.
  // A slug can appear in multiple groups (e.g. matching-headings is both
  // "foundation" and "matching").
  groups: [
    {
      id: "foundation",
      label: "Foundation — master these first",
      description:
        "These three question types appear on almost every test and account for the biggest score swings. Start here before anything else.",
      slugs: [
        "matching-headings",
        "true-false-not-given",
        "multiple-choice",
      ],
    },
    {
      id: "matching",
      label: "Matching question types",
      description:
        "Four variations on the same core skill: attributing information to the right location or source.",
      slugs: [
        "matching-information",
        "matching-headings",
        "matching-features",
        "matching-sentence-endings",
      ],
    },
    {
      id: "completion",
      label: "Completion question types",
      description:
        "Fill-in-the-blank tasks. Exact-word transcription from the passage within a word limit.",
      slugs: [
        "sentence-completion",
        "summary-completion",
        "note-completion",
        "table-completion",
        "flow-chart-completion",
        "diagram-label-completion",
      ],
    },
    {
      id: "judgement",
      label: "Judgement question types",
      description:
        "True/False/Not Given and Yes/No/Not Given — deciding what the passage actually says vs what you're assuming.",
      slugs: [
        "true-false-not-given",
        "yes-no-not-given",
      ],
    },
    {
      id: "direct",
      label: "Direct question types",
      description:
        "Multiple Choice and Short-answer — the most straightforward question formats, but still with specific traps.",
      slugs: [
        "multiple-choice",
        "short-answer-questions",
      ],
    },
  ],

  // Priority signals which guides drive the largest score gains.
  // Default for any guide not listed is "medium".
  priorities: {
    "matching-headings": "critical",
    "true-false-not-given": "critical",
    "multiple-choice": "high",
    "summary-completion": "high",
    "matching-information": "high",
    "yes-no-not-given": "high",
    "sentence-completion": "medium",
    "matching-features": "medium",
    "matching-sentence-endings": "medium",
    "note-completion": "medium",
    "table-completion": "medium",
    "flow-chart-completion": "medium",
    "diagram-label-completion": "medium",
    "short-answer-questions": "medium",
  },

  // "If you struggle with X, also study Y" — powers related-guides UI.
  relations: {
    "yes-no-not-given": ["true-false-not-given"],
    "true-false-not-given": ["yes-no-not-given", "multiple-choice"],
    "matching-information": ["matching-headings", "matching-features"],
    "matching-headings": ["matching-information"],
    "matching-features": ["matching-information", "matching-sentence-endings"],
    "matching-sentence-endings": ["sentence-completion", "matching-features"],
    "sentence-completion": ["summary-completion", "matching-sentence-endings"],
    "summary-completion": ["sentence-completion", "note-completion"],
    "note-completion": ["summary-completion", "table-completion"],
    "table-completion": ["note-completion", "flow-chart-completion"],
    "flow-chart-completion": ["table-completion", "diagram-label-completion"],
    "diagram-label-completion": ["flow-chart-completion"],
    "multiple-choice": ["true-false-not-given", "short-answer-questions"],
    "short-answer-questions": ["sentence-completion", "multiple-choice"],
  },

  // Estimated study time per guide in hours — for study-plan features.
  studyHours: {
    "matching-headings": 6,
    "true-false-not-given": 5,
    "yes-no-not-given": 3,
    "multiple-choice": 3,
    "summary-completion": 4,
    "matching-information": 4,
    "matching-features": 2,
    "matching-sentence-endings": 2,
    "sentence-completion": 2,
    "note-completion": 1,
    "table-completion": 1,
    "flow-chart-completion": 1,
    "diagram-label-completion": 1,
    "short-answer-questions": 1,
  },
};

export default guidesMeta;
