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

// ── Color palette ─────────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46", border: "#bbf7d0" }, // emerald
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc" }, // sky
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd" }, // violet
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d" }, // amber
  { accent: "#0d9488", bg: "#f0fdfa", badge: "#ccfbf1", text: "#134e4a", border: "#99f6e4" }, // teal
  { accent: "#dc2626", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d", border: "#fca5a5" }, // red
  { accent: "#c026d3", bg: "#fdf4ff", badge: "#f5d0fe", text: "#701a75", border: "#e879f9" }, // fuchsia
  { accent: "#2563eb", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a", border: "#93c5fd" }, // blue
  { accent: "#065f46", bg: "#ecfdf5", badge: "#a7f3d0", text: "#064e3b", border: "#6ee7b7" }, // dark emerald
  { accent: "#9333ea", bg: "#fdf4ff", badge: "#e9d5ff", text: "#581c87", border: "#d8b4fe" }, // purple
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63", border: "#67e8f9" }, // cyan
  { accent: "#ca8a04", bg: "#fefce8", badge: "#fef08a", text: "#713f12", border: "#fde047" }, // yellow
  { accent: "#16a34a", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d", border: "#86efac" }, // green
  { accent: "#e11d48", bg: "#fff1f2", badge: "#fecdd3", text: "#881337", border: "#fda4af" }, // rose
  { accent: "#7c3aed", bg: "#f5f3ff", badge: "#ddd6fe", text: "#3730a3", border: "#a5b4fc" }, // indigo
  { accent: "#b45309", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12", border: "#fdba74" }, // orange
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#075985", border: "#38bdf8" }, // light blue
  { accent: "#059669", bg: "#ecfdf5", badge: "#d1fae5", text: "#065f46", border: "#6ee7b7" }, // mint
  { accent: "#6d28d9", bg: "#f5f3ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd" }, // deep violet
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#ccfbf1", text: "#134e4a", border: "#5eead4" }, // dark teal
  { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b", border: "#cbd5e1" }, // slate
  { accent: "#15803d", bg: "#f0fdf4", badge: "#dcfce7", text: "#14532d", border: "#86efac" }, // forest
];

const levelColors = {
  Basic:        { bg: "#d1fae5", text: "#065f46" },
  Intermediate: { bg: "#dbeafe", text: "#1e3a5f" },
  Advanced:     { bg: "#ede9fe", text: "#4c1d95" },
};

// ── Curriculum data ───────────────────────────────────────────────────────────
const grammarData = {
  title:   "Grammar Curriculum Master Map",
  series:  "Oxford English Grammar Course (Swan & Walter) · Basic → Intermediate → Advanced",
  drills:  "MyGrammarLab (Foley & Hall) · A1/A2 → B1/B2 → C1/C2",
  cover:   "/books/unified-grammar.jpg",
  sections: [
    // ── S1 ────────────────────────────────────────────────────────────────────
    {
      num: "1", title: "be and have", tags: ["be", "have", "auxiliary", "foundations"],
      units: [
        {
          num: "1", id: "g-u1",
          title: "be: Forms and Uses",
          goal: "Master the full conjugation of be across tenses and understand its role as a main verb and auxiliary.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S1: Units 1–3",        focus: "Present and past forms; statements, questions, negatives; future with will be" },
            { level: "Intermediate", ref: "Oxford Intermediate · S1: Unit 1",     focus: "Revising be; extended and habitual uses" },
            { level: "Advanced",     ref: "Oxford Advanced · S2: Units 1–2",      focus: "Progressive forms of be; emphatic do be; complex structures" },
          ],
          topic: { name: "Traditional vs Modern Education", desc: "A short passage describing how classroom environments are changing. Students identify every use of be and classify it: main verb, auxiliary, or linking verb." },
          focus: [
            "Contracted forms in speech vs full forms in writing",
            "be as a linking verb (She is a doctor) vs auxiliary (is working)",
            "Agreement errors: There is many problems ✗ → There are many problems ✓",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 5, Topics 1–2 — Present simple of be; questions with be" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 5, Topic 1 — be, have and have got (review)" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 1 — Auxiliaries and have got (advanced)" },
          ],
        },
        {
          num: "2", id: "g-u2",
          title: "there is / there are",
          goal: "Use there is/are/was/were/will be correctly to introduce new information and describe existence.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S1: Units 4–5",         focus: "there is/was; future with will there be" },
            { level: "Intermediate", ref: "Oxford Intermediate · S1: Units 2–3",  focus: "Revising basics; more complex there structures (there seems to be)" },
            { level: "Advanced",     ref: "Oxford Advanced · S2: Units 3–4",      focus: "Complex there structures; formal and academic uses" },
          ],
          topic: { name: "Urban Development — The Affordable Housing Shortage", desc: "A descriptive passage about housing crises in major cities, rich in there is/are/has been constructions at multiple tenses." },
          focus: [
            "Agreement: there is + singular / there are + plural",
            "there vs it as introductory subjects",
            "there seems/appears/tends to be — impersonal constructions for formal writing",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 11, Topic 4 — there + be" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 11, Topic 2 — there and it" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 9, Topics 3–4 — Introductory there and it; common expressions" },
          ],
        },
        {
          num: "3", id: "g-u3",
          title: "have: Main Verb and Auxiliary",
          goal: "Distinguish have as a main verb (possession, experience, actions) from have as a perfect auxiliary. Use have got correctly and know when it is and isn't interchangeable with have.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S1: Units 6–9",         focus: "have/do you have; past and future; have for actions; have got" },
            { level: "Intermediate", ref: "Oxford Intermediate · S1: Units 4–6",  focus: "have got vs do; habitual actions; have for actions" },
            { level: "Advanced",     ref: "Oxford Advanced · S2: Units 5–6",      focus: "Revising have; emphatic do; formal contexts" },
          ],
          topic: { name: "Health and Wellbeing — Mental Health Services", desc: "A passage about what communities have in terms of resources and what people have been having difficulty accessing." },
          focus: [
            "have got (British) vs have (American/neutral): register and context",
            "have for actions (have a shower, have a look) — not replaceable by have got",
            "have as perfect auxiliary — not a main verb in this role",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 5, Topics 8–9 — have got; have for actions" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 5, Topic 1 — be, have and have got" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 1 — Auxiliaries and have got (advanced)" },
          ],
        },
      ],
    },
    // ── S2 ────────────────────────────────────────────────────────────────────
    {
      num: "2", title: "Present Tenses", tags: ["present-tenses", "simple", "continuous", "stative"],
      units: [
        {
          num: "4", id: "g-u4",
          title: "Present Simple: Forms and Use",
          goal: "Form the present simple correctly in all persons. Use it accurately for habits, facts, routines, and permanent states.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S2: Units 1–5",              focus: "Affirmative, negative, question forms; spelling; use for habits and facts" },
            { level: "Intermediate", ref: "Oxford Intermediate · S2: Units 1–2, 4",    focus: "Revising forms and spelling; instructions, commentary; extended uses" },
            { level: "Advanced",     ref: "Oxford Advanced · S3: Units 2–4",           focus: "Instructions, commentaries, stories in present simple; more about present tenses" },
          ],
          topic: { name: "Work and Employment — Remote Work: Benefits and Drawbacks", desc: "A passage about how remote workers structure their day, report higher productivity, and face new isolation challenges." },
          focus: [
            "Third person -s: spelling rules (watches, tries, goes)",
            "do/does in negatives and questions — never omit",
            "Present simple for universal truths vs present continuous for current situations",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 5, Topics 3–4 — Present simple forms; questions" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 5, Topic 2 — Present simple" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 2 — Present simple or continuous? (advanced)" },
          ],
        },
        {
          num: "5", id: "g-u5",
          title: "Present Continuous: Forms and Use",
          goal: "Form the present continuous accurately. Use it for actions happening now, temporary situations, and developing trends.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S2: Units 6–10",         focus: "Forms; current and temporary actions; negatives and questions" },
            { level: "Intermediate", ref: "Oxford Intermediate · S2: Unit 3",      focus: "Present continuous for changes and trends" },
            { level: "Advanced",     ref: "Oxford Advanced · S3: Units 2, 4",      focus: "Extended uses; trends; narrative commentary" },
          ],
          topic: { name: "Environment and Sustainability — Climate Change", desc: "A passage about how global temperatures are rising, ice caps are melting, and governments are beginning to respond." },
          focus: [
            "Spelling: -ing endings (doubling: running; dropping -e: driving)",
            "Present continuous for trends: Prices are rising — not a momentary action",
            "Common error: using continuous for permanent states (I am living in Seoul — only if temporary)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 5, Topics 5–6 — Present continuous forms; questions" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 5, Topic 3 — Present continuous" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 2 — Present simple or continuous? (advanced)" },
          ],
        },
        {
          num: "6", id: "g-u6",
          title: "Present Simple vs Present Continuous",
          goal: "Distinguish the two present tenses accurately including stative verbs. Understand why some verbs resist the continuous form and when apparent exceptions arise.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S2: Units 11–13",          focus: "The core difference; non-progressive verbs introduced" },
            { level: "Intermediate", ref: "Oxford Intermediate · S2: Units 1, 5",    focus: "Revising the difference; full treatment of non-progressive verbs" },
            { level: "Advanced",     ref: "Oxford Advanced · S3: Units 4–5",         focus: "More about present tenses; non-progressive verbs with exceptions" },
          ],
          topic: { name: "Technology and Society — Social Media: Net Positive or Negative?", desc: "A passage contrasting what social media does (permanent function) with what it is currently doing to public discourse (ongoing trend)." },
          focus: [
            "Stative verbs: know, believe, love, want, understand, seem, own — not usually continuous",
            "Apparent exceptions: I'm loving this (advertising/emphasis); I'm thinking about it (process vs state)",
            "Sense verbs: see, hear, smell, taste — stative vs dynamic distinction",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 5, Topic 7 — Present simple or continuous?" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 5, Topic 4 — Present simple or continuous?" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topics 2, 7 — Contrast; state verbs (advanced)" },
          ],
        },
      ],
    },
    // ── S3 ────────────────────────────────────────────────────────────────────
    {
      num: "3", title: "Talking About the Future", tags: ["future", "will", "going-to", "present-for-future"],
      units: [
        {
          num: "7", id: "g-u7",
          title: "going to and Present Continuous for Future",
          goal: "Use going to for intentions and evidence-based predictions. Use the present continuous for fixed future arrangements. Distinguish these clearly from will.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S3: Units 1–2",              focus: "going to for intentions and predictions; present continuous for plans" },
            { level: "Intermediate", ref: "Oxford Intermediate · S3: Units 1–2, 5",    focus: "Revising both; which future? comparison" },
            { level: "Advanced",     ref: "Oxford Advanced · S3: Units 6–7",           focus: "More about present continuous, going to and will; comparing all forms" },
          ],
          topic: { name: "Science and Research — Space Exploration", desc: "A passage about upcoming missions: what agencies are going to launch, what teams are planning this year, and what scientists are predicting for the decade ahead." },
          focus: [
            "going to + present evidence: Look at those clouds — it's going to rain",
            "Present continuous for future: requires a fixed arrangement (We're meeting at 6)",
            "Common error: using present continuous without any fixed arrangement in place",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 8, Topics 1, 3 — Future with going to; present tenses for future" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 8, Topic 1 — going to, present continuous and will" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 6, Topics 2–3 — Decisions, intentions; other future forms" },
          ],
        },
        {
          num: "8", id: "g-u8",
          title: "will: Predictions, Decisions, Promises",
          goal: "Use will for spontaneous decisions, promises, offers, refusals, and predictions without present evidence.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S3: Units 3–4",          focus: "will for predictions; deciding, refusing, promising" },
            { level: "Intermediate", ref: "Oxford Intermediate · S3: Units 3–4",   focus: "Revising will; decisions and promises; which future?" },
            { level: "Advanced",     ref: "Oxford Advanced · S3: Units 6–7",       focus: "More about will; will in conditional and habitual contexts" },
          ],
          topic: { name: "Government and Politics — International Relations", desc: "A passage about what world leaders will do in upcoming summits, spontaneous policy announcements, and promises made to voters and allies." },
          focus: [
            "Spontaneous decision (I'll get the door) vs planned intention (I'm going to get a new job)",
            "will for characteristic behaviour: She'll talk for hours if you let her",
            "Shall in questions: Shall I help? — restricted to first person offers in British English",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 8, Topic 2 — Future with will" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 8, Topic 1 — will compared with other forms" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 6, Topic 1 — Predictions (advanced)" },
          ],
        },
        {
          num: "9", id: "g-u9",
          title: "Future Perfect, Future Continuous, and Other Future Forms",
          goal: "Use the future continuous and future perfect accurately. Understand be + infinitive, future in the past, and the present simple for timetabled events.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S3: Unit 5",                focus: "Simple present for timetabled future only" },
            { level: "Intermediate", ref: "Oxford Intermediate · S3: Units 6–10",     focus: "Future progressive; be + infinitive; future in the past; future perfect" },
            { level: "Advanced",     ref: "Oxford Advanced · S3: Units 8–11",         focus: "be + infinitive; future progressive; future perfect; future in the past" },
          ],
          topic: { name: "Transport and Travel — Aviation and the Environment", desc: "A passage about what aviation will have produced in emissions by 2050, and what engineers will be working on in the coming decade." },
          focus: [
            "Future continuous: action in progress at a future point (This time tomorrow, I'll be flying)",
            "Future perfect: completion before a future point (They'll have landed by noon)",
            "Future in the past: was going to, was about to, was due to",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 8, Topic 4 — Comparing future forms" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 8, Topics 2–5 — Future continuous; future perfect; present simple; other forms" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 6, Topics 1–4 — All future forms (advanced)" },
          ],
        },
      ],
    },
    // ── S4 ────────────────────────────────────────────────────────────────────
    {
      num: "4", title: "Past Tenses", tags: ["past-tenses", "simple-past", "past-continuous", "narrative"],
      units: [
        {
          num: "10", id: "g-u10",
          title: "Past Simple: Forms and Use",
          goal: "Form the past simple correctly with regular and irregular verbs. Use it accurately for completed past actions, sequences of events, and finished time periods.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S4: Units 1–5",          focus: "Forms (regular/irregular); negatives; questions; use for completed events" },
            { level: "Intermediate", ref: "Oxford Intermediate · S4: Units 1–2",   focus: "Revising forms; deeper use; past tenses in polite requests (I wondered if…)" },
            { level: "Advanced",     ref: "Oxford Advanced · S4: Units 2, 6",      focus: "Simple past and past progressive revisited; more nuanced uses" },
          ],
          topic: { name: "Society and Culture — Globalisation and Cultural Identity", desc: "A passage tracing how globalisation transformed local industries, changed cultural habits, and brought both opportunities and losses over the past century." },
          focus: [
            "Irregular verb patterns grouped by vowel change (sing/sang, drive/drove, bring/brought)",
            "Past simple for sequences: She arrived, sat down, and opened her laptop",
            "Common error: using present perfect when past simple is correct (I have seen him yesterday ✗)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 6, Topics 2–3 — Past simple forms; negatives/questions" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 6, Topic 1 — Past simple" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 3 — Past simple and continuous; used to and would" },
          ],
        },
        {
          num: "11", id: "g-u11",
          title: "Past Continuous: Forms and Use",
          goal: "Form and use the past continuous for background actions, interrupted events, and simultaneous past activities. Distinguish it from the past simple.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S4: Units 6–7",          focus: "Form; background action; interrupted action; while/when" },
            { level: "Intermediate", ref: "Oxford Intermediate · S4: Units 2–3",   focus: "Revising and extending; contrast with past simple" },
            { level: "Advanced",     ref: "Oxford Advanced · S4: Units 2, 6",      focus: "Past progressive in narrative; subtle contrasts" },
          ],
          topic: { name: "Crime, Law and Punishment — Crime and Prevention", desc: "A crime-scene narrative where witnesses describe what people were doing when an incident occurred — rich context for background vs foreground event distinction." },
          focus: [
            "when + past simple (interruption) vs while + past continuous (background)",
            "Parallel actions: She was cooking while he was reading",
            "Repeated irritating past actions: He was always interrupting (with always)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 6, Topics 4–5 — Past continuous; past simple or continuous?" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 6, Topics 2–3 — Past continuous; contrast" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 3 — Past simple and continuous (advanced)" },
          ],
        },
      ],
    },
    // ── S5 ────────────────────────────────────────────────────────────────────
    {
      num: "5", title: "Perfect Tenses", tags: ["perfect-tenses", "present-perfect", "past-perfect", "aspect"],
      units: [
        {
          num: "12", id: "g-u12",
          title: "Present Perfect: Introduction",
          goal: "Form the present perfect and understand its core meaning: connecting a past event to the present moment. Use it for life experiences, recent events, and results visible now.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S5: Units 1–5",          focus: "Forms; finished actions vs simple past; time words; already/yet/just; since/for" },
            { level: "Intermediate", ref: "Oxford Intermediate · S5: Units 1–5",   focus: "Revising all basics; finished time vs up to now; news use" },
            { level: "Advanced",     ref: "Oxford Advanced · S4: Units 3–5",       focus: "Present perfect and simple past revisited; more about present perfect" },
          ],
          topic: { name: "Health and Wellbeing — Vaccination and Public Health", desc: "A passage about how vaccination campaigns have eliminated diseases, what researchers have discovered, and what challenges have emerged in recent years." },
          focus: [
            "since (point in time) vs for (duration)",
            "already (affirmative), yet (negative/question), just (very recent)",
            "Core rule: present perfect = past action with present relevance; past simple = no connection to now",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 7, Topics 1–4 — Experiences, results, just/already/yet, for/since" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 7, Topics 1–2 — Experiences and situations up to now" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 5 — Present perfect simple (advanced)" },
          ],
        },
        {
          num: "13", id: "g-u13",
          title: "Present Perfect vs Past Simple",
          goal: "Consistently choose between present perfect and past simple. This is the central difficulty of the English tense system for most learners.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S5: Units 2–3",                  focus: "Core contrast introduced with time expressions" },
            { level: "Intermediate", ref: "Oxford Intermediate · S5: Units 2–3, 7, 10",    focus: "Revising contrast; news and detail structure; full summary" },
            { level: "Advanced",     ref: "Oxford Advanced · S4: Units 3, 5, 7",           focus: "Summary; more about each form individually" },
          ],
          topic: { name: "Arts and Culture — Museums and Arts Funding", desc: "A passage comparing what a museum has achieved over its history (present perfect) with what it did during a specific renovation period (past simple)." },
          focus: [
            "Definite time words (yesterday, last year, in 2010) → always past simple",
            "Indefinite time words (ever, never, recently, so far) → always present perfect",
            "British vs American: Americans use past simple where British use present perfect (Did you eat yet? / Have you eaten yet?)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 7, Topic 5 — Present perfect or past simple?" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 7, Topic 3 — Present perfect or past simple?" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topics 5–6 — Present perfect simple and continuous (advanced)" },
          ],
        },
        {
          num: "14", id: "g-u14",
          title: "Present Perfect Continuous",
          goal: "Form and use the present perfect continuous for ongoing activities with duration and for recent activities whose effects are still visible. Distinguish it from the present perfect simple.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S5: Unit 6",              focus: "Form; duration; recent activity with visible result" },
            { level: "Intermediate", ref: "Oxford Intermediate · S5: Units 8–9",    focus: "Revising basics; present perfect simple vs continuous" },
            { level: "Advanced",     ref: "Oxford Advanced · S4: Units 4, 8",       focus: "Revising; more about present perfect continuous" },
          ],
          topic: { name: "Environment and Sustainability — Pollution and Waste", desc: "A passage about how factories have been releasing pollutants for decades, and researchers have been monitoring air quality over time." },
          focus: [
            "Emphasis on duration → continuous (I've been waiting for an hour)",
            "Emphasis on completion or number → simple (I've written three reports)",
            "Verbs rarely in continuous even here: know, love, own",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 7, Topics 6–7 — Present perfect continuous; simple vs continuous" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 7, Topics 4–5 — Present perfect continuous; simple vs continuous" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 6 — Present perfect continuous (advanced)" },
          ],
        },
        {
          num: "15", id: "g-u15",
          title: "Past Perfect: Simple and Continuous",
          goal: "Use the past perfect to show one past action happened before another. Understand when it is obligatory vs optional. Extend to the past perfect continuous.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S5: Unit 7",               focus: "Form; sequencing past events; basic narrative use" },
            { level: "Intermediate", ref: "Oxford Intermediate · S5: Units 11–14",   focus: "Revising basics; more about past perfect; continuous form; first time structures" },
            { level: "Advanced",     ref: "Oxford Advanced · S4: Units 9–12",        focus: "Past perfect with time conjunctions; continuous; first time — advanced" },
          ],
          topic: { name: "Society and Culture — Immigration and Migration", desc: "A narrative about migrants describing what had happened in their home countries before they decided to leave, and what had been changing over years of political turmoil." },
          focus: [
            "Past perfect only needed when sequence is unclear from context",
            "after makes past perfect optional: After she left / After she had left (both correct)",
            "Past perfect continuous: had been working — emphasises duration before a past point",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 — Not covered at this level" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 6, Topics 5–6 — Past perfect simple and continuous" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 5, Topic 4 — Past perfect simple and continuous (advanced)" },
          ],
        },
      ],
    },
    // ── S6 ────────────────────────────────────────────────────────────────────
    {
      num: "6", title: "Modal Verbs", tags: ["modals", "obligation", "possibility", "ability", "deduction"],
      units: [
        {
          num: "16", id: "g-u16",
          title: "must and have to: Obligation and Deduction",
          goal: "Use must and have to for obligation and must for logical deduction. Understand mustn't vs don't have to. Extend to had to and will have to.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S6: Units 2–5",          focus: "must; have to; mustn't vs don't have to; had to/will have to" },
            { level: "Intermediate", ref: "Oxford Intermediate · S6: Units 2–4",   focus: "Revising must/should/ought to; have to vs must; must not/don't have to/needn't" },
            { level: "Advanced",     ref: "Oxford Advanced · S5: Unit 5",          focus: "Obligation: must and have (got) to — advanced" },
          ],
          topic: { name: "Government and Politics — Taxation", desc: "A passage about what citizens must pay, what businesses have to report, and what regulators must not overlook." },
          focus: [
            "must (internal/speaker's authority) vs have to (external rule)",
            "mustn't (prohibition) ≠ don't have to (no obligation — free choice)",
            "must be for deduction (She must be tired — she's been working all day)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 9, Topics 4–6 — have to/need to; must/mustn't; had to/will have to" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 9, Topics 4–5 — Rules; necessary and unnecessary actions" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 7, Topic 4 — Obligation and necessity (advanced)" },
          ],
        },
        {
          num: "17", id: "g-u17",
          title: "can, could, may, might: Ability and Possibility",
          goal: "Use can/could for ability and can/could/may/might for possibility. Extend to perfect forms for past deduction. Master permission uses across registers.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S6: Units 7–10",              focus: "can (ability); could/be able to; may/might (possibility); permission" },
            { level: "Intermediate", ref: "Oxford Intermediate · S6: Units 7–9, 11",    focus: "must/can't for certainty; may/might; can/could ability past and future" },
            { level: "Advanced",     ref: "Oxford Advanced · S5: Units 3–4, 7–8",       focus: "Ability; permission; certainty; probability and possibility — advanced" },
          ],
          topic: { name: "Science and Research — Medical Research and Clinical Trials", desc: "A passage discussing what new treatments can do, what researchers might discover, and what could have been done differently in past trials." },
          focus: [
            "can (ability now) vs could (past ability, or polite possibility)",
            "may (formal permission/possibility) vs can (informal permission)",
            "might have done / could have done / must have done — past modal deductions",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 9, Topics 1–3 — can/can't; could/will be able to; permission" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 9, Topics 1–2 — Ability and possibility; making a guess" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 7, Topics 1–3 — Ability; possibility; speculation and expectation" },
          ],
        },
        {
          num: "18", id: "g-u18",
          title: "should, ought to, had better, would, used to",
          goal: "Use should/ought to for advice and expectation. Use had better for warnings. Use would for habits, requests, and conditionals. Master used to for past states and habits.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S6: Units 6, 12–14",            focus: "should; would; used to" },
            { level: "Intermediate", ref: "Oxford Intermediate · S6: Units 2, 5–6, 12–16", focus: "should/ought to; had better; supposed to; will/would typical behaviour; used to; perfect modals" },
            { level: "Advanced",     ref: "Oxford Advanced · S5: Units 6, 10–13",         focus: "should/ought to; had better; be supposed to; will/would; used to; need" },
          ],
          topic: { name: "Personal Development — Lifelong Learning and Career Changes", desc: "A passage about what adult learners should prioritise, what professionals used to do before automation changed their industries, and what employers would expect." },
          focus: [
            "should have done — past criticism or regret (You should have called)",
            "used to (past state or habit no longer true) vs would (past repeated action only — not states)",
            "had better = strong advice with implied consequence; not interchangeable with should",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 9, Topic 7 — should/ought to/must" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 9, Topics 6–8 — Advice; permission; requests and suggestions" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 7, Topics 5–7 — Prohibition; certainty, habits, willingness; other modal uses" },
          ],
        },
      ],
    },
    // ── S7 ────────────────────────────────────────────────────────────────────
    {
      num: "7", title: "Passives", tags: ["passive", "voice", "agent", "discourse"],
      units: [
        {
          num: "19", id: "g-u19",
          title: "Passive: Forms Across Tenses",
          goal: "Form passive constructions correctly across all major tenses. Understand when to use the passive and when to include or omit the agent.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S7: Units 1–6",          focus: "Introduction; simple present; future; simple past; progressive; present perfect passives" },
            { level: "Intermediate", ref: "Oxford Intermediate · S7: Units 1–2",   focus: "Revising active/passive; passive infinitives and -ing forms" },
            { level: "Advanced",     ref: "Oxford Advanced · S6: Units 2–3",       focus: "Revising basics; reasons for using passives" },
          ],
          topic: { name: "Arts and Culture — Museums and Their Collections", desc: "A passage about how artworks are stored, are restored, have been donated, and were acquired over centuries. Natural passive-heavy academic context." },
          focus: [
            "Formation: be (in any tense) + past participle",
            "Agent (by phrase): include only when it adds new, relevant information",
            "Passive with modal verbs: The proposal must be approved / could be reviewed",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 17, Topics 1–2 — The passive: present/past; with modals" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 16, Topics 1–2 — The passive; with modal verbs" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 14, Topic 1 — The passive: form and use (advanced)" },
          ],
        },
        {
          num: "20", id: "g-u20",
          title: "Passive: Advanced Structures",
          goal: "Use passive constructions with two objects, reporting passives (it is said that / he is said to), and have/get something done. Understand why passives are chosen in formal and academic writing.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic — Not covered at this level", focus: "—" },
            { level: "Intermediate", ref: "Oxford Intermediate · S7: Units 3–5",     focus: "Verbs with two objects; prepositions; reasons for using passives" },
            { level: "Advanced",     ref: "Oxford Advanced · S6: Units 4–5",         focus: "Complex passive structures; other advanced points" },
          ],
          topic: { name: "Government and Politics — Government Role and Transparency", desc: "An academic-register passage where passive dominates: It is believed that…, The policy is reported to have…, Citizens are expected to…" },
          focus: [
            "Two passive options: Susan was given a prize vs A prize was given to Susan",
            "Reporting passives: It is said that he is wealthy / He is said to be wealthy",
            "have something done (arrangement) vs get something done (more informal)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 17, Topic 3 — have something done" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 16, Topics 3–4 — have something done; passive reporting verbs" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 14, Topics 2–3 — Other passive structures; have/get something done" },
          ],
        },
      ],
    },
    // ── S8 ────────────────────────────────────────────────────────────────────
    {
      num: "8", title: "Questions and Negatives", tags: ["questions", "negatives", "word-order"],
      units: [
        {
          num: "21", id: "g-u21",
          title: "Question Formation",
          goal: "Form all question types correctly: yes/no, wh- questions, subject questions, and questions with prepositions. Distinguish direct from indirect questions.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S8: Units 1–5",          focus: "Yes/no questions; question words; subject questions; long subjects; prepositions" },
            { level: "Intermediate", ref: "Oxford Intermediate · S8: Units 1–3",   focus: "Revising basics; question-word subjects; prepositions in questions" },
            { level: "Advanced",     ref: "Oxford Advanced · S1: Unit 2",          focus: "Questions: revising the basics at advanced level" },
          ],
          topic: { name: "Media and Communication — Fake News and Information Trust", desc: "A journalistic passage posing and answering questions about disinformation. Use as a model for question types embedded naturally in analytical text." },
          focus: [
            "Subject questions: Who wrote this? (no auxiliary) vs Who did you call? (with auxiliary)",
            "Prepositions: Who did you go with? (informal) vs With whom did you go? (formal)",
            "Indirect questions: Could you tell me where the station is? — no inversion after question word",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 12, Topics 1–6 — All question types" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 11, Topics 3–5 — Yes/no; wh-; how/which/who/whose" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 10, Topic 3 — Questions and question words (advanced)" },
          ],
        },
        {
          num: "22", id: "g-u22",
          title: "Negatives",
          goal: "Form negatives correctly with auxiliaries, modal verbs, and in complex sentences. Understand not, no, nobody, never and avoid double negatives. Extend to negative inversion in formal writing.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S8: Units 6–8",          focus: "Negatives; not and no; nobody/never etc." },
            { level: "Intermediate", ref: "Oxford Intermediate · S8: Units 4–5",   focus: "Revising negatives; negative questions" },
            { level: "Advanced",     ref: "Oxford Advanced · S1: Units 3–6",       focus: "not and no; negative questions; more about negatives; advanced structures" },
          ],
          topic: { name: "Society and Culture — Income Inequality", desc: "A passage using carefully constructed negatives to challenge assumptions: It is not the case that…, No government has fully addressed…, Neither policy nor legislation has…" },
          focus: [
            "not (with verb) vs no (with noun): It's not a problem / It's no problem",
            "nobody/nothing/never — single negative only (never add not as well)",
            "Formal negative inversion: Never have I seen such conditions. Rarely does the policy succeed.",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 11, Topic 2 — Word order; negatives in imperatives" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 11, Topic 1 — Word order in statements" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 10, Topics 1–2 — Negative forms and meanings (advanced)" },
          ],
        },
      ],
    },
    // ── S9 ────────────────────────────────────────────────────────────────────
    {
      num: "9", title: "Infinitives and -ing Forms", tags: ["infinitive", "gerund", "verb-patterns", "-ing"],
      units: [
        {
          num: "23", id: "g-u23",
          title: "Infinitive: Uses and Patterns",
          goal: "Use the to-infinitive and bare infinitive correctly in a wide range of patterns: after verbs, adjectives, nouns, and as a purpose clause. Extend to perfect and passive infinitives.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S9: Units 1–8",                  focus: "to infinitive; purpose; verb + infinitive; verb + object + infinitive; adjective + infinitive" },
            { level: "Intermediate", ref: "Oxford Intermediate · S9: Units 1–2, 5–7, 12–17", focus: "Revising basics; more about infinitives; perfect infinitives; for…to; adjective patterns" },
            { level: "Advanced",     ref: "Oxford Advanced · S7: Units 2–5, 9–10",         focus: "Revising; perfect infinitives; infinitive without to; verb + infinitive; noun + infinitive" },
          ],
          topic: { name: "Work and Employment — Internships: Valuable or Exploitative?", desc: "A passage exploring what companies expect interns to do, what interns hope to gain, and whether unpaid labour appears to be ethically justifiable." },
          focus: [
            "Bare infinitive after modal verbs and make/let/help",
            "Perfect infinitive: to have done (action before the main verb's time)",
            "Passive infinitive: to be told, to be considered",
            "too + adjective + to and adjective + enough + to structures",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 13, Topics 2–3 — Verb + infinitive; verb + object + infinitive" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 12, Topics 2–3 — Verb + infinitive; verb + object + infinitive" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 9, Topic 5 — Infinitive patterns (advanced)" },
          ],
        },
        {
          num: "24", id: "g-u24",
          title: "-ing Form: Uses and Patterns",
          goal: "Use gerunds as subjects, objects, and after prepositions. Extend to possessive + gerund, perfect gerunds, and passive gerunds.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S9: Units 9–11",                    focus: "-ing as subject; after prepositions; verb + -ing" },
            { level: "Intermediate", ref: "Oxford Intermediate · S9: Units 8–10, 18–19",      focus: "-ing as subject/object; more about verb + -ing; go…ing; before/after/since/by + -ing; to…ing" },
            { level: "Advanced",     ref: "Oxford Advanced · S7: Units 6, 11–12",             focus: "Verb + -ing; to…ing; determiners with -ing forms" },
          ],
          topic: { name: "Health and Wellbeing — Diet and Lifestyle", desc: "A passage about the benefits of eating well, exercising regularly, and avoiding processed foods. Rich natural gerund context in a health discussion." },
          focus: [
            "Gerund as subject: Smoking is harmful — singular verb",
            "Preposition + gerund: instead of waiting, by improving, without knowing",
            "to + -ing (not infinitive!): look forward to hearing, object to being told",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 13, Topic 1 — Verb + -ing form" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 12, Topic 1 — Verb + -ing form" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 9, Topic 6 — Verb -ing forms; verb + -ing or infinitive? (advanced)" },
          ],
        },
        {
          num: "25", id: "g-u25",
          title: "Infinitive vs -ing Form: The Core Problem",
          goal: "Choose consistently and accurately between infinitive and -ing form after verbs where both are possible — including verbs where the choice changes meaning.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S9: Units 3, 11",              focus: "Verb + infinitive and verb + -ing introduced separately" },
            { level: "Intermediate", ref: "Oxford Intermediate · S9: Units 3–4, 9, 11",  focus: "Revising both; more about verb + infinitive or -ing; both possible" },
            { level: "Advanced",     ref: "Oxford Advanced · S7: Units 7–8",             focus: "Verb + object + infinitive or -ing; both possible — meaning differences" },
          ],
          topic: { name: "Education — Rote Learning vs Critical Thinking", desc: "A passage where teachers try introducing new methods vs try to introduce them, students stop memorising vs stop to think, and educators remember teaching their first classes vs remember to teach essentials." },
          focus: [
            "stop + -ing (end the activity) vs stop + to infinitive (pause in order to do something else)",
            "remember/forget + -ing (looking back at the past) vs + infinitive (looking forward)",
            "try + -ing (experiment) vs try + to infinitive (attempt, may fail)",
            "Verbs only with -ing: enjoy, avoid, deny, suggest, consider, keep",
            "Verbs only with infinitive: want, decide, hope, expect, promise, refuse",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 13 (all topics) — Foundational treatment" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 12, Topic 4 — Verb + infinitive or -ing (meaning difference)" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 9, Topic 6 — Verb + -ing or infinitive (advanced nuance)" },
          ],
        },
      ],
    },
    // ── S10 ───────────────────────────────────────────────────────────────────
    {
      num: "10", title: "Special Structures with Verbs", tags: ["phrasal-verbs", "causative", "two-objects", "get"],
      units: [
        {
          num: "26", id: "g-u26",
          title: "Phrasal Verbs and Verbs with Prepositions",
          goal: "Understand the difference between phrasal verbs (verb + particle) and prepositional verbs (verb + preposition). Learn common examples and build skill in inferring meaning from context.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S10: Units 1–3",          focus: "Structures with get; verbs with prepositions; phrasal verbs" },
            { level: "Intermediate", ref: "Oxford Intermediate · S10: Unit 8",      focus: "Phrasal verbs — revising and extending" },
            { level: "Advanced",     ref: "Oxford Advanced · S8: Units 3–5",        focus: "Verbs with prepositions and adverb particles; more about phrasal verbs" },
          ],
          topic: { name: "Technology and Society — Smartphones and Daily Life", desc: "A passage about how users put off updating their devices, look into security settings, and come across new applications unexpectedly." },
          focus: [
            "Separable phrasal verbs: turn the TV off / turn it off (pronoun must go between)",
            "Inseparable phrasal verbs: look after the children (cannot split)",
            "Phrasal-prepositional verbs: put up with, look forward to, run out of",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 18, Topics 4–5 — Phrasal verbs; confusing verbs" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 17, Topics 4–5 — Phrasal verbs; verb + preposition" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 15, Topics 2–3 — Dependent prepositions; phrasal verbs (advanced)" },
          ],
        },
        {
          num: "27", id: "g-u27",
          title: "Verbs with Two Objects and Causative Structures",
          goal: "Use verbs that take two objects in both patterns. Use causative have/get correctly. Understand make, let, help as causative verbs.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S10: Units 4–5",          focus: "Verbs with two objects; have something done" },
            { level: "Intermediate", ref: "Oxford Intermediate · S10: Units 2–3",   focus: "Revising two objects; causative have and get" },
            { level: "Advanced",     ref: "Oxford Advanced · S8: Units 6–7",        focus: "Verbs with two objects; causative structures with have, get, make" },
          ],
          topic: { name: "Urban Development — Green Spaces in Cities", desc: "A passage about how city councils have had parks redesigned, gave residents better access, and made urban planners reconsider development priorities." },
          focus: [
            "Pattern 1: She gave me the book vs Pattern 2: She gave the book to me",
            "Not all verbs take both patterns: explain, suggest, describe → only Pattern 2",
            "have something done (arrangement) vs make someone do something (compulsion)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 11, Topic 3 — Verbs with two objects" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 16, Topic 3 — have something done" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 9, Topics 1–2 — Verb patterns; verb + two objects" },
          ],
        },
      ],
    },
    // ── S11 ───────────────────────────────────────────────────────────────────
    {
      num: "11", title: "Articles", tags: ["articles", "a-an", "the", "zero-article"],
      units: [
        {
          num: "28", id: "g-u28",
          title: "a/an: Uses and Patterns",
          goal: "Use a/an correctly for first mention, jobs and roles, descriptions, and generic reference. Understand when a/an is and isn't used.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S11: Units 1–5",          focus: "a/an pronunciation; countable/uncountable; the vs a/an; jobs; descriptions" },
            { level: "Intermediate", ref: "Oxford Intermediate · S11: Units 1–3",   focus: "Revising a/an and one; jobs/descriptions; first mention" },
            { level: "Advanced",     ref: "Oxford Advanced · S10: Units 2–5",       focus: "Preliminary note; revising basics; more about generalising with a/an" },
          ],
          topic: { name: "Health and Wellbeing — Healthcare Systems", desc: "A passage introducing a doctor, a nurse, a clinic as first mentions before switching to the for known entities. Natural article-learning context." },
          focus: [
            "a/an = one, any one of (not specific) — first mention or non-specific reference",
            "a doctor (profession) — article always required in English: She is doctor ✗",
            "a/an for generic reference: A dog makes a good pet (= dogs in general)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 1, Topics 4–5 — a/an; the or a/an?" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 1, Topics 2–3 — a/an, the, no article; special uses" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 2, Topics 1–2 — Articles: naming, describing, classifying; fixed uses" },
          ],
        },
        {
          num: "29", id: "g-u29",
          title: "the: Uses and Special Cases",
          goal: "Use the for specific, known, or unique reference. Understand the in generalisations, with proper nouns, and in set phrases. Master the zero article.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S11: Units 3, 6–8",       focus: "the vs a/an; generalisations without the; names; special cases" },
            { level: "Intermediate", ref: "Oxford Intermediate · S11: Units 4–8",   focus: "Revising the; generalisations with and without; place names; other cases" },
            { level: "Advanced",     ref: "Oxford Advanced · S10: Units 3–5",       focus: "Revising basics; more about generalising; articles: other points" },
          ],
          topic: { name: "Society and Culture — Preserving Traditional Cultures", desc: "A passage mixing generic reference (music, language, culture) with specific reference (the Silk Road, the Ottoman Empire, the local dialect)." },
          focus: [
            "the = both speaker and listener know which one is meant",
            "Generalisations: Music is universal (zero article) vs The music of the 1960s was revolutionary (specific period)",
            "Set phrases with no article: in bed, at school, by car, after lunch",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 1, Topics 5–6 — the; uses of the and a/an" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 1, Topics 2–4 — Articles; special uses; article or no article?" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 2, Topics 1–2 — Articles (advanced and fixed uses)" },
          ],
        },
      ],
    },
    // ── S12 ───────────────────────────────────────────────────────────────────
    {
      num: "12", title: "Determiners", tags: ["determiners", "quantifiers", "some-any", "all", "both"],
      units: [
        {
          num: "30", id: "g-u30",
          title: "some, any, much, many, a lot of",
          goal: "Use some, any, much, many, a lot of, a little, a few, enough, too correctly across affirmatives, negatives, and questions. Understand the key contrasts.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S12: Units 2–9",          focus: "some/any; compounds; much/many; a lot of; a little/a few; enough; too/too much" },
            { level: "Intermediate", ref: "Oxford Intermediate · S12: Units 2–9",   focus: "Revising all; some/any or no article; any = it doesn't matter which; less/fewer" },
            { level: "Advanced",     ref: "Oxford Advanced · S11: Units 7–14",      focus: "some, any, no, none; much/many/more/most; little/few; enough; quantifying phrases" },
          ],
          topic: { name: "Environment and Sustainability — Sustainable Living", desc: "A passage about how much waste is generated, whether any recycling programmes are effective, and whether a few policy changes or many structural reforms are needed." },
          focus: [
            "some (affirmative) vs any (negative/question) — but some in offers (Would you like some?)",
            "a little (some, not much — mildly positive) vs little (hardly any — negative connotation)",
            "a few (some, not many — mildly positive) vs few (hardly any — negative connotation)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 1, Topics 7–9 — some/any; much/many/a lot of; a little/a few" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 2, Topics 5, 7 — some/any/all/most/no/none of; much/many/a lot of" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 2, Topic 3 — Quantifiers and demonstratives (advanced)" },
          ],
        },
        {
          num: "31", id: "g-u31",
          title: "all, every, each, both, either, neither",
          goal: "Use all, every, each, both, either, neither accurately and understand the subtle meaning differences. Extend to all of, every one of, each of structures.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S12: Units 9–11",           focus: "all; all and every/each; both, either, neither" },
            { level: "Intermediate", ref: "Oxford Intermediate · S12: Units 10–13",   focus: "Revising all; all/every/everybody/everything; every and each; both/either/neither" },
            { level: "Advanced",     ref: "Oxford Advanced · S11: Units 2–6",         focus: "all; whole and all; both; either/neither; every and each — advanced" },
          ],
          topic: { name: "Work and Employment — The Gender Pay Gap", desc: "A passage comparing two groups: Both men and women report dissatisfaction, every employee deserves equal pay, each department shows a different pattern, neither policy has fully succeeded." },
          focus: [
            "all + plural noun (no of needed unless with pronoun: all of us)",
            "every + singular (always): every student is…; each — more individual focus",
            "both (two, positive); either (one of two); neither (none of two)",
            "neither/either + singular verb; neither of them is/are (both acceptable in modern English)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 1, Topic 10 — all, most, some, no/none, both" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 2, Topic 8 — both/either/neither; each/every" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 2, Topic 3 — Quantifiers (advanced)" },
          ],
        },
      ],
    },
    // ── S13 ───────────────────────────────────────────────────────────────────
    {
      num: "13", title: "Personal Pronouns and Possessives", tags: ["pronouns", "possessives", "reflexive"],
      units: [
        {
          num: "32", id: "g-u32",
          title: "Personal Pronouns and Possessives",
          goal: "Use subject and object pronouns, possessive adjectives, and possessive pronouns correctly. Extend to reflexive pronouns and generic you, one, they.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S13: Units 1–4",          focus: "Personal pronouns; possessive adjectives and pronouns; reflexives" },
            { level: "Intermediate", ref: "Oxford Intermediate · S13: Units 1–5",   focus: "Revising all; possessives (a friend of mine); pronoun cases; reflexives; you/one/they" },
            { level: "Advanced",     ref: "Oxford Advanced · S9: Units 9–12",       focus: "Personal pronouns; reflexives; one/you/they (general); singular they" },
          ],
          topic: { name: "Society and Culture — Family Structures Across Cultures", desc: "A passage about how one defines family differently across cultures, how they (institutions) shape family structure, and how each other and one another function in community life." },
          focus: [
            "myself/yourself for emphasis (I did it myself) vs reflexive (She hurt herself)",
            "a friend of mine (not a my friend) — double possessive structure",
            "Singular they for gender-neutral reference — now standard in formal writing",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 2, Topics 1, 3, 5 — Subject/object pronouns; possessives; reflexives" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 2, Topics 2, 4 — Possessive adjectives and pronouns; reflexive pronouns" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 1, Topics 4–5 — Personal pronouns; impersonal and indefinite pronouns" },
          ],
        },
      ],
    },
    // ── S14 ───────────────────────────────────────────────────────────────────
    {
      num: "14", title: "Nouns", tags: ["nouns", "countable", "uncountable", "plural", "possessive"],
      units: [
        {
          num: "33", id: "g-u33",
          title: "Countable and Uncountable Nouns",
          goal: "Classify nouns as countable or uncountable and use them with correct determiners and verb agreement. Handle nouns that function as both.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S14: Units 1–3",          focus: "Singular/plural; countable and uncountable; one/ones" },
            { level: "Intermediate", ref: "Oxford Intermediate · S14: Units 1–2",   focus: "Revising countable/uncountable; more about both categories" },
            { level: "Advanced",     ref: "Oxford Advanced · S9: Units 2–3",        focus: "Countable and uncountable — advanced; mixed singular and plural" },
          ],
          topic: { name: "Food and Agriculture — Food Waste", desc: "A passage with natural countable (meals, ingredients, plates) and uncountable (food, waste, energy, water) noun contrast in a meaningful real-world context." },
          focus: [
            "Uncountable nouns: never a/an, never plural -s: advice, information, furniture, luggage",
            "Nouns with both uses: a coffee (a cup of) vs coffee (the substance)",
            "Units of measure: a piece of advice, a loaf of bread, a litre of milk",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 1, Topics 1–3 — Singular/plural; countable/uncountable" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 1, Topic 1 — Nouns: countable/uncountable" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 1, Topic 1 — Nouns (advanced): gender, agreement, countable/uncountable" },
          ],
        },
        {
          num: "34", id: "g-u34",
          title: "Noun Forms: Plurals, Possessives, Noun + Noun",
          goal: "Use irregular plurals, possessive 's structures, and noun + noun compounds correctly. Understand when to use 's vs an of phrase.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S14: Units 1–2, 5–7",       focus: "Singular/plural spelling; collective nouns; possessive forms; noun + noun" },
            { level: "Intermediate", ref: "Oxford Intermediate · S14: Units 3–4, 6–9", focus: "Spelling plurals; special cases; possessive 's vs of; noun + noun vs preposition" },
            { level: "Advanced",     ref: "Oxford Advanced · S9: Units 4–5",           focus: "Noun + noun or preposition structure; possessive or other structure" },
          ],
          topic: { name: "Urban Development — Smart Cities", desc: "A passage rich in compound nouns (traffic management, city council, data protection) and possessive structures (the city's infrastructure, the government's response to citizens' needs)." },
          focus: [
            "'s for people/animals (the teacher's explanation); of for things (the cost of living)",
            "Compound nouns: stress on first element (CITy centre) — not the same as adjective + noun",
            "Special plurals: aircraft, sheep, series (unchanged); criteria, phenomena (Latin/Greek)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 2, Topic 2 — Possessive forms of nouns" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 1, Topic 1 (Nouns); Unit 2, Topic 1 (Possessive forms)" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 1, Topics 2–3 — Possessive 's; possessive with 's or of?" },
          ],
        },
      ],
    },
    // ── S15 ───────────────────────────────────────────────────────────────────
    {
      num: "15", title: "Adjectives and Adverbs", tags: ["adjectives", "adverbs", "position", "order"],
      units: [
        {
          num: "35", id: "g-u35",
          title: "Adjectives: Position and Order",
          goal: "Place adjectives correctly before nouns and after linking verbs. Use correct order when multiple adjectives precede a noun. Understand the -ed vs -ing adjective distinction.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S15: Unit 1",              focus: "Adjectives — basic position and form" },
            { level: "Intermediate", ref: "Oxford Intermediate · S15: Units 1–2, 4", focus: "Revising adjectives; -ed/-ing; order of adjectives" },
            { level: "Advanced",     ref: "Oxford Advanced · S12: Units 2–6",        focus: "Adjective or adverb?; order; position; participles; adjectives without nouns" },
          ],
          topic: { name: "Arts and Culture — Contemporary vs Traditional Art", desc: "A description-rich passage (a striking modern sculpture, an elegant ancient vase, fascinating yet disturbing imagery) that naturally requires multi-adjective ordering." },
          focus: [
            "Standard adjective order: Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose + Noun",
            "interested (feeling) vs interesting (causing the feeling) — applies to all -ed/-ing pairs",
            "Postpositive adjectives: something interesting, someone responsible (after indefinite pronouns)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 4, Topics 1–2 — Types of adjective; -ed/-ing adjectives" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 4, Topics 1–2 — Adjectives; order and stronger/weaker meanings" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 4, Topics 1–2 — Adjective patterns; groups of adjectives (advanced)" },
          ],
        },
        {
          num: "36", id: "g-u36",
          title: "Adverbs: Types, Position, and Use",
          goal: "Identify and use different types of adverbs (manner, frequency, degree, sentence adverbs) in their correct positions. Distinguish adjectives from adverbs in confusing cases.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S15: Units 2–6",            focus: "Manner adverbs; other adverbs; adverbs with the verb; -ed/-ing; confusing pairs" },
            { level: "Intermediate", ref: "Oxford Intermediate · S15: Units 1, 5–7",  focus: "Revising; adverbs with the verb; even and only; confusing pairs" },
            { level: "Advanced",     ref: "Oxford Advanced · S12: Units 8–9",         focus: "Adverb position (1) and (2): with the verb" },
          ],
          topic: { name: "Media and Communication — Advertising and False Claims", desc: "A passage with a range of adverbs modifying claims (clearly misleading, highly exaggerated, barely regulated, often ignored by authorities)." },
          focus: [
            "Position rules: manner (quickly) → end; frequency (often) → mid; degree (very) → before adjective",
            "Confusing pairs: hard vs hardly; late vs lately; fast (same form for both adjective and adverb)",
            "Sentence adverbs (Unfortunately, the policy failed) — modify the whole sentence",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 4, Topics 3–4 — Types of adverb; word order" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 4, Topics 5–7 — Types; word order; comparison of adverbs" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 4, Topics 6–7 — Adverb form and use; position (advanced)" },
          ],
        },
      ],
    },
    // ── S16 ───────────────────────────────────────────────────────────────────
    {
      num: "16", title: "Comparison", tags: ["comparison", "comparative", "superlative", "as-as"],
      units: [
        {
          num: "37", id: "g-u37",
          title: "Comparative and Superlative Forms",
          goal: "Form comparatives and superlatives correctly for adjectives and adverbs. Use irregular forms accurately. Extend to double comparatives and as...as structures.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S16: Units 1–6",          focus: "Forms; comparative or superlative?; use; adverb comparison; as…as" },
            { level: "Intermediate", ref: "Oxford Intermediate · S16: Units 1–6",   focus: "Revising adjective and adverb comparison; as…as; more on comparatives; like/as/so/such" },
            { level: "Advanced",     ref: "Oxford Advanced · S12: Units 10–18",     focus: "as…as; -er/-est or more/most?; double comparatives; intensifiers; such/so; like/as" },
          ],
          topic: { name: "Sports and Leisure — Athletes' Salaries", desc: "A passage comparing earnings, performance, and public perception across sports: far higher than, the most watched, increasingly competitive, as demanding as ever." },
          focus: [
            "One/two-syllable adjectives: generally -er/-est; some exceptions (more bored, not boreder)",
            "as + adjective/adverb + as for equality; not as...as for inequality",
            "Double comparative: The more you read, the better you write",
            "Intensifiers: much/far/considerably/slightly + comparative",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 4, Topics 5–8 — Comparatives; superlatives; not as…as; too/enough" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 4, Topics 3–4 — Comparison of adjectives; comparative structures" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 4, Topics 3–4 — Comparative and superlative; other comparative patterns" },
          ],
        },
      ],
    },
    // ── S17 ───────────────────────────────────────────────────────────────────
    {
      num: "17", title: "Conjunctions", tags: ["conjunctions", "subordination", "coordination", "discourse"],
      units: [
        {
          num: "38", id: "g-u38",
          title: "Coordinating and Subordinating Conjunctions",
          goal: "Use coordinating conjunctions (and, but, or, so) and subordinating conjunctions (because, although, when, unless, until) accurately with correct position rules and tense requirements.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S17: Units 1–6",          focus: "Introduction; position; tenses with time conjunctions; because/so/although/but; and; double conjunctions" },
            { level: "Intermediate", ref: "Oxford Intermediate · S17: Units 1–8",   focus: "Revising use and position; present for future; so that/as long as/until; leaving out that; perfect for completion; tenses with since/for; conjunction + -ing/-ed" },
            { level: "Advanced",     ref: "Oxford Advanced · S14: Units 2–5",       focus: "Revising basics; and and or; double conjunctions; tense simplification; past tense with present/future meaning" },
          ],
          topic: { name: "Environment and Sustainability — Individual vs Government Responsibility", desc: "A passage arguing a position using although, because, unless, not only…but also, provided that — natural discourse conjunction context for IELTS-style writing." },
          focus: [
            "Subordinating conjunctions can begin a sentence: Although it rained, the event continued",
            "Tenses with time conjunctions: I'll call you when I arrive (NOT will arrive)",
            "Leaving out that: She knew (that) he was right — optional in informal English",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 16, Topics 1–4 — and/but/or; because/so/so that; time linkers; story linkers" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 15, Topics 1–5 — Reason; causes/results; adding information; contrast; ordering events" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 13, Topics 1–4 — Linking sentences; subordinate clauses; contrast; adverbial linking" },
          ],
        },
      ],
    },
    // ── S18 ───────────────────────────────────────────────────────────────────
    {
      num: "18", title: "Conditionals", tags: ["conditionals", "if", "wish", "hypothetical"],
      units: [
        {
          num: "39", id: "g-u39",
          title: "Zero and First Conditional",
          goal: "Use the zero conditional for facts and general truths. Use the first conditional for real, likely future conditions. Extend to alternatives to if.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S18: Units 1–2",          focus: "if: position and unless; future conditional" },
            { level: "Intermediate", ref: "Oxford Intermediate · S18: Units 1–3",   focus: "Revising ordinary tense use; unless; first conditional extended" },
            { level: "Advanced",     ref: "Oxford Advanced · S17: Units 2–3",       focus: "if: how many conditionals?; revising the basics" },
          ],
          topic: { name: "Environment and Sustainability — Climate Policy", desc: "If governments act now, temperatures will stabilise. Unless emissions drop sharply, sea levels will continue to rise. Provided that funding is secured, renewable energy will expand." },
          focus: [
            "Zero: If + present simple, present simple (general truth/scientific fact)",
            "First: If + present simple, will + infinitive (real future condition — NOT if + will)",
            "unless = if not; as long as / provided that = conditional with extra emphasis",
            "in case ≠ if: Take an umbrella in case it rains (precaution, not condition)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 10, Topics 1–2 — Present conditions; first conditional" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 10, Topic 1 — Present and future conditions" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 8, Topic 1 — if and alternatives; present and future conditions" },
          ],
        },
        {
          num: "40", id: "g-u40",
          title: "Second and Third Conditional",
          goal: "Use the second conditional for unreal present/future situations and the third conditional for unreal past situations. Extend to mixed conditionals and formal inversion.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S18: Units 3–6",          focus: "Not real/not probable; if I were you; comparing first and second; unreal past" },
            { level: "Intermediate", ref: "Oxford Intermediate · S18: Units 2–5",   focus: "Revising second; could in conditionals; unreal past (third)" },
            { level: "Advanced",     ref: "Oxford Advanced · S17: Units 3, 6–7",    focus: "Revising basics; more advanced points; informal structures" },
          ],
          topic: { name: "Government and Politics — Voting Systems and Democracy", desc: "If voting were compulsory, turnout would be higher. If citizens had been better informed, they would have voted differently. If the system had changed, politics might look different today." },
          focus: [
            "Second: If + past simple, would + infinitive (NOT would in the if clause)",
            "were (not was) in formal/written second conditional: If I were you…",
            "Third: If + past perfect, would have + past participle",
            "Mixed: past condition + present result (If she had studied harder, she would be more confident now)",
            "Formal inversion: Were I to resign… / Had I known… / Should you need help…",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 10, Topic 3 — Second conditional" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 10, Topics 2–4 — Unlikely/unreal; past conditions; mixed conditionals" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 8, Topics 2–4 — Unlikely/unreal/past conditions; I wish/if only; subjunctives" },
          ],
        },
        {
          num: "41", id: "g-u41",
          title: "wish, if only, it's time, I'd rather",
          goal: "Use wish and if only with correct tense to express regret and desire for change. Extend to it's time, I'd rather, and as if/as though.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic — Not covered directly", focus: "—" },
            { level: "Intermediate", ref: "Oxford Intermediate · S18: Units 7–9", focus: "if only and I wish: tenses; in case; it's time and I'd rather" },
            { level: "Advanced",     ref: "Oxford Advanced · S17: Unit 3; S8: Unit 4", focus: "Subjunctives and the unreal past — full advanced treatment" },
          ],
          topic: { name: "Work and Employment — Career Regrets and Changes", desc: "I wish I had chosen a different career. If only I had known about this field earlier. It's time I made a real decision. I'd rather be doing something that matters to me." },
          focus: [
            "wish + past simple (present regret: I wish I knew)",
            "wish + would (complaint about someone else: I wish he would stop)",
            "wish + past perfect (past regret: I wish I had studied)",
            "it's time + past simple (overdue action: It's time you called)",
            "I'd rather + past simple (preference about someone else: I'd rather you didn't smoke)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 — Not covered at this level" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 10, Topic 5 — I wish, if only, it's time" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 8, Topics 3–4 — I wish and if only; subjunctives and the unreal past" },
          ],
        },
      ],
    },
    // ── S19 ───────────────────────────────────────────────────────────────────
    {
      num: "19", title: "Relative Clauses", tags: ["relative-clauses", "who", "which", "that", "whose", "non-defining"],
      units: [
        {
          num: "42", id: "g-u42",
          title: "Defining Relative Clauses",
          goal: "Use defining relative clauses with who, which, that to identify people and things. Understand when the relative pronoun can be omitted. Extend to whose, where, when, what.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S19: Units 1–5",          focus: "who/which; that; omitting relative pronouns; prepositions; relative what" },
            { level: "Intermediate", ref: "Oxford Intermediate · S19: Units 1–5",   focus: "Revising who/which/that; what = the thing that; whose; prepositions" },
            { level: "Advanced",     ref: "Oxford Advanced · S15: Units 2–3",       focus: "Revising basics; identifying and non-identifying clauses" },
          ],
          topic: { name: "Technology and Society — Artificial Intelligence", desc: "AI is a technology that is transforming industries. Researchers who specialise in machine learning are in high demand. The algorithms whose outputs affect millions of people deserve careful scrutiny." },
          focus: [
            "who (people), which (things), that (people or things in defining clauses)",
            "Omitting relative pronoun: only when it is the object of the relative clause",
            "whose for possession: a scientist whose research changed medicine",
            "Prepositions: the company that she works for (informal) vs the company for which she works (formal)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 15, Topics 1–3 — Relative clauses and pronouns; prepositions" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 14, Topic 1 — Relative clauses (defining)" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 12, Topic 1 — Relative clauses (defining and non-defining)" },
          ],
        },
        {
          num: "43", id: "g-u43",
          title: "Non-Defining Relative Clauses and Reduced Relatives",
          goal: "Use non-defining relative clauses to add extra information. Understand reduced relative clauses and participial phrases. Extend to which referring to a whole clause.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic — Not covered at this level", focus: "—" },
            { level: "Intermediate", ref: "Oxford Intermediate · S19: Units 6–8",    focus: "Reduced relative clauses; non-identifying clauses; reading complex sentences" },
            { level: "Advanced",     ref: "Oxford Advanced · S15: Units 3–6",        focus: "Identifying vs non-identifying; reduced relatives; prepositions; other points" },
          ],
          topic: { name: "Arts and Culture — Government Funding for the Arts", desc: "The arts sector, which employs thousands of people, receives limited funding. Museums, whose collections span centuries, face annual cuts. Works donated by private collectors, many of which are priceless, remain inaccessible." },
          focus: [
            "Non-defining: always use commas; never use that; cannot omit the pronoun",
            "which referring to whole clause: She passed the exam, which surprised everyone",
            "Reduced relatives: the man waiting outside (= who is waiting); the report submitted last week (= which was submitted)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 — Not covered at this level" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 14, Topics 2–3 — Non-defining relative clauses; clauses after the noun" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 12, Topics 1–3 — Relative clauses; pronouns/adverbs/prepositions; participle clauses" },
          ],
        },
      ],
    },
    // ── S20 ───────────────────────────────────────────────────────────────────
    {
      num: "20", title: "Indirect Speech", tags: ["reported-speech", "indirect-speech", "reporting-verbs", "tense-backshift"],
      units: [
        {
          num: "44", id: "g-u44",
          title: "Reported Statements and Questions",
          goal: "Report statements and questions accurately using tense backshift, pronoun changes, and time/place word changes. Understand when backshift is optional.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S20: Units 1–5",          focus: "Tenses and pronouns; indirect questions; present reporting verbs; here/now → there/then; infinitives" },
            { level: "Intermediate", ref: "Oxford Intermediate · S20: Units 1–7",   focus: "Revising all; present situations (no backshift); indirect questions; infinitives; special cases" },
            { level: "Advanced",     ref: "Oxford Advanced · S16: Units 2–4",       focus: "Revising basics; more about tenses; other points in indirect speech" },
          ],
          topic: { name: "Media and Communication — Fake News and Misinformation", desc: "A passage reporting what politicians said they were doing, what journalists claimed had happened, and what experts warned would occur if action weren't taken." },
          focus: [
            "Tense backshift: present → past, past → past perfect, will → would",
            "No backshift needed: when the situation is still true (She said the Earth orbits the Sun)",
            "Time/place words: now → then, today → that day, here → there, tomorrow → the next day",
            "Indirect questions: She asked where he was going (no inversion, no question mark)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 14, Topics 1–3 — Reported statements; say/tell/ask/advise; indirect questions" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 13, Topics 1–2 — Reported statements; reported questions" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 11, Topics 1–3 — Patterns in reported speech; changes; reported questions/commands" },
          ],
        },
        {
          num: "45", id: "g-u45",
          title: "Reporting Verbs",
          goal: "Go beyond said and told to use a wide range of reporting verbs with correct grammatical patterns. Apply reporting verbs in academic and formal writing contexts.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S20: Unit 2",             focus: "say/tell distinction introduced" },
            { level: "Intermediate", ref: "Oxford Intermediate · S20: Unit 7",      focus: "Indirect speech special cases and more complex reporting verbs" },
            { level: "Advanced",     ref: "Oxford Advanced · S16: Units 3–4",       focus: "More about tenses; other points including advanced reporting verbs" },
          ],
          topic: { name: "Science and Research — Open Access Publishing", desc: "A passage where researchers argue, claim, demonstrate, acknowledge, warn, and recommend — natural context for reporting verb variety in academic writing." },
          focus: [
            "Pattern 1 — verb + that clause: argue, claim, explain, confirm, suggest",
            "Pattern 2 — verb + object + infinitive: ask, tell, advise, warn, encourage, persuade",
            "Pattern 3 — verb + -ing: admit, deny, recommend, acknowledge",
            "say (no object) vs tell (always needs object): She said it was late / She told me it was late",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 — Not covered at this level (see Unit 44 for basics)" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 13, Topic 4 — Reporting verb patterns" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 11, Topic 1 — Patterns in reported speech (advanced)" },
          ],
        },
      ],
    },
    // ── S21 ───────────────────────────────────────────────────────────────────
    {
      num: "21", title: "Prepositions", tags: ["prepositions", "time", "place", "collocations", "verb-preposition"],
      units: [
        {
          num: "46", id: "g-u46",
          title: "Prepositions of Time and Place",
          goal: "Use at, in, on for time and place correctly. Extend to movement prepositions and the many fixed expressions that resist rule-based learning.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S21: Units 1–7",          focus: "at/in/on (time); from…to/until/by; for/during/while; in/on (place); at; other place prepositions; movement" },
            { level: "Intermediate", ref: "Oxford Intermediate · S21: Units 1–3",   focus: "Revising time; revising place and movement; some preposition choices" },
            { level: "Advanced",     ref: "Oxford Advanced · S13: Units 2–6",       focus: "Revising time; in/on (place); at; prepositions with -ing; end-position; before conjunctions" },
          ],
          topic: { name: "Transport and Travel — Urban Commuting", desc: "A passage describing how commuters travel in cities, arrive at stations, board at platforms, travel by train, and arrive on time rather than in time for their first appointment." },
          focus: [
            "Time: at (precise time), in (months, years, seasons, parts of day), on (days, dates)",
            "Place: at (point/location), in (enclosed space), on (surface)",
            "Fixed expressions: in time vs on time; at the end vs in the end",
            "Movement prepositions: into/out of (direction); across, along, past, through (manner)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 3, Topics 1–5 — Place; movement; time" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 3, Topics 1–3 — Place; movement; time" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 3, Topics 2–3 — Prepositions of place, movement, time; other meanings" },
          ],
        },
        {
          num: "47", id: "g-u47",
          title: "Verb, Adjective, and Noun + Preposition Collocations",
          goal: "Build a working knowledge of common verb + preposition, adjective + preposition, and noun + preposition collocations. Understand that these are idiomatic, not rule-based.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S10: Unit 2",             focus: "Verbs with prepositions introduced" },
            { level: "Intermediate", ref: "Oxford Intermediate · S21: Units 4–7",   focus: "Verbs; nouns; adjectives; expressions beginning with prepositions" },
            { level: "Advanced",     ref: "Oxford Advanced · S13: Units 8–9",       focus: "Six confusable prepositions; six more confusable prepositions" },
          ],
          topic: { name: "Work and Employment — Workplace Stress and Employee Rights", desc: "A passage exploring what employees cope with, what managers contribute to, what organisations are responsible for, and what workers are entitled to." },
          focus: [
            "Verb + preposition: agree with, apologise for, belong to, consist of, depend on, insist on, refer to",
            "Adjective + preposition: aware of, capable of, interested in, responsible for, similar to, surprised at/by",
            "Noun + preposition: a lack of, an increase in, a need for, an effect on",
            "These must be learned as collocations — no single rule governs them",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 18, Topics 2–3 — Verb + preposition" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 17, Topics 2–3 — Adjective/noun + preposition; verb + preposition" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 15, Topics 1–2 — Dependent prepositions (advanced)" },
          ],
        },
      ],
    },
    // ── S22 ───────────────────────────────────────────────────────────────────
    {
      num: "22", title: "Spoken Grammar", tags: ["spoken-grammar", "question-tags", "short-answers", "ellipsis", "register"],
      units: [
        {
          num: "48", id: "g-u48",
          title: "Question Tags and Short Answers",
          goal: "Form question tags correctly across all auxiliary types. Use short answers and reply questions naturally. Understand the intonation difference between genuine questions and confirmation-seeking.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S22: Units 1–4",          focus: "Question tags; short answers; reply questions; revision of spoken Q&A" },
            { level: "Intermediate", ref: "Oxford Intermediate · S22: Units 4–5",   focus: "Revising question tags; more about tags (Nobody phoned, did they?)" },
            { level: "Advanced",     ref: "Oxford Advanced · Part 2: Unit 19",      focus: "Short answers, reply questions and question tags — advanced" },
          ],
          topic: { name: "Society and Culture — The Generation Gap", desc: "A dialogue-style passage between a young adult and an older mentor, rich in question tags (Things have changed, haven't they?) and reply questions (Have they really?)." },
          focus: [
            "Formation: positive statement → negative tag; negative statement → positive tag",
            "Auxiliary matches the main clause: She can swim, can't she?",
            "Tricky cases: I am right, aren't I?; Let's go, shall we?; Nobody called, did they?",
            "Falling intonation (confirmation) vs rising intonation (genuine question)",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 20, Topic 1 — Question tags" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 20, Topic 1 — Spoken question forms" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 18, Topic 1 — Spoken questions and responses (advanced)" },
          ],
        },
        {
          num: "49", id: "g-u49",
          title: "Ellipsis, so/neither, and Spoken Sentence Structure",
          goal: "Understand how words are left out (ellipsis) in natural speech. Use so am I / neither do I correctly. Recognise the structural features of spoken English.",
          spiral: [
            { level: "Basic",        ref: "Oxford Basic · S22: Units 5–6",                      focus: "Leaving out words; so am I / nor do I" },
            { level: "Intermediate", ref: "Oxford Intermediate · S22: Units 1–3, 7–8",          focus: "Spoken sentence structure; dropping beginnings; dropping words after auxiliaries; so am I; structures with so and not" },
            { level: "Advanced",     ref: "Oxford Advanced · Part 2: Units 13–17, 18, 21–25",   focus: "Ellipsis after auxiliaries; with infinitives; so/not; after and/but/or; spoken sentence structure; politeness; emphasis; abbreviations" },
          ],
          topic: { name: "Media and Communication — The Decline of Face-to-Face Communication", desc: "A dialogue-based passage where speakers use natural ellipsis (Going out tonight? — Might do.), so do I, and short responses showing authentic spoken grammar patterns." },
          focus: [
            "Ellipsis after auxiliaries: 'Are you coming?' 'I am.' (not repeating the main verb)",
            "Ellipsis with infinitives: I'd love to (not I'd love to come — understood from context)",
            "So am I / So do I (agreeing with positive); Neither am I / Nor do I (agreeing with negative)",
            "Spoken discourse markers: I mean, you know, sort of, kind of, well — not errors, but signals",
          ],
          resources: [
            { level: "A1/A2", ref: "MyGrammarLab A1/A2 · Unit 20, Topics 2–5 — too/so/either/neither; surprise; weak forms; conversation features" },
            { level: "B1/B2", ref: "MyGrammarLab B1/B2 · Unit 20, Topics 2–5 — Agreeing/disagreeing; emphasis; spoken features" },
            { level: "C1/C2", ref: "MyGrammarLab C1/C2 · Unit 18, Topics 1–5 — All spoken grammar (advanced)" },
          ],
        },
      ],
    },
  ],
};

const totalUnits    = grammarData.sections.reduce((acc, s) => acc + s.units.length, 0);
const totalSections = grammarData.sections.length;

// ── Resource level pill ───────────────────────────────────────────────────────
function ResourcePill({ level }) {
  const map = {
    "A1/A2": { bg: "#d1fae5", text: "#065f46" },
    "B1/B2": { bg: "#dbeafe", text: "#1e3a5f" },
    "C1/C2": { bg: "#ede9fe", text: "#4c1d95" },
  };
  const c = map[level] || map["A1/A2"];
  return (
    <span style={{ fontSize: "10px", fontWeight: 800, backgroundColor: c.bg, color: c.text, padding: "2px 8px", borderRadius: "999px", whiteSpace: "nowrap", flexShrink: 0 }}>
      {level}
    </span>
  );
}

// ── Spiral level pill ─────────────────────────────────────────────────────────
function SpiralPill({ level }) {
  const c = levelColors[level] || levelColors.Basic;
  return (
    <span style={{ fontSize: "10px", fontWeight: 800, backgroundColor: c.bg, color: c.text, padding: "2px 8px", borderRadius: "999px", whiteSpace: "nowrap", flexShrink: 0 }}>
      {level}
    </span>
  );
}

// ── Unit Card ─────────────────────────────────────────────────────────────────
function UnitCard({ unit, sc }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f3f4f6" }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", backgroundColor: open ? sc.bg : "#ffffff", border: "none", cursor: "pointer", textAlign: "left", transition: "background-color 0.15s" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ minWidth: "36px", height: "36px", borderRadius: "8px", backgroundColor: open ? sc.badge : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: open ? sc.text : "#6b7280", flexShrink: 0, padding: "0 4px" }}>
            {unit.num}
          </div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", margin: 0, lineHeight: 1.4 }}>{unit.title}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "12px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: sc.badge, color: sc.text, padding: "2px 8px", borderRadius: "999px", whiteSpace: "nowrap" }}>
            {unit.spiral.length} levels
          </span>
          <span style={{ fontSize: "16px", color: "#9ca3af", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 20px 20px 70px", backgroundColor: sc.bg }}>

          {/* Goal */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
            <span style={{ fontSize: "13px", flexShrink: 0 }}>🎯</span>
            <p style={{ fontSize: "12px", color: sc.text, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{unit.goal}</p>
          </div>

          {/* Three-Level Spiral */}
          <p style={{ fontSize: "11px", fontWeight: 800, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px" }}>Three-Level Spiral</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
            {unit.spiral.map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", backgroundColor: "#ffffff", border: `1px solid ${sc.border}`, borderRadius: "8px", padding: "8px 12px" }}>
                <SpiralPill level={row.level} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#374151", margin: "0 0 2px", fontFamily: "monospace" }}>{row.ref}</p>
                  {row.focus !== "—" && <p style={{ fontSize: "11px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{row.focus}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Model Topic */}
          <p style={{ fontSize: "11px", fontWeight: 800, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px" }}>Model Topic</p>
          <div style={{ backgroundColor: "#ffffff", border: `1px solid ${sc.border}`, borderRadius: "8px", padding: "10px 12px", marginBottom: "14px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: sc.text, margin: "0 0 4px" }}>📖 {unit.topic.name}</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{unit.topic.desc}</p>
          </div>

          {/* Grammar Focus */}
          <p style={{ fontSize: "11px", fontWeight: 800, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px" }}>Grammar Focus</p>
          <div style={{ backgroundColor: "#ffffff", border: `1px solid ${sc.border}`, borderRadius: "8px", padding: "10px 14px", marginBottom: "14px" }}>
            {unit.focus.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: i < unit.focus.length - 1 ? "6px" : 0 }}>
                <span style={{ color: sc.accent, fontWeight: 800, fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>→</span>
                <p style={{ fontSize: "12px", color: "#374151", margin: 0, lineHeight: 1.6 }}>{pt}</p>
              </div>
            ))}
          </div>

          {/* Further Resources */}
          <p style={{ fontSize: "11px", fontWeight: 800, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px" }}>Further Resources</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {unit.resources.map((res, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", backgroundColor: "#ffffff", border: `1px solid ${sc.border}`, borderRadius: "8px", padding: "8px 12px" }}>
                <ResourcePill level={res.level} />
                <p style={{ fontSize: "12px", color: "#374151", margin: 0, lineHeight: 1.5, fontFamily: "monospace" }}>{res.ref}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function UnifiedGrammarPage() {
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState(
    Object.fromEntries(grammarData.sections.map((_, i) => [i, i === 0]))
  );

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          await getDoc(doc(db, "users", firebaseUser.uid));
        } catch { /* viewer */ }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsub();
    });
  }, []);

  const toggleSec   = (i) => setExpanded(p => ({ ...p, [i]: !p[i] }));
  const expandAll   = () => setExpanded(Object.fromEntries(grammarData.sections.map((_, i) => [i, true])));
  const collapseAll = () => setExpanded(Object.fromEntries(grammarData.sections.map((_, i) => [i, false])));

  if (loading) return (
    <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontSize: "14px", color: "#9ca3af" }}>Loading...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>Unified Grammar</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#036c48", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", marginBottom: "12px" }}>
            ✓ Prepared by Akrom Nabi
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "8px" }}>{grammarData.title}</h1>

          {/* Series info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#f0fdf4", color: "#065f46", padding: "3px 10px", borderRadius: "999px" }}>Main Series</span>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>{grammarData.series}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#ede9fe", color: "#4c1d95", padding: "3px 10px", borderRadius: "999px" }}>Drills</span>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>{grammarData.drills}</span>
            </div>
          </div>

          {/* Level legend */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            {[
              { key: "Basic",        label: "Basic",        c: levelColors.Basic },
              { key: "Intermediate", label: "Intermediate", c: levelColors.Intermediate },
              { key: "Advanced",     label: "Advanced",     c: levelColors.Advanced },
            ].map(({ key, label, c }) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: c.bg, padding: "4px 12px", borderRadius: "999px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: c.text }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: c.text }}>{label}</span>
              </div>
            ))}
            {[
              { label: "A1/A2", bg: "#d1fae5", text: "#065f46" },
              { label: "B1/B2", bg: "#dbeafe", text: "#1e3a5f" },
              { label: "C1/C2", bg: "#ede9fe", text: "#4c1d95" },
            ].map(({ label, bg, text }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: bg, padding: "4px 12px", borderRadius: "999px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: text }}>MyGrammarLab {label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { val: totalSections, label: "Sections" },
              { val: totalUnits,    label: "Units" },
              { val: "49",          label: "Curriculum Units" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p style={{ fontSize: "24px", fontWeight: 800, color: "#064e3b", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow strip */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "14px 20px", marginBottom: "20px" }}>
          <p style={{ fontSize: "11px", fontWeight: 800, color: "#059669", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>Study Workflow — Follow this sequence for every unit</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              "1 Read Oxford Basic",
              "2 Read Oxford Intermediate",
              "3 Read Oxford Advanced",
              "4 Drill MyGrammarLab A1/A2",
              "5 Drill MyGrammarLab B1/B2",
              "6 Drill MyGrammarLab C1/C2",
              "7 Read Model Topic",
              "8 Write one paragraph",
            ].map((step, i) => (
              <span key={i} style={{ fontSize: "11px", fontWeight: 600, backgroundColor: i < 3 ? "#d1fae5" : i < 6 ? "#ede9fe" : "#fde68a", color: i < 3 ? "#065f46" : i < 6 ? "#4c1d95" : "#78350f", padding: "4px 10px", borderRadius: "6px" }}>
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Expand / Collapse */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
          <button onClick={expandAll}   style={{ fontSize: "12px", fontWeight: 600, color: "#059669", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "5px 14px", borderRadius: "6px", cursor: "pointer" }}>Expand all</button>
          <button onClick={collapseAll} style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", padding: "5px 14px", borderRadius: "6px", cursor: "pointer" }}>Collapse all</button>
        </div>

        {/* SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {grammarData.sections.map((section, si) => {
            const sc     = sectionColors[si % sectionColors.length];
            const isOpen = expanded[si];
            return (
              <div key={si} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.border : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>
                <button
                  onClick={() => toggleSec(si)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ minWidth: "34px", height: "34px", borderRadius: "8px", backgroundColor: isOpen ? sc.badge : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: isOpen ? sc.text : "#6b7280" }}>
                      S{section.num}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: sc.text, margin: 0 }}>{section.title}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>
                        {section.units.length} {section.units.length === 1 ? "unit" : "units"} · {section.tags.map(t => `#${t}`).join(" ")}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.border}` }}>
                    {section.units.map(unit => (
                      <UnitCard key={unit.id} unit={unit} sc={sc} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "40px", lineHeight: 1.6 }}>
          Grammar Curriculum Master Map · Oxford English Grammar Course (Swan & Walter) + MyGrammarLab (Foley & Hall) · 2026
        </p>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
