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
  id:      "oegc-intermediate",
  title:   "Oxford English Grammar Course",
  level:   "Intermediate",
  authors: "Michael Swan & Catherine Walter",
  cover:   "/books/oegc-intermediate.jpg",
  sections: [
    {
      title: "Section 1 — be and have",
      subsections: [
        { label: "Basics",  unitIds: ["unit-01","unit-02","unit-03","unit-04","unit-05","unit-06"] },
        { label: "Review",  unitIds: ["unit-07","unit-08"] },
      ],
      units: [
        { id: "unit-01", num: "01", title: "Revise the basics: be and have",                         subtitle: null },
        { id: "unit-02", num: "02", title: "Revise the basics: there is/was etc",                    subtitle: null },
        { id: "unit-03", num: "03", title: "There seems to be a delay.",                             subtitle: "More about there is" },
        { id: "unit-04", num: "04", title: "We haven't got / don't have time.",                      subtitle: "have with got and do" },
        { id: "unit-05", num: "05", title: "Do you often have colds?",                               subtitle: "Habitual and repeated actions" },
        { id: "unit-06", num: "06", title: "I'm going to have a swim.",                              subtitle: "have for actions" },
        { id: "unit-07", num: "07", title: "be and have: more practice",                             subtitle: null },
        { id: "unit-08", num: "08", title: "be and have: revision test",                             subtitle: null },
      ],
    },
    {
      title: "Section 2 — Present Tenses",
      subsections: [
        { label: "Basics & Forms", unitIds: ["unit-09","unit-10","unit-11","unit-12","unit-13"] },
        { label: "Review",         unitIds: ["unit-14","unit-15"] },
      ],
      units: [
        { id: "unit-09", num: "09", title: "Revise the basics: which present tense?",                subtitle: null },
        { id: "unit-10", num: "10", title: "Revise the basics: spelling",                            subtitle: null },
        { id: "unit-11", num: "11", title: "Prices are going up.",                                   subtitle: "Present progressive for changes" },
        { id: "unit-12", num: "12", title: "You take the first left",                                subtitle: "Simple present: instructions etc" },
        { id: "unit-13", num: "13", title: "I remember his face.",                                   subtitle: "Non-progressive verbs" },
        { id: "unit-14", num: "14", title: "Present tenses: more practice",                          subtitle: null },
        { id: "unit-15", num: "15", title: "Present tenses: revision test",                          subtitle: null },
      ],
    },
    {
      title: "Section 3 — Talking About the Future",
      subsections: [
        { label: "Core Future Forms", unitIds: ["unit-16","unit-17","unit-18","unit-19","unit-20","unit-21","unit-22","unit-23","unit-24","unit-25"] },
        { label: "Review",            unitIds: ["unit-26","unit-27"] },
      ],
      units: [
        { id: "unit-16", num: "16", title: "Revise the basics: going to",                            subtitle: null },
        { id: "unit-17", num: "17", title: "Revise the basics: present progressive for future",      subtitle: null },
        { id: "unit-18", num: "18", title: "Revise the basics: will-future",                         subtitle: null },
        { id: "unit-19", num: "19", title: "OK, I'll go.",                                           subtitle: "will in decisions, promises etc" },
        { id: "unit-20", num: "20", title: "Which future? will, going to or present progressive?",   subtitle: null },
        { id: "unit-21", num: "21", title: "My credit card expires at midnight.",                    subtitle: "Simple present for future" },
        { id: "unit-22", num: "22", title: "This time tomorrow I'll be skiing.",                     subtitle: "Future progressive" },
        { id: "unit-23", num: "23", title: "You're to do your homework.",                            subtitle: "be + infinitive" },
        { id: "unit-24", num: "24", title: "I was going to ring you yesterday.",                     subtitle: "Future in the past" },
        { id: "unit-25", num: "25", title: "He'll have finished the roof by Saturday.",              subtitle: "Future perfect" },
        { id: "unit-26", num: "26", title: "Talking about the future: more practice",                subtitle: null },
        { id: "unit-27", num: "27", title: "Talking about the future: revision test",                subtitle: null },
      ],
    },
    {
      title: "Section 4 — Past Tenses",
      subsections: [
        { label: "Basics & Forms", unitIds: ["unit-28","unit-29","unit-30","unit-31"] },
        { label: "Review",         unitIds: ["unit-32","unit-33"] },
      ],
      units: [
        { id: "unit-28", num: "28", title: "Revise the basics: simple past forms",                   subtitle: null },
        { id: "unit-29", num: "29", title: "Revise the basics: which past tense?",                   subtitle: null },
        { id: "unit-30", num: "30", title: "More about past tenses",                                 subtitle: null },
        { id: "unit-31", num: "31", title: "I wondered if you were free.",                           subtitle: "Past tenses in requests etc" },
        { id: "unit-32", num: "32", title: "Past tenses: more practice",                             subtitle: null },
        { id: "unit-33", num: "33", title: "Past tenses: revision test",                             subtitle: null },
      ],
    },
    {
      title: "Section 5 — Perfect Tenses",
      subsections: [
        { label: "Present Perfect", unitIds: ["unit-34","unit-35","unit-36","unit-37","unit-38","unit-39","unit-40","unit-41","unit-42","unit-43"] },
        { label: "Past Perfect",    unitIds: ["unit-44","unit-45","unit-46","unit-47"] },
        { label: "Review",          unitIds: ["unit-48","unit-49","unit-50"] },
      ],
      units: [
        { id: "unit-34", num: "34", title: "Revise the basics: present perfect forms and use",       subtitle: null },
        { id: "unit-35", num: "35", title: "Revise the basics: present perfect or simple past?",     subtitle: null },
        { id: "unit-36", num: "36", title: "Revise the basics: tenses with time words",              subtitle: null },
        { id: "unit-37", num: "37", title: "Revise the basics: already, yet and just",               subtitle: null },
        { id: "unit-38", num: "38", title: "Finished time or up to now?",                            subtitle: "this morning; at school" },
        { id: "unit-39", num: "39", title: "We've found oil in the garden!",                         subtitle: "News" },
        { id: "unit-40", num: "40", title: "A plane has crashed. It came down …",                    subtitle: "News and details" },
        { id: "unit-41", num: "41", title: "Revise the basics: present perfect progressive; since, for", subtitle: null },
        { id: "unit-42", num: "42", title: "Present perfect or present perfect progressive?",        subtitle: null },
        { id: "unit-43", num: "43", title: "Simple past and present perfect: summary",               subtitle: null },
        { id: "unit-44", num: "44", title: "Revise the basics: past perfect",                        subtitle: null },
        { id: "unit-45", num: "45", title: "after I had finished",                                   subtitle: "More about the past perfect" },
        { id: "unit-46", num: "46", title: "she had been working too hard",                          subtitle: "Past perfect progressive" },
        { id: "unit-47", num: "47", title: "This is the first time etc",                             subtitle: null },
        { id: "unit-48", num: "48", title: "Perfect tenses: more practice",                          subtitle: null },
        { id: "unit-49", num: "49", title: "Perfect tenses: revision test",                          subtitle: null },
        { id: "unit-50", num: "50", title: "All past and perfect tenses: revision test",             subtitle: null },
      ],
    },
    {
      title: "Section 6 — Modal Verbs",
      subsections: [
        { label: "Core Modals", unitIds: ["unit-51","unit-52","unit-53","unit-54","unit-55","unit-56","unit-57","unit-58","unit-59","unit-60","unit-61","unit-62","unit-63","unit-64","unit-65","unit-66"] },
        { label: "Review",      unitIds: ["unit-67","unit-68"] },
      ],
      units: [
        { id: "unit-51", num: "51", title: "Revise the basics: the grammar of modals",               subtitle: null },
        { id: "unit-52", num: "52", title: "Revise the basics: must, should and ought to",           subtitle: null },
        { id: "unit-53", num: "53", title: "have to and must",                                       subtitle: null },
        { id: "unit-54", num: "54", title: "must not; do not have to; do not need to / needn't",     subtitle: null },
        { id: "unit-55", num: "55", title: "You'd better take your umbrella.",                       subtitle: "had better" },
        { id: "unit-56", num: "56", title: "You're supposed to start work at 8.30.",                 subtitle: "supposed to" },
        { id: "unit-57", num: "57", title: "She must be in. He can't be hungry.",                    subtitle: "must/can't: certainty" },
        { id: "unit-58", num: "58", title: "It may rain. It might even snow.",                       subtitle: "may and might" },
        { id: "unit-59", num: "59", title: "Revise the basics: permission, requests etc",            subtitle: null },
        { id: "unit-60", num: "60", title: "What shall we do?",                                      subtitle: "shall in questions" },
        { id: "unit-61", num: "61", title: "can and could (ability): past and future",               subtitle: null },
        { id: "unit-62", num: "62", title: "Revise the basics: used to",                             subtitle: null },
        { id: "unit-63", num: "63", title: "She will talk to herself.",                              subtitle: "will and would: typical behaviour" },
        { id: "unit-64", num: "64", title: "should have …",                                          subtitle: "Perfect modal verbs" },
        { id: "unit-65", num: "65", title: "may have …; must have …",                                subtitle: "Perfect modal verbs" },
        { id: "unit-66", num: "66", title: "could have …; needn't have …",                           subtitle: "Perfect modal verbs" },
        { id: "unit-67", num: "67", title: "Modal verbs: more practice",                             subtitle: null },
        { id: "unit-68", num: "68", title: "Modal verbs: revision test",                             subtitle: null },
      ],
    },
    {
      title: "Section 7 — Passives",
      subsections: [
        { label: "Forms & Uses", unitIds: ["unit-69","unit-70","unit-71","unit-72","unit-73"] },
        { label: "Review",       unitIds: ["unit-74","unit-75"] },
      ],
      units: [
        { id: "unit-69", num: "69", title: "Revise the basics: active and passive",                  subtitle: null },
        { id: "unit-70", num: "70", title: "to be seen; being seen",                                 subtitle: "Passive infinitives and -ing forms" },
        { id: "unit-71", num: "71", title: "Susan was given a prize.",                               subtitle: "Passives: verbs with two objects" },
        { id: "unit-72", num: "72", title: "Ted likes being read to.",                               subtitle: "Prepositions with passives" },
        { id: "unit-73", num: "73", title: "Reasons for using passives",                             subtitle: null },
        { id: "unit-74", num: "74", title: "Passives: more practice",                               subtitle: null },
        { id: "unit-75", num: "75", title: "Passives: revision test",                               subtitle: null },
      ],
    },
    {
      title: "Section 8 — Questions and Negatives",
      subsections: [
        { label: "Questions", unitIds: ["unit-76","unit-77","unit-78","unit-79","unit-80"] },
        { label: "Review",    unitIds: ["unit-81","unit-82"] },
      ],
      units: [
        { id: "unit-76", num: "76", title: "Revise the basics: questions",                           subtitle: null },
        { id: "unit-77", num: "77", title: "Who won? What happened?",                                subtitle: "Question-word subjects" },
        { id: "unit-78", num: "78", title: "What are you thinking about?",                           subtitle: "Prepositions in questions" },
        { id: "unit-79", num: "79", title: "Revise the basics: negatives",                           subtitle: null },
        { id: "unit-80", num: "80", title: "Aren't you well?",                                       subtitle: "Negative questions" },
        { id: "unit-81", num: "81", title: "Questions and negatives: more practice",                 subtitle: null },
        { id: "unit-82", num: "82", title: "Questions and negatives: revision test",                 subtitle: null },
      ],
    },
    {
      title: "Section 9 — Infinitives and -ing Forms",
      subsections: [
        { label: "Infinitives",  unitIds: ["unit-83","unit-84","unit-85","unit-86","unit-87","unit-88","unit-89"] },
        { label: "-ing Forms",   unitIds: ["unit-90","unit-91","unit-92","unit-93","unit-94","unit-95","unit-96","unit-97","unit-98","unit-99","unit-100","unit-101"] },
        { label: "Review",       unitIds: ["unit-102","unit-103"] },
      ],
      units: [
        { id: "unit-83",  num: "83",  title: "Revise the basics: infinitive with and without to",    subtitle: null },
        { id: "unit-84",  num: "84",  title: "Revise the basics: infinitive of purpose",             subtitle: null },
        { id: "unit-85",  num: "85",  title: "Revise the basics: verb + infinitive or -ing form",    subtitle: null },
        { id: "unit-86",  num: "86",  title: "Revise the basics: preposition + -ing form",           subtitle: null },
        { id: "unit-87",  num: "87",  title: "to sit, to be sitting, …",                             subtitle: "More about infinitives" },
        { id: "unit-88",  num: "88",  title: "to have gone etc",                                     subtitle: "Perfect infinitives" },
        { id: "unit-89",  num: "89",  title: "I'd like to. I don't want to.",                        subtitle: "to for whole infinitive" },
        { id: "unit-90",  num: "90",  title: "Smoking is bad for you",                               subtitle: "-ing forms as subjects, objects etc" },
        { id: "unit-91",  num: "91",  title: "More about verb + infinitive or -ing form",            subtitle: null },
        { id: "unit-92",  num: "92",  title: "She's gone shopping.",                                 subtitle: "go …ing" },
        { id: "unit-93",  num: "93",  title: "-ing form and infinitive both possible",               subtitle: null },
        { id: "unit-94",  num: "94",  title: "He wants me to wash his socks.",                       subtitle: "Verb + object + infinitive" },
        { id: "unit-95",  num: "95",  title: "pleased to see etc",                                   subtitle: "Adjective + infinitive or -ing form" },
        { id: "unit-96",  num: "96",  title: "time to go; fear of flying",                           subtitle: "Noun + infinitive or -ing form" },
        { id: "unit-97",  num: "97",  title: "nothing to wear",                                      subtitle: "More about noun/pronoun + infinitive" },
        { id: "unit-98",  num: "98",  title: "It's time for the postman to come.",                   subtitle: "for … to …" },
        { id: "unit-99",  num: "99",  title: "easy to please etc",                                   subtitle: "More about adjective + infinitive" },
        { id: "unit-100", num: "100", title: "before, after, since, by and for + -ing",              subtitle: null },
        { id: "unit-101", num: "101", title: "I look forward to seeing you.",                        subtitle: "to …ing" },
        { id: "unit-102", num: "102", title: "Infinitives and -ing forms: more practice",            subtitle: null },
        { id: "unit-103", num: "103", title: "Infinitives and -ing forms: revision test",            subtitle: null },
      ],
    },
    {
      title: "Section 10 — Various Structures with Verbs",
      subsections: [
        { label: "Structures", unitIds: ["unit-104","unit-105","unit-106","unit-107","unit-108","unit-109","unit-110","unit-111"] },
        { label: "Review",     unitIds: ["unit-112","unit-113"] },
      ],
      units: [
        { id: "unit-104", num: "104", title: "Revise the basics: imperatives; let's",                subtitle: null },
        { id: "unit-105", num: "105", title: "Revise the basics: verbs with two objects",            subtitle: null },
        { id: "unit-106", num: "106", title: "Revise the basics: causative have and get",            subtitle: null },
        { id: "unit-107", num: "107", title: "How beautiful! What a surprise!",                      subtitle: "Exclamations" },
        { id: "unit-108", num: "108", title: "You do look nice.",                                    subtitle: "do: emphatic auxiliary" },
        { id: "unit-109", num: "109", title: "It's nice to talk to you.",                            subtitle: "it: preparatory subject" },
        { id: "unit-110", num: "110", title: "It's not tea that I want.",                            subtitle: "Emphasis with it and what" },
        { id: "unit-111", num: "111", title: "Look out! I'll think it over.",                        subtitle: "Phrasal verbs" },
        { id: "unit-112", num: "112", title: "Various structures with verbs: more practice",         subtitle: null },
        { id: "unit-113", num: "113", title: "Various structures with verbs: revision test",         subtitle: null },
      ],
    },
    {
      title: "Section 11 — Articles: a/an and the",
      subsections: [
        { label: "a/an",   unitIds: ["unit-114","unit-115","unit-116"] },
        { label: "the",    unitIds: ["unit-117","unit-118","unit-119","unit-120","unit-121"] },
        { label: "Review", unitIds: ["unit-122","unit-123"] },
      ],
      units: [
        { id: "unit-114", num: "114", title: "Revise the basics: a/an and one",                      subtitle: null },
        { id: "unit-115", num: "115", title: "She's a farmer. He's got a long nose.",                subtitle: "Revise the basics: a/an" },
        { id: "unit-116", num: "116", title: "A spider has eight legs. A man called.",               subtitle: "Revise the basics: a/an" },
        { id: "unit-117", num: "117", title: "Please close the door.",                               subtitle: "Revise the basics: the" },
        { id: "unit-118", num: "118", title: "I like music.",                                        subtitle: "Revise the basics: generalisations without the" },
        { id: "unit-119", num: "119", title: "Who invented the telescope?",                          subtitle: "the in generalisations" },
        { id: "unit-120", num: "120", title: "Lake Superior; the Atlantic",                          subtitle: "Place names" },
        { id: "unit-121", num: "121", title: "in prison; She became Queen.",                         subtitle: "Other special cases" },
        { id: "unit-122", num: "122", title: "Articles: more practice",                              subtitle: null },
        { id: "unit-123", num: "123", title: "Articles: revision test",                              subtitle: null },
      ],
    },
    {
      title: "Section 12 — Determiners",
      subsections: [
        { label: "Core Determiners", unitIds: ["unit-124","unit-125","unit-126","unit-127","unit-128","unit-129","unit-130","unit-131","unit-132","unit-133","unit-134","unit-135","unit-136","unit-137","unit-138","unit-139"] },
        { label: "Review",           unitIds: ["unit-140","unit-141"] },
      ],
      units: [
        { id: "unit-124", num: "124", title: "Revise the basics: this, that, these, those",          subtitle: null },
        { id: "unit-125", num: "125", title: "Revise the basics: some and any",                      subtitle: null },
        { id: "unit-126", num: "126", title: "Have some toast. I don't like toast.",                 subtitle: "some/any or no article" },
        { id: "unit-127", num: "127", title: "any, not any, no and none",                            subtitle: null },
        { id: "unit-128", num: "128", title: "any = 'one or the other – it's not important which'",  subtitle: null },
        { id: "unit-129", num: "129", title: "Revise the basics: much, many, a lot of",              subtitle: null },
        { id: "unit-130", num: "130", title: "Revise the basics: enough, too and too much",          subtitle: null },
        { id: "unit-131", num: "131", title: "Revise the basics: (a) little, (a) few",              subtitle: null },
        { id: "unit-132", num: "132", title: "less and least, fewer and fewest",                     subtitle: null },
        { id: "unit-133", num: "133", title: "Revise the basics: all",                              subtitle: null },
        { id: "unit-134", num: "134", title: "Revise the basics: all, every, everybody, everything", subtitle: null },
        { id: "unit-135", num: "135", title: "every and each; every one",                           subtitle: null },
        { id: "unit-136", num: "136", title: "both, either and neither",                             subtitle: null },
        { id: "unit-137", num: "137", title: "which? and what?",                                    subtitle: null },
        { id: "unit-138", num: "138", title: "other(s) and another",                                subtitle: null },
        { id: "unit-139", num: "139", title: "most people; most of us",                             subtitle: "Determiners and of" },
        { id: "unit-140", num: "140", title: "Determiners: more practice",                           subtitle: null },
        { id: "unit-141", num: "141", title: "Determiners: revision test",                           subtitle: null },
      ],
    },
    {
      title: "Section 13 — Personal Pronouns and Possessives",
      subsections: [
        { label: "Pronouns & Possessives", unitIds: ["unit-142","unit-143","unit-144","unit-145","unit-146"] },
        { label: "Review",                 unitIds: ["unit-147","unit-148"] },
      ],
      units: [
        { id: "unit-142", num: "142", title: "Revise the basics: I, me, my, mine etc",              subtitle: null },
        { id: "unit-143", num: "143", title: "a friend of mine / Anne broke her arm.",               subtitle: "Possessives" },
        { id: "unit-144", num: "144", title: "'Who's that?' 'It's me.'",                             subtitle: "Personal pronouns" },
        { id: "unit-145", num: "145", title: "She taught herself to play the guitar.",               subtitle: "Reflexives" },
        { id: "unit-146", num: "146", title: "You can't learn French in a month.",                   subtitle: "you, one and they" },
        { id: "unit-147", num: "147", title: "Personal pronouns and possessives: more practice",     subtitle: null },
        { id: "unit-148", num: "148", title: "Personal pronouns and possessives: revision test",     subtitle: null },
      ],
    },
    {
      title: "Section 14 — Nouns",
      subsections: [
        { label: "Noun Forms & Uses", unitIds: ["unit-149","unit-150","unit-151","unit-152","unit-153","unit-154","unit-155","unit-156","unit-157","unit-158"] },
        { label: "Review",            unitIds: ["unit-159","unit-160"] },
      ],
      units: [
        { id: "unit-149", num: "149", title: "Revise the basics: countable and uncountable nouns",   subtitle: null },
        { id: "unit-150", num: "150", title: "More about countable and uncountable nouns",           subtitle: null },
        { id: "unit-151", num: "151", title: "Revise the basics: how to spell plurals",              subtitle: null },
        { id: "unit-152", num: "152", title: "aircraft, sheep, arms",                                subtitle: "Plurals of nouns: special cases" },
        { id: "unit-153", num: "153", title: "My family are angry with me.",                         subtitle: "Mixed singular and plural" },
        { id: "unit-154", num: "154", title: "Revise the basics: possessive 's",                     subtitle: null },
        { id: "unit-155", num: "155", title: "my father's name; the name of the book",              subtitle: "Possessive 's or of …" },
        { id: "unit-156", num: "156", title: "Revise the basics: noun + noun",                       subtitle: null },
        { id: "unit-157", num: "157", title: "road signs; signs of anger",                          subtitle: "Noun + noun or preposition" },
        { id: "unit-158", num: "158", title: "a big one with cream",                                 subtitle: "one(s)" },
        { id: "unit-159", num: "159", title: "Nouns: more practice",                                subtitle: null },
        { id: "unit-160", num: "160", title: "Nouns: revision test",                                subtitle: null },
      ],
    },
    {
      title: "Section 15 — Adjectives and Adverbs",
      subsections: [
        { label: "Adjectives", unitIds: ["unit-161","unit-162","unit-163","unit-164"] },
        { label: "Adverbs",    unitIds: ["unit-165","unit-166","unit-167"] },
        { label: "Review",     unitIds: ["unit-168","unit-169"] },
      ],
      units: [
        { id: "unit-161", num: "161", title: "Revise the basics: adjectives, adverbs of manner",     subtitle: null },
        { id: "unit-162", num: "162", title: "interested and interesting etc",                        subtitle: null },
        { id: "unit-163", num: "163", title: "in the country of the blind",                          subtitle: "Adjectives without nouns" },
        { id: "unit-164", num: "164", title: "a terrible little boy; old and grey",                  subtitle: "Order of adjectives" },
        { id: "unit-165", num: "165", title: "I can never wake up in time.",                         subtitle: "Adverbs with the verb" },
        { id: "unit-166", num: "166", title: "even and only; end-position adverbs",                  subtitle: null },
        { id: "unit-167", num: "167", title: "fast, hard, late, …",                                  subtitle: "Confusing adjectives and adverbs" },
        { id: "unit-168", num: "168", title: "Adjectives and adverbs: more practice",               subtitle: null },
        { id: "unit-169", num: "169", title: "Adjectives and adverbs: revision test",               subtitle: null },
      ],
    },
    {
      title: "Section 16 — Comparison",
      subsections: [
        { label: "Comparatives & Superlatives", unitIds: ["unit-170","unit-171","unit-172","unit-173","unit-174","unit-175"] },
        { label: "Review",                      unitIds: ["unit-176","unit-177"] },
      ],
      units: [
        { id: "unit-170", num: "170", title: "Revise the basics: comparative and superlative adjectives", subtitle: null },
        { id: "unit-171", num: "171", title: "Revise the basics: comparative and superlative adverbs",    subtitle: null },
        { id: "unit-172", num: "172", title: "as many people as possible",                           subtitle: "as … as" },
        { id: "unit-173", num: "173", title: "taller and taller; the more the better",               subtitle: "More on comparatives" },
        { id: "unit-174", num: "174", title: "the best player of us all",                            subtitle: "More about superlatives" },
        { id: "unit-175", num: "175", title: "like and as; so and such",                             subtitle: null },
        { id: "unit-176", num: "176", title: "Comparison: more practice",                           subtitle: null },
        { id: "unit-177", num: "177", title: "Comparison: revision test",                           subtitle: null },
      ],
    },
    {
      title: "Section 17 — Conjunctions",
      subsections: [
        { label: "Core Conjunctions", unitIds: ["unit-178","unit-179","unit-180","unit-181","unit-182","unit-183","unit-184","unit-185","unit-186"] },
        { label: "Review",            unitIds: ["unit-187","unit-188"] },
      ],
      units: [
        { id: "unit-178", num: "178", title: "Revise the basics: use and position of conjunctions",  subtitle: null },
        { id: "unit-179", num: "179", title: "I'll tell you when I know.",                           subtitle: "Revise the basics: present for future" },
        { id: "unit-180", num: "180", title: "so that, as long as, until etc",                       subtitle: "Using certain conjunctions" },
        { id: "unit-181", num: "181", title: "She knew I was right.",                                subtitle: "Leaving out that" },
        { id: "unit-182", num: "182", title: "both … and; (n)either … (n)or",                        subtitle: null },
        { id: "unit-183", num: "183", title: "when I've finished",                                   subtitle: "Perfect for completion" },
        { id: "unit-184", num: "184", title: "… since we were students",                             subtitle: "Tenses with since and for" },
        { id: "unit-185", num: "185", title: "after talking to you; until cooked",                   subtitle: "Conjunction + -ing or -ed" },
        { id: "unit-186", num: "186", title: "Putting down my book …",                               subtitle: "Clauses without conjunctions" },
        { id: "unit-187", num: "187", title: "Conjunctions: more practice",                         subtitle: null },
        { id: "unit-188", num: "188", title: "Conjunctions: revision test",                         subtitle: null },
      ],
    },
    {
      title: "Section 18 — if etc",
      subsections: [
        { label: "Conditionals", unitIds: ["unit-189","unit-190","unit-191","unit-192","unit-193","unit-194","unit-195","unit-196","unit-197"] },
        { label: "Review",       unitIds: ["unit-198","unit-199"] },
      ],
      units: [
        { id: "unit-189", num: "189", title: "Revise the basics: ordinary tense use",                subtitle: null },
        { id: "unit-190", num: "190", title: "Revise the basics: If I had a million dollars, …",     subtitle: null },
        { id: "unit-191", num: "191", title: "Revise the basics: if I go and if I went",             subtitle: null },
        { id: "unit-192", num: "192", title: "We could go cycling if …",                             subtitle: "could = 'would be able to'" },
        { id: "unit-193", num: "193", title: "If Jane hadn't helped me, …",                          subtitle: "Unreal past situations" },
        { id: "unit-194", num: "194", title: "Come tonight unless I phone.",                         subtitle: "unless" },
        { id: "unit-195", num: "195", title: "If only I knew …",                                    subtitle: "if only and I wish: tenses" },
        { id: "unit-196", num: "196", title: "I'm taking my umbrella in case it rains.",             subtitle: "in case" },
        { id: "unit-197", num: "197", title: "It's time you had a haircut.",                         subtitle: "it's time and I'd rather: tenses" },
        { id: "unit-198", num: "198", title: "if etc: more practice",                               subtitle: null },
        { id: "unit-199", num: "199", title: "if etc: revision test",                               subtitle: null },
      ],
    },
    {
      title: "Section 19 — Relatives",
      subsections: [
        { label: "Relative Clauses", unitIds: ["unit-200","unit-201","unit-202","unit-203","unit-204","unit-205","unit-206","unit-207"] },
        { label: "Review",           unitIds: ["unit-208","unit-209"] },
      ],
      units: [
        { id: "unit-200", num: "200", title: "Revise the basics: who(m), which and that",            subtitle: null },
        { id: "unit-201", num: "201", title: "Revise the basics: leaving out relative pronouns",     subtitle: null },
        { id: "unit-202", num: "202", title: "Take what you like.",                                  subtitle: "what = 'the thing(s) that'" },
        { id: "unit-203", num: "203", title: "a girl whose beauty …",                                subtitle: "whose" },
        { id: "unit-204", num: "204", title: "the girl I was talking about",                         subtitle: "Prepositions in relative clauses" },
        { id: "unit-205", num: "205", title: "luggage left unattended",                              subtitle: "Reduced relative clauses" },
        { id: "unit-206", num: "206", title: "Kelly, who does my hair, …",                           subtitle: "Non-identifying relative clauses" },
        { id: "unit-207", num: "207", title: "Reading sentences with relative clauses",              subtitle: null },
        { id: "unit-208", num: "208", title: "Relatives: more practice",                             subtitle: null },
        { id: "unit-209", num: "209", title: "Relatives: revision test",                             subtitle: null },
      ],
    },
    {
      title: "Section 20 — Indirect Speech",
      subsections: [
        { label: "Reported Speech", unitIds: ["unit-210","unit-211","unit-212","unit-213","unit-214","unit-215","unit-216"] },
        { label: "Review",          unitIds: ["unit-217","unit-218"] },
      ],
      units: [
        { id: "unit-210", num: "210", title: "Revise the basics: why things change",                 subtitle: null },
        { id: "unit-211", num: "211", title: "Revise the basics: 'here' and 'now' words",            subtitle: null },
        { id: "unit-212", num: "212", title: "Revise the basics: tenses",                            subtitle: null },
        { id: "unit-213", num: "213", title: "He proved that the earth is/was round.",               subtitle: "Present situations" },
        { id: "unit-214", num: "214", title: "Revise the basics: indirect questions",                subtitle: null },
        { id: "unit-215", num: "215", title: "He promised to write.",                                subtitle: "Revise the basics: infinitives" },
        { id: "unit-216", num: "216", title: "He said I'd better go.",                               subtitle: "Indirect speech: special cases" },
        { id: "unit-217", num: "217", title: "Indirect speech: more practice",                       subtitle: null },
        { id: "unit-218", num: "218", title: "Indirect speech: revision test",                       subtitle: null },
      ],
    },
    {
      title: "Section 21 — Prepositions",
      subsections: [
        { label: "Preposition Types", unitIds: ["unit-219","unit-220","unit-221","unit-222","unit-223","unit-224","unit-225"] },
        { label: "Review",            unitIds: ["unit-226","unit-227"] },
      ],
      units: [
        { id: "unit-219", num: "219", title: "Revise the basics: time",                              subtitle: null },
        { id: "unit-220", num: "220", title: "Revise the basics: place and movement",                subtitle: null },
        { id: "unit-221", num: "221", title: "Some preposition choices",                             subtitle: null },
        { id: "unit-222", num: "222", title: "Look at her.",                                         subtitle: "Verbs with prepositions" },
        { id: "unit-223", num: "223", title: "lack of sleep",                                        subtitle: "Nouns with prepositions" },
        { id: "unit-224", num: "224", title: "full of water",                                        subtitle: "Adjectives with prepositions" },
        { id: "unit-225", num: "225", title: "at a party",                                           subtitle: "Expressions beginning with prepositions" },
        { id: "unit-226", num: "226", title: "Prepositions: more practice",                          subtitle: null },
        { id: "unit-227", num: "227", title: "Prepositions: revision test",                          subtitle: null },
      ],
    },
    {
      title: "Section 22 — Spoken Grammar",
      subsections: [
        { label: "Spoken Structures", unitIds: ["unit-228","unit-229","unit-230","unit-231","unit-232","unit-233","unit-234","unit-235"] },
        { label: "Review",            unitIds: ["unit-236","unit-237"] },
      ],
      units: [
        { id: "unit-228", num: "228", title: "It's difficult, the exam.",                            subtitle: "Spoken sentence structure" },
        { id: "unit-229", num: "229", title: "Must dash.",                                           subtitle: "Dropping sentence beginnings" },
        { id: "unit-230", num: "230", title: "'Get up!' 'I am!'",                                    subtitle: "Dropping words after auxiliaries" },
        { id: "unit-231", num: "231", title: "It's cold, isn't it?",                                subtitle: "Revise the basics: question tags" },
        { id: "unit-232", num: "232", title: "Nobody phoned, did they?",                             subtitle: "More about question tags" },
        { id: "unit-233", num: "233", title: "Revise the basics: short answers and reply questions", subtitle: null },
        { id: "unit-234", num: "234", title: "Revise the basics: so am I etc",                      subtitle: null },
        { id: "unit-235", num: "235", title: "I (don't) think so. I hope so/not.",                  subtitle: "Structures with so and not" },
        { id: "unit-236", num: "236", title: "Spoken grammar: more practice",                       subtitle: null },
        { id: "unit-237", num: "237", title: "Spoken grammar: revision test",                       subtitle: null },
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

export default function OEGCIntermediatePage() {
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>OEGC Intermediate</span>
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
              <span style={{ fontSize: "32px" }}>📘</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#fed7aa", color: "#9a3412", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              INTERMEDIATE
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
                              path={`/english/grammar/oegc-intermediate/${unit.id}`}
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
