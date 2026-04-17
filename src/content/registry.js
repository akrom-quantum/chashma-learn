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

// ---------- Registry ----------
const SUBJECTS = {
  "english/grammar": grammarSubject,
  "english/oxford-word-skills": owsSubject,
};

const BOOKS = {
  "english/grammar/unified-grammar": unifiedGrammar,
  "english/oxford-word-skills/unified-word-skills": unifiedWordSkills,
};

const TOPICS = {};       // Populated as Phase 1+ content lands
const GUIDES = {};
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

export function getTopic(product, subject, category, topic) {
  return TOPICS[`${product}/${subject}/${category}/${topic}`] || null;
}

export function getGuide(product, subject, guide) {
  return GUIDES[`${product}/${subject}/${guide}`] || null;
}

export function getTest(product, subject, testId) {
  return TESTS[`${product}/${subject}/${testId}`] || null;
}

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
