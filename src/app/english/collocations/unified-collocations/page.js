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
// MASTER GUIDEMAP DATA
// sources: array of { book: "int"|"adv", unitId, unitNum, unitTitle }
// focus:   array of strings (bullet points)
// ─────────────────────────────────────────────────────────────────────────────
const guidemap = [
  {
    part: "Part I — Foundation: Understanding Collocations",
    partColor: { accent: "#0369a1", bg: "#f0f9ff", border: "#7dd3fc", badge: "#bae6fd", text: "#0c4a6e" },
    units: [
      {
        id: "gm-01",
        num: "01",
        title: "What are collocations and how do they work?",
        focus: [
          "Definition, types (strong/weak/fixed), grammatical categories",
          "Dictionary skills and self-study strategies",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u01", unitNum: "01", unitTitle: "What is a collocation?" },
          { book: "int", unitId: "ciu-int-u02", unitNum: "02", unitTitle: "Finding, recording and learning collocations" },
          { book: "int", unitId: "ciu-int-u03", unitNum: "03", unitTitle: "Using your dictionary" },
          { book: "int", unitId: "ciu-int-u04", unitNum: "04", unitTitle: "Types of collocation" },
          { book: "adv", unitId: "ciu-adv-u01", unitNum: "01", unitTitle: "Introducing collocations" },
          { book: "adv", unitId: "ciu-adv-u02", unitNum: "02", unitTitle: "Strong, fixed and weak collocations" },
          { book: "adv", unitId: "ciu-adv-u03", unitNum: "03", unitTitle: "Grammatical categories of collocation" },
          { book: "adv", unitId: "ciu-adv-u04", unitNum: "04", unitTitle: "Using your dictionary and other resources" },
          { book: "adv", unitId: "ciu-adv-u05", unitNum: "05", unitTitle: "Finding and working on collocations in texts" },
        ],
      },
      {
        id: "gm-02",
        num: "02",
        title: "Register: formal, informal, and academic collocations",
        focus: [
          "Recognising appropriate collocations across spoken, written, formal, and informal contexts",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u05", unitNum: "05", unitTitle: "Register" },
          { book: "adv", unitId: "ciu-adv-u06", unitNum: "06", unitTitle: "Register" },
        ],
      },
    ],
  },
  {
    part: "Part II — Grammatical Patterns",
    partColor: { accent: "#7c3aed", bg: "#faf5ff", border: "#c4b5fd", badge: "#ede9fe", text: "#4c1d95" },
    units: [
      {
        id: "gm-03",
        num: "03",
        title: "Intensifying and softening adverbs",
        focus: [
          "Adverb + adjective and adverb + verb patterns",
          "Degree and emphasis in spoken and written English",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u06", unitNum: "06", unitTitle: "Intensifying adverbs" },
          { book: "adv", unitId: "ciu-adv-u08", unitNum: "08", unitTitle: "Intensifying and softening adverbs" },
        ],
      },
      {
        id: "gm-04",
        num: "04",
        title: "High-frequency everyday verbs: make, do, have, take, go",
        focus: [
          "The most common collocation-forming verbs",
          "Choosing the right verb for the right noun",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u07", unitNum: "07", unitTitle: "Everyday verbs 1" },
          { book: "int", unitId: "ciu-int-u08", unitNum: "08", unitTitle: "Everyday verbs 2" },
          { book: "int", unitId: "ciu-int-u09", unitNum: "09", unitTitle: "Everyday verbs 3" },
          { book: "adv", unitId: "ciu-adv-u09", unitNum: "09", unitTitle: "Make and verbs that mean make" },
        ],
      },
      {
        id: "gm-05",
        num: "05",
        title: "Phrasal verbs as collocations",
        focus: [
          "How phrasal verbs combine with objects to form fixed or semi-fixed collocations",
        ],
        sources: [
          { book: "adv", unitId: "ciu-adv-u11", unitNum: "11", unitTitle: "Collocations with phrasal verbs" },
        ],
      },
      {
        id: "gm-06",
        num: "06",
        title: "Metaphorical collocations",
        focus: [
          "Collocations derived from physical or sensory metaphors",
          "Common in academic and journalistic writing",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u12", unitNum: "12", unitTitle: "Metaphor" },
          { book: "adv", unitId: "ciu-adv-u07", unitNum: "07", unitTitle: "Metaphor" },
        ],
      },
      {
        id: "gm-07",
        num: "07",
        title: "Synonyms and confusable words",
        focus: [
          "Why similar words take different collocates",
          "Common learner errors to avoid",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u10", unitNum: "10", unitTitle: "Synonyms and confusable words 1" },
          { book: "int", unitId: "ciu-int-u11", unitNum: "11", unitTitle: "Synonyms and confusable words 2" },
        ],
      },
    ],
  },
  {
    part: "Part III — People and Relationships",
    partColor: { accent: "#be185d", bg: "#fdf2f8", border: "#f9a8d4", badge: "#fce7f3", text: "#831843" },
    units: [
      {
        id: "gm-08",
        num: "08",
        title: "Character, behaviour, and personality",
        focus: [
          "Adjective + noun and verb + noun patterns describing inner qualities",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u17", unitNum: "17", unitTitle: "People: character and behaviour" },
          { book: "adv", unitId: "ciu-adv-u45", unitNum: "45", unitTitle: "Appearance and personality" },
        ],
      },
      {
        id: "gm-09",
        num: "09",
        title: "Physical appearance",
        focus: [
          "Describing looks; collocations common in speaking and descriptive writing",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u18", unitNum: "18", unitTitle: "People: physical appearance" },
          { book: "adv", unitId: "ciu-adv-u24", unitNum: "24", unitTitle: "Advertisements and fashion" },
        ],
      },
      {
        id: "gm-10",
        num: "10",
        title: "Family, relationships, and social life",
        focus: [
          "Noun + noun and verb + noun patterns in social and family contexts",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u19", unitNum: "19", unitTitle: "Families" },
          { book: "int", unitId: "ciu-int-u20", unitNum: "20", unitTitle: "Relationships" },
          { book: "adv", unitId: "ciu-adv-u40", unitNum: "40", unitTitle: "Friendship" },
          { book: "adv", unitId: "ciu-adv-u19", unitNum: "19", unitTitle: "Social life" },
          { book: "adv", unitId: "ciu-adv-u23", unitNum: "23", unitTitle: "Festivals and celebrations" },
        ],
      },
      {
        id: "gm-11",
        num: "11",
        title: "Feelings and emotions",
        focus: [
          "Adjective + noun, verb + noun patterns for expressing emotional states",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u21", unitNum: "21", unitTitle: "Feelings and emotions" },
          { book: "adv", unitId: "ciu-adv-u59", unitNum: "59", unitTitle: "Negative situations and feelings" },
          { book: "adv", unitId: "ciu-adv-u60", unitNum: "60", unitTitle: "Positive situations and feelings" },
        ],
      },
      {
        id: "gm-12",
        num: "12",
        title: "Youth, age, and life stages",
        focus: [
          "Collocations across the lifespan; natural expressions for age-related topics",
        ],
        sources: [
          { book: "adv", unitId: "ciu-adv-u41", unitNum: "41", unitTitle: "Youth and age" },
        ],
      },
      {
        id: "gm-13",
        num: "13",
        title: "Criticising and praising people",
        focus: [
          "Evaluative collocations; useful for IELTS Writing Task 2 argument building",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u60", unitNum: "60", unitTitle: "Praising and criticising" },
          { book: "adv", unitId: "ciu-adv-u43", unitNum: "43", unitTitle: "Criticising people" },
          { book: "adv", unitId: "ciu-adv-u42", unitNum: "42", unitTitle: "Celebrities and heroes" },
        ],
      },
    ],
  },
  {
    part: "Part IV — Leisure and Lifestyle",
    partColor: { accent: "#1d4ed8", bg: "#eff6ff", border: "#93c5fd", badge: "#dbeafe", text: "#1e3a8a" },
    units: [
      {
        id: "gm-14",
        num: "14",
        title: "Housing and living spaces",
        focus: [
          "Verb + noun and adjective + noun patterns for describing places people live",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u22", unitNum: "22", unitTitle: "Houses, flats and rooms" },
          { book: "adv", unitId: "ciu-adv-u32", unitNum: "32", unitTitle: "Town and country life" },
        ],
      },
      {
        id: "gm-15",
        num: "15",
        title: "Food, eating, and drinking",
        focus: [
          "Collocations around food preparation, meals, and hunger/appetite",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u23", unitNum: "23", unitTitle: "Eating and drinking" },
        ],
      },
      {
        id: "gm-16",
        num: "16",
        title: "Films, books, and the arts",
        focus: [
          "Critical and descriptive collocations for arts and media",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u24", unitNum: "24", unitTitle: "Films and books" },
          { book: "adv", unitId: "ciu-adv-u29", unitNum: "29", unitTitle: "Film and book reviews" },
        ],
      },
      {
        id: "gm-17",
        num: "17",
        title: "Music and performance",
        focus: [
          "Collocations for describing musical events and activities",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u25", unitNum: "25", unitTitle: "Music" },
        ],
      },
      {
        id: "gm-18",
        num: "18",
        title: "Sport and physical activity",
        focus: [
          "Verb + sport noun patterns; competition and performance collocations",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u26", unitNum: "26", unitTitle: "Sport" },
          { book: "adv", unitId: "ciu-adv-u27", unitNum: "27", unitTitle: "Sport" },
        ],
      },
      {
        id: "gm-19",
        num: "19",
        title: "Health and illness",
        focus: [
          "Medical and wellness collocations; common in IELTS Reading passages",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u27", unitNum: "27", unitTitle: "Health and illness" },
          { book: "adv", unitId: "ciu-adv-u37", unitNum: "37", unitTitle: "Health and medicine" },
        ],
      },
      {
        id: "gm-20",
        num: "20",
        title: "Talking and conversation",
        focus: [
          "Verb + noun patterns for communication acts; useful for speaking and writing",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u49", unitNum: "49", unitTitle: "Ways of speaking" },
          { book: "adv", unitId: "ciu-adv-u20", unitNum: "20", unitTitle: "Talking" },
          { book: "adv", unitId: "ciu-adv-u10", unitNum: "10", unitTitle: "Communicating" },
        ],
      },
    ],
  },
  {
    part: "Part V — Travel, Places, and the Environment",
    partColor: { accent: "#0f766e", bg: "#f0fdfa", border: "#5eead4", badge: "#ccfbf1", text: "#134e4a" },
    units: [
      {
        id: "gm-21",
        num: "21",
        title: "Weather",
        focus: [
          "Adjective + noun and verb + noun patterns for weather description",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u13", unitNum: "13", unitTitle: "Weather" },
        ],
      },
      {
        id: "gm-22",
        num: "22",
        title: "Travel and transport",
        focus: [
          "Descriptive and practical travel collocations; IELTS Reading topic",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u14", unitNum: "14", unitTitle: "Travel" },
          { book: "adv", unitId: "ciu-adv-u26", unitNum: "26", unitTitle: "Travel and adventure" },
          { book: "adv", unitId: "ciu-adv-u25", unitNum: "25", unitTitle: "Traffic and driving" },
        ],
      },
      {
        id: "gm-23",
        num: "23",
        title: "Countryside and nature",
        focus: [
          "Nature and landscape collocations",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u15", unitNum: "15", unitTitle: "Countryside" },
        ],
      },
      {
        id: "gm-24",
        num: "24",
        title: "Towns, cities, and urban life",
        focus: [
          "Adjective + noun patterns for urban environments",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u16", unitNum: "16", unitTitle: "Towns and cities" },
          { book: "adv", unitId: "ciu-adv-u32", unitNum: "32", unitTitle: "Town and country life" },
        ],
      },
      {
        id: "gm-25",
        num: "25",
        title: "The environment and global problems",
        focus: [
          "High-priority IELTS Task 2 vocabulary",
          "Environmental and humanitarian collocations",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u39", unitNum: "39", unitTitle: "Global problems" },
          { book: "adv", unitId: "ciu-adv-u31", unitNum: "31", unitTitle: "The environment" },
        ],
      },
    ],
  },
  {
    part: "Part VI — Work, Business, and Study",
    partColor: { accent: "#065f46", bg: "#f0fdf4", border: "#6ee7b7", badge: "#d1fae5", text: "#022c22" },
    units: [
      {
        id: "gm-26",
        num: "26",
        title: "Work and employment",
        focus: [
          "Career and job-related verb + noun patterns",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u30", unitNum: "30", unitTitle: "Work" },
          { book: "adv", unitId: "ciu-adv-u12", unitNum: "12", unitTitle: "Working life" },
          { book: "adv", unitId: "ciu-adv-u13", unitNum: "13", unitTitle: "New employment" },
          { book: "adv", unitId: "ciu-adv-u44", unitNum: "44", unitTitle: "References" },
        ],
      },
      {
        id: "gm-27",
        num: "27",
        title: "Business and economics",
        focus: [
          "Professional and financial collocations; essential for IELTS Academic",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u31", unitNum: "31", unitTitle: "Business" },
          { book: "adv", unitId: "ciu-adv-u15", unitNum: "15", unitTitle: "Business reports" },
          { book: "adv", unitId: "ciu-adv-u16", unitNum: "16", unitTitle: "Customer services" },
          { book: "adv", unitId: "ciu-adv-u34", unitNum: "34", unitTitle: "The economy" },
        ],
      },
      {
        id: "gm-28",
        num: "28",
        title: "Study, research, and student life",
        focus: [
          "Academic life collocations for both students and educators",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u29", unitNum: "29", unitTitle: "Study and learning" },
          { book: "adv", unitId: "ciu-adv-u17", unitNum: "17", unitTitle: "Student life" },
        ],
      },
      {
        id: "gm-29",
        num: "29",
        title: "Academic writing: opinions and argument structure",
        focus: [
          "The most important section for IELTS Writing Task 2 Band 7–9 vocabulary",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u32", unitNum: "32", unitTitle: "Academic writing 1: giving opinions" },
          { book: "int", unitId: "ciu-int-u33", unitNum: "33", unitTitle: "Academic writing 2: structuring an argument" },
          { book: "adv", unitId: "ciu-adv-u18", unitNum: "18", unitTitle: "Writing essays, assignments and reports" },
        ],
      },
      {
        id: "gm-30",
        num: "30",
        title: "Thoughts, ideas, and beliefs",
        focus: [
          "Cognitive and intellectual collocations; critical thinking language",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u56", unitNum: "56", unitTitle: "Talking about beliefs and opinions" },
          { book: "adv", unitId: "ciu-adv-u14", unitNum: "14", unitTitle: "Thoughts and ideas" },
        ],
      },
      {
        id: "gm-31",
        num: "31",
        title: "Computers and technology",
        focus: [
          "Digital and scientific collocations; growing IELTS topic area",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u28", unitNum: "28", unitTitle: "Computers" },
          { book: "adv", unitId: "ciu-adv-u36", unitNum: "36", unitTitle: "Science and technology" },
        ],
      },
    ],
  },
  {
    part: "Part VII — Society, Law, and Current Affairs",
    partColor: { accent: "#b45309", bg: "#fffbeb", border: "#fcd34d", badge: "#fde68a", text: "#78350f" },
    units: [
      {
        id: "gm-32",
        num: "32",
        title: "News and current affairs",
        focus: [
          "Journalistic collocations; formal reporting language",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u36", unitNum: "36", unitTitle: "News" },
          { book: "adv", unitId: "ciu-adv-u21", unitNum: "21", unitTitle: "News" },
          { book: "adv", unitId: "ciu-adv-u22", unitNum: "22", unitTitle: "Current affairs" },
        ],
      },
      {
        id: "gm-33",
        num: "33",
        title: "Law, crime, and punishment",
        focus: [
          "Legal and civic collocations; frequent IELTS Reading and Writing topic",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u34", unitNum: "34", unitTitle: "Laws and punishments" },
          { book: "int", unitId: "ciu-int-u35", unitNum: "35", unitTitle: "Crime" },
          { book: "adv", unitId: "ciu-adv-u30", unitNum: "30", unitTitle: "Regulations and authority" },
          { book: "adv", unitId: "ciu-adv-u38", unitNum: "38", unitTitle: "Criminal justice" },
        ],
      },
      {
        id: "gm-34",
        num: "34",
        title: "Money and personal finance",
        focus: [
          "Financial verb + noun patterns at personal and macro level",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u37", unitNum: "37", unitTitle: "Money" },
          { book: "adv", unitId: "ciu-adv-u33", unitNum: "33", unitTitle: "Personal finance" },
        ],
      },
      {
        id: "gm-35",
        num: "35",
        title: "Social issues",
        focus: [
          "Sociological collocations; strong Task 2 essay vocabulary",
        ],
        sources: [
          { book: "adv", unitId: "ciu-adv-u35", unitNum: "35", unitTitle: "Social issues" },
        ],
      },
      {
        id: "gm-36",
        num: "36",
        title: "War, conflict, and peace",
        focus: [
          "Military and diplomatic collocations; formal and journalistic register",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u38", unitNum: "38", unitTitle: "War and peace" },
          { book: "adv", unitId: "ciu-adv-u39", unitNum: "39", unitTitle: "War and peace" },
        ],
      },
    ],
  },
  {
    part: "Part VIII — Basic Concepts and Senses",
    partColor: { accent: "#0284c7", bg: "#f0f9ff", border: "#7dd3fc", badge: "#e0f2fe", text: "#075985" },
    units: [
      {
        id: "gm-37",
        num: "37",
        title: "Time and space",
        focus: [
          "Temporal and spatial collocations; universal building blocks",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u40", unitNum: "40", unitTitle: "Time" },
          { book: "adv", unitId: "ciu-adv-u46", unitNum: "46", unitTitle: "Time and space" },
        ],
      },
      {
        id: "gm-38",
        num: "38",
        title: "Sound",
        focus: [
          "Noun + verb and adjective + noun patterns describing auditory experience",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u41", unitNum: "41", unitTitle: "Sound" },
          { book: "adv", unitId: "ciu-adv-u47", unitNum: "47", unitTitle: "Sound" },
        ],
      },
      {
        id: "gm-39",
        num: "39",
        title: "Distance, size, and quantity",
        focus: [
          "Measurement and scale collocations; useful across all academic topics",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u42", unitNum: "42", unitTitle: "Distance and size" },
          { book: "int", unitId: "ciu-int-u46", unitNum: "46", unitTitle: "Number and frequency" },
          { book: "adv", unitId: "ciu-adv-u50", unitNum: "50", unitTitle: "Quantity and size" },
        ],
      },
      {
        id: "gm-40",
        num: "40",
        title: "Colour, light, and texture",
        focus: [
          "Sensory and descriptive adjective + noun patterns",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u43", unitNum: "43", unitTitle: "Colour and light" },
          { book: "int", unitId: "ciu-int-u44", unitNum: "44", unitTitle: "Texture" },
        ],
      },
      {
        id: "gm-41",
        num: "41",
        title: "Taste and smell",
        focus: [
          "Sensory collocations; useful for descriptive and creative writing",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u45", unitNum: "45", unitTitle: "Taste and smell" },
        ],
      },
      {
        id: "gm-42",
        num: "42",
        title: "Movement, speed, and walking",
        focus: [
          "Motion collocations; adverb + adjective and verb + adverb patterns",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u47", unitNum: "47", unitTitle: "Movement and speed" },
          { book: "int", unitId: "ciu-int-u50", unitNum: "50", unitTitle: "Ways of walking" },
        ],
      },
      {
        id: "gm-43",
        num: "43",
        title: "Change",
        focus: [
          "Verb + noun and adjective + noun patterns describing transformation",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u48", unitNum: "48", unitTitle: "Change" },
          { book: "adv", unitId: "ciu-adv-u51", unitNum: "51", unitTitle: "Change" },
        ],
      },
      {
        id: "gm-44",
        num: "44",
        title: "Ease and difficulty",
        focus: [
          "Collocations for describing challenge and resolution",
          "Common in academic argument",
        ],
        sources: [
          { book: "adv", unitId: "ciu-adv-u48", unitNum: "48", unitTitle: "Making things easier" },
          { book: "adv", unitId: "ciu-adv-u49", unitNum: "49", unitTitle: "Difficulty" },
        ],
      },
    ],
  },
  {
    part: "Part IX — Functions and Communication",
    partColor: { accent: "#a16207", bg: "#fefce8", border: "#fde047", badge: "#fef9c3", text: "#713f12" },
    units: [
      {
        id: "gm-45",
        num: "45",
        title: "Starting and finishing",
        focus: [
          "Process and sequence collocations",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u51", unitNum: "51", unitTitle: "Starting and finishing" },
          { book: "adv", unitId: "ciu-adv-u52", unitNum: "52", unitTitle: "Stopping and starting" },
        ],
      },
      {
        id: "gm-46",
        num: "46",
        title: "Success, failure, and effort",
        focus: [
          "Achievement and outcome collocations; strong IELTS Writing vocabulary",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u52", unitNum: "52", unitTitle: "Talking about success and failure" },
          { book: "adv", unitId: "ciu-adv-u56", unitNum: "56", unitTitle: "Making an effort" },
        ],
      },
      {
        id: "gm-47",
        num: "47",
        title: "Cause and effect",
        focus: [
          "Essential academic writing collocations; linking ideas in Task 2",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u53", unitNum: "53", unitTitle: "Talking about cause and effect" },
          { book: "adv", unitId: "ciu-adv-u53", unitNum: "53", unitTitle: "Cause and effect" },
        ],
      },
      {
        id: "gm-48",
        num: "48",
        title: "Memory, senses, and perception",
        focus: [
          "Cognitive collocations for describing mental experience",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u54", unitNum: "54", unitTitle: "Remembering and sensing" },
        ],
      },
      {
        id: "gm-49",
        num: "49",
        title: "Agreeing, disagreeing, and discussing",
        focus: [
          "Debate and discussion collocations",
          "Critical for IELTS Speaking Part 3 and Writing",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u55", unitNum: "55", unitTitle: "Agreeing and disagreeing" },
          { book: "adv", unitId: "ciu-adv-u58", unitNum: "58", unitTitle: "Discussing issues" },
        ],
      },
      {
        id: "gm-50",
        num: "50",
        title: "Beliefs, opinions, and claims",
        focus: [
          "Stance and position collocations; academic register",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u56", unitNum: "56", unitTitle: "Talking about beliefs and opinions" },
          { book: "int", unitId: "ciu-int-u58", unitNum: "58", unitTitle: "Claiming and denying" },
        ],
      },
      {
        id: "gm-51",
        num: "51",
        title: "Deciding and choosing",
        focus: [
          "Decision-making collocations; useful for analytical writing",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u57", unitNum: "57", unitTitle: "Deciding and choosing" },
          { book: "adv", unitId: "ciu-adv-u28", unitNum: "28", unitTitle: "Plans and decisions" },
        ],
      },
      {
        id: "gm-52",
        num: "52",
        title: "Liking, disliking, and preferences",
        focus: [
          "Evaluative collocations for expressing personal stance",
        ],
        sources: [
          { book: "int", unitId: "ciu-int-u59", unitNum: "59", unitTitle: "Liking and disliking" },
        ],
      },
      {
        id: "gm-53",
        num: "53",
        title: "Comparing and contrasting",
        focus: [
          "Comparative collocations; essential for IELTS Task 1 and Task 2",
        ],
        sources: [
          { book: "adv", unitId: "ciu-adv-u55", unitNum: "55", unitTitle: "Comparing and contrasting" },
        ],
      },
      {
        id: "gm-54",
        num: "54",
        title: "Describing groups and amounts",
        focus: [
          "Collective noun collocations and idiomatic quantity expressions",
        ],
        sources: [
          { book: "adv", unitId: "ciu-adv-u54", unitNum: "54", unitTitle: "Describing groups and amounts" },
        ],
      },
      {
        id: "gm-55",
        num: "55",
        title: "Social English and everyday expressions",
        focus: [
          "Informal fixed collocations for natural conversation",
        ],
        sources: [
          { book: "adv", unitId: "ciu-adv-u57", unitNum: "57", unitTitle: "Social English" },
        ],
      },
    ],
  },
];

// Helpers
const bookLabel = (book) => book === "int" ? "Intermediate" : "Advanced";
const bookPath  = (book, unitId) =>
  book === "int"
    ? `/english/collocations/ciu-intermediate/${unitId}`
    : `/english/collocations/ciu-advanced/${unitId}`;
const bookColors = {
  int: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", dot: "#3b82f6" },
  adv: { bg: "#fce7f3", text: "#9d174d", border: "#f9a8d4", dot: "#ec4899" },
};

// Total counts
const totalUnits = guidemap.reduce((acc, p) => acc + p.units.length, 0);
const totalParts = guidemap.length;

// ─────────────────────────────────────────────────────────────────────────────
// SourcesPanel — inline dropdown shown/hidden per unit
// ─────────────────────────────────────────────────────────────────────────────
function SourcesPanel({ sources, pc }) {
  const intSources = sources.filter((s) => s.book === "int");
  const advSources = sources.filter((s) => s.book === "adv");

  return (
    <div style={{
      marginTop: "10px",
      padding: "12px 14px",
      backgroundColor: "#ffffff",
      border: `1px solid ${pc.border}`,
      borderRadius: "8px",
      display: "flex", flexDirection: "column", gap: "10px",
    }}>
      {intSources.length > 0 && (
        <div>
          <p style={{ fontSize: "10px", fontWeight: 800, color: bookColors.int.text, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" }}>
            📘 Intermediate
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {intSources.map((s) => (
              <Link
                key={s.unitId}
                href={bookPath(s.book, s.unitId)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "6px 10px", borderRadius: "6px",
                  backgroundColor: bookColors.int.bg,
                  border: `1px solid ${bookColors.int.border}`,
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <span style={{ fontSize: "10px", fontWeight: 800, color: bookColors.int.text, minWidth: "22px" }}>
                  {s.unitNum}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: bookColors.int.text, flex: 1 }}>
                  {s.unitTitle}
                </span>
                <span style={{ fontSize: "11px", color: bookColors.int.dot }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {advSources.length > 0 && (
        <div>
          <p style={{ fontSize: "10px", fontWeight: 800, color: bookColors.adv.text, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" }}>
            📗 Advanced
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {advSources.map((s) => (
              <Link
                key={s.unitId}
                href={bookPath(s.book, s.unitId)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "6px 10px", borderRadius: "6px",
                  backgroundColor: bookColors.adv.bg,
                  border: `1px solid ${bookColors.adv.border}`,
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <span style={{ fontSize: "10px", fontWeight: 800, color: bookColors.adv.text, minWidth: "22px" }}>
                  {s.unitNum}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: bookColors.adv.text, flex: 1 }}>
                  {s.unitTitle}
                </span>
                <span style={{ fontSize: "11px", color: bookColors.adv.dot }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UnitCard
// ─────────────────────────────────────────────────────────────────────────────
function UnitCard({ unit, pc, globalIndex }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const intCount = unit.sources.filter((s) => s.book === "int").length;
  const advCount = unit.sources.filter((s) => s.book === "adv").length;

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      overflow: "hidden",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Unit header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px" }}>

        {/* Number badge */}
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          backgroundColor: pc.badge, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "11px", fontWeight: 800,
          color: pc.text, flexShrink: 0, letterSpacing: "-0.3px",
        }}>
          {unit.num}
        </div>

        {/* Title + focus */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Clickable title → unit page */}
          <Link
            href={`/english/collocations/unified/${unit.id}`}
            style={{ textDecoration: "none" }}
          >
            <p style={{
              fontSize: "13px", fontWeight: 700, color: "#111827",
              margin: "0 0 6px", lineHeight: 1.35,
              transition: "color 0.15s",
            }}
              onMouseEnter={(e) => e.target.style.color = pc.accent}
              onMouseLeave={(e) => e.target.style.color = "#111827"}
            >
              {unit.title}
            </p>
          </Link>

          {/* Focus bullets */}
          <ul style={{ margin: 0, padding: "0 0 0 14px", listStyle: "disc" }}>
            {unit.focus.map((f, fi) => (
              <li key={fi} style={{ fontSize: "11.5px", color: "#6b7280", lineHeight: 1.5, marginBottom: "2px" }}>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Sources toggle button */}
        <button
          onClick={() => setSourcesOpen((p) => !p)}
          title={sourcesOpen ? "Hide sources" : "Show sources"}
          style={{
            flexShrink: 0,
            display: "flex", alignItems: "center", gap: "5px",
            padding: "5px 10px", borderRadius: "999px",
            border: `1px solid ${sourcesOpen ? pc.accent : "#e5e7eb"}`,
            backgroundColor: sourcesOpen ? pc.bg : "#f9fafb",
            cursor: "pointer", transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: "12px" }}>📚</span>
          <span style={{ fontSize: "10px", fontWeight: 700, color: pc.accent }}>
            {unit.sources.length}
          </span>
          <span style={{ fontSize: "10px", color: "#9ca3af", transform: sourcesOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}>▾</span>
        </button>
      </div>

      {/* Source book pills row (always visible) */}
      <div style={{ paddingLeft: "64px", paddingRight: "16px", paddingBottom: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {intCount > 0 && (
          <span style={{ fontSize: "10px", fontWeight: 600, backgroundColor: bookColors.int.bg, color: bookColors.int.text, border: `1px solid ${bookColors.int.border}`, padding: "2px 8px", borderRadius: "999px" }}>
            📘 Int ×{intCount}
          </span>
        )}
        {advCount > 0 && (
          <span style={{ fontSize: "10px", fontWeight: 600, backgroundColor: bookColors.adv.bg, color: bookColors.adv.text, border: `1px solid ${bookColors.adv.border}`, padding: "2px 8px", borderRadius: "999px" }}>
            📗 Adv ×{advCount}
          </span>
        )}
      </div>

      {/* Collapsible sources panel */}
      {sourcesOpen && (
        <div style={{ padding: "0 16px 14px" }}>
          <SourcesPanel sources={unit.sources} pc={pc} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────
export default function UnifiedCollocationsPage() {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(
    Object.fromEntries(guidemap.map((_, i) => [i, true]))
  );
  const [search, setSearch] = useState("");

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

  const togglePart = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  const filtered = search.trim().length > 1
    ? guidemap.map((part) => ({
        ...part,
        units: part.units.filter((u) =>
          u.title.toLowerCase().includes(search.toLowerCase()) ||
          u.focus.some((f) => f.toLowerCase().includes(search.toLowerCase()))
        ),
      })).filter((p) => p.units.length > 0)
    : guidemap;

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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>Unified Guide</span>
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

        {/* PAGE HEADER */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#dbeafe", color: "#1e40af", padding: "3px 10px", borderRadius: "999px" }}>📘 Intermediate</span>
            <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#fce7f3", color: "#9d174d", padding: "3px 10px", borderRadius: "999px" }}>📗 Advanced</span>
            <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "999px" }}>UNIFIED</span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "8px" }}>
            English Collocations in Use
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>
            Master GuideMap — combining both Intermediate and Advanced books into one unified curriculum
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
            {[
              { val: totalParts,  label: "Parts" },
              { val: totalUnits,  label: "Unified topics" },
              { val: "60+60",     label: "Source units" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#9ca3af" }}>🔍</span>
            <input
              type="text"
              placeholder="Search topics, e.g. 'IELTS', 'metaphor', 'business'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "10px 14px 10px 36px",
                fontSize: "13px", color: "#111827",
                border: "1px solid #d1d5db", borderRadius: "8px",
                backgroundColor: "#ffffff", outline: "none",
                fontFamily: "'Manrope', sans-serif",
              }}
            />
          </div>
        </div>

        {/* PARTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filtered.map((part, pi) => {
            const pc     = part.partColor;
            const isOpen = expanded[pi] !== false;

            return (
              <div key={pi} style={{ border: `1px solid ${isOpen ? pc.border : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", backgroundColor: "#ffffff", transition: "border-color 0.2s" }}>

                {/* Part header */}
                <button
                  onClick={() => togglePart(pi)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: isOpen ? pc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: pc.badge, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: pc.text }}>{`P${pi + 1}`}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: pc.text, margin: 0 }}>{part.part}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{part.units.length} topics</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {/* Units grid */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${pc.border}`, padding: "16px", display: "flex", flexDirection: "column", gap: "10px", backgroundColor: pc.bg + "44" }}>
                    {part.units.map((unit, ui) => (
                      <UnitCard key={unit.id} unit={unit} pc={pc} globalIndex={ui} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ marginTop: "40px", padding: "16px 20px", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "10px" }}>How to use this guide</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              ["Click the unit title", "Opens the unified lesson page for that topic"],
              ["Click 📚 button", "Shows/hides source units from each book"],
              ["Click a source unit", "Goes directly to that unit in the Intermediate or Advanced book"],
              ["📘 Int ×N / 📗 Adv ×N", "Shows how many units from each book cover this topic"],
            ].map(([label, desc]) => (
              <div key={label} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#064e3b", minWidth: "170px", flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: "11px", color: "#6b7280" }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
