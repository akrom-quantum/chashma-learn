// src/content/ielts/reading/topics/_meta.js
// Relational metadata about topic categories. Individual topic metadata
// (title, level, tags, vocabIndex, etc.) lives in each MDX file's frontmatter
// and is auto-scanned by registry.js.

export const topicsMeta = {
  // The 18 category labels, descriptions, and UI info.
  categories: [
    {
      id: "natural-sciences",
      label: "Natural Sciences",
      description:
        "Physics, chemistry, biology, and earth sciences. High frequency on Academic Reading.",
      difficulty: "hard",
      frequency: "high",
      order: 1,
    },
    {
      id: "social-sciences",
      label: "Social Sciences",
      description:
        "Sociology, anthropology, political science, economics research. Often discursive passages.",
      difficulty: "hard",
      frequency: "high",
      order: 2,
    },
    {
      id: "history",
      label: "History",
      description:
        "Historical events, archaeological findings, and historiographical debates.",
      difficulty: "medium",
      frequency: "high",
      order: 3,
    },
    {
      id: "technology",
      label: "Technology",
      description:
        "Innovation, engineering, computing, and the societal impact of technology.",
      difficulty: "medium",
      frequency: "high",
      order: 4,
    },
    {
      id: "environment",
      label: "Environment",
      description:
        "Climate change, conservation, sustainability, and ecological systems.",
      difficulty: "medium",
      frequency: "very-high",
      order: 5,
    },
    {
      id: "health-medicine",
      label: "Health & Medicine",
      description:
        "Medical research, public health, diseases, and healthcare systems.",
      difficulty: "hard",
      frequency: "high",
      order: 6,
    },
    {
      id: "education",
      label: "Education",
      description:
        "Learning research, pedagogy, educational systems, and literacy.",
      difficulty: "medium",
      frequency: "medium",
      order: 7,
    },
    {
      id: "business-economics",
      label: "Business & Economics",
      description:
        "Economic theory, trade, labour markets, and organisational behaviour.",
      difficulty: "hard",
      frequency: "medium",
      order: 8,
    },
    {
      id: "arts-culture",
      label: "Arts & Culture",
      description:
        "Visual arts, music, literature, film, and cultural movements.",
      difficulty: "medium",
      frequency: "medium",
      order: 9,
    },
    {
      id: "psychology",
      label: "Psychology",
      description:
        "Cognitive science, behaviour, developmental psychology, and mental health.",
      difficulty: "hard",
      frequency: "medium",
      order: 10,
    },
    {
      id: "language-linguistics",
      label: "Language & Linguistics",
      description:
        "Language evolution, acquisition, endangered languages, and communication.",
      difficulty: "medium",
      frequency: "medium",
      order: 11,
    },
    {
      id: "architecture-design",
      label: "Architecture & Design",
      description:
        "Built environments, urban planning, industrial and product design.",
      difficulty: "medium",
      frequency: "medium",
      order: 12,
    },
    {
      id: "sports-leisure",
      label: "Sports & Leisure",
      description:
        "Athletic performance, leisure industries, games, and recreation.",
      difficulty: "easy",
      frequency: "low",
      order: 13,
    },
    {
      id: "food-agriculture",
      label: "Food & Agriculture",
      description:
        "Farming methods, food science, global food systems, and nutrition.",
      difficulty: "medium",
      frequency: "medium",
      order: 14,
    },
    {
      id: "transport-travel",
      label: "Transport & Travel",
      description:
        "Transport systems, tourism, exploration, and infrastructure.",
      difficulty: "easy",
      frequency: "medium",
      order: 15,
    },
    {
      id: "space-astronomy",
      label: "Space & Astronomy",
      description:
        "Astronomy, space exploration, planetary science, and cosmology.",
      difficulty: "hard",
      frequency: "medium",
      order: 16,
    },
    {
      id: "archaeology",
      label: "Archaeology",
      description:
        "Ancient civilisations, excavations, and the study of material culture.",
      difficulty: "medium",
      frequency: "high",
      order: 17,
    },
    {
      id: "animals-biology",
      label: "Animals & Biology",
      description:
        "Animal behaviour, evolution, biodiversity, and ecological interactions.",
      difficulty: "medium",
      frequency: "high",
      order: 18,
    },
  ],

  // Which categories to promote on the subject hub's "featured topics" block.
  // Based on real IELTS test frequency.
  featured: [
    "environment",
    "natural-sciences",
    "history",
    "archaeology",
    "animals-biology",
  ],

  // Difficulty legend for UI.
  difficultyMeta: {
    easy: { label: "Easier", band: "5.5-6.5" },
    medium: { label: "Moderate", band: "6.0-7.0" },
    hard: { label: "Challenging", band: "6.5-8.0" },
  },
};

export default topicsMeta;
