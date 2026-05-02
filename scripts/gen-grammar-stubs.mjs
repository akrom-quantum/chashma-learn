// Generates MDX + exercises.json stubs for all 49 Grammar units.
// Unit 1 (be-forms-and-uses) already has full content — skipped if exists.
// Run: node scripts/gen-grammar-stubs.mjs

import { mkdirSync, writeFileSync, existsSync } from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "src/content/general-english/grammar");

const UNITS = [
  // [unitNum, sectionId, folderName, slug, title, level, cefr, minutes]
  [1,  "section-01-be-and-have",            "01-be-forms-and-uses",                         "be-forms-and-uses",                           "BE: Forms and Uses",                                    "A2",    ["A2"],       30],
  [2,  "section-01-be-and-have",            "02-there-is-there-are",                         "there-is-there-are",                          "There Is / There Are",                                  "A2",    ["A2"],       25],
  [3,  "section-01-be-and-have",            "03-have-main-verb-auxiliary",                   "have-main-verb-auxiliary",                    "HAVE: Main Verb and Auxiliary",                         "A2",    ["A2"],       25],
  [4,  "section-02-present-tenses",         "04-present-simple-forms-and-use",               "present-simple-forms-and-use",                "Present Simple: Forms and Use",                         "A2",    ["A2"],       30],
  [5,  "section-02-present-tenses",         "05-present-continuous-forms-and-use",           "present-continuous-forms-and-use",            "Present Continuous: Forms and Use",                     "A2",    ["A2"],       30],
  [6,  "section-02-present-tenses",         "06-present-simple-vs-continuous",               "present-simple-vs-continuous",                "Present Simple vs Continuous",                          "A2",    ["A2"],       35],
  [7,  "section-03-future",                 "07-going-to-present-continuous-future",         "going-to-present-continuous-future",          "Going To and Present Continuous for Future",            "A2-B1", ["A2","B1"],  30],
  [8,  "section-03-future",                 "08-will-predictions-decisions-promises",        "will-predictions-decisions-promises",         "Will: Predictions, Decisions, Promises",                "A2-B1", ["A2","B1"],  30],
  [9,  "section-03-future",                 "09-future-perfect-continuous-other",            "future-perfect-continuous-other",             "Future Perfect, Continuous and Other Forms",            "B1",    ["B1"],       35],
  [10, "section-04-past-tenses",            "10-past-simple-forms-and-use",                  "past-simple-forms-and-use",                   "Past Simple: Forms and Use",                            "A2",    ["A2"],       30],
  [11, "section-04-past-tenses",            "11-past-continuous-forms-and-use",              "past-continuous-forms-and-use",               "Past Continuous: Forms and Use",                        "A2",    ["A2"],       25],
  [12, "section-05-perfect-tenses",         "12-present-perfect-introduction",               "present-perfect-introduction",                "Present Perfect: Introduction",                         "B1",    ["B1"],       35],
  [13, "section-05-perfect-tenses",         "13-present-perfect-vs-past-simple",             "present-perfect-vs-past-simple",              "Present Perfect vs Past Simple",                        "B1",    ["B1"],       40],
  [14, "section-05-perfect-tenses",         "14-present-perfect-continuous",                 "present-perfect-continuous",                  "Present Perfect Continuous",                            "B1",    ["B1"],       30],
  [15, "section-05-perfect-tenses",         "15-past-perfect-simple-and-continuous",         "past-perfect-simple-and-continuous",          "Past Perfect: Simple and Continuous",                   "B1",    ["B1"],       35],
  [16, "section-06-modal-verbs",            "16-must-have-to-obligation-deduction",          "must-have-to-obligation-deduction",           "Must and Have To: Obligation and Deduction",            "B1",    ["B1"],       35],
  [17, "section-06-modal-verbs",            "17-can-could-may-might-ability-possibility",    "can-could-may-might-ability-possibility",     "Can, Could, May, Might: Ability and Possibility",       "B1",    ["B1"],       35],
  [18, "section-06-modal-verbs",            "18-should-ought-had-better-would-used-to",      "should-ought-had-better-would-used-to",       "Should, Ought To, Had Better, Would, Used To",          "B1",    ["B1"],       35],
  [19, "section-07-passives",               "19-passive-forms-across-tenses",                "passive-forms-across-tenses",                 "Passive: Forms Across Tenses",                          "B1",    ["B1"],       35],
  [20, "section-07-passives",               "20-passive-advanced-structures",                "passive-advanced-structures",                 "Passive: Advanced Structures",                          "B1",    ["B1"],       35],
  [21, "section-08-questions-negatives",    "21-question-formation",                         "question-formation",                          "Question Formation",                                    "A2",    ["A2"],       30],
  [22, "section-08-questions-negatives",    "22-negatives",                                  "negatives",                                   "Negatives",                                             "A2",    ["A2"],       25],
  [23, "section-09-infinitives-ing",        "23-infinitive-uses-and-patterns",               "infinitive-uses-and-patterns",                "Infinitive: Uses and Patterns",                         "B1",    ["B1"],       35],
  [24, "section-09-infinitives-ing",        "24-ing-form-uses-and-patterns",                 "ing-form-uses-and-patterns",                  "-ING Form: Uses and Patterns",                          "B1",    ["B1"],       35],
  [25, "section-09-infinitives-ing",        "25-infinitive-vs-ing-core-problem",             "infinitive-vs-ing-core-problem",              "Infinitive vs -ING: The Core Problem",                  "B1",    ["B1"],       40],
  [26, "section-10-special-verb-structures","26-phrasal-verbs-and-prepositions",             "phrasal-verbs-and-prepositions",              "Phrasal Verbs and Prepositions",                        "B1",    ["B1"],       35],
  [27, "section-10-special-verb-structures","27-verbs-two-objects-causative",                "verbs-two-objects-causative",                 "Verbs with Two Objects and Causative Structures",       "B1",    ["B1"],       35],
  [28, "section-11-articles",               "28-a-an-uses-and-patterns",                     "a-an-uses-and-patterns",                      "A/An: Uses and Patterns",                               "B1",    ["B1"],       30],
  [29, "section-11-articles",               "29-the-uses-and-special-cases",                 "the-uses-and-special-cases",                  "The: Uses and Special Cases",                           "B1",    ["B1"],       35],
  [30, "section-12-determiners",            "30-some-any-much-many-a-lot-of",                "some-any-much-many-a-lot-of",                 "Some, Any, Much, Many, A Lot Of",                       "B1",    ["B1"],       30],
  [31, "section-12-determiners",            "31-all-every-each-both-either-neither",         "all-every-each-both-either-neither",          "All, Every, Each, Both, Either, Neither",               "B1",    ["B1"],       35],
  [32, "section-13-pronouns-possessives",   "32-personal-pronouns-and-possessives",          "personal-pronouns-and-possessives",           "Personal Pronouns and Possessives",                     "A2",    ["A2"],       25],
  [33, "section-14-nouns",                  "33-countable-uncountable-nouns",                "countable-uncountable-nouns",                 "Countable and Uncountable Nouns",                       "B1",    ["B1"],       30],
  [34, "section-14-nouns",                  "34-noun-forms-plurals-possessives",             "noun-forms-plurals-possessives",              "Noun Forms: Plurals and Possessives",                   "A2-B1", ["A2","B1"],  25],
  [35, "section-15-adjectives-adverbs",     "35-adjectives-position-and-order",              "adjectives-position-and-order",               "Adjectives: Position and Order",                        "B1",    ["B1"],       30],
  [36, "section-15-adjectives-adverbs",     "36-adverbs-types-position-use",                 "adverbs-types-position-use",                  "Adverbs: Types, Position, Use",                         "B1",    ["B1"],       30],
  [37, "section-16-comparison",             "37-comparative-and-superlative-forms",          "comparative-and-superlative-forms",           "Comparative and Superlative Forms",                     "A2-B1", ["A2","B1"],  30],
  [38, "section-17-conjunctions",           "38-coordinating-subordinating-conjunctions",    "coordinating-subordinating-conjunctions",     "Coordinating and Subordinating Conjunctions",           "B1",    ["B1"],       30],
  [39, "section-18-conditionals",           "39-zero-and-first-conditional",                 "zero-and-first-conditional",                  "Zero and First Conditional",                            "B1",    ["B1"],       35],
  [40, "section-18-conditionals",           "40-second-and-third-conditional",               "second-and-third-conditional",                "Second and Third Conditional",                          "B1-B2", ["B1","B2"],  35],
  [41, "section-18-conditionals",           "41-wish-if-only-its-time-id-rather",            "wish-if-only-its-time-id-rather",             "Wish, If Only, It's Time, I'd Rather",                  "B2",    ["B2"],       35],
  [42, "section-19-relative-clauses",       "42-defining-relative-clauses",                  "defining-relative-clauses",                   "Defining Relative Clauses",                             "B1",    ["B1"],       30],
  [43, "section-19-relative-clauses",       "43-non-defining-and-reduced-relatives",         "non-defining-and-reduced-relatives",          "Non-Defining and Reduced Relative Clauses",             "B1-B2", ["B1","B2"],  35],
  [44, "section-20-indirect-speech",        "44-reported-statements-and-questions",          "reported-statements-and-questions",           "Reported Statements and Questions",                     "B1",    ["B1"],       35],
  [45, "section-20-indirect-speech",        "45-reporting-verbs",                            "reporting-verbs",                             "Reporting Verbs",                                       "B1-B2", ["B1","B2"],  30],
  [46, "section-21-prepositions",           "46-prepositions-of-time-and-place",             "prepositions-of-time-and-place",              "Prepositions of Time and Place",                        "A2-B1", ["A2","B1"],  30],
  [47, "section-21-prepositions",           "47-verb-adjective-noun-preposition-collocations","verb-adjective-noun-preposition-collocations","Verb, Adjective and Noun + Preposition Collocations",  "B1",    ["B1"],       35],
  [48, "section-22-spoken-grammar",         "48-question-tags-and-short-answers",            "question-tags-and-short-answers",             "Question Tags and Short Answers",                       "B1-B2", ["B1","B2"],  30],
  [49, "section-22-spoken-grammar",         "49-ellipsis-so-neither-spoken-structure",       "ellipsis-so-neither-spoken-structure",        "Ellipsis, So/Neither and Spoken Structure",             "B2",    ["B2"],       30],
];

let created = 0;
let skipped = 0;

for (const [unitNum, section, folder, slug, title, level, cefr, minutes] of UNITS) {
  const dir = path.join(ROOT, section, folder);
  const mdxPath = path.join(dir, "lesson.mdx");
  const exPath  = path.join(dir, "exercises.json");

  mkdirSync(dir, { recursive: true });

  // MDX stub
  if (!existsSync(mdxPath)) {
    const cefrYaml = JSON.stringify(cefr);
    const mdx = `---
title: "${title}"
slug: ${slug}
book: general-english
section: ${section}
unit: ${unitNum}
level: ${level}
cefr: ${cefrYaml}
estimatedMinutes: ${minutes}
tags: []
premium: false
---

## Overview

Content for **${title}** coming soon.

<Callout type="note">
This unit is a stub. Full lesson content will be added in a future update.
</Callout>
`;
    writeFileSync(mdxPath, mdx);
    created++;
  } else {
    skipped++;
  }

  // exercises.json stub
  if (!existsSync(exPath)) {
    const ex = JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2);
    writeFileSync(exPath, ex);
    created++;
  } else {
    skipped++;
  }
}

console.log(`Done. Created ${created} files, skipped ${skipped} (already exist).`);
