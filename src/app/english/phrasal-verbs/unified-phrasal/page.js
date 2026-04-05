"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

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

// ─────────────────────────────────────────────────────────────────────────────
// COVERAGE KEYS (kept for data only, not shown in UI)
// ─────────────────────────────────────────────────────────────────────────────
const COVERAGE = {
  BOTH: "both",
  INT:  "int",
  ADV:  "adv",
};

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED BOOK DATA — 88 units across 9 sections
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  title:   "English Phrasal Verbs in Use",
  subtitle: "Unified Edition",
  cover:   "/books/pviu-unified.jpg",
  subject: "phrasal-verbs",
  bookId:  "pviu-unified",
  sections: [
    {
      title: "Section 1 — Learning About Phrasal Verbs (Foundations)",
      units: [
        {
          id: "unit-1",
          title: "Unit 1 — What Phrasal Verbs Are & How They Work",
          coverage: COVERAGE.BOTH,
          focus: ["Definition, structure, and usage patterns of phrasal verbs", "What makes them distinctive from single-word verbs"],
          sources: [
            { label: "PV-Int: Unit 1 — Phrasal verbs: the basics", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-1" },
            { label: "PV-Adv: Unit 1 — Phrasal verbs: what are they and how are they used?", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-1" },
          ],
        },
        {
          id: "unit-2",
          title: "Unit 2 — Meaning of Phrasal Verbs",
          coverage: COVERAGE.BOTH,
          focus: ["How phrasal verbs carry meaning", "Literal vs. idiomatic senses and metaphorical extensions"],
          sources: [
            { label: "PV-Int: Unit 2 — Phrasal verbs: what they mean", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-2" },
            { label: "PV-Adv: Unit 7 — Meaning and metaphor", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-7" },
          ],
        },
        {
          id: "unit-3",
          title: "Unit 3 — Grammar of Phrasal Verbs",
          coverage: COVERAGE.BOTH,
          focus: ["Syntactic behaviour: separability, transitivity, particle placement", "Object positioning rules"],
          sources: [
            { label: "PV-Int: Unit 3 — Particles in phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-3" },
            { label: "PV-Adv: Unit 2 — Grammar of phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-2" },
          ],
        },
        {
          id: "unit-4",
          title: "Unit 4 — Nouns Based on Phrasal Verbs",
          coverage: COVERAGE.BOTH,
          focus: ["How phrasal verbs generate compound nouns (e.g. breakout, takeoff, rundown)", "Grammatical patterns of phrasal nouns"],
          sources: [
            { label: "PV-Int: Unit 4 — Nouns and adjectives based on phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-4" },
            { label: "PV-Adv: Unit 3 — Phrasal nouns", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-3" },
          ],
        },
        {
          id: "unit-5",
          title: "Unit 5 — Adjectives Based on Phrasal Verbs",
          coverage: COVERAGE.BOTH,
          focus: ["Hyphenated and unhyphenated adjectival forms (e.g. worn-out, built-in, laid-back)", "Grammatical and stylistic patterns"],
          sources: [
            { label: "PV-Int: Unit 4 — Nouns and adjectives based on phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-4" },
            { label: "PV-Adv: Unit 4 — Phrasal adjectives", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-4" },
          ],
        },
        {
          id: "unit-6",
          title: "Unit 6 — Register: Formal vs. Informal Use",
          coverage: COVERAGE.BOTH,
          focus: ["When to use phrasal verbs vs. Latinate synonyms", "Formal, informal, and neutral contexts across spoken and written English"],
          sources: [
            { label: "PV-Int: Unit 5 — Metaphor and register", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-5" },
            { label: "PV-Adv: Unit 6 — Register", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-6" },
          ],
        },
        {
          id: "unit-7",
          title: "Unit 7 — Metaphor in Phrasal Verbs",
          coverage: COVERAGE.ADV,
          focus: ["Conceptual metaphors underlying particle meanings (e.g. UP = progress/completion, DOWN = reduction/failure)", "How metaphor creates systematic meaning across verb families"],
          sources: [
            { label: "PV-Adv: Unit 7 — Meaning and metaphor", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-7" },
          ],
        },
        {
          id: "unit-8",
          title: "Unit 8 — Collocation and Phrasal Verbs",
          coverage: COVERAGE.ADV,
          focus: ["Which nouns, adverbs, and adjectives naturally co-occur with specific phrasal verbs", "Building collocational fluency"],
          sources: [
            { label: "PV-Adv: Unit 5 — Collocation and phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-5" },
          ],
        },
        {
          id: "unit-9",
          title: "Unit 9 — Idioms Using Phrasal Verbs",
          coverage: COVERAGE.ADV,
          focus: ["Fixed idiomatic expressions built on phrasal verbs", "The boundary between compositional and non-compositional meanings"],
          sources: [
            { label: "PV-Adv: Unit 8 — Idioms using phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-8" },
          ],
        },
      ],
    },
    {
      title: "Section 2 — Key Particles",
      units: [
        {
          id: "unit-10",
          title: "Unit 10 — UP",
          coverage: COVERAGE.BOTH,
          focus: ["Completion, increase, improvement, and preparation senses", "Core phrasal verbs built on up across intermediate and advanced registers"],
          sources: [
            { label: "PV-Int: Unit 13 — Up", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-13" },
            { label: "PV-Adv: Unit 15 — Up", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-15" },
          ],
        },
        {
          id: "unit-11",
          title: "Unit 11 — OUT",
          coverage: COVERAGE.BOTH,
          focus: ["Emergence, exhaustion, distribution, and exclusion senses", "High-frequency out verbs from everyday to academic use"],
          sources: [
            { label: "PV-Int: Unit 14 — Out", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-14" },
            { label: "PV-Adv: Unit 14 — Out", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-14" },
          ],
        },
        {
          id: "unit-12",
          title: "Unit 12 — OFF",
          coverage: COVERAGE.BOTH,
          focus: ["Departure, disconnection, cancellation, and triggering senses", "Stylistic range from casual to formal contexts"],
          sources: [
            { label: "PV-Int: Unit 15 — Off", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-15" },
            { label: "PV-Adv: Unit 12 — Off", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-12" },
          ],
        },
        {
          id: "unit-13",
          title: "Unit 13 — ON",
          coverage: COVERAGE.BOTH,
          focus: ["Continuation, contact, attachment, and progress senses", "Distinguishing on from upon and related particles"],
          sources: [
            { label: "PV-Int: Unit 16 — On and in (on portion)", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-16" },
            { label: "PV-Adv: Unit 13 — On", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-13" },
          ],
        },
        {
          id: "unit-14",
          title: "Unit 14 — IN",
          coverage: COVERAGE.BOTH,
          focus: ["Involvement, enclosure, arrival, and submission senses", "In vs. into distinctions"],
          sources: [
            { label: "PV-Int: Unit 16 — On and in (in portion)", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-16" },
            { label: "PV-Adv: Unit 11 — In", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-11" },
          ],
        },
        {
          id: "unit-15",
          title: "Unit 15 — DOWN",
          coverage: COVERAGE.BOTH,
          focus: ["Reduction, recording, defeat, and calming senses", "Metaphorical and literal uses of down"],
          sources: [
            { label: "PV-Int: Unit 17 — Down and over (down portion)", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-17" },
            { label: "PV-Adv: Unit 10 — Down", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-10" },
          ],
        },
        {
          id: "unit-16",
          title: "Unit 16 — OVER",
          coverage: COVERAGE.INT,
          focus: ["Review, repetition, excess, and transfer senses", "Over in both directional and aspectual uses"],
          sources: [
            { label: "PV-Int: Unit 17 — Down and over (over portion)", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-17" },
          ],
        },
        {
          id: "unit-17",
          title: "Unit 17 — AROUND and ABOUT",
          coverage: COVERAGE.BOTH,
          focus: ["Approximation, aimless movement, reversal, and availability senses", "British/American variation between around and about"],
          sources: [
            { label: "PV-Int: Unit 18 — Around and about", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-18" },
            { label: "PV-Adv: Unit 9 — Around and about", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-9" },
          ],
        },
        {
          id: "unit-18",
          title: "Unit 18 — FOR and WITH",
          coverage: COVERAGE.INT,
          focus: ["Searching, tolerating, supporting, and associating senses", "Less common particles with specific collocational patterns"],
          sources: [
            { label: "PV-Int: Unit 19 — For and with", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-19" },
          ],
        },
        {
          id: "unit-19",
          title: "Unit 19 — THROUGH and BACK",
          coverage: COVERAGE.BOTH,
          focus: ["Completion and endurance senses (through)", "Return and reversal senses (back)"],
          sources: [
            { label: "PV-Int: Unit 20 — Through and back", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-20" },
          ],
        },
        {
          id: "unit-20",
          title: "Unit 20 — INTO and AWAY",
          coverage: COVERAGE.INT,
          focus: ["Transformation senses (into)", "Distance and escape senses (away)", "How into marks change-of-state in phrasal verbs"],
          sources: [
            { label: "PV-Int: Unit 21 — Into and away", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-21" },
          ],
        },
      ],
    },
    {
      title: "Section 3 — Key Verbs",
      units: [
        {
          id: "unit-21",
          title: "Unit 21 — COME",
          coverage: COVERAGE.BOTH,
          focus: ["Arrival, origin, occurrence, and result senses of come", "Advanced collocations and register variations"],
          sources: [
            { label: "PV-Int: Unit 6 — Come", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-6" },
            { label: "PV-Adv: Unit 56 — Come", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-56" },
          ],
        },
        {
          id: "unit-22",
          title: "Unit 22 — GET",
          coverage: COVERAGE.BOTH,
          focus: ["The most versatile phrasal verb base", "Movement, acquisition, change-of-state, and causative senses across both levels"],
          sources: [
            { label: "PV-Int: Unit 7 — Get", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-7" },
            { label: "PV-Adv: Unit 57 — Get", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-57" },
          ],
        },
        {
          id: "unit-23",
          title: "Unit 23 — GO",
          coverage: COVERAGE.BOTH,
          focus: ["Movement, deterioration, progress, and compatibility senses", "Go in idiomatic and metaphorical contexts"],
          sources: [
            { label: "PV-Int: Unit 8 — Go", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-8" },
            { label: "PV-Adv: Unit 58 — Go", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-58" },
          ],
        },
        {
          id: "unit-24",
          title: "Unit 24 — KEEP",
          coverage: COVERAGE.ADV,
          focus: ["Continuation, restraint, and maintenance senses", "Keep as a high-frequency verb with advanced collocational range"],
          sources: [
            { label: "PV-Adv: Unit 59 — Keep", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-59" },
          ],
        },
        {
          id: "unit-25",
          title: "Unit 25 — LOOK",
          coverage: COVERAGE.INT,
          focus: ["Searching, investigating, anticipating, and caring senses", "Distinguishing look at / look for / look into / look after etc."],
          sources: [
            { label: "PV-Int: Unit 9 — Look", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-9" },
          ],
        },
        {
          id: "unit-26",
          title: "Unit 26 — MAKE",
          coverage: COVERAGE.INT,
          focus: ["Construction, comprehension, success, and escape senses", "Make in both literal and figurative phrasal patterns"],
          sources: [
            { label: "PV-Int: Unit 10 — Make", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-10" },
          ],
        },
        {
          id: "unit-27",
          title: "Unit 27 — PUT",
          coverage: COVERAGE.INT,
          focus: ["Placement, postponement, expression, and endurance senses", "Put as a structural verb in many fixed phrases"],
          sources: [
            { label: "PV-Int: Unit 11 — Put", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-11" },
          ],
        },
        {
          id: "unit-28",
          title: "Unit 28 — TAKE",
          coverage: COVERAGE.BOTH,
          focus: ["Removal, acceptance, resemblance, and beginning senses", "Take in professional, personal, and idiomatic contexts"],
          sources: [
            { label: "PV-Int: Unit 12 — Take", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-12" },
            { label: "PV-Adv: Unit 60 — Take", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-60" },
          ],
        },
      ],
    },
    {
      title: "Section 4 — Concepts",
      units: [
        {
          id: "unit-29",
          title: "Unit 29 — Time: Spending Time",
          coverage: COVERAGE.INT,
          focus: ["Phrasal verbs for how we use and allocate time", "Expressions like while away and similar time-spending verbs"],
          sources: [
            { label: "PV-Int: Unit 22 — Time: spending time", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-22" },
          ],
        },
        {
          id: "unit-30",
          title: "Unit 30 — Time: Passing of Time",
          coverage: COVERAGE.BOTH,
          focus: ["How phrasal verbs describe the flow, passage, and management of time", "Deadline and duration vocabulary"],
          sources: [
            { label: "PV-Int: Unit 23 — Time: passing of time", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-23" },
            { label: "PV-Adv: Unit 16 — Time", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-16" },
          ],
        },
        {
          id: "unit-31",
          title: "Unit 31 — Location / Places",
          coverage: COVERAGE.BOTH,
          focus: ["Phrasal verbs describing position, proximity, and spatial relationships", "Place-specific language in advanced contexts"],
          sources: [
            { label: "PV-Int: Unit 24 — Location", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-24" },
            { label: "PV-Adv: Unit 49 — Places", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-49" },
          ],
        },
        {
          id: "unit-32",
          title: "Unit 32 — Cause and Effect",
          coverage: COVERAGE.BOTH,
          focus: ["Verbs expressing triggers, results, and consequences", "Academic and everyday registers compared"],
          sources: [
            { label: "PV-Int: Unit 25 — Cause and effect", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-25" },
            { label: "PV-Adv: Unit 17 — Cause and effect", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-17" },
          ],
        },
        {
          id: "unit-33",
          title: "Unit 33 — Change",
          coverage: COVERAGE.BOTH,
          focus: ["Transformation, gradual shift, and sudden change", "Phrasal verbs used in personal, societal, and professional contexts"],
          sources: [
            { label: "PV-Int: Unit 26 — Change", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-26" },
            { label: "PV-Adv: Unit 19 — Making progress", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-19" },
          ],
        },
        {
          id: "unit-34",
          title: "Unit 34 — Success and Failure",
          coverage: COVERAGE.BOTH,
          focus: ["Achievement, defeat, and managing outcomes", "Phrasal verbs used in competitive, professional, and personal contexts"],
          sources: [
            { label: "PV-Int: Unit 27 — Success and failure", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-27" },
            { label: "PV-Adv: Unit 27 — Talking about success and failure", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-27" },
          ],
        },
        {
          id: "unit-35",
          title: "Unit 35 — Starting and Finishing",
          coverage: COVERAGE.BOTH,
          focus: ["Commencing, concluding, and organising activities", "Verbs of initiation vs. completion across contexts"],
          sources: [
            { label: "PV-Int: Unit 28 — Starting and finishing", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-28" },
            { label: "PV-Adv: Unit 25 — Arranging things", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-25" },
          ],
        },
        {
          id: "unit-36",
          title: "Unit 36 — Actions and Movement",
          coverage: COVERAGE.BOTH,
          focus: ["Physical movement vocabulary", "How phrasal verbs describe manner, direction, and style of movement at both levels"],
          sources: [
            { label: "PV-Int: Unit 29 — Actions and movement", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-29" },
            { label: "PV-Adv: Unit 46 — How people move", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-46" },
          ],
        },
        {
          id: "unit-37",
          title: "Unit 37 — Destroying and Reacting to Destruction",
          coverage: COVERAGE.INT,
          focus: ["Dismantling, demolishing, and responding to damage or loss"],
          sources: [
            { label: "PV-Int: Unit 30 — Destroying and reacting to destruction", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-30" },
          ],
        },
        {
          id: "unit-38",
          title: "Unit 38 — Communication",
          coverage: COVERAGE.BOTH,
          focus: ["Speaking, expressing, conveying meaning", "Manner of speech and communicative styles from conversational to formal"],
          sources: [
            { label: "PV-Int: Unit 31 — Communication", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-31" },
            { label: "PV-Adv: Unit 45 — How people speak", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-45" },
          ],
        },
        {
          id: "unit-39",
          title: "Unit 39 — Memory",
          coverage: COVERAGE.ADV,
          focus: ["Remembering, forgetting, recalling, and commemorating", "Memory phrasal verbs in personal and academic discourse"],
          sources: [
            { label: "PV-Adv: Unit 18 — Memory", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-18" },
          ],
        },
        {
          id: "unit-40",
          title: "Unit 40 — Conflict and Violence",
          coverage: COVERAGE.BOTH,
          focus: ["Confrontation, aggression, and opposition", "From interpersonal disagreement (Int) to broader conflict and violence (Adv)"],
          sources: [
            { label: "PV-Int: Unit 38 — Disagreeing", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-38" },
            { label: "PV-Adv: Unit 20 — Conflict and violence", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-20" },
          ],
        },
        {
          id: "unit-41",
          title: "Unit 41 — Sound",
          coverage: COVERAGE.ADV,
          focus: ["Phrasal verbs describing acoustic events: noise, volume, auditory perception"],
          sources: [
            { label: "PV-Adv: Unit 21 — Sound", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-21" },
          ],
        },
        {
          id: "unit-42",
          title: "Unit 42 — Size and Number",
          coverage: COVERAGE.ADV,
          focus: ["Quantification, scaling, and measurement expressions using phrasal verbs"],
          sources: [
            { label: "PV-Adv: Unit 26 — Talking about size and number", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-26" },
          ],
        },
      ],
    },
    {
      title: "Section 5 — Functions",
      units: [
        {
          id: "unit-43",
          title: "Unit 43 — Describing People and Places",
          coverage: COVERAGE.BOTH,
          focus: ["Characterisation vocabulary", "Physical and personality descriptions using phrasal verbs at both levels"],
          sources: [
            { label: "PV-Int: Unit 32 — Describing people and places", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-32" },
            { label: "PV-Adv: Unit 40 — Character and personal qualities", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-40" },
          ],
        },
        {
          id: "unit-44",
          title: "Unit 44 — Describing Public Events",
          coverage: COVERAGE.INT,
          focus: ["Reporting, narrating, and describing events in public or social settings"],
          sources: [
            { label: "PV-Int: Unit 33 — Describing public events", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-33" },
          ],
        },
        {
          id: "unit-45",
          title: "Unit 45 — Describing Situations",
          coverage: COVERAGE.INT,
          focus: ["Context-setting phrasal verbs for explaining circumstances and conditions"],
          sources: [
            { label: "PV-Int: Unit 34 — Describing situations", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-34" },
          ],
        },
        {
          id: "unit-46",
          title: "Unit 46 — Giving and Getting Information",
          coverage: COVERAGE.BOTH,
          focus: ["Information exchange phrasal verbs", "Contrasted with concealment and deception vocabulary at advanced level"],
          sources: [
            { label: "PV-Int: Unit 35 — Giving and getting information", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-35" },
            { label: "PV-Adv: Unit 52 — Secrets and lies", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-52" },
          ],
        },
        {
          id: "unit-47",
          title: "Unit 47 — Solving Problems",
          coverage: COVERAGE.BOTH,
          focus: ["Identifying, analysing, and resolving problems", "Problem discussion vocabulary in both everyday and professional contexts"],
          sources: [
            { label: "PV-Int: Unit 36 — Solving problems", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-36" },
            { label: "PV-Adv: Unit 28 — Discussing problems", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-28" },
          ],
        },
        {
          id: "unit-48",
          title: "Unit 48 — Decisions and Plans",
          coverage: COVERAGE.BOTH,
          focus: ["Making choices, forming plans, influencing others", "Decision-making phrasal verbs from casual to persuasive registers"],
          sources: [
            { label: "PV-Int: Unit 37 — Decisions and plans", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-37" },
            { label: "PV-Adv: Unit 29 — Deciding and influencing", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-29" },
          ],
        },
        {
          id: "unit-49",
          title: "Unit 49 — Disagreeing",
          coverage: COVERAGE.BOTH,
          focus: ["Opposition, objection, and counter-argument", "From casual disagreement to formal debate and advocacy"],
          sources: [
            { label: "PV-Int: Unit 38 — Disagreeing", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-38" },
            { label: "PV-Adv: Unit 22 — Supporting and opposing people or views", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-22" },
          ],
        },
        {
          id: "unit-50",
          title: "Unit 50 — Agreeing",
          coverage: COVERAGE.ADV,
          focus: ["Expressing consent, alignment, and consensus", "Phrasal verbs used in negotiation and collaborative discourse"],
          sources: [
            { label: "PV-Adv: Unit 23 — Agreeing", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-23" },
          ],
        },
        {
          id: "unit-51",
          title: "Unit 51 — Understanding and Having Ideas",
          coverage: COVERAGE.ADV,
          focus: ["Comprehension, insight, and ideation", "Click, dawn on, hit upon, and similar cognitive phrasal verbs"],
          sources: [
            { label: "PV-Adv: Unit 24 — Understanding and having ideas", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-24" },
          ],
        },
        {
          id: "unit-52",
          title: "Unit 52 — Persuading",
          coverage: COVERAGE.BOTH,
          focus: ["Convincing, pressuring, and motivating others", "Rhetorical and interpersonal persuasion vocabulary"],
          sources: [
            { label: "PV-Int: Unit 39 — Persuading", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-39" },
            { label: "PV-Adv: Unit 29 — Deciding and influencing", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-29" },
          ],
        },
        {
          id: "unit-53",
          title: "Unit 53 — Praising and Criticising",
          coverage: COVERAGE.INT,
          focus: ["Evaluative language: complimenting, condemning, and giving feedback using phrasal verbs"],
          sources: [
            { label: "PV-Int: Unit 40 — Praising and criticising", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-40" },
          ],
        },
        {
          id: "unit-54",
          title: "Unit 54 — Exclamations and Warnings",
          coverage: COVERAGE.BOTH,
          focus: ["Emotional reactions, alert expressions, and cautionary language", "Tone and intensity across informal and urgent registers"],
          sources: [
            { label: "PV-Int: Unit 41 — Exclamations and warnings", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-41" },
            { label: "PV-Adv: Unit 30 — Exclamations and warnings", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-30" },
          ],
        },
      ],
    },
    {
      title: "Section 6 — Work, Study and Finance",
      units: [
        {
          id: "unit-55",
          title: "Unit 55 — The Classroom and Learning",
          coverage: COVERAGE.BOTH,
          focus: ["Educational settings: teaching, studying, understanding", "Academic engagement phrasal verbs"],
          sources: [
            { label: "PV-Int: Unit 42 — The classroom and learning", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-42" },
            { label: "PV-Adv: Unit 32 — Study", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-32" },
          ],
        },
        {
          id: "unit-56",
          title: "Unit 56 — Student Life: Courses and Exams",
          coverage: COVERAGE.BOTH,
          focus: ["Academic life from enrolment to examination", "Lecture and seminar participation vocabulary at advanced level"],
          sources: [
            { label: "PV-Int: Unit 43 — Student life: courses and exams", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-43" },
            { label: "PV-Adv: Unit 33 — Lectures and seminars", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-33" },
          ],
        },
        {
          id: "unit-57",
          title: "Unit 57 — Lectures and Seminars",
          coverage: COVERAGE.ADV,
          focus: ["Presenting, questioning, and engaging in formal educational settings", "Academic discourse situations in higher education"],
          sources: [
            { label: "PV-Adv: Unit 33 — Lectures and seminars", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-33" },
          ],
        },
        {
          id: "unit-58",
          title: "Unit 58 — Reading and Writing (Academic)",
          coverage: COVERAGE.BOTH,
          focus: ["Academic literacy: reading strategies, essay planning, drafting, and revision vocabulary"],
          sources: [
            { label: "PV-Int: Unit 44 — Student life: reading and writing", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-44" },
            { label: "PV-Adv: Unit 34 — Writing essays", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-34" },
          ],
        },
        {
          id: "unit-59",
          title: "Unit 59 — Work: Jobs and Career",
          coverage: COVERAGE.BOTH,
          focus: ["Employment lifecycle: applying, starting, progressing, and leaving jobs", "Professional workplace vocabulary"],
          sources: [
            { label: "PV-Int: Unit 45 — Work: jobs and career", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-45" },
            { label: "PV-Adv: Unit 31 — Work", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-31" },
          ],
        },
        {
          id: "unit-60",
          title: "Unit 60 — Work: Being Busy",
          coverage: COVERAGE.INT,
          focus: ["Workload, deadlines, and busyness phrasal verbs in professional contexts"],
          sources: [
            { label: "PV-Int: Unit 46 — Work: being busy", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-46" },
          ],
        },
        {
          id: "unit-61",
          title: "Unit 61 — Money: Salaries, Bills, Payments",
          coverage: COVERAGE.BOTH,
          focus: ["Personal and professional financial transactions", "Earning, owing, and settling accounts"],
          sources: [
            { label: "PV-Int: Unit 47 — Money: salaries, bills, payments", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-47" },
            { label: "PV-Adv: Unit 36 — Money", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-36" },
          ],
        },
        {
          id: "unit-62",
          title: "Unit 62 — Money: Buying and Selling",
          coverage: COVERAGE.BOTH,
          focus: ["Commercial exchange vocabulary", "Pricing, purchasing, and retail phrasal verbs"],
          sources: [
            { label: "PV-Int: Unit 48 — Money: buying and selling", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-48" },
            { label: "PV-Adv: Unit 36 — Money", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-36" },
          ],
        },
        {
          id: "unit-63",
          title: "Unit 63 — Business",
          coverage: COVERAGE.BOTH,
          focus: ["Corporate operations: mergers, negotiations, strategies, and business relationships", "Both intermediate and advanced professional registers"],
          sources: [
            { label: "PV-Int: Unit 49 — Business", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-49" },
            { label: "PV-Adv: Unit 35 — Business", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-35" },
          ],
        },
        {
          id: "unit-64",
          title: "Unit 64 — Telephoning",
          coverage: COVERAGE.INT,
          focus: ["Phrasal verbs specific to phone communication", "Holding, transferring, cutting off, and getting through"],
          sources: [
            { label: "PV-Int: Unit 50 — Telephoning", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-50" },
          ],
        },
      ],
    },
    {
      title: "Section 7 — Personal Life",
      units: [
        {
          id: "unit-65",
          title: "Unit 65 — Feelings",
          coverage: COVERAGE.BOTH,
          focus: ["Emotional states, mood changes, and affective responses", "Nuanced emotional vocabulary at advanced level"],
          sources: [
            { label: "PV-Int: Unit 51 — Feelings", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-51" },
            { label: "PV-Adv: Unit 41 — Feelings", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-41" },
          ],
        },
        {
          id: "unit-66",
          title: "Unit 66 — Relationships",
          coverage: COVERAGE.BOTH,
          focus: ["Forming, maintaining, and ending relationships", "Personal and romantic connection vocabulary across both levels"],
          sources: [
            { label: "PV-Int: Unit 52 — Relationships", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-52" },
            { label: "PV-Adv: Unit 39 — Relationships", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-39" },
          ],
        },
        {
          id: "unit-67",
          title: "Unit 67 — Relationships: Problems",
          coverage: COVERAGE.BOTH,
          focus: ["Conflict, estrangement, and reconciliation in personal relationships"],
          sources: [
            { label: "PV-Int: Unit 53 — Relationships: problems", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-53" },
            { label: "PV-Adv: Unit 39 — Relationships", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-39" },
          ],
        },
        {
          id: "unit-68",
          title: "Unit 68 — Secrets and Conversations",
          coverage: COVERAGE.BOTH,
          focus: ["Concealment, disclosure, rumour, and deception", "Conversational and interpersonal information dynamics"],
          sources: [
            { label: "PV-Int: Unit 54 — Secrets and conversations", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-54" },
            { label: "PV-Adv: Unit 52 — Secrets and lies", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-52" },
          ],
        },
        {
          id: "unit-69",
          title: "Unit 69 — Stages Through Life",
          coverage: COVERAGE.INT,
          focus: ["Life milestones: growing up, settling down, ageing", "Phrasal verbs marking transitions across life stages"],
          sources: [
            { label: "PV-Int: Unit 55 — Stages through life", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-55" },
          ],
        },
        {
          id: "unit-70",
          title: "Unit 70 — Health",
          coverage: COVERAGE.BOTH,
          focus: ["Illness, recovery, symptoms, and medical care", "From general wellness vocabulary (Int) to specific symptom and body language (Adv)"],
          sources: [
            { label: "PV-Int: Unit 56 — Health", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-56" },
            { label: "PV-Adv: Unit 43 — Health and symptoms", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-43" },
          ],
        },
        {
          id: "unit-71",
          title: "Unit 71 — The Body",
          coverage: COVERAGE.ADV,
          focus: ["Phrasal verbs specifically describing bodily actions, sensations, and physical states"],
          sources: [
            { label: "PV-Adv: Unit 44 — The body", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-44" },
          ],
        },
        {
          id: "unit-72",
          title: "Unit 72 — Sport",
          coverage: COVERAGE.INT,
          focus: ["Competition, training, performance, and sporting events vocabulary"],
          sources: [
            { label: "PV-Int: Unit 57 — Sport", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-57" },
          ],
        },
        {
          id: "unit-73",
          title: "Unit 73 — Homes and Daily Routines",
          coverage: COVERAGE.BOTH,
          focus: ["Domestic life: household tasks, routines, and home management phrasal verbs"],
          sources: [
            { label: "PV-Int: Unit 58 — Homes and daily routines", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-58" },
            { label: "PV-Adv: Unit 37 — At home", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-37" },
          ],
        },
        {
          id: "unit-74",
          title: "Unit 74 — Socialising",
          coverage: COVERAGE.BOTH,
          focus: ["Social interactions: inviting, meeting, hosting, and participating in social events"],
          sources: [
            { label: "PV-Int: Unit 59 — Socialising", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-59" },
            { label: "PV-Adv: Unit 42 — Social life", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-42" },
          ],
        },
        {
          id: "unit-75",
          title: "Unit 75 — Food and Drink",
          coverage: COVERAGE.BOTH,
          focus: ["Eating, drinking, preparing food, and dining phrasal verbs", "From casual meals to formal dining contexts"],
          sources: [
            { label: "PV-Int: Unit 60 — Food and drink", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-60" },
            { label: "PV-Adv: Unit 55 — Food and drink", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-55" },
          ],
        },
        {
          id: "unit-76",
          title: "Unit 76 — Clothing and Appearance",
          coverage: COVERAGE.ADV,
          focus: ["Getting dressed, styling, and describing appearance", "Phrasal verbs specific to fashion and personal presentation"],
          sources: [
            { label: "PV-Adv: Unit 38 — Clothing and appearance", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-38" },
          ],
        },
        {
          id: "unit-77",
          title: "Unit 77 — Character and Personal Qualities",
          coverage: COVERAGE.ADV,
          focus: ["Personality traits expressed through phrasal verbs", "Describing behavioural patterns and character in depth"],
          sources: [
            { label: "PV-Adv: Unit 40 — Character and personal qualities", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-40" },
          ],
        },
      ],
    },
    {
      title: "Section 8 — The World Around Us",
      units: [
        {
          id: "unit-78",
          title: "Unit 78 — Weather",
          coverage: COVERAGE.BOTH,
          focus: ["Atmospheric conditions and weather events described through phrasal verbs", "From casual forecasting to dramatic weather vocabulary"],
          sources: [
            { label: "PV-Int: Unit 61 — Weather", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-61" },
            { label: "PV-Adv: Unit 48 — Weather", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-48" },
          ],
        },
        {
          id: "unit-79",
          title: "Unit 79 — Travel",
          coverage: COVERAGE.BOTH,
          focus: ["Journey planning, transportation modes, and travel experiences", "From holiday trips (Int) to advanced transport systems (Adv)"],
          sources: [
            { label: "PV-Int: Unit 62 — Travel", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-62" },
            { label: "PV-Adv: Unit 50 — Transport", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-50" },
          ],
        },
        {
          id: "unit-80",
          title: "Unit 80 — Driving",
          coverage: COVERAGE.INT,
          focus: ["Vehicle operation, road behaviour, and driving-specific phrasal verbs"],
          sources: [
            { label: "PV-Int: Unit 63 — Driving", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-63" },
          ],
        },
        {
          id: "unit-81",
          title: "Unit 81 — Technology",
          coverage: COVERAGE.BOTH,
          focus: ["Devices, digital tools, and technological processes", "From general gadget vocabulary (Int) to more abstract tech language (Adv)"],
          sources: [
            { label: "PV-Int: Unit 64 — Technology", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-64" },
            { label: "PV-Adv: Unit 54 — Technology", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-54" },
          ],
        },
        {
          id: "unit-82",
          title: "Unit 82 — Computers",
          coverage: COVERAGE.BOTH,
          focus: ["Computing-specific phrasal verbs: booting, crashing, uploading", "Managing digital environments"],
          sources: [
            { label: "PV-Int: Unit 65 — Computers", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-65" },
            { label: "PV-Adv: Unit 54 — Technology (computers integrated)", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-54" },
          ],
        },
        {
          id: "unit-83",
          title: "Unit 83 — Nature",
          coverage: COVERAGE.ADV,
          focus: ["Natural world phrasal verbs: ecosystems, environmental change, animal behaviour"],
          sources: [
            { label: "PV-Adv: Unit 47 — Nature", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-47" },
          ],
        },
        {
          id: "unit-84",
          title: "Unit 84 — News",
          coverage: COVERAGE.BOTH,
          focus: ["Journalism, reporting, and media language", "How phrasal verbs are used in news coverage and commentary"],
          sources: [
            { label: "PV-Int: Unit 66 — News", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-66" },
            { label: "PV-Adv: Unit 51 — The news", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-51" },
          ],
        },
        {
          id: "unit-85",
          title: "Unit 85 — Crime",
          coverage: COVERAGE.BOTH,
          focus: ["Criminal activity (Int) and legal/regulatory frameworks (Adv)", "Law enforcement and justice system vocabulary"],
          sources: [
            { label: "PV-Int: Unit 67 — Crime", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-67" },
            { label: "PV-Adv: Unit 53 — Rules and laws", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-53" },
          ],
        },
        {
          id: "unit-86",
          title: "Unit 86 — Power and Authority",
          coverage: COVERAGE.BOTH,
          focus: ["Governance, control, and institutional authority", "Phrasal verbs in political and power-related discourse"],
          sources: [
            { label: "PV-Int: Unit 68 — Power and authority", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-68" },
            { label: "PV-Adv: Unit 53 — Rules and laws", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-advanced/unit-53" },
          ],
        },
      ],
    },
    {
      title: "Section 9 — Variety and Evolution of Phrasal Verbs",
      units: [
        {
          id: "unit-87",
          title: "Unit 87 — American and Australian Phrasal Verbs",
          coverage: COVERAGE.INT,
          focus: ["Regional variation: how phrasal verb usage differs across major English varieties", "Key differences in meaning and frequency"],
          sources: [
            { label: "PV-Int: Unit 69 — American and Australian phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-69" },
          ],
        },
        {
          id: "unit-88",
          title: "Unit 88 — New Phrasal Verbs",
          coverage: COVERAGE.INT,
          focus: ["Emerging and recently coined phrasal verbs", "Language evolution and how new verbs enter common use"],
          sources: [
            { label: "PV-Int: Unit 70 — New phrasal verbs", href: "https://chashma-learn.vercel.app/english/phrasal-verbs/pviu-intermediate/unit-70" },
          ],
        },
      ],
    },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// LEVEL BADGE for source boxes
// ─────────────────────────────────────────────────────────────────────────────
function LevelBadge({ label }) {
  const isInt = label.startsWith("PV-Int");
  return (
    <span style={{
      fontSize: "11px", fontWeight: 700,
      backgroundColor: isInt ? "#d1fae5" : "#ede9fe",
      color: isInt ? "#036c48" : "#5b21b6",
      padding: "2px 9px",
      borderRadius: "999px",
      flexShrink: 0,
    }}>
      {isInt ? "Intermediate" : "Advanced"}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT ROW COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function UnitRow({ unit, unitNum, isLearner }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const locked = !isLearner && unitNum > 3;

  // Strip "Unit N — " prefix for a cleaner title
  const titleText = unit.title.replace(/^Unit \d+ — /, "");

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      overflow: "hidden",
      opacity: locked ? 0.55 : 1,
    }}>

      {/* ── Main row ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 18px",
        gap: "14px",
      }}>

        {/* Unit number badge */}
        <div style={{
          width: "36px", height: "36px", flexShrink: 0,
          borderRadius: "8px",
          backgroundColor: locked ? "#f3f4f6" : "#f0fdf4",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 800,
          color: locked ? "#9ca3af" : "#036c48",
        }}>
          {unitNum}
        </div>

        {/* Title + focus subtitle */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {locked ? (
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#9ca3af", margin: 0 }}>
              {titleText}
            </p>
          ) : (
            <Link
              href={`/english/phrasal-verbs/pviu-unified/${unit.id}`}
              style={{ fontSize: "14px", fontWeight: 600, color: "#111827", textDecoration: "none", display: "block" }}
              onMouseEnter={e => e.currentTarget.style.color = "#036c48"}
              onMouseLeave={e => e.currentTarget.style.color = "#111827"}
            >
              {titleText}
            </Link>
          )}

          {/* Focus as subtitle */}
          {unit.focus && unit.focus.length > 0 && (
            <p style={{
              fontSize: "12px", color: "#9ca3af",
              margin: "3px 0 0", lineHeight: 1.4,
            }}>
              {unit.focus.join(" · ")}
            </p>
          )}
        </div>

        {/* Right: sources toggle + lock */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {!locked && (
            <button
              onClick={() => setSourcesOpen(p => !p)}
              title="Show sources"
              style={{
                width: "30px", height: "30px",
                borderRadius: "7px",
                border: `1px solid ${sourcesOpen ? "#bbf7d0" : "#e5e7eb"}`,
                backgroundColor: sourcesOpen ? "#f0fdf4" : "#f9fafb",
                color: sourcesOpen ? "#036c48" : "#9ca3af",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px",
                transition: "all 0.15s",
              }}
            >
              📚
            </button>
          )}
          {locked && <span style={{ fontSize: "15px" }}>🔒</span>}
        </div>
      </div>

      {/* ── Sources panel ── */}
      {sourcesOpen && (
        <div style={{
          borderTop: "1px solid #f0fdf4",
          backgroundColor: "#f9fafb",
          padding: "12px 18px 14px 68px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          {unit.sources.map((src, i) => {
            const srcLabel = src.label.replace(/^PV-(Int|Adv): /, "");
            return (
              <a
                key={i}
                href={src.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 14px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#bbf7d0";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(3,108,72,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <LevelBadge label={src.label} />
                <span style={{ fontSize: "13px", color: "#111827", fontWeight: 500, flex: 1 }}>
                  {srcLabel}
                </span>
                <span style={{ fontSize: "13px", color: "#9ca3af" }}>↗</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PVIUUnifiedPage() {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          setRole(snap.exists() ? snap.data().role : "viewer");
        } catch {
          setRole("viewer");
        }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  if (loading) {
    return (
      <div style={{
        fontFamily: "'Manrope', sans-serif",
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#f9fafb",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "44px", height: "44px",
            border: "3px solid #d1fae5",
            borderTop: "3px solid #036c48",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }} />
          <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Manrope', sans-serif" }}>Loading...</p>
        </div>
        <style>{\`@keyframes spin { to { transform: rotate(360deg); } }\`}</style>
      </div>
    );
  }

  const isLearner  = role === "learner" || role === "admin" || role === "owner";
  const totalUnits = bookData.sections.reduce((acc, s) => acc + s.units.length, 0);

  let unitCounter = 0;

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid #f0fdf4",
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{
          padding: "0 32px", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english/phrasal-verbs" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Phrasal Verbs</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{bookData.title} — {bookData.subtitle}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{
              width: "32px", height: "32px", borderRadius: "999px",
              backgroundColor: "#d1fae5",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: 700, color: "#036c48",
            }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 32px 64px" }}>

        {/* ── Book header ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "32px",
          alignItems: "start",
          marginBottom: "48px",
        }}>
          {/* Cover */}
          <div style={{
            width: "160px", aspectRatio: "3/4",
            backgroundColor: "#f3f4f6",
            borderRadius: "10px", overflow: "hidden",
            border: "1px solid #e5e7eb",
            flexShrink: 0,
          }}>
            <img
              src={bookData.cover}
              alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{
              display: "none", width: "100%", height: "100%",
              alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: "6px",
            }}>
              <span style={{ fontSize: "36px" }}>📚</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px" }}>
                Cover coming soon
              </span>
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{
              display: "inline-block", fontSize: "11px", fontWeight: 700,
              backgroundColor: "#fef3c7", color: "#92400e",
              padding: "3px 10px", borderRadius: "999px", marginBottom: "10px",
            }}>
              ✨ Unified Edition
            </span>

            <h1 style={{
              fontSize: "28px", fontWeight: 800, color: "#064e3b",
              letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "8px",
            }}>
              {bookData.title}
            </h1>

            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
              Michael McCarthy, Felicity O'Dell · Intermediate + Advanced combined
            </p>

            {/* Stats — only sections and units */}
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b" }}>{bookData.sections.length}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Sections</p>
              </div>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b" }}>{totalUnits}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Units</p>
              </div>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#036c48" }}>3</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Free units</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Upgrade banner ── */}
        {!isLearner && (
          <div style={{
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "10px",
            padding: "12px 20px",
            marginBottom: "32px",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <span style={{ fontSize: "18px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, margin: 0 }}>
              Units 1–3 are free.{" "}
              <Link href="/dashboard" style={{ color: "#036c48", fontWeight: 700, textDecoration: "none" }}>
                Upgrade to Learner
              </Link>{" "}
              to unlock all {totalUnits} units.
            </p>
          </div>
        )}

        {/* ── Sections & Units ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {bookData.sections.map((section, si) => (
            <div key={si}>
              <h2 style={{
                fontSize: "15px", fontWeight: 700, color: "#374151",
                marginBottom: "12px", paddingBottom: "8px",
                borderBottom: "1px solid #f3f4f6",
              }}>
                {section.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {section.units.map((unit) => {
                  unitCounter++;
                  return (
                    <UnitRow
                      key={unit.id}
                      unit={unit}
                      unitNum={unitCounter}
                      isLearner={isLearner}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
