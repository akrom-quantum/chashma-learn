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
  "VIU-E":  { label: "VIU Elementary",         color: "#16a34a", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d", emoji: "📗", baseUrl: "/english/vocabulary/viu-elementary",         prefix: "viu-el" },
  "VIU-PI": { label: "VIU Pre-Intermediate",   color: "#2563eb", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a", emoji: "📘", baseUrl: "/english/vocabulary/viu-pre-intermediate",   prefix: "viu-pi" },
  "VIU-UI": { label: "VIU Upper-Intermediate", color: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", emoji: "📙", baseUrl: "/english/vocabulary/viu-upper-intermediate", prefix: "viu-ui" },
  "VIU-A":  { label: "VIU Advanced",           color: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#881337", emoji: "📕", baseUrl: "/english/vocabulary/viu-advanced",           prefix: "unit"   },
};

function sourceUrl(bookKey, unitRef) {
  const num  = unitRef.replace("U", "").padStart(2, "0");
  const book = BOOKS[bookKey];
  if (bookKey === "VIU-A") return `${book.baseUrl}/unit-${num}`;
  return `${book.baseUrl}/${book.prefix}-u${num}`;
}

// ─── Curriculum data ──────────────────────────────────────────────────────────
const curriculumData = [
  {
    id: "s01", title: "People", icon: "👤",
    color: { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },
    units: [
      { id: "u01", num: "01", title: "The Human Body", path: "/english/vocabulary/viu-combined/unit-01",
        sources: [
          { book: "VIU-E",  unit: "U3",  name: "Parts of the body" },
          { book: "VIU-PI", unit: "U9",  name: "The body and movement" },
          { book: "VIU-UI", unit: "U47", name: "What your body does" },
          { book: "VIU-A",  unit: "U9",  name: "Describing people: appearance and mannerisms" },
        ] },
      { id: "u02", num: "02", title: "Appearance and Mannerisms", path: "/english/vocabulary/viu-combined/unit-02",
        sources: [
          { book: "VIU-E",  unit: "U5",  name: "Describing people" },
          { book: "VIU-PI", unit: "U10", name: "Describing appearance" },
          { book: "VIU-UI", unit: "U7",  name: "Describing people: appearance" },
          { book: "VIU-A",  unit: "U9",  name: "Describing people: appearance and mannerisms" },
        ] },
      { id: "u03", num: "03", title: "Personality and Character", path: "/english/vocabulary/viu-combined/unit-03",
        sources: [
          { book: "VIU-E",  unit: "U5",  name: "Describing people" },
          { book: "VIU-PI", unit: "U11", name: "Describing character" },
          { book: "VIU-UI", unit: "U8",  name: "Describing people: personality" },
          { book: "VIU-UI", unit: "U9",  name: "Idioms describing people" },
          { book: "VIU-A",  unit: "U8",  name: "Describing people: positive and negative qualities" },
          { book: "VIU-A",  unit: "U10", name: "Describing people: personality and character traits" },
        ] },
      { id: "u04", num: "04", title: "Feelings and Emotions", path: "/english/vocabulary/viu-combined/unit-04",
        sources: [
          { book: "VIU-E",  unit: "U7",  name: "Feelings" },
          { book: "VIU-PI", unit: "U12", name: "Feelings" },
          { book: "VIU-PI", unit: "U68", name: "Likes, dislikes, attitudes and preferences" },
          { book: "VIU-UI", unit: "U43", name: "Pleasant and unpleasant feelings" },
          { book: "VIU-UI", unit: "U49", name: "Emotions and moods" },
          { book: "VIU-A",  unit: "U13", name: "Emotions and reactions" },
          { book: "VIU-A",  unit: "U14", name: "Negative feelings" },
        ] },
      { id: "u05", num: "05", title: "Relationships and Social Life", path: "/english/vocabulary/viu-combined/unit-05",
        sources: [
          { book: "VIU-E",  unit: "U1",  name: "The family" },
          { book: "VIU-E",  unit: "U8",  name: "Conversations 1" },
          { book: "VIU-PI", unit: "U13", name: "Family and friends" },
          { book: "VIU-PI", unit: "U15", name: "Romance, marriage and divorce" },
          { book: "VIU-UI", unit: "U10", name: "Relationships" },
          { book: "VIU-A",  unit: "U11", name: "Relationships: friends forever" },
          { book: "VIU-A",  unit: "U12", name: "Relationships: ups and downs" },
          { book: "VIU-A",  unit: "U19", name: "Socialising and networking" },
        ] },
    ],
  },
  {
    id: "s02", title: "Life Stages and the Family", icon: "👨‍👩‍👧‍👦",
    color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
    units: [
      { id: "u06", num: "06", title: "Family Structure", path: "/english/vocabulary/viu-combined/unit-06",
        sources: [
          { book: "VIU-E",  unit: "U1",  name: "The family" },
          { book: "VIU-PI", unit: "U13", name: "Family and friends" },
          { book: "VIU-PI", unit: "U14", name: "Growing up" },
          { book: "VIU-A",  unit: "U15", name: "Birth and death: from cradle to grave" },
          { book: "VIU-A",  unit: "U40", name: "The haves and the have-nots" },
        ] },
      { id: "u07", num: "07", title: "Growing Up and Education", path: "/english/vocabulary/viu-combined/unit-07",
        sources: [
          { book: "VIU-E",  unit: "U2",  name: "Birth, marriage and death" },
          { book: "VIU-E",  unit: "U15", name: "At school and university" },
          { book: "VIU-PI", unit: "U14", name: "Growing up" },
          { book: "VIU-PI", unit: "U32", name: "School education" },
          { book: "VIU-UI", unit: "U14", name: "Education" },
          { book: "VIU-A",  unit: "U2",  name: "Education: debates and issues" },
        ] },
      { id: "u08", num: "08", title: "Romance, Marriage and Partnership", path: "/english/vocabulary/viu-combined/unit-08",
        sources: [
          { book: "VIU-E",  unit: "U2",  name: "Birth, marriage and death" },
          { book: "VIU-PI", unit: "U15", name: "Romance, marriage and divorce" },
          { book: "VIU-A",  unit: "U12", name: "Relationships: ups and downs" },
          { book: "VIU-A",  unit: "U15", name: "Birth and death: from cradle to grave" },
        ] },
      { id: "u09", num: "09", title: "Birth, Death and Life's Milestones", path: "/english/vocabulary/viu-combined/unit-09",
        sources: [
          { book: "VIU-E",  unit: "U2",  name: "Birth, marriage and death" },
          { book: "VIU-PI", unit: "U14", name: "Growing up" },
          { book: "VIU-PI", unit: "U45", name: "Special events" },
          { book: "VIU-A",  unit: "U15", name: "Birth and death: from cradle to grave" },
          { book: "VIU-A",  unit: "U37", name: "Festivals in their cultural context" },
        ] },
    ],
  },
  {
    id: "s03", title: "Health and the Body", icon: "🏥",
    color: { accent: "#dc2626", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },
    units: [
      { id: "u10", num: "10", title: "Health and Common Illness", path: "/english/vocabulary/viu-combined/unit-10",
        sources: [
          { book: "VIU-E",  unit: "U6",  name: "Health and illness" },
          { book: "VIU-PI", unit: "U20", name: "Health" },
          { book: "VIU-UI", unit: "U28", name: "Health and medicine" },
          { book: "VIU-A",  unit: "U51", name: "Healthcare" },
          { book: "VIU-A",  unit: "U52", name: "Illness: feeling under the weather" },
          { book: "VIU-A",  unit: "U53", name: "Medical language" },
        ] },
      { id: "u11", num: "11", title: "Medicine, Technology and Treatment", path: "/english/vocabulary/viu-combined/unit-11",
        sources: [
          { book: "VIU-E",  unit: "U6",  name: "Health and illness" },
          { book: "VIU-PI", unit: "U20", name: "Health" },
          { book: "VIU-UI", unit: "U29", name: "Medicine and technology" },
          { book: "VIU-A",  unit: "U53", name: "Medical language" },
          { book: "VIU-A",  unit: "U56", name: "Technology and its impact" },
        ] },
      { id: "u12", num: "12", title: "Diet, Fitness and Lifestyle", path: "/english/vocabulary/viu-combined/unit-12",
        sources: [
          { book: "VIU-E",  unit: "U6",  name: "Health and illness" },
          { book: "VIU-E",  unit: "U10", name: "Food and drink" },
          { book: "VIU-PI", unit: "U20", name: "Health" },
          { book: "VIU-PI", unit: "U41", name: "Sport and leisure" },
          { book: "VIU-UI", unit: "U30", name: "Health and lifestyle" },
          { book: "VIU-A",  unit: "U54", name: "Diet, sport and fitness" },
        ] },
    ],
  },
  {
    id: "s04", title: "Home and Daily Life", icon: "🏠",
    color: { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
    units: [
      { id: "u13", num: "13", title: "The Home: Rooms and Objects", path: "/english/vocabulary/viu-combined/unit-13",
        sources: [
          { book: "VIU-E",  unit: "U11", name: "In the kitchen" },
          { book: "VIU-E",  unit: "U12", name: "In the bedroom and bathroom" },
          { book: "VIU-E",  unit: "U13", name: "In the living room" },
          { book: "VIU-PI", unit: "U17", name: "The place where you live" },
          { book: "VIU-PI", unit: "U18", name: "Around the home" },
          { book: "VIU-UI", unit: "U11", name: "At home" },
          { book: "VIU-A",  unit: "U18", name: "Home styles, lifestyles" },
        ] },
      { id: "u14", num: "14", title: "Daily Routines and Chores", path: "/english/vocabulary/viu-combined/unit-14",
        sources: [
          { book: "VIU-E",  unit: "U47", name: "Everyday things" },
          { book: "VIU-PI", unit: "U16", name: "Daily routines" },
          { book: "VIU-UI", unit: "U12", name: "Everyday minor problems" },
          { book: "VIU-A",  unit: "U5",  name: "At work: colleagues and routines" },
          { book: "VIU-A",  unit: "U16", name: "Free time: relaxation and leisure" },
        ] },
      { id: "u15", num: "15", title: "Food, Cooking and Eating Out", path: "/english/vocabulary/viu-combined/unit-15",
        sources: [
          { book: "VIU-E",  unit: "U10", name: "Food and drink" },
          { book: "VIU-E",  unit: "U22", name: "Eating out" },
          { book: "VIU-PI", unit: "U24", name: "Food" },
          { book: "VIU-PI", unit: "U25", name: "Cooking" },
          { book: "VIU-PI", unit: "U48", name: "Hotels and restaurants" },
          { book: "VIU-UI", unit: "U22", name: "Food" },
          { book: "VIU-A",  unit: "U23", name: "Food: a recipe for disaster" },
          { book: "VIU-A",  unit: "U24", name: "Dinner's on me: entertaining and eating out" },
        ] },
      { id: "u16", num: "16", title: "Clothes and Fashion", path: "/english/vocabulary/viu-combined/unit-16",
        sources: [
          { book: "VIU-E",  unit: "U4",  name: "Clothes" },
          { book: "VIU-PI", unit: "U21", name: "Clothes" },
          { book: "VIU-PI", unit: "U22", name: "Fashion and buying clothes" },
          { book: "VIU-UI", unit: "U27", name: "Clothes" },
          { book: "VIU-A",  unit: "U17", name: "All the rage: clothes and fashion" },
        ] },
    ],
  },
  {
    id: "s05", title: "Work and Business", icon: "💼",
    color: { accent: "#0f766e", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },
    units: [
      { id: "u17", num: "17", title: "Jobs and the Workplace", path: "/english/vocabulary/viu-combined/unit-17",
        sources: [
          { book: "VIU-E",  unit: "U14", name: "Jobs" },
          { book: "VIU-PI", unit: "U35", name: "Jobs" },
          { book: "VIU-PI", unit: "U36", name: "Talking about your work" },
          { book: "VIU-PI", unit: "U38", name: "Working in an office" },
          { book: "VIU-UI", unit: "U16", name: "Work" },
          { book: "VIU-A",  unit: "U3",  name: "Applying for a job" },
          { book: "VIU-A",  unit: "U4",  name: "Job interviews" },
          { book: "VIU-A",  unit: "U5",  name: "At work: colleagues and routines" },
          { book: "VIU-A",  unit: "U6",  name: "At work: job satisfaction" },
        ] },
      { id: "u18", num: "18", title: "Careers and Professional Development", path: "/english/vocabulary/viu-combined/unit-18",
        sources: [
          { book: "VIU-E",  unit: "U14", name: "Jobs" },
          { book: "VIU-PI", unit: "U37", name: "Making a career" },
          { book: "VIU-A",  unit: "U7",  name: "At work: careers" },
        ] },
      { id: "u19", num: "19", title: "Business, Finance and the Economy", path: "/english/vocabulary/viu-combined/unit-19",
        sources: [
          { book: "VIU-E",  unit: "U19", name: "Shops and shopping" },
          { book: "VIU-PI", unit: "U40", name: "Business and finance" },
          { book: "VIU-UI", unit: "U17", name: "Business" },
          { book: "VIU-UI", unit: "U40", name: "Money" },
          { book: "VIU-A",  unit: "U40", name: "The haves and the have-nots" },
          { book: "VIU-A",  unit: "U45", name: "Economy and finance" },
          { book: "VIU-A",  unit: "U46", name: "Personal finance: making ends meet" },
        ] },
      { id: "u20", num: "20", title: "Running a Company and Office Life", path: "/english/vocabulary/viu-combined/unit-20",
        sources: [
          { book: "VIU-E",  unit: "U14", name: "Jobs" },
          { book: "VIU-PI", unit: "U38", name: "Working in an office" },
          { book: "VIU-PI", unit: "U39", name: "Running a company" },
          { book: "VIU-UI", unit: "U17", name: "Business" },
          { book: "VIU-A",  unit: "U5",  name: "At work: colleagues and routines" },
          { book: "VIU-A",  unit: "U6",  name: "At work: job satisfaction" },
        ] },
    ],
  },
  {
    id: "s06", title: "Education", icon: "🎓",
    color: { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },
    units: [
      { id: "u21", num: "21", title: "School Education", path: "/english/vocabulary/viu-combined/unit-21",
        sources: [
          { book: "VIU-E",  unit: "U15", name: "At school and university" },
          { book: "VIU-PI", unit: "U32", name: "School education" },
          { book: "VIU-PI", unit: "U33", name: "Studying English and taking exams" },
          { book: "VIU-UI", unit: "U14", name: "Education" },
          { book: "VIU-A",  unit: "U1",  name: "Cramming for success" },
          { book: "VIU-A",  unit: "U2",  name: "Education: debates and issues" },
        ] },
      { id: "u22", num: "22", title: "University and Higher Education", path: "/english/vocabulary/viu-combined/unit-22",
        sources: [
          { book: "VIU-E",  unit: "U15", name: "At school and university" },
          { book: "VIU-PI", unit: "U34", name: "University education" },
          { book: "VIU-UI", unit: "U15", name: "Higher education" },
          { book: "VIU-A",  unit: "U1",  name: "Cramming for success" },
          { book: "VIU-A",  unit: "U2",  name: "Education: debates and issues" },
        ] },
      { id: "u23", num: "23", title: "Study Skills and Academic Language", path: "/english/vocabulary/viu-combined/unit-23",
        sources: [
          { book: "VIU-E",  unit: "U15", name: "At school and university" },
          { book: "VIU-PI", unit: "U1",  name: "Learning vocabulary" },
          { book: "VIU-PI", unit: "U33", name: "Studying English and taking exams" },
          { book: "VIU-A",  unit: "U79", name: "Academic writing: making sense" },
          { book: "VIU-A",  unit: "U80", name: "Academic writing: text structure" },
        ] },
    ],
  },
  {
    id: "s07", title: "Leisure and Entertainment", icon: "🎭",
    color: { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#881337" },
    units: [
      { id: "u24", num: "24", title: "Sport and Competitive Games", path: "/english/vocabulary/viu-combined/unit-24",
        sources: [
          { book: "VIU-E",  unit: "U23", name: "Sports" },
          { book: "VIU-PI", unit: "U41", name: "Sport and leisure" },
          { book: "VIU-PI", unit: "U42", name: "Competitive sport" },
          { book: "VIU-UI", unit: "U18", name: "Sport" },
          { book: "VIU-A",  unit: "U54", name: "Diet, sport and fitness" },
        ] },
      { id: "u25", num: "25", title: "Music and the Performing Arts", path: "/english/vocabulary/viu-combined/unit-25",
        sources: [
          { book: "VIU-E",  unit: "U26", name: "Music and musical instruments" },
          { book: "VIU-PI", unit: "U44", name: "Music" },
          { book: "VIU-UI", unit: "U19", name: "Art and literature" },
          { book: "VIU-UI", unit: "U20", name: "Theatre and cinema" },
          { book: "VIU-UI", unit: "U21", name: "Music" },
          { book: "VIU-A",  unit: "U20", name: "The performance arts: reviews and critiques" },
        ] },
      { id: "u26", num: "26", title: "Cinema, Theatre and Literature", path: "/english/vocabulary/viu-combined/unit-26",
        sources: [
          { book: "VIU-E",  unit: "U24", name: "Cinema" },
          { book: "VIU-PI", unit: "U43", name: "Books and films" },
          { book: "VIU-UI", unit: "U19", name: "Art and literature" },
          { book: "VIU-UI", unit: "U20", name: "Theatre and cinema" },
          { book: "VIU-A",  unit: "U20", name: "The performance arts: reviews and critiques" },
          { book: "VIU-A",  unit: "U22", name: "Talking about books" },
        ] },
      { id: "u27", num: "27", title: "Free Time: Hobbies and Social Life", path: "/english/vocabulary/viu-combined/unit-27",
        sources: [
          { book: "VIU-E",  unit: "U25", name: "Free time at home" },
          { book: "VIU-PI", unit: "U41", name: "Sport and leisure" },
          { book: "VIU-PI", unit: "U45", name: "Special events" },
          { book: "VIU-UI", unit: "U32", name: "Holidays" },
          { book: "VIU-A",  unit: "U16", name: "Free time: relaxation and leisure" },
          { book: "VIU-A",  unit: "U19", name: "Socialising and networking" },
        ] },
    ],
  },
  {
    id: "s08", title: "Travel and Tourism", icon: "✈️",
    color: { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },
    units: [
      { id: "u28", num: "28", title: "Transport and Getting Around", path: "/english/vocabulary/viu-combined/unit-28",
        sources: [
          { book: "VIU-E",  unit: "U32", name: "Travelling" },
          { book: "VIU-E",  unit: "U49", name: "Moving" },
          { book: "VIU-PI", unit: "U28", name: "Transport" },
          { book: "VIU-PI", unit: "U29", name: "On the road" },
          { book: "VIU-UI", unit: "U31", name: "Travel" },
          { book: "VIU-UI", unit: "U58", name: "Movement and speed" },
          { book: "VIU-A",  unit: "U25", name: "On the road: traffic and driving" },
        ] },
      { id: "u29", num: "29", title: "Holidays, Accommodation and Sightseeing", path: "/english/vocabulary/viu-combined/unit-29",
        sources: [
          { book: "VIU-E",  unit: "U18", name: "Holidays" },
          { book: "VIU-E",  unit: "U21", name: "In a hotel" },
          { book: "VIU-PI", unit: "U46", name: "Travel bookings" },
          { book: "VIU-PI", unit: "U50", name: "Sightseeing holidays" },
          { book: "VIU-PI", unit: "U51", name: "Holidays by the sea" },
          { book: "VIU-UI", unit: "U32", name: "Holidays" },
          { book: "VIU-A",  unit: "U26", name: "Travel and accommodation" },
          { book: "VIU-A",  unit: "U27", name: "Attracting tourists" },
        ] },
      { id: "u30", num: "30", title: "Air Travel and Bookings", path: "/english/vocabulary/viu-combined/unit-30",
        sources: [
          { book: "VIU-E",  unit: "U32", name: "Travelling" },
          { book: "VIU-PI", unit: "U47", name: "Air travel" },
          { book: "VIU-UI", unit: "U31", name: "Travel" },
          { book: "VIU-A",  unit: "U26", name: "Travel and accommodation" },
        ] },
    ],
  },
  {
    id: "s09", title: "The Natural World", icon: "🌿",
    color: { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },
    units: [
      { id: "u31", num: "31", title: "Physical Geography and Landscape", path: "/english/vocabulary/viu-combined/unit-31",
        sources: [
          { book: "VIU-E",  unit: "U30", name: "In the countryside" },
          { book: "VIU-PI", unit: "U6",  name: "The physical world" },
          { book: "VIU-PI", unit: "U27", name: "Life in the country" },
          { book: "VIU-UI", unit: "U23", name: "Physical geography" },
          { book: "VIU-A",  unit: "U28", name: "Describing the world" },
        ] },
      { id: "u32", num: "32", title: "Weather and Climate", path: "/english/vocabulary/viu-combined/unit-32",
        sources: [
          { book: "VIU-E",  unit: "U28", name: "Weather" },
          { book: "VIU-PI", unit: "U7",  name: "Weather" },
          { book: "VIU-UI", unit: "U6",  name: "The weather" },
          { book: "VIU-A",  unit: "U29", name: "Weather and climate" },
        ] },
      { id: "u33", num: "33", title: "Animals and the Natural World", path: "/english/vocabulary/viu-combined/unit-33",
        sources: [
          { book: "VIU-E",  unit: "U31", name: "Animals" },
          { book: "VIU-PI", unit: "U8",  name: "Animals and insects" },
          { book: "VIU-UI", unit: "U26", name: "The natural world" },
          { book: "VIU-A",  unit: "U32", name: "The animal kingdom" },
          { book: "VIU-A",  unit: "U33", name: "Our endangered world" },
        ] },
      { id: "u34", num: "34", title: "Environmental Problems", path: "/english/vocabulary/viu-combined/unit-34",
        sources: [
          { book: "VIU-E",  unit: "U37", name: "Global problems" },
          { book: "VIU-PI", unit: "U58", name: "Climate change" },
          { book: "VIU-UI", unit: "U24", name: "Environmental problems" },
          { book: "VIU-A",  unit: "U33", name: "Our endangered world" },
          { book: "VIU-A",  unit: "U58", name: "Energy: from fossil fuels to windmills" },
        ] },
    ],
  },
  {
    id: "s10", title: "Towns, Cities and Countries", icon: "🏙️",
    color: { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b" },
    units: [
      { id: "u35", num: "35", title: "Life in the City", path: "/english/vocabulary/viu-combined/unit-35",
        sources: [
          { book: "VIU-E",  unit: "U29", name: "In the town" },
          { book: "VIU-PI", unit: "U26", name: "City life" },
          { book: "VIU-UI", unit: "U25", name: "Towns" },
          { book: "VIU-A",  unit: "U39", name: "History: since the dawn of civilisation" },
        ] },
      { id: "u36", num: "36", title: "Life in the Country", path: "/english/vocabulary/viu-combined/unit-36",
        sources: [
          { book: "VIU-E",  unit: "U30", name: "In the countryside" },
          { book: "VIU-PI", unit: "U27", name: "Life in the country" },
          { book: "VIU-A",  unit: "U31", name: "Taking root and reaping rewards" },
          { book: "VIU-A",  unit: "U40", name: "The haves and the have-nots" },
        ] },
      { id: "u37", num: "37", title: "Countries, Nationalities and Languages", path: "/english/vocabulary/viu-combined/unit-37",
        sources: [
          { book: "VIU-E",  unit: "U27", name: "Countries and nationalities" },
          { book: "VIU-PI", unit: "U5",  name: "Country, nationality and language" },
          { book: "VIU-UI", unit: "U5",  name: "Countries, nationalities and languages" },
          { book: "VIU-A",  unit: "U38", name: "Talking about language" },
          { book: "VIU-A",  unit: "U89", name: "English: a global language" },
        ] },
    ],
  },
  {
    id: "s11", title: "Society and Social Issues", icon: "🏛️",
    color: { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },
    units: [
      { id: "u38", num: "38", title: "Crime and the Law", path: "/english/vocabulary/viu-combined/unit-38",
        sources: [
          { book: "VIU-E",  unit: "U34", name: "Crime" },
          { book: "VIU-PI", unit: "U56", name: "Crime" },
          { book: "VIU-UI", unit: "U39", name: "Crime" },
          { book: "VIU-A",  unit: "U35", name: "Authorities: customs and police" },
          { book: "VIU-A",  unit: "U43", name: "The letter of the law" },
        ] },
      { id: "u39", num: "39", title: "Politics and Public Institutions", path: "/english/vocabulary/viu-combined/unit-39",
        sources: [
          { book: "VIU-E",  unit: "U29", name: "In the town" },
          { book: "VIU-E",  unit: "U37", name: "Global problems" },
          { book: "VIU-PI", unit: "U57", name: "Politics" },
          { book: "VIU-UI", unit: "U38", name: "Politics and public institutions" },
          { book: "VIU-A",  unit: "U41", name: "British politics" },
          { book: "VIU-A",  unit: "U42", name: "International politics" },
        ] },
      { id: "u40", num: "40", title: "The Media: Press, TV and Internet", path: "/english/vocabulary/viu-combined/unit-40",
        sources: [
          { book: "VIU-E",  unit: "U35", name: "The media" },
          { book: "VIU-PI", unit: "U52", name: "Newspapers and television" },
          { book: "VIU-UI", unit: "U37", name: "The press and the media" },
          { book: "VIU-A",  unit: "U47", name: "The media: in print" },
          { book: "VIU-A",  unit: "U48", name: "The media: internet and email" },
          { book: "VIU-A",  unit: "U50", name: "The news: gathering and delivering" },
        ] },
      { id: "u41", num: "41", title: "Global Problems and Conflict", path: "/english/vocabulary/viu-combined/unit-41",
        sources: [
          { book: "VIU-E",  unit: "U37", name: "Global problems" },
          { book: "VIU-PI", unit: "U59", name: "War and violence" },
          { book: "VIU-UI", unit: "U13", name: "Global problems" },
          { book: "VIU-A",  unit: "U42", name: "International politics" },
          { book: "VIU-A",  unit: "U44", name: "War and peace" },
        ] },
      { id: "u42", num: "42", title: "Money and Personal Finance", path: "/english/vocabulary/viu-combined/unit-42",
        sources: [
          { book: "VIU-E",  unit: "U19", name: "Shops and shopping" },
          { book: "VIU-E",  unit: "U20", name: "Online shopping" },
          { book: "VIU-PI", unit: "U19", name: "Money" },
          { book: "VIU-UI", unit: "U40", name: "Money" },
          { book: "VIU-A",  unit: "U40", name: "The haves and the have-nots" },
          { book: "VIU-A",  unit: "U46", name: "Personal finance: making ends meet" },
        ] },
    ],
  },
  {
    id: "s12", title: "Communication and Technology", icon: "📱",
    color: { accent: "#1d4ed8", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },
    units: [
      { id: "u43", num: "43", title: "Phones, Messaging and Email", path: "/english/vocabulary/viu-combined/unit-43",
        sources: [
          { book: "VIU-E",  unit: "U17", name: "Your phone" },
          { book: "VIU-PI", unit: "U53", name: "Phoning and texting" },
          { book: "VIU-PI", unit: "U55", name: "Email and the internet" },
          { book: "VIU-UI", unit: "U35", name: "Communications and the internet" },
          { book: "VIU-A",  unit: "U48", name: "The media: internet and email" },
        ] },
      { id: "u44", num: "44", title: "Computers and the Internet", path: "/english/vocabulary/viu-combined/unit-44",
        sources: [
          { book: "VIU-E",  unit: "U16", name: "Communications" },
          { book: "VIU-PI", unit: "U54", name: "Computers" },
          { book: "VIU-PI", unit: "U55", name: "Email and the internet" },
          { book: "VIU-UI", unit: "U33", name: "Science and technology" },
          { book: "VIU-UI", unit: "U34", name: "Computers" },
          { book: "VIU-A",  unit: "U56", name: "Technology and its impact" },
          { book: "VIU-A",  unit: "U57", name: "Technology of the future" },
        ] },
      { id: "u45", num: "45", title: "Social Media and Online Life", path: "/english/vocabulary/viu-combined/unit-45",
        sources: [
          { book: "VIU-E",  unit: "U16", name: "Communications" },
          { book: "VIU-E",  unit: "U17", name: "Your phone" },
          { book: "VIU-PI", unit: "U55", name: "Email and the internet" },
          { book: "VIU-UI", unit: "U36", name: "Social media" },
          { book: "VIU-A",  unit: "U48", name: "The media: internet and email" },
          { book: "VIU-A",  unit: "U49", name: "Advertising" },
        ] },
    ],
  },
  {
    id: "s13", title: "Language and Word Building", icon: "🔤",
    color: { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },
    units: [
      { id: "u46", num: "46", title: "Prefixes: Changing Meaning", path: "/english/vocabulary/viu-combined/unit-46",
        sources: [
          { book: "VIU-E",  unit: "U58", name: "Prefixes" },
          { book: "VIU-PI", unit: "U70", name: "Prefixes: changing meaning" },
          { book: "VIU-UI", unit: "U71", name: "Prefixes" },
          { book: "VIU-A",  unit: "U86", name: "Prefixes: creating new meanings" },
        ] },
      { id: "u47", num: "47", title: "Suffixes: Forming Nouns and Adjectives", path: "/english/vocabulary/viu-combined/unit-47",
        sources: [
          { book: "VIU-E",  unit: "U59", name: "Suffixes" },
          { book: "VIU-PI", unit: "U71", name: "Suffixes: forming nouns" },
          { book: "VIU-PI", unit: "U72", name: "Suffixes: forming adjectives" },
          { book: "VIU-UI", unit: "U70", name: "Suffixes" },
          { book: "VIU-A",  unit: "U87", name: "Suffixes: forming new words" },
        ] },
      { id: "u48", num: "48", title: "Compound Nouns and Compound Adjectives", path: "/english/vocabulary/viu-combined/unit-48",
        sources: [
          { book: "VIU-E",  unit: "U59", name: "Suffixes" },
          { book: "VIU-PI", unit: "U73", name: "Compound nouns" },
          { book: "VIU-UI", unit: "U74", name: "Compound adjectives" },
          { book: "VIU-UI", unit: "U75", name: "Compound nouns 1: noun + noun" },
          { book: "VIU-UI", unit: "U76", name: "Compound nouns 2: verb + preposition" },
        ] },
      { id: "u49", num: "49", title: "Phrasal Verbs", path: "/english/vocabulary/viu-combined/unit-49",
        sources: [
          { book: "VIU-E",  unit: "U46", name: "Phrasal verbs" },
          { book: "VIU-PI", unit: "U79", name: "Phrasal verbs 1: form and meaning" },
          { book: "VIU-PI", unit: "U80", name: "Phrasal verbs 2: grammar and style" },
          { book: "VIU-UI", unit: "U79", name: "Multi-word expressions" },
          { book: "VIU-A",  unit: "U95", name: "Brushing up on phrasal verbs" },
        ] },
      { id: "u50", num: "50", title: "Collocations and Fixed Phrases", path: "/english/vocabulary/viu-combined/unit-50",
        sources: [
          { book: "VIU-E",  unit: "U57", name: "Words and prepositions" },
          { book: "VIU-E",  unit: "U60", name: "Words you may confuse" },
          { book: "VIU-PI", unit: "U74", name: "Word partners" },
          { book: "VIU-PI", unit: "U75", name: "Fixed phrases" },
          { book: "VIU-PI", unit: "U76", name: "Fixed phrases in conversation" },
          { book: "VIU-UI", unit: "U77", name: "Binomials" },
          { book: "VIU-A",  unit: "U92", name: "Collocation: which words go together" },
          { book: "VIU-A",  unit: "U94", name: "Idioms for everyday situations and feelings" },
          { book: "VIU-A",  unit: "U96", name: "Connotation: making associations" },
        ] },
    ],
  },
  {
    id: "s14", title: "Core Verbs in Depth", icon: "⚡",
    color: { accent: "#9333ea", bg: "#fdf4ff", badge: "#e9d5ff", text: "#581c87" },
    units: [
      { id: "u51", num: "51", title: "Have, Make and Do", path: "/english/vocabulary/viu-combined/unit-51",
        sources: [
          { book: "VIU-E",  unit: "U38", name: "Have" },
          { book: "VIU-E",  unit: "U40", name: "Do" },
          { book: "VIU-E",  unit: "U41", name: "Make" },
          { book: "VIU-PI", unit: "U81", name: "Make, do and take: uses and phrases" },
          { book: "VIU-UI", unit: "U89", name: "Expressions with do and make" },
          { book: "VIU-A",  unit: "U92", name: "Collocation: which words go together" },
        ] },
      { id: "u52", num: "52", title: "Get, Go and Come", path: "/english/vocabulary/viu-combined/unit-52",
        sources: [
          { book: "VIU-E",  unit: "U39", name: "Go" },
          { book: "VIU-E",  unit: "U42", name: "Come" },
          { book: "VIU-E",  unit: "U45", name: "Get" },
          { book: "VIU-PI", unit: "U83", name: "Get: uses, phrases and phrasal verbs" },
          { book: "VIU-PI", unit: "U84", name: "Go: meanings and expressions" },
          { book: "VIU-UI", unit: "U91", name: "Expressions with get" },
          { book: "VIU-UI", unit: "U93", name: "Expressions with come and go" },
          { book: "VIU-A",  unit: "U94", name: "Idioms for everyday situations and feelings" },
        ] },
      { id: "u53", num: "53", title: "Take, Bring and Give", path: "/english/vocabulary/viu-combined/unit-53",
        sources: [
          { book: "VIU-E",  unit: "U43", name: "Take" },
          { book: "VIU-E",  unit: "U44", name: "Bring" },
          { book: "VIU-PI", unit: "U81", name: "Make, do and take: uses and phrases" },
          { book: "VIU-PI", unit: "U82", name: "Key verbs: give, keep and miss" },
          { book: "VIU-UI", unit: "U90", name: "Expressions with bring and take" },
          { book: "VIU-A",  unit: "U95", name: "Brushing up on phrasal verbs" },
        ] },
      { id: "u54", num: "54", title: "Set, Put and Other Key Verbs", path: "/english/vocabulary/viu-combined/unit-54",
        sources: [
          { book: "VIU-E",  unit: "U48", name: "Talking" },
          { book: "VIU-E",  unit: "U49", name: "Moving" },
          { book: "VIU-PI", unit: "U82", name: "Key verbs: give, keep and miss" },
          { book: "VIU-UI", unit: "U92", name: "Expressions with set and put" },
          { book: "VIU-UI", unit: "U94", name: "Expressions with other common verbs" },
          { book: "VIU-A",  unit: "U92", name: "Collocation: which words go together" },
        ] },
    ],
  },
  {
    id: "s15", title: "Grammar and Function Words", icon: "📐",
    color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
    units: [
      { id: "u55", num: "55", title: "Conjunctions and Connecting Words", path: "/english/vocabulary/viu-combined/unit-55",
        sources: [
          { book: "VIU-E",  unit: "U50", name: "Conjunctions and connecting words" },
          { book: "VIU-PI", unit: "U92", name: "Time and sequence" },
          { book: "VIU-PI", unit: "U93", name: "Addition and contrast" },
          { book: "VIU-PI", unit: "U94", name: "Reason, purpose, result, condition" },
          { book: "VIU-UI", unit: "U61", name: "Time: connecting words and expressions" },
          { book: "VIU-UI", unit: "U64", name: "Concession and contrast" },
          { book: "VIU-UI", unit: "U65", name: "Addition" },
          { book: "VIU-UI", unit: "U68", name: "Linking words in writing" },
          { book: "VIU-A",  unit: "U67", name: "Cause and effect" },
        ] },
      { id: "u56", num: "56", title: "Time, Sequence and Manner", path: "/english/vocabulary/viu-combined/unit-56",
        sources: [
          { book: "VIU-E",  unit: "U51", name: "Days, months, seasons" },
          { book: "VIU-E",  unit: "U52", name: "Time words" },
          { book: "VIU-E",  unit: "U54", name: "Manner" },
          { book: "VIU-PI", unit: "U91", name: "Adverbs" },
          { book: "VIU-PI", unit: "U92", name: "Time and sequence" },
          { book: "VIU-UI", unit: "U53", name: "Time" },
          { book: "VIU-UI", unit: "U58", name: "Movement and speed" },
          { book: "VIU-A",  unit: "U60", name: "Time: once in a blue moon" },
          { book: "VIU-A",  unit: "U66", name: "Speed: fast and slow" },
        ] },
      { id: "u57", num: "57", title: "Cause, Contrast and Condition", path: "/english/vocabulary/viu-combined/unit-57",
        sources: [
          { book: "VIU-E",  unit: "U50", name: "Conjunctions and connecting words" },
          { book: "VIU-PI", unit: "U93", name: "Addition and contrast" },
          { book: "VIU-PI", unit: "U94", name: "Reason, purpose, result, condition" },
          { book: "VIU-UI", unit: "U62", name: "Condition" },
          { book: "VIU-UI", unit: "U63", name: "Cause, reason, purpose and result" },
          { book: "VIU-UI", unit: "U64", name: "Concession and contrast" },
          { book: "VIU-A",  unit: "U67", name: "Cause and effect" },
        ] },
      { id: "u58", num: "58", title: "Uncountable, Plural-only and Collective Nouns", path: "/english/vocabulary/viu-combined/unit-58",
        sources: [
          { book: "VIU-E",  unit: "U55", name: "Common uncountable nouns" },
          { book: "VIU-PI", unit: "U86", name: "Uncountable nouns" },
          { book: "VIU-UI", unit: "U83", name: "Uncountable nouns" },
          { book: "VIU-UI", unit: "U84", name: "Words that only occur in the plural" },
          { book: "VIU-UI", unit: "U85", name: "Countable and uncountable nouns with different meanings" },
          { book: "VIU-UI", unit: "U86", name: "Making uncountable nouns countable" },
          { book: "VIU-UI", unit: "U87", name: "Collective nouns" },
        ] },
      { id: "u59", num: "59", title: "Adjectives, Adverbs and Prepositions", path: "/english/vocabulary/viu-combined/unit-59",
        sources: [
          { book: "VIU-E",  unit: "U56", name: "Common adjectives: good and bad things" },
          { book: "VIU-E",  unit: "U57", name: "Words and prepositions" },
          { book: "VIU-PI", unit: "U77", name: "Verb or adjective + preposition" },
          { book: "VIU-PI", unit: "U78", name: "Prepositional phrases" },
          { book: "VIU-PI", unit: "U89", name: "Adjectives" },
          { book: "VIU-PI", unit: "U91", name: "Adverbs" },
          { book: "VIU-UI", unit: "U55", name: "Obligation, need, possibility and probability" },
          { book: "VIU-UI", unit: "U70", name: "Suffixes" },
          { book: "VIU-A",  unit: "U70", name: "Modality: expressing facts, opinions, desires" },
        ] },
    ],
  },
];

// ─── Summary stats ─────────────────────────────────────────────────────────────
const totalSections = curriculumData.length;
const totalUnits    = curriculumData.reduce((a, s) => a + s.units.length, 0);
const totalSources  = curriculumData.reduce(
  (a, s) => a + s.units.reduce((b, u) => b + u.sources.length, 0), 0
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function VIUCombinedPage() {
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

  const isLearner   = role === "learner" || role === "admin" || role === "owner";
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
            <Link href="/english/vocabulary" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Vocabulary</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>VIU Combined</span>
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
            background: "linear-gradient(145deg, #064e3b 0%, #059669 60%, #34d399 100%)",
            borderRadius: "10px", border: "1px solid #d1fae5", flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px",
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ fontSize: "24px" }}>📗</span>
              <span style={{ fontSize: "24px" }}>📘</span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ fontSize: "24px" }}>📙</span>
              <span style={{ fontSize: "24px" }}>📕</span>
            </div>
            <p style={{ fontSize: "8px", fontWeight: 800, color: "rgba(255,255,255,0.85)", textAlign: "center", marginTop: "6px", letterSpacing: "0.8px", lineHeight: 1.5 }}>
              COMBINED<br />CURRICULUM
            </p>
          </div>

          {/* Info */}
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              4-LEVEL PROGRAMME
            </span>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              Vocabulary in Use — Combined
            </h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontWeight: 500 }}>
              McCarthy & O'Dell · Redman — Elementary through Advanced
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
                { val: totalSections, label: "Sections" },
                { val: totalUnits,    label: "Units" },
                { val: totalSources,  label: "Source refs" },
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
              { icon: "📗", color: "#16a34a", label: "Source card → jump to that book's unit" },
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

        {/* ── SECTIONS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {curriculumData.map((section, si) => {
            const sc     = section.color;
            const isOpen = expandedSections[si] !== false;

            return (
              <div key={section.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.badge : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>

                {/* Section header */}
                <button
                  onClick={() => toggleSection(si)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "18px" }}>{section.icon}</span>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: sc.text, margin: 0 }}>
                        Section {si + 1} — {section.title}
                      </p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>
                        {section.units.length} units · {section.units.reduce((a, u) => a + u.sources.length, 0)} sources
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: "17px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {/* Units */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.badge}` }}>
                    {section.units.map((unit, ui) => {
                      const isFree      = unitIndexMap[unit.id] <= 3;
                      const locked      = !isLearner && !isFree;
                      const showSources = expandedSources[unit.id];

                      return (
                        <div key={unit.id} style={{ borderBottom: ui < section.units.length - 1 ? "1px solid #f3f4f6" : "none" }}>

                          {/* Unit row */}
                          <div style={{
                            display: "flex", alignItems: "stretch",
                            backgroundColor: locked ? "#fafafa" : "#ffffff",
                            opacity: locked ? 0.65 : 1,
                          }}>

                            {/* ── Unit title link (flex: 1) ── */}
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

                              {/* Title + meta */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
                                  {unit.title}
                                </p>
                                <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
                                  {unit.sources.length} source units
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

                            {/* ── Sources toggle button ── */}
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

                          {/* ── Sources panel ── */}
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
                                          {src.book} · {src.unit}
                                        </p>
                                        <p style={{ fontSize: "11px", color: "#6b7280", margin: "1px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                          {src.name}
                                        </p>
                                      </div>

                                      {/* Book label pill */}
                                      <span style={{
                                        fontSize: "9px", fontWeight: 700,
                                        backgroundColor: book.badge, color: book.text,
                                        padding: "2px 7px", borderRadius: "999px",
                                        whiteSpace: "nowrap", flexShrink: 0,
                                      }}>
                                        {book.label.replace("VIU ", "")}
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
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>Unlock the full {totalUnits}-unit curriculum</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Access all {totalSections} sections with {totalSources}+ source references across 4 levels.
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
