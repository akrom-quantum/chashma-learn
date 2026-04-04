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
// BOOK DATA  — Oxford Grammar Course Advanced (Part 1 + Part 2)
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  id:      "oegc-advanced",
  title:   "Oxford Grammar Course",
  level:   "Advanced",
  authors: "Michael Swan",
  cover:   "/books/oegc-advanced.jpg",
  sections: [
    // ── PART 1 ──────────────────────────────────────────────────────────────
    {
      title: "Section 1 — Basic Sentence Types",
      subsections: [
        { label: "Core Topics", unitIds: ["adv-s01-u01","adv-s01-u02","adv-s01-u03","adv-s01-u04","adv-s01-u05","adv-s01-u06","adv-s01-u07","adv-s01-u08","adv-s01-u09"] },
        { label: "Review",      unitIds: ["adv-s01-u10"] },
      ],
      units: [
        { id: "adv-s01-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s01-u02", num: "02", title: "Questions: revise the basics",                subtitle: null },
        { id: "adv-s01-u03", num: "03", title: "Negatives: revise the basics",               subtitle: null },
        { id: "adv-s01-u04", num: "04", title: "not and no",                                 subtitle: null },
        { id: "adv-s01-u05", num: "05", title: "Negative questions",                         subtitle: null },
        { id: "adv-s01-u06", num: "06", title: "More about negatives",                       subtitle: null },
        { id: "adv-s01-u07", num: "07", title: "Imperatives",                                subtitle: null },
        { id: "adv-s01-u08", num: "08", title: "let's; let me etc",                          subtitle: null },
        { id: "adv-s01-u09", num: "09", title: "Exclamations: revise the basics",            subtitle: null },
        { id: "adv-s01-u10", num: "10", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 2 — be, have and do",
      subsections: [
        { label: "Core Topics", unitIds: ["adv-s02-u01","adv-s02-u02","adv-s02-u03","adv-s02-u04","adv-s02-u05","adv-s02-u06"] },
      ],
      units: [
        { id: "adv-s02-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s02-u02", num: "02", title: "be: progressive forms; do be",               subtitle: null },
        { id: "adv-s02-u03", num: "03", title: "there is: revise the basics",                subtitle: null },
        { id: "adv-s02-u04", num: "04", title: "there is: more complex structures",          subtitle: null },
        { id: "adv-s02-u05", num: "05", title: "have: revise the basics",                    subtitle: null },
        { id: "adv-s02-u06", num: "06", title: "do: emphasis",                               subtitle: null },
      ],
    },
    {
      title: "Section 3 — Present and Future",
      subsections: [
        { label: "Present Tenses",  unitIds: ["adv-s03-u01","adv-s03-u02","adv-s03-u03","adv-s03-u04","adv-s03-u05"] },
        { label: "Future Forms",    unitIds: ["adv-s03-u06","adv-s03-u07","adv-s03-u08","adv-s03-u09","adv-s03-u10","adv-s03-u11"] },
        { label: "Review",          unitIds: ["adv-s03-u12"] },
      ],
      units: [
        { id: "adv-s03-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s03-u02", num: "02", title: "Present tenses: revise the basics",          subtitle: null },
        { id: "adv-s03-u03", num: "03", title: "Instructions, commentaries, stories",        subtitle: null },
        { id: "adv-s03-u04", num: "04", title: "More about present tenses",                  subtitle: null },
        { id: "adv-s03-u05", num: "05", title: "Non-progressive verbs",                      subtitle: null },
        { id: "adv-s03-u06", num: "06", title: "Future: revise the basics",                  subtitle: "will, going to or present progressive?" },
        { id: "adv-s03-u07", num: "07", title: "More about the present progressive, going to and will", subtitle: null },
        { id: "adv-s03-u08", num: "08", title: "be + infinitive: I am to … etc",             subtitle: null },
        { id: "adv-s03-u09", num: "09", title: "Future progressive",                         subtitle: null },
        { id: "adv-s03-u10", num: "10", title: "Future perfect",                             subtitle: null },
        { id: "adv-s03-u11", num: "11", title: "Future in the past",                         subtitle: null },
        { id: "adv-s03-u12", num: "12", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 4 — Past and Perfect Tenses",
      subsections: [
        { label: "Past Tenses",   unitIds: ["adv-s04-u01","adv-s04-u02","adv-s04-u03","adv-s04-u04","adv-s04-u05","adv-s04-u06","adv-s04-u07","adv-s04-u08"] },
        { label: "Past Perfect",  unitIds: ["adv-s04-u09","adv-s04-u10","adv-s04-u11","adv-s04-u12"] },
        { label: "Review",        unitIds: ["adv-s04-u13"] },
      ],
      units: [
        { id: "adv-s04-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s04-u02", num: "02", title: "Simple past and past progressive: revise the basics", subtitle: null },
        { id: "adv-s04-u03", num: "03", title: "Present perfect and simple past: revise the basics",  subtitle: null },
        { id: "adv-s04-u04", num: "04", title: "Present perfect progressive: revise the basics",       subtitle: null },
        { id: "adv-s04-u05", num: "05", title: "Simple past and present perfect: summary",   subtitle: null },
        { id: "adv-s04-u06", num: "06", title: "More about simple past and past progressive", subtitle: null },
        { id: "adv-s04-u07", num: "07", title: "More about the present perfect",             subtitle: null },
        { id: "adv-s04-u08", num: "08", title: "More about the present perfect progressive", subtitle: null },
        { id: "adv-s04-u09", num: "09", title: "Past perfect: revise the basics",            subtitle: null },
        { id: "adv-s04-u10", num: "10", title: "More about the past perfect: time conjunctions", subtitle: null },
        { id: "adv-s04-u11", num: "11", title: "Past perfect progressive",                   subtitle: null },
        { id: "adv-s04-u12", num: "12", title: "This is the first time etc",                 subtitle: null },
        { id: "adv-s04-u13", num: "13", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 5 — Modal Verbs",
      subsections: [
        { label: "Core Modals", unitIds: ["adv-s05-u01","adv-s05-u02","adv-s05-u03","adv-s05-u04","adv-s05-u05","adv-s05-u06","adv-s05-u07","adv-s05-u08","adv-s05-u09","adv-s05-u10","adv-s05-u11","adv-s05-u12","adv-s05-u13","adv-s05-u14"] },
        { label: "Review",      unitIds: ["adv-s05-u15"] },
      ],
      units: [
        { id: "adv-s05-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s05-u02", num: "02", title: "Modals: revise the basics",                  subtitle: null },
        { id: "adv-s05-u03", num: "03", title: "Ability: can and could",                     subtitle: null },
        { id: "adv-s05-u04", num: "04", title: "Permission: can, could, may and might",      subtitle: null },
        { id: "adv-s05-u05", num: "05", title: "Obligation: must and have (got) to",         subtitle: null },
        { id: "adv-s05-u06", num: "06", title: "Obligation: should and ought to",            subtitle: null },
        { id: "adv-s05-u07", num: "07", title: "Certainty: must, can't, will, should",       subtitle: null },
        { id: "adv-s05-u08", num: "08", title: "Probability and possibility: may, might, can, could", subtitle: null },
        { id: "adv-s05-u09", num: "09", title: "may have gone, should have told etc",        subtitle: null },
        { id: "adv-s05-u10", num: "10", title: "had better",                                 subtitle: null },
        { id: "adv-s05-u11", num: "11", title: "be supposed to",                             subtitle: null },
        { id: "adv-s05-u12", num: "12", title: "will and would: willingness; typical behaviour", subtitle: null },
        { id: "adv-s05-u13", num: "13", title: "used to",                                    subtitle: null },
        { id: "adv-s05-u14", num: "14", title: "need",                                       subtitle: null },
        { id: "adv-s05-u15", num: "15", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 6 — Passives",
      subsections: [
        { label: "Core Topics", unitIds: ["adv-s06-u01","adv-s06-u02","adv-s06-u03","adv-s06-u04","adv-s06-u05"] },
        { label: "Review",      unitIds: ["adv-s06-u06"] },
      ],
      units: [
        { id: "adv-s06-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s06-u02", num: "02", title: "Revise the basics",                          subtitle: null },
        { id: "adv-s06-u03", num: "03", title: "Reasons for using passives",                 subtitle: null },
        { id: "adv-s06-u04", num: "04", title: "Complex passive structures",                  subtitle: null },
        { id: "adv-s06-u05", num: "05", title: "Other advanced points",                      subtitle: null },
        { id: "adv-s06-u06", num: "06", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 7 — Infinitives and -ing Forms",
      subsections: [
        { label: "Infinitives", unitIds: ["adv-s07-u01","adv-s07-u02","adv-s07-u03","adv-s07-u04","adv-s07-u05","adv-s07-u06","adv-s07-u07","adv-s07-u08","adv-s07-u09","adv-s07-u10","adv-s07-u11","adv-s07-u12"] },
        { label: "Review",      unitIds: ["adv-s07-u13"] },
      ],
      units: [
        { id: "adv-s07-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s07-u02", num: "02", title: "Revise the basics",                          subtitle: null },
        { id: "adv-s07-u03", num: "03", title: "Perfect infinitives and -ing forms",         subtitle: null },
        { id: "adv-s07-u04", num: "04", title: "Infinitive without to",                      subtitle: null },
        { id: "adv-s07-u05", num: "05", title: "Verb + infinitive",                          subtitle: null },
        { id: "adv-s07-u06", num: "06", title: "Verb + -ing form",                           subtitle: null },
        { id: "adv-s07-u07", num: "07", title: "Verb + object + infinitive or -ing form",   subtitle: null },
        { id: "adv-s07-u08", num: "08", title: "Infinitive and -ing form both possible",     subtitle: null },
        { id: "adv-s07-u09", num: "09", title: "phone calls to make; nothing to eat",        subtitle: null },
        { id: "adv-s07-u10", num: "10", title: "Infinitive with its own subject: for … to …", subtitle: null },
        { id: "adv-s07-u11", num: "11", title: "to …ing",                                    subtitle: null },
        { id: "adv-s07-u12", num: "12", title: "Determiners with -ing forms: my speaking etc", subtitle: null },
        { id: "adv-s07-u13", num: "13", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 8 — Various Structures with Verbs",
      subsections: [
        { label: "Core Topics", unitIds: ["adv-s08-u01","adv-s08-u02","adv-s08-u03","adv-s08-u04","adv-s08-u05","adv-s08-u06","adv-s08-u07"] },
        { label: "Review",      unitIds: ["adv-s08-u08"] },
      ],
      units: [
        { id: "adv-s08-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s08-u02", num: "02", title: "Verbs with object + adjective/noun complement", subtitle: null },
        { id: "adv-s08-u03", num: "03", title: "Revise the basics: verbs with prepositions and adverb particles", subtitle: null },
        { id: "adv-s08-u04", num: "04", title: "More about prepositional verbs",             subtitle: null },
        { id: "adv-s08-u05", num: "05", title: "More about phrasal verbs",                   subtitle: null },
        { id: "adv-s08-u06", num: "06", title: "Verbs with two objects",                     subtitle: null },
        { id: "adv-s08-u07", num: "07", title: "Some causative structures with have, get and make", subtitle: null },
        { id: "adv-s08-u08", num: "08", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 9 — Nouns and Pronouns",
      subsections: [
        { label: "Nouns",    unitIds: ["adv-s09-u01","adv-s09-u02","adv-s09-u03","adv-s09-u04","adv-s09-u05","adv-s09-u06","adv-s09-u07","adv-s09-u08"] },
        { label: "Pronouns", unitIds: ["adv-s09-u09","adv-s09-u10","adv-s09-u11","adv-s09-u12","adv-s09-u13"] },
        { label: "Review",   unitIds: ["adv-s09-u14"] },
      ],
      units: [
        { id: "adv-s09-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s09-u02", num: "02", title: "Countable and uncountable",                  subtitle: null },
        { id: "adv-s09-u03", num: "03", title: "Mixed singular and plural",                  subtitle: null },
        { id: "adv-s09-u04", num: "04", title: "Noun + noun or preposition structure",       subtitle: null },
        { id: "adv-s09-u05", num: "05", title: "Possessive structure or other structure",    subtitle: null },
        { id: "adv-s09-u06", num: "06", title: "Nouns for activities: using have, make, do etc", subtitle: null },
        { id: "adv-s09-u07", num: "07", title: "A note on gender: he, she or it?",           subtitle: null },
        { id: "adv-s09-u08", num: "08", title: "Structures after nouns",                     subtitle: null },
        { id: "adv-s09-u09", num: "09", title: "Personal pronouns",                          subtitle: null },
        { id: "adv-s09-u10", num: "10", title: "Reflexives (myself etc); each other / one another", subtitle: null },
        { id: "adv-s09-u11", num: "11", title: "one, you and they (general meaning)",        subtitle: null },
        { id: "adv-s09-u12", num: "12", title: "Singular they",                              subtitle: null },
        { id: "adv-s09-u13", num: "13", title: "one(s)",                                     subtitle: null },
        { id: "adv-s09-u14", num: "14", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 10 — Determiners (1): Articles, Demonstratives and Possessives",
      subsections: [
        { label: "Articles", unitIds: ["adv-s10-u01","adv-s10-u02","adv-s10-u03","adv-s10-u04","adv-s10-u05","adv-s10-u06","adv-s10-u07"] },
        { label: "Review",   unitIds: ["adv-s10-u08"] },
      ],
      units: [
        { id: "adv-s10-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s10-u02", num: "02", title: "Articles: preliminary note",                 subtitle: null },
        { id: "adv-s10-u03", num: "03", title: "Articles: revise the basics",                subtitle: null },
        { id: "adv-s10-u04", num: "04", title: "More about generalising with a/an and the", subtitle: null },
        { id: "adv-s10-u05", num: "05", title: "Articles: other points",                     subtitle: null },
        { id: "adv-s10-u06", num: "06", title: "Demonstratives: this, that, these, those",  subtitle: null },
        { id: "adv-s10-u07", num: "07", title: "Possessives: my, mine etc",                 subtitle: null },
        { id: "adv-s10-u08", num: "08", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 11 — Determiners (2): Quantifiers",
      subsections: [
        { label: "Quantifiers", unitIds: ["adv-s11-u01","adv-s11-u02","adv-s11-u03","adv-s11-u04","adv-s11-u05","adv-s11-u06","adv-s11-u07","adv-s11-u08","adv-s11-u09","adv-s11-u10","adv-s11-u11","adv-s11-u12","adv-s11-u13","adv-s11-u14","adv-s11-u15"] },
        { label: "Review",      unitIds: ["adv-s11-u16"] },
      ],
      units: [
        { id: "adv-s11-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s11-u02", num: "02", title: "all",                                        subtitle: null },
        { id: "adv-s11-u03", num: "03", title: "whole and all",                              subtitle: null },
        { id: "adv-s11-u04", num: "04", title: "both",                                       subtitle: null },
        { id: "adv-s11-u05", num: "05", title: "either and neither",                         subtitle: null },
        { id: "adv-s11-u06", num: "06", title: "every and each",                             subtitle: null },
        { id: "adv-s11-u07", num: "07", title: "some, any, no, none: revise the basics",     subtitle: null },
        { id: "adv-s11-u08", num: "08", title: "some/any or no article",                     subtitle: null },
        { id: "adv-s11-u09", num: "09", title: "More about some",                            subtitle: null },
        { id: "adv-s11-u10", num: "10", title: "More about any and no",                      subtitle: null },
        { id: "adv-s11-u11", num: "11", title: "much, many, more and most",                  subtitle: null },
        { id: "adv-s11-u12", num: "12", title: "little, few, less, fewer, least and fewest", subtitle: null },
        { id: "adv-s11-u13", num: "13", title: "enough",                                     subtitle: null },
        { id: "adv-s11-u14", num: "14", title: "Quantifying phrases",                        subtitle: null },
        { id: "adv-s11-u15", num: "15", title: "of with quantifiers",                        subtitle: null },
        { id: "adv-s11-u16", num: "16", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 12 — Adjectives, Adverbs and Comparison",
      subsections: [
        { label: "Adjectives",  unitIds: ["adv-s12-u01","adv-s12-u02","adv-s12-u03","adv-s12-u04","adv-s12-u05","adv-s12-u06","adv-s12-u07"] },
        { label: "Adverbs",     unitIds: ["adv-s12-u08","adv-s12-u09"] },
        { label: "Comparison",  unitIds: ["adv-s12-u10","adv-s12-u11","adv-s12-u12","adv-s12-u13","adv-s12-u14","adv-s12-u15","adv-s12-u16","adv-s12-u17","adv-s12-u18"] },
        { label: "Review",      unitIds: ["adv-s12-u19"] },
      ],
      units: [
        { id: "adv-s12-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s12-u02", num: "02", title: "Adjective or adverb?",                       subtitle: null },
        { id: "adv-s12-u03", num: "03", title: "Adjectives: order",                          subtitle: null },
        { id: "adv-s12-u04", num: "04", title: "Position of adjectives",                     subtitle: null },
        { id: "adv-s12-u05", num: "05", title: "Participles used as adjectives",             subtitle: null },
        { id: "adv-s12-u06", num: "06", title: "Adjectives without nouns",                   subtitle: null },
        { id: "adv-s12-u07", num: "07", title: "Structures after adjectives",                subtitle: null },
        { id: "adv-s12-u08", num: "08", title: "Adverb position (1)",                        subtitle: null },
        { id: "adv-s12-u09", num: "09", title: "Adverb position (2): with the verb",        subtitle: null },
        { id: "adv-s12-u10", num: "10", title: "Comparison: as … as",                       subtitle: null },
        { id: "adv-s12-u11", num: "11", title: "-er and -est or more and most?",             subtitle: null },
        { id: "adv-s12-u12", num: "12", title: "Double comparative structures",              subtitle: null },
        { id: "adv-s12-u13", num: "13", title: "More about comparatives",                    subtitle: null },
        { id: "adv-s12-u14", num: "14", title: "More about superlatives",                    subtitle: null },
        { id: "adv-s12-u15", num: "15", title: "much, far etc with comparatives and superlatives", subtitle: null },
        { id: "adv-s12-u16", num: "16", title: "much in affirmative sentences?",             subtitle: null },
        { id: "adv-s12-u17", num: "17", title: "such and so",                                subtitle: null },
        { id: "adv-s12-u18", num: "18", title: "like and as",                                subtitle: null },
        { id: "adv-s12-u19", num: "19", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 13 — Prepositions",
      subsections: [
        { label: "Core Topics", unitIds: ["adv-s13-u01","adv-s13-u02","adv-s13-u03","adv-s13-u04","adv-s13-u05","adv-s13-u06","adv-s13-u07","adv-s13-u08","adv-s13-u09"] },
        { label: "Review",      unitIds: ["adv-s13-u10"] },
      ],
      units: [
        { id: "adv-s13-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s13-u02", num: "02", title: "Time: revise the basics",                    subtitle: null },
        { id: "adv-s13-u03", num: "03", title: "in and on (place): revise the basics",       subtitle: null },
        { id: "adv-s13-u04", num: "04", title: "at (place and movement): revise the basics", subtitle: null },
        { id: "adv-s13-u05", num: "05", title: "Prepositions with -ing forms",               subtitle: null },
        { id: "adv-s13-u06", num: "06", title: "End-position of prepositions",               subtitle: null },
        { id: "adv-s13-u07", num: "07", title: "Prepositions before conjunctions",           subtitle: null },
        { id: "adv-s13-u08", num: "08", title: "Six confusable prepositions",                subtitle: null },
        { id: "adv-s13-u09", num: "09", title: "Six more confusable prepositions",           subtitle: null },
        { id: "adv-s13-u10", num: "10", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 14 — Conjunctions, Clauses and Tenses",
      subsections: [
        { label: "Core Topics", unitIds: ["adv-s14-u01","adv-s14-u02","adv-s14-u03","adv-s14-u04","adv-s14-u05","adv-s14-u06"] },
        { label: "Review",      unitIds: ["adv-s14-u07"] },
      ],
      units: [
        { id: "adv-s14-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s14-u02", num: "02", title: "Conjunctions: revise the basics",            subtitle: null },
        { id: "adv-s14-u03", num: "03", title: "and and or",                                 subtitle: null },
        { id: "adv-s14-u04", num: "04", title: "Double conjunctions: both …and; (n)either … (n)or", subtitle: null },
        { id: "adv-s14-u05", num: "05", title: "Tense simplification after conjunctions",    subtitle: null },
        { id: "adv-s14-u06", num: "06", title: "Past tense with present or future meaning",  subtitle: null },
        { id: "adv-s14-u07", num: "07", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 15 — Adjective (Relative) Clauses",
      subsections: [
        { label: "Core Topics", unitIds: ["adv-s15-u01","adv-s15-u02","adv-s15-u03","adv-s15-u04","adv-s15-u05","adv-s15-u06"] },
        { label: "Review",      unitIds: ["adv-s15-u07"] },
      ],
      units: [
        { id: "adv-s15-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s15-u02", num: "02", title: "Relatives: revise the basics",               subtitle: null },
        { id: "adv-s15-u03", num: "03", title: "Identifying and non-identifying relative clauses", subtitle: null },
        { id: "adv-s15-u04", num: "04", title: "Reduced relative clauses",                   subtitle: null },
        { id: "adv-s15-u05", num: "05", title: "Prepositions in relative clauses",           subtitle: null },
        { id: "adv-s15-u06", num: "06", title: "Relatives: other points",                    subtitle: null },
        { id: "adv-s15-u07", num: "07", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 16 — Noun Clauses",
      subsections: [
        { label: "Indirect Speech", unitIds: ["adv-s16-u01","adv-s16-u02","adv-s16-u03","adv-s16-u04"] },
        { label: "that-Clauses",    unitIds: ["adv-s16-u05","adv-s16-u06","adv-s16-u07","adv-s16-u08","adv-s16-u09"] },
        { label: "Review",          unitIds: ["adv-s16-u10"] },
      ],
      units: [
        { id: "adv-s16-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s16-u02", num: "02", title: "Indirect speech: revise the basics",         subtitle: null },
        { id: "adv-s16-u03", num: "03", title: "Indirect speech: more about tenses",         subtitle: null },
        { id: "adv-s16-u04", num: "04", title: "Indirect speech: other points",              subtitle: null },
        { id: "adv-s16-u05", num: "05", title: "Verbs in that-clauses: subjunctives",        subtitle: null },
        { id: "adv-s16-u06", num: "06", title: "Verbs in that-clauses: should",              subtitle: null },
        { id: "adv-s16-u07", num: "07", title: "More about that-clauses",                    subtitle: null },
        { id: "adv-s16-u08", num: "08", title: "More about question-word clauses",           subtitle: null },
        { id: "adv-s16-u09", num: "09", title: "Preparatory it",                             subtitle: null },
        { id: "adv-s16-u10", num: "10", title: "More practice",                              subtitle: "Review" },
      ],
    },
    {
      title: "Section 17 — Adverb Clauses",
      subsections: [
        { label: "Conditionals",       unitIds: ["adv-s17-u01","adv-s17-u02","adv-s17-u03","adv-s17-u04","adv-s17-u05","adv-s17-u06","adv-s17-u07"] },
        { label: "Other Adverb Clauses", unitIds: ["adv-s17-u08","adv-s17-u09","adv-s17-u10","adv-s17-u11","adv-s17-u12"] },
        { label: "Review",             unitIds: ["adv-s17-u13"] },
      ],
      units: [
        { id: "adv-s17-u01", num: "01", title: "Introduction",                               subtitle: null },
        { id: "adv-s17-u02", num: "02", title: "if: how many 'conditionals'?",               subtitle: null },
        { id: "adv-s17-u03", num: "03", title: "if: revise the basics",                      subtitle: null },
        { id: "adv-s17-u04", num: "04", title: "unless",                                     subtitle: null },
        { id: "adv-s17-u05", num: "05", title: "if and in case",                             subtitle: null },
        { id: "adv-s17-u06", num: "06", title: "if: more advanced points",                   subtitle: null },
        { id: "adv-s17-u07", num: "07", title: "if: informal structures",                    subtitle: null },
        { id: "adv-s17-u08", num: "08", title: "Notes on some conjunctions",                 subtitle: null },
        { id: "adv-s17-u09", num: "09", title: "whoever, whatever, wherever etc",            subtitle: null },
        { id: "adv-s17-u10", num: "10", title: "Participle clauses",                         subtitle: null },
        { id: "adv-s17-u11", num: "11", title: "after …ing, on …ing etc",                   subtitle: null },
        { id: "adv-s17-u12", num: "12", title: "Infinitive clauses",                         subtitle: null },
        { id: "adv-s17-u13", num: "13", title: "More practice",                              subtitle: "Review" },
      ],
    },

    // ── PART 2 ──────────────────────────────────────────────────────────────
    {
      title: "Part 2 — Information Structure",
      subsections: [
        { label: "Information & Word Order", unitIds: ["adv-p2-u01","adv-p2-u02","adv-p2-u03","adv-p2-u04","adv-p2-u05","adv-p2-u06","adv-p2-u07","adv-p2-u08"] },
      ],
      units: [
        { id: "adv-p2-u01", num: "01", title: "Information structure: what comes first?",    subtitle: null },
        { id: "adv-p2-u02", num: "02", title: "Information structure: getting the right subject", subtitle: null },
        { id: "adv-p2-u03", num: "03", title: "Pronoun problems",                            subtitle: null },
        { id: "adv-p2-u04", num: "04", title: "Linking clauses with conjunctions and adverbs", subtitle: null },
        { id: "adv-p2-u05", num: "05", title: "Special word order: fronting",                subtitle: null },
        { id: "adv-p2-u06", num: "06", title: "Special word order: inversion",               subtitle: null },
        { id: "adv-p2-u07", num: "07", title: "Emphasis: it … that",                        subtitle: null },
        { id: "adv-p2-u08", num: "08", title: "Emphasis: what … is/was",                    subtitle: null },
      ],
    },
    {
      title: "Part 2 — Discourse and Complex Sentences",
      subsections: [
        { label: "Discourse & Structure", unitIds: ["adv-p2-u09","adv-p2-u10","adv-p2-u11","adv-p2-u12"] },
      ],
      units: [
        { id: "adv-p2-u09", num: "09", title: "Discourse markers",                           subtitle: null },
        { id: "adv-p2-u10", num: "10", title: "Reading complicated sentences",               subtitle: null },
        { id: "adv-p2-u11", num: "11", title: "Complex noun phrases in writing",             subtitle: null },
        { id: "adv-p2-u12", num: "12", title: "Mixed structures",                            subtitle: null },
      ],
    },
    {
      title: "Part 2 — Ellipsis",
      subsections: [
        { label: "Ellipsis Forms", unitIds: ["adv-p2-u13","adv-p2-u14","adv-p2-u15","adv-p2-u16","adv-p2-u17"] },
      ],
      units: [
        { id: "adv-p2-u13", num: "13", title: "Ellipsis after auxiliaries",                  subtitle: null },
        { id: "adv-p2-u14", num: "14", title: "Ellipsis with infinitives",                   subtitle: null },
        { id: "adv-p2-u15", num: "15", title: "Ellipsis with so and not",                    subtitle: null },
        { id: "adv-p2-u16", num: "16", title: "Ellipsis after and, but and or",              subtitle: null },
        { id: "adv-p2-u17", num: "17", title: "Ellipsis at the beginning of spoken sentences", subtitle: null },
      ],
    },
    {
      title: "Part 2 — Spoken Grammar",
      subsections: [
        { label: "Spoken Structures", unitIds: ["adv-p2-u18","adv-p2-u19","adv-p2-u20","adv-p2-u21","adv-p2-u22","adv-p2-u23","adv-p2-u24","adv-p2-u25","adv-p2-u26"] },
      ],
      units: [
        { id: "adv-p2-u18", num: "18", title: "The structure of spoken sentences",           subtitle: null },
        { id: "adv-p2-u19", num: "19", title: "Short answers, reply questions and question tags", subtitle: null },
        { id: "adv-p2-u20", num: "20", title: "Three kinds of spoken question",              subtitle: null },
        { id: "adv-p2-u21", num: "21", title: "Politeness: using questions",                 subtitle: null },
        { id: "adv-p2-u22", num: "22", title: "Politeness: being indirect",                  subtitle: null },
        { id: "adv-p2-u23", num: "23", title: "Emphasis in speech: stress",                  subtitle: null },
        { id: "adv-p2-u24", num: "24", title: "Repetition",                                  subtitle: null },
        { id: "adv-p2-u25", num: "25", title: "Abbreviated styles",                          subtitle: null },
        { id: "adv-p2-u26", num: "26", title: "News headlines",                              subtitle: null },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Derived indices (same logic as intermediate)
// ─────────────────────────────────────────────────────────────────────────────
const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length;

let _idx = 0;
const unitIndexMap = {};
bookData.sections.forEach((sec) =>
  sec.units.forEach((u) => { unitIndexMap[u.id] = ++_idx; })
);

// ─────────────────────────────────────────────────────────────────────────────
// Section colour palette (same 22-slot palette; Part-2 sections reuse slots)
// ─────────────────────────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "📌" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc", icon: "⏱️" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "🔮" },
  { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#7f1d1d", border: "#fda4af", icon: "📅" },
  { accent: "#065f46", bg: "#f0fdf4", badge: "#d1fae5", text: "#022c22", border: "#6ee7b7", icon: "✅" },
  { accent: "#92400e", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "🔧" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🔗" },
  { accent: "#6d28d9", bg: "#f5f3ff", badge: "#ede9fe", text: "#3b0764", border: "#c4b5fd", icon: "⚙️" },
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#ccfbf1", text: "#042f2e", border: "#5eead4", icon: "👤" },
  { accent: "#a16207", bg: "#fefce8", badge: "#fef9c3", text: "#713f12", border: "#fde047", icon: "📖" },
  { accent: "#9d174d", bg: "#fff1f2", badge: "#fce7f3", text: "#500724", border: "#f9a8d4", icon: "🎯" },
  { accent: "#15803d", bg: "#f0fdf4", badge: "#dcfce7", text: "#052e16", border: "#86efac", icon: "📊" },
  { accent: "#4338ca", bg: "#eef2ff", badge: "#e0e7ff", text: "#1e1b4b", border: "#a5b4fc", icon: "✍️" },
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12", border: "#fb923c", icon: "🔀" },
  { accent: "#0e7490", bg: "#ecfeff", badge: "#cffafe", text: "#083344", border: "#67e8f9", icon: "❔" },
  { accent: "#5b21b6", bg: "#f5f3ff", badge: "#ddd6fe", text: "#2e1065", border: "#a78bfa", icon: "🔍" },
  { accent: "#1e40af", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a", border: "#60a5fa", icon: "💬" },
  { accent: "#065f46", bg: "#ecfdf5", badge: "#d1fae5", text: "#022c22", border: "#34d399", icon: "📍" },
  { accent: "#6b21a8", bg: "#faf5ff", badge: "#f3e8ff", text: "#3b0764", border: "#d8b4fe", icon: "🗣️" },
  { accent: "#9a3412", bg: "#fff7ed", badge: "#fdba74", text: "#7c2d12", border: "#fb923c", icon: "✂️" },
  { accent: "#1d4ed8", bg: "#f0f9ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🎙️" },
];

const subsectionColors = [
  { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  { bg: "#dbeafe", text: "#1e3a5f", border: "#93c5fd" },
  { bg: "#fce7f3", text: "#831843", border: "#f9a8d4" },
  { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
];

// ─────────────────────────────────────────────────────────────────────────────
// UnitRow component (identical to intermediate)
// ─────────────────────────────────────────────────────────────────────────────
function UnitRow({ unit, isFree, locked, sc, isLast, path }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={locked ? "#" : path}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "13px 20px", textDecoration: "none",
        backgroundColor: locked ? "#fafafa" : hovered ? sc.bg : "#ffffff",
        borderBottom: isLast ? "none" : "1px solid #f3f4f6",
        opacity: locked ? 0.65 : 1,
        cursor: locked ? "not-allowed" : "pointer",
        transition: "background-color 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "38px", height: "38px", borderRadius: "8px",
          backgroundColor: locked ? "#f3f4f6" : sc.badge,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 800,
          color: locked ? "#9ca3af" : sc.text,
          flexShrink: 0, letterSpacing: "-0.3px",
        }}>
          {unit.num}
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
            {unit.title}
          </p>
          {unit.subtitle && (
            <p style={{ fontSize: "12px", color: locked ? "#d1d5db" : sc.accent, margin: "3px 0 0", fontWeight: 500, fontFamily: "monospace" }}>
              {unit.subtitle}
            </p>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {isFree && (
          <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>
            FREE
          </span>
        )}
        {locked
          ? <span style={{ fontSize: "15px" }}>🔒</span>
          : <span style={{ fontSize: "16px", color: "#d1d5db" }}>›</span>
        }
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────
export default function OEGCAdvancedPage() {
  const [user, setUser]         = useState(null);
  const [role, setRole]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState(
    Object.fromEntries(bookData.sections.map((_, i) => [i, true]))
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

  const isLearner = role === "learner" || role === "admin" || role === "owner";
  const toggleSec = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

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

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* BOOK HEADER */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "40px" }}>
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "1px solid #d1d5db", flexShrink: 0 }}>
            <img src={bookData.cover} alt={bookData.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📗</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#ddd6fe", color: "#4c1d95", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              ADVANCED
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>{bookData.title}</h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {[
                { val: bookData.sections.length, label: "Sections" },
                { val: totalUnits,               label: "Units" },
                { val: 3,                        label: "Free units", hi: true },
              ].map(({ val, label, hi }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: hi ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
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

        {/* UPGRADE BANNER */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, lineHeight: 1.5 }}>
              Units 1–3 are free. <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link> to unlock all {totalUnits} units.
            </p>
          </div>
        )}

        {/* SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bookData.sections.map((section, si) => {
            const sc     = sectionColors[si % sectionColors.length];
            const isOpen = expanded[si] !== false;

            const subsecMap = {};
            if (section.subsections) {
              section.subsections.forEach((sub, subIdx) => {
                sub.unitIds.forEach((uid) => { subsecMap[uid] = { label: sub.label, colorIdx: subIdx }; });
              });
            }

            return (
              <div key={si} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.border : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>
                <button
                  onClick={() => toggleSec(si)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{sc.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: sc.text, margin: 0 }}>{section.title}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>{section.units.length} units</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.border}` }}>
                    {(() => {
                      let lastLabel = null;
                      return section.units.map((unit, ui) => {
                        const gIdx   = unitIndexMap[unit.id];
                        const isFree = gIdx <= 3;
                        const locked = !isLearner && !isFree;
                        const sub    = subsecMap[unit.id];
                        const showSub = sub && sub.label !== lastLabel;
                        if (showSub) lastLabel = sub.label;
                        const subColor = sub ? subsectionColors[sub.colorIdx % subsectionColors.length] : null;

                        return (
                          <div key={unit.id}>
                            {showSub && (
                              <div style={{ padding: "7px 20px", backgroundColor: subColor.bg, borderTop: ui === 0 ? "none" : `1px solid ${sc.border}`, borderBottom: `1px solid ${subColor.border}` }}>
                                <span style={{ fontSize: "10px", fontWeight: 800, color: subColor.text, textTransform: "uppercase", letterSpacing: "0.6px" }}>{sub.label}</span>
                              </div>
                            )}
                            <UnitRow
                              unit={unit} isFree={isFree} locked={locked} sc={sc}
                              isLast={ui === section.units.length - 1}
                              path={`/english/grammar/oegc-advanced/${unit.id}`}
                            />
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>Unlock all {totalUnits} units</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Full access to every unit, grammar explanations, and practice exercises.</p>
            <Link href="/dashboard" style={{ display: "inline-block", backgroundColor: "#059669", color: "#ffffff", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}>
              Upgrade to Learner
            </Link>
          </div>
        )}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
