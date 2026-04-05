"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
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

/* ─── Book data ─────────────────────────────────────────── */
const bookData = {
  id:      "oegc-basic",
  title:   "Oxford English Grammar Course",
  level:   "Basic",
  authors: "Michael Swan & Catherine Walter",
  cover:   "/books/oegc-basic.jpg",
  subject: "grammar",
  sections: [
    {
      id:    "section-01",
      num:   "01",
      title: "be and have",
      icon:  "🔤",
      units: [
        "be — I am happy today. Are we late?",
        "be: past — Where were you? I was in Glasgow.",
        "be: future — The bus will be full.",
        "there is/was — There's a dog in the garden.",
        "there is: future — Will there be cars?",
        "I have / do you have? / I don't have",
        "have: past and future",
        "have: actions — He's having a shower.",
        "have without do: have got — Have you got a cat?",
        "be and have: more practice",
        "be and have: revision test",
      ],
    },
    {
      id:    "section-02",
      num:   "02",
      title: "Present Tenses",
      icon:  "🕐",
      units: [
        "Simple present affirmative — I work; you work; she works",
        "Simple present: use — I work in a bank.",
        "Simple present negatives — I don't know. She doesn't ski.",
        "Simple present questions — Do you remember me?",
        "Simple present: more practice",
        "Present progressive: forms — I'm reading. I'm not working.",
        "Present progressive: use — I'm working just now.",
        "Present progressive negatives — He's not listening to me.",
        "Present progressive questions — Is it raining?",
        "Present progressive: more practice",
        "The two present tenses: the difference",
        "Non-progressive verbs — I don't understand.",
        "Present tenses: more practice",
        "Present tenses: revision test",
      ],
    },
    {
      id:    "section-03",
      num:   "03",
      title: "Talking About the Future",
      icon:  "🔮",
      units: [
        "going to — Look – it's going to rain.",
        "Present progressive — What are you doing this evening?",
        "will: predicting — I think it will rain tomorrow.",
        "will: deciding, refusing, promising — I'll answer it.",
        "Simple present for future — Our train leaves at 8.10.",
        "Future: more practice",
        "Future: revision test",
      ],
    },
    {
      id:    "section-04",
      num:   "04",
      title: "Past Tenses",
      icon:  "⏪",
      units: [
        "Simple past: forms — I worked. I went.",
        "Simple past: use — I left school in 1990.",
        "Simple past: negatives — I did not work. I did not go.",
        "Simple past questions — Did you pay? What did she say?",
        "Simple past: more practice",
        "Past progressive — What were you doing at 8.00?",
        "Simple past or past progressive? — I walked / I was walking",
        "Past tenses: more practice",
        "Past tenses: revision test",
      ],
    },
    {
      id:    "section-05",
      num:   "05",
      title: "Perfect Tenses",
      icon:  "✅",
      units: [
        "Present perfect: forms — I have paid. Has she forgotten?",
        "Finished actions: present perfect or simple past?",
        "Time words: present perfect or simple past?",
        "already, yet and just",
        "since and for — since Tuesday; for ten years",
        "Present perfect progressive — It's been raining since Sunday.",
        "Past perfect — It had already begun when we arrived.",
        "Perfect tenses: more practice",
        "Perfect tenses: revision test",
      ],
    },
    {
      id:    "section-06",
      num:   "06",
      title: "Modal Verbs",
      icon:  "🎛️",
      units: [
        "Modal verbs: introduction — can, must, should etc.",
        "must — You must be home by eleven.",
        "have to — Do you have to teach small children?",
        "mustn't and don't have to — We mustn't wake the baby.",
        "had to, will have to — I didn't have to pay.",
        "should — What should I tell John?",
        "can — He can play the piano.",
        "could; be able to — She couldn't write.",
        "may and might — It may snow. I might have a cold.",
        "can, could and may: permission",
        "can/could you?: requests — Can you lend me a stamp?",
        "shall in questions — What shall we do?",
        "would — Would you like a drink?",
        "used to — I used to play the piano.",
        "Modal verbs: more practice",
        "Modal verbs: revision test",
      ],
    },
    {
      id:    "section-07",
      num:   "07",
      title: "Passives",
      icon:  "🔄",
      units: [
        "Passives: introduction — English is spoken in Australia.",
        "Simple present passive — We are woken by the birds.",
        "Future passive — Tomorrow your bicycle will be stolen.",
        "Simple past passive — I was stopped by a policeman.",
        "Present progressive passive — It's being cleaned.",
        "Present perfect passive — The house has been sold.",
        "Passives: more practice",
        "Passives: revision test",
      ],
    },
    {
      id:    "section-08",
      num:   "08",
      title: "Questions and Negatives",
      icon:  "❓",
      units: [
        "yes/no questions — Is the taxi here? Do I need a visa?",
        "Question words — When will you see her?",
        "Question-word subjects — Who phoned? What happened?",
        "Questions with long subjects",
        "Prepositions in questions — Who did you go with?",
        "Negatives — Dogs can't fly. I don't know why.",
        "not and no",
        "Negatives with nobody, never etc.",
        "Questions and negatives: more practice",
        "Questions and negatives: revision test",
      ],
    },
    {
      id:    "section-09",
      num:   "09",
      title: "Infinitives and -ing Forms",
      icon:  "∞",
      units: [
        "Infinitives: using to — I want to go. Must you go?",
        "Infinitive of purpose — She went to Paris to study music.",
        "Verb + infinitive — I hope to be an airline pilot.",
        "Verb + object + infinitive — He wants me to cook.",
        "it with infinitive subjects — It's nice to be here.",
        "Adjective + infinitive — glad to find you at home",
        "Adjectives with enough/to — too tired to sing",
        "Noun/pronoun + infinitive — some letters to write",
        "-ing forms as subjects — Smoking is bad for you.",
        "Preposition + …ing — Thank you for coming.",
        "Verb + …ing — I can't help feeling unhappy.",
        "Infinitives and -ing forms: more practice",
        "Infinitives and -ing forms: revision test",
      ],
    },
    {
      id:    "section-10",
      num:   "10",
      title: "Special Structures with Verbs",
      icon:  "⚙️",
      units: [
        "Structures with get — get up / get your coat / it's getting cold",
        "Verbs with prepositions — Wait for me.",
        "Phrasal verbs — Come in, take off your coat and sit down.",
        "Verbs with two objects — Take the boss these letters.",
        "have something done — I have my hair cut every week.",
        "Imperatives — Come in. Don't worry.",
        "let's (suggestions) — Let's go.",
        "Special structures with verbs: more practice",
        "Special structures with verbs: revision test",
      ],
    },
    {
      id:    "section-11",
      num:   "11",
      title: "Articles: a/an and the",
      icon:  "📝",
      units: [
        "a/an; pronunciation of the",
        "Countable and uncountable — a car, cars; petrol",
        "the and a/an — Let's see a film. I didn't like the film.",
        "a/an — She's a doctor.",
        "a/an: describing people — She's got a nice smile.",
        "Talking in general without the — People are funny.",
        "Names — Mary, Africa, the USA",
        "Special cases — in bed; after lunch; a hundred",
        "Articles: more practice",
        "Articles: revision test",
      ],
    },
    {
      id:    "section-12",
      num:   "12",
      title: "Determiners",
      icon:  "🗂️",
      units: [
        "this, that, these and those",
        "some and any — I need some sugar. Have you got any?",
        "somebody, anything, nowhere …",
        "much and many — How much milk? How many languages?",
        "a lot of and lots of",
        "a little and a few — a little English; a few words",
        "enough money; fast enough",
        "too, too much/many and not enough",
        "all — all my friends are here",
        "all and every; each",
        "both, either and neither",
        "Determiners and of — most people; most of us",
        "Determiners: more practice",
        "Determiners: revision test",
      ],
    },
    {
      id:    "section-13",
      num:   "13",
      title: "Personal Pronouns; Possessives",
      icon:  "👤",
      units: [
        "Personal pronouns: I and me etc.",
        "Possessives: my, your etc. — This is my coat.",
        "Possessives: mine, yours etc. — This is mine.",
        "Reflexive pronouns: myself, yourself etc.",
        "Personal pronouns and possessives: more practice",
        "Personal pronouns and possessives: revision test",
      ],
    },
    {
      id:    "section-14",
      num:   "14",
      title: "Nouns",
      icon:  "🏷️",
      units: [
        "Singular and plural nouns — cat, cats; box, boxes",
        "Singular/plural — team, family; jeans, scissors",
        "Countable and uncountable nouns",
        "one and ones — a big one; the ones on the chair",
        "'s and s' possessive: forms — son's, sons', men's",
        "'s and s' possessive: use — Ian's car; the boss's car",
        "Noun + noun — Milk chocolate is a kind of chocolate.",
        "Nouns: more practice",
        "Nouns: revision test",
      ],
    },
    {
      id:    "section-15",
      num:   "15",
      title: "Adjectives and Adverbs",
      icon:  "✨",
      units: [
        "Adjectives — a beautiful little girl who was not stupid",
        "Adverbs of manner — He ate quickly.",
        "Other adverbs — I like sport very much.",
        "Adverbs with the verb — often, certainly etc.",
        "interested and interesting etc.",
        "fast, hard, hardly, well, friendly …",
        "Adjectives and adverbs: more practice",
        "Adjectives and adverbs: revision test",
      ],
    },
    {
      id:    "section-16",
      num:   "16",
      title: "Comparison",
      icon:  "⚖️",
      units: [
        "Comparative and superlative adjectives: forms",
        "Comparative or superlative?",
        "Comparatives: use — brighter than the moon",
        "Superlatives — the highest mountain in the world",
        "Comparison of adverbs — More slowly, please.",
        "(not) as … as — Your hands are as cold as ice.",
        "Comparison: more practice",
        "Comparison: revision test",
      ],
    },
    {
      id:    "section-17",
      num:   "17",
      title: "Conjunctions",
      icon:  "🔗",
      units: [
        "Conjunctions: introduction — and, but, because …",
        "Position of conjunctions — If you need help, ask me.",
        "Tenses with time conjunctions — I'll see you before you go.",
        "because and so; although and but",
        "and — I speak Russian, English and Swahili",
        "Double conjunctions — both … and; (n)either … (n)or",
        "Conjunctions: more practice",
        "Conjunctions: revision test",
      ],
    },
    {
      id:    "section-18",
      num:   "18",
      title: "if",
      icon:  "🔀",
      units: [
        "if: position; unless",
        "if: future — I'll phone you if I hear from Alice.",
        "Not real / not probable — If dogs could talk, …",
        "If I were you, …",
        "If I go, I will …; If I went, I would …",
        "Unreal past — If A had happened, B would have happened.",
        "if: more practice",
        "if: revision test",
      ],
    },
    {
      id:    "section-19",
      num:   "19",
      title: "Relative Pronouns",
      icon:  "🔁",
      units: [
        "Relative who and which — the keys which I lost",
        "Relative that — a bird that can't fly",
        "Leaving out relative pronouns — the car (that) you bought",
        "Prepositions — the man that she works for",
        "Relative what — It was just what I wanted.",
        "Relative pronouns: more practice",
        "Relative pronouns: revision test",
      ],
    },
    {
      id:    "section-20",
      num:   "20",
      title: "Indirect Speech",
      icon:  "💬",
      units: [
        "Tenses and pronouns — Bill said he was really happy.",
        "Indirect questions — She asked him what his name was.",
        "Present reporting verbs — She says she comes from London.",
        "here and now → there and then",
        "Infinitives — She told me to get out.",
        "Indirect speech: more practice",
        "Indirect speech: revision test",
      ],
    },
    {
      id:    "section-21",
      num:   "21",
      title: "Prepositions",
      icon:  "📍",
      units: [
        "at, in and on (time)",
        "from … to, until and by",
        "for, during and while",
        "in and on (place)",
        "at (place)",
        "Other prepositions of place",
        "Prepositions of movement",
        "Prepositions: more practice",
        "Prepositions: revision test",
      ],
    },
    {
      id:    "section-22",
      num:   "22",
      title: "Spoken Grammar",
      icon:  "🗣️",
      units: [
        "Question tags — This music isn't very good, is it?",
        "Short answers — Yes, I have. No, they didn't.",
        "Reply questions — Oh, yes? Did they really?",
        "Revision of spoken question and answer structures",
        "Leaving out words — Don't know if she has.",
        "so am I; nor do I etc.",
        "Spoken grammar: more practice",
        "Spoken grammar: revision test",
      ],
    },
  ],
};

const totalSections = bookData.sections.length;
const FREE_SECTIONS = 3;

/* ─── Per-section accent palette ───────────────────────── */
const palette = [
  { accent: "#0369a1", bg: "#f0f9ff", border: "#bae6fd", text: "#0c4a6e", num: "#dbeafe" },
  { accent: "#7c3aed", bg: "#faf5ff", border: "#ede9fe", text: "#4c1d95", num: "#ede9fe" },
  { accent: "#b91c1c", bg: "#fff1f2", border: "#fecdd3", text: "#881337", num: "#fee2e2" },
  { accent: "#0f766e", bg: "#f0fdfa", border: "#99f6e4", text: "#134e4a", num: "#ccfbf1" },
  { accent: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", text: "#14532d", num: "#dcfce7" },
  { accent: "#64748b", bg: "#f8fafc", border: "#e2e8f0", text: "#1e293b", num: "#f1f5f9" },
  { accent: "#b45309", bg: "#fffbeb", border: "#fde68a", text: "#78350f", num: "#fef3c7" },
  { accent: "#dc2626", bg: "#fef2f2", border: "#fecaca", text: "#7f1d1d", num: "#fee2e2" },
  { accent: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", text: "#1e3a8a", num: "#dbeafe" },
  { accent: "#c2410c", bg: "#fff7ed", border: "#fed7aa", text: "#7c2d12", num: "#ffedd5" },
  { accent: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", text: "#164e63", num: "#cffafe" },
  { accent: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", text: "#312e81", num: "#e0e7ff" },
  { accent: "#059669", bg: "#f0fdf4", border: "#d1fae5", text: "#065f46", num: "#d1fae5" },
  { accent: "#9333ea", bg: "#fdf4ff", border: "#e9d5ff", text: "#581c87", num: "#f3e8ff" },
  { accent: "#db2777", bg: "#fdf2f8", border: "#fbcfe8", text: "#831843", num: "#fce7f3" },
  { accent: "#ca8a04", bg: "#fefce8", border: "#fef08a", text: "#713f12", num: "#fef9c3" },
  { accent: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", text: "#14532d", num: "#dcfce7" },
  { accent: "#7e22ce", bg: "#faf5ff", border: "#ddd6fe", text: "#4c1d95", num: "#ede9fe" },
  { accent: "#0284c7", bg: "#f0f9ff", border: "#bae6fd", text: "#0c4a6e", num: "#dbeafe" },
  { accent: "#be185d", bg: "#fdf2f8", border: "#fbcfe8", text: "#831843", num: "#fce7f3" },
  { accent: "#0d9488", bg: "#f0fdfa", border: "#99f6e4", text: "#134e4a", num: "#ccfbf1" },
  { accent: "#6d28d9", bg: "#faf5ff", border: "#ede9fe", text: "#4c1d95", num: "#ede9fe" },
];

/* ─── Component ─────────────────────────────────────────── */
export default function OEGCBasicPage() {
  const [user, setUser]     = useState(null);
  const [role, setRole]     = useState(null);
  const [loading, setLoading] = useState(true);

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

  /* ── Loading ── */
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

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── BOOK HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "40px" }}>

          {/* Cover */}
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "1px solid #d1d5db", flexShrink: 0 }}>
            <img
              src={bookData.cover}
              alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📗</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              BASIC
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>
              {bookData.authors}
            </p>

            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {[
                { val: totalSections,  label: "Sections" },
                { val: bookData.sections.reduce((a, s) => a + s.units.length, 0), label: "Lessons" },
                { val: FREE_SECTIONS,  label: "Free sections", highlight: true },
              ].map(({ val, label, highlight }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: highlight ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(FREE_SECTIONS / totalSections) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                {FREE_SECTIONS} of {totalSections} unlocked
              </span>
            </div>
          </div>
        </div>

        {/* ── UPGRADE BANNER ── */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, lineHeight: 1.5 }}>
              Sections 1–{FREE_SECTIONS} are free.{" "}
              <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>
                Upgrade to Learner
              </Link>{" "}
              to unlock all {totalSections} sections.
            </p>
          </div>
        )}

        {/* ── SECTION GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {bookData.sections.map((section, si) => {
            const sc     = palette[si] || palette[0];
            const isFree = si < FREE_SECTIONS;
            const locked = !isLearner && !isFree;
            const href   = locked ? "#" : `/english/grammar/oegc-basic/${section.id}`;

            return (
              <Link
                key={section.id}
                href={href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                  border: `1px solid ${locked ? "#e5e7eb" : sc.border}`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  textDecoration: "none",
                  opacity: locked ? 0.6 : 1,
                  cursor: locked ? "not-allowed" : "pointer",
                  transition: "box-shadow 0.18s, transform 0.18s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  if (!locked) {
                    e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.10)`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Card header */}
                <div style={{ backgroundColor: locked ? "#f9fafb" : sc.bg, padding: "16px 18px 14px", borderBottom: `1px solid ${locked ? "#f3f4f6" : sc.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {/* Section number badge */}
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "8px",
                        backgroundColor: locked ? "#f3f4f6" : sc.num,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 800,
                        color: locked ? "#9ca3af" : sc.text,
                        letterSpacing: "-0.3px", flexShrink: 0,
                      }}>
                        {section.num}
                      </div>
                      <span style={{ fontSize: "20px" }}>{section.icon}</span>
                    </div>

                    {/* Lock / free / arrow */}
                    {locked
                      ? <span style={{ fontSize: "16px" }}>🔒</span>
                      : isFree
                        ? <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.2px" }}>FREE</span>
                        : <span style={{ fontSize: "16px", color: sc.accent }}>›</span>
                    }
                  </div>

                  <h2 style={{ fontSize: "14px", fontWeight: 700, color: locked ? "#9ca3af" : sc.text, margin: 0, lineHeight: 1.3 }}>
                    Section {section.num}: {section.title}
                  </h2>
                </div>

                {/* Unit list */}
                <div style={{ padding: "14px 18px 16px", flex: 1 }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "10px" }}>
                    {section.units.length} lessons included
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                    {section.units.slice(0, 6).map((unit, ui) => (
                      <li key={ui} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                        <span style={{ fontSize: "10px", color: locked ? "#d1d5db" : sc.accent, marginTop: "3px", flexShrink: 0 }}>●</span>
                        <span style={{ fontSize: "12px", color: locked ? "#d1d5db" : "#374151", lineHeight: 1.4 }}>
                          {unit}
                        </span>
                      </li>
                    ))}
                    {section.units.length > 6 && (
                      <li style={{ display: "flex", alignItems: "center", gap: "7px", marginTop: "2px" }}>
                        <span style={{ fontSize: "10px", color: "#d1d5db", flexShrink: 0 }}>●</span>
                        <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600 }}>
                          + {section.units.length - 6} more…
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA footer */}
                <div style={{
                  padding: "10px 18px",
                  borderTop: `1px solid ${locked ? "#f3f4f6" : sc.border}`,
                  backgroundColor: locked ? "#f9fafb" : sc.bg,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: locked ? "#9ca3af" : sc.accent }}>
                    {locked ? "Locked" : "Open section"}
                  </span>
                  {!locked && (
                    <span style={{ fontSize: "18px", color: sc.accent, fontWeight: 700 }}>→</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>
              Unlock all {totalSections} sections
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to every grammar section, all lessons, and practice exercises.
            </p>
            <Link
              href="/dashboard"
              style={{ display: "inline-block", backgroundColor: "#059669", color: "#ffffff", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}
            >
              Upgrade to Learner
            </Link>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
