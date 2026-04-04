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

const bookData = {
  id:      "oegc-basic",
  title:   "Oxford English Grammar Course",
  level:   "Basic",
  authors: "Michael Swan & Catherine Walter",
  cover:   "/books/oegc-basic.jpg",
  sections: [
    {
      title: "Section 1 — be and have",
      subsections: [
        { label: "be",     unitIds: ["unit-01", "unit-02", "unit-03", "unit-04", "unit-05"] },
        { label: "have",   unitIds: ["unit-06", "unit-07", "unit-08", "unit-09"] },
        { label: "Review", unitIds: ["unit-10", "unit-11"] },
      ],
      units: [
        { id: "unit-01", num: "01", title: "I am happy today. Are we late?",             subtitle: "be: present" },
        { id: "unit-02", num: "02", title: "Where were you? I was in Glasgow.",           subtitle: "be: past" },
        { id: "unit-03", num: "03", title: "The bus will be full.",                       subtitle: "be: future" },
        { id: "unit-04", num: "04", title: "There's a dog in the garden.",               subtitle: "there is/was" },
        { id: "unit-05", num: "05", title: "Will there be cars?",                        subtitle: "there is: future" },
        { id: "unit-06", num: "06", title: "I have / do you have? / I don't have",       subtitle: "have: present" },
        { id: "unit-07", num: "07", title: "have: past and future",                      subtitle: null },
        { id: "unit-08", num: "08", title: "He's having a shower.",                      subtitle: "have: actions" },
        { id: "unit-09", num: "09", title: "Have you got a cat?",                        subtitle: "have got" },
        { id: "unit-10", num: "10", title: "be and have: more practice",                 subtitle: null },
        { id: "unit-11", num: "11", title: "be and have: revision test",                 subtitle: null },
      ],
    },
    {
      title: "Section 2 — Present Tenses",
      subsections: [
        { label: "Simple Present",        unitIds: ["unit-12", "unit-13", "unit-14", "unit-15", "unit-16"] },
        { label: "Present Progressive",   unitIds: ["unit-17", "unit-18", "unit-19", "unit-20", "unit-21"] },
        { label: "Combined & Special",    unitIds: ["unit-22", "unit-23", "unit-24", "unit-25"] },
      ],
      units: [
        { id: "unit-12", num: "12", title: "I work; you work; she works",                subtitle: "Simple present affirmative" },
        { id: "unit-13", num: "13", title: "I work in a bank.",                          subtitle: "Simple present: use" },
        { id: "unit-14", num: "14", title: "I don't know. She doesn't ski.",             subtitle: "Simple present negatives" },
        { id: "unit-15", num: "15", title: "Do you remember me?",                       subtitle: "Simple present questions" },
        { id: "unit-16", num: "16", title: "Simple present: more practice",             subtitle: null },
        { id: "unit-17", num: "17", title: "I'm reading. I'm not working.",             subtitle: "Present progressive: forms" },
        { id: "unit-18", num: "18", title: "I'm working just now.",                     subtitle: "Present progressive: use" },
        { id: "unit-19", num: "19", title: "He's not listening to me.",                 subtitle: "Present progressive negatives" },
        { id: "unit-20", num: "20", title: "Is it raining?",                            subtitle: "Present progressive questions" },
        { id: "unit-21", num: "21", title: "Present progressive: more practice",        subtitle: null },
        { id: "unit-22", num: "22", title: "The two present tenses: the difference",    subtitle: null },
        { id: "unit-23", num: "23", title: "I don't understand.",                       subtitle: "Non-progressive verbs" },
        { id: "unit-24", num: "24", title: "Present tenses: more practice",             subtitle: null },
        { id: "unit-25", num: "25", title: "Present tenses: revision test",             subtitle: null },
      ],
    },
    {
      title: "Section 3 — Talking About the Future",
      subsections: [
        { label: "going to & Present Progressive", unitIds: ["unit-26", "unit-27"] },
        { label: "will",                           unitIds: ["unit-28", "unit-29"] },
        { label: "Simple Present for Future",      unitIds: ["unit-30"] },
        { label: "Review",                         unitIds: ["unit-31", "unit-32"] },
      ],
      units: [
        { id: "unit-26", num: "26", title: "Look – it's going to rain.",                subtitle: "going to" },
        { id: "unit-27", num: "27", title: "What are you doing this evening?",          subtitle: "Present progressive for future" },
        { id: "unit-28", num: "28", title: "I think it will rain tomorrow.",            subtitle: "will: predicting" },
        { id: "unit-29", num: "29", title: "I'll answer it.",                           subtitle: "will: deciding, refusing, promising" },
        { id: "unit-30", num: "30", title: "Our train leaves at 8.10.",                 subtitle: "Simple present for future" },
        { id: "unit-31", num: "31", title: "Future: more practice",                    subtitle: null },
        { id: "unit-32", num: "32", title: "Future: revision test",                    subtitle: null },
      ],
    },
    {
      title: "Section 4 — Past Tenses",
      subsections: [
        { label: "Simple Past",     unitIds: ["unit-33", "unit-34", "unit-35", "unit-36", "unit-37"] },
        { label: "Past Progressive", unitIds: ["unit-38", "unit-39"] },
        { label: "Review",           unitIds: ["unit-40", "unit-41"] },
      ],
      units: [
        { id: "unit-33", num: "33", title: "I worked. I went.",                         subtitle: "Simple past: forms" },
        { id: "unit-34", num: "34", title: "I left school in 1990.",                    subtitle: "Simple past: use" },
        { id: "unit-35", num: "35", title: "I did not work. I did not go.",             subtitle: "Simple past: negatives" },
        { id: "unit-36", num: "36", title: "Did you pay? What did she say?",            subtitle: "Simple past questions" },
        { id: "unit-37", num: "37", title: "Simple past: more practice",               subtitle: null },
        { id: "unit-38", num: "38", title: "What were you doing at 8.00?",             subtitle: "Past progressive" },
        { id: "unit-39", num: "39", title: "I walked / I was walking",                 subtitle: "Simple past or past progressive?" },
        { id: "unit-40", num: "40", title: "Past tenses: more practice",               subtitle: null },
        { id: "unit-41", num: "41", title: "Past tenses: revision test",               subtitle: null },
      ],
    },
    {
      title: "Section 5 — Perfect Tenses",
      subsections: [
        { label: "Present Perfect", unitIds: ["unit-42", "unit-43", "unit-44", "unit-45", "unit-46", "unit-47"] },
        { label: "Past Perfect",    unitIds: ["unit-48"] },
        { label: "Review",          unitIds: ["unit-49", "unit-50"] },
      ],
      units: [
        { id: "unit-42", num: "42", title: "I have paid. Has she forgotten?",          subtitle: "Present perfect: forms" },
        { id: "unit-43", num: "43", title: "Finished actions: present perfect or simple past?", subtitle: null },
        { id: "unit-44", num: "44", title: "Time words: present perfect or simple past?", subtitle: null },
        { id: "unit-45", num: "45", title: "already, yet and just",                   subtitle: null },
        { id: "unit-46", num: "46", title: "since Tuesday; for ten years",             subtitle: "since and for" },
        { id: "unit-47", num: "47", title: "It's been raining since Sunday.",          subtitle: "Present perfect progressive" },
        { id: "unit-48", num: "48", title: "It had already begun when we arrived.",    subtitle: "Past perfect" },
        { id: "unit-49", num: "49", title: "Perfect tenses: more practice",           subtitle: null },
        { id: "unit-50", num: "50", title: "Perfect tenses: revision test",           subtitle: null },
      ],
    },
    {
      title: "Section 6 — Modal Verbs",
      subsections: [
        { label: "Core Modals", unitIds: ["unit-51","unit-52","unit-53","unit-54","unit-55","unit-56","unit-57","unit-58","unit-59","unit-60","unit-61","unit-62","unit-63","unit-64"] },
        { label: "Review",      unitIds: ["unit-65", "unit-66"] },
      ],
      units: [
        { id: "unit-51", num: "51", title: "can, must, should etc.",                   subtitle: "Modal verbs: introduction" },
        { id: "unit-52", num: "52", title: "You must be home by eleven.",               subtitle: "must" },
        { id: "unit-53", num: "53", title: "Do you have to teach small children?",     subtitle: "have to" },
        { id: "unit-54", num: "54", title: "We mustn't wake the baby.",                subtitle: "mustn't and don't have to" },
        { id: "unit-55", num: "55", title: "I didn't have to pay.",                    subtitle: "had to, will have to" },
        { id: "unit-56", num: "56", title: "What should I tell John?",                 subtitle: "should" },
        { id: "unit-57", num: "57", title: "He can play the piano.",                   subtitle: "can" },
        { id: "unit-58", num: "58", title: "She couldn't write. I'll be able to drive.", subtitle: "could; be able to" },
        { id: "unit-59", num: "59", title: "It may snow. I might have a cold.",        subtitle: "may and might" },
        { id: "unit-60", num: "60", title: "Can I use the phone?",                     subtitle: "can, could and may: permission" },
        { id: "unit-61", num: "61", title: "Can you lend me a stamp?",                 subtitle: "can/could you?: requests" },
        { id: "unit-62", num: "62", title: "What shall we do?",                        subtitle: "shall in questions" },
        { id: "unit-63", num: "63", title: "Would you like a drink?",                  subtitle: "would" },
        { id: "unit-64", num: "64", title: "I used to play the piano.",                subtitle: "used to" },
        { id: "unit-65", num: "65", title: "Modal verbs: more practice",              subtitle: null },
        { id: "unit-66", num: "66", title: "Modal verbs: revision test",              subtitle: null },
      ],
    },
    {
      title: "Section 7 — Passives",
      subsections: [
        { label: "Forms",  unitIds: ["unit-67","unit-68","unit-69","unit-70","unit-71","unit-72"] },
        { label: "Review", unitIds: ["unit-73", "unit-74"] },
      ],
      units: [
        { id: "unit-67", num: "67", title: "English is spoken in Australia.",           subtitle: "Passives: introduction" },
        { id: "unit-68", num: "68", title: "We are woken by the birds.",                subtitle: "Simple present passive" },
        { id: "unit-69", num: "69", title: "Tomorrow your bicycle will be stolen.",     subtitle: "Future passive" },
        { id: "unit-70", num: "70", title: "I was stopped by a policeman.",             subtitle: "Simple past passive" },
        { id: "unit-71", num: "71", title: "It's being cleaned.",                       subtitle: "Present progressive passive" },
        { id: "unit-72", num: "72", title: "The house has been sold.",                  subtitle: "Present perfect passive" },
        { id: "unit-73", num: "73", title: "Passives: more practice",                  subtitle: null },
        { id: "unit-74", num: "74", title: "Passives: revision test",                  subtitle: null },
      ],
    },
    {
      title: "Section 8 — Questions and Negatives",
      subsections: [
        { label: "Questions", unitIds: ["unit-75","unit-76","unit-77","unit-78","unit-79"] },
        { label: "Negatives", unitIds: ["unit-80","unit-81","unit-82"] },
        { label: "Review",    unitIds: ["unit-83","unit-84"] },
      ],
      units: [
        { id: "unit-75", num: "75", title: "Is the taxi here? Do I need a visa?",       subtitle: "yes/no questions" },
        { id: "unit-76", num: "76", title: "When will you see her?",                    subtitle: "Question words" },
        { id: "unit-77", num: "77", title: "Who phoned? What happened?",                subtitle: "Question-word subjects" },
        { id: "unit-78", num: "78", title: "Are Ann and her mother coming?",             subtitle: "Questions with long subjects" },
        { id: "unit-79", num: "79", title: "Who did you go with?",                      subtitle: "Prepositions in questions" },
        { id: "unit-80", num: "80", title: "Dogs can't fly. I don't know why.",         subtitle: "Negatives" },
        { id: "unit-81", num: "81", title: "not and no",                                subtitle: null },
        { id: "unit-82", num: "82", title: "Nobody loves me.",                          subtitle: "Negatives with nobody, never etc." },
        { id: "unit-83", num: "83", title: "Questions and negatives: more practice",   subtitle: null },
        { id: "unit-84", num: "84", title: "Questions and negatives: revision test",   subtitle: null },
      ],
    },
    {
      title: "Section 9 — Infinitives and -ing Forms",
      subsections: [
        { label: "Infinitives",   unitIds: ["unit-85","unit-86","unit-87","unit-88","unit-89","unit-90","unit-91","unit-92"] },
        { label: "-ing Forms",    unitIds: ["unit-93","unit-94","unit-95"] },
        { label: "Review",        unitIds: ["unit-96","unit-97"] },
      ],
      units: [
        { id: "unit-85", num: "85", title: "I want to go. Must you go?",               subtitle: "Infinitives: using to" },
        { id: "unit-86", num: "86", title: "She went to Paris to study music.",         subtitle: "Infinitive of purpose" },
        { id: "unit-87", num: "87", title: "I hope to be an airline pilot.",            subtitle: "Verb + infinitive" },
        { id: "unit-88", num: "88", title: "He wants me to cook.",                      subtitle: "Verb + object + infinitive" },
        { id: "unit-89", num: "89", title: "It's nice to be here with you.",            subtitle: "it with infinitive subjects" },
        { id: "unit-90", num: "90", title: "glad to find you at home",                 subtitle: "Adjective + infinitive" },
        { id: "unit-91", num: "91", title: "too tired to sing",                        subtitle: "Adjectives with enough/to + infinitive" },
        { id: "unit-92", num: "92", title: "some letters to write",                    subtitle: "Noun/pronoun + infinitive" },
        { id: "unit-93", num: "93", title: "Smoking is bad for you.",                  subtitle: "-ing forms as subjects" },
        { id: "unit-94", num: "94", title: "Thank you for coming.",                    subtitle: "Preposition + …ing" },
        { id: "unit-95", num: "95", title: "I can't help feeling unhappy.",             subtitle: "Verb + …ing" },
        { id: "unit-96", num: "96", title: "Infinitives and -ing forms: more practice", subtitle: null },
        { id: "unit-97", num: "97", title: "Infinitives and -ing forms: revision test", subtitle: null },
      ],
    },
    {
      title: "Section 10 — Special Structures with Verbs",
      subsections: [
        { label: "Structures", unitIds: ["unit-98","unit-99","unit-100","unit-101","unit-102","unit-103","unit-104"] },
        { label: "Review",     unitIds: ["unit-105","unit-106"] },
      ],
      units: [
        { id: "unit-98",  num: "98",  title: "get up / get your coat / it's getting cold", subtitle: "Structures with get" },
        { id: "unit-99",  num: "99",  title: "Wait for me.",                            subtitle: "Verbs with prepositions" },
        { id: "unit-100", num: "100", title: "Come in, take off your coat and sit down.", subtitle: "Phrasal verbs" },
        { id: "unit-101", num: "101", title: "Take the boss these letters.",             subtitle: "Verbs with two objects" },
        { id: "unit-102", num: "102", title: "I have my hair cut every week.",           subtitle: "have something done" },
        { id: "unit-103", num: "103", title: "Come in. Don't worry.",                   subtitle: "Imperatives" },
        { id: "unit-104", num: "104", title: "Let's go.",                               subtitle: "let's (suggestions)" },
        { id: "unit-105", num: "105", title: "Special structures with verbs: more practice", subtitle: null },
        { id: "unit-106", num: "106", title: "Special structures with verbs: revision test", subtitle: null },
      ],
    },
    {
      title: "Section 11 — Articles: a/an and the",
      subsections: [
        { label: "a/an",   unitIds: ["unit-107","unit-108","unit-109","unit-110","unit-111"] },
        { label: "the",    unitIds: ["unit-112","unit-113","unit-114"] },
        { label: "Review", unitIds: ["unit-115","unit-116"] },
      ],
      units: [
        { id: "unit-107", num: "107", title: "a/an; pronunciation of the",             subtitle: null },
        { id: "unit-108", num: "108", title: "a car, cars; petrol",                    subtitle: "Countable and uncountable" },
        { id: "unit-109", num: "109", title: "Let's see a film. I didn't like the film.", subtitle: "the and a/an" },
        { id: "unit-110", num: "110", title: "She's a doctor.",                        subtitle: "a/an" },
        { id: "unit-111", num: "111", title: "She's got a nice smile.",                subtitle: "a/an: describing people" },
        { id: "unit-112", num: "112", title: "People are funny.",                      subtitle: "Talking in general without the" },
        { id: "unit-113", num: "113", title: "Mary, Africa, the USA",                  subtitle: "Names" },
        { id: "unit-114", num: "114", title: "in bed; after lunch; a hundred; …",     subtitle: "Special cases" },
        { id: "unit-115", num: "115", title: "Articles: more practice",               subtitle: null },
        { id: "unit-116", num: "116", title: "Articles: revision test",               subtitle: null },
      ],
    },
    {
      title: "Section 12 — Determiners",
      subsections: [
        { label: "Core Determiners", unitIds: ["unit-117","unit-118","unit-119","unit-120","unit-121","unit-122","unit-123","unit-124","unit-125","unit-126","unit-127","unit-128"] },
        { label: "Review",           unitIds: ["unit-129","unit-130"] },
      ],
      units: [
        { id: "unit-117", num: "117", title: "this, that, these and those",            subtitle: null },
        { id: "unit-118", num: "118", title: "I need some sugar. Have you got any?",   subtitle: "some and any" },
        { id: "unit-119", num: "119", title: "somebody, anything, nowhere …",         subtitle: null },
        { id: "unit-120", num: "120", title: "How much milk? How many languages?",     subtitle: "much and many" },
        { id: "unit-121", num: "121", title: "a lot of and lots of",                  subtitle: null },
        { id: "unit-122", num: "122", title: "a little English; a few words",         subtitle: "a little and a few" },
        { id: "unit-123", num: "123", title: "enough money; fast enough",             subtitle: null },
        { id: "unit-124", num: "124", title: "too, too much/many and not enough",     subtitle: null },
        { id: "unit-125", num: "125", title: "all my friends are here",               subtitle: "all" },
        { id: "unit-126", num: "126", title: "all and every; each",                  subtitle: null },
        { id: "unit-127", num: "127", title: "both, either and neither",              subtitle: null },
        { id: "unit-128", num: "128", title: "most people; most of us",               subtitle: "Determiners and of" },
        { id: "unit-129", num: "129", title: "Determiners: more practice",            subtitle: null },
        { id: "unit-130", num: "130", title: "Determiners: revision test",            subtitle: null },
      ],
    },
    {
      title: "Section 13 — Personal Pronouns; Possessives",
      subsections: [
        { label: "Pronouns & Possessives", unitIds: ["unit-131","unit-132","unit-133","unit-134"] },
        { label: "Review",                 unitIds: ["unit-135","unit-136"] },
      ],
      units: [
        { id: "unit-131", num: "131", title: "Personal pronouns: I and me etc.",      subtitle: null },
        { id: "unit-132", num: "132", title: "This is my coat.",                      subtitle: "Possessives: my, your etc." },
        { id: "unit-133", num: "133", title: "This is mine.",                         subtitle: "Possessives: mine, yours etc." },
        { id: "unit-134", num: "134", title: "Reflexive pronouns: myself, yourself etc.", subtitle: null },
        { id: "unit-135", num: "135", title: "Personal pronouns and possessives: more practice", subtitle: null },
        { id: "unit-136", num: "136", title: "Personal pronouns and possessives: revision test", subtitle: null },
      ],
    },
    {
      title: "Section 14 — Nouns",
      subsections: [
        { label: "Noun Forms", unitIds: ["unit-137","unit-138","unit-139","unit-140","unit-141","unit-142","unit-143"] },
        { label: "Review",     unitIds: ["unit-144","unit-145"] },
      ],
      units: [
        { id: "unit-137", num: "137", title: "cat, cats; box, boxes",                 subtitle: "Singular and plural nouns" },
        { id: "unit-138", num: "138", title: "team, family; jeans, scissors",         subtitle: "Singular/plural" },
        { id: "unit-139", num: "139", title: "Countable and uncountable nouns",       subtitle: null },
        { id: "unit-140", num: "140", title: "a big one; the ones on the chair",      subtitle: "one and ones" },
        { id: "unit-141", num: "141", title: "son's, sons', men's",                   subtitle: "'s and s' possessive: forms" },
        { id: "unit-142", num: "142", title: "Ian's car; the boss's car",             subtitle: "'s and s' possessive: use" },
        { id: "unit-143", num: "143", title: "Milk chocolate is a kind of chocolate.", subtitle: "Noun + noun" },
        { id: "unit-144", num: "144", title: "Nouns: more practice",                 subtitle: null },
        { id: "unit-145", num: "145", title: "Nouns: revision test",                 subtitle: null },
      ],
    },
    {
      title: "Section 15 — Adjectives and Adverbs",
      subsections: [
        { label: "Adjectives", unitIds: ["unit-146"] },
        { label: "Adverbs",    unitIds: ["unit-147","unit-148","unit-149","unit-150","unit-151"] },
        { label: "Review",     unitIds: ["unit-152","unit-153"] },
      ],
      units: [
        { id: "unit-146", num: "146", title: "a beautiful little girl who was not stupid", subtitle: "Adjectives" },
        { id: "unit-147", num: "147", title: "He ate quickly.",                        subtitle: "Adverbs of manner" },
        { id: "unit-148", num: "148", title: "I like sport very much.",                subtitle: "Other adverbs" },
        { id: "unit-149", num: "149", title: "often, certainly etc.",                  subtitle: "Adverbs with the verb" },
        { id: "unit-150", num: "150", title: "interested and interesting etc.",        subtitle: null },
        { id: "unit-151", num: "151", title: "fast, hard, hardly, well, friendly, …", subtitle: null },
        { id: "unit-152", num: "152", title: "Adjectives and adverbs: more practice", subtitle: null },
        { id: "unit-153", num: "153", title: "Adjectives and adverbs: revision test", subtitle: null },
      ],
    },
    {
      title: "Section 16 — Comparison",
      subsections: [
        { label: "Comparative & Superlative", unitIds: ["unit-154","unit-155","unit-156","unit-157","unit-158","unit-159"] },
        { label: "Review",                    unitIds: ["unit-160","unit-161"] },
      ],
      units: [
        { id: "unit-154", num: "154", title: "Comparative and superlative adjectives: forms", subtitle: null },
        { id: "unit-155", num: "155", title: "Comparative or superlative?",             subtitle: null },
        { id: "unit-156", num: "156", title: "brighter than the moon",                 subtitle: "Comparatives: use" },
        { id: "unit-157", num: "157", title: "the highest mountain in the world",      subtitle: "Superlatives" },
        { id: "unit-158", num: "158", title: "More slowly, please.",                   subtitle: "Comparison of adverbs" },
        { id: "unit-159", num: "159", title: "Your hands are as cold as ice.",         subtitle: "(not) as … as" },
        { id: "unit-160", num: "160", title: "Comparison: more practice",             subtitle: null },
        { id: "unit-161", num: "161", title: "Comparison: revision test",             subtitle: null },
      ],
    },
    {
      title: "Section 17 — Conjunctions",
      subsections: [
        { label: "Conjunctions", unitIds: ["unit-162","unit-163","unit-164","unit-165","unit-166","unit-167"] },
        { label: "Review",       unitIds: ["unit-168","unit-169"] },
      ],
      units: [
        { id: "unit-162", num: "162", title: "and, but, because …",                  subtitle: "Conjunctions: introduction" },
        { id: "unit-163", num: "163", title: "If you need help, ask me.",             subtitle: "Position of conjunctions" },
        { id: "unit-164", num: "164", title: "I'll see you before you go.",           subtitle: "Tenses with time conjunctions" },
        { id: "unit-165", num: "165", title: "because and so; although and but",     subtitle: null },
        { id: "unit-166", num: "166", title: "I speak Russian, English and Swahili", subtitle: "and" },
        { id: "unit-167", num: "167", title: "both … and; (n)either … (n)or",        subtitle: "Double conjunctions" },
        { id: "unit-168", num: "168", title: "Conjunctions: more practice",          subtitle: null },
        { id: "unit-169", num: "169", title: "Conjunctions: revision test",          subtitle: null },
      ],
    },
    {
      title: "Section 18 — if",
      subsections: [
        { label: "Conditionals", unitIds: ["unit-170","unit-171","unit-172","unit-173","unit-174","unit-175"] },
        { label: "Review",       unitIds: ["unit-176","unit-177"] },
      ],
      units: [
        { id: "unit-170", num: "170", title: "if: position; unless",                  subtitle: null },
        { id: "unit-171", num: "171", title: "I'll phone you if I hear from Alice.",   subtitle: "if: future" },
        { id: "unit-172", num: "172", title: "If dogs could talk, …",                 subtitle: "Not real / not probable" },
        { id: "unit-173", num: "173", title: "If I were you, …",                      subtitle: null },
        { id: "unit-174", num: "174", title: "If I go, I will …; If I went, I would …", subtitle: null },
        { id: "unit-175", num: "175", title: "If A had happened, B would have happened.", subtitle: "Unreal past" },
        { id: "unit-176", num: "176", title: "if: more practice",                    subtitle: null },
        { id: "unit-177", num: "177", title: "if: revision test",                    subtitle: null },
      ],
    },
    {
      title: "Section 19 — Relative Pronouns",
      subsections: [
        { label: "Relative Clauses", unitIds: ["unit-178","unit-179","unit-180","unit-181","unit-182"] },
        { label: "Review",           unitIds: ["unit-183","unit-184"] },
      ],
      units: [
        { id: "unit-178", num: "178", title: "the keys which I lost",                 subtitle: "Relative who and which" },
        { id: "unit-179", num: "179", title: "a bird that can't fly",                 subtitle: "Relative that" },
        { id: "unit-180", num: "180", title: "the car (that) you bought",             subtitle: "Leaving out relative pronouns" },
        { id: "unit-181", num: "181", title: "the man that she works for",            subtitle: "Prepositions" },
        { id: "unit-182", num: "182", title: "It was just what I wanted.",            subtitle: "Relative what" },
        { id: "unit-183", num: "183", title: "Relative pronouns: more practice",     subtitle: null },
        { id: "unit-184", num: "184", title: "Relative pronouns: revision test",     subtitle: null },
      ],
    },
    {
      title: "Section 20 — Indirect Speech",
      subsections: [
        { label: "Reported Speech", unitIds: ["unit-185","unit-186","unit-187","unit-188","unit-189"] },
        { label: "Review",          unitIds: ["unit-190","unit-191"] },
      ],
      units: [
        { id: "unit-185", num: "185", title: "Bill said he was really happy.",        subtitle: "Tenses and pronouns" },
        { id: "unit-186", num: "186", title: "She asked him what his name was.",      subtitle: "Indirect questions" },
        { id: "unit-187", num: "187", title: "She says she comes from London.",       subtitle: "Present reporting verbs" },
        { id: "unit-188", num: "188", title: "here and now > there and then",         subtitle: null },
        { id: "unit-189", num: "189", title: "She told me to get out.",               subtitle: "Infinitives" },
        { id: "unit-190", num: "190", title: "Indirect speech: more practice",       subtitle: null },
        { id: "unit-191", num: "191", title: "Indirect speech: revision test",       subtitle: null },
      ],
    },
    {
      title: "Section 21 — Prepositions",
      subsections: [
        { label: "Time Prepositions",  unitIds: ["unit-192","unit-193","unit-194"] },
        { label: "Place Prepositions", unitIds: ["unit-195","unit-196","unit-197","unit-198"] },
        { label: "Review",             unitIds: ["unit-199","unit-200"] },
      ],
      units: [
        { id: "unit-192", num: "192", title: "at, in and on (time)",                 subtitle: null },
        { id: "unit-193", num: "193", title: "from … to, until and by",              subtitle: null },
        { id: "unit-194", num: "194", title: "for, during and while",                subtitle: null },
        { id: "unit-195", num: "195", title: "in and on (place)",                   subtitle: null },
        { id: "unit-196", num: "196", title: "at (place)",                          subtitle: null },
        { id: "unit-197", num: "197", title: "Other prepositions of place",         subtitle: null },
        { id: "unit-198", num: "198", title: "Prepositions of movement",             subtitle: null },
        { id: "unit-199", num: "199", title: "Prepositions: more practice",         subtitle: null },
        { id: "unit-200", num: "200", title: "Prepositions: revision test",         subtitle: null },
      ],
    },
    {
      title: "Section 22 — Spoken Grammar",
      subsections: [
        { label: "Spoken Structures", unitIds: ["unit-201","unit-202","unit-203","unit-204","unit-205","unit-206"] },
        { label: "Review",            unitIds: ["unit-207","unit-208"] },
      ],
      units: [
        { id: "unit-201", num: "201", title: "This music isn't very good, is it?",   subtitle: "Question tags" },
        { id: "unit-202", num: "202", title: "Yes, I have. No, they didn't.",         subtitle: "Short answers" },
        { id: "unit-203", num: "203", title: "Oh, yes? Did they really?",             subtitle: "Reply questions" },
        { id: "unit-204", num: "204", title: "Revision of spoken question and answer structures", subtitle: null },
        { id: "unit-205", num: "205", title: "Don't know if she has.",                subtitle: "Leaving out words" },
        { id: "unit-206", num: "206", title: "so am I; nor do I etc.",               subtitle: null },
        { id: "unit-207", num: "207", title: "Spoken grammar: more practice",        subtitle: null },
        { id: "unit-208", num: "208", title: "Spoken grammar: revision test",        subtitle: null },
      ],
    },
  ],
};

const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length;

let _idx = 0;
const unitIndexMap = {};
bookData.sections.forEach((sec) =>
  sec.units.forEach((u) => { unitIndexMap[u.id] = ++_idx; })
);

const sectionColors = [
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "📌" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc", icon: "⏱️" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "🔮" },
  { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#7f1d1d", border: "#fda4af", icon: "📅" },
  { accent: "#065f46", bg: "#f0fdf4", badge: "#d1fae5", text: "#022c22", border: "#6ee7b7", icon: "✅" },
  { accent: "#92400e", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "🔧" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🔄" },
  { accent: "#6d28d9", bg: "#f5f3ff", badge: "#ede9fe", text: "#3b0764", border: "#c4b5fd", icon: "❓" },
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#ccfbf1", text: "#042f2e", border: "#5eead4", icon: "🔗" },
  { accent: "#a16207", bg: "#fefce8", badge: "#fef9c3", text: "#713f12", border: "#fde047", icon: "⚙️" },
  { accent: "#9d174d", bg: "#fff1f2", badge: "#fce7f3", text: "#500724", border: "#f9a8d4", icon: "📖" },
  { accent: "#15803d", bg: "#f0fdf4", badge: "#dcfce7", text: "#052e16", border: "#86efac", icon: "🎯" },
  { accent: "#4338ca", bg: "#eef2ff", badge: "#e0e7ff", text: "#1e1b4b", border: "#a5b4fc", icon: "👤" },
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12", border: "#fb923c", icon: "📝" },
  { accent: "#0e7490", bg: "#ecfeff", badge: "#cffafe", text: "#083344", border: "#67e8f9", icon: "✍️" },
  { accent: "#5b21b6", bg: "#f5f3ff", badge: "#ddd6fe", text: "#2e1065", border: "#a78bfa", icon: "📊" },
  { accent: "#1e40af", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a", border: "#60a5fa", icon: "🔀" },
  { accent: "#065f46", bg: "#ecfdf5", badge: "#d1fae5", text: "#022c22", border: "#34d399", icon: "❔" },
  { accent: "#6b21a8", bg: "#faf5ff", badge: "#f3e8ff", text: "#3b0764", border: "#d8b4fe", icon: "🔍" },
  { accent: "#9a3412", bg: "#fff7ed", badge: "#fdba74", text: "#7c2d12", border: "#fb923c", icon: "💬" },
  { accent: "#1d4ed8", bg: "#f0f9ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "📍" },
  { accent: "#374151", bg: "#f9fafb", badge: "#e5e7eb", text: "#111827", border: "#d1d5db", icon: "🗣️" },
];

const subsectionColors = [
  { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  { bg: "#dbeafe", text: "#1e3a5f", border: "#93c5fd" },
  { bg: "#fce7f3", text: "#831843", border: "#f9a8d4" },
  { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
];

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

export default function OEGCBasicPage() {
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
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#bfdbfe", color: "#1e3a8a", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              BASIC
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
            const sc     = sectionColors[si] || sectionColors[0];
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
                              path={`/english/grammar/oegc-basic/${unit.id}`}
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
