// src/content/registry.js
// Single source of truth for every piece of content on the platform.
// Every page component imports from here; never from individual subject files directly.

import * as products from "./products.js";

// ---------- Subject manifests ----------
// As subjects get built, register them here. Keeping imports at the top prevents
// circular dependencies and makes the registry visible at a glance.

import grammarSubject from "./english/grammar/subject.js";
import unifiedGrammar from "./english/grammar/books/unified-grammar/index.js";

import owsSubject from "./english/oxford-word-skills/subject.js";
import unifiedWordSkills from "./english/oxford-word-skills/books/unified-word-skills/index.js";

// IELTS Reading — Phase 1
import ieltsReadingSubject from "./ielts/reading/subject.js";
import ieltsReadingGuides from "./ielts/reading/guides/index.js";
import ieltsReadingNaturalSciences from "./ielts/reading/topics/natural-sciences/index.js";

// ---------- Registry ----------

const SUBJECTS = {
  "english/grammar": grammarSubject,
  "english/oxford-word-skills": owsSubject,
  "ielts/reading": ieltsReadingSubject,
};

const BOOKS = {
  "english/grammar/unified-grammar": unifiedGrammar,
  "english/oxford-word-skills/unified-word-skills": unifiedWordSkills,
};

// Topic categories, keyed by "product/subject/category".
// Each category manifest contains a `topics` map keyed by topic slug.
const TOPIC_CATEGORIES = {
  "ielts/reading/natural-sciences": ieltsReadingNaturalSciences,
  // Future categories register here as they are built:
  // "ielts/reading/history": ieltsReadingHistory,
  // "ielts/reading/environment": ieltsReadingEnvironment,
  // ...
};

// Guide collections, keyed by "product/subject".
// Each guide collection contains an `items` map keyed by guide slug.
const GUIDE_COLLECTIONS = {
  "ielts/reading": ieltsReadingGuides,
};

const TESTS = {};
const INDEX_LISTS = {};

// ---------- Accessors ----------

export function getProduct(productId) {
  return products.PRODUCTS[productId] || null;
}

export function getSubject(product, subject) {
  return SUBJECTS[`${product}/${subject}`] || null;
}

export function getBook(product, subject, book) {
  return BOOKS[`${product}/${subject}/${book}`] || null;
}

export function getUnit(product, subject, book, unitId) {
  const b = getBook(product, subject, book);
  if (!b) return null;
  return b.units?.[unitId] || null;
}

// Topic accessors — Shape 2
export function getTopicCategory(product, subject, category) {
  return TOPIC_CATEGORIES[`${product}/${subject}/${category}`] || null;
}

export function getTopic(product, subject, category, topic) {
  const cat = getTopicCategory(product, subject, category);
  if (!cat) return null;
  return cat.topics?.[topic] || null;
}

// Guide accessors — Shape 3
export function getGuideCollection(product, subject) {
  return GUIDE_COLLECTIONS[`${product}/${subject}`] || null;
}

export function getGuide(product, subject, guide) {
  const collection = getGuideCollection(product, subject);
  if (!collection) return null;
  return collection.items?.[guide] || null;
}

// Test accessors — Shape 4
export function getTest(product, subject, testId) {
  return TESTS[`${product}/${subject}/${testId}`] || null;
}

// Index-list accessors — Shape 5
export function getIndexList(product, subject, listId) {
  return INDEX_LISTS[`${product}/${subject}/${listId}`] || null;
}

export function getIndexItem(product, subject, listId, itemId) {
  const list = getIndexList(product, subject, listId);
  return list?.items?.[itemId] || null;
}

// ---------- Bulk accessors (for directory pages) ----------

export function listSubjectsForProduct(productId) {
  const product = getProduct(productId);
  if (!product) return [];
  return product.subjects.map(s => getSubject(productId, s)).filter(Boolean);
}

export function listBooksForSubject(product, subject) {
  const prefix = `${product}/${subject}/`;
  return Object.entries(BOOKS)
    .filter(([k]) => k.startsWith(prefix))
    .map(([, v]) => v);
}

export function listUnitsForBook(product, subject, book) {
  const b = getBook(product, subject, book);
  return b?.units ? Object.values(b.units) : [];
}

// Topic bulk accessors
export function listTopicCategoriesForSubject(product, subject) {
  const prefix = `${product}/${subject}/`;
  return Object.entries(TOPIC_CATEGORIES)
    .filter(([k]) => k.startsWith(prefix))
    .map(([, v]) => v)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function listTopicsInCategory(product, subject, category) {
  const cat = getTopicCategory(product, subject, category);
  return cat?.topics ? Object.values(cat.topics) : [];
}

// Guide bulk accessors
export function listGuidesForSubject(product, subject) {
  const collection = getGuideCollection(product, subject);
  return collection?.items ? Object.values(collection.items) : [];
}

export function listTestsForSubject(product, subject) {
  const prefix = `${product}/${subject}/`;
  return Object.entries(TESTS)
    .filter(([k]) => k.startsWith(prefix))
    .map(([, v]) => v);
}

// Used by drill mode to build the runtime question index
export function listAllQuestionsForSubject(product, subject) {
  const tests = listTestsForSubject(product, subject);
  const questions = [];
  for (const test of tests) {
    for (const passage of test.passages) {
      for (const q of passage.questions) {
        questions.push({
          ...q,
          testId: test.id,
          passageId: passage.id,
          product,
          subject,
        });
      }
    }
  }
  return questions;
}
