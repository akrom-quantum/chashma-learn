"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

/* ─── Firebase ───────────────────────────────────────────── */
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

/* ─── Source URL builder ─────────────────────────────────── */
function oegcUrl(level, sectionNum) {
  const base = {
    basic:        "/english/grammar/oegc-basic",
    intermediate: "/english/grammar/oegc-intermediate",
    advanced:     "/english/grammar/oegc-advanced",
  }[level];
  if (level === "advanced" && sectionNum === "part2") return `${base}/part2`;
  const padded = String(sectionNum).padStart(2, "0");
  return `${base}/section-${padded}`;
}

const BOOK_META = {
  basic:        { label: "OEGC Basic",        shortLabel: "Basic",        emoji: "📗", color: "#16a34a", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },
  intermediate: { label: "OEGC Intermediate", shortLabel: "Intermediate", emoji: "📘", color: "#2563eb", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },
  advanced:     { label: "OEGC Advanced",     shortLabel: "Advanced",     emoji: "📙", color: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
};

/* ─── Curriculum data ────────────────────────────────────── */
// Each unit: { id, num, title, path, modelTopic, grammarFocus[], sources[] }
// source: { level, section, label }  — section is used for URL, label for display
const sections = [
  /* ══════════════════════════════════════════════════════════
     SECTION 1 — be and have
  ══════════════════════════════════════════════════════════ */
  {
    id: "s01", num: "01", title: "be and have", icon: "🔵",
    color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
    units: [
      {
        id: "u01", num: "01", title: "be: Forms and Uses",
        path: "/english/grammar/unified-grammar/unit-1",
        modelTopic: "Traditional vs Modern Education — identifying every use of be as main verb, auxiliary, or linking verb.",
        grammarFocus: [
          "Contracted forms in speech vs full forms in writing",
          "be as a linking verb (She is a doctor) vs auxiliary (is working)",
          "Agreement errors: There is many problems ✗ → There are many problems ✓",
        ],
        sources: [
          { level: "basic",        section: 1,       label: "S1: Units 1–3 — Present and past forms; statements, questions, negatives; future with will be" },
          { level: "intermediate", section: 1,       label: "S1: Unit 1 — Revising be; extended and habitual uses" },
          { level: "advanced",     section: 2,       label: "S2: Units 1–2 — Progressive forms of be; emphatic do be; complex structures" },
        ],
      },
      {
        id: "u02", num: "02", title: "there is / there are",
        path: "/english/grammar/unified-grammar/unit-2",
        modelTopic: "Urban Development — The Affordable Housing Shortage; rich in there is/are/has been constructions.",
        grammarFocus: [
          "Agreement: there is + singular / there are + plural",
          "there vs it as introductory subjects",
          "there seems/appears/tends to be — impersonal constructions for formal writing",
        ],
        sources: [
          { level: "basic",        section: 1,       label: "S1: Units 4–5 — there is/was; future with will there be" },
          { level: "intermediate", section: 1,       label: "S1: Units 2–3 — Revising basics; more complex there structures (there seems to be)" },
          { level: "advanced",     section: 2,       label: "S2: Units 3–4 — Complex there structures; formal and academic uses" },
        ],
      },
      {
        id: "u03", num: "03", title: "have: Main Verb and Auxiliary",
        path: "/english/grammar/unified-grammar/unit-3",
        modelTopic: "Health and Wellbeing — Mental Health Services; what communities have and what people have been having difficulty accessing.",
        grammarFocus: [
          "have got (British) vs have (American/neutral): register and context",
          "have for actions (have a shower, have a look) — not replaceable by have got",
          "have as perfect auxiliary — not a main verb in this role",
        ],
        sources: [
          { level: "basic",        section: 1,       label: "S1: Units 6–9 — have/do you have; past and future; have for actions; have got" },
          { level: "intermediate", section: 1,       label: "S1: Units 4–6 — have got vs do; habitual actions; have for actions" },
          { level: "advanced",     section: 2,       label: "S2: Units 5–6 — Revising have; emphatic do; formal contexts" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 2 — Present Tenses
  ══════════════════════════════════════════════════════════ */
  {
    id: "s02", num: "02", title: "Present Tenses", icon: "🕐",
    color: { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },
    units: [
      {
        id: "u04", num: "04", title: "Present Simple: Forms and Use",
        path: "/english/grammar/unified-grammar/unit-4",
        modelTopic: "Work and Employment — Remote Work: Benefits and Drawbacks; how remote workers structure their day.",
        grammarFocus: [
          "Third person -s: spelling rules (watches, tries, goes)",
          "do/does in negatives and questions — never omit",
          "Present simple for universal truths vs present continuous for current situations",
        ],
        sources: [
          { level: "basic",        section: 2,       label: "S2: Units 1–5 — Affirmative, negative, question forms; spelling; habits and facts" },
          { level: "intermediate", section: 2,       label: "S2: Units 1–2, 4 — Revising forms and spelling; instructions, commentary; extended uses" },
          { level: "advanced",     section: 3,       label: "S3: Units 2–4 — Instructions, commentaries, stories; more about present tenses" },
        ],
      },
      {
        id: "u05", num: "05", title: "Present Continuous: Forms and Use",
        path: "/english/grammar/unified-grammar/unit-5",
        modelTopic: "Environment and Sustainability — Climate Change; temperatures are rising, ice caps are melting.",
        grammarFocus: [
          "Spelling: -ing endings (doubling: running; dropping -e: driving)",
          "Present continuous for trends: Prices are rising — not a momentary action",
          "Common error: using continuous for permanent states (I am living in Seoul — only if temporary)",
        ],
        sources: [
          { level: "basic",        section: 2,       label: "S2: Units 6–10 — Forms; current and temporary actions; negatives and questions" },
          { level: "intermediate", section: 2,       label: "S2: Unit 3 — Present continuous for changes and trends" },
          { level: "advanced",     section: 3,       label: "S3: Units 2, 4 — Extended uses; trends; narrative commentary" },
        ],
      },
      {
        id: "u06", num: "06", title: "Present Simple vs Present Continuous",
        path: "/english/grammar/unified-grammar/unit-6",
        modelTopic: "Technology and Society — Social Media; contrasting what it does (permanent) vs what it is currently doing (ongoing).",
        grammarFocus: [
          "Stative verbs: know, believe, love, want, understand, seem, own — not usually continuous",
          "Apparent exceptions: I'm loving this (advertising/emphasis); I'm thinking about it (process vs state)",
          "Sense verbs: see, hear, smell, taste — stative vs dynamic distinction",
        ],
        sources: [
          { level: "basic",        section: 2,       label: "S2: Units 11–13 — Core difference; non-progressive verbs introduced" },
          { level: "intermediate", section: 2,       label: "S2: Units 1, 5 — Revising the difference; full treatment of non-progressive verbs" },
          { level: "advanced",     section: 3,       label: "S3: Units 4–5 — More about present tenses; non-progressive verbs with exceptions" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 3 — Talking About the Future
  ══════════════════════════════════════════════════════════ */
  {
    id: "s03", num: "03", title: "Talking About the Future", icon: "🔮",
    color: { accent: "#0f766e", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },
    units: [
      {
        id: "u07", num: "07", title: "going to and Present Continuous for Future",
        path: "/english/grammar/unified-grammar/unit-7",
        modelTopic: "Science and Research — Space Exploration; upcoming missions, what agencies are going to launch.",
        grammarFocus: [
          "going to + present evidence: Look at those clouds — it's going to rain",
          "Present continuous for future: requires a fixed arrangement (We're meeting at 6)",
          "Common error: using present continuous without any fixed arrangement in place",
        ],
        sources: [
          { level: "basic",        section: 3,       label: "S3: Units 1–2 — going to for intentions and predictions; present continuous for plans" },
          { level: "intermediate", section: 3,       label: "S3: Units 1–2, 5 — Revising both; which future? comparison" },
          { level: "advanced",     section: 3,       label: "S3: Units 6–7 — More about present continuous, going to and will; comparing all forms" },
        ],
      },
      {
        id: "u08", num: "08", title: "will: Predictions, Decisions, Promises",
        path: "/english/grammar/unified-grammar/unit-8",
        modelTopic: "Government and Politics — International Relations; what world leaders will do, spontaneous policy announcements.",
        grammarFocus: [
          "Spontaneous decision (I'll get the door) vs planned intention (I'm going to get a new job)",
          "will for characteristic behaviour: She'll talk for hours if you let her",
          "Shall in questions: Shall I help? — restricted to first person offers in British English",
        ],
        sources: [
          { level: "basic",        section: 3,       label: "S3: Units 3–4 — will for predictions; deciding, refusing, promising" },
          { level: "intermediate", section: 3,       label: "S3: Units 3–4 — Revising will; decisions and promises; which future?" },
          { level: "advanced",     section: 3,       label: "S3: Units 6–7 — More about will; will in conditional and habitual contexts" },
        ],
      },
      {
        id: "u09", num: "09", title: "Future Perfect, Continuous and Other Future Forms",
        path: "/english/grammar/unified-grammar/unit-9",
        modelTopic: "Transport and Travel — Aviation; what aviation will have produced in emissions by 2050.",
        grammarFocus: [
          "Future continuous: action in progress at a future point (This time tomorrow, I'll be flying)",
          "Future perfect: completion before a future point (They'll have landed by noon)",
          "Future in the past: was going to, was about to, was due to",
        ],
        sources: [
          { level: "basic",        section: 3,       label: "S3: Unit 5 — Simple present for timetabled future only" },
          { level: "intermediate", section: 3,       label: "S3: Units 6–10 — Future progressive; be + infinitive; future in the past; future perfect" },
          { level: "advanced",     section: 3,       label: "S3: Units 8–11 — be + infinitive; future progressive; future perfect; future in the past" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 4 — Past Tenses
  ══════════════════════════════════════════════════════════ */
  {
    id: "s04", num: "04", title: "Past Tenses", icon: "⏪",
    color: { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#881337" },
    units: [
      {
        id: "u10", num: "10", title: "Past Simple: Forms and Use",
        path: "/english/grammar/unified-grammar/unit-10",
        modelTopic: "Society and Culture — Globalisation and Cultural Identity; how globalisation transformed local industries.",
        grammarFocus: [
          "Irregular verb patterns grouped by vowel change (sing/sang, drive/drove, bring/brought)",
          "Past simple for sequences: She arrived, sat down, and opened her laptop",
          "Common error: using present perfect when past simple is correct (I have seen him yesterday ✗)",
        ],
        sources: [
          { level: "basic",        section: 4,       label: "S4: Units 1–5 — Forms (regular/irregular); negatives; questions; completed events" },
          { level: "intermediate", section: 4,       label: "S4: Units 1–2 — Revising forms; deeper use; past tenses in polite requests" },
          { level: "advanced",     section: 4,       label: "S4: Units 2, 6 — Simple past and past progressive revisited; more nuanced uses" },
        ],
      },
      {
        id: "u11", num: "11", title: "Past Continuous: Forms and Use",
        path: "/english/grammar/unified-grammar/unit-11",
        modelTopic: "Crime, Law and Punishment — witnesses describe what people were doing when an incident occurred.",
        grammarFocus: [
          "when + past simple (interruption) vs while + past continuous (background)",
          "Parallel actions: She was cooking while he was reading",
          "Repeated irritating past actions: He was always interrupting (with always)",
        ],
        sources: [
          { level: "basic",        section: 4,       label: "S4: Units 6–7 — Form; background action; interrupted action; while/when" },
          { level: "intermediate", section: 4,       label: "S4: Units 2–3 — Revising and extending; contrast with past simple" },
          { level: "advanced",     section: 4,       label: "S4: Units 2, 6 — Past progressive in narrative; subtle contrasts" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 5 — Perfect Tenses
  ══════════════════════════════════════════════════════════ */
  {
    id: "s05", num: "05", title: "Perfect Tenses", icon: "✅",
    color: { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },
    units: [
      {
        id: "u12", num: "12", title: "Present Perfect: Introduction",
        path: "/english/grammar/unified-grammar/unit-12",
        modelTopic: "Health and Wellbeing — Vaccination and Public Health; campaigns have eliminated diseases.",
        grammarFocus: [
          "since (point in time) vs for (duration)",
          "already (affirmative), yet (negative/question), just (very recent)",
          "Core rule: present perfect = past action with present relevance; past simple = no connection to now",
        ],
        sources: [
          { level: "basic",        section: 5,       label: "S5: Units 1–5 — Forms; finished actions vs simple past; time words; already/yet/just; since/for" },
          { level: "intermediate", section: 5,       label: "S5: Units 1–5 — Revising all basics; finished time vs up to now; news use" },
          { level: "advanced",     section: 4,       label: "S4: Units 3–5 — Present perfect and simple past revisited; more about present perfect" },
        ],
      },
      {
        id: "u13", num: "13", title: "Present Perfect vs Past Simple",
        path: "/english/grammar/unified-grammar/unit-13",
        modelTopic: "Arts and Culture — Museums and Arts Funding; what a museum has achieved (PP) vs what it did during renovation (PS).",
        grammarFocus: [
          "Definite time words (yesterday, last year, in 2010) → always past simple",
          "Indefinite time words (ever, never, recently, so far) → always present perfect",
          "British vs American: Americans use past simple where British use present perfect",
        ],
        sources: [
          { level: "basic",        section: 5,       label: "S5: Units 2–3 — Core contrast introduced with time expressions" },
          { level: "intermediate", section: 5,       label: "S5: Units 2–3, 7, 10 — Revising contrast; news and detail structure; full summary" },
          { level: "advanced",     section: 4,       label: "S4: Units 3, 5, 7 — Summary; more about each form individually" },
        ],
      },
      {
        id: "u14", num: "14", title: "Present Perfect Continuous",
        path: "/english/grammar/unified-grammar/unit-14",
        modelTopic: "Environment — Pollution; factories have been releasing pollutants for decades.",
        grammarFocus: [
          "Emphasis on duration → continuous (I've been waiting for an hour)",
          "Emphasis on completion or number → simple (I've written three reports)",
          "Verbs rarely in continuous even here: know, love, own",
        ],
        sources: [
          { level: "basic",        section: 5,       label: "S5: Unit 6 — Form; duration; recent activity with visible result" },
          { level: "intermediate", section: 5,       label: "S5: Units 8–9 — Revising basics; present perfect simple vs continuous" },
          { level: "advanced",     section: 4,       label: "S4: Units 4, 8 — Revising; more about present perfect continuous" },
        ],
      },
      {
        id: "u15", num: "15", title: "Past Perfect: Simple and Continuous",
        path: "/english/grammar/unified-grammar/unit-15",
        modelTopic: "Society and Culture — Immigration; what had happened before migrants decided to leave.",
        grammarFocus: [
          "Past perfect only needed when sequence is unclear from context",
          "after makes past perfect optional: After she left / After she had left (both correct)",
          "Past perfect continuous: had been working — emphasises duration before a past point",
        ],
        sources: [
          { level: "basic",        section: 5,       label: "S5: Unit 7 — Form; sequencing past events; basic narrative use" },
          { level: "intermediate", section: 5,       label: "S5: Units 11–14 — Revising basics; more about past perfect; continuous; first time structures" },
          { level: "advanced",     section: 4,       label: "S4: Units 9–12 — Past perfect with time conjunctions; continuous; first time — advanced" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 6 — Modal Verbs
  ══════════════════════════════════════════════════════════ */
  {
    id: "s06", num: "06", title: "Modal Verbs", icon: "🎛️",
    color: { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b" },
    units: [
      {
        id: "u16", num: "16", title: "must and have to: Obligation and Deduction",
        path: "/english/grammar/unified-grammar/unit-16",
        modelTopic: "Government and Politics — Taxation; what citizens must pay, what businesses have to report.",
        grammarFocus: [
          "must (internal/speaker's authority) vs have to (external rule)",
          "mustn't (prohibition) ≠ don't have to (no obligation — free choice)",
          "must be for deduction: She must be tired — she's been working all day",
        ],
        sources: [
          { level: "basic",        section: 6,       label: "S6: Units 2–5 — must; have to; mustn't vs don't have to; had to/will have to" },
          { level: "intermediate", section: 6,       label: "S6: Units 2–4 — Revising must/should/ought to; have to vs must; must not/don't have to/needn't" },
          { level: "advanced",     section: 5,       label: "S5: Unit 5 — Obligation: must and have (got) to — advanced" },
        ],
      },
      {
        id: "u17", num: "17", title: "can, could, may, might: Ability and Possibility",
        path: "/english/grammar/unified-grammar/unit-17",
        modelTopic: "Science and Research — Medical Research; what new treatments can do, what researchers might discover.",
        grammarFocus: [
          "can (ability now) vs could (past ability, or polite possibility)",
          "may (formal permission/possibility) vs can (informal permission)",
          "might have done / could have done / must have done — past modal deductions",
        ],
        sources: [
          { level: "basic",        section: 6,       label: "S6: Units 7–10 — can (ability); could/be able to; may/might (possibility); permission" },
          { level: "intermediate", section: 6,       label: "S6: Units 7–9, 11 — must/can't for certainty; may/might; can/could ability past and future" },
          { level: "advanced",     section: 5,       label: "S5: Units 3–4, 7–8 — Ability; permission; certainty; probability — advanced" },
        ],
      },
      {
        id: "u18", num: "18", title: "should, ought to, had better, would, used to",
        path: "/english/grammar/unified-grammar/unit-18",
        modelTopic: "Personal Development — Lifelong Learning; what adult learners should prioritise, what professionals used to do.",
        grammarFocus: [
          "should have done — past criticism or regret (You should have called)",
          "used to (past state or habit no longer true) vs would (past repeated action only — not states)",
          "had better = strong advice with implied consequence; not interchangeable with should",
        ],
        sources: [
          { level: "basic",        section: 6,       label: "S6: Units 6, 12–14 — should; would; used to" },
          { level: "intermediate", section: 6,       label: "S6: Units 2, 5–6, 12–16 — should/ought to; had better; supposed to; will/would; used to; perfect modals" },
          { level: "advanced",     section: 5,       label: "S5: Units 6, 10–13 — should/ought to; had better; be supposed to; will/would; used to; need" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 7 — Passives
  ══════════════════════════════════════════════════════════ */
  {
    id: "s07", num: "07", title: "Passives", icon: "🔄",
    color: { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
    units: [
      {
        id: "u19", num: "19", title: "Passive: Forms Across Tenses",
        path: "/english/grammar/unified-grammar/unit-19",
        modelTopic: "Arts and Culture — Museums; artworks are stored, restored, have been donated, and were acquired.",
        grammarFocus: [
          "Formation: be (in any tense) + past participle",
          "Agent (by phrase): include only when it adds new, relevant information",
          "Passive with modal verbs: The proposal must be approved / could be reviewed",
        ],
        sources: [
          { level: "basic",        section: 7,       label: "S7: Units 1–6 — Introduction; simple present; future; simple past; progressive; present perfect passives" },
          { level: "intermediate", section: 7,       label: "S7: Units 1–2 — Revising active/passive; passive infinitives and -ing forms" },
          { level: "advanced",     section: 6,       label: "S6: Units 2–3 — Revising basics; reasons for using passives" },
        ],
      },
      {
        id: "u20", num: "20", title: "Passive: Advanced Structures",
        path: "/english/grammar/unified-grammar/unit-20",
        modelTopic: "Government and Politics — Transparency; It is believed that…, The policy is reported to have…",
        grammarFocus: [
          "Two passive options: Susan was given a prize vs A prize was given to Susan",
          "Reporting passives: It is said that he is wealthy / He is said to be wealthy",
          "have something done (arrangement) vs get something done (more informal)",
        ],
        sources: [
          { level: "intermediate", section: 7,       label: "S7: Units 3–5 — Verbs with two objects; prepositions; reasons for using passives" },
          { level: "advanced",     section: 6,       label: "S6: Units 4–5 — Complex passive structures; other advanced points" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 8 — Questions and Negatives
  ══════════════════════════════════════════════════════════ */
  {
    id: "s08", num: "08", title: "Questions and Negatives", icon: "❓",
    color: { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },
    units: [
      {
        id: "u21", num: "21", title: "Question Formation",
        path: "/english/grammar/unified-grammar/unit-21",
        modelTopic: "Media and Communication — Fake News and Information Trust; question types embedded in analytical text.",
        grammarFocus: [
          "Subject questions: Who wrote this? (no auxiliary) vs Who did you call? (with auxiliary)",
          "Prepositions: Who did you go with? (informal) vs With whom did you go? (formal)",
          "Indirect questions: Could you tell me where the station is? — no inversion after question word",
        ],
        sources: [
          { level: "basic",        section: 8,       label: "S8: Units 1–5 — Yes/no questions; question words; subject questions; long subjects; prepositions" },
          { level: "intermediate", section: 8,       label: "S8: Units 1–3 — Revising basics; question-word subjects; prepositions in questions" },
          { level: "advanced",     section: 1,       label: "S1: Unit 2 — Questions: revising the basics at advanced level" },
        ],
      },
      {
        id: "u22", num: "22", title: "Negatives",
        path: "/english/grammar/unified-grammar/unit-22",
        modelTopic: "Society and Culture — Income Inequality; It is not the case that…, No government has fully addressed…",
        grammarFocus: [
          "not (with verb) vs no (with noun): It's not a problem / It's no problem",
          "nobody/nothing/never — single negative only (never add not as well)",
          "Formal negative inversion: Never have I seen such conditions. Rarely does the policy succeed.",
        ],
        sources: [
          { level: "basic",        section: 8,       label: "S8: Units 6–8 — Negatives; not and no; nobody/never etc." },
          { level: "intermediate", section: 8,       label: "S8: Units 4–5 — Revising negatives; negative questions" },
          { level: "advanced",     section: 1,       label: "S1: Units 3–6 — not and no; negative questions; more about negatives; advanced structures" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 9 — Infinitives and -ing Forms
  ══════════════════════════════════════════════════════════ */
  {
    id: "s09", num: "09", title: "Infinitives and -ing Forms", icon: "∞",
    color: { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },
    units: [
      {
        id: "u23", num: "23", title: "Infinitive: Uses and Patterns",
        path: "/english/grammar/unified-grammar/unit-23",
        modelTopic: "Work and Employment — Internships; what companies expect interns to do, what interns hope to gain.",
        grammarFocus: [
          "Bare infinitive after modal verbs and make/let/help",
          "Perfect infinitive: to have done (action before the main verb's time)",
          "Passive infinitive: to be told, to be considered",
          "too + adjective + to and adjective + enough + to structures",
        ],
        sources: [
          { level: "basic",        section: 9,       label: "S9: Units 1–8 — to infinitive; purpose; verb + infinitive; verb + object + infinitive; adjective patterns" },
          { level: "intermediate", section: 9,       label: "S9: Units 1–2, 5–7, 12–17 — Revising basics; more about infinitives; perfect infinitives; for...to; adjective patterns" },
          { level: "advanced",     section: 7,       label: "S7: Units 2–5, 9–10 — Revising; perfect infinitives; infinitive without to; verb + infinitive; noun + infinitive" },
        ],
      },
      {
        id: "u24", num: "24", title: "-ing Form: Uses and Patterns",
        path: "/english/grammar/unified-grammar/unit-24",
        modelTopic: "Health and Wellbeing — Diet and Lifestyle; benefits of eating well, exercising regularly.",
        grammarFocus: [
          "Gerund as subject: Smoking is harmful — singular verb",
          "Preposition + gerund: instead of waiting, by improving, without knowing",
          "to + -ing (not infinitive!): look forward to hearing, object to being told",
        ],
        sources: [
          { level: "basic",        section: 9,       label: "S9: Units 9–11 — -ing as subject; after prepositions; verb + -ing" },
          { level: "intermediate", section: 9,       label: "S9: Units 8–10, 18–19 — -ing as subject/object; more about verb + -ing; go…ing; before/after/since/by + -ing; to…ing" },
          { level: "advanced",     section: 7,       label: "S7: Units 6, 11–12 — Verb + -ing; to…ing; determiners with -ing forms" },
        ],
      },
      {
        id: "u25", num: "25", title: "Infinitive vs -ing Form: The Core Problem",
        path: "/english/grammar/unified-grammar/unit-25",
        modelTopic: "Education — Rote Learning vs Critical Thinking; teachers try introducing vs try to introduce.",
        grammarFocus: [
          "stop + -ing (end the activity) vs stop + to infinitive (pause in order to do something else)",
          "remember/forget + -ing (looking back) vs + infinitive (looking forward)",
          "try + -ing (experiment) vs try + to infinitive (attempt, may fail)",
          "Verbs only with -ing: enjoy, avoid, deny, suggest, consider, keep",
          "Verbs only with infinitive: want, decide, hope, expect, promise, refuse",
        ],
        sources: [
          { level: "basic",        section: 9,       label: "S9: Units 3, 11 — Verb + infinitive and verb + -ing introduced separately" },
          { level: "intermediate", section: 9,       label: "S9: Units 3–4, 9, 11 — Revising both; more about verb + infinitive or -ing; both possible" },
          { level: "advanced",     section: 7,       label: "S7: Units 7–8 — Verb + object + infinitive or -ing; both possible — meaning differences" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 10 — Special Structures with Verbs
  ══════════════════════════════════════════════════════════ */
  {
    id: "s10", num: "10", title: "Special Structures with Verbs", icon: "⚙️",
    color: { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },
    units: [
      {
        id: "u26", num: "26", title: "Phrasal Verbs and Verbs with Prepositions",
        path: "/english/grammar/unified-grammar/unit-26",
        modelTopic: "Technology and Society — Smartphones; users put off updating, look into settings, come across new apps.",
        grammarFocus: [
          "Separable phrasal verbs: turn the TV off / turn it off (pronoun must go between)",
          "Inseparable phrasal verbs: look after the children (cannot split)",
          "Phrasal-prepositional verbs: put up with, look forward to, run out of",
        ],
        sources: [
          { level: "basic",        section: 10,      label: "S10: Units 1–3 — Structures with get; verbs with prepositions; phrasal verbs" },
          { level: "intermediate", section: 10,      label: "S10: Unit 8 — Phrasal verbs — revising and extending" },
          { level: "advanced",     section: 8,       label: "S8: Units 3–5 — Verbs with prepositions and adverb particles; more about phrasal verbs" },
        ],
      },
      {
        id: "u27", num: "27", title: "Verbs with Two Objects and Causative Structures",
        path: "/english/grammar/unified-grammar/unit-27",
        modelTopic: "Urban Development — Green Spaces; councils have had parks redesigned, gave residents better access.",
        grammarFocus: [
          "Pattern 1: She gave me the book vs Pattern 2: She gave the book to me",
          "Not all verbs take both patterns: explain, suggest, describe → only Pattern 2",
          "have something done (arrangement) vs make someone do something (compulsion)",
        ],
        sources: [
          { level: "basic",        section: 10,      label: "S10: Units 4–5 — Verbs with two objects; have something done" },
          { level: "intermediate", section: 10,      label: "S10: Units 2–3 — Revising two objects; causative have and get" },
          { level: "advanced",     section: 8,       label: "S8: Units 6–7 — Verbs with two objects; causative structures with have, get and make" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 11 — Articles
  ══════════════════════════════════════════════════════════ */
  {
    id: "s11", num: "11", title: "Articles", icon: "📝",
    color: { accent: "#9333ea", bg: "#fdf4ff", badge: "#e9d5ff", text: "#581c87" },
    units: [
      {
        id: "u28", num: "28", title: "a/an: Uses and Patterns",
        path: "/english/grammar/unified-grammar/unit-28",
        modelTopic: "Health and Wellbeing — Healthcare Systems; introducing a doctor, a nurse, a clinic as first mentions.",
        grammarFocus: [
          "a/an = one, any one of (not specific) — first mention or non-specific reference",
          "a doctor (profession) — article always required in English: She is doctor ✗",
          "a/an for generic reference: A dog makes a good pet (= dogs in general)",
        ],
        sources: [
          { level: "basic",        section: 11,      label: "S11: Units 1–5 — a/an pronunciation; countable/uncountable; the vs a/an; jobs; descriptions" },
          { level: "intermediate", section: 11,      label: "S11: Units 1–3 — Revising a/an and one; jobs/descriptions; first mention" },
          { level: "advanced",     section: 10,      label: "S10: Units 2–5 — Preliminary note; revising basics; more about generalising with a/an" },
        ],
      },
      {
        id: "u29", num: "29", title: "the: Uses and Special Cases",
        path: "/english/grammar/unified-grammar/unit-29",
        modelTopic: "Society and Culture — Preserving Traditional Cultures; mixing generic and specific reference.",
        grammarFocus: [
          "the = both speaker and listener know which one is meant",
          "Generalisations: Music is universal (zero) vs The music of the 1960s (specific period)",
          "Set phrases without article: in bed, at school, by car, after lunch",
        ],
        sources: [
          { level: "basic",        section: 11,      label: "S11: Units 3, 6–8 — the vs a/an; generalisations without the; names; special cases" },
          { level: "intermediate", section: 11,      label: "S11: Units 4–8 — Revising the; generalisations; place names; other cases" },
          { level: "advanced",     section: 10,      label: "S10: Units 3–5 — Revising basics; more about generalising; articles: other points" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 12 — Determiners
  ══════════════════════════════════════════════════════════ */
  {
    id: "s12", num: "12", title: "Determiners", icon: "🗂️",
    color: { accent: "#db2777", bg: "#fdf2f8", badge: "#fbcfe8", text: "#831843" },
    units: [
      {
        id: "u30", num: "30", title: "some, any, much, many, a lot of",
        path: "/english/grammar/unified-grammar/unit-30",
        modelTopic: "Environment — Sustainable Living; how much waste is generated, whether any recycling programmes are effective.",
        grammarFocus: [
          "some (affirmative) vs any (negative/question) — but some in offers (Would you like some?)",
          "a little (some, not much — mildly positive) vs little (hardly any — negative connotation)",
          "a few (some, not many — mildly positive) vs few (hardly any — negative connotation)",
        ],
        sources: [
          { level: "basic",        section: 12,      label: "S12: Units 2–9 — some/any; compounds; much/many; a lot of; a little/a few; enough; too/too much" },
          { level: "intermediate", section: 12,      label: "S12: Units 2–9 — Revising all; some/any or no article; any = 'it doesn't matter which'; less/fewer" },
          { level: "advanced",     section: 11,      label: "S11: Units 7–14 — some, any, no, none; much/many/more/most; little/few; enough; quantifying phrases" },
        ],
      },
      {
        id: "u31", num: "31", title: "all, every, each, both, either, neither",
        path: "/english/grammar/unified-grammar/unit-31",
        modelTopic: "Work and Employment — The Gender Pay Gap; both men and women, every employee, each department.",
        grammarFocus: [
          "all + plural noun (no of needed unless with pronoun: all of us)",
          "every + singular (always); each — more individual focus",
          "both (two, positive); either (one of two); neither (none of two)",
          "neither/either + singular verb; neither of them is/are (both acceptable in modern English)",
        ],
        sources: [
          { level: "basic",        section: 12,      label: "S12: Units 9–11 — all; all and every/each; both, either, neither" },
          { level: "intermediate", section: 12,      label: "S12: Units 10–13 — Revising all; all/every/everybody/everything; every and each; both/either/neither" },
          { level: "advanced",     section: 11,      label: "S11: Units 2–6 — all; whole and all; both; either/neither; every and each — advanced" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 13 — Personal Pronouns and Possessives
  ══════════════════════════════════════════════════════════ */
  {
    id: "s13", num: "13", title: "Personal Pronouns and Possessives", icon: "👤",
    color: { accent: "#ca8a04", bg: "#fefce8", badge: "#fef08a", text: "#713f12" },
    units: [
      {
        id: "u32", num: "32", title: "Personal Pronouns and Possessives",
        path: "/english/grammar/unified-grammar/unit-32",
        modelTopic: "Society and Culture — Family Structures; how one defines family, how they (institutions) shape structure.",
        grammarFocus: [
          "myself/yourself for emphasis (I did it myself) vs reflexive (She hurt herself)",
          "a friend of mine (not a my friend) — double possessive structure",
          "Singular they for gender-neutral reference — now standard in formal writing",
        ],
        sources: [
          { level: "basic",        section: 13,      label: "S13: Units 1–4 — Personal pronouns; possessive adjectives and pronouns; reflexives" },
          { level: "intermediate", section: 13,      label: "S13: Units 1–5 — Revising all; possessives (a friend of mine); pronoun cases; reflexives; you/one/they" },
          { level: "advanced",     section: 9,       label: "S9: Units 9–12 — Personal pronouns; reflexives; one/you/they (general); singular they" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 14 — Nouns
  ══════════════════════════════════════════════════════════ */
  {
    id: "s14", num: "14", title: "Nouns", icon: "🏷️",
    color: { accent: "#16a34a", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },
    units: [
      {
        id: "u33", num: "33", title: "Countable and Uncountable Nouns",
        path: "/english/grammar/unified-grammar/unit-33",
        modelTopic: "Food and Agriculture — Food Waste; natural countable (meals, ingredients) and uncountable (food, waste, energy) contrast.",
        grammarFocus: [
          "Uncountable nouns: never a/an, never plural -s: advice, information, furniture, luggage",
          "Nouns with both uses: a coffee (a cup of) vs coffee (the substance)",
          "Units of measure: a piece of advice, a loaf of bread, a litre of milk",
        ],
        sources: [
          { level: "basic",        section: 14,      label: "S14: Units 1–3 — Singular/plural; countable and uncountable; one/ones" },
          { level: "intermediate", section: 14,      label: "S14: Units 1–2 — Revising countable/uncountable; more about both categories" },
          { level: "advanced",     section: 9,       label: "S9: Units 2–3 — Countable and uncountable — advanced; mixed singular and plural" },
        ],
      },
      {
        id: "u34", num: "34", title: "Noun Forms: Plurals, Possessives, Noun + Noun",
        path: "/english/grammar/unified-grammar/unit-34",
        modelTopic: "Urban Development — Smart Cities; traffic management, city council, the city's infrastructure.",
        grammarFocus: [
          "'s for people/animals (the teacher's explanation); of for things (the cost of living)",
          "Compound nouns: stress on first element (CITy centre) — not the same as adjective + noun",
          "Special plurals: aircraft, sheep, series (unchanged); criteria, phenomena (Latin/Greek)",
        ],
        sources: [
          { level: "basic",        section: 14,      label: "S14: Units 1–2, 5–7 — Singular/plural spelling; collective nouns; possessive forms; noun + noun" },
          { level: "intermediate", section: 14,      label: "S14: Units 3–4, 6–9 — Spelling plurals; special cases; possessive 's vs of; noun + noun vs preposition" },
          { level: "advanced",     section: 9,       label: "S9: Units 4–5 — Noun + noun or preposition structure; possessive or other structure" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 15 — Adjectives and Adverbs
  ══════════════════════════════════════════════════════════ */
  {
    id: "s15", num: "15", title: "Adjectives and Adverbs", icon: "✨",
    color: { accent: "#7e22ce", bg: "#faf5ff", badge: "#ddd6fe", text: "#4c1d95" },
    units: [
      {
        id: "u35", num: "35", title: "Adjectives: Position and Order",
        path: "/english/grammar/unified-grammar/unit-35",
        modelTopic: "Arts and Culture — Contemporary vs Traditional Art; a striking modern sculpture, an elegant ancient vase.",
        grammarFocus: [
          "Standard order: Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose + Noun",
          "interested (feeling) vs interesting (causing the feeling) — applies to all -ed/-ing pairs",
          "Postpositive adjectives: something interesting, someone responsible (after indefinite pronouns)",
        ],
        sources: [
          { level: "basic",        section: 15,      label: "S15: Unit 1 — Adjectives — basic position and form" },
          { level: "intermediate", section: 15,      label: "S15: Units 1–2, 4 — Revising adjectives; -ed/-ing; order of adjectives" },
          { level: "advanced",     section: 12,      label: "S12: Units 2–6 — Adjective or adverb?; order; position; participles; adjectives without nouns" },
        ],
      },
      {
        id: "u36", num: "36", title: "Adverbs: Types, Position, and Use",
        path: "/english/grammar/unified-grammar/unit-36",
        modelTopic: "Media and Communication — Advertising and False Claims; clearly misleading, highly exaggerated, barely regulated.",
        grammarFocus: [
          "Position rules: manner (quickly) → end; frequency (often) → mid; degree (very) → before adjective",
          "Confusing pairs: hard vs hardly; late vs lately; fast (same form for both)",
          "Sentence adverbs (Unfortunately, the policy failed) — modify the whole sentence",
        ],
        sources: [
          { level: "basic",        section: 15,      label: "S15: Units 2–6 — Manner adverbs; other adverbs; adverbs with the verb; -ed/-ing; confusing pairs" },
          { level: "intermediate", section: 15,      label: "S15: Units 1, 5–7 — Revising; adverbs with the verb; even and only; confusing pairs" },
          { level: "advanced",     section: 12,      label: "S12: Units 8–9 — Adverb position (1) and (2): with the verb" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 16 — Comparison
  ══════════════════════════════════════════════════════════ */
  {
    id: "s16", num: "16", title: "Comparison", icon: "⚖️",
    color: { accent: "#0284c7", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
    units: [
      {
        id: "u37", num: "37", title: "Comparative and Superlative Forms",
        path: "/english/grammar/unified-grammar/unit-37",
        modelTopic: "Sports and Leisure — Athletes' Salaries; far higher than, the most watched, increasingly competitive.",
        grammarFocus: [
          "One/two-syllable adjectives: generally -er/-est; some exceptions (more bored, not boreder)",
          "as + adjective/adverb + as for equality; not as...as for inequality",
          "Double comparative: The more you read, the better you write",
          "Intensifiers: much/far/considerably/slightly + comparative",
        ],
        sources: [
          { level: "basic",        section: 16,      label: "S16: Units 1–6 — Forms; comparative or superlative?; use; adverb comparison; as…as" },
          { level: "intermediate", section: 16,      label: "S16: Units 1–6 — Revising adjective and adverb comparison; as…as; more on comparatives; like/as/so/such" },
          { level: "advanced",     section: 12,      label: "S12: Units 10–18 — as…as; -er/-est or more/most?; double comparatives; intensifiers; such/so; like/as" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 17 — Conjunctions
  ══════════════════════════════════════════════════════════ */
  {
    id: "s17", num: "17", title: "Conjunctions", icon: "🔗",
    color: { accent: "#be185d", bg: "#fdf2f8", badge: "#fbcfe8", text: "#831843" },
    units: [
      {
        id: "u38", num: "38", title: "Coordinating and Subordinating Conjunctions",
        path: "/english/grammar/unified-grammar/unit-38",
        modelTopic: "Environment — Individual vs Government Responsibility; arguing using although, because, unless, not only…but also.",
        grammarFocus: [
          "Subordinating conjunctions can begin a sentence: Although it rained, the event continued",
          "Tenses with time conjunctions: I'll call you when I arrive (NOT will arrive)",
          "Leaving out that: She knew (that) he was right — optional in informal English",
        ],
        sources: [
          { level: "basic",        section: 17,      label: "S17: Units 1–6 — Introduction; position; tenses with time conjunctions; because/so/although/but; and; double conjunctions" },
          { level: "intermediate", section: 17,      label: "S17: Units 1–8 — Revising use and position; present for future; so that/as long as/until; leaving out that; perfect for completion; tenses with since/for; conjunction + -ing/-ed" },
          { level: "advanced",     section: 14,      label: "S14: Units 2–5 — Revising basics; and and or; double conjunctions; tense simplification; past tense with present/future meaning" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 18 — Conditionals (if)
  ══════════════════════════════════════════════════════════ */
  {
    id: "s18", num: "18", title: "Conditionals", icon: "🔀",
    color: { accent: "#0d9488", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },
    units: [
      {
        id: "u39", num: "39", title: "Zero and First Conditional",
        path: "/english/grammar/unified-grammar/unit-39",
        modelTopic: "Environment — Climate Policy; If governments act now, temperatures will stabilise.",
        grammarFocus: [
          "Zero: If + present simple, present simple (general truth/scientific fact)",
          "First: If + present simple, will + infinitive (real future — NOT if + will)",
          "unless = if not; as long as / provided that = conditional with extra emphasis",
          "in case ≠ if: Take an umbrella in case it rains (precaution, not condition)",
        ],
        sources: [
          { level: "basic",        section: 18,      label: "S18: Units 1–2 — if: position and unless; future conditional" },
          { level: "intermediate", section: 18,      label: "S18: Units 1–3 — Revising ordinary tense use; unless; first conditional extended" },
          { level: "advanced",     section: 17,      label: "S17: Units 2–3 — if: how many conditionals?; revising the basics" },
        ],
      },
      {
        id: "u40", num: "40", title: "Second and Third Conditional",
        path: "/english/grammar/unified-grammar/unit-40",
        modelTopic: "Government and Politics — Voting Systems; If voting were compulsory, turnout would be higher.",
        grammarFocus: [
          "Second: If + past simple, would + infinitive (NOT would in the if clause)",
          "were (not was) in formal/written second conditional: If I were you…",
          "Third: If + past perfect, would have + past participle",
          "Mixed: past condition + present result (If she had studied harder, she would be more confident now)",
          "Formal inversion: Were I to resign… / Had I known… / Should you need help…",
        ],
        sources: [
          { level: "basic",        section: 18,      label: "S18: Units 3–6 — Not real/not probable; if I were you; comparing first and second; unreal past" },
          { level: "intermediate", section: 18,      label: "S18: Units 2–5 — Revising second; could in conditionals; unreal past (third)" },
          { level: "advanced",     section: 17,      label: "S17: Units 3, 6–7 — Revising basics; more advanced points; informal structures" },
        ],
      },
      {
        id: "u41", num: "41", title: "wish, if only, it's time, I'd rather",
        path: "/english/grammar/unified-grammar/unit-41",
        modelTopic: "Work and Employment — Career Regrets; I wish I had chosen a different career. It's time I made a real decision.",
        grammarFocus: [
          "wish + past simple (present regret: I wish I knew)",
          "wish + would (complaint about someone else: I wish he would stop)",
          "wish + past perfect (past regret: I wish I had studied)",
          "it's time + past simple (overdue action: It's time you called)",
          "I'd rather + past simple (preference about someone else: I'd rather you didn't smoke)",
        ],
        sources: [
          { level: "intermediate", section: 18,      label: "S18: Units 7–9 — if only and I wish: tenses; in case; it's time and I'd rather" },
          { level: "advanced",     section: 17,      label: "S17: Units 3, 6–7 — Subjunctives and the unreal past — full advanced treatment" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 19 — Relative Clauses
  ══════════════════════════════════════════════════════════ */
  {
    id: "s19", num: "19", title: "Relative Clauses", icon: "🔁",
    color: { accent: "#6d28d9", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },
    units: [
      {
        id: "u42", num: "42", title: "Defining Relative Clauses",
        path: "/english/grammar/unified-grammar/unit-42",
        modelTopic: "Technology and Society — Artificial Intelligence; AI is a technology that is transforming industries.",
        grammarFocus: [
          "who (people), which (things), that (people or things in defining clauses)",
          "Omitting relative pronoun: only when it is the object of the relative clause",
          "whose for possession: a scientist whose research changed medicine",
          "Prepositions: the company that she works for (informal) vs for which she works (formal)",
        ],
        sources: [
          { level: "basic",        section: 19,      label: "S19: Units 1–5 — who/which; that; omitting relative pronouns; prepositions; relative what" },
          { level: "intermediate", section: 19,      label: "S19: Units 1–5 — Revising who/which/that; what = the thing that; whose; prepositions" },
          { level: "advanced",     section: 15,      label: "S15: Units 2–3 — Revising basics; identifying and non-identifying clauses" },
        ],
      },
      {
        id: "u43", num: "43", title: "Non-Defining Relative Clauses and Reduced Relatives",
        path: "/english/grammar/unified-grammar/unit-43",
        modelTopic: "Arts and Culture — Government Funding for the Arts; The arts sector, which employs thousands, receives limited funding.",
        grammarFocus: [
          "Non-defining: always use commas; never use that; cannot omit the pronoun",
          "which referring to whole clause: She passed the exam, which surprised everyone",
          "Reduced relatives: the man waiting outside (= who is waiting); the report submitted (= which was submitted)",
        ],
        sources: [
          { level: "intermediate", section: 19,      label: "S19: Units 6–8 — Reduced relative clauses; non-identifying clauses; reading complex sentences" },
          { level: "advanced",     section: 15,      label: "S15: Units 3–6 — Identifying vs non-identifying; reduced relatives; prepositions; other points" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 20 — Indirect Speech
  ══════════════════════════════════════════════════════════ */
  {
    id: "s20", num: "20", title: "Indirect Speech", icon: "💬",
    color: { accent: "#1d4ed8", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },
    units: [
      {
        id: "u44", num: "44", title: "Reported Statements and Questions",
        path: "/english/grammar/unified-grammar/unit-44",
        modelTopic: "Media and Communication — Fake News; what politicians said they were doing, what experts warned would occur.",
        grammarFocus: [
          "Tense backshift: present → past, past → past perfect, will → would",
          "No backshift when situation is still true: She said the Earth orbits the Sun",
          "Time/place words: now → then, today → that day, here → there, tomorrow → the next day",
          "Indirect questions: She asked where he was going (no inversion, no question mark)",
        ],
        sources: [
          { level: "basic",        section: 20,      label: "S20: Units 1–5 — Tenses and pronouns; indirect questions; present reporting verbs; here/now → there/then; infinitives" },
          { level: "intermediate", section: 20,      label: "S20: Units 1–7 — Revising all; present situations; indirect questions; infinitives; special cases" },
          { level: "advanced",     section: 16,      label: "S16: Units 2–4 — Revising basics; more about tenses; other points in indirect speech" },
        ],
      },
      {
        id: "u45", num: "45", title: "Reporting Verbs",
        path: "/english/grammar/unified-grammar/unit-45",
        modelTopic: "Science and Research — Open Access Publishing; researchers argue, claim, demonstrate, acknowledge, warn, and recommend.",
        grammarFocus: [
          "Pattern 1 — verb + that clause: argue, claim, explain, confirm, suggest",
          "Pattern 2 — verb + object + infinitive: ask, tell, advise, warn, encourage, persuade",
          "Pattern 3 — verb + -ing: admit, deny, recommend, acknowledge",
          "say (no object) vs tell (always needs object): She said it was late / She told me it was late",
        ],
        sources: [
          { level: "basic",        section: 20,      label: "S20: Unit 2 — say/tell distinction introduced" },
          { level: "intermediate", section: 20,      label: "S20: Unit 7 — Indirect speech special cases and more complex reporting verbs" },
          { level: "advanced",     section: 16,      label: "S16: Units 3–4 — More about tenses; other points including advanced reporting verbs" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 21 — Prepositions
  ══════════════════════════════════════════════════════════ */
  {
    id: "s21", num: "21", title: "Prepositions", icon: "📍",
    color: { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },
    units: [
      {
        id: "u46", num: "46", title: "Prepositions of Time and Place",
        path: "/english/grammar/unified-grammar/unit-46",
        modelTopic: "Transport and Travel — Urban Commuting; in cities, at stations, by train, on time vs in time.",
        grammarFocus: [
          "Time: at (precise time), in (months, years, seasons, parts of day), on (days, dates)",
          "Place: at (point/location), in (enclosed space), on (surface)",
          "Fixed expressions: in time vs on time; at the end vs in the end",
          "Movement prepositions: into/out of (direction); across, along, past, through (manner)",
        ],
        sources: [
          { level: "basic",        section: 21,      label: "S21: Units 1–7 — at/in/on (time); from…to/until/by; for/during/while; in/on (place); at; other place prepositions; movement" },
          { level: "intermediate", section: 21,      label: "S21: Units 1–3 — Revising time; revising place and movement; some preposition choices" },
          { level: "advanced",     section: 13,      label: "S13: Units 2–6 — Revising time; in/on (place); at; prepositions with -ing; end-position; before conjunctions" },
        ],
      },
      {
        id: "u47", num: "47", title: "Verb, Adjective, and Noun + Preposition Collocations",
        path: "/english/grammar/unified-grammar/unit-47",
        modelTopic: "Work and Employment — Workplace Stress; what employees cope with, what organisations are responsible for.",
        grammarFocus: [
          "Verb + preposition: agree with, apologise for, belong to, consist of, depend on, insist on, refer to",
          "Adjective + preposition: aware of, capable of, interested in, responsible for, similar to, surprised at/by",
          "Noun + preposition: a lack of, an increase in, a need for, an effect on",
          "These must be learned as collocations — no single rule governs them",
        ],
        sources: [
          { level: "basic",        section: 10,      label: "S10: Unit 2 — Verbs with prepositions introduced" },
          { level: "intermediate", section: 21,      label: "S21: Units 4–7 — Verbs; nouns; adjectives; expressions beginning with prepositions" },
          { level: "advanced",     section: 13,      label: "S13: Units 8–9 — Six confusable prepositions; six more confusable prepositions" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SECTION 22 — Spoken Grammar
  ══════════════════════════════════════════════════════════ */
  {
    id: "s22", num: "22", title: "Spoken Grammar", icon: "🗣️",
    color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
    units: [
      {
        id: "u48", num: "48", title: "Question Tags and Short Answers",
        path: "/english/grammar/unified-grammar/unit-48",
        modelTopic: "Society and Culture — The Generation Gap; dialogue rich in question tags (Things have changed, haven't they?).",
        grammarFocus: [
          "Formation: positive statement → negative tag; negative statement → positive tag",
          "Auxiliary matches the main clause: She can swim, can't she?",
          "Tricky cases: I am right, aren't I?; Let's go, shall we?; Nobody called, did they?",
          "Falling intonation (confirmation) vs rising intonation (genuine question)",
        ],
        sources: [
          { level: "basic",        section: 22,      label: "S22: Units 1–4 — Question tags; short answers; reply questions; revision of spoken Q&A" },
          { level: "intermediate", section: 22,      label: "S22: Units 4–5 — Revising question tags; more about tags (Nobody phoned, did they?)" },
          { level: "advanced",     section: "part2", label: "Part 2: Unit 19 — Short answers, reply questions and question tags — advanced" },
        ],
      },
      {
        id: "u49", num: "49", title: "Ellipsis, so/neither, and Spoken Sentence Structure",
        path: "/english/grammar/unified-grammar/unit-49",
        modelTopic: "Media and Communication — Decline of Face-to-Face Communication; natural ellipsis (Going out tonight? — Might do.).",
        grammarFocus: [
          "Ellipsis after auxiliaries: 'Are you coming?' 'I am.' (not repeating the main verb)",
          "Ellipsis with infinitives: I'd love to (not I'd love to come — understood from context)",
          "So am I / So do I (agreeing with positive); Neither am I / Nor do I (agreeing with negative)",
          "Spoken discourse markers: I mean, you know, sort of, kind of, well — not errors, but signals",
        ],
        sources: [
          { level: "basic",        section: 22,      label: "S22: Units 5–6 — Leaving out words; so am I / nor do I" },
          { level: "intermediate", section: 22,      label: "S22: Units 1–3, 7–8 — Spoken structure; dropping beginnings; dropping words after auxiliaries; so am I; structures with so and not" },
          { level: "advanced",     section: "part2", label: "Part 2: Units 13–17, 18, 21–25 — Ellipsis; spoken structure; politeness; emphasis; abbreviations" },
        ],
      },
    ],
  },
];

/* ─── Stats ──────────────────────────────────────────────── */
const totalSections = sections.length;
const totalUnits    = sections.reduce((a, s) => a + s.units.length, 0);
const FREE_UNITS    = 3;

/* ─── Component ──────────────────────────────────────────── */
export default function unifiedGrammarPage() {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Section collapse state — all open by default except we only open first
  const [openSections, setOpenSections] = useState({ 0: true });
  // Per-unit panel state: "overview" | "sources" | null
  const [unitPanel, setUnitPanel] = useState({});

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

  // Global unit index for free/lock gating
  let globalIdx = 0;
  const unitGlobalIndex = {};
  sections.forEach(s => s.units.forEach(u => { unitGlobalIndex[u.id] = ++globalIdx; }));

  const toggleSection = (si) => setOpenSections(p => ({ ...p, [si]: !p[si] }));

  const togglePanel = (uid, panel, e) => {
    e.preventDefault();
    e.stopPropagation();
    setUnitPanel(p => ({ ...p, [uid]: p[uid] === panel ? null : panel }));
  };

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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>unified-grammar Grammar</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── BOOK HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "32px" }}>
          {/* Composite cover */}
          <div style={{
            width: "140px", aspectRatio: "3/4",
            background: "linear-gradient(145deg, #1e3a5f 0%, #064e3b 50%, #1e1b4b 100%)",
            borderRadius: "10px", border: "1px solid #d1fae5", flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ fontSize: "22px" }}>📗</span>
              <span style={{ fontSize: "22px" }}>📘</span>
              <span style={{ fontSize: "22px" }}>📙</span>
            </div>
            <div style={{ width: "60px", height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }} />
            <p style={{ fontSize: "9px", fontWeight: 800, color: "rgba(255,255,255,0.8)", textAlign: "center", letterSpacing: "1px", lineHeight: 1.6 }}>
              unified-grammar<br />GRAMMAR<br />PROGRAMME
            </p>
          </div>

          {/* Info */}
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              3-LEVEL SPIRAL CURRICULUM
            </span>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              Oxford English Grammar Course — unified-grammar
            </h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontWeight: 500 }}>
              Michael Swan & Catherine Walter · Basic → Intermediate → Advanced
            </p>

            {/* Level key */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
              {Object.entries(BOOK_META).map(([key, b]) => (
                <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 700, backgroundColor: b.badge, color: b.text, padding: "3px 10px", borderRadius: "999px" }}>
                  {b.emoji} {b.shortLabel}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "16px", flexWrap: "wrap" }}>
              {[
                { val: totalSections, label: "Sections" },
                { val: totalUnits,    label: "Units" },
                { val: FREE_UNITS,    label: "Free", highlight: true },
              ].map(({ val, label, highlight }) => (
                <div key={label}>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: highlight ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(FREE_UNITS / totalUnits) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>{FREE_UNITS} of {totalUnits} units unlocked</span>
            </div>
          </div>
        </div>

        {/* ── LEGEND ── */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 20px", marginBottom: "18px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.6px", marginBottom: "9px" }}>HOW TO USE THIS PAGE</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {[
              { icon: "↗", label: "Click unit title → open lesson page" },
              { icon: "📖", label: "Click Overview icon → see model topic & grammar focus" },
              { icon: "📚", label: "Click Sources icon → see & navigate to OEGC book sections" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", minWidth: "20px", textAlign: "center" }}>{icon}</span>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── UPGRADE BANNER ── */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 20px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, lineHeight: 1.5 }}>
              Units 1–{FREE_UNITS} are free.{" "}
              <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link>
              {" "}to unlock all {totalUnits} units.
            </p>
          </div>
        )}

        {/* ── SECTIONS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {sections.map((section, si) => {
            const sc     = section.color;
            const isOpen = !!openSections[si];

            return (
              <div key={section.id} style={{
                backgroundColor: "#ffffff",
                border: `1px solid ${isOpen ? sc.badge : "#e5e7eb"}`,
                borderRadius: "12px", overflow: "hidden",
                transition: "border-color 0.2s",
              }}>

                {/* ── Section header ── */}
                <button
                  onClick={() => toggleSection(si)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 20px",
                    backgroundColor: isOpen ? sc.bg : "#ffffff",
                    border: "none", cursor: "pointer",
                    transition: "background-color 0.2s", textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* Section number badge */}
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "8px",
                      backgroundColor: isOpen ? sc.badge : "#f3f4f6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: 800,
                      color: isOpen ? sc.text : "#9ca3af",
                      flexShrink: 0,
                    }}>
                      {section.num}
                    </div>
                    <span style={{ fontSize: "18px" }}>{section.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: isOpen ? sc.text : "#374151", margin: 0, lineHeight: 1.3 }}>
                        Section {section.num} — {section.title}
                      </p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>
                        {section.units.length} {section.units.length === 1 ? "unit" : "units"}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    fontSize: "18px", color: isOpen ? sc.text : "#9ca3af",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.22s", display: "inline-block",
                  }}>›</span>
                </button>

                {/* ── Units ── */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.badge}` }}>
                    {section.units.map((unit, ui) => {
                      const globalNum = unitGlobalIndex[unit.id];
                      const isFree    = globalNum <= FREE_UNITS;
                      const locked    = !isLearner && !isFree;
                      const panel     = unitPanel[unit.id] || null;

                      return (
                        <div key={unit.id} style={{
                          borderBottom: ui < section.units.length - 1 ? `1px solid ${sc.badge}20` : "none",
                          backgroundColor: locked ? "#fafafa" : "#ffffff",
                          opacity: locked ? 0.65 : 1,
                        }}>

                          {/* ── Unit main row ── */}
                          <div style={{ display: "flex", alignItems: "stretch", minHeight: "60px" }}>

                            {/* Unit number */}
                            <div style={{
                              width: "48px", flexShrink: 0,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              borderRight: `1px solid ${sc.badge}30`,
                            }}>
                              <div style={{
                                width: "30px", height: "30px", borderRadius: "7px",
                                backgroundColor: locked ? "#f3f4f6" : sc.badge,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "10px", fontWeight: 800,
                                color: locked ? "#9ca3af" : sc.text,
                              }}>
                                {unit.num}
                              </div>
                            </div>

                            {/* Title + click to open */}
                            <Link
                              href={locked ? "#" : unit.path}
                              style={{
                                flex: 1, display: "flex", alignItems: "center",
                                padding: "10px 10px 10px 14px",
                                textDecoration: "none",
                                cursor: locked ? "not-allowed" : "pointer",
                                transition: "background-color 0.12s",
                              }}
                              onMouseEnter={(e) => { if (!locked) e.currentTarget.style.backgroundColor = `${sc.bg}`; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.35 }}>
                                  {unit.title}
                                </p>
                                <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
                                  {unit.sources.length} source section{unit.sources.length !== 1 ? "s" : ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "10px", flexShrink: 0 }}>
                                {isFree && (
                                  <span style={{ fontSize: "9px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 7px", borderRadius: "999px" }}>
                                    FREE
                                  </span>
                                )}
                                <span style={{ fontSize: "13px", color: locked ? "#d1d5db" : "#9ca3af" }}>
                                  {locked ? "🔒" : "↗"}
                                </span>
                              </div>
                            </Link>

                            {/* ── OVERVIEW toggle ── */}
                            <button
                              onClick={(e) => togglePanel(unit.id, "overview", e)}
                              title={panel === "overview" ? "Hide overview" : "Show overview"}
                              style={{
                                width: "48px", flexShrink: 0,
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
                                backgroundColor: panel === "overview" ? sc.bg : "transparent",
                                border: "none",
                                borderLeft: `1px solid ${panel === "overview" ? sc.badge : "#f3f4f6"}`,
                                cursor: "pointer",
                                transition: "background-color 0.15s, border-color 0.15s",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = sc.bg; e.currentTarget.style.borderLeftColor = sc.badge; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = panel === "overview" ? sc.bg : "transparent"; e.currentTarget.style.borderLeftColor = panel === "overview" ? sc.badge : "#f3f4f6"; }}
                            >
                              <span style={{ fontSize: "14px", lineHeight: 1 }}>📖</span>
                              <span style={{
                                fontSize: "8px", color: sc.text, fontWeight: 700,
                                transform: panel === "overview" ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s", display: "inline-block",
                              }}>▼</span>
                            </button>

                            {/* ── SOURCES toggle ── */}
                            <button
                              onClick={(e) => togglePanel(unit.id, "sources", e)}
                              title={panel === "sources" ? "Hide sources" : "Show sources"}
                              style={{
                                width: "48px", flexShrink: 0,
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
                                backgroundColor: panel === "sources" ? sc.bg : "transparent",
                                border: "none",
                                borderLeft: `1px solid ${panel === "sources" ? sc.badge : "#f3f4f6"}`,
                                cursor: "pointer",
                                transition: "background-color 0.15s, border-color 0.15s",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = sc.bg; e.currentTarget.style.borderLeftColor = sc.badge; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = panel === "sources" ? sc.bg : "transparent"; e.currentTarget.style.borderLeftColor = panel === "sources" ? sc.badge : "#f3f4f6"; }}
                            >
                              <span style={{ fontSize: "14px", lineHeight: 1 }}>📚</span>
                              <span style={{
                                fontSize: "8px", color: sc.text, fontWeight: 700,
                                transform: panel === "sources" ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s", display: "inline-block",
                              }}>▼</span>
                            </button>
                          </div>

                          {/* ── OVERVIEW PANEL ── */}
                          {panel === "overview" && (
                            <div style={{
                              borderTop: `1px dashed ${sc.badge}`,
                              backgroundColor: sc.bg,
                              padding: "14px 14px 14px 62px",
                            }}>
                              {/* Model Topic */}
                              <div style={{ marginBottom: "12px" }}>
                                <p style={{ fontSize: "10px", fontWeight: 800, color: sc.text, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "5px" }}>
                                  📌 Model Topic
                                </p>
                                <p style={{ fontSize: "12px", color: "#374151", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                                  {unit.modelTopic}
                                </p>
                              </div>
                              {/* Grammar Focus */}
                              <div>
                                <p style={{ fontSize: "10px", fontWeight: 800, color: sc.text, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" }}>
                                  🎯 Grammar Focus
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                  {unit.grammarFocus.map((point, pi) => (
                                    <div key={pi} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                      <div style={{
                                        width: "5px", height: "5px", borderRadius: "50%",
                                        backgroundColor: sc.accent, flexShrink: 0, marginTop: "6px",
                                      }} />
                                      <p style={{ fontSize: "12px", color: "#374151", lineHeight: 1.55, margin: 0 }}>{point}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ── SOURCES PANEL ── */}
                          {panel === "sources" && (
                            <div style={{
                              borderTop: `1px dashed ${sc.badge}`,
                              backgroundColor: sc.bg,
                              padding: "12px 14px 12px 62px",
                            }}>
                              <p style={{ fontSize: "10px", fontWeight: 800, color: sc.text, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "8px" }}>
                                📚 Source Sections — click to navigate
                              </p>
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                {unit.sources.map((src, si2) => {
                                  const bm  = BOOK_META[src.level];
                                  const url = oegcUrl(src.level, src.section);
                                  return (
                                    <Link
                                      key={si2}
                                      href={url}
                                      style={{
                                        display: "flex", alignItems: "flex-start", gap: "10px",
                                        padding: "9px 12px", borderRadius: "8px",
                                        backgroundColor: "#ffffff",
                                        border: `1px solid ${bm.badge}`,
                                        textDecoration: "none",
                                        transition: "border-color 0.12s, box-shadow 0.12s, transform 0.12s",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = bm.color;
                                        e.currentTarget.style.boxShadow   = `0 2px 8px ${bm.badge}`;
                                        e.currentTarget.style.transform   = "translateX(2px)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = bm.badge;
                                        e.currentTarget.style.boxShadow   = "none";
                                        e.currentTarget.style.transform   = "translateX(0)";
                                      }}
                                    >
                                      {/* Book emoji */}
                                      <span style={{ fontSize: "18px", flexShrink: 0, lineHeight: 1.2 }}>{bm.emoji}</span>

                                      {/* Label */}
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: bm.text, margin: 0, marginBottom: "2px" }}>
                                          {bm.label}
                                        </p>
                                        <p style={{ fontSize: "11px", color: "#6b7280", margin: 0, lineHeight: 1.4 }}>
                                          {src.label}
                                        </p>
                                      </div>

                                      {/* Level pill + arrow */}
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                                        <span style={{ fontSize: "9px", fontWeight: 700, backgroundColor: bm.badge, color: bm.text, padding: "2px 7px", borderRadius: "999px", whiteSpace: "nowrap" }}>
                                          {bm.shortLabel}
                                        </span>
                                        <span style={{ fontSize: "13px", color: "#9ca3af" }}>↗</span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>
              Unlock all {totalUnits} grammar units
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Full access to all {totalSections} sections with model topics, grammar focus points, and direct links to Basic, Intermediate, and Advanced source sections.
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
