// src/content/ielts/reading/topics/natural-sciences/index.js
// Registers topics within the natural-sciences category for IELTS Reading (Shape 2).
// One manifest per category, mirroring the book-manifest pattern.

import DarkMatter from "./dark-matter.jsx";

const CATEGORY = {
  id: "natural-sciences",
  product: "ielts",
  subject: "reading",
  title: "Natural Sciences",
  description:
    "Physics, chemistry, biology, and earth sciences. High frequency on Academic Reading.",
  difficulty: "hard",
  frequency: "high",
  order: 1,

  // Keyed by slug; order drives display on the category directory page.
  topics: {
    "dark-matter": {
      id: "dark-matter",
      order: 1,
      meta: DarkMatter.meta,
      tocItems: DarkMatter.tocItems,
      TopicContent: DarkMatter.TopicContent,
      status: "published",
    },
    // Add periodic-table here once converted:
    // "periodic-table": { ... },
  },
};

export default CATEGORY;
