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

// ─── Source book metadata ─────────────────────────────────────────────────────
const BOOKS = {
  "EIIU-Int": {
    label:   "Idioms in Use — Intermediate",
    color:   "#0369a1",
    bg:      "#f0f9ff",
    badge:   "#bae6fd",
    text:    "#0c4a6e",
    emoji:   "📘",
    baseUrl: "/english/idioms/iiu-intermediate",
    prefix:  "unit",
  },
  "EIIU-Adv": {
    label:   "Idioms in Use — Advanced",
    color:   "#7c3aed",
    bg:      "#faf5ff",
    badge:   "#ede9fe",
    text:    "#4c1d95",
    emoji:   "📗",
    baseUrl: "/english/idioms/iiu-advanced",
    prefix:  "unit",
  },
};

function sourceUrl(bookKey, unitNum) {
  const num  = unitNum.toString().padStart(2, "0");
  const book = BOOKS[bookKey];
  return `${book.baseUrl}/unit-${num}`;
}

// ─── Curriculum data ──────────────────────────────────────────────────────────
const curriculumData = [
  {
    id: "p01", title: "Learning About Idioms", icon: "🧠",
    color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
    units: [
      {
        id: "u01", num: "01", title: "What Are Idioms & How to Use Them",
        path: "/english/idioms/unified-idioms/unit-01",
        focus: "Definition, pragmatic context, dictionary & corpus skills, accuracy in use",
        sources: [
          { book: "EIIU-Int", unit: 1,  name: "What are idioms?" },
          { book: "EIIU-Int", unit: 2,  name: "Using your dictionary" },
          { book: "EIIU-Adv", unit: 1,  name: "What are idioms?" },
          { book: "EIIU-Adv", unit: 2,  name: "When and how are idioms used?" },
          { book: "EIIU-Adv", unit: 3,  name: "Using reference resources" },
          { book: "EIIU-Adv", unit: 5,  name: "Using idioms accurately" },
        ],
      },
      {
        id: "u02", num: "02", title: "Types, Patterns & Sources of Idioms",
        path: "/english/idioms/unified-idioms/unit-02",
        focus: "Idiom typology; metaphor patterns; register and appropriacy; fixed vs. flexible forms",
        sources: [
          { book: "EIIU-Adv", unit: 4,  name: "Common metaphors in idioms" },
          { book: "EIIU-Adv", unit: 6,  name: "Playing with idioms" },
          { book: "EIIU-Adv", unit: 7,  name: "Idioms from other varieties of English" },
          { book: "EIIU-Adv", unit: 8,  name: "New idioms" },
          { book: "EIIU-Adv", unit: 9,  name: "Similes" },
          { book: "EIIU-Adv", unit: 10, name: "Binomials" },
          { book: "EIIU-Adv", unit: 11, name: "Proverbs" },
          { book: "EIIU-Adv", unit: 12, name: "Euphemisms" },
          { book: "EIIU-Adv", unit: 13, name: "Clichés and fixed statements" },
          { book: "EIIU-Adv", unit: 14, name: "Other languages" },
        ],
      },
    ],
  },
  {
    id: "p02", title: "Emotions & Inner Life", icon: "💛",
    color: { accent: "#d97706", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
    units: [
      {
        id: "u03", num: "03", title: "Happiness and Sadness",
        path: "/english/idioms/unified-idioms/unit-03",
        focus: "Expressing positive and negative emotional states idiomatically",
        sources: [
          { book: "EIIU-Int", unit: 3, name: "Happiness and sadness" },
        ],
      },
      {
        id: "u04", num: "04", title: "Anger",
        path: "/english/idioms/unified-idioms/unit-04",
        focus: "Idioms for describing and expressing anger at varying intensities",
        sources: [
          { book: "EIIU-Int", unit: 4, name: "Anger" },
        ],
      },
      {
        id: "u05", num: "05", title: "Positive Feelings & Situations",
        path: "/english/idioms/unified-idioms/unit-05",
        focus: "Idioms for joy, satisfaction, confidence, and relief",
        sources: [
          { book: "EIIU-Adv", unit: 36, name: "Positive feelings" },
        ],
      },
      {
        id: "u06", num: "06", title: "Negative Feelings & Situations",
        path: "/english/idioms/unified-idioms/unit-06",
        focus: "Idioms for frustration, anxiety, despair, and distress",
        sources: [
          { book: "EIIU-Adv", unit: 37, name: "Negative feelings" },
        ],
      },
    ],
  },
  {
    id: "p03", title: "Thinking, Knowing & Perceiving", icon: "💡",
    color: { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },
    units: [
      {
        id: "u07", num: "07", title: "Knowing and Understanding",
        path: "/english/idioms/unified-idioms/unit-07",
        focus: "Idioms for awareness, comprehension, realisation, and ignorance",
        sources: [
          { book: "EIIU-Int", unit: 5, name: "Knowing and understanding" },
        ],
      },
      {
        id: "u08", num: "08", title: "Experience and Perception",
        path: "/english/idioms/unified-idioms/unit-08",
        focus: "Idioms describing how people come to know things through lived experience",
        sources: [
          { book: "EIIU-Int", unit: 6, name: "Experience and perception" },
        ],
      },
      {
        id: "u09", num: "09", title: "Memory",
        path: "/english/idioms/unified-idioms/unit-09",
        focus: "Idioms for remembering, forgetting, and recalling",
        sources: [
          { book: "EIIU-Int", unit: 30, name: "Memory" },
        ],
      },
    ],
  },
  {
    id: "p04", title: "Success, Failure & Problems", icon: "⚡",
    color: { accent: "#dc2626", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },
    units: [
      {
        id: "u10", num: "10", title: "Success and Failure",
        path: "/english/idioms/unified-idioms/unit-10",
        focus: "Idioms for achievement, triumph, collapse, and defeat",
        sources: [
          { book: "EIIU-Int", unit: 7,  name: "Success and failure" },
          { book: "EIIU-Adv", unit: 46, name: "Expressing success and failure" },
        ],
      },
      {
        id: "u11", num: "11", title: "Having Problems",
        path: "/english/idioms/unified-idioms/unit-11",
        focus: "Idioms describing being in difficulty or under pressure",
        sources: [
          { book: "EIIU-Int", unit: 8,  name: "Having problems" },
          { book: "EIIU-Adv", unit: 38, name: "Problems" },
        ],
      },
      {
        id: "u12", num: "12", title: "Dealing with Problems",
        path: "/english/idioms/unified-idioms/unit-12",
        focus: "Idioms for resolving, escaping, or confronting difficult situations",
        sources: [
          { book: "EIIU-Int", unit: 9, name: "Dealing with problems" },
        ],
      },
    ],
  },
  {
    id: "p05", title: "Communication & Language", icon: "🗣️",
    color: { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },
    units: [
      {
        id: "u13", num: "13", title: "Communication 1 — Words and Language",
        path: "/english/idioms/unified-idioms/unit-13",
        focus: "Idioms about speaking, writing, and language use itself",
        sources: [
          { book: "EIIU-Int", unit: 27, name: "Communication 1: words and language" },
        ],
      },
      {
        id: "u14", num: "14", title: "Communication 2 — Expressing Yourself",
        path: "/english/idioms/unified-idioms/unit-14",
        focus: "Idioms for how people express ideas, opinions, and feelings verbally",
        sources: [
          { book: "EIIU-Int", unit: 28, name: "Communication 2: expressing yourself" },
        ],
      },
      {
        id: "u15", num: "15", title: "Conversational Responses",
        path: "/english/idioms/unified-idioms/unit-15",
        focus: "Fixed idioms used as pragmatic reactions in spoken interaction",
        sources: [
          { book: "EIIU-Int", unit: 12, name: "Conversational responses" },
        ],
      },
      {
        id: "u16", num: "16", title: "Reacting to What Others Say",
        path: "/english/idioms/unified-idioms/unit-16",
        focus: "Idioms for scepticism, agreement, surprise, and dismissal in conversation",
        sources: [
          { book: "EIIU-Int", unit: 16, name: "Reacting to what others say" },
        ],
      },
      {
        id: "u17", num: "17", title: "Advising and Warning",
        path: "/english/idioms/unified-idioms/unit-17",
        focus: "Idioms used when giving counsel or caution",
        sources: [
          { book: "EIIU-Adv", unit: 42, name: "Advising and warning" },
        ],
      },
      {
        id: "u18", num: "18", title: "Telling Stories",
        path: "/english/idioms/unified-idioms/unit-18",
        focus: "Narrative idioms and discourse markers in spoken storytelling",
        sources: [
          { book: "EIIU-Adv", unit: 43, name: "Telling stories" },
        ],
      },
      {
        id: "u19", num: "19", title: "Responding, Agreeing & Disagreeing",
        path: "/english/idioms/unified-idioms/unit-19",
        focus: "Reactive idioms for agreement, disagreement, and acknowledgement",
        sources: [
          { book: "EIIU-Adv", unit: 44, name: "Responding to what people say" },
          { book: "EIIU-Adv", unit: 45, name: "Agreeing and disagreeing" },
        ],
      },
      {
        id: "u20", num: "20", title: "Emphasising",
        path: "/english/idioms/unified-idioms/unit-20",
        focus: "Idioms that intensify or stress a point in speech or writing",
        sources: [
          { book: "EIIU-Adv", unit: 47, name: "Emphasising" },
        ],
      },
    ],
  },
  {
    id: "p06", title: "Opinions, Arguments & Attitudes", icon: "⚖️",
    color: { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },
    units: [
      {
        id: "u21", num: "21", title: "Power and Authority",
        path: "/english/idioms/unified-idioms/unit-21",
        focus: "Idioms about control, influence, and institutional power",
        sources: [
          { book: "EIIU-Int", unit: 10, name: "Power and authority" },
        ],
      },
      {
        id: "u22", num: "22", title: "Structuring and Talking About Arguments",
        path: "/english/idioms/unified-idioms/unit-22",
        focus: "Discourse-level idioms for framing debates and presenting ideas",
        sources: [
          { book: "EIIU-Int", unit: 11, name: "Structuring and talking about arguments" },
        ],
      },
      {
        id: "u23", num: "23", title: "Praise and Criticism",
        path: "/english/idioms/unified-idioms/unit-23",
        focus: "Evaluative idioms for commending or attacking ideas and people",
        sources: [
          { book: "EIIU-Int", unit: 13, name: "Praise and criticism" },
        ],
      },
      {
        id: "u24", num: "24", title: "Opinions on People and Actions",
        path: "/english/idioms/unified-idioms/unit-24",
        focus: "Judgement idioms for assessing character or behaviour",
        sources: [
          { book: "EIIU-Int", unit: 14, name: "Opinions on people and actions" },
        ],
      },
      {
        id: "u25", num: "25", title: "Behaviour and Attitudes",
        path: "/english/idioms/unified-idioms/unit-25",
        focus: "Idioms describing how people act and what they stand for",
        sources: [
          { book: "EIIU-Int", unit: 15, name: "Behaviour and attitudes" },
        ],
      },
    ],
  },
  {
    id: "p07", title: "People: Character, Relationships & Social Life", icon: "🧑‍🤝‍🧑",
    color: { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
    units: [
      {
        id: "u26", num: "26", title: "People — Character and Behaviour",
        path: "/english/idioms/unified-idioms/unit-26",
        focus: "Idioms for personality traits, habits, and interpersonal tendencies",
        sources: [
          { book: "EIIU-Adv", unit: 27, name: "People — character and behaviour" },
        ],
      },
      {
        id: "u27", num: "27", title: "People — Appearance",
        path: "/english/idioms/unified-idioms/unit-27",
        focus: "Idioms describing how people look or present themselves",
        sources: [
          { book: "EIIU-Adv", unit: 28, name: "People — appearance" },
        ],
      },
      {
        id: "u28", num: "28", title: "Relationships — Friends and Family",
        path: "/english/idioms/unified-idioms/unit-28",
        focus: "Idioms for closeness, conflict, loyalty, and estrangement",
        sources: [
          { book: "EIIU-Adv", unit: 26, name: "Relationships — friends and family" },
        ],
      },
      {
        id: "u29", num: "29", title: "Human Relationships (General)",
        path: "/english/idioms/unified-idioms/unit-29",
        focus: "Broad interpersonal idioms covering attraction, conflict, and affection",
        sources: [
          { book: "EIIU-Int", unit: 22, name: "Human relationships" },
        ],
      },
      {
        id: "u30", num: "30", title: "Social Status",
        path: "/english/idioms/unified-idioms/unit-30",
        focus: "Idioms for class, privilege, and social mobility",
        sources: [
          { book: "EIIU-Int", unit: 21, name: "Social status" },
        ],
      },
    ],
  },
  {
    id: "p08", title: "Work, Business & Money", icon: "💼",
    color: { accent: "#0f766e", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },
    units: [
      {
        id: "u31", num: "31", title: "Work",
        path: "/english/idioms/unified-idioms/unit-31",
        focus: "Idioms for effort, tasks, employment, and workplace dynamics",
        sources: [
          { book: "EIIU-Int", unit: 25, name: "Work" },
          { book: "EIIU-Adv", unit: 30, name: "Work" },
        ],
      },
      {
        id: "u32", num: "32", title: "Business News",
        path: "/english/idioms/unified-idioms/unit-32",
        focus: "Idioms from financial journalism and corporate contexts",
        sources: [
          { book: "EIIU-Adv", unit: 31, name: "Business news" },
        ],
      },
      {
        id: "u33", num: "33", title: "Business Meetings",
        path: "/english/idioms/unified-idioms/unit-33",
        focus: "Idioms used in professional communication and meeting discourse",
        sources: [
          { book: "EIIU-Adv", unit: 32, name: "Business meetings" },
        ],
      },
      {
        id: "u34", num: "34", title: "Money",
        path: "/english/idioms/unified-idioms/unit-34",
        focus: "Idioms for financial status, spending, saving, and debt",
        sources: [
          { book: "EIIU-Int", unit: 24, name: "Money" },
          { book: "EIIU-Adv", unit: 33, name: "Money" },
        ],
      },
    ],
  },
  {
    id: "p09", title: "Society, Crime & Daily Life", icon: "🏛️",
    color: { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b" },
    units: [
      {
        id: "u35", num: "35", title: "Society",
        path: "/english/idioms/unified-idioms/unit-35",
        focus: "Idioms describing social structures, norms, and collective behaviour",
        sources: [
          { book: "EIIU-Adv", unit: 34, name: "Society" },
        ],
      },
      {
        id: "u36", num: "36", title: "Crime and Punishment",
        path: "/english/idioms/unified-idioms/unit-36",
        focus: "Idioms from legal and criminal contexts; also used metaphorically",
        sources: [
          { book: "EIIU-Adv", unit: 29, name: "Crime and punishment" },
        ],
      },
      {
        id: "u37", num: "37", title: "Daily Life",
        path: "/english/idioms/unified-idioms/unit-37",
        focus: "Practical idioms for routines, events, and everyday situations",
        sources: [
          { book: "EIIU-Adv", unit: 35, name: "Daily life" },
        ],
      },
    ],
  },
  {
    id: "p10", title: "Abstract Concepts", icon: "🔮",
    color: { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },
    units: [
      {
        id: "u38", num: "38", title: "Necessity and Desirability",
        path: "/english/idioms/unified-idioms/unit-38",
        focus: "Idioms expressing what is required, recommended, or lacking",
        sources: [
          { book: "EIIU-Int", unit: 19, name: "Necessity and desirability" },
        ],
      },
      {
        id: "u39", num: "39", title: "Probability and Luck",
        path: "/english/idioms/unified-idioms/unit-39",
        focus: "Idioms for chance, risk, uncertainty, and fortune",
        sources: [
          { book: "EIIU-Int", unit: 20, name: "Probability and luck" },
        ],
      },
      {
        id: "u40", num: "40", title: "Effort",
        path: "/english/idioms/unified-idioms/unit-40",
        focus: "Idioms about working hard, trying, and persisting",
        sources: [
          { book: "EIIU-Int", unit: 18, name: "Effort" },
        ],
      },
      {
        id: "u41", num: "41", title: "Danger",
        path: "/english/idioms/unified-idioms/unit-41",
        focus: "Idioms for risk, narrow escapes, and hazardous situations",
        sources: [
          { book: "EIIU-Int", unit: 17, name: "Danger" },
        ],
      },
      {
        id: "u42", num: "42", title: "Size, Position & Spatial Metaphors",
        path: "/english/idioms/unified-idioms/unit-42",
        focus: "Spatial and scalar idioms used metaphorically for situations and roles",
        sources: [
          { book: "EIIU-Int", unit: 23, name: "Size and position" },
        ],
      },
      {
        id: "u43", num: "43", title: "Speed, Distance and Intensity",
        path: "/english/idioms/unified-idioms/unit-43",
        focus: "Idioms describing how fast, far, or strongly something occurs",
        sources: [
          { book: "EIIU-Int", unit: 26, name: "Speed, distance and intensity" },
        ],
      },
      {
        id: "u44", num: "44", title: "Life and Experience: Proverbs",
        path: "/english/idioms/unified-idioms/unit-44",
        focus: "Proverbial idioms offering life wisdom; common in IELTS Writing",
        sources: [
          { book: "EIIU-Int", unit: 29, name: "Life and experience: proverbs" },
        ],
      },
    ],
  },
  {
    id: "p11", title: "Time", icon: "🕰️",
    color: { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },
    units: [
      {
        id: "u45", num: "45", title: "Time 1 — The Past and the Future",
        path: "/english/idioms/unified-idioms/unit-45",
        focus: "Idioms referring to historical events or anticipated developments",
        sources: [
          { book: "EIIU-Int", unit: 31, name: "Time 1: the past and the future" },
        ],
      },
      {
        id: "u46", num: "46", title: "Time 2 — Clocks and Frequency",
        path: "/english/idioms/unified-idioms/unit-46",
        focus: "Idioms for timing, punctuality, and how often something happens",
        sources: [
          { book: "EIIU-Int", unit: 32, name: "Time 2: clocks and frequency" },
        ],
      },
    ],
  },
  {
    id: "p12", title: "The Natural World", icon: "🌿",
    color: { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },
    units: [
      {
        id: "u47", num: "47", title: "The Elements",
        path: "/english/idioms/unified-idioms/unit-47",
        focus: "Idioms derived from fire, water, air, and earth",
        sources: [
          { book: "EIIU-Int", unit: 33, name: "The elements" },
        ],
      },
      {
        id: "u48", num: "48", title: "Colour",
        path: "/english/idioms/unified-idioms/unit-48",
        focus: "Colour-based idioms and their figurative meanings",
        sources: [
          { book: "EIIU-Int", unit: 34, name: "Colour" },
        ],
      },
      {
        id: "u49", num: "49", title: "Animals 1 — Describing People",
        path: "/english/idioms/unified-idioms/unit-49",
        focus: "Animal idioms used to characterise people and personalities",
        sources: [
          { book: "EIIU-Int", unit: 37, name: "Animals 1: describing people" },
          { book: "EIIU-Adv", unit: 18, name: "Animals" },
        ],
      },
      {
        id: "u50", num: "50", title: "Animals 2 — Describing Situations",
        path: "/english/idioms/unified-idioms/unit-50",
        focus: "Animal idioms applied to events, conditions, and contexts",
        sources: [
          { book: "EIIU-Int", unit: 38, name: "Animals 2: describing situations" },
        ],
      },
      {
        id: "u51", num: "51", title: "Nature",
        path: "/english/idioms/unified-idioms/unit-51",
        focus: "Idioms drawn from plants, landscapes, and natural processes",
        sources: [
          { book: "EIIU-Int", unit: 43, name: "Nature" },
        ],
      },
    ],
  },
  {
    id: "p13", title: "Clothes, Food & Domestic Life", icon: "🍽️",
    color: { accent: "#9333ea", bg: "#fdf4ff", badge: "#e9d5ff", text: "#581c87" },
    units: [
      {
        id: "u52", num: "52", title: "Clothes",
        path: "/english/idioms/unified-idioms/unit-52",
        focus: "Idioms originating from clothing and fashion",
        sources: [
          { book: "EIIU-Int", unit: 35, name: "Clothes" },
        ],
      },
      {
        id: "u53", num: "53", title: "Food",
        path: "/english/idioms/unified-idioms/unit-53",
        focus: "Idioms drawn from food, cooking, and eating",
        sources: [
          { book: "EIIU-Int", unit: 40, name: "Food" },
        ],
      },
      {
        id: "u54", num: "54", title: "Houses and Household Objects",
        path: "/english/idioms/unified-idioms/unit-54",
        focus: "Domestic idioms from furniture, rooms, and everyday objects",
        sources: [
          { book: "EIIU-Int", unit: 42, name: "Houses and household objects" },
        ],
      },
    ],
  },
  {
    id: "p14", title: "Games, Sport & Conflict", icon: "⚔️",
    color: { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#881337" },
    units: [
      {
        id: "u55", num: "55", title: "Games and Sport",
        path: "/english/idioms/unified-idioms/unit-55",
        focus: "Idioms derived from competitive activities; widely used in business and politics",
        sources: [
          { book: "EIIU-Int", unit: 36, name: "Games and sport" },
          { book: "EIIU-Adv", unit: 20, name: "Games and sport" },
        ],
      },
      {
        id: "u56", num: "56", title: "Weapons and War",
        path: "/english/idioms/unified-idioms/unit-56",
        focus: "Military idioms applied to conflict, effort, and strategy in everyday contexts",
        sources: [
          { book: "EIIU-Int", unit: 39, name: "Weapons and war" },
          { book: "EIIU-Adv", unit: 16, name: "War and conflict" },
        ],
      },
    ],
  },
  {
    id: "p15", title: "Transport, Roads & the Sea", icon: "⛵",
    color: { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },
    units: [
      {
        id: "u57", num: "57", title: "Roads and Transport",
        path: "/english/idioms/unified-idioms/unit-57",
        focus: "Journey and road idioms used metaphorically for decisions and progress",
        sources: [
          { book: "EIIU-Int", unit: 41, name: "Roads" },
          { book: "EIIU-Adv", unit: 17, name: "Transport" },
        ],
      },
      {
        id: "u58", num: "58", title: "Boats and Sailing",
        path: "/english/idioms/unified-idioms/unit-58",
        focus: "Maritime idioms; especially common in formal and journalistic writing",
        sources: [
          { book: "EIIU-Int", unit: 44, name: "Boats and sailing" },
          { book: "EIIU-Adv", unit: 15, name: "Sailing" },
        ],
      },
    ],
  },
  {
    id: "p16", title: "Science, Technology & the Arts", icon: "🔬",
    color: { accent: "#1d4ed8", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },
    units: [
      {
        id: "u59", num: "59", title: "Science, Technology and Machines",
        path: "/english/idioms/unified-idioms/unit-59",
        focus: "Idioms from technical fields used in everyday and academic language",
        sources: [
          { book: "EIIU-Int", unit: 45, name: "Science, technology and machines" },
          { book: "EIIU-Adv", unit: 24, name: "Science and technology" },
        ],
      },
      {
        id: "u60", num: "60", title: "Music and Theatre",
        path: "/english/idioms/unified-idioms/unit-60",
        focus: "Performance idioms used to describe social and professional situations",
        sources: [
          { book: "EIIU-Int", unit: 46, name: "Music and theatre" },
        ],
      },
      {
        id: "u61", num: "61", title: "Films, Plays and Books",
        path: "/english/idioms/unified-idioms/unit-61",
        focus: "Idioms from the arts used in reviews, journalism, and commentary",
        sources: [
          { book: "EIIU-Adv", unit: 25, name: "Films, plays and books" },
        ],
      },
    ],
  },
  {
    id: "p17", title: "Classical & Cultural Sources", icon: "🏺",
    color: { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
    units: [
      {
        id: "u62", num: "62", title: "Ancient Myths and History",
        path: "/english/idioms/unified-idioms/unit-62",
        focus: "Idioms rooted in classical antiquity and historical events",
        sources: [
          { book: "EIIU-Adv", unit: 21, name: "Ancient myths and history" },
        ],
      },
      {
        id: "u63", num: "63", title: "Shakespeare",
        path: "/english/idioms/unified-idioms/unit-63",
        focus: "Idioms coined or popularised by Shakespeare; still common in modern English",
        sources: [
          { book: "EIIU-Adv", unit: 22, name: "Shakespeare" },
        ],
      },
      {
        id: "u64", num: "64", title: "Literature",
        path: "/english/idioms/unified-idioms/unit-64",
        focus: "Idioms derived from literary works and characters",
        sources: [
          { book: "EIIU-Adv", unit: 23, name: "Literature" },
        ],
      },
    ],
  },
  {
    id: "p18", title: "Written Contexts", icon: "✍️",
    color: { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b" },
    units: [
      {
        id: "u65", num: "65", title: "Idioms in Journalism",
        path: "/english/idioms/unified-idioms/unit-65",
        focus: "Idioms common in newspaper headlines, reports, and editorials",
        sources: [
          { book: "EIIU-Adv", unit: 39, name: "Journalism" },
        ],
      },
      {
        id: "u66", num: "66", title: "Idioms in Advertising",
        path: "/english/idioms/unified-idioms/unit-66",
        focus: "Persuasive and aspirational idioms used in marketing language",
        sources: [
          { book: "EIIU-Adv", unit: 40, name: "Advertising" },
        ],
      },
      {
        id: "u67", num: "67", title: "Idioms in Formal Writing",
        path: "/english/idioms/unified-idioms/unit-67",
        focus: "Semi-fixed idioms acceptable in academic, legal, and official registers",
        sources: [
          { book: "EIIU-Adv", unit: 41, name: "Formal writing" },
        ],
      },
    ],
  },
  {
    id: "p19", title: "Keyword-Based: Body Parts", icon: "🖐️",
    color: { accent: "#dc2626", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },
    units: [
      {
        id: "u68", num: "68", title: "The Hand: Finger, Thumb, Hand",
        path: "/english/idioms/unified-idioms/unit-68",
        focus: "Idioms built on hand-related vocabulary",
        sources: [
          { book: "EIIU-Int", unit: 47, name: "Finger, thumb, hand" },
          { book: "EIIU-Adv", unit: 53, name: "Hand" },
        ],
      },
      {
        id: "u69", num: "69", title: "The Foot and Leg",
        path: "/english/idioms/unified-idioms/unit-69",
        focus: "Lower-limb idioms often relating to movement, hesitation, or stance",
        sources: [
          { book: "EIIU-Int", unit: 48, name: "Foot, heel, toe" },
        ],
      },
      {
        id: "u70", num: "70", title: "The Body: Bones, Shoulder, Arm, Leg",
        path: "/english/idioms/unified-idioms/unit-70",
        focus: "Upper and skeletal body idioms for effort, cost, and responsibility",
        sources: [
          { book: "EIIU-Int", unit: 49, name: "Bones, shoulder, arm, leg" },
          { book: "EIIU-Adv", unit: 19, name: "Parts of the body" },
        ],
      },
      {
        id: "u71", num: "71", title: "The Head",
        path: "/english/idioms/unified-idioms/unit-71",
        focus: "Idioms centred on the head; often relate to thinking and control",
        sources: [
          { book: "EIIU-Int", unit: 50, name: "Head" },
        ],
      },
      {
        id: "u72", num: "72", title: "The Face: Face, Hair, Neck, Chest",
        path: "/english/idioms/unified-idioms/unit-72",
        focus: "Facial and upper-body idioms relating to emotion and confrontation",
        sources: [
          { book: "EIIU-Int", unit: 51, name: "Face, hair, neck, chest" },
        ],
      },
      {
        id: "u73", num: "73", title: "The Eyes",
        path: "/english/idioms/unified-idioms/unit-73",
        focus: "Eye idioms for attention, awareness, and perception",
        sources: [
          { book: "EIIU-Int", unit: 52, name: "Eyes" },
        ],
      },
      {
        id: "u74", num: "74", title: "The Mouth: Ear, Lips, Mouth, Nose, Teeth, Tongue",
        path: "/english/idioms/unified-idioms/unit-74",
        focus: "Speech and sense-organ idioms for communication and reaction",
        sources: [
          { book: "EIIU-Int", unit: 53, name: "Ear, lips, mouth, nose, teeth, tongue" },
        ],
      },
      {
        id: "u75", num: "75", title: "The Heart",
        path: "/english/idioms/unified-idioms/unit-75",
        focus: "Emotional depth idioms centred on the heart",
        sources: [
          { book: "EIIU-Int", unit: 54, name: "Heart" },
          { book: "EIIU-Adv", unit: 54, name: "Heart" },
        ],
      },
      {
        id: "u76", num: "76", title: "The Mind: Brain, Mind, Blood and Guts",
        path: "/english/idioms/unified-idioms/unit-76",
        focus: "Cognitive and visceral idioms for thought, decision, and courage",
        sources: [
          { book: "EIIU-Int", unit: 55, name: "Brain, mind, blood and guts" },
          { book: "EIIU-Adv", unit: 57, name: "Mind" },
        ],
      },
      {
        id: "u77", num: "77", title: "The Back",
        path: "/english/idioms/unified-idioms/unit-77",
        focus: "Back-related idioms for loyalty, secrecy, and support",
        sources: [
          { book: "EIIU-Int", unit: 56, name: "Back" },
        ],
      },
    ],
  },
  {
    id: "p20", title: "High-Frequency Keyword Idioms", icon: "🔑",
    color: { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },
    units: [
      {
        id: "u78", num: "78", title: "Play and Game",
        path: "/english/idioms/unified-idioms/unit-78",
        focus: "Idioms built on play/game that describe strategy, behaviour, and competition",
        sources: [
          { book: "EIIU-Adv", unit: 48, name: "Play and game" },
        ],
      },
      {
        id: "u79", num: "79", title: "Half and Two",
        path: "/english/idioms/unified-idioms/unit-79",
        focus: "Number-based idioms expressing ambivalence, duplicity, or deduction",
        sources: [
          { book: "EIIU-Adv", unit: 49, name: "Half" },
          { book: "EIIU-Adv", unit: 50, name: "Two" },
        ],
      },
      {
        id: "u80", num: "80", title: "All and No",
        path: "/english/idioms/unified-idioms/unit-80",
        focus: "Total and negative quantifier idioms; common in emphasis and argument",
        sources: [
          { book: "EIIU-Adv", unit: 51, name: "All" },
          { book: "EIIU-Adv", unit: 52, name: "No" },
        ],
      },
      {
        id: "u81", num: "81", title: "Life, Live, Dead and Death",
        path: "/english/idioms/unified-idioms/unit-81",
        focus: "Existence-themed idioms with strong metaphorical force",
        sources: [
          { book: "EIIU-Adv", unit: 55, name: "Life and live" },
          { book: "EIIU-Adv", unit: 56, name: "Dead and death" },
        ],
      },
      {
        id: "u82", num: "82", title: "Hard, Fall and Own",
        path: "/english/idioms/unified-idioms/unit-82",
        focus: "High-frequency keyword idioms for difficulty, decline, and self-assertion",
        sources: [
          { book: "EIIU-Adv", unit: 58, name: "Hard" },
          { book: "EIIU-Adv", unit: 59, name: "Fall" },
          { book: "EIIU-Adv", unit: 60, name: "Own" },
        ],
      },
      {
        id: "u83", num: "83", title: "Good and Bad",
        path: "/english/idioms/unified-idioms/unit-83",
        focus: "Evaluative idioms built on the most fundamental English adjectives",
        sources: [
          { book: "EIIU-Int", unit: 60, name: "Good and bad" },
        ],
      },
      {
        id: "u84", num: "84", title: "Line, Long and Ground",
        path: "/english/idioms/unified-idioms/unit-84",
        focus: "Spatial and temporal keyword idioms; widely applicable across topics",
        sources: [
          { book: "EIIU-Int", unit: 57, name: "Long" },
          { book: "EIIU-Int", unit: 58, name: "Line" },
          { book: "EIIU-Int", unit: 61, name: "Ground" },
        ],
      },
      {
        id: "u85", num: "85", title: "Act, Action and Activity",
        path: "/english/idioms/unified-idioms/unit-85",
        focus: "Process and agency idioms for doing, performing, and initiating",
        sources: [
          { book: "EIIU-Int", unit: 59, name: "Act, action, activity" },
        ],
      },
      {
        id: "u86", num: "86", title: "Similes: Like and As",
        path: "/english/idioms/unified-idioms/unit-86",
        focus: "Fixed comparison idioms; highly productive pattern in both spoken and written English",
        sources: [
          { book: "EIIU-Int", unit: 62, name: "Similes and idioms with like and as" },
          { book: "EIIU-Adv", unit: 9,  name: "Similes" },
        ],
      },
    ],
  },
];

// ─── Summary stats ─────────────────────────────────────────────────────────────
const totalParts   = curriculumData.length;
const totalUnits   = curriculumData.reduce((a, s) => a + s.units.length, 0);
const totalSources = curriculumData.reduce(
  (a, s) => a + s.units.reduce((b, u) => b + u.sources.length, 0), 0
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function UnifiedIdiomsPage() {
  const [user, setUser]                 = useState(null);
  const [role, setRole]                 = useState(null);
  const [loading, setLoading]           = useState(true);
  const [expandedSections, setExpanded] = useState({ 0: true });
  const [expandedSources, setSources]   = useState({});

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

  const isLearner     = role === "learner" || role === "admin" || role === "owner";
  const toggleSection = (idx) => setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  const toggleSources = (uid, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSources((prev) => ({ ...prev, [uid]: !prev[uid] }));
  };

  let gIdx = 0;
  const unitIndexMap = {};
  curriculumData.forEach((s) => s.units.forEach((u) => { unitIndexMap[u.id] = ++gIdx; }));

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>Loading...</p>
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
            <Link href="/english/idioms" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Idioms</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>Unified Idioms</span>
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

          {/* Visual "cover" */}
          <div style={{
            width: "140px", aspectRatio: "3/4",
            background: "linear-gradient(145deg, #0c4a6e 0%, #0369a1 55%, #7c3aed 100%)",
            borderRadius: "10px", border: "1px solid #bae6fd", flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
          }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontSize: "28px" }}>📘</span>
              <span style={{ fontSize: "28px" }}>📗</span>
            </div>
            <p style={{ fontSize: "8px", fontWeight: 800, color: "rgba(255,255,255,0.9)", textAlign: "center", marginTop: "4px", letterSpacing: "0.8px", lineHeight: 1.6 }}>
              UNIFIED<br />IDIOMS
            </p>
          </div>

          {/* Info */}
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#ede9fe", color: "#4c1d95", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              2-LEVEL PROGRAMME
            </span>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              English Idioms in Use — Unified
            </h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontWeight: 500 }}>
              Michael McCarthy & Felicity O'Dell — Intermediate through Advanced
            </p>

            {/* Level key */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
              {Object.entries(BOOKS).map(([key, b]) => (
                <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 700, backgroundColor: b.badge, color: b.text, padding: "3px 9px", borderRadius: "999px" }}>
                  {b.emoji} {key}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "18px", flexWrap: "wrap" }}>
              {[
                { val: totalParts,   label: "Parts" },
                { val: totalUnits,   label: "Units" },
                { val: totalSources, label: "Source refs" },
                { val: 3, label: "Free", highlight: true },
              ].map(({ val, label, highlight }) => (
                <div key={label}>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: highlight ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(3 / totalUnits) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>3 of {totalUnits} unlocked</span>
            </div>
          </div>
        </div>

        {/* ── HOW-TO LEGEND ── */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 20px", marginBottom: "20px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.6px", marginBottom: "8px" }}>HOW TO NAVIGATE</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {[
              { icon: "↗", color: "#059669", label: "Unit title → open the combined lesson" },
              { icon: "📚▼", color: "#7c3aed", label: "Right button → expand / collapse sources" },
              { icon: "📘", color: "#0369a1", label: "Source card → jump to that book's unit" },
            ].map(({ icon, color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 800, color, minWidth: "24px" }}>{icon}</span>
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
              Units 1–3 are free. <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link> to unlock all {totalUnits} units.
            </p>
          </div>
        )}

        {/* ── PARTS / SECTIONS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {curriculumData.map((part, pi) => {
            const sc     = part.color;
            const isOpen = expandedSections[pi] !== false;

            return (
              <div key={part.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.badge : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>

                {/* Part header */}
                <button
                  onClick={() => toggleSection(pi)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "18px" }}>{part.icon}</span>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: sc.text, margin: 0 }}>
                        Part {pi + 1} — {part.title}
                      </p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>
                        {part.units.length} units · {part.units.reduce((a, u) => a + u.sources.length, 0)} sources
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: "17px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {/* Units */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.badge}` }}>
                    {part.units.map((unit, ui) => {
                      const isFree      = unitIndexMap[unit.id] <= 3;
                      const locked      = !isLearner && !isFree;
                      const showSources = expandedSources[unit.id];

                      return (
                        <div key={unit.id} style={{ borderBottom: ui < part.units.length - 1 ? "1px solid #f3f4f6" : "none" }}>

                          {/* Unit row */}
                          <div style={{
                            display: "flex", alignItems: "stretch",
                            backgroundColor: locked ? "#fafafa" : "#ffffff",
                            opacity: locked ? 0.65 : 1,
                          }}>

                            {/* Unit title link */}
                            <Link
                              href={locked ? "#" : unit.path}
                              style={{
                                flex: 1, display: "flex", alignItems: "center", gap: "12px",
                                padding: "12px 12px 12px 20px", textDecoration: "none",
                                cursor: locked ? "not-allowed" : "pointer",
                                transition: "background-color 0.12s",
                              }}
                              onMouseEnter={(e) => { if (!locked) e.currentTarget.style.backgroundColor = sc.bg; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                              {/* Number badge */}
                              <div style={{
                                width: "36px", height: "36px", borderRadius: "8px",
                                backgroundColor: locked ? "#f3f4f6" : sc.badge,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "11px", fontWeight: 800,
                                color: locked ? "#9ca3af" : sc.text,
                                flexShrink: 0,
                              }}>
                                {unit.num}
                              </div>

                              {/* Title + focus */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
                                  {unit.title}
                                </p>
                                <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {unit.focus}
                                </p>
                              </div>

                              {/* Badges + arrow */}
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                                {isFree && (
                                  <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 7px", borderRadius: "999px" }}>
                                    FREE
                                  </span>
                                )}
                                <span style={{ fontSize: "13px", color: locked ? "#d1d5db" : "#9ca3af" }}>
                                  {locked ? "🔒" : "›"}
                                </span>
                              </div>
                            </Link>

                            {/* Sources toggle button */}
                            <button
                              onClick={(e) => toggleSources(unit.id, e)}
                              title={showSources ? "Hide sources" : "Show source units"}
                              style={{
                                width: "48px", flexShrink: 0,
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px",
                                backgroundColor: showSources ? sc.bg : "transparent",
                                border: "none", borderLeft: `1px solid ${showSources ? sc.badge : "#f3f4f6"}`,
                                cursor: "pointer", transition: "background-color 0.15s, border-color 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = sc.bg;
                                e.currentTarget.style.borderLeftColor  = sc.badge;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = showSources ? sc.bg : "transparent";
                                e.currentTarget.style.borderLeftColor  = showSources ? sc.badge : "#f3f4f6";
                              }}
                            >
                              <span style={{ fontSize: "14px", lineHeight: 1 }}>📚</span>
                              <span style={{
                                fontSize: "8px", color: sc.text, fontWeight: 700,
                                transform: showSources ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s", display: "inline-block",
                              }}>▼</span>
                            </button>
                          </div>

                          {/* Sources panel */}
                          {showSources && (
                            <div style={{
                              backgroundColor: sc.bg,
                              borderTop: `1px dashed ${sc.badge}`,
                              padding: "10px 16px 10px 68px",
                            }}>
                              <p style={{ fontSize: "10px", fontWeight: 700, color: sc.text, letterSpacing: "0.6px", marginBottom: "8px", textTransform: "uppercase" }}>
                                Source Units
                              </p>
                              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                {unit.sources.map((src, si2) => {
                                  const book = BOOKS[src.book];
                                  const url  = sourceUrl(src.book, src.unit);
                                  return (
                                    <Link
                                      key={si2}
                                      href={url}
                                      style={{
                                        display: "flex", alignItems: "center", gap: "10px",
                                        padding: "7px 10px", borderRadius: "8px",
                                        backgroundColor: "#ffffff",
                                        border: `1px solid ${book.badge}`,
                                        textDecoration: "none",
                                        transition: "border-color 0.12s, box-shadow 0.12s",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = book.color;
                                        e.currentTarget.style.boxShadow   = `0 1px 6px ${book.badge}`;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = book.badge;
                                        e.currentTarget.style.boxShadow   = "none";
                                      }}
                                    >
                                      <span style={{ fontSize: "15px", flexShrink: 0 }}>{book.emoji}</span>

                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: book.text, margin: 0 }}>
                                          {src.book} · Unit {src.unit.toString().padStart(2, "0")}
                                        </p>
                                        <p style={{ fontSize: "11px", color: "#6b7280", margin: "1px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                          {src.name}
                                        </p>
                                      </div>

                                      <span style={{
                                        fontSize: "9px", fontWeight: 700,
                                        backgroundColor: book.badge, color: book.text,
                                        padding: "2px 7px", borderRadius: "999px",
                                        whiteSpace: "nowrap", flexShrink: 0,
                                      }}>
                                        {src.book === "EIIU-Int" ? "Intermediate" : "Advanced"}
                                      </span>

                                      <span style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0 }}>↗</span>
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
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>Unlock the full {totalUnits}-unit programme</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Access all {totalParts} parts with {totalSources}+ source references across both levels.
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
