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

/* ─── Book data — Intermediate ─────────────────────────── */
const bookData = {
  id:      "oegc-intermediate",
  title:   "Oxford English Grammar Course",
  level:   "Intermediate",
  authors: "Michael Swan & Catherine Walter",
  cover:   "/books/oegc-intermediate.jpg",
  sections: [
    {
      id: "section-01", num: "01", title: "be and have", icon: "🔤",
      subsections: [
        { title: "Basics", units: [
          { num: "1", label: "Revise the basics: be and have" },
          { num: "2", label: "Revise the basics: there is/was etc" },
          { num: "3", label: "More about there is — There seems to be a delay." },
          { num: "4", label: "have with got and do — We haven't got / don't have time." },
          { num: "5", label: "Habitual and repeated actions — Do you often have colds?" },
          { num: "6", label: "have for actions — I'm going to have a swim." },
        ]},
        { title: "Review", units: [
          { num: "7", label: "be and have: more practice" },
          { num: "8", label: "be and have: revision test" },
        ]},
      ],
    },
    {
      id: "section-02", num: "02", title: "Present Tenses", icon: "🕐",
      subsections: [
        { title: "Basics & Forms", units: [
          { num: "1", label: "Revise the basics: which present tense?" },
          { num: "2", label: "Revise the basics: spelling" },
          { num: "3", label: "Present progressive for changes — Prices are going up." },
          { num: "4", label: "Simple present: instructions etc — You take the first left" },
          { num: "5", label: "Non-progressive verbs — I remember his face." },
        ]},
        { title: "Review", units: [
          { num: "6", label: "Present tenses: more practice" },
          { num: "7", label: "Present tenses: revision test" },
        ]},
      ],
    },
    {
      id: "section-03", num: "03", title: "Talking About the Future", icon: "🔮",
      subsections: [
        { title: "Core Future Forms", units: [
          { num: "1",  label: "Revise the basics: going to" },
          { num: "2",  label: "Revise the basics: present progressive for future" },
          { num: "3",  label: "Revise the basics: will-future" },
          { num: "4",  label: "will in decisions, promises etc — OK, I'll go." },
          { num: "5",  label: "Which future? will, going to or present progressive?" },
          { num: "6",  label: "Simple present — My credit card expires at midnight." },
          { num: "7",  label: "Future progressive — This time tomorrow I'll be skiing." },
          { num: "8",  label: "be + infinitive — You're to do your homework." },
          { num: "9",  label: "Future in the past — I was going to ring you yesterday." },
          { num: "10", label: "Future perfect — He'll have finished the roof by Saturday." },
        ]},
        { title: "Review", units: [
          { num: "11", label: "Talking about the future: more practice" },
          { num: "12", label: "Talking about the future: revision test" },
        ]},
      ],
    },
    {
      id: "section-04", num: "04", title: "Past Tenses", icon: "⏪",
      subsections: [
        { title: "Basics & Forms", units: [
          { num: "1", label: "Revise the basics: simple past forms" },
          { num: "2", label: "Revise the basics: which past tense?" },
          { num: "3", label: "More about past tenses" },
          { num: "4", label: "Past tenses in requests etc — I wondered if you were free." },
        ]},
        { title: "Review", units: [
          { num: "5", label: "Past tenses: more practice" },
          { num: "6", label: "Past tenses: revision test" },
        ]},
      ],
    },
    {
      id: "section-05", num: "05", title: "Perfect Tenses", icon: "✅",
      subsections: [
        { title: "Present Perfect", units: [
          { num: "1",  label: "Revise the basics: present perfect forms and use" },
          { num: "2",  label: "Revise the basics: present perfect or simple past?" },
          { num: "3",  label: "Revise the basics: tenses with time words" },
          { num: "4",  label: "Revise the basics: already, yet and just" },
          { num: "5",  label: "Finished time or up to now? — this morning; at school" },
          { num: "6",  label: "News — We've found oil in the garden!" },
          { num: "7",  label: "News and details — A plane has crashed. It came down …" },
          { num: "8",  label: "Revise the basics: present perfect progressive; since, for" },
          { num: "9",  label: "Present perfect or present perfect progressive?" },
          { num: "10", label: "Simple past and present perfect: summary" },
        ]},
        { title: "Past Perfect", units: [
          { num: "11", label: "Revise the basics: past perfect" },
          { num: "12", label: "More about the past perfect — after I had finished" },
          { num: "13", label: "Past perfect progressive — she had been working too hard" },
          { num: "14", label: "This is the first time etc" },
        ]},
        { title: "Review", units: [
          { num: "15", label: "Perfect tenses: more practice" },
          { num: "16", label: "Perfect tenses: revision test" },
          { num: "17", label: "All past and perfect tenses: revision test" },
        ]},
      ],
    },
    {
      id: "section-06", num: "06", title: "Modal Verbs", icon: "🎛️",
      subsections: [
        { title: "Core Modals", units: [
          { num: "1",  label: "Revise the basics: the grammar of modals" },
          { num: "2",  label: "Revise the basics: must, should and ought to" },
          { num: "3",  label: "have to and must" },
          { num: "4",  label: "must not; do not have to; do not need to / needn't" },
          { num: "5",  label: "had better — You'd better take your umbrella." },
          { num: "6",  label: "supposed to — You're supposed to start work at 8.30." },
          { num: "7",  label: "must/can't: certainty — She must be in. He can't be hungry." },
          { num: "8",  label: "may and might — It may rain. It might even snow." },
          { num: "9",  label: "Revise the basics: permission, requests etc" },
          { num: "10", label: "shall in questions — What shall we do?" },
          { num: "11", label: "can and could (ability): past and future" },
          { num: "12", label: "Revise the basics: used to" },
          { num: "13", label: "will and would: typical behaviour — She will talk to herself." },
          { num: "14", label: "Perfect modal verbs: should have …" },
          { num: "15", label: "Perfect modal verbs: may have …; must have …" },
          { num: "16", label: "Perfect modal verbs: could have …; needn't have …" },
        ]},
        { title: "Review", units: [
          { num: "17", label: "Modal verbs: more practice" },
          { num: "18", label: "Modal verbs: revision test" },
        ]},
      ],
    },
    {
      id: "section-07", num: "07", title: "Passives", icon: "🔄",
      subsections: [
        { title: "Forms & Uses", units: [
          { num: "1", label: "Revise the basics: active and passive" },
          { num: "2", label: "Passive infinitives and -ing forms — to be seen; being seen" },
          { num: "3", label: "Passives: verbs with two objects — Susan was given a prize." },
          { num: "4", label: "Prepositions with passives — Ted likes being read to." },
          { num: "5", label: "Reasons for using passives" },
        ]},
        { title: "Review", units: [
          { num: "6", label: "Passives: more practice" },
          { num: "7", label: "Passives: revision test" },
        ]},
      ],
    },
    {
      id: "section-08", num: "08", title: "Questions and Negatives", icon: "❓",
      subsections: [
        { title: "Questions", units: [
          { num: "1", label: "Revise the basics: questions" },
          { num: "2", label: "Question-word subjects — Who won? What happened?" },
          { num: "3", label: "Prepositions in questions — What are you thinking about?" },
          { num: "4", label: "Revise the basics: negatives" },
          { num: "5", label: "Negative questions — Aren't you well?" },
        ]},
        { title: "Review", units: [
          { num: "6", label: "Questions and negatives: more practice" },
          { num: "7", label: "Questions and negatives: revision test" },
        ]},
      ],
    },
    {
      id: "section-09", num: "09", title: "Infinitives and -ing Forms", icon: "∞",
      subsections: [
        { title: "Infinitives", units: [
          { num: "1", label: "Revise the basics: infinitive with and without to" },
          { num: "2", label: "Revise the basics: infinitive of purpose" },
          { num: "3", label: "Revise the basics: verb + infinitive or -ing form" },
          { num: "4", label: "Revise the basics: preposition + -ing form" },
          { num: "5", label: "More about infinitives: to sit, to be sitting, …" },
          { num: "6", label: "Perfect infinitives: to have gone etc" },
          { num: "7", label: "to for whole infinitive — I'd like to. I don't want to." },
        ]},
        { title: "-ing Forms", units: [
          { num: "8",  label: "-ing forms as subjects, objects etc — Smoking is bad for you" },
          { num: "9",  label: "More about verb + infinitive or -ing form" },
          { num: "10", label: "go …ing — She's gone shopping." },
          { num: "11", label: "-ing form and infinitive both possible" },
          { num: "12", label: "Verb + object + infinitive — He wants me to wash his socks." },
          { num: "13", label: "Adjective + infinitive or -ing form — pleased to see etc" },
          { num: "14", label: "Noun + infinitive or -ing form — time to go; fear of flying" },
          { num: "15", label: "More about noun/pronoun + infinitive — nothing to wear" },
          { num: "16", label: "for … to … — It's time for the postman to come." },
          { num: "17", label: "More about adjective + infinitive — easy to please etc" },
          { num: "18", label: "before, after, since, by and for + -ing" },
          { num: "19", label: "to …ing — I look forward to seeing you." },
        ]},
        { title: "Review", units: [
          { num: "20", label: "Infinitives and -ing forms: more practice" },
          { num: "21", label: "Infinitives and -ing forms: revision test" },
        ]},
      ],
    },
    {
      id: "section-10", num: "10", title: "Various Structures with Verbs", icon: "⚙️",
      subsections: [
        { title: "Structures", units: [
          { num: "1", label: "Revise the basics: imperatives; let's" },
          { num: "2", label: "Revise the basics: verbs with two objects" },
          { num: "3", label: "Revise the basics: causative have and get" },
          { num: "4", label: "Exclamations — How beautiful! What a surprise!" },
          { num: "5", label: "do: emphatic auxiliary — You do look nice." },
          { num: "6", label: "it: preparatory subject — It's nice to talk to you." },
          { num: "7", label: "Emphasis with it and what — It's not tea that I want." },
          { num: "8", label: "Phrasal verbs — Look out! I'll think it over." },
        ]},
        { title: "Review", units: [
          { num: "9",  label: "Various structures with verbs: more practice" },
          { num: "10", label: "Various structures with verbs: revision test" },
        ]},
      ],
    },
    {
      id: "section-11", num: "11", title: "Articles: a/an and the", icon: "📝",
      subsections: [
        { title: "a/an", units: [
          { num: "1", label: "Revise the basics: a/an and one" },
          { num: "2", label: "Revise the basics: a/an — She's a farmer. He's got a long nose." },
          { num: "3", label: "Revise the basics: a/an — A spider has eight legs. A man called." },
        ]},
        { title: "the", units: [
          { num: "4", label: "Revise the basics: the — Please close the door." },
          { num: "5", label: "Revise the basics: generalisations without the — I like music." },
          { num: "6", label: "the in generalisations — Who invented the telescope?" },
          { num: "7", label: "Place names — Lake Superior; the Atlantic" },
          { num: "8", label: "Other special cases — in prison; She became Queen." },
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
          { num: "1",  label: "Revise the basics: this, that, these, those" },
          { num: "2",  label: "Revise the basics: some and any" },
          { num: "3",  label: "some/any or no article — Have some toast. I don't like toast." },
          { num: "4",  label: "any, not any, no and none" },
          { num: "5",  label: "any = 'one or the other – it's not important which'" },
          { num: "6",  label: "Revise the basics: much, many, a lot of" },
          { num: "7",  label: "Revise the basics: enough, too and too much" },
          { num: "8",  label: "Revise the basics: (a) little, (a) few" },
          { num: "9",  label: "less and least, fewer and fewest" },
          { num: "10", label: "Revise the basics: all" },
          { num: "11", label: "Revise the basics: all, every, everybody, everything" },
          { num: "12", label: "every and each; every one" },
          { num: "13", label: "both, either and neither" },
          { num: "14", label: "which? and what?" },
          { num: "15", label: "other(s) and another" },
          { num: "16", label: "Determiners and of — most people; most of us" },
        ]},
        { title: "Review", units: [
          { num: "17", label: "Determiners: more practice" },
          { num: "18", label: "Determiners: revision test" },
        ]},
      ],
    },
    {
      id: "section-13", num: "13", title: "Personal Pronouns and Possessives", icon: "👤",
      subsections: [
        { title: "Pronouns & Possessives", units: [
          { num: "1", label: "Revise the basics: I, me, my, mine etc" },
          { num: "2", label: "Possessives — a friend of mine / Anne broke her arm." },
          { num: "3", label: "Personal pronouns — 'Who's that?' 'It's me.'" },
          { num: "4", label: "Reflexives — She taught herself to play the guitar." },
          { num: "5", label: "you, one and they — You can't learn French in a month." },
        ]},
        { title: "Review", units: [
          { num: "6", label: "Personal pronouns and possessives: more practice" },
          { num: "7", label: "Personal pronouns and possessives: revision test" },
        ]},
      ],
    },
    {
      id: "section-14", num: "14", title: "Nouns", icon: "🏷️",
      subsections: [
        { title: "Noun Forms & Uses", units: [
          { num: "1",  label: "Revise the basics: countable and uncountable nouns" },
          { num: "2",  label: "More about countable and uncountable nouns" },
          { num: "3",  label: "Revise the basics: how to spell plurals" },
          { num: "4",  label: "Plurals of nouns: special cases — aircraft, sheep, arms" },
          { num: "5",  label: "Mixed singular and plural — My family are angry with me." },
          { num: "6",  label: "Revise the basics: possessive 's" },
          { num: "7",  label: "Possessive 's or of … — my father's name; the name of the book" },
          { num: "8",  label: "Revise the basics: noun + noun" },
          { num: "9",  label: "Noun + noun or preposition — road signs; signs of anger" },
          { num: "10", label: "one(s) — a big one with cream" },
        ]},
        { title: "Review", units: [
          { num: "11", label: "Nouns: more practice" },
          { num: "12", label: "Nouns: revision test" },
        ]},
      ],
    },
    {
      id: "section-15", num: "15", title: "Adjectives and Adverbs", icon: "✨",
      subsections: [
        { title: "Adjectives", units: [
          { num: "1", label: "Revise the basics: adjectives, adverbs of manner" },
          { num: "2", label: "interested and interesting etc" },
          { num: "3", label: "Adjectives without nouns — in the country of the blind" },
          { num: "4", label: "Order of adjectives — a terrible little boy; old and grey" },
        ]},
        { title: "Adverbs", units: [
          { num: "5", label: "Adverbs with the verb — I can never wake up in time." },
          { num: "6", label: "even and only; end-position adverbs" },
          { num: "7", label: "Confusing adjectives and adverbs: fast, hard, late, …" },
        ]},
        { title: "Review", units: [
          { num: "8", label: "Adjectives and adverbs: more practice" },
          { num: "9", label: "Adjectives and adverbs: revision test" },
        ]},
      ],
    },
    {
      id: "section-16", num: "16", title: "Comparison", icon: "⚖️",
      subsections: [
        { title: "Comparatives & Superlatives", units: [
          { num: "1", label: "Revise the basics: comparative and superlative adjectives" },
          { num: "2", label: "Revise the basics: comparative and superlative adverbs" },
          { num: "3", label: "as … as — as many people as possible" },
          { num: "4", label: "More on comparatives — taller and taller; the more the better" },
          { num: "5", label: "More about superlatives — the best player of us all" },
          { num: "6", label: "like and as; so and such" },
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
        { title: "Core Conjunctions", units: [
          { num: "1", label: "Revise the basics: use and position of conjunctions" },
          { num: "2", label: "Revise the basics: present for future — I'll tell you when I know." },
          { num: "3", label: "Using certain conjunctions: so that, as long as, until etc" },
          { num: "4", label: "Leaving out that — She knew I was right." },
          { num: "5", label: "both …and; (n)either … (n)or" },
          { num: "6", label: "Perfect for completion — when I've finished" },
          { num: "7", label: "Tenses with since and for — … since we were students" },
          { num: "8", label: "Conjunction + -ing or -ed — after talking to you; until cooked" },
          { num: "9", label: "Clauses without conjunctions — Putting down my book …" },
        ]},
        { title: "Review", units: [
          { num: "10", label: "Conjunctions: more practice" },
          { num: "11", label: "Conjunctions: revision test" },
        ]},
      ],
    },
    {
      id: "section-18", num: "18", title: "if etc", icon: "🔀",
      subsections: [
        { title: "Conditionals", units: [
          { num: "1",  label: "Revise the basics: ordinary tense use" },
          { num: "2",  label: "Revise the basics: If I had a million dollars, …" },
          { num: "3",  label: "Revise the basics: if I go and if I went" },
          { num: "4",  label: "could = 'would be able to' — We could go cycling if …" },
          { num: "5",  label: "Unreal past situations — If Jane hadn't helped me, …" },
          { num: "6",  label: "unless — Come tonight unless I phone." },
          { num: "7",  label: "if only and I wish: tenses — If only I knew …" },
          { num: "8",  label: "in case — I'm taking my umbrella in case it rains." },
          { num: "9",  label: "it's time and I'd rather: tenses — It's time you had a haircut." },
        ]},
        { title: "Review", units: [
          { num: "10", label: "if etc: more practice" },
          { num: "11", label: "if etc: revision test" },
        ]},
      ],
    },
    {
      id: "section-19", num: "19", title: "Relatives", icon: "🔁",
      subsections: [
        { title: "Relative Clauses", units: [
          { num: "1", label: "Revise the basics: who(m), which and that" },
          { num: "2", label: "Revise the basics: leaving out relative pronouns" },
          { num: "3", label: "what = 'the thing(s) that' — Take what you like." },
          { num: "4", label: "whose — a girl whose beauty …" },
          { num: "5", label: "Prepositions in relative clauses — the girl I was talking about" },
          { num: "6", label: "Reduced relative clauses — luggage left unattended" },
          { num: "7", label: "Non-identifying relative clauses — Kelly, who does my hair, …" },
          { num: "8", label: "Reading sentences with relative clauses" },
        ]},
        { title: "Review", units: [
          { num: "9",  label: "Relatives: more practice" },
          { num: "10", label: "Relatives: revision test" },
        ]},
      ],
    },
    {
      id: "section-20", num: "20", title: "Indirect Speech", icon: "💬",
      subsections: [
        { title: "Reported Speech", units: [
          { num: "1", label: "Revise the basics: why things change" },
          { num: "2", label: "Revise the basics: 'here' and 'now' words" },
          { num: "3", label: "Revise the basics: tenses" },
          { num: "4", label: "Present situations — He proved that the earth is/was round." },
          { num: "5", label: "Revise the basics: indirect questions" },
          { num: "6", label: "Revise the basics: infinitives — He promised to write." },
          { num: "7", label: "Indirect speech: special cases — He said I'd better go." },
        ]},
        { title: "Review", units: [
          { num: "8", label: "Indirect speech: more practice" },
          { num: "9", label: "Indirect speech: revision test" },
        ]},
      ],
    },
    {
      id: "section-21", num: "21", title: "Prepositions", icon: "📍",
      subsections: [
        { title: "Preposition Types", units: [
          { num: "1", label: "Revise the basics: time" },
          { num: "2", label: "Revise the basics: place and movement" },
          { num: "3", label: "Some preposition choices" },
          { num: "4", label: "Verbs with prepositions — Look at her." },
          { num: "5", label: "Nouns with prepositions — lack of sleep" },
          { num: "6", label: "Adjectives with prepositions — full of water" },
          { num: "7", label: "Expressions beginning with prepositions — at a party" },
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
          { num: "1", label: "Spoken sentence structure — It's difficult, the exam." },
          { num: "2", label: "Dropping sentence beginnings — Must dash." },
          { num: "3", label: "Dropping words after auxiliaries — 'Get up!' 'I am!'" },
          { num: "4", label: "Revise the basics: question tags — It's cold, isn't it?" },
          { num: "5", label: "More about question tags — Nobody phoned, did they?" },
          { num: "6", label: "Revise the basics: short answers and reply questions" },
          { num: "7", label: "Revise the basics: so am I etc" },
          { num: "8", label: "Structures with so and not — I (don't) think so. I hope so/not." },
        ]},
        { title: "Review", units: [
          { num: "9",  label: "Spoken grammar: more practice" },
          { num: "10", label: "Spoken grammar: revision test" },
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

/* ─── SubsectionBlock ────────────────────────────────────── */
function SubsectionBlock({ sub, sc, locked }) {
  const isReview = sub.title === "Review";
  return (
    <div style={{ marginBottom: "13px" }}>
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

      <div style={{ padding: "14px 16px 4px", flex: 1 }}>
        {section.subsections.map((sub, i) => (
          <SubsectionBlock key={i} sub={sub} sc={sc} locked={locked} />
        ))}
      </div>

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
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 20px",
        backgroundColor: open && !locked ? sc.bg : "#ffffff",
        transition: "background-color 0.2s",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
          backgroundColor: locked ? "#e5e7eb" : sc.numBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 800,
          color: locked ? "#9ca3af" : sc.text,
        }}>
          {section.num}
        </div>
        <span style={{ fontSize: "20px", flexShrink: 0 }}>{section.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: locked ? "#9ca3af" : sc.text, margin: 0, lineHeight: 1.3 }}>
            {section.title}
          </p>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
            {section.subsections.filter(s => s.title !== "Review").length} subsections · {countUnits(section)} lessons
          </p>
        </div>
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
                    fontSize: "9px", display: "inline-block",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}>▼</span>
                </button>
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
export default function OEGCIntermediatePage() {
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

      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── BOOK HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "36px" }}>
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "1px solid #d1d5db" }}>
            <img src={bookData.cover} alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📘</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              INTERMEDIATE
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
              const href   = locked ? "#" : `/english/grammar/oegc-intermediate/${section.id}`;
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
              const href   = locked ? "#" : `/english/grammar/oegc-intermediate/${section.id}`;
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
