// src/content/english/grammar/books/unified-grammar/index.js
// Wraps the existing content at src/content/grammar/unified-grammar/
// so the new universal registry can access it without moving files.

import Unit1 from "../../../../grammar/unified-grammar/unit-1.jsx";
import Unit2 from "../../../../grammar/unified-grammar/unit-2.jsx";

const BOOK = {
  id: "unified-grammar",
  product: "english",
  subject: "grammar",
  title: "Unified Grammar",
  description: "Merged Oxford Grammar Course — Basic, Intermediate, Advanced.",
  source: [
    "Oxford English Grammar Course - Basic - Swan & Walter",
    "Oxford English Grammar Course - Intermediate - Swan & Walter",
    "Oxford English Grammar Course - Advanced - Swan & Walter",
  ],
  units: {
    "unit-1": {
      id: "unit-1",
      order: 1,
      meta: Unit1.meta,
      tocItems: Unit1.tocItems,
      TopicContent: Unit1.TopicContent,
      PracticeContent: Unit1.PracticeContent,
      status: "published",
    },
    "unit-2": {
      id: "unit-2",
      order: 2,
      meta: Unit2.meta,
      tocItems: Unit2.tocItems,
      TopicContent: Unit2.TopicContent,
      PracticeContent: Unit2.PracticeContent,
      status: "published",
    },
  },
};

export default BOOK;
