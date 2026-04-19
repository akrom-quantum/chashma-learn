// src/lib/schemas.js
// Zod schemas for all content shapes. Used by validate-content.mjs and at runtime.

import { z } from "zod";

// ---------- Shared ----------
export const LevelSchema = z.enum([
  "A1", "A2", "B1", "B2", "C1", "C2",
  "A1-A2", "A2-B1", "B1-B2", "B2-C1", "C1-C2",
  "SAT-Easy", "SAT-Medium", "SAT-Hard",
  "IELTS-4-5", "IELTS-5-6", "IELTS-6-7", "IELTS-7-8", "IELTS-8-9",
]);

export const ProductSchema = z.enum(["english", "ielts", "sat"]);

// ---------- Book-Unit (Shape 1) ----------
export const UnitMetaSchema = z.object({
  title: z.string().min(1),
  level: LevelSchema,
  time: z.string(),           // "15 min"
  questions: z.number().int().nonnegative().optional(),
  tocItems: z.array(z.object({
    id: z.string(),
    label: z.string(),
    level: z.number().int().min(1).max(3),
  })).default([]),
  hasPractice: z.boolean().default(true),
});

// ---------- Topic-Page (Shape 2) ----------
export const TopicMetaSchema = z.object({
  title: z.string().min(1),
  level: LevelSchema,
  time: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  vocabIndex: z.string().optional(),       // slug into Index-List
  audio: z.string().optional(),
  tocItems: z.array(z.object({
    id: z.string(),
    label: z.string(),
    level: z.number().int().min(1).max(3),
  })).default([]),
});

// ---------- Guide-Page (Shape 3) ----------
export const GuideMetaSchema = z.object({
  title: z.string().min(1),
  questionType: z.string(),               // "matching-headings" etc.
  product: ProductSchema,
  subject: z.string(),
  timeToRead: z.string().optional(),
  tocItems: z.array(z.object({
    id: z.string(),
    label: z.string(),
    level: z.number().int().min(1).max(3),
  })).default([]),
});

// ---------- Practice-Test (Shape 4) ----------
const QuestionTypeSchema = z.enum([
  // IELTS Reading
  "multiple-choice", 
  "true-false-notgiven", 
  "yes-no-notgiven",
  "matching-information", 
  "matching-headings", 
  "matching-features",
  "matching-sentence-endings", 
  "sentence-completion", 
  "summary-completion",
  "note-completion", 
  "table-completion", 
  "flowchart-completion",
  "diagram-label-completion", 
  "short-answer",
  // IELTS Listening
  "map-labeling", 
  "form-completion", 
  "plan-labeling",
  // SAT Reading & Writing
  "words-in-context", 
  "command-of-evidence-textual", 
  "command-of-evidence-quantitative",
  "central-ideas-details", 
  "inferences", 
  "text-structure-purpose",
  "cross-text-connections", 
  "transitions", 
  "rhetorical-synthesis",
  "boundaries", 
  "form-structure-sense",
  // SAT Math
  "math-grid-in", 
  "math-multiple-choice",
]);

export const QuestionSchema = z.object({
  id: z.string(),
  type: QuestionTypeSchema,
  prompt: z.string(),
  options: z.array(z.string()).optional(),    // omitted for grid-in / short-answer
  answer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
  skill: z.string().optional(),               // freeform tag: "inference", "main-idea"
  difficulty: z.number().int().min(1).max(5).default(3),
  timeTargetSec: z.number().int().positive().optional(),
});

export const PassageSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  body: z.string(),                           // markdown
  audio: z.string().optional(),               // listening tests
  questions: z.array(QuestionSchema).min(1),
});

export const TestSchema = z.object({
  id: z.string(),
  product: ProductSchema,
  subject: z.string(),
  type: z.enum(["full-test", "section", "mini", "drill-seed"]),
  title: z.string(),
  difficulty: z.enum(["standard", "hard"]).default("standard"),
  status: z.enum(["free", "premium"]).default("free"),
  timeLimit: z.number().int().positive(),     // seconds
  passages: z.array(PassageSchema).min(1),
  createdAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
}).refine(
  (t) => t.passages.every(p => p.questions.every(q =>
    !q.options || (Array.isArray(q.answer)
      ? q.answer.every(a => p.questions.some(() => q.options.includes(a)))
      : q.options.includes(q.answer))
  )),
  { message: "Every question answer must match one of its options when options exist." }
);

// ---------- Index-List (Shape 5) ----------
export const IndexListManifestSchema = z.object({
  id: z.string(),
  title: z.string(),
  itemType: z.enum(["vocab", "phrasal-verb", "idiom", "collocation", "affix"]),
  itemCount: z.number().int().nonnegative(),
  tags: z.array(z.string()).default([]),
});

export const IndexItemSchema = z.object({
  id: z.string(),
  term: z.string(),
  definition: z.string(),
  examples: z.array(z.string()).default([]),
  pronunciation: z.string().optional(),
  partOfSpeech: z.string().optional(),
  related: z.array(z.string()).default([]),      // linked item ids
  difficulty: z.number().int().min(1).max(5).optional(),
});

// ---------- Registry ----------
export const SubjectManifestSchema = z.object({
  id: z.string(),
  product: ProductSchema,
  title: z.string(),
  description: z.string().optional(),
  books: z.array(z.string()).default([]),
  hasTopics: z.boolean().default(false),
  hasGuides: z.boolean().default(false),
  hasTests: z.boolean().default(false),
  hasIndex: z.boolean().default(false),
});

export const ProductManifestSchema = z.object({
  id: ProductSchema,
  title: z.string(),
  subjects: z.array(z.string()),
});
