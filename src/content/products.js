// src/content/products.js
// Declaration of the three products and their subjects.
// This drives the top-level navigation and product hub pages.

export const PRODUCTS = {
  english: {
    id: "english",
    title: "General English",
    description: "Master English as a language and as a tool for understanding the world.",
    color: "#036c48",
    subjects: [
      "grammar",
      "vocabulary",
      "collocations",
      "idioms",
      "phrasal-verbs",
      "oxford-word-skills",
      "pronunciation",
      "writing",
    ],
  },
  ielts: {
    id: "ielts",
    title: "IELTS",
    description: "Complete preparation for IELTS Academic and General Training.",
    color: "#036c48",
    subjects: [
      "listening",
      "reading",
      "writing",
      "speaking",
    ],
  },
  sat: {
    id: "sat",
    title: "SAT",
    description: "Digital SAT preparation across Reading & Writing, Math, and vocabulary.",
    color: "#036c48",
    subjects: [
      "reading-writing",
      "math",
      "vocabulary",
    ],
  },
};

export function getProductList() {
  return Object.values(PRODUCTS);
}
