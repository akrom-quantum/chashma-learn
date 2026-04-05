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

/* ─── Book data — full 3-level hierarchy ───────────────── */
const bookData = {
  id:      "oegc-basic",
  title:   "Oxford English Grammar Course",
  level:   "Basic",
  authors: "Michael Swan & Catherine Walter",
  cover:   "/books/oegc-basic.jpg",
  sections: [
    {
      id: "section-01", num: "01", title: "be and have", icon: "🔤",
      subsections: [
        { title: "be", units: [
          { num: "1",  label: "I am happy today. Are we late?" },
          { num: "2",  label: "be: past — Where were you? I was in Glasgow." },
          { num: "3",  label: "be: future — The bus will be full." },
          { num: "4",  label: "there is/was — There's a dog in the garden." },
          { num: "5",  label: "there is: future — Will there be cars?" },
        ]},
        { title: "have", units: [
          { num: "6",  label: "I have / do you have? / I don't have" },
          { num: "7",  label: "have: past and future" },
          { num: "8",  label: "have: actions — He's having a shower." },
          { num: "9",  label: "have without do: have got — Have you got a cat?" },
        ]},
        { title: "Review", units: [
          { num: "10", label: "be and have: more practice" },
          { num: "11", label: "be and have: revision test" },
        ]},
      ],
    },
    {
      id: "section-02", num: "02", title: "Present Tenses", icon: "🕐",
      subsections: [
        { title: "Simple Present", units: [
          { num: "1",  label: "Simple present affirmative — I work; you work; she works" },
          { num: "2",  label: "Simple present: use — I work in a bank." },
          { num: "3",  label: "Simple present negatives — I don't know. She doesn't ski." },
          { num: "4",  label: "Simple present questions — Do you remember me?" },
          { num: "5",  label: "Simple present: more practice" },
        ]},
        { title: "Present Progressive", units: [
          { num: "6",  label: "Present progressive: forms — I'm reading. I'm not working." },
          { num: "7",  label: "Present progressive: use — I'm working just now." },
          { num: "8",  label: "Present progressive negatives — He's not listening to me." },
          { num: "9",  label: "Present progressive questions — Is it raining?" },
          { num: "10", label: "Present progressive: more practice" },
        ]},
        { title: "Combined & Special", units: [
          { num: "11", label: "The two present tenses: the difference" },
          { num: "12", label: "Non-progressive verbs — I don't understand." },
        ]},
        { title: "Review", units: [
          { num: "13", label: "Present tenses: more practice" },
          { num: "14", label: "Present tenses: revision test" },
        ]},
      ],
    },
    {
      id: "section-03", num: "03", title: "Talking About the Future", icon: "🔮",
      subsections: [
        { title: "going to & Present Progressive", units: [
          { num: "1", label: "going to — Look – it's going to rain." },
          { num: "2", label: "Present progressive — What are you doing this evening?" },
        ]},
        { title: "will", units: [
          { num: "3", label: "will: predicting — I think it will rain tomorrow." },
          { num: "4", label: "will: deciding, refusing, promising — I'll answer it." },
        ]},
        { title: "Simple Present for Future", units: [
          { num: "5", label: "Simple present for future — Our train leaves at 8.10." },
        ]},
        { title: "Review", units: [
          { num: "6", label: "Future: more practice" },
          { num: "7", label: "Future: revision test" },
        ]},
      ],
    },
    {
      id: "section-04", num: "04", title: "Past Tenses", icon: "⏪",
      subsections: [
        { title: "Simple Past", units: [
          { num: "1", label: "Simple past: forms — I worked. I went." },
          { num: "2", label: "Simple past: use — I left school in 1990." },
          { num: "3", label: "Simple past: negatives — I did not work. I did not go." },
          { num: "4", label: "Simple past questions — Did you pay? What did she say?" },
          { num: "5", label: "Simple past: more practice" },
        ]},
        { title: "Past Progressive", units: [
          { num: "6", label: "Past progressive — What were you doing at 8.00?" },
          { num: "7", label: "Simple past or past progressive? — I walked / I was walking" },
        ]},
        { title: "Review", units: [
          { num: "8", label: "Past tenses: more practice" },
          { num: "9", label: "Past tenses: revision test" },
        ]},
      ],
    },
    {
      id: "section-05", num: "05", title: "Perfect Tenses", icon: "✅",
      subsections: [
        { title: "Present Perfect", units: [
          { num: "1", label: "Present perfect: forms — I have paid. Has she forgotten?" },
          { num: "2", label: "Finished actions: present perfect or simple past?" },
          { num: "3", label: "Time words: present perfect or simple past?" },
          { num: "4", label: "already, yet and just" },
          { num: "5", label: "since and for — since Tuesday; for ten years" },
          { num: "6", label: "Present perfect progressive — It's been raining since Sunday." },
        ]},
        { title: "Past Perfect", units: [
          { num: "7", label: "Past perfect — It had already begun when we arrived." },
        ]},
        { title: "Review", units: [
          { num: "8", label: "Perfect tenses: more practice" },
          { num: "9", label: "Perfect tenses: revision test" },
        ]},
      ],
    },
    {
      id: "section-06", num: "06", title: "Modal Verbs", icon: "🎛️",
      subsections: [
        { title: "Core Modals", units: [
          { num: "1",  label: "Modal verbs: introduction — can, must, should etc." },
          { num: "2",  label: "must — You must be home by eleven. Must you go?" },
          { num: "3",  label: "have to — Do you have to teach small children?" },
          { num: "4",  label: "mustn't and don't have to — We mustn't wake the baby." },
          { num: "5",  label: "had to, will have to — I didn't have to pay." },
          { num: "6",  label: "should — What should I tell John?" },
          { num: "7",  label: "can — He can play the piano." },
          { num: "8",  label: "could; be able to — She couldn't write. I'll be able to drive soon." },
          { num: "9",  label: "may and might — It may snow. I might have a cold." },
          { num: "10", label: "can, could and may: permission — Can I use the phone?" },
          { num: "11", label: "can/could you?: requests — Can you lend me a stamp?" },
          { num: "12", label: "shall in questions — What shall we do?" },
          { num: "13", label: "would — Would you like a drink? I'd like to be taller." },
          { num: "14", label: "used to — I used to play the piano." },
        ]},
        { title: "Review", units: [
          { num: "15", label: "Modal verbs: more practice" },
          { num: "16", label: "Modal verbs: revision test" },
        ]},
      ],
    },
    {
      id: "section-07", num: "07", title: "Passives", icon: "🔄",
      subsections: [
        { title: "Forms", units: [
          { num: "1", label: "Passives: introduction — English is spoken in Australia." },
          { num: "2", label: "Simple present passive — We are woken by the birds." },
          { num: "3", label: "Future passive — Tomorrow your bicycle will be stolen." },
          { num: "4", label: "Simple past passive — I was stopped by a policeman." },
          { num: "5", label: "Present progressive passive — It's being cleaned." },
          { num: "6", label: "Present perfect passive — The house has been sold." },
        ]},
        { title: "Review", units: [
          { num: "7", label: "Passives: more practice" },
          { num: "8", label: "Passives: revision test" },
        ]},
      ],
    },
    {
      id: "section-08", num: "08", title: "Questions and Negatives", icon: "❓",
      subsections: [
        { title: "Questions", units: [
          { num: "1", label: "yes/no questions — Is the taxi here? Do I need a visa?" },
          { num: "2", label: "Question words — When will you see her?" },
          { num: "3", label: "Question-word subjects — Who phoned? What happened?" },
          { num: "4", label: "Questions with long subjects — Are Ann and her mother coming?" },
          { num: "5", label: "Prepositions in questions — Who did you go with?" },
        ]},
        { title: "Negatives", units: [
          { num: "6", label: "Negatives — Dogs can't fly. I don't know why." },
          { num: "7", label: "not and no" },
          { num: "8", label: "Negatives with nobody, never etc. — Nobody loves me." },
        ]},
        { title: "Review", units: [
          { num: "9",  label: "Questions and negatives: more practice" },
          { num: "10", label: "Questions and negatives: revision test" },
        ]},
      ],
    },
    {
      id: "section-09", num: "09", title: "Infinitives and -ing Forms", icon: "∞",
      subsections: [
        { title: "Infinitives", units: [
          { num: "1", label: "Infinitives: using to — I want to go. Must you go?" },
          { num: "2", label: "Infinitive of purpose — She went to Paris to study music." },
          { num: "3", label: "Verb + infinitive — I hope to be an airline pilot." },
          { num: "4", label: "Verb + object + infinitive — He wants me to cook." },
          { num: "5", label: "it with infinitive subjects — It's nice to be here with you." },
          { num: "6", label: "Adjective + infinitive — glad to find you at home" },
          { num: "7", label: "Adjectives with enough/to + infinitive — too tired to sing" },
          { num: "8", label: "Noun/pronoun + infinitive — some letters to write" },
        ]},
        { title: "-ing Forms", units: [
          { num: "9",  label: "-ing forms as subjects — Smoking is bad for you." },
          { num: "10", label: "Preposition + …ing — Thank you for coming." },
          { num: "11", label: "Verb + …ing — I can't help feeling unhappy." },
        ]},
        { title: "Review", units: [
          { num: "12", label: "Infinitives and -ing forms: more practice" },
          { num: "13", label: "Infinitives and -ing forms: revision test" },
        ]},
      ],
    },
    {
      id: "section-10", num: "10", title: "Special Structures with Verbs", icon: "⚙️",
      subsections: [
        { title: "Structures", units: [
          { num: "1", label: "Structures with get — get up / get your coat / it's getting cold" },
          { num: "2", label: "Verbs with prepositions — Wait for me." },
          { num: "3", label: "Phrasal verbs — Come in, take off your coat and sit down." },
          { num: "4", label: "Verbs with two objects — Take the boss these letters." },
          { num: "5", label: "have something done — I have my hair cut every week." },
          { num: "6", label: "Imperatives — Come in. Don't worry." },
          { num: "7", label: "let's (suggestions) — Let's go." },
        ]},
        { title: "Review", units: [
          { num: "8", label: "Special structures with verbs: more practice" },
          { num: "9", label: "Special structures with verbs: revision test" },
        ]},
      ],
    },
    {
      id: "section-11", num: "11", title: "Articles: a/an and the", icon: "📝",
      subsections: [
        { title: "a/an", units: [
          { num: "1", label: "a/an; pronunciation of the" },
          { num: "2", label: "Countable and uncountable — a car, cars; petrol" },
          { num: "3", label: "the and a/an — Let's see a film. I didn't like the film." },
          { num: "4", label: "a/an — She's a doctor." },
          { num: "5", label: "a/an: describing people — She's got a nice smile." },
        ]},
        { title: "the", units: [
          { num: "6", label: "Talking in general without the — People are funny." },
          { num: "7", label: "Names — Mary, Africa, the USA" },
          { num: "8", label: "Special cases — in bed; after lunch; a hundred; …" },
        ]},
        { title: "Review", units: [
          { num: "9",  label: "Articles: more practice" },
          { num: "10", label: "Articles: revision test" },
        ]},
      ],
    },
    {
      id: "section-12", num: "12", title: "Determiners", icon: "🗂️",
      subsections: [
        { title: "Core Determiners", units: [
          { num: "1",  label: "this, that, these and those" },
          { num: "2",  label: "some and any — I need some sugar. Have you got any?" },
          { num: "3",  label: "somebody, anything, nowhere …" },
          { num: "4",  label: "much and many — How much milk? How many languages?" },
          { num: "5",  label: "a lot of and lots of" },
          { num: "6",  label: "a little and a few — a little English; a few words" },
          { num: "7",  label: "enough money; fast enough" },
          { num: "8",  label: "too, too much/many and not enough" },
          { num: "9",  label: "all — all my friends are here; my friends are all here" },
          { num: "10", label: "all and every; each" },
          { num: "11", label: "both, either and neither" },
          { num: "12", label: "Determiners and of — most people; most of us" },
        ]},
        { title: "Review", units: [
          { num: "13", label: "Determiners: more practice" },
          { num: "14", label: "Determiners: revision test" },
        ]},
      ],
    },
    {
      id: "section-13", num: "13", title: "Personal Pronouns; Possessives", icon: "👤",
      subsections: [
        { title: "Pronouns & Possessives", units: [
          { num: "1", label: "Personal pronouns: I and me etc." },
          { num: "2", label: "Possessives: my, your etc. — This is my coat." },
          { num: "3", label: "Possessives: mine, yours etc. — This is mine." },
          { num: "4", label: "Reflexive pronouns: myself, yourself etc." },
        ]},
        { title: "Review", units: [
          { num: "5", label: "Personal pronouns and possessives: more practice" },
          { num: "6", label: "Personal pronouns and possessives: revision test" },
        ]},
      ],
    },
    {
      id: "section-14", num: "14", title: "Nouns", icon: "🏷️",
      subsections: [
        { title: "Noun Forms", units: [
          { num: "1", label: "Singular and plural nouns — cat, cats; box, boxes" },
          { num: "2", label: "Singular/plural — team, family; jeans, scissors" },
          { num: "3", label: "Countable and uncountable nouns" },
          { num: "4", label: "one and ones — a big one; the ones on the chair" },
          { num: "5", label: "'s and s' possessive: forms — son's, sons', men's" },
          { num: "6", label: "'s and s' possessive: use — Ian's car; the boss's car" },
          { num: "7", label: "Noun + noun — Milk chocolate is a kind of chocolate." },
        ]},
        { title: "Review", units: [
          { num: "8", label: "Nouns: more practice" },
          { num: "9", label: "Nouns: revision test" },
        ]},
      ],
    },
    {
      id: "section-15", num: "15", title: "Adjectives and Adverbs", icon: "✨",
      subsections: [
        { title: "Adjectives", units: [
          { num: "1", label: "Adjectives — a beautiful little girl who was not stupid" },
        ]},
        { title: "Adverbs", units: [
          { num: "2", label: "Adverbs of manner — He ate quickly." },
          { num: "3", label: "Other adverbs — I like sport very much." },
          { num: "4", label: "Adverbs with the verb — often, certainly etc." },
          { num: "5", label: "interested and interesting etc." },
          { num: "6", label: "fast, hard, hardly, well, friendly, …" },
        ]},
        { title: "Review", units: [
          { num: "7", label: "Adjectives and adverbs: more practice" },
          { num: "8", label: "Adjectives and adverbs: revision test" },
        ]},
      ],
    },
    {
      id: "section-16", num: "16", title: "Comparison", icon: "⚖️",
      subsections: [
        { title: "Comparative & Superlative", units: [
          { num: "1", label: "Comparative and superlative adjectives: forms" },
          { num: "2", label: "Comparative or superlative?" },
          { num: "3", label: "Comparatives: use — brighter than the moon" },
          { num: "4", label: "Superlatives — the highest mountain in the world" },
          { num: "5", label: "Comparison of adverbs — More slowly, please." },
          { num: "6", label: "(not) as … as — Your hands are as cold as ice." },
        ]},
        { title: "Review", units: [
          { num: "7", label: "Comparison: more practice" },
          { num: "8", label: "Comparison: revision test" },
        ]},
      ],
    },
    {
      id: "section-17", num: "17", title: "Conjunctions", icon: "🔗",
      subsections: [
        { title: "Conjunctions", units: [
          { num: "1", label: "Conjunctions: introduction — and, but, because …" },
          { num: "2", label: "Position of conjunctions — If you need help, ask me." },
          { num: "3", label: "Tenses with time conjunctions — I'll see you before you go." },
          { num: "4", label: "because and so; although and but" },
          { num: "5", label: "and — I speak Russian, English and Swahili" },
          { num: "6", label: "Double conjunctions — both … and; (n)either … (n)or" },
        ]},
        { title: "Review", units: [
          { num: "7", label: "Conjunctions: more practice" },
          { num: "8", label: "Conjunctions: revision test" },
        ]},
      ],
    },
    {
      id: "section-18", num: "18", title: "if", icon: "🔀",
      subsections: [
        { title: "Conditionals", units: [
          { num: "1", label: "if: position; unless" },
          { num: "2", label: "if: future — I'll phone you if I hear from Alice." },
          { num: "3", label: "Not real / not probable — If dogs could talk, …" },
          { num: "4", label: "If I were you, …" },
          { num: "5", label: "If I go, I will …; If I went, I would …" },
          { num: "6", label: "Unreal past — If A had happened, B would have happened." },
        ]},
        { title: "Review", units: [
          { num: "7", label: "if: more practice" },
          { num: "8", label: "if: revision test" },
        ]},
      ],
    },
    {
      id: "section-19", num: "19", title: "Relative Pronouns", icon: "🔁",
      subsections: [
        { title: "Relative Clauses", units: [
          { num: "1", label: "Relative who and which — the keys which I lost" },
          { num: "2", label: "Relative that — a bird that can't fly" },
          { num: "3", label: "Leaving out relative pronouns — the car (that) you bought" },
          { num: "4", label: "Prepositions — the man that she works for" },
          { num: "5", label: "Relative what — It was just what I wanted." },
        ]},
        { title: "Review", units: [
          { num: "6", label: "Relative pronouns: more practice" },
          { num: "7", label: "Relative pronouns: revision test" },
        ]},
      ],
    },
    {
      id: "section-20", num: "20", title: "Indirect Speech", icon: "💬",
      subsections: [
        { title: "Reported Speech", units: [
          { num: "1", label: "Tenses and pronouns — Bill said he was really happy." },
          { num: "2", label: "Indirect questions — She asked him what his name was." },
          { num: "3", label: "Present reporting verbs — She says she comes from London." },
          { num: "4", label: "here and now → there and then" },
          { num: "5", label: "Infinitives — She told me to get out." },
        ]},
        { title: "Review", units: [
          { num: "6", label: "Indirect speech: more practice" },
          { num: "7", label: "Indirect speech: revision test" },
        ]},
      ],
    },
    {
      id: "section-21", num: "21", title: "Prepositions", icon: "📍",
      subsections: [
        { title: "Time Prepositions", units: [
          { num: "1", label: "at, in and on (time)" },
          { num: "2", label: "from … to, until and by" },
          { num: "3", label: "for, during and while" },
        ]},
        { title: "Place Prepositions", units: [
          { num: "4", label: "in and on (place)" },
          { num: "5", label: "at (place)" },
          { num: "6", label: "Other prepositions of place" },
          { num: "7", label: "Prepositions of movement" },
        ]},
        { title: "Review", units: [
          { num: "8", label: "Prepositions: more practice" },
          { num: "9", label: "Prepositions: revision test" },
        ]},
      ],
    },
    {
      id: "section-22", num: "22", title: "Spoken Grammar", icon: "🗣️",
      subsections: [
        { title: "Spoken Structures", units: [
          { num: "1", label: "Question tags — This music isn't very good, is it?" },
          { num: "2", label: "Short answers — Yes, I have. No, they didn't." },
          { num: "3", label: "Reply questions — Oh, yes? Did they really?" },
          { num: "4", label: "Revision of spoken question and answer structures" },
          { num: "5", label: "Leaving out words — Don't know if she has." },
          { num: "6", label: "so am I; nor do I etc." },
        ]},
        { title: "Review", units: [
          { num: "7", label: "Spoken grammar: more practice" },
          { num: "8", label: "Spoken grammar: revision test" },
        ]},
      ],
    },
  ],
};

const FREE_SECTIONS = 3;

/* ─── Palette ────────────────────────────────────────────── */
const palette = [
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
  { accent: "#7e22ce", bg: "#faf5ff", border: "#ddd6fe", text: "#4c1d95", numBg: "#ede9fe" },
  { accent: "#0284c7", bg: "#f0f9ff", border: "#bae6fd", text: "#0c4a6e", numBg: "#dbeafe" },
  { accent: "#be185d", bg: "#fdf2f8", border: "#fbcfe8", text: "#831843", numBg: "#fce7f3" },
  { accent: "#0d9488", bg: "#f0fdfa", border: "#99f6e4", text: "#134e4a", numBg: "#ccfbf1" },
  { accent: "#6d28d9", bg: "#faf5ff", border: "#ede9fe", text: "#4c1d95", numBg: "#ede9fe" },
];

/* ─── Helpers ────────────────────────────────────────────── */
function countUnits(section) {
  return section.subsections.reduce((a, s) => a + s.units.length, 0);
}

/* ─── SubsectionBlock — shared by both layouts ──────────── */
function SubsectionBlock({ sub, sc, locked }) {
  const isReview = sub.title === "Review";
  return (
    <div style={{ marginBottom: "13px" }}>

      {/* Subsection heading row */}
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

      {/* Unit rows */}
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
              width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
              backgroundColor: locked ? "#e5e7eb" : sc.numBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 800, letterSpacing: "-0.3px",
              color: locked ? "#9ca3af" : sc.text,
            }}>
              {section.num}
            </div>
            <span style={{ fontSize: "18px" }}>{section.icon}</span>
          </div>
          {locked
            ? <span style={{ fontSize: "14px" }}>🔒</span>
            : parseInt(section.num) <= FREE_SECTIONS
              ? <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>FREE</span>
              : null
          }
        </div>
        <h2 style={{ fontSize: "13px", fontWeight: 800, margin: "0 0 3px", lineHeight: 1.3, color: locked ? "#9ca3af" : sc.text }}>
          Section {section.num}: {section.title}
        </h2>
        <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          {section.subsections.filter(s => s.title !== "Review").length} subsections · {countUnits(section)} lessons
        </p>
      </div>

      {/* ── All subsections (always shown in grid) ── */}
      <div style={{ padding: "14px 16px 4px", flex: 1 }}>
        {section.subsections.map((sub, i) => (
          <SubsectionBlock key={i} sub={sub} sc={sc} locked={locked} />
        ))}
      </div>

      {/* ── Footer CTA ── */}
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

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: `1px solid ${open && !locked ? sc.border : "#e5e7eb"}`,
      borderRadius: "12px", overflow: "hidden",
      opacity: locked ? 0.58 : 1,
      transition: "border-color 0.2s",
    }}>

      {/* ── Always-visible header row ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 20px",
        backgroundColor: open && !locked ? sc.bg : "#ffffff",
        transition: "background-color 0.2s",
      }}>
        {/* Section number */}
        <div style={{
          width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
          backgroundColor: locked ? "#e5e7eb" : sc.numBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 800,
          color: locked ? "#9ca3af" : sc.text,
        }}>
          {section.num}
        </div>

        {/* Icon */}
        <span style={{ fontSize: "20px", flexShrink: 0 }}>{section.icon}</span>

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: locked ? "#9ca3af" : sc.text, margin: 0, lineHeight: 1.3 }}>
            {section.title}
          </p>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
            {section.subsections.filter(s => s.title !== "Review").length} subsections · {countUnits(section)} lessons
          </p>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {!locked && parseInt(section.num) <= FREE_SECTIONS && (
            <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>
              FREE
            </span>
          )}

          {locked
            ? <span style={{ fontSize: "15px" }}>🔒</span>
            : (
              <>
                {/* Show / Hide lessons button */}
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
                    fontSize: "9px",
                    display: "inline-block",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}>▼</span>
                </button>

                {/* Open section link */}
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

      {/* ── Expandable lessons panel ── */}
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
export default function OEGCBasicPage() {
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>OEGC Basic</span>
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
              <span style={{ fontSize: "32px" }}>📗</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              BASIC
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px", flexWrap: "wrap" }}>
              {[
                { val: bookData.sections.length, label: "Sections" },
                { val: totalLessons,             label: "Total lessons" },
                { val: FREE_SECTIONS,            label: "Free sections", highlight: true },
              ].map(({ val, label, highlight }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: highlight ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(FREE_SECTIONS / bookData.sections.length) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                {FREE_SECTIONS} of {bookData.sections.length} unlocked
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
              {" "}to unlock all {bookData.sections.length} sections.
            </p>
          </div>
        )}

        {/* ── LAYOUT TOGGLE ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, margin: 0 }}>
            {bookData.sections.length} Sections · {totalLessons} Lessons
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
            {bookData.sections.map((section, si) => {
              const sc     = palette[si] || palette[0];
              const locked = !isLearner && si >= FREE_SECTIONS;
              const href   = locked ? "#" : `/english/grammar/oegc-basic/${section.id}`;
              return <GridCard key={section.id} section={section} sc={sc} locked={locked} href={href} />;
            })}
          </div>
        )}

        {/* ── HORIZONTAL LAYOUT ── */}
        {layout === "horizontal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {bookData.sections.map((section, si) => {
              const sc     = palette[si] || palette[0];
              const locked = !isLearner && si >= FREE_SECTIONS;
              const href   = locked ? "#" : `/english/grammar/oegc-basic/${section.id}`;
              return <HorizontalRow key={section.id} section={section} sc={sc} locked={locked} href={href} />;
            })}
          </div>
        )}

        {/* ── BOTTOM CTA ── */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>
              Unlock all {bookData.sections.length} sections
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to every grammar section with all subsections and lessons.
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
