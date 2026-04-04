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
  Basic: "pronunciation/piu-elementary",
  Int:   "pronunciation/piu-intermediate",
  Adv:   "pronunciation/piu-advanced",
};
const levelLabel = { Basic: "Elementary", Int: "Intermediate", Adv: "Advanced" };
const levelColors = {
  Basic: { bg: "#d1fae5", text: "#065f46", dot: "#059669" },
  Int:   { bg: "#dbeafe", text: "#1e3a5f", dot: "#0369a1" },
  Adv:   { bg: "#ede9fe", text: "#4c1d95", dot: "#7c3aed" },
};

// src format: { level: "Basic"|"Int"|"Adv", unitId: "unit-01", label: "Unit 01 — Title" }
// focus: string

const bookData = {
  title:   "Unified Pronunciation Book",
  authors: "Prepared by Akrom Nabi",
  cover:   "/books/unified-pronunciation.jpg",
  unified: true,
  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // SECTION I — Sounds & the Phonemic Alphabet
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section I — Sounds & the Phonemic Alphabet",
      icon: "🔤",
      color: { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46", border: "#bbf7d0" },
      units: [
        {
          num: "1", id: "u1",
          title: "Introducing Letters and Sounds / Spelling and Pronunciation",
          sources: [
            { level: "Basic", unitId: "unit-01", label: "Unit 01 — How many letters, how many sounds?" },
            { level: "Int",   unitId: "unit-01", label: "Unit 01 — Bye, buy (introducing letters and sounds)" },
          ],
          focus: "The relationship between spelling and pronunciation; the gap between written and spoken English",
        },
        {
          num: "2", id: "u2",
          title: "The Phonemic Alphabet / Chart of Phonemic Symbols",
          sources: [
            { level: "Basic", unitId: "unit-e1", label: "E1 — Chart of phonemic symbols" },
            { level: "Int",   unitId: "unit-d1", label: "D1 — Introduction to phonemic symbols" },
            { level: "Adv",   unitId: "unit-e1", label: "E1 — The phonemic alphabet: practice" },
          ],
          focus: "Learning and using the IPA system across all three levels",
        },
        {
          num: "3", id: "u3",
          title: "Sound Pairs (Minimal Pairs Practice)",
          sources: [
            { level: "Basic", unitId: "unit-e3", label: "E3 — Sound pairs" },
            { level: "Int",   unitId: "unit-d4", label: "D4 — Sound pairs" },
          ],
          focus: "Distinguishing closely related sounds through minimal pair contrast",
        },
        {
          num: "4", id: "u4",
          title: "From Spelling to Sound",
          sources: [
            { level: "Basic", unitId: "unit-e4", label: "E4 — From spelling to sound" },
          ],
          focus: "Rules and patterns for predicting pronunciation from spelling",
        },
        {
          num: "5", id: "u5",
          title: "Homophones",
          sources: [
            { level: "Basic", unitId: "unit-e8", label: "E8 — Homophones" },
          ],
          focus: "Words that sound identical but differ in spelling and meaning",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION II — Vowel Sounds
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section II — Vowel Sounds",
      icon: "🗣️",
      color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc" },
      units: [
        {
          num: "6", id: "u6",
          title: "Vowels /iː/ and /ɪ/",
          sources: [
            { level: "Basic", unitId: "unit-02", label: "Unit 02 — Pizza for dinner (/iː/ and /ɪ/)" },
            { level: "Int",   unitId: "unit-06", label: "Unit 06 — Meet, met (/iː/, /e/)" },
          ],
          focus: "Long high front vowel vs short high front vowel; also contrasted with short mid-front vowel at intermediate level",
        },
        {
          num: "7", id: "u7",
          title: "Vowels /uː/ and /ʊ/",
          sources: [
            { level: "Basic", unitId: "unit-03", label: "Unit 03 — A spoonful of sugar (/uː/ and /ʊ/)" },
            { level: "Int",   unitId: "unit-18", label: "Unit 18 — Sun, full, June (/ʌ/, /ʊ/, /uː/)" },
          ],
          focus: "Long high back vowel vs short near-high back vowel; at intermediate level, also contrasted with /ʌ/",
        },
        {
          num: "8", id: "u8",
          title: "Vowels /ɑː/ and /ʌ/",
          sources: [
            { level: "Basic", unitId: "unit-04", label: "Unit 04 — Father and mother (/ɑː/ and /ʌ/)" },
          ],
          focus: "Long low back vowel vs short central vowel; one of the most common areas of confusion for learners",
        },
        {
          num: "9", id: "u9",
          title: "Vowels /ɒ/ and /ɔː/",
          sources: [
            { level: "Basic", unitId: "unit-05", label: "Unit 05 — A dog in the corner (/ɒ/ and /ɔː/)" },
            { level: "Int",   unitId: "unit-16", label: "Unit 16 — Note, not (/əʊ/, /ɒ/)" },
          ],
          focus: "Short open back vowel vs long open-mid back rounded vowel; at intermediate level, also contrasted with the diphthong /əʊ/",
        },
        {
          num: "10", id: "u10",
          title: "Vowels /e/ and /æ/",
          sources: [
            { level: "Basic", unitId: "unit-06", label: "Unit 06 — Bread and jam (/e/ and /æ/)" },
          ],
          focus: "Mid-front vowel vs low-front vowel; a key contrast in British English",
        },
        {
          num: "11", id: "u11",
          title: "Vowel /ɜː/ (in depth)",
          sources: [
            { level: "Basic", unitId: "unit-07", label: "Unit 07 — My birthday's on Thursday (/ɜː/)" },
            { level: "Int",   unitId: "unit-19", label: "Unit 19 — Shirt, short (/ɜː(r)/, /ɔː(r)/)" },
          ],
          focus: "Focused practice on the central long vowel; at intermediate level, contrasted with /ɔː(r)/",
        },
        {
          num: "12", id: "u12",
          title: "Diphthongs /ɪə/ and /eə/",
          sources: [
            { level: "Basic", unitId: "unit-08", label: "Unit 08 — Here and there (/ɪə/ and /eə/)" },
            { level: "Int",   unitId: "unit-14", label: "Unit 14 — Car, care (/ɑː(r)/, /eə(r)/)" },
          ],
          focus: "Centering diphthongs; awareness of vowel glides toward schwa",
        },
        {
          num: "13", id: "u13",
          title: "Diphthongs /eɪ/, /aɪ/, /ɔɪ/",
          sources: [
            { level: "Basic", unitId: "unit-09", label: "Unit 09 — Have a great time! (/eɪ/, /aɪ/ and /ɔɪ/)" },
            { level: "Int",   unitId: "unit-02", label: "Unit 02 — Plane, plan (/eɪ/, /æ/)" },
            { level: "Int",   unitId: "unit-11", label: "Unit 11 — Wine, win (/aɪ/, /ɪ/)" },
            { level: "Int",   unitId: "unit-20", label: "Unit 20 — Toy, town (/ɔɪ/, /aʊ/)" },
          ],
          focus: "Closing diphthongs; each contrasted with its short monophthong partner at intermediate level",
        },
        {
          num: "14", id: "u14",
          title: "Diphthongs /əʊ/ and /aʊ/",
          sources: [
            { level: "Basic", unitId: "unit-10", label: "Unit 10 — Old town (/əʊ/ and /aʊ/)" },
          ],
          focus: "Back-closing diphthongs; distinguishing similar glide patterns",
        },
        {
          num: "15", id: "u15",
          title: "Schwa /ə/ and short /ɪ/ in unstressed syllables",
          sources: [
            { level: "Int",   unitId: "unit-07", label: "Unit 07 — Carrot, cabbage (/ə/, /ɪ/)" },
            { level: "Adv",   unitId: "unit-23", label: "Unit 23 — calcu/u/late and calcu/ə/late (vowels in unstressed syllables)" },
          ],
          focus: "The two most common unstressed vowels; vowel reduction as a core feature of natural English rhythm",
        },
        {
          num: "16", id: "u16",
          title: "R-coloured Vowels /ɑː(r)/ and /eə(r)/",
          sources: [
            { level: "Int",   unitId: "unit-14", label: "Unit 14 — Car, care (/ɑː(r)/, /eə(r)/)" },
          ],
          focus: "R-coloured vowels in non-rhotic and rhotic accents",
        },
        {
          num: "17", id: "u17",
          title: "Vowels /ʌ/, /ʊ/, /uː/ — the three back/central vowels",
          sources: [
            { level: "Int",   unitId: "unit-18", label: "Unit 18 — Sun, full, June (/ʌ/, /ʊ/, /uː/)" },
          ],
          focus: "Three back/central vowels that are frequently confused by learners",
        },
        {
          num: "18", id: "u18",
          title: "Vowels /ɜː(r)/ and /ɔː(r)/",
          sources: [
            { level: "Int",   unitId: "unit-19", label: "Unit 19 — Shirt, short (/ɜː(r)/, /ɔː(r)/)" },
          ],
          focus: "Central long vowel vs open-mid back rounded vowel; particularly relevant for rhotic varieties",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION III — Consonant Sounds
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section III — Consonant Sounds",
      icon: "🔊",
      color: { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd" },
      units: [
        {
          num: "19", id: "u19",
          title: "/p/ and /b/",
          sources: [
            { level: "Basic", unitId: "unit-11", label: "Unit 11 — Pack your bags (/p/ and /b/)" },
            { level: "Int",   unitId: "unit-03", label: "Unit 03 — Back, pack (/b/, /p/)" },
          ],
          focus: "Voicing contrast in bilabial plosives",
        },
        {
          num: "20", id: "u20",
          title: "/t/ and /d/",
          sources: [
            { level: "Basic", unitId: "unit-12", label: "Unit 12 — Twenty days (/t/ and /d/)" },
            { level: "Int",   unitId: "unit-05", label: "Unit 05 — Down town (/d/, /t/)" },
          ],
          focus: "Voicing contrast in alveolar plosives",
        },
        {
          num: "21", id: "u21",
          title: "/k/ and /g/",
          sources: [
            { level: "Basic", unitId: "unit-13", label: "Unit 13 — Cats and dogs (/k/ and /g/)" },
            { level: "Int",   unitId: "unit-09", label: "Unit 09 — Gate, Kate (/g/, /k/)" },
          ],
          focus: "Voicing contrast in velar plosives",
        },
        {
          num: "22", id: "u22",
          title: "/f/ and /v/",
          sources: [
            { level: "Basic", unitId: "unit-14", label: "Unit 14 — November the first (/f/ and /v/)" },
            { level: "Int",   unitId: "unit-08", label: "Unit 08 — Few, view (/f/, /v/)" },
          ],
          focus: "Voicing contrast in labiodental fricatives",
        },
        {
          num: "23", id: "u23",
          title: "/θ/ and /ð/ (th sounds)",
          sources: [
            { level: "Basic", unitId: "unit-15", label: "Unit 15 — Both together (/θ/ and /ð/)" },
            { level: "Int",   unitId: "unit-17", label: "Unit 17 — Arthur's mother (/θ/, /ð/)" },
          ],
          focus: "Dental fricatives; one of the most challenging contrasts for non-native speakers",
        },
        {
          num: "24", id: "u24",
          title: "/s/ and /z/",
          sources: [
            { level: "Basic", unitId: "unit-16", label: "Unit 16 — It's the wrong size, isn't it? (/s/ and /z/)" },
            { level: "Int",   unitId: "unit-04", label: "Unit 04 — Rice, rise (/s/, /z/)" },
          ],
          focus: "Voicing contrast in alveolar fricatives; also affects -s grammatical endings",
        },
        {
          num: "25", id: "u25",
          title: "/ʃ/ and /ʒ/",
          sources: [
            { level: "Basic", unitId: "unit-17", label: "Unit 17 — Fresh fish, usually (/ʃ/ and /ʒ/)" },
            { level: "Int",   unitId: "unit-12", label: "Unit 12 — Sheep, jeep, cheap (/ʃ/, /dʒ/, /tʃ/)" },
          ],
          focus: "Palato-alveolar fricatives; voicing contrast; at intermediate level, contrasted with affricates",
        },
        {
          num: "26", id: "u26",
          title: "/tʃ/ and /dʒ/ (affricate sounds)",
          sources: [
            { level: "Basic", unitId: "unit-18", label: "Unit 18 — Chips and juice (/tʃ/ and /dʒ/)" },
            { level: "Int",   unitId: "unit-12", label: "Unit 12 — Sheep, jeep, cheap (/ʃ/, /dʒ/, /tʃ/)" },
          ],
          focus: "Affricate consonants; voicing contrast; distinguished from fricatives /ʃ/ and /ʒ/",
        },
        {
          num: "27", id: "u27",
          title: "Nasals /m/, /n/, /ŋ/",
          sources: [
            { level: "Basic", unitId: "unit-19", label: "Unit 19 — My hungry uncle (/m/, /n/ and /ŋ/)" },
            { level: "Int",   unitId: "unit-15", label: "Unit 15 — Some, sun, sung (/m/, /n/, /ŋ/)" },
          ],
          focus: "Three nasal consonants; /ŋ/ is especially problematic as it cannot begin a word in English",
        },
        {
          num: "28", id: "u28",
          title: "/h/",
          sources: [
            { level: "Basic", unitId: "unit-02", label: "Unit 02 — Pizza for dinner (introduces /h/ alongside /iː/ and /ɪ/)" },
            { level: "Basic", unitId: "unit-20", label: "Unit 20 — How many hours? (/h/)" },
            { level: "Int",   unitId: "unit-10", label: "Unit 10 — Hear, we're, year (/h/, /w/, /j/)" },
          ],
          focus: "The glottal fricative; when it is and is not pronounced",
        },
        {
          num: "29", id: "u29",
          title: "/r/",
          sources: [
            { level: "Basic", unitId: "unit-22", label: "Unit 22 — What terrible weather! (/r/)" },
            { level: "Int",   unitId: "unit-13", label: "Unit 13 — Flies, fries (/l/, /r/)" },
          ],
          focus: "The English /r/ (approximant, not trill); linking and intrusive /r/; contrast with /l/",
        },
        {
          num: "30", id: "u30",
          title: "/l/",
          sources: [
            { level: "Basic", unitId: "unit-21", label: "Unit 21 — That's life! (/l/)" },
            { level: "Int",   unitId: "unit-13", label: "Unit 13 — Flies, fries (/l/, /r/)" },
          ],
          focus: "Lateral approximant; clear vs dark /l/; contrast with /r/",
        },
        {
          num: "31", id: "u31",
          title: "/w/ and /j/",
          sources: [
            { level: "Basic", unitId: "unit-23", label: "Unit 23 — What's the news? (/w/ and /j/)" },
            { level: "Int",   unitId: "unit-10", label: "Unit 10 — Hear, we're, year (/h/, /w/, /j/)" },
          ],
          focus: "Approximant consonants; /j/ also functions as a linking sound between vowels",
        },
        {
          num: "32", id: "u32",
          title: "Syllabic Consonants",
          sources: [
            { level: "Adv",   unitId: "unit-24", label: "Unit 24 — listen, bottle, politician, etc." },
          ],
          focus: "Consonants that function as syllable nuclei (/n/, /l/, /m/) replacing unstressed /ə/",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION IV — Consonant Clusters
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section IV — Consonant Clusters",
      icon: "🧩",
      color: { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d" },
      units: [
        {
          num: "33", id: "u33",
          title: "Consonant Clusters at the Beginning of Words",
          sources: [
            { level: "Basic", unitId: "unit-25", label: "Unit 25 — Train in the rain (consonant groups at the beginning of words)" },
            { level: "Int",   unitId: "unit-24", label: "Unit 24 — Oh, no snow! (consonants at the start of syllables)" },
            { level: "Adv",   unitId: "unit-07", label: "Unit 07 — play, grow, splash (consonant clusters at the beginning of words)" },
            { level: "Adv",   unitId: "unit-e2", label: "E2 — Consonant clusters: further practice" },
          ],
          focus: "Initial clusters; permissible combinations in English; common errors by L1 background",
        },
        {
          num: "34", id: "u34",
          title: "Consonant Clusters at the End of Words",
          sources: [
            { level: "Basic", unitId: "unit-26", label: "Unit 26 — Pink and orange (consonant groups at the end of words)" },
            { level: "Int",   unitId: "unit-25", label: "Unit 25 — Go – goal – gold (consonants at the end of syllables)" },
            { level: "Adv",   unitId: "unit-08", label: "Unit 08 — jump, next, glimpsed (consonant clusters at the end of words)" },
          ],
          focus: "Final clusters; especially complex when grammatical endings are added",
        },
        {
          num: "35", id: "u35",
          title: "Consonant Clusters in the Middle of / Across Words",
          sources: [
            { level: "Basic", unitId: "unit-24", label: "Unit 24 — Sunglasses or umbrella? (consonant groups in the middle of words)" },
            { level: "Basic", unitId: "unit-27", label: "Unit 27 — Last week (consonant groups across words)" },
            { level: "Adv",   unitId: "unit-09", label: "Unit 09 — abstract, next Friday (consonant clusters within and across words)" },
          ],
          focus: "Medial clusters; how clusters extend across word boundaries in connected speech",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION V — Syllables
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section V — Syllables",
      icon: "🔡",
      color: { accent: "#0d9488", bg: "#f0fdfa", badge: "#ccfbf1", text: "#134e4a", border: "#99f6e4" },
      units: [
        {
          num: "36", id: "u36",
          title: "Syllable Basics",
          sources: [
            { level: "Basic", unitId: "unit-28", label: "Unit 28 — One house, two houses (syllables)" },
            { level: "Int",   unitId: "unit-21", label: "Unit 21 — Eye, my, mine (introducing syllables)" },
          ],
          focus: "What a syllable is; counting syllables; how grammatical endings can add syllables",
        },
        {
          num: "37", id: "u37",
          title: "Syllables Added by -s Endings (Plurals, 3rd Person, Possessives)",
          sources: [
            { level: "Basic", unitId: "unit-42", label: "Unit 42 — It's George's birthday (pronouncing -s endings)" },
            { level: "Int",   unitId: "unit-26", label: "Unit 26 — Paul's calls, Max's faxes (syllables: plural and other -s endings)" },
          ],
          focus: "When -s adds a syllable (/ɪz/) vs when it does not (/s/ or /z/)",
        },
        {
          num: "38", id: "u38",
          title: "Syllables Added by Past Tense -ed Endings",
          sources: [
            { level: "Basic", unitId: "unit-43", label: "Unit 43 — I looked everywhere (pronouncing past tenses)" },
            { level: "Int",   unitId: "unit-27", label: "Unit 27 — Pete played, Rita rested (syllables: adding past tense endings)" },
          ],
          focus: "When -ed adds a syllable (/ɪd/) vs when it does not (/t/ or /d/)",
        },
        {
          num: "39", id: "u39",
          title: "Words That Lose a Syllable (Elision / Syncopation)",
          sources: [
            { level: "Adv",   unitId: "unit-31", label: "Unit 31 — average, novelist, happening (words that lose a syllable)" },
          ],
          focus: "Elision of syllables in everyday speech; syncopation in polysyllabic words",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION VI — Word Stress
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section VI — Word Stress",
      icon: "💡",
      color: { accent: "#dc2626", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d", border: "#fca5a5" },
      units: [
        {
          num: "40", id: "u40",
          title: "Introducing Word Stress",
          sources: [
            { level: "Int",   unitId: "unit-22", label: "Unit 22 — Saturday September 13th (introducing word stress)" },
            { level: "Adv",   unitId: "unit-10", label: "Unit 10 — 'contro'versial and controVERsial (word stress and prominence)" },
            { level: "Adv",   unitId: "unit-e3", label: "E3 — Word stress: further practice" },
          ],
          focus: "Stress as a distinguishing feature; prominence; default patterns",
        },
        {
          num: "41", id: "u41",
          title: "Stress in Two-Syllable Words",
          sources: [
            { level: "Basic", unitId: "unit-30", label: "Unit 30 — Single or return? (stress in two-syllable words)" },
            { level: "Int",   unitId: "unit-28", label: "Unit 28 — REcord, reCORD (stress in two-syllable words)" },
          ],
          focus: "Default stress patterns; stress as a distinguishing feature between nouns and verbs",
        },
        {
          num: "42", id: "u42",
          title: "Stress in Longer / Polysyllabic Words",
          sources: [
            { level: "Basic", unitId: "unit-31", label: "Unit 31 — Begin at the beginning (stress in longer words)" },
            { level: "Int",   unitId: "unit-30", label: "Unit 30 — Unforgettable (stress in longer words 1)" },
            { level: "Int",   unitId: "unit-31", label: "Unit 31 — Public, publicity (stress in longer words 2)" },
          ],
          focus: "Patterns in three-syllable and longer words; effects of suffixes on stress placement",
        },
        {
          num: "43", id: "u43",
          title: "Suffixes and Word Stress (1) — Neutral Suffixes",
          sources: [
            { level: "Adv",   unitId: "unit-11", label: "Unit 11 — 'comfort and 'comfortable (suffixes and word stress 1)" },
          ],
          focus: "Suffixes that don't shift stress; understanding which endings are 'transparent'",
        },
        {
          num: "44", id: "u44",
          title: "Suffixes and Word Stress (2) — Stress-Attracting Suffixes",
          sources: [
            { level: "Adv",   unitId: "unit-12", label: "Unit 12 — ac'celerate and ac'cele'ration (suffixes and word stress 2)" },
          ],
          focus: "Suffixes like -tion, -ity, -ic that pull stress to a specific syllable",
        },
        {
          num: "45", id: "u45",
          title: "Suffixes and Word Stress (3) — Further Patterns",
          sources: [
            { level: "Adv",   unitId: "unit-13", label: "Unit 13 — ex'treme and ex'tremity (suffixes and word stress 3)" },
          ],
          focus: "Stress alternation in word families; noun/adjective/verb relationships",
        },
        {
          num: "46", id: "u46",
          title: "Prefixes and Word Stress (1)",
          sources: [
            { level: "Adv",   unitId: "unit-14", label: "Unit 14 — dis'organised and 'recon'sider (prefixes and word stress 1)" },
          ],
          focus: "How prefixes interact with or do not shift underlying stress",
        },
        {
          num: "47", id: "u47",
          title: "Prefixes and Word Stress (2)",
          sources: [
            { level: "Adv",   unitId: "unit-15", label: "Unit 15 — 'subway and 'super'power (prefixes and word stress 2)" },
          ],
          focus: "Stress in words with more complex prefix structures",
        },
        {
          num: "48", id: "u48",
          title: "Stress in Compound Nouns",
          sources: [
            { level: "Basic", unitId: "unit-32", label: "Unit 32 — Where's my checklist? (stress in compound words)" },
            { level: "Int",   unitId: "unit-29", label: "Unit 29 — Second hand, bookshop (stress in compound words)" },
            { level: "Adv",   unitId: "unit-16", label: "Unit 16 — 'news'paper and 'absolute 'zero (stress in compound nouns)" },
          ],
          focus: "First-element stress as the default pattern; exceptions and variable compounds",
        },
        {
          num: "49", id: "u49",
          title: "Stress in Compound Adjectives and Abbreviations",
          sources: [
            { level: "Adv",   unitId: "unit-17", label: "Unit 17 — 'hair-'raising and 'hard-'working (stress in compound adjectives and abbreviations)" },
          ],
          focus: "Contrast with compound nouns; how abbreviations are stressed",
        },
        {
          num: "50", id: "u50",
          title: "Stress in Longer Compound Nouns",
          sources: [
            { level: "Adv",   unitId: "unit-18", label: "Unit 18 — 'closed-circuit 'television and 'sell-by date (stress in longer compound nouns)" },
          ],
          focus: "Multi-word compounds; patterns in technical and commercial terminology",
        },
        {
          num: "51", id: "u51",
          title: "Stress in Phrasal Verbs — One Stress",
          sources: [
            { level: "Adv",   unitId: "unit-19", label: "Unit 19 — 'dream of and 'live for (one-stress phrasal verbs)" },
          ],
          focus: "Phrasal verbs where stress falls on the verb, not the particle",
        },
        {
          num: "52", id: "u52",
          title: "Stress in Phrasal Verbs — Two Stresses",
          sources: [
            { level: "Adv",   unitId: "unit-20", label: "Unit 20 — 'hang a'round and 'look 'up to (two-stress phrasal verbs)" },
          ],
          focus: "Phrasal verbs and prepositional verbs with two prominent syllables",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION VII — Sentence Stress and Rhythm
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section VII — Sentence Stress and Rhythm",
      icon: "🎵",
      color: { accent: "#c026d3", bg: "#fdf4ff", badge: "#f5d0fe", text: "#701a75", border: "#e879f9" },
      units: [
        {
          num: "53", id: "u53",
          title: "Introducing Sentence Stress",
          sources: [
            { level: "Int",   unitId: "unit-23", label: "Unit 23 — Remember, he told her (introducing sentence stress)" },
          ],
          focus: "Content words vs function words; the backbone of English rhythm",
        },
        {
          num: "54", id: "u54",
          title: "Sentences with All Words Stressed",
          sources: [
            { level: "Int",   unitId: "unit-32", label: "Unit 32 — DON'T LOOK NOW! (sentences with all the words stressed)" },
          ],
          focus: "Short, emphatic utterances; imperatives and exclamations",
        },
        {
          num: "55", id: "u55",
          title: "Unstressed Words in Sentences",
          sources: [
            { level: "Int",   unitId: "unit-33", label: "Unit 33 — THAT could be the MAN (unstressed words)" },
          ],
          focus: "Which grammatical words routinely go unstressed in connected speech",
        },
        {
          num: "56", id: "u56",
          title: "Rhythm",
          sources: [
            { level: "Basic", unitId: "unit-36", label: "Unit 36 — Take me to the show, Jo (rhythm)" },
          ],
          focus: "Stress-timed rhythm; the beat structure of English sentences",
        },
        {
          num: "57", id: "u57",
          title: "Prominent Words in Speech Units (1)",
          sources: [
            { level: "Adv",   unitId: "unit-33", label: "Unit 33 — // it's BLUE// DARK blue// (prominent words in speech units 1)" },
          ],
          focus: "How new information receives prominence; given vs new distinction",
        },
        {
          num: "58", id: "u58",
          title: "Prominent Words in Speech Units (2)",
          sources: [
            { level: "Adv",   unitId: "unit-34", label: "Unit 34 — // I've always been terrified of SPIders// (prominent words in speech units 2)" },
          ],
          focus: "Identifying which word in a unit carries the nucleus",
        },
        {
          num: "59", id: "u59",
          title: "Fixed Phrases and Idioms in Speech Units",
          sources: [
            { level: "Adv",   unitId: "unit-35", label: "Unit 35 — // I'll beLIEVE it when I SEE it// (fixed phrases and idioms in speech units)" },
          ],
          focus: "How idiomatic phrases behave as single stress units",
        },
        {
          num: "60", id: "u60",
          title: "Non-Prominence on Final 'Empty' Content Words",
          sources: [
            { level: "Adv",   unitId: "unit-36", label: "Unit 36 — she's got an ESSay to write (non-prominence on final 'empty' content words)" },
          ],
          focus: "When semantically light nouns and verbs are de-accented",
        },
        {
          num: "61", id: "u61",
          title: "Non-Prominence on Final Vague Expressions",
          sources: [
            { level: "Adv",   unitId: "unit-37", label: "Unit 37 — I can't STAND the stuff (non-prominence on final vague expressions)" },
          ],
          focus: "Tags like 'and stuff', 'or whatever', 'and things like that'",
        },
        {
          num: "62", id: "u62",
          title: "Prominence in Reflexive and Personal Pronouns",
          sources: [
            { level: "Adv",   unitId: "unit-38", label: "Unit 38 — Just help yourSELF; Throw it to ME (prominence in reflexive and personal pronouns)" },
          ],
          focus: "When normally unstressed pronouns receive nuclear stress",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION VIII — Weak Forms and Function Words
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section VIII — Weak Forms and Function Words",
      icon: "🔽",
      color: { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46", border: "#bbf7d0" },
      units: [
        {
          num: "63", id: "u63",
          title: "Weak Forms of Function Words",
          sources: [
            { level: "Adv",   unitId: "unit-21", label: "Unit 21 — some, the, from, etc. (weak forms of function words)" },
          ],
          focus: "The systematic reduction of articles, prepositions, conjunctions in connected speech",
        },
        {
          num: "64", id: "u64",
          title: "Prominent Function Words (Strong Forms)",
          sources: [
            { level: "Adv",   unitId: "unit-22", label: "Unit 22 — Well, YOU do it then! (prominent function words)" },
          ],
          focus: "When function words are stressed for contrast, emphasis, or citation",
        },
        {
          num: "65", id: "u65",
          title: "Strong and Weak Forms (1): Pronouns",
          sources: [
            { level: "Basic", unitId: "unit-37", label: "Unit 37 — Hey, wait for me! (strong and weak forms 1: pronouns)" },
            { level: "Int",   unitId: "unit-34", label: "Unit 34 — I'll ask her (Alaska) (pronouns and contractions)" },
          ],
          focus: "Reduced forms of he, him, her, them, etc. in unstressed positions",
        },
        {
          num: "66", id: "u66",
          title: "Strong and Weak Forms (2): Possessives, Conjunctions, Prepositions",
          sources: [
            { level: "Basic", unitId: "unit-38", label: "Unit 38 — And what's his name? (strong and weak forms 2)" },
          ],
          focus: "Reduction of his, her, your, and, but, at, for, of, to, etc.",
        },
        {
          num: "67", id: "u67",
          title: "Strong and Weak Forms (3): Articles, Comparatives, 'There'",
          sources: [
            { level: "Basic", unitId: "unit-39", label: "Unit 39 — There's a spider (strong and weak forms 3)" },
          ],
          focus: "Reduction of a/an/the; than in comparatives; existential there",
        },
        {
          num: "68", id: "u68",
          title: "Strong and Weak Forms (4): Auxiliary Verbs",
          sources: [
            { level: "Basic", unitId: "unit-40", label: "Unit 40 — Who was that? (strong and weak forms 4: auxiliary verbs)" },
            { level: "Int",   unitId: "unit-36", label: "Unit 36 — WHAT do you THINK? (auxiliary verbs)" },
          ],
          focus: "Reduction of be, have, do, will, would, can, could, etc. in unstressed positions",
        },
        {
          num: "69", id: "u69",
          title: "Pronouncing Short Words: a, of, or",
          sources: [
            { level: "Int",   unitId: "unit-37", label: "Unit 37 — A piece of cheese (pronouncing short words: a, of, or)" },
          ],
          focus: "The most-reduced words in English; how they integrate into the stream of speech",
        },
        {
          num: "70", id: "u70",
          title: "Pronouncing the Verb 'be'",
          sources: [
            { level: "Int",   unitId: "unit-35", label: "Unit 35 — She was FIRST (pronouncing the verb be)" },
          ],
          focus: "When is/are/was/were are reduced or stressed",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION IX — Contractions and Ellipsis
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section IX — Contractions and Ellipsis",
      icon: "✂️",
      color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc" },
      units: [
        {
          num: "71", id: "u71",
          title: "Contracted Forms",
          sources: [
            { level: "Basic", unitId: "unit-41", label: "Unit 41 — They're here! (contractions)" },
            { level: "Adv",   unitId: "unit-27", label: "Unit 27 — I'll get it, These're mine (contracted forms)" },
          ],
          focus: "Standard contractions and less common ones that appear in fast speech",
        },
        {
          num: "72", id: "u72",
          title: "Ellipsis and 'Near Ellipsis'",
          sources: [
            { level: "Adv",   unitId: "unit-28", label: "Unit 28 — I'm not sure, Not sure, 'm not sure (ellipsis and 'near ellipsis')" },
          ],
          focus: "Omission of initial unstressed elements; informal speech reductions",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION X — Connected / Fast Speech
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section X — Connected / Fast Speech",
      icon: "⚡",
      color: { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d" },
      units: [
        {
          num: "73", id: "u73",
          title: "Linking Sounds (Liaison)",
          sources: [
            { level: "Basic", unitId: "unit-34", label: "Unit 34 — Speak it, write it, read it (linking words together 1)" },
            { level: "Basic", unitId: "unit-35", label: "Unit 35 — Me and you, you and me (linking words together 2)" },
            { level: "Int",   unitId: "unit-38", label: "Unit 38 — Pets enter, pet centre (joining words 1)" },
            { level: "Int",   unitId: "unit-39", label: "Unit 39 — After eight, after rate (joining words 2)" },
            { level: "Int",   unitId: "unit-40", label: "Unit 40 — Greet guests, Greek guests (joining words 3)" },
            { level: "Adv",   unitId: "unit-26", label: "Unit 26 — one_evening, stop_now, go_away, etc. (linking sounds)" },
          ],
          focus: "Consonant-to-vowel linking; /j/ and /w/ intrusion; resyllabification across word boundaries",
        },
        {
          num: "74", id: "u74",
          title: "Pronunciation in Slow and Fast Speech (1)",
          sources: [
            { level: "Adv",   unitId: "unit-05", label: "Unit 05 — Pronunciation in slow and fast speech (1)" },
          ],
          focus: "How careful (citation) speech differs from natural connected speech",
        },
        {
          num: "75", id: "u75",
          title: "Pronunciation in Slow and Fast Speech (2)",
          sources: [
            { level: "Adv",   unitId: "unit-06", label: "Unit 06 — Pronunciation in slow and fast speech (2)" },
          ],
          focus: "Further features of fast speech; implications for listening comprehension",
        },
        {
          num: "76", id: "u76",
          title: "Leaving Out Consonant Sounds (1): /t/",
          sources: [
            { level: "Adv",   unitId: "unit-29", label: "Unit 29 — last night, I haven't seen her (leaving out consonant sounds 1: /t/)" },
          ],
          focus: "T-deletion in clusters; word-final /t/ before consonants",
        },
        {
          num: "77", id: "u77",
          title: "Leaving Out Consonant Sounds (2): /d/, /h/, /l/, /v/",
          sources: [
            { level: "Adv",   unitId: "unit-30", label: "Unit 30 — an old car, a bottle of water (leaving out consonant sounds 2)" },
          ],
          focus: "D-deletion, H-dropping, and reduction of other consonants in fast speech",
        },
        {
          num: "78", id: "u78",
          title: "Reading Aloud (Phrasing and Pauses)",
          sources: [
            { level: "Basic", unitId: "unit-33", label: "Unit 33 — Phrases and pauses (reading aloud)" },
            { level: "Int",   unitId: "unit-42", label: "Unit 42 — 'Was that the question?' he asked (reading aloud: pronouncing punctuation)" },
          ],
          focus: "How written punctuation maps onto spoken pauses and tone groups",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XI — Speech Units and Information Structure
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XI — Speech Units and Information Structure",
      icon: "📐",
      color: { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd" },
      units: [
        {
          num: "79", id: "u79",
          title: "Breaking Speech into Units (Tone Groups)",
          sources: [
            { level: "Adv",   unitId: "unit-32", label: "Unit 32 — // we stuck a picture// of an elephant// (breaking speech into units)" },
          ],
          focus: "How continuous speech is divided into meaningful chunks; the tone group as a unit",
        },
        {
          num: "80", id: "u80",
          title: "Dividing Prepared Speech into Units (1)",
          sources: [
            { level: "Adv",   unitId: "unit-54", label: "Unit 54 — Before she left school// she started her own business" },
          ],
          focus: "How speakers reading or presenting chunk prepared text differently from conversation",
        },
        {
          num: "81", id: "u81",
          title: "Dividing Prepared Speech into Units (2)",
          sources: [
            { level: "Adv",   unitId: "unit-55", label: "Unit 55 — One of the paintings// he left to his sister" },
          ],
          focus: "Complex syntax and how it affects chunking in formal and prepared speech",
        },
        {
          num: "82", id: "u82",
          title: "Pronunciation of Inserts",
          sources: [
            { level: "Adv",   unitId: "unit-56", label: "Unit 56 — Lima – as I'm sure you know – is the capital of Peru" },
          ],
          focus: "Parenthetical asides; how they are set off prosodically",
        },
        {
          num: "83", id: "u83",
          title: "Grouping Words (Phrasing)",
          sources: [
            { level: "Int",   unitId: "unit-43", label: "Unit 43 — A shirt and a tie / a shirt and tie (grouping words)" },
          ],
          focus: "How grouping creates or changes meaning; ambiguity in spoken phrases",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XII — Intonation: Tones and Functions
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XII — Intonation: Tones and Functions",
      icon: "〰️",
      color: { accent: "#0d9488", bg: "#f0fdfa", badge: "#ccfbf1", text: "#134e4a", border: "#99f6e4" },
      units: [
        {
          num: "84", id: "u84",
          title: "Introducing Tones",
          sources: [
            { level: "Int",   unitId: "unit-54", label: "Unit 54 — Look who's talking! (introducing tones)" },
          ],
          focus: "The basic idea of falling and rising tones; how they signal different meanings",
        },
        {
          num: "85", id: "u85",
          title: "Falling and Rising Tones",
          sources: [
            { level: "Adv",   unitId: "unit-39", label: "Unit 39 — I'm quite busy … at the moment (falling and rising tones)" },
          ],
          focus: "Fall = definite/complete; rise = uncertain/continuing; non-final",
        },
        {
          num: "86", id: "u86",
          title: "Intonation in Phrases and Sentences (1)",
          sources: [
            { level: "Basic", unitId: "unit-49", label: "Unit 49 — No, thanks, I'm just looking (intonation in phrases and sentences 1)" },
          ],
          focus: "Common conversational responses and formulaic expressions; how intonation conveys attitude",
        },
        {
          num: "87", id: "u87",
          title: "Intonation in Phrases and Sentences (2)",
          sources: [
            { level: "Basic", unitId: "unit-50", label: "Unit 50 — Fine, thanks (intonation in phrases and sentences 2)" },
          ],
          focus: "Fixed phrases and formulaic expressions; how their intonation conveys attitude",
        },
        {
          num: "88", id: "u88",
          title: "Tones in Asking and Checking",
          sources: [
            { level: "Int",   unitId: "unit-55", label: "Unit 55 — Here? Yes, here! (asking and checking tones)" },
          ],
          focus: "Rising tone for checking; falling tone for confirming",
        },
        {
          num: "89", id: "u89",
          title: "Tones in Asking for Information",
          sources: [
            { level: "Int",   unitId: "unit-56", label: "Unit 56 — Where were you born? (tones in asking for information)" },
          ],
          focus: "Wh-questions typically fall; yes/no questions may rise or fall depending on function",
        },
        {
          num: "90", id: "u90",
          title: "Tones in New and Old Information",
          sources: [
            { level: "Basic", unitId: "unit-44", label: "Unit 44 — Not half past two, half past three (intonation for old and new information)" },
            { level: "Int",   unitId: "unit-57", label: "Unit 57 — We're closed tomorrow (tones in new and old information)" },
          ],
          focus: "New information tends to fall; repeated/given information is de-accented",
        },
        {
          num: "91", id: "u91",
          title: "Continuing or Finishing Tones",
          sources: [
            { level: "Int",   unitId: "unit-58", label: "Unit 58 — Oh, really? (continuing or finishing tones)" },
          ],
          focus: "Rise-fall and falling tones marking completion vs incompletion",
        },
        {
          num: "92", id: "u92",
          title: "Tails",
          sources: [
            { level: "Adv",   unitId: "unit-40", label: "Unit 40 — They taste great…, these biscuits (tails)" },
          ],
          focus: "Post-nucleus additions that do not carry new prominence",
        },
        {
          num: "93", id: "u93",
          title: "Question Tags",
          sources: [
            { level: "Int",   unitId: "unit-59", label: "Unit 59 — It's fun, isn't it? (agreeing and disagreeing tones)" },
            { level: "Adv",   unitId: "unit-41", label: "Unit 41 — Great film…, wasn't it? (question tags)" },
          ],
          focus: "How the tone on a tag signals whether the speaker seeks confirmation or is merely checking",
        },
        {
          num: "94", id: "u94",
          title: "Cleft Sentences",
          sources: [
            { level: "Adv",   unitId: "unit-42", label: "Unit 42 — What I don't understand … is how it got there (cleft sentences)" },
          ],
          focus: "How cleft structures highlight new information with distinctive intonation",
        },
        {
          num: "95", id: "u95",
          title: "Questions (1): Finding Out or Making Sure?",
          sources: [
            { level: "Adv",   unitId: "unit-43", label: "Unit 43 — Finding out or making sure? (questions 1)" },
          ],
          focus: "Same syntax, different tone, different pragmatic function",
        },
        {
          num: "96", id: "u96",
          title: "Questions (2): Negative and Repeat Questions",
          sources: [
            { level: "Adv",   unitId: "unit-44", label: "Unit 44 — Wasn't it terrible? Are you crazy? (questions 2)" },
            { level: "Adv",   unitId: "unit-45", label: "Unit 45 — 'I paid €200,000 for it.' 'How much?' (repeat questions)" },
          ],
          focus: "Negative questions and rhetorical questions; repeat/clarification questions with high-rising tone",
        },
        {
          num: "97", id: "u97",
          title: "Comparisons and Contrasts",
          sources: [
            { level: "Adv",   unitId: "unit-46", label: "Unit 46 — Although I was tired…, I couldn't get to sleep (comparisons and contrasts)" },
          ],
          focus: "How contrastive pairs are prosodically marked; fall-rise as a contrast signal",
        },
        {
          num: "98", id: "u98",
          title: "Contradictions",
          sources: [
            { level: "Adv",   unitId: "unit-47", label: "Unit 47 — 'You were asleep in the class!' 'I WASn't asleep' (contradictions)" },
          ],
          focus: "How speakers use emphatic stress and falling tone to flatly contradict",
        },
        {
          num: "99", id: "u99",
          title: "Requests and Reservation",
          sources: [
            { level: "Adv",   unitId: "unit-48", label: "Unit 48 — You couldn't carry it upSTAIRS for me? (requests and reservation)" },
          ],
          focus: "How polite requests and hedged speech use particular tone patterns",
        },
        {
          num: "100", id: "u100",
          title: "Attitude Words and Phrases (1)",
          sources: [
            { level: "Adv",   unitId: "unit-49", label: "Unit 49 — On the whole…, it went very well (attitude words and phrases 1)" },
          ],
          focus: "Disjuncts and sentence adverbials; their prosodic separation from the main clause",
        },
        {
          num: "101", id: "u101",
          title: "Attitude Words and Phrases (2)",
          sources: [
            { level: "Adv",   unitId: "unit-50", label: "Unit 50 — She just forgot, presumably? (attitude words and phrases 2)" },
          ],
          focus: "Further attitudinal adverbs; how rising tone marks epistemic uncertainty",
        },
        {
          num: "102", id: "u102",
          title: "Exclamations and High Tones",
          sources: [
            { level: "Basic", unitId: "unit-51", label: "Unit 51 — How embarrassing! (exclamations)" },
            { level: "Int",   unitId: "unit-60", label: "Unit 60 — It was brilliant! (high tones)" },
          ],
          focus: "Exclamative structures; wide pitch range; fall-rise or high fall",
        },
        {
          num: "103", id: "u103",
          title: "Intonation in Storytelling",
          sources: [
            { level: "Basic", unitId: "unit-45", label: "Unit 45 — And suddenly… (intonation in storytelling)" },
            { level: "Int",   unitId: "unit-45", label: "Unit 45 — Well, anyway… (telling a story)" },
          ],
          focus: "How narrative structure and suspense are carried by intonation and rhythm",
        },
        {
          num: "104", id: "u104",
          title: "Step-Ups: Contrasts and New Topics",
          sources: [
            { level: "Adv",   unitId: "unit-57", label: "Unit 57 — We expected profits to drop, but they rose (step-ups)" },
          ],
          focus: "Pitch reset upward to signal a new topic or contrastive information",
        },
        {
          num: "105", id: "u105",
          title: "Step-Downs: Adding Information and Ending Topics",
          sources: [
            { level: "Adv",   unitId: "unit-58", label: "Unit 58 — The headteacher, Mr Lee, will be talking to parents (step-downs)" },
          ],
          focus: "Gradual pitch lowering across a topic; final low pitch marking topic closure",
        },
        {
          num: "106", id: "u106",
          title: "Tones in a Series of Similar Items",
          sources: [
            { level: "Adv",   unitId: "unit-59", label: "Unit 59 — Small, medium, and large (tones in a series of similar items)" },
          ],
          focus: "Non-final items rise; final item falls; the universal list intonation pattern",
        },
        {
          num: "107", id: "u107",
          title: "Level Tone in Quoting and Building Suspense",
          sources: [
            { level: "Adv",   unitId: "unit-60", label: "Unit 60 — 'Politicians are the same all over…' (level tone)" },
          ],
          focus: "Flat or mid tone used when reading quotations or withholding information",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XIII — Emphasis and Prominence
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XIII — Emphasis and Prominence",
      icon: "❗",
      color: { accent: "#dc2626", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d", border: "#fca5a5" },
      units: [
        {
          num: "108", id: "u108",
          title: "Emphatic Stress (Introduction)",
          sources: [
            { level: "Int",   unitId: "unit-49", label: "Unit 49 — He *will* win (introduction to emphatic stress)" },
          ],
          focus: "How auxiliary verbs, normally weak, can carry contrastive nuclear stress",
        },
        {
          num: "109", id: "u109",
          title: "Emphasising Added Details",
          sources: [
            { level: "Int",   unitId: "unit-50", label: "Unit 50 — Schwartz … Pedro Schwartz (emphasising added details)" },
          ],
          focus: "Appositives and afterthoughts that receive their own accent",
        },
        {
          num: "110", id: "u110",
          title: "Emphasising Important Words",
          sources: [
            { level: "Int",   unitId: "unit-51", label: "Unit 51 — I think you're in *my* seat (emphasising important words)" },
          ],
          focus: "Nuclear stress on normally unstressed words for contrast or surprise",
        },
        {
          num: "111", id: "u111",
          title: "Emphasising Contrasting Alternatives",
          sources: [
            { level: "Int",   unitId: "unit-52", label: "Unit 52 — Chips or salad? (emphasising contrasting alternatives)" },
          ],
          focus: "Parallel alternatives both receive accent; the 'A or B' intonation pattern",
        },
        {
          num: "112", id: "u112",
          title: "Emphasising Corrections",
          sources: [
            { level: "Int",   unitId: "unit-53", label: "Unit 53 — Fifty? No, fifteen! (emphasising corrections)" },
          ],
          focus: "Contrastive stress on the corrected element; high onset on the correction",
        },
        {
          num: "113", id: "u113",
          title: "Important Words in Conversation (1)",
          sources: [
            { level: "Basic", unitId: "unit-47", label: "Unit 47 — I know when it is, but not where (important words in conversation 1)" },
          ],
          focus: "How speakers stress the contrasted or focused element in an utterance",
        },
        {
          num: "114", id: "u114",
          title: "Important Words in Conversation (2)",
          sources: [
            { level: "Basic", unitId: "unit-48", label: "Unit 48 — Finished? I've just started! (important words in conversation 2)" },
          ],
          focus: "How repeated words are de-stressed and new/contrastive ones are highlighted",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XIV — Conversation Management
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XIV — Conversation Management",
      icon: "🗨️",
      color: { accent: "#c026d3", bg: "#fdf4ff", badge: "#f5d0fe", text: "#701a75", border: "#e879f9" },
      units: [
        {
          num: "115", id: "u115",
          title: "Understanding Conversation",
          sources: [
            { level: "Int",   unitId: "unit-41", label: "Unit 41 — Could you say that again? (understanding conversation)" },
          ],
          focus: "General features of spoken interaction; coping strategies for natural speech",
        },
        {
          num: "116", id: "u116",
          title: "Keeping Conversation Going (Backchannels)",
          sources: [
            { level: "Basic", unitId: "unit-46", label: "Unit 46 — Really? That's amazing! (being a good listener)" },
            { level: "Adv",   unitId: "unit-52", label: "Unit 52 — Mhm, Right, I see (keeping conversation going)" },
          ],
          focus: "Minimal responses that signal active listening without taking a turn",
        },
        {
          num: "117", id: "u117",
          title: "Adding Information and Changing Topic",
          sources: [
            { level: "Adv",   unitId: "unit-53", label: "Unit 53 — On top of that…; Anyway… (adding information and changing topic)" },
          ],
          focus: "Prosodic and lexical signals for topic continuation vs topic shift",
        },
        {
          num: "118", id: "u118",
          title: "Showing You Want to Continue (Hesitation)",
          sources: [
            { level: "Int",   unitId: "unit-44", label: "Unit 44 — Ehm… (showing that you want to continue)" },
          ],
          focus: "Filled pauses and hesitation sounds; how they hold the turn",
        },
        {
          num: "119", id: "u119",
          title: "Understanding Small Talk",
          sources: [
            { level: "Int",   unitId: "unit-46", label: "Unit 46 — I mean, it's sort of like… (understanding small talk)" },
          ],
          focus: "Vague language and hedging in casual conversation; filler phrases",
        },
        {
          num: "120", id: "u120",
          title: "Understanding Instructions",
          sources: [
            { level: "Int",   unitId: "unit-47", label: "Unit 47 — Right, OK… (understanding instructions)" },
          ],
          focus: "Prosodic features of instructional discourse; sequence marking",
        },
        {
          num: "121", id: "u121",
          title: "Quoting Speech",
          sources: [
            { level: "Int",   unitId: "unit-48", label: "Unit 48 — 'Like father like son' as they say (quoting speech)" },
          ],
          focus: "How quoted speech is prosodically set apart from the surrounding discourse",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XV — Accents and Varieties
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XV — Accents and Varieties",
      icon: "🌍",
      color: { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc" },
      units: [
        {
          num: "122", id: "u122",
          title: "Accents (1): Varieties of English",
          sources: [
            { level: "Adv",   unitId: "unit-01", label: "Unit 01 — Accents (1): varieties of English" },
          ],
          focus: "Overview of British, American, Australian, and other major accent types",
        },
        {
          num: "123", id: "u123",
          title: "Accents (2): English as an International Language",
          sources: [
            { level: "Adv",   unitId: "unit-02", label: "Unit 02 — Accents (2): English as an international language" },
          ],
          focus: "World Englishes; intelligibility vs nativeness; ELF perspectives",
        },
        {
          num: "124", id: "u124",
          title: "Guide for Speakers of Specific Languages",
          sources: [
            { level: "Basic", unitId: "unit-e2", label: "E2 — Guide for speakers of specific languages" },
            { level: "Int",   unitId: "unit-d3", label: "D3 — Guide for speakers of specific languages" },
          ],
          focus: "Targeted guidance on difficulties typically experienced by speakers of particular L1s",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XVI — Foreign Words and Loanwords
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XVI — Foreign Words and Loanwords",
      icon: "🌐",
      color: { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46", border: "#bbf7d0" },
      units: [
        {
          num: "125", id: "u125",
          title: "Foreign Words in English",
          sources: [
            { level: "Basic", unitId: "unit-25", label: "Unit 25 — déjà vu, angst, tsunami (foreign words in English)" },
            { level: "Adv",   unitId: "unit-25", label: "Unit 25 — déjà vu, angst, tsunami (foreign words in English)" },
          ],
          focus: "How borrowed words from French, German, Japanese, etc. are adapted phonologically",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XVII — Numbers, Geography, and Practical Reference
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XVII — Numbers, Geography, and Practical Reference",
      icon: "🔢",
      color: { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b", border: "#cbd5e1" },
      units: [
        {
          num: "126", id: "u126",
          title: "Pronouncing Numbers",
          sources: [
            { level: "Basic", unitId: "unit-e6", label: "E6 — Pronouncing numbers" },
          ],
          focus: "Ordinals, cardinals, fractions, decimals, years, phone numbers, etc.",
        },
        {
          num: "127", id: "u127",
          title: "Pronouncing Geographical Names",
          sources: [
            { level: "Basic", unitId: "unit-e7", label: "E7 — Pronouncing geographical names" },
          ],
          focus: "Irregular stress and sound patterns in place names; British vs American variants",
        },
        {
          num: "128", id: "u128",
          title: "The Alphabet",
          sources: [
            { level: "Basic", unitId: "unit-e5", label: "E5 — The alphabet" },
          ],
          focus: "Spelling out loud; letter names and their pronunciation",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION XVIII — Finding Out About Pronunciation
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Section XVIII — Finding Out About Pronunciation",
      icon: "🔍",
      color: { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd" },
      units: [
        {
          num: "129", id: "u129",
          title: "Using Dictionaries for Pronunciation",
          sources: [
            { level: "Adv",   unitId: "unit-03", label: "Unit 03 — Finding out about pronunciation (1): dictionaries" },
          ],
          focus: "How to read phonemic transcriptions; understanding dictionary conventions",
        },
        {
          num: "130", id: "u130",
          title: "Online Pronunciation Resources",
          sources: [
            { level: "Adv",   unitId: "unit-04", label: "Unit 04 — Finding out about pronunciation (2): online resources" },
          ],
          focus: "Corpora, audio tools, YouTube channels, apps; how to build a self-study habit",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // APPENDIX — Diagnostic and Reference Tools
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Appendix — Diagnostic and Reference Tools",
      icon: "📋",
      color: { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b", border: "#cbd5e1" },
      units: [
        {
          num: "A1", id: "ua1",
          title: "Pronunciation Diagnostic Test",
          sources: [
            { level: "Int",   unitId: "unit-d2", label: "D2 — Pronunciation test" },
          ],
          focus: "Self-assessment of strengths and weaknesses across all sound categories",
        },
        {
          num: "A2", id: "ua2",
          title: "Sentence Stress Phrasebook",
          sources: [
            { level: "Int",   unitId: "unit-d5", label: "D5 — Sentence stress phrasebook" },
          ],
          focus: "Common phrases with marked stress; a quick-reference guide for learners",
        },
        {
          num: "A3", id: "ua3",
          title: "Glossary",
          sources: [
            { level: "Int",   unitId: "unit-d6", label: "D6 — Glossary" },
            { level: "Adv",   unitId: "unit-e4", label: "E4 — Glossary" },
          ],
          focus: "Key technical terms in phonetics and phonology defined for learners",
        },
        {
          num: "A4", id: "ua4",
          title: "Further Reading",
          sources: [
            { level: "Adv",   unitId: "unit-e5", label: "E5 — Further reading" },
          ],
          focus: "Recommended books and resources for deeper study of English phonology",
        },
      ],
    },
  ],
};

const totalUnits = bookData.sections.reduce((acc, s) => acc + s.units.length, 0);

// ── Expandable Unit Card ────────────────────────────────────────────────────────
function UnitCard({ unit, sc }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f3f4f6" }}>
      {/* Header row — always visible */}
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
              const lc   = levelColors[src.level] || levelColors.Basic;
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

// ── Main page ───────────────────────────────────────────────────────────────────
export default function UnifiedPronunciationPage() {
  const [user, setUser]     = useState(null);
  const [role, setRole]     = useState(null);
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

  const toggleSec  = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));
  const expandAll  = () => setExpanded(Object.fromEntries(bookData.sections.map((_, i) => [i, true])));
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
            <Link href="/english/pronunciation" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Pronunciation</Link>
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
              <span style={{ fontSize: "32px" }}>📗</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#036c48", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", marginBottom: "10px" }}>
              ✓ Prepared by Akrom Nabi
            </div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>{bookData.title}</h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontWeight: 500 }}>Integrates Elementary · Intermediate · Advanced</p>

            {/* Level legend */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              {[
                { key: "Basic", label: "Elementary" },
                { key: "Int",   label: "Intermediate" },
                { key: "Adv",   label: "Advanced" },
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
                { val: bookData.sections.length, label: "Sections" },
                { val: totalUnits,               label: "Units" },
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
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>{section.units.length} units — click a unit to see sources & focus</p>
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
