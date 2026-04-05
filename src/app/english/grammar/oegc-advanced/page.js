"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth, onAuthStateChanged,
  browserLocalPersistence, setPersistence,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

/* ─── Firebase ─────────────────────────────────────────── */
const firebaseConfig = {
  apiKey:            "AIzaSyBD65CTP7Tx84l-qL-KT9pj3uMUOsLOCI4",
  authDomain:        "chashma-learn.firebaseapp.com",
  projectId:         "chashma-learn",
  storageBucket:     "chashma-learn.firebasestorage.app",
  messagingSenderId: "1059701555295",
  appId:             "1:1059701955295:web:104a64e41d60252a28dbea",
};
const app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db   = getFirestore(app, "chashma-learn");

/* ─── Book data — Advanced ──────────────────────────────── */
const bookData = {
  id:      "oegc-advanced",
  title:   "Oxford English Grammar Course",
  level:   "Advanced",
  authors: "Michael Swan & Catherine Walter",
  cover:   "/books/oegc-advanced.jpg",

  /**
   * The Advanced book has two structural layers not present in Basic/Intermediate:
   *  1. Two top-level PARTS  (Part 1 — Word and Sentence Grammar / Part 2 — Grammar Beyond the Sentence)
   *  2. Within Part 1, sections follow the familiar subsection→unit pattern.
   *     Part 2 is a single unnumbered block whose items are grouped into named clusters.
   *
   * We model this as:
   *   section.part  — "1" | "2"   (used for the part-divider banner)
   *   section.id / num / title / icon  — same as before
   *   section.subsections[].title / units[]  — same as before
   *
   * Part 2 is represented as a single "section" (id: "part2") with subsections
   * mapping to its named clusters and units mapping to the 26 individual items.
   */
  parts: [
    { id: "part-1", label: "Part 1 — Word and Sentence Grammar" },
    { id: "part-2", label: "Part 2 — Grammar Beyond the Sentence" },
  ],

  sections: [
    /* ── PART 1 ────────────────────────────────────────── */
    {
      id: "section-01", num: "01", title: "Basic Sentence Types", icon: "🔤", part: "1",
      subsections: [
        { title: "Core Topics", units: [
          { num: "1",  label: "Introduction" },
          { num: "2",  label: "Questions: revise the basics" },
          { num: "3",  label: "Negatives: revise the basics" },
          { num: "4",  label: "not and no" },
          { num: "5",  label: "Negative questions" },
          { num: "6",  label: "More about negatives" },
          { num: "7",  label: "Imperatives" },
          { num: "8",  label: "let's; let me etc" },
          { num: "9",  label: "Exclamations: revise the basics" },
        ]},
        { title: "Review", units: [
          { num: "10", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-02", num: "02", title: "be, have and do", icon: "🔵", part: "1",
      subsections: [
        { title: "Core Topics", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "be: progressive forms; do be" },
          { num: "3", label: "there is: revise the basics" },
          { num: "4", label: "there is: more complex structures" },
          { num: "5", label: "have: revise the basics" },
          { num: "6", label: "do: emphasis" },
        ]},
      ],
    },
    {
      id: "section-03", num: "03", title: "Present and Future", icon: "🕐", part: "1",
      subsections: [
        { title: "Present Tenses", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Present tenses: revise the basics" },
          { num: "3", label: "Instructions, commentaries, stories" },
          { num: "4", label: "More about present tenses" },
          { num: "5", label: "Non-progressive verbs" },
        ]},
        { title: "Future Forms", units: [
          { num: "6",  label: "Future: revise the basics: will, going to or present progressive?" },
          { num: "7",  label: "More about the present progressive, going to and will" },
          { num: "8",  label: "be + infinitive: I am to … etc" },
          { num: "9",  label: "Future progressive" },
          { num: "10", label: "Future perfect" },
          { num: "11", label: "Future in the past" },
        ]},
        { title: "Review", units: [
          { num: "12", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-04", num: "04", title: "Past and Perfect Tenses", icon: "⏪", part: "1",
      subsections: [
        { title: "Past Tenses", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Simple past and past progressive: revise the basics" },
          { num: "3", label: "Present perfect and simple past: revise the basics" },
          { num: "4", label: "Present perfect progressive: revise the basics" },
          { num: "5", label: "Simple past and present perfect: summary" },
          { num: "6", label: "More about simple past and past progressive" },
          { num: "7", label: "More about the present perfect" },
          { num: "8", label: "More about the present perfect progressive" },
        ]},
        { title: "Past Perfect", units: [
          { num: "9",  label: "Past perfect: revise the basics" },
          { num: "10", label: "More about the past perfect: time conjunctions" },
          { num: "11", label: "Past perfect progressive" },
          { num: "12", label: "This is the first time etc" },
        ]},
        { title: "Review", units: [
          { num: "13", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-05", num: "05", title: "Modal Verbs", icon: "🎛️", part: "1",
      subsections: [
        { title: "Core Modals", units: [
          { num: "1",  label: "Introduction" },
          { num: "2",  label: "Modals: revise the basics" },
          { num: "3",  label: "Ability: can and could" },
          { num: "4",  label: "Permission: can, could, may and might" },
          { num: "5",  label: "Obligation: must and have (got) to" },
          { num: "6",  label: "Obligation: should and ought to" },
          { num: "7",  label: "Certainty: must, can't, will, should" },
          { num: "8",  label: "Probability and possibility: may, might, can, could" },
          { num: "9",  label: "may have gone, should have told etc" },
          { num: "10", label: "had better" },
          { num: "11", label: "be supposed to" },
          { num: "12", label: "will and would: willingness; typical behaviour" },
          { num: "13", label: "used to" },
          { num: "14", label: "need" },
        ]},
        { title: "Review", units: [
          { num: "15", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-06", num: "06", title: "Passives", icon: "🔄", part: "1",
      subsections: [
        { title: "Core Topics", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Revise the basics" },
          { num: "3", label: "Reasons for using passives" },
          { num: "4", label: "Complex passive structures" },
          { num: "5", label: "Other advanced points" },
        ]},
        { title: "Review", units: [
          { num: "6", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-07", num: "07", title: "Infinitives and -ing Forms", icon: "∞", part: "1",
      subsections: [
        { title: "Infinitives", units: [
          { num: "1",  label: "Introduction" },
          { num: "2",  label: "Revise the basics" },
          { num: "3",  label: "Perfect infinitives and -ing forms" },
          { num: "4",  label: "Infinitive without to" },
          { num: "5",  label: "Verb + infinitive" },
          { num: "6",  label: "Verb + -ing form" },
          { num: "7",  label: "Verb + object + infinitive or -ing form" },
          { num: "8",  label: "Infinitive and -ing form both possible" },
          { num: "9",  label: "phone calls to make; nothing to eat" },
          { num: "10", label: "Infinitive with its own subject: for … to …" },
          { num: "11", label: "to …ing" },
          { num: "12", label: "Determiners with -ing forms: my speaking etc" },
        ]},
        { title: "Review", units: [
          { num: "13", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-08", num: "08", title: "Various Structures with Verbs", icon: "⚙️", part: "1",
      subsections: [
        { title: "Core Topics", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Verbs with object + adjective/noun complement" },
          { num: "3", label: "Revise the basics: verbs with prepositions and adverb particles" },
          { num: "4", label: "More about prepositional verbs" },
          { num: "5", label: "More about phrasal verbs" },
          { num: "6", label: "Verbs with two objects" },
          { num: "7", label: "Some causative structures with have, get and make" },
        ]},
        { title: "Review", units: [
          { num: "8", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-09", num: "09", title: "Nouns and Pronouns", icon: "🏷️", part: "1",
      subsections: [
        { title: "Nouns", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Countable and uncountable" },
          { num: "3", label: "Mixed singular and plural" },
          { num: "4", label: "Noun + noun or preposition structure" },
          { num: "5", label: "Possessive structure or other structure" },
          { num: "6", label: "Nouns for activities: using have, make, do etc" },
          { num: "7", label: "A note on gender: he, she or it?" },
          { num: "8", label: "Structures after nouns" },
        ]},
        { title: "Pronouns", units: [
          { num: "9",  label: "Personal pronouns" },
          { num: "10", label: "Reflexives (myself etc); each other / one another" },
          { num: "11", label: "one, you and they (general meaning)" },
          { num: "12", label: "Singular they" },
          { num: "13", label: "one(s)" },
        ]},
        { title: "Review", units: [
          { num: "14", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-10", num: "10", title: "Determiners (1): Articles, Demonstratives & Possessives", icon: "📝", part: "1",
      subsections: [
        { title: "Articles", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Articles: preliminary note" },
          { num: "3", label: "Articles: revise the basics" },
          { num: "4", label: "More about generalising with a/an and the" },
          { num: "5", label: "Articles: other points" },
          { num: "6", label: "Demonstratives: this, that, these, those" },
          { num: "7", label: "Possessives: my, mine etc" },
        ]},
        { title: "Review", units: [
          { num: "8", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-11", num: "11", title: "Determiners (2): Quantifiers", icon: "🗂️", part: "1",
      subsections: [
        { title: "Quantifiers", units: [
          { num: "1",  label: "Introduction" },
          { num: "2",  label: "all" },
          { num: "3",  label: "whole and all" },
          { num: "4",  label: "both" },
          { num: "5",  label: "either and neither" },
          { num: "6",  label: "every and each" },
          { num: "7",  label: "some, any, no, none: revise the basics" },
          { num: "8",  label: "some/any or no article" },
          { num: "9",  label: "More about some" },
          { num: "10", label: "More about any and no" },
          { num: "11", label: "much, many, more and most" },
          { num: "12", label: "little, few, less, fewer, least and fewest" },
          { num: "13", label: "enough" },
          { num: "14", label: "Quantifying phrases" },
          { num: "15", label: "of with quantifiers" },
        ]},
        { title: "Review", units: [
          { num: "16", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-12", num: "12", title: "Adjectives, Adverbs and Comparison", icon: "✨", part: "1",
      subsections: [
        { title: "Adjectives", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Adjective or adverb?" },
          { num: "3", label: "Adjectives: order" },
          { num: "4", label: "Position of adjectives" },
          { num: "5", label: "Participles used as adjectives" },
          { num: "6", label: "Adjectives without nouns" },
          { num: "7", label: "Structures after adjectives" },
        ]},
        { title: "Adverbs", units: [
          { num: "8", label: "Adverb position (1)" },
          { num: "9", label: "Adverb position (2): with the verb" },
        ]},
        { title: "Comparison", units: [
          { num: "10", label: "Comparison: as … as" },
          { num: "11", label: "-er and -est or more and most?" },
          { num: "12", label: "Double comparative structures" },
          { num: "13", label: "More about comparatives" },
          { num: "14", label: "More about superlatives" },
          { num: "15", label: "much, far etc with comparatives and superlatives" },
          { num: "16", label: "much in affirmative sentences?" },
          { num: "17", label: "such and so" },
          { num: "18", label: "like and as" },
        ]},
        { title: "Review", units: [
          { num: "19", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-13", num: "13", title: "Prepositions", icon: "📍", part: "1",
      subsections: [
        { title: "Core Topics", units: [
          { num: "1",  label: "Introduction" },
          { num: "2",  label: "Time: revise the basics" },
          { num: "3",  label: "in and on (place): revise the basics" },
          { num: "4",  label: "at (place and movement): revise the basics" },
          { num: "5",  label: "Prepositions with -ing forms" },
          { num: "6",  label: "End-position of prepositions" },
          { num: "7",  label: "Prepositions before conjunctions" },
          { num: "8",  label: "Six confusable prepositions" },
          { num: "9",  label: "Six more confusable prepositions" },
        ]},
        { title: "Review", units: [
          { num: "10", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-14", num: "14", title: "Conjunctions, Clauses and Tenses", icon: "🔗", part: "1",
      subsections: [
        { title: "Core Topics", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Conjunctions: revise the basics" },
          { num: "3", label: "and and or" },
          { num: "4", label: "Double conjunctions: both …and; (n)either … (n)or" },
          { num: "5", label: "Tense simplification after conjunctions" },
          { num: "6", label: "Past tense with present or future meaning" },
        ]},
        { title: "Review", units: [
          { num: "7", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-15", num: "15", title: "Adjective (Relative) Clauses", icon: "🔁", part: "1",
      subsections: [
        { title: "Core Topics", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Relatives: revise the basics" },
          { num: "3", label: "Identifying and non-identifying relative clauses" },
          { num: "4", label: "Reduced relative clauses" },
          { num: "5", label: "Prepositions in relative clauses" },
          { num: "6", label: "Relatives: other points" },
        ]},
        { title: "Review", units: [
          { num: "7", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-16", num: "16", title: "Noun Clauses", icon: "💬", part: "1",
      subsections: [
        { title: "Indirect Speech", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "Indirect speech: revise the basics" },
          { num: "3", label: "Indirect speech: more about tenses" },
          { num: "4", label: "Indirect speech: other points" },
        ]},
        { title: "that-Clauses", units: [
          { num: "5", label: "Verbs in that-clauses: subjunctives" },
          { num: "6", label: "Verbs in that-clauses: should" },
          { num: "7", label: "More about that-clauses" },
          { num: "8", label: "More about question-word clauses" },
          { num: "9", label: "Preparatory it" },
        ]},
        { title: "Review", units: [
          { num: "10", label: "More practice" },
        ]},
      ],
    },
    {
      id: "section-17", num: "17", title: "Adverb Clauses", icon: "🔀", part: "1",
      subsections: [
        { title: "Conditionals", units: [
          { num: "1", label: "Introduction" },
          { num: "2", label: "if: how many 'conditionals'?" },
          { num: "3", label: "if: revise the basics" },
          { num: "4", label: "unless" },
          { num: "5", label: "if and in case" },
          { num: "6", label: "if: more advanced points" },
          { num: "7", label: "if: informal structures" },
        ]},
        { title: "Other Adverb Clauses", units: [
          { num: "8",  label: "Notes on some conjunctions" },
          { num: "9",  label: "whoever, whatever, wherever etc" },
          { num: "10", label: "Participle clauses" },
          { num: "11", label: "after …ing, on …ing etc" },
          { num: "12", label: "Infinitive clauses" },
        ]},
        { title: "Review", units: [
          { num: "13", label: "More practice" },
        ]},
      ],
    },

    /* ── PART 2 ────────────────────────────────────────── */
    {
      id: "part2-information", num: "P2", title: "Grammar Beyond the Sentence", icon: "🌐", part: "2",
      subsections: [
        { title: "Information Structure", units: [
          { num: "1", label: "Information structure: what comes first?" },
          { num: "2", label: "Information structure: getting the right subject" },
          { num: "3", label: "Pronoun problems" },
          { num: "4", label: "Linking clauses with conjunctions and adverbs" },
        ]},
        { title: "Word Order & Emphasis", units: [
          { num: "5", label: "Special word order: fronting" },
          { num: "6", label: "Special word order: inversion" },
          { num: "7", label: "Emphasis: it … that" },
          { num: "8", label: "Emphasis: what … is/was" },
        ]},
        { title: "Discourse & Complex Sentences", units: [
          { num: "9",  label: "Discourse markers" },
          { num: "10", label: "Reading complicated sentences" },
          { num: "11", label: "Complex noun phrases in writing" },
          { num: "12", label: "Mixed structures" },
        ]},
        { title: "Ellipsis", units: [
          { num: "13", label: "Ellipsis after auxiliaries" },
          { num: "14", label: "Ellipsis with infinitives" },
          { num: "15", label: "Ellipsis with so and not" },
          { num: "16", label: "Ellipsis after and, but and or" },
          { num: "17", label: "Ellipsis at the beginning of spoken sentences" },
        ]},
        { title: "Spoken Grammar", units: [
          { num: "18", label: "The structure of spoken sentences" },
          { num: "19", label: "Short answers, reply questions and question tags" },
          { num: "20", label: "Three kinds of spoken question" },
          { num: "21", label: "Politeness: using questions" },
          { num: "22", label: "Politeness: being indirect" },
          { num: "23", label: "Emphasis in speech: stress" },
          { num: "24", label: "Repetition" },
          { num: "25", label: "Abbreviated styles" },
          { num: "26", label: "News headlines" },
        ]},
      ],
    },
  ],
};

const FREE_SECTIONS = 3;

/* ─── Palette ────────────────────────────────────────────── */
const palette = {
  "1": [
    { accent: "#0369a1", bg: "#f0f9ff", border: "#bae6fd", text: "#0c4a6e", numBg: "#dbeafe" },
    { accent: "#7c3aed", bg: "#faf5ff", border: "#ede9fe", text: "#4c1d95", numBg: "#ede9fe" },
    { accent: "#b91c1c", bg: "#fff1f2", border: "#fecdd3", text: "#881337", numBg: "#fee2e2" },
    { accent: "#0f766e", bg: "#f0fdfa", border: "#99f6e4", text: "#134e4a", numBg: "#ccfbf1" },
    { accent: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", text: "#14532d", numBg: "#dcfce7" },
    { accent: "#64748b", bg: "#f8fafc", border: "#e2e8f0", text: "#1e293b", numBg: "#f1f5f9" },
    { accent: "#b45309", bg: "#fffbeb", border: "#fde68a", text: "#78350f", numBg: "#fef3c7" },
    { accent: "#dc2626", bg: "#fef2f2", border: "#fecaca", text: "#7f1d1d", numBg: "#fee2e2" },
    { accent: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", text: "#1e3a8a", numBg: "#dbeafe" },
    { accent: "#c2410c", bg: "#fff7ed", border: "#fed7aa", text: "#7c2d12", numBg: "#ffedd5" },
    { accent: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", text: "#164e63", numBg: "#cffafe" },
    { accent: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", text: "#312e81", numBg: "#e0e7ff" },
    { accent: "#059669", bg: "#f0fdf4", border: "#d1fae5", text: "#065f46", numBg: "#d1fae5" },
    { accent: "#9333ea", bg: "#fdf4ff", border: "#e9d5ff", text: "#581c87", numBg: "#f3e8ff" },
    { accent: "#db2777", bg: "#fdf2f8", border: "#fbcfe8", text: "#831843", numBg: "#fce7f3" },
    { accent: "#ca8a04", bg: "#fefce8", border: "#fef08a", text: "#713f12", numBg: "#fef9c3" },
    { accent: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", text: "#14532d", numBg: "#dcfce7" },
  ],
  /* Part 2 gets a distinctive deep-indigo treatment */
  "2": [
    { accent: "#312e81", bg: "#eef2ff", border: "#c7d2fe", text: "#1e1b4b", numBg: "#e0e7ff" },
  ],
};

function getPalette(section, sectionIndexWithinPart) {
  const pool = palette[section.part] || palette["1"];
  return pool[sectionIndexWithinPart % pool.length];
}

/* ─── Helpers ────────────────────────────────────────────── */
function countUnits(section) {
  return section.subsections.reduce((a, s) => a + s.units.length, 0);
}

/* ─── Part divider banner ────────────────────────────────── */
function PartDivider({ label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      margin: "32px 0 18px",
    }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
      <span style={{
        fontSize: "11px", fontWeight: 800, letterSpacing: "1px",
        textTransform: "uppercase", color: "#6b7280",
        whiteSpace: "nowrap",
        padding: "4px 14px",
        backgroundColor: "#f3f4f6",
        borderRadius: "999px",
        border: "1px solid #e5e7eb",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
    </div>
  );
}

/* ─── SubsectionBlock ────────────────────────────────────── */
function SubsectionBlock({ sub, sc, locked }) {
  const isReview = sub.title === "Review";
  return (
    <div style={{ marginBottom: "13px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
        <div style={{
          width: "3px", height: "13px", borderRadius: "2px", flexShrink: 0,
          backgroundColor: locked ? "#d1d5db" : isReview ? "#cbd5e1" : sc.accent,
        }} />
        <span style={{
          fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: locked ? "#c4c4c4" : isReview ? "#94a3b8" : sc.accent,
        }}>
          {sub.title}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "10px" }}>
        {sub.units.map((unit) => (
          <div key={unit.num} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <div style={{
              minWidth: "22px", height: "18px", borderRadius: "4px", flexShrink: 0,
              marginTop: "1px",
              backgroundColor: locked ? "#f3f4f6" : isReview ? "#f1f5f9" : sc.numBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", fontWeight: 800,
              color: locked ? "#9ca3af" : isReview ? "#64748b" : sc.text,
            }}>
              {unit.num}
            </div>
            <span style={{
              fontSize: "12px", lineHeight: 1.5,
              color: locked ? "#c4c4c4" : isReview ? "#6b7280" : "#374151",
              fontStyle: isReview ? "italic" : "normal",
            }}>
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── GRID CARD ─────────────────────────────────────────── */
function GridCard({ section, sc, locked, href }) {
  const isPart2 = section.part === "2";
  return (
    <Link
      href={href}
      style={{
        display: "flex", flexDirection: "column",
        backgroundColor: "#ffffff",
        border: `1px solid ${locked ? "#e5e7eb" : sc.border}`,
        borderRadius: "14px", overflow: "hidden",
        textDecoration: "none",
        opacity: locked ? 0.58 : 1,
        cursor: locked ? "not-allowed" : "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.18s, transform 0.18s",
        /* Part 2 card spans full width in grid */
        gridColumn: isPart2 ? "1 / -1" : undefined,
      }}
      onMouseEnter={(e) => {
        if (!locked) {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* ── Card header ── */}
      <div style={{
        backgroundColor: locked ? "#f9fafb" : sc.bg,
        borderBottom: `1px solid ${locked ? "#f3f4f6" : sc.border}`,
        padding: "14px 16px 12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              minWidth: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
              backgroundColor: locked ? "#e5e7eb" : sc.numBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isPart2 ? "9px" : "11px", fontWeight: 800, letterSpacing: "-0.3px",
              color: locked ? "#9ca3af" : sc.text,
              padding: isPart2 ? "0 6px" : "0",
            }}>
              {isPart2 ? "PART 2" : section.num}
            </div>
            <span style={{ fontSize: "18px" }}>{section.icon}</span>
          </div>
          {locked
            ? <span style={{ fontSize: "14px" }}>🔒</span>
            : !isPart2 && parseInt(section.num) <= FREE_SECTIONS
              ? <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>FREE</span>
              : null
          }
        </div>
        <h2 style={{ fontSize: "13px", fontWeight: 800, margin: "0 0 3px", lineHeight: 1.3, color: locked ? "#9ca3af" : sc.text }}>
          {isPart2 ? section.title : `Section ${section.num}: ${section.title}`}
        </h2>
        <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          {section.subsections.filter(s => s.title !== "Review").length} subsections · {countUnits(section)} lessons
        </p>
      </div>

      {/* ── Subsections ── */}
      <div style={{
        padding: "14px 16px 4px", flex: 1,
        display: isPart2 ? "grid" : "block",
        gridTemplateColumns: isPart2 ? "repeat(auto-fill, minmax(240px, 1fr))" : undefined,
        gap: isPart2 ? "0 28px" : undefined,
      }}>
        {section.subsections.map((sub, i) => (
          <SubsectionBlock key={i} sub={sub} sc={sc} locked={locked} />
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: "10px 16px",
        borderTop: `1px solid ${locked ? "#f3f4f6" : sc.border}`,
        backgroundColor: locked ? "#f9fafb" : sc.bg,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: locked ? "#9ca3af" : sc.accent }}>
          {locked ? "Locked" : "Open section"}
        </span>
        {!locked && <span style={{ fontSize: "16px", color: sc.accent }}>→</span>}
      </div>
    </Link>
  );
}

/* ─── HORIZONTAL ROW ─────────────────────────────────────── */
function HorizontalRow({ section, sc, locked, href }) {
  const [open, setOpen] = useState(false);
  const isPart2 = section.part === "2";

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: `1px solid ${open && !locked ? sc.border : "#e5e7eb"}`,
      borderRadius: "12px", overflow: "hidden",
      opacity: locked ? 0.58 : 1,
      transition: "border-color 0.2s",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 20px",
        backgroundColor: open && !locked ? sc.bg : "#ffffff",
        transition: "background-color 0.2s",
      }}>
        <div style={{
          minWidth: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
          backgroundColor: locked ? "#e5e7eb" : sc.numBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isPart2 ? "8px" : "12px", fontWeight: 800,
          color: locked ? "#9ca3af" : sc.text,
          padding: isPart2 ? "0 4px" : "0",
        }}>
          {isPart2 ? "PART 2" : section.num}
        </div>
        <span style={{ fontSize: "20px", flexShrink: 0 }}>{section.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: locked ? "#9ca3af" : sc.text, margin: 0, lineHeight: 1.3 }}>
            {isPart2 ? section.title : section.title}
          </p>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
            {section.subsections.filter(s => s.title !== "Review").length} subsections · {countUnits(section)} lessons
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {!locked && !isPart2 && parseInt(section.num) <= FREE_SECTIONS && (
            <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>
              FREE
            </span>
          )}
          {locked
            ? <span style={{ fontSize: "15px" }}>🔒</span>
            : (
              <>
                <button
                  onClick={(e) => { e.preventDefault(); setOpen(v => !v); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    fontSize: "11px", fontWeight: 700,
                    color: open ? sc.text : sc.accent,
                    backgroundColor: open ? sc.numBg : "#f9fafb",
                    border: `1px solid ${open ? sc.border : "#e5e7eb"}`,
                    borderRadius: "6px", padding: "5px 11px",
                    cursor: "pointer", whiteSpace: "nowrap",
                    transition: "all 0.15s",
                  }}
                >
                  {open ? "Hide lessons" : "Show lessons"}
                  <span style={{
                    fontSize: "9px", display: "inline-block",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}>▼</span>
                </button>
                <Link
                  href={href}
                  style={{
                    fontSize: "11px", fontWeight: 700,
                    color: "#ffffff", backgroundColor: sc.accent,
                    borderRadius: "6px", padding: "5px 13px",
                    textDecoration: "none", whiteSpace: "nowrap",
                  }}
                >
                  Open →
                </Link>
              </>
            )
          }
        </div>
      </div>

      {open && !locked && (
        <div style={{
          borderTop: `1px solid ${sc.border}`,
          padding: "16px 20px 16px 70px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "0 28px",
          backgroundColor: "#fafafa",
        }}>
          {section.subsections.map((sub, i) => (
            <SubsectionBlock key={i} sub={sub} sc={sc} locked={false} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────── */
export default function OEGCAdvancedPage() {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout]   = useState("grid");

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          setRole(snap.exists() ? snap.data().role : "viewer");
        } catch { setRole("viewer"); }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsub();
    });
  }, []);

  const isLearner = role === "learner" || role === "admin" || role === "owner";

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>Loading…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const totalLessons = bookData.sections.reduce((a, s) => a + countUnits(s), 0);

  /* Build per-section palette index scoped to each part */
  const part1Sections = bookData.sections.filter(s => s.part === "1");
  const part2Sections = bookData.sections.filter(s => s.part === "2");

  function getSc(section) {
    const partSections = section.part === "1" ? part1Sections : part2Sections;
    const idx = partSections.findIndex(s => s.id === section.id);
    return getPalette(section, idx);
  }

  function isLocked(section, si) {
    /* Only Part 1 sections participate in the free / locked gating */
    if (section.part === "2") return !isLearner;
    return !isLearner && si >= FREE_SECTIONS;
  }

  function getHref(section) {
    const sc = section.part === "2" ? "part2" : section.id;
    return `/english/grammar/oegc-advanced/${sc}`;
  }

  /* Render sections grouped by part, with dividers */
  function renderGrid() {
    const elements = [];
    let lastPart = null;
    let part1CardIndex = 0; // track index within Part 1 for lock logic

    bookData.sections.forEach((section) => {
      if (section.part !== lastPart) {
        const partMeta = bookData.parts.find(p => p.id === `part-${section.part}`);
        if (partMeta) {
          /* Close the current grid before inserting divider */
          if (lastPart !== null) {
            elements.push(<div key={`grid-end-${lastPart}`} style={{ display: "contents" }} />);
          }
          elements.push(<PartDivider key={`divider-${section.part}`} label={partMeta.label} />);
        }
        lastPart = section.part;
      }

      const sc     = getSc(section);
      const si     = section.part === "1" ? part1CardIndex++ : 99;
      const locked = isLocked(section, si);
      const href   = locked ? "#" : getHref(section);

      elements.push(
        <GridCard key={section.id} section={section} sc={sc} locked={locked} href={href} />
      );
    });

    return elements;
  }

  function renderList() {
    const elements = [];
    let lastPart = null;
    let part1CardIndex = 0;

    bookData.sections.forEach((section) => {
      if (section.part !== lastPart) {
        const partMeta = bookData.parts.find(p => p.id === `part-${section.part}`);
        if (partMeta) elements.push(<PartDivider key={`divider-${section.part}`} label={partMeta.label} />);
        lastPart = section.part;
      }

      const sc     = getSc(section);
      const si     = section.part === "1" ? part1CardIndex++ : 99;
      const locked = isLocked(section, si);
      const href   = locked ? "#" : getHref(section);

      elements.push(
        <HorizontalRow key={section.id} section={section} sc={sc} locked={locked} href={href} />
      );
    });

    return elements;
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.96)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english/grammar" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Grammar</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>OEGC Advanced</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── BOOK HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "36px" }}>
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "1px solid #d1d5db" }}>
            <img src={bookData.cover} alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📙</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#fef3c7", color: "#92400e", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              ADVANCED
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px", flexWrap: "wrap" }}>
              {[
                { val: "17 + Part 2", label: "Sections" },
                { val: totalLessons,  label: "Total lessons" },
                { val: FREE_SECTIONS, label: "Free sections", highlight: true },
              ].map(({ val, label, highlight }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: highlight ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(FREE_SECTIONS / part1Sections.length) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                {FREE_SECTIONS} of {part1Sections.length} Part 1 sections unlocked
              </span>
            </div>
          </div>
        </div>

        {/* ── UPGRADE BANNER ── */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 20px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, lineHeight: 1.5 }}>
              Sections 1–{FREE_SECTIONS} are free.{" "}
              <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link>
              {" "}to unlock all sections including Part 2.
            </p>
          </div>
        )}

        {/* ── LAYOUT TOGGLE ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, margin: 0 }}>
            {part1Sections.length} Sections · Part 2 · {totalLessons} Total lessons
          </p>
          <div style={{ display: "flex", backgroundColor: "#f3f4f6", borderRadius: "8px", padding: "3px", gap: "2px" }}>
            {[
              { key: "grid",       icon: "⊞", label: "Grid" },
              { key: "horizontal", icon: "☰", label: "List" },
            ].map(({ key, icon, label }) => (
              <button key={key} onClick={() => setLayout(key)} style={{
                fontSize: "12px", fontWeight: 700,
                padding: "5px 14px", borderRadius: "6px",
                border: "none", cursor: "pointer",
                backgroundColor: layout === key ? "#ffffff" : "transparent",
                color: layout === key ? "#064e3b" : "#6b7280",
                boxShadow: layout === key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: "5px",
              }}>
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID LAYOUT ── */}
        {layout === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
            {renderGrid()}
          </div>
        )}

        {/* ── HORIZONTAL LAYOUT ── */}
        {layout === "horizontal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {renderList()}
          </div>
        )}

        {/* ── BOTTOM CTA ── */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>
              Unlock all sections including Part 2
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to all 17 grammar sections and the complete Grammar Beyond the Sentence module.
            </p>
            <Link href="/dashboard" style={{ display: "inline-block", backgroundColor: "#059669", color: "#ffffff", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}>
              Upgrade to Learner
            </Link>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
