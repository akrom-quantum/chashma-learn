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

// Level badge config
const LEVEL_META = {
  elementary:   { label: "Basic",        short: "B", bg: "#d1fae5", text: "#065f46", dot: "#059669" },
  intermediate: { label: "Intermediate", short: "I", bg: "#dbeafe", text: "#1e40af", dot: "#2563eb" },
  upper:        { label: "Upper",        short: "U", bg: "#fce7f3", text: "#9d174d", dot: "#db2777" },
};

// Source helper — builds the route and display text for a source reference
function makeSource(level, unitNum, unitTitle) {
  const bookSlug = `ows-${level}`; // ows-elementary / ows-intermediate / ows-upper
  const paddedNum = String(unitNum).padStart(2, "0");
  const unitSlug  = `unit-${paddedNum}`;
  const meta = LEVEL_META[level];
  return {
    level,
    unitNum,
    unitTitle,
    href:  `/english/vocabulary/${bookSlug}/${unitSlug}`,
    meta,
  };
}

// ─── UNIFIED DATA ────────────────────────────────────────────────────────────
// Each topic: { id, title, focus, sources: [...] }
const sections = [
  {
    id: "learning",
    title: "Learning & Language Awareness",
    icon: "🔤",
    topics: [
      {
        id: "vocab-learning",
        title: "Vocabulary Learning Strategies",
        focus: "Progression from basic recording strategies → collocational networks → stylistic awareness",
        sources: [
          makeSource("elementary",   4,  "Learning new words"),
          makeSource("intermediate", 1,  "Vocabulary learning"),
          makeSource("upper",        1,  "Meaning and style"),
        ],
      },
      {
        id: "using-dictionary",
        title: "Using a Dictionary",
        focus: "From guided self-study tool → standard dictionary skills → advanced corpus-based lookup",
        sources: [
          makeSource("elementary",   3,  "Using this book"),
          makeSource("intermediate", 3,  "Using an English dictionary"),
          makeSource("upper",        6,  "Using a dictionary"),
        ],
      },
      {
        id: "classroom-grammar",
        title: "Classroom & Grammar Vocabulary",
        focus: "Foundational metalanguage for beginner learners in instructed settings",
        sources: [
          makeSource("elementary",   1,  "Classroom vocabulary"),
          makeSource("elementary",   2,  "Grammar words"),
          makeSource("elementary",   5,  "Classroom activities"),
        ],
      },
      {
        id: "word-formation",
        title: "Word Families & Word Formation",
        focus: "Systematic morphology study; Advanced adds corpus-informed frequency and register",
        sources: [
          makeSource("intermediate", 71, "Word building: prefixes"),
          makeSource("intermediate", 72, "Word building: suffixes"),
          makeSource("upper",        3,  "Word families"),
          makeSource("upper",        91, "Prefixes"),
          makeSource("upper",        92, "Suffixes that form nouns"),
          makeSource("upper",        93, "Suffixes that form adjectives and verbs"),
        ],
      },
      {
        id: "collocations",
        title: "Collocations",
        focus: "Advanced treats collocation as a primary organising principle",
        sources: [
          makeSource("upper",        4,  "Collocation"),
        ],
      },
      {
        id: "compounds",
        title: "Compound Words",
        focus: "Noun compounds → full compound adjective/noun system with spelling conventions",
        sources: [
          makeSource("elementary",   79, "Compound nouns"),
          makeSource("upper",        5,  "Compounds"),
        ],
      },
      {
        id: "familiar-new-meanings",
        title: "Familiar Words with New Meanings",
        focus: "Explores how known words shift meaning across contexts",
        sources: [
          makeSource("upper",        2,  "Familiar words, new meanings"),
        ],
      },
      {
        id: "punctuation",
        title: "English Punctuation & Written Conventions",
        focus: "Practical writing mechanics: comma, semicolon, colon, apostrophe",
        sources: [
          makeSource("intermediate", 4,  "English punctuation"),
        ],
      },
      {
        id: "american-english",
        title: "American vs. British English",
        focus: "Register and variety awareness",
        sources: [
          makeSource("intermediate", 100, "American English"),
        ],
      },
      {
        id: "abbreviations",
        title: "Abbreviations & Short Forms",
        focus: "Active use → passive reference tool",
        sources: [
          makeSource("intermediate", 99, "Abbreviations and short forms"),
        ],
      },
    ],
  },
  {
    id: "numbers-time",
    title: "Numbers, Time & Dates",
    icon: "🔢",
    topics: [
      {
        id: "numbers",
        title: "Numbers",
        focus: "Cardinal, ordinal, fractions, decimals",
        sources: [ makeSource("elementary", 6, "Numbers") ],
      },
      {
        id: "telling-time",
        title: "Telling the Time",
        focus: "Digital and analogue; formal and informal",
        sources: [ makeSource("elementary", 7, "Telling the time") ],
      },
      {
        id: "days-dates",
        title: "Days, Seasons and Dates",
        focus: "Calendar vocabulary",
        sources: [ makeSource("elementary", 8, "Days, seasons and dates") ],
      },
      {
        id: "time-words",
        title: "Time Words and Phrases",
        focus: "Concrete time expressions → preposition precision → abstract temporal concepts",
        sources: [
          makeSource("elementary",   9,  "Time words and phrases"),
          makeSource("intermediate", 38, "Prepositions in time phrases"),
          makeSource("upper",        74, "Time"),
        ],
      },
    ],
  },
  {
    id: "body-physical",
    title: "People: The Body & Physical World",
    icon: "🧠",
    topics: [
      {
        id: "body-parts",
        title: "Parts of the Body",
        focus: "Basic labelling → body systems and discomfort → appearance description",
        sources: [
          makeSource("elementary",   10, "Parts of the body"),
          makeSource("intermediate", 5,  "The body"),
          makeSource("upper",        7,  "Describing appearance"),
        ],
      },
      {
        id: "physical-actions",
        title: "Physical Actions & Movement",
        focus: "Core action verbs → precise manner-of-movement vocabulary",
        sources: [
          makeSource("elementary",   12, "Physical actions"),
          makeSource("upper",        9,  "Physical actions"),
          makeSource("upper",        10, "Physical movement"),
        ],
      },
      {
        id: "appearance",
        title: "Describing People: Appearance",
        focus: "Basic description → richer detail → synonym discrimination and connotation",
        sources: [
          makeSource("elementary",   11, "Describing people"),
          makeSource("intermediate", 6,  "Appearance"),
          makeSource("upper",        7,  "Describing appearance"),
        ],
      },
      {
        id: "body-language",
        title: "Body Language & Non-verbal Communication",
        focus: "Gesture, posture, eye contact, facial expression vocabulary",
        sources: [
          makeSource("upper",        8,  "Body language"),
        ],
      },
      {
        id: "senses",
        title: "The Senses",
        focus: "General sense verbs → specialised vocabulary per sense modality",
        sources: [
          makeSource("intermediate", 47, "The five senses"),
          makeSource("upper",        11, "Sight"),
          makeSource("upper",        12, "Sounds and hearing"),
          makeSource("upper",        13, "Touch"),
        ],
      },
    ],
  },
  {
    id: "feelings-personality",
    title: "Feelings, Personality & Relationships",
    icon: "😊",
    topics: [
      {
        id: "feelings",
        title: "Feelings and Emotions",
        focus: "Basic emotional vocabulary → intermediate range → advanced nuance and formal register",
        sources: [
          makeSource("elementary",   17, "Feelings"),
          makeSource("intermediate", 8,  "Feelings and emotions"),
          makeSource("upper",        18, "Feelings"),
        ],
      },
      {
        id: "personality",
        title: "Personality and Character",
        focus: "Simple adjectives → complex character traits → evaluative and critical assessment",
        sources: [
          makeSource("elementary",   15, "Personality"),
          makeSource("intermediate", 7,  "Character"),
          makeSource("upper",        16, "Character"),
          makeSource("upper",        17, "Assessing character"),
        ],
      },
      {
        id: "personal-qualities",
        title: "Personal Qualities",
        focus: "Leadership, creativity, resilience, empathy",
        sources: [
          makeSource("intermediate", 9,  "Personal qualities"),
        ],
      },
      {
        id: "relationships",
        title: "Relationships",
        focus: "Basic relationship words → friendship dynamics → relationship quality and nuance",
        sources: [
          makeSource("elementary",   16, "Relationships"),
          makeSource("intermediate", 10, "Friendship"),
          makeSource("upper",        19, "Relationships"),
        ],
      },
      {
        id: "family",
        title: "Family",
        focus: "Vocabulary for members → family types → relationship quality within families",
        sources: [
          makeSource("elementary",   14, "Family"),
          makeSource("intermediate", 11, "Families"),
          makeSource("upper",        22, "Families"),
        ],
      },
      {
        id: "marriage",
        title: "Marriage and Life Events",
        focus: "Life stage vocabulary → complex relationship dynamics",
        sources: [
          makeSource("intermediate", 12, "Marriage and divorce"),
          makeSource("upper",        19, "Relationships"),
        ],
      },
      {
        id: "heroes-villains",
        title: "Heroes, Villains & Moral Behaviour",
        focus: "Moral and evaluative vocabulary",
        sources: [
          makeSource("upper",        20, "Heroes and villains"),
          makeSource("upper",        21, "Behaviour"),
          makeSource("upper",        23, "Manners"),
        ],
      },
      {
        id: "personal-info",
        title: "Personal Information",
        focus: "Name, age, address, nationality, occupation — form-filling contexts",
        sources: [
          makeSource("elementary",   13, "Personal information"),
        ],
      },
    ],
  },
  {
    id: "natural-world",
    title: "The Natural World",
    icon: "🌍",
    topics: [
      {
        id: "geography",
        title: "Geography",
        focus: "Basic landmarks → precise geographical terminology",
        sources: [
          makeSource("elementary",   33, "Geography"),
          makeSource("intermediate", 13, "Geography"),
        ],
      },
      {
        id: "countries-nationalities",
        title: "Countries and Nationalities",
        focus: "Adjective forms, languages",
        sources: [
          makeSource("elementary",   35, "Countries and nationalities"),
        ],
      },
      {
        id: "weather",
        title: "Weather",
        focus: "Basic weather words → conditions vocabulary → nuanced descriptive adjectives",
        sources: [
          makeSource("elementary",   37, "Weather"),
          makeSource("intermediate", 15, "Weather conditions"),
          makeSource("upper",        28, "Weather"),
        ],
      },
      {
        id: "environment",
        title: "The Environment and Climate",
        focus: "Problem vocabulary → solutions vocabulary → policy and debate language",
        sources: [
          makeSource("intermediate", 16, "Climate change"),
          makeSource("intermediate", 17, "Saving the environment"),
          makeSource("upper",        46, "Energy conservation"),
        ],
      },
      {
        id: "animals",
        title: "Animals, Insects and Birds",
        focus: "Basic naming → ecological and behavioural vocabulary",
        sources: [
          makeSource("elementary",   38, "Animals, insects and birds"),
          makeSource("intermediate", 18, "Animals, insects and birds"),
        ],
      },
      {
        id: "wildlife-threat",
        title: "Wildlife Under Threat",
        focus: "Extinction, habitat loss, poaching, conservation",
        sources: [
          makeSource("upper",        47, "Wildlife under threat"),
        ],
      },
      {
        id: "universe-science",
        title: "The Universe and Science",
        focus: "Solar system, galaxy, telescope, orbit, gravity",
        sources: [
          makeSource("intermediate", 14, "The universe and science"),
        ],
      },
      {
        id: "my-country",
        title: "My Country",
        focus: "Landmarks, traditions, culture — personalised",
        sources: [
          makeSource("elementary",   36, "My country"),
        ],
      },
    ],
  },
  {
    id: "prepositions",
    title: "Prepositions",
    icon: "🔵",
    topics: [
      {
        id: "prep-time",
        title: "Prepositions of Time",
        focus: "Core time prepositions → extended time phrase system",
        sources: [
          makeSource("elementary",   18, "Prepositions: time"),
          makeSource("intermediate", 38, "Prepositions in time phrases"),
        ],
      },
      {
        id: "prep-direction",
        title: "Prepositions of Direction",
        focus: "Movement and direction",
        sources: [
          makeSource("elementary",   19, "Prepositions: direction"),
        ],
      },
      {
        id: "prep-place",
        title: "Prepositions of Place",
        focus: "Spatial relationships",
        sources: [
          makeSource("elementary",   20, "Prepositions: place"),
        ],
      },
      {
        id: "prep-phrases",
        title: "Prepositional Phrases",
        focus: "Common fixed phrases → discourse phrases → academic and formal register phrases",
        sources: [
          makeSource("elementary",   21, "Prepositions: phrases"),
          makeSource("intermediate", 40, "Prepositional phrases"),
          makeSource("upper",        98, "Prepositional phrases"),
        ],
      },
      {
        id: "verb-prep",
        title: "Verb + Preposition",
        focus: "High-frequency verb+prep → B2 collocations → C1/C2 formal patterns",
        sources: [
          makeSource("elementary",   22, "Word + preposition"),
          makeSource("intermediate", 36, "Verb + preposition"),
          makeSource("upper",        95, "Verbs with prepositions"),
        ],
      },
      {
        id: "noun-prep",
        title: "Noun + Preposition",
        focus: "Common noun+prep patterns → academic and professional collocations",
        sources: [
          makeSource("intermediate", 37, "Noun + preposition"),
          makeSource("upper",        96, "Nouns with prepositions"),
        ],
      },
      {
        id: "adj-prep",
        title: "Adjective + Preposition",
        focus: "Common adj+prep → nuanced and formal collocational patterns",
        sources: [
          makeSource("intermediate", 39, "Adjective + preposition"),
          makeSource("upper",        97, "Adjectives with prepositions"),
        ],
      },
    ],
  },
  {
    id: "everyday-life",
    title: "Everyday Life",
    icon: "🏠",
    topics: [
      {
        id: "routines",
        title: "Routines and Daily Life",
        focus: "Daily schedule vocabulary",
        sources: [
          makeSource("elementary",   23, "Routines"),
        ],
      },
      {
        id: "clothes-fashion",
        title: "Clothes and Fashion",
        focus: "Basic items → clothing detail and fashion → evaluative and descriptive vocabulary",
        sources: [
          makeSource("elementary",   24, "Clothes"),
          makeSource("elementary",   25, "Accessories"),
          makeSource("elementary",   26, "Colours, size and appearance"),
          makeSource("intermediate", 27, "Clothing"),
          makeSource("intermediate", 28, "Fashion"),
          makeSource("upper",        29, "Clothes"),
        ],
      },
      {
        id: "money-finance",
        title: "Money and Finance",
        focus: "Basic transactions → financial systems → personal investment vocabulary",
        sources: [
          makeSource("elementary",   27, "Money"),
          makeSource("intermediate", 80, "Finance"),
          makeSource("upper",        32, "Personal finance"),
        ],
      },
      {
        id: "shopping",
        title: "Shopping",
        focus: "Physical shopping → extended retail and online shopping vocabulary",
        sources: [
          makeSource("elementary",   28, "Shopping"),
          makeSource("intermediate", 26, "Shopping"),
        ],
      },
      {
        id: "possessions",
        title: "Possessions",
        focus: "Own, belong to, valuable, lend, borrow",
        sources: [
          makeSource("elementary",   29, "Possessions"),
        ],
      },
      {
        id: "crime",
        title: "Crime",
        focus: "Basic crime vocabulary → crime types → legal and procedural vocabulary",
        sources: [
          makeSource("elementary",   30, "Crime"),
          makeSource("intermediate", 48, "Crime"),
          makeSource("upper",        33, "Crime"),
        ],
      },
      {
        id: "justice",
        title: "The Justice System",
        focus: "Trial process → policing methods → prison and rehabilitation vocabulary",
        sources: [
          makeSource("intermediate", 49, "The justice system"),
          makeSource("upper",        53, "The police"),
          makeSource("upper",        54, "Prisons"),
        ],
      },
      {
        id: "sleep",
        title: "Sleep",
        focus: "Insomnia, drowsy, doze, nightmare, restless",
        sources: [
          makeSource("upper",        31, "Sleep"),
        ],
      },
      {
        id: "urban-living",
        title: "Urban Living",
        focus: "Commute, congestion, urban sprawl, infrastructure, gentrification",
        sources: [
          makeSource("upper",        34, "Urban living"),
        ],
      },
      {
        id: "rural-life",
        title: "Rural Life",
        focus: "Isolated, smallholding, pastoral, agricultural, hamlet",
        sources: [
          makeSource("upper",        35, "Rural life"),
        ],
      },
    ],
  },
  {
    id: "home",
    title: "The Home",
    icon: "🏡",
    topics: [
      {
        id: "home-vocab",
        title: "Home Vocabulary",
        focus: "Basic home vocabulary → interior description and evaluation",
        sources: [
          makeSource("elementary",   58, "Home"),
          makeSource("upper",        30, "At home"),
        ],
      },
      {
        id: "kitchen",
        title: "Kitchen",
        focus: "Appliances, utensils, cooker, fridge, kettle",
        sources: [
          makeSource("elementary",   59, "Kitchen"),
        ],
      },
      {
        id: "bedroom-bathroom",
        title: "Bedroom and Bathroom",
        focus: "Wardrobe, pillow, shower, tap, mirror",
        sources: [
          makeSource("elementary",   60, "Bedroom and bathroom"),
        ],
      },
      {
        id: "living-room",
        title: "Living Room",
        focus: "Sofa, cushion, bookshelf, remote control, curtains",
        sources: [
          makeSource("elementary",   61, "Living room"),
        ],
      },
      {
        id: "household-tasks",
        title: "Household Tasks",
        focus: "Domestic chore verbs: hoover, dust, mop, do the laundry",
        sources: [
          makeSource("intermediate", 42, "Household tasks"),
        ],
      },
      {
        id: "buying-renting",
        title: "Buying and Renting Property",
        focus: "Estate agent, surveyor, lease, deposit, tenure",
        sources: [
          makeSource("upper",        38, "Buying and renting"),
        ],
      },
      {
        id: "gardening",
        title: "Gardens and Gardening",
        focus: "Prune, weed, compost, lawn, border, perennial",
        sources: [
          makeSource("upper",        39, "Gardens and gardening"),
        ],
      },
    ],
  },
  {
    id: "food-drink",
    title: "Food and Drink",
    icon: "🍽️",
    topics: [
      {
        id: "food-shopping",
        title: "Shopping for Food",
        focus: "Supermarket, aisle, trolley, organic, special offer",
        sources: [
          makeSource("elementary",   45, "Shopping for food"),
        ],
      },
      {
        id: "fruit-veg",
        title: "Fruit and Vegetables",
        focus: "Common produce → wider range including herbs and less common varieties",
        sources: [
          makeSource("elementary",   46, "Fruit and vegetables"),
          makeSource("intermediate", 23, "Fruit, vegetables and herbs"),
        ],
      },
      {
        id: "meat-fish",
        title: "Meat and Fish",
        focus: "Chicken, beef, salmon; raw, cooked, grilled",
        sources: [
          makeSource("elementary",   47, "Meat and fish"),
        ],
      },
      {
        id: "containers-quantities",
        title: "Containers and Quantities",
        focus: "A jar of, a portion of, a pinch of, a bunch of",
        sources: [
          makeSource("intermediate", 24, "Containers and quantities"),
        ],
      },
      {
        id: "cooking",
        title: "Cooking",
        focus: "Cooking method verbs → food description and evaluative vocabulary",
        sources: [
          makeSource("intermediate", 25, "Cooking"),
          makeSource("upper",        24, "Food"),
          makeSource("upper",        25, "Opinions about food"),
        ],
      },
      {
        id: "restaurant",
        title: "Eating in a Restaurant",
        focus: "Menu, ordering, bill, complaints, service",
        sources: [
          makeSource("elementary",   48, "A restaurant table"),
          makeSource("elementary",   49, "Eating in a restaurant"),
        ],
      },
      {
        id: "cafe",
        title: "Cafés and Informal Eating",
        focus: "Takeaway, sandwich, snack, hot drink, counter",
        sources: [
          makeSource("elementary",   50, "In a café"),
        ],
      },
    ],
  },
  {
    id: "transport",
    title: "Transport and Travel",
    icon: "🚌",
    topics: [
      {
        id: "vehicles-roads",
        title: "Vehicles and Roads",
        focus: "Basic transport vocabulary → road features → driving action vocabulary",
        sources: [
          makeSource("elementary",   51, "Vehicles and roads"),
          makeSource("intermediate", 31, "Roads"),
          makeSource("upper",        26, "Cars and driving"),
        ],
      },
      {
        id: "driving-accidents",
        title: "Driving and Accidents",
        focus: "Everyday driving experiences → accident and emergency vocabulary",
        sources: [
          makeSource("intermediate", 32, "Driving"),
          makeSource("upper",        27, "Accidents"),
        ],
      },
      {
        id: "buses",
        title: "Buses",
        focus: "Stop, route, fare, timetable, get on/off",
        sources: [
          makeSource("elementary",   52, "Buses"),
        ],
      },
      {
        id: "trains",
        title: "Trains",
        focus: "Basic train vocabulary → commuting and travel management",
        sources: [
          makeSource("elementary",   53, "Trains"),
          makeSource("intermediate", 33, "Trains and buses"),
        ],
      },
      {
        id: "air-travel",
        title: "Air Travel",
        focus: "Basic airport process → full flight experience vocabulary",
        sources: [
          makeSource("elementary",   89, "Airports"),
          makeSource("intermediate", 34, "Air travel"),
        ],
      },
      {
        id: "directions",
        title: "Directions and Navigation",
        focus: "Giving and following directions",
        sources: [
          makeSource("elementary",   54, "Directions"),
        ],
      },
      {
        id: "signs",
        title: "Signs and Notices",
        focus: "Functional reading in public spaces",
        sources: [
          makeSource("elementary",   55, "Signs and notices"),
        ],
      },
    ],
  },
  {
    id: "places",
    title: "Places and Towns",
    icon: "📍",
    topics: [
      {
        id: "town",
        title: "My Town / City",
        focus: "Post office, bank, supermarket, library, town square, parking",
        sources: [
          makeSource("elementary",   56, "My town"),
        ],
      },
      {
        id: "countryside",
        title: "The Countryside",
        focus: "Field, forest, river, hill, farm, path, scenery",
        sources: [
          makeSource("elementary",   57, "The countryside"),
        ],
      },
      {
        id: "buildings",
        title: "Buildings and Structures",
        focus: "Facade, storey, extension, renovation, derelict",
        sources: [
          makeSource("intermediate", 43, "Buildings"),
        ],
      },
      {
        id: "shapes",
        title: "Shapes and Lines",
        focus: "Circular, rectangular, diagonal, curved, parallel",
        sources: [
          makeSource("intermediate", 45, "Shapes and lines"),
        ],
      },
    ],
  },
  {
    id: "social-political",
    title: "Social and Political Issues",
    icon: "⚖️",
    topics: [
      {
        id: "politics",
        title: "Politics and Ideology",
        focus: "Basic political processes → ideological frameworks → political action vocabulary",
        sources: [
          makeSource("intermediate", 51, "Politics"),
          makeSource("upper",        50, "Politics: ideology"),
          makeSource("upper",        58, "Politics in practice"),
        ],
      },
      {
        id: "war-conflict",
        title: "War and Conflict",
        focus: "Conflict and peace vocabulary → military structure and operations",
        sources: [
          makeSource("intermediate", 52, "War and peace"),
          makeSource("upper",        55, "The armed forces"),
        ],
      },
      {
        id: "history",
        title: "Events in History",
        focus: "Revolution, empire, colonialism, independence, treaty",
        sources: [
          makeSource("intermediate", 53, "Events in history"),
        ],
      },
      {
        id: "social-issues",
        title: "Social Issues",
        focus: "Domestic social problems → migration and integration vocabulary",
        sources: [
          makeSource("intermediate", 54, "Social issues"),
          makeSource("upper",        49, "Migration"),
        ],
      },
      {
        id: "protest",
        title: "Protest Movements",
        focus: "Activist, boycott, demonstration, campaign, civil disobedience",
        sources: [
          makeSource("upper",        59, "Protest movements"),
        ],
      },
      {
        id: "public-health",
        title: "Health Issues (Public Health)",
        focus: "Obesity, addiction, mental health, epidemic, healthcare",
        sources: [
          makeSource("intermediate", 50, "Health issues"),
        ],
      },
      {
        id: "local-gov",
        title: "Local Government",
        focus: "Council, borough, planning permission, infrastructure, levy",
        sources: [
          makeSource("upper",        51, "Local government"),
        ],
      },
      {
        id: "healthcare-services",
        title: "Healthcare Services",
        focus: "GP, referral, outpatient, prescription, triage",
        sources: [
          makeSource("upper",        52, "Healthcare services"),
        ],
      },
      {
        id: "medical-advances",
        title: "Medical Advances",
        focus: "Clinical trial, vaccine, gene therapy, transplant, diagnosis",
        sources: [
          makeSource("upper",        48, "Medical advances"),
        ],
      },
    ],
  },
  {
    id: "health-body",
    title: "Health and the Body",
    icon: "🤒",
    topics: [
      {
        id: "illness",
        title: "Illness",
        focus: "Basic illness vocabulary → medical interactions → clinical and diagnostic vocabulary",
        sources: [
          makeSource("elementary",   31, "Illness"),
          makeSource("intermediate", 29, "Illness and accidents"),
          makeSource("upper",        14, "Illness"),
        ],
      },
      {
        id: "injuries",
        title: "Injuries",
        focus: "Basic injury words → accident contexts → formal medical injury vocabulary",
        sources: [
          makeSource("elementary",   32, "Injuries"),
          makeSource("intermediate", 29, "Illness and accidents"),
          makeSource("upper",        27, "Accidents"),
        ],
      },
      {
        id: "hospital",
        title: "Hospital",
        focus: "Ward, surgeon, operation, anaesthetic, discharge, scan",
        sources: [
          makeSource("intermediate", 30, "Hospital"),
        ],
      },
    ],
  },
  {
    id: "verbs",
    title: "Verbs: Core & Special Cases",
    icon: "🔵",
    topics: [
      {
        id: "irregular-verbs",
        title: "Irregular Verbs",
        focus: "Core irregular verbs → full B2-level list",
        sources: [
          makeSource("elementary",   39, "Irregular verbs"),
          makeSource("intermediate", 55, "Irregular verbs"),
        ],
      },
      {
        id: "have-got",
        title: "have / have got",
        focus: "Possession, characteristics, experiences",
        sources: [
          makeSource("elementary",   40, "have got and have"),
        ],
      },
      {
        id: "make-do",
        title: "make or do",
        focus: "High-frequency collocational distinction",
        sources: [
          makeSource("elementary",   41, "make or do"),
        ],
      },
      {
        id: "get",
        title: "get",
        focus: "Multiple meanings; high-frequency polysemous verb",
        sources: [
          makeSource("elementary",   42, "get"),
        ],
      },
      {
        id: "see",
        title: "see",
        focus: "See a film, see what you mean, see a doctor; idiomatic uses",
        sources: [
          makeSource("elementary",   43, "see"),
        ],
      },
      {
        id: "take",
        title: "take",
        focus: "High-frequency collocations: take a risk, take notes, take place",
        sources: [
          makeSource("intermediate", 58, "take"),
        ],
      },
      {
        id: "verbs-nouns-same",
        title: "Verbs and Nouns with the Same Form",
        focus: "Common conversions → advanced conversion with register awareness",
        sources: [
          makeSource("elementary",   44, "Verbs and nouns with the same form"),
          makeSource("upper",        94, "Verbs and nouns with the same form"),
        ],
      },
      {
        id: "verb-infinitive-ing",
        title: "Verb + Infinitive or -ing Form",
        focus: "Enjoy doing, want to do, remember to/doing",
        sources: [
          makeSource("intermediate", 56, "Verb + infinitive or -ing form"),
        ],
      },
      {
        id: "reflexive-verbs",
        title: "Reflexive Verbs",
        focus: "Enjoy yourself, hurt herself",
        sources: [
          makeSource("intermediate", 57, "Using verbs with reflexive pronouns"),
        ],
      },
      {
        id: "passive",
        title: "The Passive",
        focus: "Vocabulary for passive constructions; formal/written contexts",
        sources: [
          makeSource("upper",        90, "The passive"),
        ],
      },
    ],
  },
  {
    id: "adjectives-adverbs",
    title: "Adjectives and Adverbs",
    icon: "🔵",
    topics: [
      {
        id: "adjectives-general",
        title: "Adjectives: General",
        focus: "Descriptive use → grammatical behaviour → extreme and absolute adjectives",
        sources: [
          makeSource("elementary",   26, "Colours, size and appearance"),
          makeSource("intermediate", 19, "Adjectives (1)"),
          makeSource("intermediate", 20, "Adjectives (2): opposites"),
          makeSource("upper",        99, "Adjectives"),
        ],
      },
      {
        id: "adj-prefixes",
        title: "Adjectives with Prefixes",
        focus: "Negative prefixes → full prefix system for meaning modification",
        sources: [
          makeSource("elementary",   62, "Adjectives with prefixes"),
          makeSource("intermediate", 71, "Word building: prefixes"),
        ],
      },
      {
        id: "adj-opposites",
        title: "Adjective Opposites",
        focus: "Core antonyms → nuanced connotation of near-antonyms",
        sources: [
          makeSource("elementary",   63, "Adjective opposites"),
          makeSource("intermediate", 20, "Adjectives (2): opposites"),
        ],
      },
      {
        id: "adverbs-general",
        title: "Adverbs: General",
        focus: "Basic manner/frequency → degree and emphasis → stance and discourse adverbs",
        sources: [
          makeSource("elementary",   64, "Common adverbs"),
          makeSource("elementary",   65, "Adverbs of manner"),
          makeSource("intermediate", 21, "Adverbs (1): degree and frequency"),
          makeSource("intermediate", 22, "Adverbs (2): emphasizing and manner"),
          makeSource("upper",        100, "Adverbs"),
        ],
      },
    ],
  },
  {
    id: "word-building-nouns",
    title: "Word Building: Nouns",
    icon: "🔵",
    topics: [
      {
        id: "agent-nouns",
        title: "-er / -or / -r Nouns (Agent Nouns)",
        focus: "Teacher, actor, driver, writer, visitor",
        sources: [
          makeSource("elementary",   76, "-er / -or / -r nouns"),
        ],
      },
      {
        id: "ing-nouns",
        title: "-ing Forms as Nouns",
        focus: "Swimming, cooking, reading used as nouns and adjectives",
        sources: [
          makeSource("elementary",   77, "-ing forms"),
        ],
      },
      {
        id: "noun-suffixes",
        title: "Noun Suffixes (General)",
        focus: "Common suffixes → adjective/noun-forming → abstract and ideological noun suffixes",
        sources: [
          makeSource("elementary",   78, "Noun suffixes"),
          makeSource("intermediate", 72, "Word building: suffixes"),
          makeSource("upper",        92, "Suffixes that form nouns"),
          makeSource("upper",        93, "Suffixes that form adjectives and verbs"),
        ],
      },
    ],
  },
  {
    id: "hobbies-leisure",
    title: "Hobbies, Sports and Leisure",
    icon: "🎯",
    topics: [
      {
        id: "likes-dislikes",
        title: "Likes and Dislikes",
        focus: "Basic attitude verbs → more expressive and nuanced preference vocabulary",
        sources: [
          makeSource("elementary",   80, "Likes and dislikes"),
          makeSource("intermediate", 87, "Likes, dislikes and preferences"),
        ],
      },
      {
        id: "free-time",
        title: "Free Time and Hobbies",
        focus: "Hobby, go out, stay in, socialise, spare time activities",
        sources: [
          makeSource("elementary",   81, "Free time"),
        ],
      },
      {
        id: "socializing",
        title: "Socialising",
        focus: "Mingle, host, small talk, networking, toast, gathering",
        sources: [
          makeSource("upper",        44, "Socializing"),
        ],
      },
      {
        id: "sport",
        title: "Sport",
        focus: "Basic sport vocabulary → events and venues → technical football vocabulary",
        sources: [
          makeSource("elementary",   82, "Sport"),
          makeSource("intermediate", 66, "Sporting events"),
          makeSource("intermediate", 67, "Sport: people and places"),
          makeSource("upper",        41, "Competitive football"),
        ],
      },
      {
        id: "music",
        title: "Music",
        focus: "Basic music vocabulary → genres and roles → technical musical vocabulary",
        sources: [
          makeSource("elementary",   83, "Music"),
          makeSource("intermediate", 62, "Music"),
          makeSource("upper",        42, "Music"),
        ],
      },
      {
        id: "films",
        title: "Films",
        focus: "Basic film vocabulary → genre and production → cinematic analysis vocabulary",
        sources: [
          makeSource("elementary",   84, "Films"),
          makeSource("intermediate", 60, "Films"),
          makeSource("upper",        43, "Plays and films"),
        ],
      },
      {
        id: "theatre",
        title: "Theatre and Performing Arts",
        focus: "Theatre-going vocabulary → production and analysis vocabulary",
        sources: [
          makeSource("intermediate", 61, "Theatre"),
          makeSource("upper",        43, "Plays and films"),
        ],
      },
      {
        id: "media",
        title: "The Media",
        focus: "Basic media vocabulary → newspaper-specific vocabulary and journalism",
        sources: [
          makeSource("elementary",   85, "The media"),
          makeSource("intermediate", 64, "Newspapers"),
        ],
      },
      {
        id: "books",
        title: "Books and Literature",
        focus: "Basic book vocabulary → genres and review → literary analysis vocabulary",
        sources: [
          makeSource("elementary",   86, "Books"),
          makeSource("intermediate", 65, "Books"),
          makeSource("upper",        77, "Literature"),
        ],
      },
      {
        id: "art",
        title: "Art",
        focus: "Art appreciation and description → technical → critical analysis vocabulary",
        sources: [
          makeSource("intermediate", 46, "A painting"),
          makeSource("intermediate", 59, "Art"),
          makeSource("upper",        78, "Art"),
        ],
      },
      {
        id: "technology",
        title: "Personal Technology",
        focus: "Basic computer → internet vocabulary → modern tech ecosystem vocabulary",
        sources: [
          makeSource("elementary",   73, "Computers"),
          makeSource("intermediate", 69, "The internet"),
          makeSource("upper",        40, "Personal technology"),
        ],
      },
      {
        id: "tv-viewing",
        title: "TV and Online Viewing",
        focus: "Series, episode, streaming, subscribe, binge-watch",
        sources: [
          makeSource("intermediate", 63, "TV and online viewing"),
        ],
      },
      {
        id: "festivals",
        title: "Festivals",
        focus: "Carnival, parade, fireworks, customs, celebrate, tradition",
        sources: [
          makeSource("intermediate", 68, "Festivals"),
        ],
      },
    ],
  },
  {
    id: "holidays-travel",
    title: "Holidays and Travel",
    icon: "✈️",
    topics: [
      {
        id: "arranging-holiday",
        title: "Arranging a Holiday",
        focus: "Book, package, brochure, self-catering, resort",
        sources: [
          makeSource("elementary",   87, "Arranging a holiday"),
        ],
      },
      {
        id: "accommodation",
        title: "Hotels and Accommodation",
        focus: "Basic hotel vocabulary → wider accommodation types",
        sources: [
          makeSource("elementary",   88, "Hotels"),
          makeSource("upper",        37, "Holiday accommodation"),
        ],
      },
      {
        id: "holiday-types",
        title: "Types of Holiday",
        focus: "Beach, city break, camping, cruise, sightseeing",
        sources: [
          makeSource("elementary",   90, "Types of holiday"),
        ],
      },
    ],
  },
  {
    id: "communication-tech",
    title: "Communication Technology",
    icon: "💻",
    topics: [
      {
        id: "email-internet",
        title: "Email, Letters and the Internet",
        focus: "Basic email conventions → social media vocabulary",
        sources: [
          makeSource("elementary",   74, "Email, letters and the internet"),
          makeSource("intermediate", 70, "Email and social media"),
        ],
      },
      {
        id: "phoning",
        title: "Phoning",
        focus: "Call, ring, hang up, voicemail, engaged, hold",
        sources: [
          makeSource("elementary",   75, "Phoning"),
        ],
      },
    ],
  },
  {
    id: "study-education",
    title: "Study and Education",
    icon: "🎓",
    topics: [
      {
        id: "school",
        title: "School and Education System",
        focus: "Basic school vocabulary → school life and system vocabulary",
        sources: [
          makeSource("elementary",   66, "School subjects"),
          makeSource("elementary",   67, "The education system"),
          makeSource("intermediate", 74, "School"),
        ],
      },
      {
        id: "university",
        title: "University and Academic Life",
        focus: "Basic university vocabulary → student experience → academic writing vocabulary",
        sources: [
          makeSource("elementary",   68, "University"),
          makeSource("intermediate", 75, "Academic life"),
          makeSource("intermediate", 76, "Student life"),
          makeSource("upper",        76, "Academic English"),
        ],
      },
      {
        id: "progress-aims",
        title: "Progress and Aims",
        focus: "Achieve, set goals, improve, fall behind, catch up",
        sources: [
          makeSource("intermediate", 2,  "Progress and aims"),
        ],
      },
    ],
  },
  {
    id: "jobs-work",
    title: "Jobs and Work",
    icon: "💼",
    topics: [
      {
        id: "jobs",
        title: "Jobs and Job Descriptions",
        focus: "Basic job names → job quality vocabulary → professional role vocabulary",
        sources: [
          makeSource("elementary",   69, "Jobs"),
          makeSource("elementary",   70, "Describing jobs"),
          makeSource("intermediate", 77, "Describing jobs"),
          makeSource("upper",        64, "Jobs"),
        ],
      },
      {
        id: "job-application",
        title: "Applying for a Job",
        focus: "Interview vocabulary → formal application and workplace start vocabulary",
        sources: [
          makeSource("elementary",   71, "Job interview"),
          makeSource("elementary",   72, "First day at work"),
          makeSource("intermediate", 79, "Applying for a job"),
        ],
      },
      {
        id: "careers",
        title: "Careers and Professional Development",
        focus: "Career milestones → strategic career management vocabulary",
        sources: [
          makeSource("intermediate", 78, "Careers"),
          makeSource("upper",        65, "Careers"),
        ],
      },
      {
        id: "ways-of-working",
        title: "Ways of Working",
        focus: "Remote, hybrid, freelance, outsource, flexi-time, gig economy",
        sources: [
          makeSource("upper",        66, "Ways of working"),
        ],
      },
      {
        id: "workplace",
        title: "The Workplace",
        focus: "Hierarchy, open-plan, brief, appraisal, productivity, morale",
        sources: [
          makeSource("upper",        67, "The workplace"),
        ],
      },
      {
        id: "time-management",
        title: "Time Management",
        focus: "Deadline, delegate, procrastinate, prioritise, efficiency",
        sources: [
          makeSource("upper",        68, "Time management"),
        ],
      },
    ],
  },
  {
    id: "business",
    title: "Business",
    icon: "📈",
    topics: [
      {
        id: "running-business",
        title: "Running a Business",
        focus: "Small business and marketing → corporate finance and business strategy",
        sources: [
          makeSource("intermediate", 81, "Running a business"),
          makeSource("intermediate", 82, "Marketing"),
          makeSource("upper",        69, "The business world"),
          makeSource("upper",        70, "A successful business"),
        ],
      },
    ],
  },
  {
    id: "social-english",
    title: "Social English",
    icon: "🗣️",
    topics: [
      {
        id: "meet-greet",
        title: "Meeting and Greeting",
        focus: "Social introduction vocabulary",
        sources: [ makeSource("elementary", 91, "Meet and greet") ],
      },
      {
        id: "asking-info",
        title: "Asking for Information",
        focus: "Polite enquiry expressions",
        sources: [ makeSource("elementary", 92, "Ask for information") ],
      },
      {
        id: "requests-permission",
        title: "Requests and Permission",
        focus: "Basic request forms → more formal and indirect expressions",
        sources: [
          makeSource("elementary",   93, "Requests and permission"),
          makeSource("intermediate", 96, "Asking for permission"),
        ],
      },
      {
        id: "invitations",
        title: "Invitations and Suggestions",
        focus: "Would you like to…?, Why don't we…?, Shall we…?",
        sources: [ makeSource("elementary", 94, "Invitations and suggestions") ],
      },
      {
        id: "offers-apologies",
        title: "Offers and Apologies",
        focus: "Shall I…?, I'm sorry, Don't worry, That's alright",
        sources: [ makeSource("elementary", 95, "Offers and saying sorry") ],
      },
      {
        id: "probability",
        title: "Probability and Possibility",
        focus: "Basic modal adverbs → probability expressions and structures",
        sources: [
          makeSource("elementary",   96, "Probably or possibly"),
          makeSource("intermediate", 88, "Probability"),
        ],
      },
      {
        id: "arrangements",
        title: "Making Arrangements",
        focus: "Fix a time, confirm, cancel, postpone, rearrange",
        sources: [ makeSource("intermediate", 91, "Making arrangements") ],
      },
      {
        id: "warnings",
        title: "Warnings",
        focus: "Watch out!, Be careful, I wouldn't if I were you",
        sources: [ makeSource("intermediate", 92, "Warnings") ],
      },
      {
        id: "opinions",
        title: "Opinions",
        focus: "In my view, As far as I'm concerned, I tend to think",
        sources: [ makeSource("intermediate", 93, "Opinions") ],
      },
      {
        id: "hopes-plans",
        title: "Hopes and Plans",
        focus: "Intend to, aim to, looking forward to, with any luck",
        sources: [ makeSource("intermediate", 94, "Hopes and plans") ],
      },
      {
        id: "obligation",
        title: "Obligation",
        focus: "Have to, must, supposed to, obliged to, compulsory",
        sources: [ makeSource("intermediate", 95, "Obligation") ],
      },
      {
        id: "similarities-differences",
        title: "Similarities and Differences",
        focus: "Whereas, in contrast, similarly, likewise",
        sources: [ makeSource("intermediate", 89, "Similarities and differences") ],
      },
      {
        id: "pleasure-annoyance",
        title: "Pleasure and Annoyance",
        focus: "What a relief!, That's so annoying, I'm delighted",
        sources: [ makeSource("intermediate", 90, "Pleasure and annoyance") ],
      },
      {
        id: "everyday-spoken",
        title: "Everyday Spoken Language",
        focus: "Hedges, fillers, backchannels, discourse particles: well, I mean, right",
        sources: [ makeSource("upper", 81, "Everyday language") ],
      },
      {
        id: "vague-language",
        title: "Vague Language",
        focus: "Sort of, kind of, or something, roughly, a bit like",
        sources: [ makeSource("upper", 89, "Vague language") ],
      },
    ],
  },
  {
    id: "discourse-linking",
    title: "Discourse: Linking and Connecting",
    icon: "🔗",
    topics: [
      {
        id: "link-words",
        title: "Link Words",
        focus: "Basic connectors → B2 discourse connectors → C1/C2 formal and academic linkers",
        sources: [
          makeSource("elementary",   97, "Link words 1"),
          makeSource("elementary",   98, "Link words 2"),
          makeSource("intermediate", 73, "Link words"),
          makeSource("upper",        75, "Link words and phrases"),
        ],
      },
      {
        id: "connecting-speech",
        title: "Connecting Speech",
        focus: "Spoken discourse markers: anyway, as I was saying, right",
        sources: [ makeSource("upper", 87, "Connecting speech") ],
      },
      {
        id: "formal-informal",
        title: "Formal and Informal English",
        focus: "Register awareness → deep stylistic discrimination",
        sources: [
          makeSource("intermediate", 97, "Formal and informal English"),
          makeSource("upper",        1,  "Meaning and style"),
        ],
      },
      {
        id: "letter-email-writing",
        title: "Writing Letters and Emails",
        focus: "Dear Sir/Madam, I am writing to, Yours faithfully",
        sources: [ makeSource("intermediate", 98, "Write a letter or email") ],
      },
    ],
  },
  {
    id: "phrasal-idioms",
    title: "Phrasal Verbs and Idioms",
    icon: "🔵",
    topics: [
      {
        id: "phrasal-verbs",
        title: "Phrasal Verbs",
        focus: "Core phrasal verbs → grammatical patterns and meaning groups → register and formal alternatives",
        sources: [
          makeSource("elementary",   99, "Phrasal verbs"),
          makeSource("intermediate", 83, "Phrasal verbs (1): grammatical patterns"),
          makeSource("intermediate", 84, "Phrasal verbs (2): meaning"),
          makeSource("upper",        82, "Phrasal verbs"),
        ],
      },
      {
        id: "expressions",
        title: "Expressions and Fixed Phrases",
        focus: "High-frequency social expressions → thematic idioms → fixed two-part chunks",
        sources: [
          makeSource("elementary",   100, "Common expressions"),
          makeSource("intermediate", 85,  "Expressions (1)"),
          makeSource("intermediate", 86,  "Expressions (2)"),
          makeSource("upper",        85,  "Two-part expressions"),
        ],
      },
      {
        id: "idioms",
        title: "Idioms",
        focus: "Common idiomatic expressions → organised thematic and metaphorical idiom sets",
        sources: [
          makeSource("upper",        83, "Idioms (1)"),
          makeSource("upper",        84, "Idioms (2)"),
        ],
      },
      {
        id: "similes",
        title: "Similes",
        focus: "As cool as a cucumber, like a fish out of water",
        sources: [ makeSource("upper", 86, "Similes") ],
      },
      {
        id: "sayings",
        title: "Sayings and Proverbs",
        focus: "Every cloud has a silver lining; actions speak louder than words",
        sources: [ makeSource("upper", 88, "Sayings") ],
      },
    ],
  },
  {
    id: "news-media",
    title: "News, Media and Information",
    icon: "📰",
    topics: [
      {
        id: "news-headlines",
        title: "News Headlines",
        focus: "Headline grammar: nominalisation, omission, ambiguity",
        sources: [ makeSource("upper", 56, "News headlines") ],
      },
      {
        id: "journalism",
        title: "Writing for a Newspaper",
        focus: "Lead, angle, inverted pyramid, quote, source",
        sources: [ makeSource("upper", 57, "Writing for a newspaper") ],
      },
      {
        id: "disasters",
        title: "Disasters",
        focus: "Flood, earthquake, drought, tsunami, casualty, aid, relief",
        sources: [ makeSource("upper", 60, "Disasters") ],
      },
      {
        id: "investigations",
        title: "Investigations",
        focus: "Inquiry, probe, whistleblower, leak, evidence, allegation",
        sources: [ makeSource("upper", 61, "Investigations") ],
      },
      {
        id: "celebrity",
        title: "Celebrity",
        focus: "Fame, public figure, paparazzi, brand deal, reputation, scandal",
        sources: [ makeSource("upper", 62, "Celebrity") ],
      },
      {
        id: "human-interest",
        title: "Human Interest Stories",
        focus: "Heartwarming, struggle, resilience, community, plight",
        sources: [ makeSource("upper", 63, "Human interest stories") ],
      },
    ],
  },
  {
    id: "written-english",
    title: "Written English",
    icon: "✍️",
    topics: [
      {
        id: "academic-english",
        title: "Academic English",
        focus: "Hedging, nominalisation, impersonal style, citation vocabulary",
        sources: [ makeSource("upper", 76, "Academic English") ],
      },
      {
        id: "scientific-english",
        title: "Scientific English",
        focus: "Hypothesis, variable, quantify, empirical, peer-reviewed",
        sources: [ makeSource("upper", 79, "Scientific English") ],
      },
      {
        id: "technical-english",
        title: "Technical English",
        focus: "Specifications, calibrate, malfunction, output, interface",
        sources: [ makeSource("upper", 80, "Technical English") ],
      },
    ],
  },
  {
    id: "abstract-concepts",
    title: "Abstract Concepts",
    icon: "💡",
    topics: [
      {
        id: "success-failure",
        title: "Success and Failure",
        focus: "Accomplish, excel, underperform, setback, breakthrough",
        sources: [ makeSource("upper", 71, "Success and failure") ],
      },
      {
        id: "problems-solutions",
        title: "Problems and Solutions",
        focus: "Tackle, address, workaround, resolve, mitigate",
        sources: [ makeSource("upper", 72, "Problems and solutions") ],
      },
      {
        id: "old-new",
        title: "Old and New",
        focus: "Obsolete, contemporary, outdated, pioneering, revival",
        sources: [ makeSource("upper", 73, "Old and new") ],
      },
      {
        id: "change",
        title: "Describing Change",
        focus: "Gradual, dramatic, fluctuate, stabilise, reverse — essential for IELTS graphs",
        sources: [ makeSource("upper", 45, "Describing change") ],
      },
      {
        id: "processes",
        title: "Processes and Sequences",
        focus: "Sequential process description vocabulary: plant, water, prune, harvest",
        sources: [ makeSource("intermediate", 44, "How to grow something") ],
      },
    ],
  },
];

// ─── SECTION COLORS ───────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
  { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },
  { accent: "#b91c1c", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },
  { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },
  { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b" },
  { accent: "#6d28d9", bg: "#faf5ff", badge: "#ddd6fe", text: "#3b0764" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },
  { accent: "#b91c1c", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },
  { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },
  { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },
  { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function OWSUnifiedPage() {
  const [user, setUser]           = useState(null);
  const [loading, setLoading]     = useState(true);
  // expandedSections: {sectionIdx: bool}
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  // expandedSources: {topicId: bool}
  const [expandedSources, setExpandedSources]   = useState({});

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsub();
    });
  }, []);

  const toggleSection = (idx) =>
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const toggleSources = (topicId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSources((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalTopics = sections.reduce((sum, s) => sum + s.topics.length, 0);

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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>Oxford Word Skills — Unified</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
            {Object.entries(LEVEL_META).map(([key, meta]) => (
              <span key={key} style={{ fontSize: "11px", fontWeight: 700, backgroundColor: meta.bg, color: meta.text, padding: "3px 10px", borderRadius: "999px", letterSpacing: "0.3px" }}>
                {meta.short} — {meta.label}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "8px" }}>
            Oxford Word Skills — Unified
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
            All three levels merged into one master reference. Each topic shows its coverage across Basic, Intermediate, and Upper levels with direct links to the source units.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "28px", marginTop: "20px" }}>
            {[
              { val: sections.length, label: "Themes" },
              { val: totalTopics,     label: "Topics" },
              { val: 300,            label: "Source units" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── LEGEND ── */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px 18px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Source levels:</span>
          {Object.entries(LEVEL_META).map(([key, meta]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "999px", backgroundColor: meta.dot, display: "inline-block" }} />
              <span style={{ fontSize: "12px", color: meta.text, fontWeight: 600 }}>{meta.label}</span>
            </div>
          ))}
          <span style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "auto" }}>
            Click topic title → open unit &nbsp;·&nbsp; Click <strong>⊕</strong> → expand sources
          </span>
        </div>

        {/* ── SECTIONS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {sections.map((section, si) => {
            const sc     = sectionColors[si % sectionColors.length];
            const isOpen = expandedSections[si] !== false;

            return (
              <div key={section.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.badge : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>

                {/* Section header */}
                <button
                  onClick={() => toggleSection(si)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{section.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: sc.text, margin: 0 }}>{section.title}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>{section.topics.length} topics</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {/* Topics list */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.badge}` }}>
                    {section.topics.map((topic, ti) => {
                      const sourcesOpen = !!expandedSources[topic.id];
                      // Deduplicate level tags for the topic row
                      const levels = [...new Set(topic.sources.map((s) => s.level))];

                      return (
                        <div
                          key={topic.id}
                          style={{
                            borderBottom: ti < section.topics.length - 1 ? "1px solid #f3f4f6" : "none",
                          }}
                        >
                          {/* Topic row */}
                          <div style={{ display: "flex", alignItems: "center", padding: "12px 20px", gap: "10px" }}>

                            {/* Expand/collapse sources button */}
                            <button
                              onClick={(e) => toggleSources(topic.id, e)}
                              title={sourcesOpen ? "Hide sources" : "Show sources"}
                              style={{
                                flexShrink: 0,
                                width: "26px", height: "26px",
                                borderRadius: "6px",
                                border: `1.5px solid ${sourcesOpen ? sc.accent : "#d1d5db"}`,
                                backgroundColor: sourcesOpen ? sc.badge : "#f9fafb",
                                color: sourcesOpen ? sc.text : "#9ca3af",
                                fontSize: "14px",
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.15s",
                                lineHeight: 1,
                              }}
                            >
                              {sourcesOpen ? "−" : "+"}
                            </button>

                            {/* Topic title — links to unified topic page (future) */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.3 }}>
                                  {topic.title}
                                </p>
                                {/* Level pills */}
                                {levels.map((lv) => {
                                  const m = LEVEL_META[lv];
                                  return (
                                    <span key={lv} style={{ fontSize: "9px", fontWeight: 800, backgroundColor: m.bg, color: m.text, padding: "1px 6px", borderRadius: "999px", letterSpacing: "0.3px", whiteSpace: "nowrap" }}>
                                      {m.short}
                                    </span>
                                  );
                                })}
                              </div>
                              <p style={{ fontSize: "11px", color: "#9ca3af", margin: "3px 0 0", lineHeight: 1.4 }}>
                                {topic.focus}
                              </p>
                            </div>

                            {/* Source count badge */}
                            <span style={{ flexShrink: 0, fontSize: "10px", fontWeight: 700, backgroundColor: sc.badge, color: sc.text, padding: "2px 8px", borderRadius: "999px" }}>
                              {topic.sources.length} {topic.sources.length === 1 ? "unit" : "units"}
                            </span>
                          </div>

                          {/* Expandable sources */}
                          {sourcesOpen && (
                            <div style={{ backgroundColor: "#fafafa", borderTop: "1px solid #f3f4f6", padding: "10px 20px 12px 60px", display: "flex", flexDirection: "column", gap: "6px" }}>
                              {topic.sources.map((src, sri) => {
                                const m = LEVEL_META[src.level];
                                return (
                                  <Link
                                    key={sri}
                                    href={src.href}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      textDecoration: "none",
                                      padding: "5px 10px",
                                      borderRadius: "7px",
                                      backgroundColor: "#ffffff",
                                      border: `1px solid ${m.bg}`,
                                      transition: "background-color 0.12s, border-color 0.12s",
                                      width: "fit-content",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = m.bg;
                                      e.currentTarget.style.borderColor = m.dot;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = "#ffffff";
                                      e.currentTarget.style.borderColor = m.bg;
                                    }}
                                  >
                                    {/* Level dot */}
                                    <span style={{ width: "8px", height: "8px", borderRadius: "999px", backgroundColor: m.dot, flexShrink: 0 }} />
                                    {/* Level label */}
                                    <span style={{ fontSize: "10px", fontWeight: 800, color: m.text, letterSpacing: "0.2px" }}>
                                      {m.label}
                                    </span>
                                    {/* Unit number */}
                                    <span style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600 }}>
                                      Unit {src.unitNum}
                                    </span>
                                    {/* Divider */}
                                    <span style={{ color: "#e5e7eb", fontSize: "10px" }}>·</span>
                                    {/* Unit title */}
                                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
                                      {src.unitTitle}
                                    </span>
                                    {/* Arrow */}
                                    <span style={{ fontSize: "11px", color: "#d1d5db", marginLeft: "2px" }}>›</span>
                                  </Link>
                                );
                              })}
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
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
