// src/content/english/oxford-word-skills/books/unified-word-skills/index.js
import Unit1 from "../../../../oxford-word-skills/unified-word-skills/unit-1.jsx";

const BOOK = {
  id: "unified-word-skills",
  product: "english",
  subject: "oxford-word-skills",
  title: "Unified Word Skills",
  description: "Merged Oxford Word Skills — Elementary, Intermediate, and Upper-Intermediate/Advanced.",
  source: [
    "Oxford Word Skills - Elementary - Gairns & Redman",
    "Oxford Word Skills - Intermediate - Gairns & Redman",
    "Oxford Word Skills - Upper-Intermediate & Advanced - Gairns & Redman",
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
  },
};

export default BOOK;
