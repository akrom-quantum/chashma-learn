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

// ── URL helpers ────────────────────────────────────────────────────────────────
const BASE = "https://chashma-learn.vercel.app";
const bookPath = {
  Int: "collocations/ciu-intermediate",
  Adv: "collocations/ciu-advanced",
};
const levelLabel = {
  Int: "Intermediate",
  Adv: "Advanced",
};
const levelColors = {
  Int: { bg: "#ede9fe", text: "#4c1d95", dot: "#7c3aed" },
  Adv: { bg: "#fecdd3", text: "#9f1239", dot: "#e11d48" },
};

// ── BOOK DATA ─────────────────────────────────────────────────────────────────
// src format: { level: "Int"|"Adv", unitId: "ciu-int-u01", label: "Unit 01 — Title" }
// focus: string

const bookData = {
  title:   "Unified Collocations Book",
  authors: "English Collocations in Use — Intermediate & Advanced",
  cover:   "/books/unified-collocations.jpg",
  unified: true,
  sections: [

    // ─────────────────────────────────────────────────────────────────────────
    // PART I — Foundation: Understanding Collocations
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part I — Foundation: Understanding Collocations",
      icon: "🧠",
      color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc" },
      units: [
        {
          num: "1", id: "u1",
          title: "What are collocations and how do they work?",
          sources: [
            { level: "Int", unitId: "ciu-int-u01", label: "Unit 01 — What is a collocation?" },
            { level: "Int", unitId: "ciu-int-u02", label: "Unit 02 — Finding, recording and learning collocations" },
            { level: "Int", unitId: "ciu-int-u03", label: "Unit 03 — Using your dictionary" },
            { level: "Int", unitId: "ciu-int-u04", label: "Unit 04 — Types of collocation" },
            { level: "Adv", unitId: "ciu-adv-u01", label: "Unit 01 — Introducing collocations" },
            { level: "Adv", unitId: "ciu-adv-u02", label: "Unit 02 — Strong, fixed and weak collocations" },
            { level: "Adv", unitId: "ciu-adv-u03", label: "Unit 03 — Grammatical categories of collocation" },
            { level: "Adv", unitId: "ciu-adv-u04", label: "Unit 04 — Using your dictionary and other resources" },
            { level: "Adv", unitId: "ciu-adv-u05", label: "Unit 05 — Finding and working on collocations in texts" },
          ],
          focus: "Definition, types (strong/weak/fixed), grammatical categories, dictionary skills, self-study strategies",
        },
        {
          num: "2", id: "u2",
          title: "Register: formal, informal, and academic collocations",
          sources: [
            { level: "Int", unitId: "ciu-int-u05", label: "Unit 05 — Register" },
            { level: "Adv", unitId: "ciu-adv-u06", label: "Unit 06 — Register" },
          ],
          focus: "Recognising appropriate collocations across spoken, written, formal, and informal contexts",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART II — Grammatical Patterns
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part II — Grammatical Patterns",
      icon: "🔤",
      color: { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd" },
      units: [
        {
          num: "3", id: "u3",
          title: "Intensifying and softening adverbs",
          sources: [
            { level: "Int", unitId: "ciu-int-u06", label: "Unit 06 — Intensifying adverbs" },
            { level: "Adv", unitId: "ciu-adv-u08", label: "Unit 08 — Intensifying and softening adverbs" },
          ],
          focus: "Adverb + adjective and adverb + verb patterns; degree and emphasis",
        },
        {
          num: "4", id: "u4",
          title: "High-frequency everyday verbs: make, do, have, take, go",
          sources: [
            { level: "Int", unitId: "ciu-int-u07", label: "Unit 07 — Everyday verbs 1" },
            { level: "Int", unitId: "ciu-int-u08", label: "Unit 08 — Everyday verbs 2" },
            { level: "Int", unitId: "ciu-int-u09", label: "Unit 09 — Everyday verbs 3" },
            { level: "Adv", unitId: "ciu-adv-u09", label: "Unit 09 — Make and verbs that mean make" },
          ],
          focus: "The most common collocation-forming verbs; choosing the right verb for the right noun",
        },
        {
          num: "5", id: "u5",
          title: "Phrasal verbs as collocations",
          sources: [
            { level: "Adv", unitId: "ciu-adv-u11", label: "Unit 11 — Collocations with phrasal verbs" },
          ],
          focus: "How phrasal verbs combine with objects to form fixed or semi-fixed collocations",
        },
        {
          num: "6", id: "u6",
          title: "Metaphorical collocations",
          sources: [
            { level: "Int", unitId: "ciu-int-u12", label: "Unit 12 — Metaphor" },
            { level: "Adv", unitId: "ciu-adv-u07", label: "Unit 07 — Metaphor" },
          ],
          focus: "Collocations derived from physical or sensory metaphors; common in academic and journalistic writing",
        },
        {
          num: "7", id: "u7",
          title: "Synonyms and confusable words",
          sources: [
            { level: "Int", unitId: "ciu-int-u10", label: "Unit 10 — Synonyms and confusable words 1" },
            { level: "Int", unitId: "ciu-int-u11", label: "Unit 11 — Synonyms and confusable words 2" },
          ],
          focus: "Why similar words take different collocates; common learner errors",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART III — People and Relationships
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part III — People and Relationships",
      icon: "👥",
      color: { accent: "#be185d", bg: "#fdf2f8", badge: "#fce7f3", text: "#831843", border: "#f9a8d4" },
      units: [
        {
          num: "8", id: "u8",
          title: "Character, behaviour, and personality",
          sources: [
            { level: "Int", unitId: "ciu-int-u17", label: "Unit 17 — People: character and behaviour" },
            { level: "Adv", unitId: "ciu-adv-u45", label: "Unit 45 — Appearance and personality" },
          ],
          focus: "Adjective + noun and verb + noun patterns describing inner qualities",
        },
        {
          num: "9", id: "u9",
          title: "Physical appearance",
          sources: [
            { level: "Int", unitId: "ciu-int-u18", label: "Unit 18 — People: physical appearance" },
            { level: "Adv", unitId: "ciu-adv-u24", label: "Unit 24 — Advertisements and fashion" },
          ],
          focus: "Describing looks; collocations common in speaking and descriptive writing",
        },
        {
          num: "10", id: "u10",
          title: "Family, relationships, and social life",
          sources: [
            { level: "Int", unitId: "ciu-int-u19", label: "Unit 19 — Families" },
            { level: "Int", unitId: "ciu-int-u20", label: "Unit 20 — Relationships" },
            { level: "Adv", unitId: "ciu-adv-u40", label: "Unit 40 — Friendship" },
            { level: "Adv", unitId: "ciu-adv-u19", label: "Unit 19 — Social life" },
            { level: "Adv", unitId: "ciu-adv-u23", label: "Unit 23 — Festivals and celebrations" },
          ],
          focus: "Noun + noun and verb + noun patterns in social and family contexts",
        },
        {
          num: "11", id: "u11",
          title: "Feelings and emotions",
          sources: [
            { level: "Int", unitId: "ciu-int-u21", label: "Unit 21 — Feelings and emotions" },
            { level: "Adv", unitId: "ciu-adv-u59", label: "Unit 59 — Negative situations and feelings" },
            { level: "Adv", unitId: "ciu-adv-u60", label: "Unit 60 — Positive situations and feelings" },
          ],
          focus: "Adjective + noun, verb + noun patterns for expressing emotional states",
        },
        {
          num: "12", id: "u12",
          title: "Youth, age, and life stages",
          sources: [
            { level: "Adv", unitId: "ciu-adv-u41", label: "Unit 41 — Youth and age" },
          ],
          focus: "Collocations across the lifespan; natural expressions for age-related topics",
        },
        {
          num: "13", id: "u13",
          title: "Criticising and praising people",
          sources: [
            { level: "Int", unitId: "ciu-int-u60", label: "Unit 60 — Praising and criticising" },
            { level: "Adv", unitId: "ciu-adv-u43", label: "Unit 43 — Criticising people" },
            { level: "Adv", unitId: "ciu-adv-u42", label: "Unit 42 — Celebrities and heroes" },
          ],
          focus: "Evaluative collocations; useful for IELTS Writing Task 2 argument building",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART IV — Leisure and Lifestyle
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part IV — Leisure and Lifestyle",
      icon: "🎭",
      color: { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd" },
      units: [
        {
          num: "14", id: "u14",
          title: "Housing and living spaces",
          sources: [
            { level: "Int", unitId: "ciu-int-u22", label: "Unit 22 — Houses, flats and rooms" },
            { level: "Adv", unitId: "ciu-adv-u32", label: "Unit 32 — Town and country life" },
          ],
          focus: "Verb + noun and adjective + noun patterns for describing places people live",
        },
        {
          num: "15", id: "u15",
          title: "Food, eating, and drinking",
          sources: [
            { level: "Int", unitId: "ciu-int-u23", label: "Unit 23 — Eating and drinking" },
          ],
          focus: "Collocations around food preparation, meals, and hunger/appetite",
        },
        {
          num: "16", id: "u16",
          title: "Films, books, and the arts",
          sources: [
            { level: "Int", unitId: "ciu-int-u24", label: "Unit 24 — Films and books" },
            { level: "Adv", unitId: "ciu-adv-u29", label: "Unit 29 — Film and book reviews" },
          ],
          focus: "Critical and descriptive collocations for arts and media",
        },
        {
          num: "17", id: "u17",
          title: "Music and performance",
          sources: [
            { level: "Int", unitId: "ciu-int-u25", label: "Unit 25 — Music" },
          ],
          focus: "Collocations for describing musical events and activities",
        },
        {
          num: "18", id: "u18",
          title: "Sport and physical activity",
          sources: [
            { level: "Int", unitId: "ciu-int-u26", label: "Unit 26 — Sport" },
            { level: "Adv", unitId: "ciu-adv-u27", label: "Unit 27 — Sport" },
          ],
          focus: "Verb + sport noun patterns; competition and performance collocations",
        },
        {
          num: "19", id: "u19",
          title: "Health and illness",
          sources: [
            { level: "Int", unitId: "ciu-int-u27", label: "Unit 27 — Health and illness" },
            { level: "Adv", unitId: "ciu-adv-u37", label: "Unit 37 — Health and medicine" },
          ],
          focus: "Medical and wellness collocations; common in IELTS Reading passages",
        },
        {
          num: "20", id: "u20",
          title: "Talking and conversation",
          sources: [
            { level: "Int", unitId: "ciu-int-u49", label: "Unit 49 — Ways of speaking" },
            { level: "Adv", unitId: "ciu-adv-u20", label: "Unit 20 — Talking" },
            { level: "Adv", unitId: "ciu-adv-u10", label: "Unit 10 — Communicating" },
          ],
          focus: "Verb + noun patterns for communication acts; useful for speaking and writing",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART V — Travel, Places, and the Environment
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part V — Travel, Places, and the Environment",
      icon: "✈️",
      color: { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d" },
      units: [
        {
          num: "21", id: "u21",
          title: "Weather",
          sources: [
            { level: "Int", unitId: "ciu-int-u13", label: "Unit 13 — Weather" },
          ],
          focus: "Adjective + noun and verb + noun patterns for weather description",
        },
        {
          num: "22", id: "u22",
          title: "Travel and transport",
          sources: [
            { level: "Int", unitId: "ciu-int-u14", label: "Unit 14 — Travel" },
            { level: "Adv", unitId: "ciu-adv-u26", label: "Unit 26 — Travel and adventure" },
            { level: "Adv", unitId: "ciu-adv-u25", label: "Unit 25 — Traffic and driving" },
          ],
          focus: "Descriptive and practical travel collocations; IELTS Reading topic",
        },
        {
          num: "23", id: "u23",
          title: "Countryside and nature",
          sources: [
            { level: "Int", unitId: "ciu-int-u15", label: "Unit 15 — Countryside" },
          ],
          focus: "Nature and landscape collocations",
        },
        {
          num: "24", id: "u24",
          title: "Towns, cities, and urban life",
          sources: [
            { level: "Int", unitId: "ciu-int-u16", label: "Unit 16 — Towns and cities" },
            { level: "Adv", unitId: "ciu-adv-u32", label: "Unit 32 — Town and country life" },
          ],
          focus: "Adjective + noun patterns for urban environments",
        },
        {
          num: "25", id: "u25",
          title: "The environment and global problems",
          sources: [
            { level: "Int", unitId: "ciu-int-u39", label: "Unit 39 — Global problems" },
            { level: "Adv", unitId: "ciu-adv-u31", label: "Unit 31 — The environment" },
          ],
          focus: "High-priority IELTS Task 2 vocabulary; environmental and humanitarian collocations",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART VI — Work, Business, and Study
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part VI — Work, Business, and Study",
      icon: "💼",
      color: { accent: "#065f46", bg: "#f0fdf4", badge: "#d1fae5", text: "#022c22", border: "#6ee7b7" },
      units: [
        {
          num: "26", id: "u26",
          title: "Work and employment",
          sources: [
            { level: "Int", unitId: "ciu-int-u30", label: "Unit 30 — Work" },
            { level: "Adv", unitId: "ciu-adv-u12", label: "Unit 12 — Working life" },
            { level: "Adv", unitId: "ciu-adv-u13", label: "Unit 13 — New employment" },
            { level: "Adv", unitId: "ciu-adv-u44", label: "Unit 44 — References" },
          ],
          focus: "Career and job-related verb + noun patterns",
        },
        {
          num: "27", id: "u27",
          title: "Business and economics",
          sources: [
            { level: "Int", unitId: "ciu-int-u31", label: "Unit 31 — Business" },
            { level: "Adv", unitId: "ciu-adv-u15", label: "Unit 15 — Business reports" },
            { level: "Adv", unitId: "ciu-adv-u16", label: "Unit 16 — Customer services" },
            { level: "Adv", unitId: "ciu-adv-u34", label: "Unit 34 — The economy" },
          ],
          focus: "Professional and financial collocations; essential for IELTS Academic",
        },
        {
          num: "28", id: "u28",
          title: "Study, research, and student life",
          sources: [
            { level: "Int", unitId: "ciu-int-u29", label: "Unit 29 — Study and learning" },
            { level: "Adv", unitId: "ciu-adv-u17", label: "Unit 17 — Student life" },
          ],
          focus: "Academic life collocations for both students and educators",
        },
        {
          num: "29", id: "u29",
          title: "Academic writing: opinions and argument structure",
          sources: [
            { level: "Int", unitId: "ciu-int-u32", label: "Unit 32 — Academic writing 1: giving opinions" },
            { level: "Int", unitId: "ciu-int-u33", label: "Unit 33 — Academic writing 2: structuring an argument" },
            { level: "Adv", unitId: "ciu-adv-u18", label: "Unit 18 — Writing essays, assignments and reports" },
          ],
          focus: "The most important section for IELTS Writing Task 2 Band 7–9 vocabulary",
        },
        {
          num: "30", id: "u30",
          title: "Thoughts, ideas, and beliefs",
          sources: [
            { level: "Int", unitId: "ciu-int-u56", label: "Unit 56 — Talking about beliefs and opinions" },
            { level: "Adv", unitId: "ciu-adv-u14", label: "Unit 14 — Thoughts and ideas" },
          ],
          focus: "Cognitive and intellectual collocations; critical thinking language",
        },
        {
          num: "31", id: "u31",
          title: "Computers and technology",
          sources: [
            { level: "Int", unitId: "ciu-int-u28", label: "Unit 28 — Computers" },
            { level: "Adv", unitId: "ciu-adv-u36", label: "Unit 36 — Science and technology" },
          ],
          focus: "Digital and scientific collocations; growing IELTS topic area",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART VII — Society, Law, and Current Affairs
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part VII — Society, Law, and Current Affairs",
      icon: "🏛️",
      color: { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#7f1d1d", border: "#fda4af" },
      units: [
        {
          num: "32", id: "u32",
          title: "News and current affairs",
          sources: [
            { level: "Int", unitId: "ciu-int-u36", label: "Unit 36 — News" },
            { level: "Adv", unitId: "ciu-adv-u21", label: "Unit 21 — News" },
            { level: "Adv", unitId: "ciu-adv-u22", label: "Unit 22 — Current affairs" },
          ],
          focus: "Journalistic collocations; formal reporting language",
        },
        {
          num: "33", id: "u33",
          title: "Law, crime, and punishment",
          sources: [
            { level: "Int", unitId: "ciu-int-u34", label: "Unit 34 — Laws and punishments" },
            { level: "Int", unitId: "ciu-int-u35", label: "Unit 35 — Crime" },
            { level: "Adv", unitId: "ciu-adv-u30", label: "Unit 30 — Regulations and authority" },
            { level: "Adv", unitId: "ciu-adv-u38", label: "Unit 38 — Criminal justice" },
          ],
          focus: "Legal and civic collocations; frequent IELTS Reading and Writing topic",
        },
        {
          num: "34", id: "u34",
          title: "Money and personal finance",
          sources: [
            { level: "Int", unitId: "ciu-int-u37", label: "Unit 37 — Money" },
            { level: "Adv", unitId: "ciu-adv-u33", label: "Unit 33 — Personal finance" },
          ],
          focus: "Financial verb + noun patterns at personal and macro level",
        },
        {
          num: "35", id: "u35",
          title: "Social issues",
          sources: [
            { level: "Adv", unitId: "ciu-adv-u35", label: "Unit 35 — Social issues" },
          ],
          focus: "Sociological collocations; strong Task 2 essay vocabulary",
        },
        {
          num: "36", id: "u36",
          title: "War, conflict, and peace",
          sources: [
            { level: "Int", unitId: "ciu-int-u38", label: "Unit 38 — War and peace" },
            { level: "Adv", unitId: "ciu-adv-u39", label: "Unit 39 — War and peace" },
          ],
          focus: "Military and diplomatic collocations; formal and journalistic register",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART VIII — Basic Concepts and Senses
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part VIII — Basic Concepts and Senses",
      icon: "🔷",
      color: { accent: "#0f766e", bg: "#f0fdfa", badge: "#ccfbf1", text: "#042f2e", border: "#5eead4" },
      units: [
        {
          num: "37", id: "u37",
          title: "Time and space",
          sources: [
            { level: "Int", unitId: "ciu-int-u40", label: "Unit 40 — Time" },
            { level: "Adv", unitId: "ciu-adv-u46", label: "Unit 46 — Time and space" },
          ],
          focus: "Temporal and spatial collocations; universal building blocks",
        },
        {
          num: "38", id: "u38",
          title: "Sound",
          sources: [
            { level: "Int", unitId: "ciu-int-u41", label: "Unit 41 — Sound" },
            { level: "Adv", unitId: "ciu-adv-u47", label: "Unit 47 — Sound" },
          ],
          focus: "Noun + verb and adjective + noun patterns describing auditory experience",
        },
        {
          num: "39", id: "u39",
          title: "Distance, size, and quantity",
          sources: [
            { level: "Int", unitId: "ciu-int-u42", label: "Unit 42 — Distance and size" },
            { level: "Int", unitId: "ciu-int-u46", label: "Unit 46 — Number and frequency" },
            { level: "Adv", unitId: "ciu-adv-u50", label: "Unit 50 — Quantity and size" },
          ],
          focus: "Measurement and scale collocations; useful across all academic topics",
        },
        {
          num: "40", id: "u40",
          title: "Colour, light, and texture",
          sources: [
            { level: "Int", unitId: "ciu-int-u43", label: "Unit 43 — Colour and light" },
            { level: "Int", unitId: "ciu-int-u44", label: "Unit 44 — Texture" },
          ],
          focus: "Sensory and descriptive adjective + noun patterns",
        },
        {
          num: "41", id: "u41",
          title: "Taste and smell",
          sources: [
            { level: "Int", unitId: "ciu-int-u45", label: "Unit 45 — Taste and smell" },
          ],
          focus: "Sensory collocations; useful for descriptive and creative writing",
        },
        {
          num: "42", id: "u42",
          title: "Movement, speed, and walking",
          sources: [
            { level: "Int", unitId: "ciu-int-u47", label: "Unit 47 — Movement and speed" },
            { level: "Int", unitId: "ciu-int-u50", label: "Unit 50 — Ways of walking" },
          ],
          focus: "Motion collocations; adverb + adjective and verb + adverb patterns",
        },
        {
          num: "43", id: "u43",
          title: "Change",
          sources: [
            { level: "Int", unitId: "ciu-int-u48", label: "Unit 48 — Change" },
            { level: "Adv", unitId: "ciu-adv-u51", label: "Unit 51 — Change" },
          ],
          focus: "Verb + noun and adjective + noun patterns describing transformation",
        },
        {
          num: "44", id: "u44",
          title: "Ease and difficulty",
          sources: [
            { level: "Adv", unitId: "ciu-adv-u48", label: "Unit 48 — Making things easier" },
            { level: "Adv", unitId: "ciu-adv-u49", label: "Unit 49 — Difficulty" },
          ],
          focus: "Collocations for describing challenge and resolution; common in academic argument",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PART IX — Functions and Communication
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Part IX — Functions and Communication",
      icon: "⚙️",
      color: { accent: "#a16207", bg: "#fefce8", badge: "#fef9c3", text: "#713f12", border: "#fde047" },
      units: [
        {
          num: "45", id: "u45",
          title: "Starting and finishing",
          sources: [
            { level: "Int", unitId: "ciu-int-u51", label: "Unit 51 — Starting and finishing" },
            { level: "Adv", unitId: "ciu-adv-u52", label: "Unit 52 — Stopping and starting" },
          ],
          focus: "Process and sequence collocations",
        },
        {
          num: "46", id: "u46",
          title: "Success, failure, and effort",
          sources: [
            { level: "Int", unitId: "ciu-int-u52", label: "Unit 52 — Talking about success and failure" },
            { level: "Adv", unitId: "ciu-adv-u56", label: "Unit 56 — Making an effort" },
          ],
          focus: "Achievement and outcome collocations; strong IELTS Writing vocabulary",
        },
        {
          num: "47", id: "u47",
          title: "Cause and effect",
          sources: [
            { level: "Int", unitId: "ciu-int-u53", label: "Unit 53 — Talking about cause and effect" },
            { level: "Adv", unitId: "ciu-adv-u53", label: "Unit 53 — Cause and effect" },
          ],
          focus: "Essential academic writing collocations; linking ideas in Task 2",
        },
        {
          num: "48", id: "u48",
          title: "Memory, senses, and perception",
          sources: [
            { level: "Int", unitId: "ciu-int-u54", label: "Unit 54 — Remembering and sensing" },
          ],
          focus: "Cognitive collocations for describing mental experience",
        },
        {
          num: "49", id: "u49",
          title: "Agreeing, disagreeing, and discussing",
          sources: [
            { level: "Int", unitId: "ciu-int-u55", label: "Unit 55 — Agreeing and disagreeing" },
            { level: "Adv", unitId: "ciu-adv-u58", label: "Unit 58 — Discussing issues" },
          ],
          focus: "Debate and discussion collocations; critical for IELTS Speaking Part 3 and Writing",
        },
        {
          num: "50", id: "u50",
          title: "Beliefs, opinions, and claims",
          sources: [
            { level: "Int", unitId: "ciu-int-u56", label: "Unit 56 — Talking about beliefs and opinions" },
            { level: "Int", unitId: "ciu-int-u58", label: "Unit 58 — Claiming and denying" },
          ],
          focus: "Stance and position collocations; academic register",
        },
        {
          num: "51", id: "u51",
          title: "Deciding and choosing",
          sources: [
            { level: "Int", unitId: "ciu-int-u57", label: "Unit 57 — Deciding and choosing" },
            { level: "Adv", unitId: "ciu-adv-u28", label: "Unit 28 — Plans and decisions" },
          ],
          focus: "Decision-making collocations; useful for analytical writing",
        },
        {
          num: "52", id: "u52",
          title: "Liking, disliking, and preferences",
          sources: [
            { level: "Int", unitId: "ciu-int-u59", label: "Unit 59 — Liking and disliking" },
          ],
          focus: "Evaluative collocations for expressing personal stance",
        },
        {
          num: "53", id: "u53",
          title: "Comparing and contrasting",
          sources: [
            { level: "Adv", unitId: "ciu-adv-u55", label: "Unit 55 — Comparing and contrasting" },
          ],
          focus: "Comparative collocations; essential for IELTS Task 1 and Task 2",
        },
        {
          num: "54", id: "u54",
          title: "Describing groups and amounts",
          sources: [
            { level: "Adv", unitId: "ciu-adv-u54", label: "Unit 54 — Describing groups and amounts" },
          ],
          focus: "Collective noun collocations and idiomatic quantity expressions",
        },
        {
          num: "55", id: "u55",
          title: "Social English and everyday expressions",
          sources: [
            { level: "Adv", unitId: "ciu-adv-u57", label: "Unit 57 — Social English" },
          ],
          focus: "Informal fixed collocations for natural conversation",
        },
      ],
    },

  ],
};

const totalUnits = bookData.sections.reduce((acc, s) => acc + s.units.length, 0);

// ── Expandable Unit Card ───────────────────────────────────────────────────────
function UnitCard({ unit, sc }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f3f4f6" }}>
      {/* Header row */}
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "13px 20px", backgroundColor: open ? sc.bg : "#ffffff",
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background-color 0.15s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Number badge */}
          <div style={{
            minWidth: "38px", height: "38px", borderRadius: "8px",
            backgroundColor: open ? sc.badge : "#f3f4f6",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 800,
            color: open ? sc.text : "#6b7280",
            flexShrink: 0, letterSpacing: "-0.3px", padding: "0 4px",
          }}>
            {unit.num}
          </div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", margin: 0, lineHeight: 1.4 }}>
            {unit.title}
          </p>
        </div>
        {/* Source count pill + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "12px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: sc.badge, color: sc.text, padding: "2px 8px", borderRadius: "999px", whiteSpace: "nowrap" }}>
            {unit.sources.length} {unit.sources.length === 1 ? "source" : "sources"}
          </span>
          <span style={{ fontSize: "16px", color: "#9ca3af", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
        </div>
      </button>

      {/* Expanded details */}
      {open && (
        <div style={{ padding: "0 20px 16px 72px", backgroundColor: sc.bg }}>
          {/* Focus */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", flexShrink: 0 }}>🎯</span>
            <p style={{ fontSize: "12px", color: sc.text, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
              {unit.focus}
            </p>
          </div>

          {/* Source links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {unit.sources.map((src, i) => {
              const lc   = levelColors[src.level] || levelColors.Int;
              const path = `/english/${bookPath[src.level]}/${src.unitId}`;
              const href = `${BASE}${path}`;
              return (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "8px 12px", backgroundColor: "#ffffff",
                    border: `1px solid ${sc.border}`, borderRadius: "8px",
                    textDecoration: "none", transition: "border-color 0.15s",
                  }}
                >
                  {/* Level badge */}
                  <span style={{
                    fontSize: "10px", fontWeight: 800,
                    backgroundColor: lc.bg, color: lc.text,
                    padding: "2px 8px", borderRadius: "999px",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    {levelLabel[src.level]}
                  </span>
                  {/* Label */}
                  <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500, flex: 1, lineHeight: 1.4, fontFamily: "monospace" }}>
                    {src.label}
                  </span>
                  {/* Arrow */}
                  <span style={{ fontSize: "14px", color: "#9ca3af", flexShrink: 0 }}>↗</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function UnifiedCollocationsPage() {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(
    Object.fromEntries(bookData.sections.map((_, i) => [i, i === 0]))
  );

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

  const toggleSec   = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));
  const expandAll   = () => setExpanded(Object.fromEntries(bookData.sections.map((_, i) => [i, true])));
  const collapseAll = () => setExpanded(Object.fromEntries(bookData.sections.map((_, i) => [i, false])));

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
            <Link href="/english/collocations" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Collocations</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>Unified Book</span>
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

        {/* BOOK HEADER */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "32px" }}>
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "2px solid #bbf7d0", flexShrink: 0 }}>
            <img src={bookData.cover} alt={bookData.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📚</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#036c48", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", marginBottom: "10px" }}>
              ✓ Master Guide Map
            </div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>{bookData.title}</h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontWeight: 500 }}>
              Integrates Intermediate · Advanced
            </p>

            {/* Level legend */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              {[
                { key: "Int", label: "Intermediate" },
                { key: "Adv", label: "Advanced" },
              ].map(({ key, label }) => {
                const lc = levelColors[key];
                return (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: lc.bg, padding: "4px 10px", borderRadius: "999px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: lc.dot }} />
                    <span style={{ fontSize: "11px", fontWeight: 700, color: lc.text }}>{label}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "24px" }}>
              {[
                { val: bookData.sections.length, label: "Parts" },
                { val: totalUnits,               label: "Thematic Units" },
                { val: "120",                    label: "Source Units" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EXPAND / COLLAPSE ALL */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
          <button onClick={expandAll}   style={{ fontSize: "12px", fontWeight: 600, color: "#059669", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "5px 14px", borderRadius: "6px", cursor: "pointer" }}>Expand all</button>
          <button onClick={collapseAll} style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", padding: "5px 14px", borderRadius: "6px", cursor: "pointer" }}>Collapse all</button>
        </div>

        {/* SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {bookData.sections.map((section, si) => {
            const sc     = section.color;
            const isOpen = expanded[si];
            return (
              <div key={si} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.border : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>
                {/* Section header */}
                <button
                  onClick={() => toggleSec(si)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{section.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: sc.text, margin: 0 }}>{section.title}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>
                        {section.units.length} thematic units — click a unit to see sources & focus
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {/* Unit cards */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.border}` }}>
                    {section.units.map((unit) => (
                      <UnitCard key={unit.id} unit={unit} sc={sc} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
