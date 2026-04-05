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

/* ─── Book data ─────────────────────────────────────────── */
const bookData = {
  id:      "law4",
  title:   "Longman Academic Writing",
  level:   "4",
  authors: "Alice Oshima & Ann Hogue",
  cover:   "/books/law4.jpg",
  parts: [
    {
      id:    "part-1",
      num:   "I",
      title: "Writing a Paragraph",
      icon:  "📝",
      chapters: [
        {
          id: "ch-1", num: "1", title: "Paragraph Structure",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Noticing Vocabulary", items: ["Word Families"] },
            { title: "Parts of a Paragraph", items: ["The Topic Sentence", "Supporting Sentences", "The Concluding Sentence"] },
            { title: "Applying Vocabulary", items: ["Using Word Families"] },
            { title: "Wrap-up", items: ["The Writing Process", "Writing Assignment: A Paragraph about Communication", "Self-Assessment", "Expansion"] },
          ],
        },
        {
          id: "ch-2", num: "2", title: "Unity and Coherence",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Noticing Vocabulary", items: ["Synonyms 1"] },
            { title: "Unity", items: ["Maintaining unity in paragraphs"] },
            { title: "Coherence", items: ["Repetition of Key Nouns", "Consistent Pronouns", "Transition Signals", "Logical Order"] },
            { title: "Applying Vocabulary", items: ["Using Synonyms 1"] },
            { title: "Wrap-up", items: ["Writing Assignment: A Paragraph about Health and Medicine", "Self-Assessment", "Expansion"] },
          ],
        },
        {
          id: "ch-3", num: "3", title: "Using Outside Sources",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Noticing Vocabulary", items: ["Synonyms 2"] },
            { title: "Using and Citing Sources", items: ["Plagiarism", "Correct Citations"] },
            { title: "Quotations", items: ["Reporting Verbs and Phrases", "Punctuating Direct Quotations", "Using Direct Quotations as Support", "Changing Direct to Indirect Quotations"] },
            { title: "Paraphrasing", items: ["Plagiarism and Paraphrasing", "Writing a Successful Paraphrase", "Using Paraphrases as Support"] },
            { title: "Summarizing", items: ["Writing a Successful Summary"] },
            { title: "Wrap-up", items: ["Applying Vocabulary: Using Synonyms 2", "Writing Assignment: A Summary of an Article", "Self-Assessment", "Expansion"] },
          ],
        },
      ],
    },
    {
      id:    "part-2",
      num:   "II",
      title: "Writing an Essay",
      icon:  "✍️",
      chapters: [
        {
          id: "ch-4", num: "4", title: "From Paragraph to Essay",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Noticing Vocabulary", items: ["Nouns and Noun Suffixes"] },
            { title: "Parts of an Essay", items: ["The Introductory Paragraph", "Body Paragraphs", "The Concluding Paragraph"] },
            { title: "Patterns of Organization", items: ["Organization and Thesis Statements", "Organization and Body Paragraphs"] },
            { title: "Wrap-up", items: ["Outlines of Essays", "Applying Vocabulary", "Writing Assignment: An Essay about Education", "Self-Assessment", "Expansion"] },
          ],
        },
        {
          id: "ch-5", num: "5", title: "Process Essays",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Noticing Vocabulary", items: ["Word Parts and Word Families"] },
            { title: "Organization", items: ["Thesis Statements for a Process Essay", "Body Paragraphs in a Process Essay", "Transition Signals for Chronological Order"] },
            { title: "Wrap-up", items: ["Applying Vocabulary", "Writing Assignment: A Process Essay about Earth Science", "Self-Assessment", "Expansion: Writing from a Diagram"] },
          ],
        },
        {
          id: "ch-6", num: "6", title: "Cause / Effect Essays",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Models"] },
            { title: "Noticing Vocabulary", items: ["Collocations 1"] },
            { title: "Organization", items: ["Block Organization", "Chain Organization", "Transition Signals for Cause / Effect Relationships"] },
            { title: "Wrap-up", items: ["Applying Vocabulary", "Writing Assignment: A Cause / Effect Essay about Psychology", "Self-Assessment", "Expansion: Writing a Summary and Response"] },
          ],
        },
        {
          id: "ch-7", num: "7", title: "Comparison / Contrast Essays",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Noticing Vocabulary", items: ["Antonyms"] },
            { title: "Organization", items: ["Points of Comparison", "Point-by-Point Organization", "Block Organization", "Comparison and Contrast Signal Words"] },
            { title: "Wrap-up", items: ["Applying Vocabulary", "Writing Assignment: A Comparison / Contrast Essay about Culture", "Self-Assessment", "Expansion"] },
          ],
        },
        {
          id: "ch-8", num: "8", title: "Argumentative Essays",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Noticing Vocabulary", items: ["Collocations 2"] },
            { title: "Organization", items: ["The Elements of an Argumentative Essay", "The Introductory Paragraph"] },
            { title: "Statistics as Support", items: ["Analyzing the Model"] },
            { title: "Wrap-up", items: ["Applying Vocabulary", "Writing Assignment: An Argumentative Essay about Space Travel", "Self-Assessment", "Expansion: Rebutting an Argument"] },
          ],
        },
      ],
    },
    {
      id:    "part-3",
      num:   "III",
      title: "Sentence Structure",
      icon:  "🔤",
      chapters: [
        {
          id: "ch-9", num: "9", title: "Types of Sentences",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Clauses", items: ["Independent Clauses", "Dependent Clauses"] },
            { title: "Kinds of Sentences", items: ["Simple Sentences", "Compound Sentences", "Complex Sentences", "Compound-Complex Sentences"] },
            { title: "Wrap-up", items: ["Sentence Types and Writing Style", "Editing Practice", "Writing Practice", "Self-Assessment"] },
          ],
        },
        {
          id: "ch-10", num: "10", title: "Parallelism and Sentence Problems",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Parallel Structure", items: ["Parallelism with Coordinators: And, Or, But", "Parallelism with Correlative Conjunctions"] },
            { title: "Sentence Problems", items: ["Sentence Fragments", "Choppy Sentences", "Run-on Sentences and Comma Splices", "Stringy Sentences"] },
            { title: "Wrap-up", items: ["Editing Practice", "Writing Practice", "Self-Assessment"] },
          ],
        },
        {
          id: "ch-11", num: "11", title: "Noun Clauses",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "That Clauses", items: ["Sentences Beginning with It", "Special Verb Tenses in That Clauses"] },
            { title: "Other Noun Clauses", items: ["If / Whether Clauses", "Question Clauses"] },
            { title: "Wrap-up", items: ["Editing Practice", "Writing Practice", "Self-Assessment"] },
          ],
        },
        {
          id: "ch-12", num: "12", title: "Adverb Clauses",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Kinds of Adverb Clauses", items: ["Time Clauses", "Place Clauses", "Distance, Frequency, and Manner Clauses", "Reason Clauses", "Result Clauses", "Purpose Clauses", "Contrast Clauses", "Conditional Clauses"] },
            { title: "Wrap-up", items: ["Editing Practice", "Writing Practice", "Self-Assessment"] },
          ],
        },
        {
          id: "ch-13", num: "13", title: "Adjective Clauses",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Relative Pronouns and Adverbs", items: ["Position of Adjective Clauses", "Verb Agreement in Adjective Clauses"] },
            { title: "Restrictive and Nonrestrictive Clauses", items: ["Punctuation of Adjective Clauses"] },
            { title: "Kinds of Adjective Clauses", items: ["Relative Pronouns as Subjects", "Relative Pronouns as Objects", "Possessive Adjective Clauses", "Relative Pronouns as Objects of Prepositions", "Relative Pronouns in Phrases of Quantity and Quality", "Adjective Clauses of Time and Place"] },
            { title: "Wrap-up", items: ["Editing Practice", "Writing Practice", "Self-Assessment"] },
          ],
        },
        {
          id: "ch-14", num: "14", title: "Participles and Participial Phrases",
          subsections: [
            { title: "Introduction", items: ["Analyzing the Model"] },
            { title: "Kinds of Participles", items: ["Participle Forms"] },
            { title: "Participial Phrases", items: ["Reduced Adjective Clauses", "Position and Punctuation", "Present Participial Phrases", "Past Participial Phrases", "Perfect Form Participial Phrases", "Participial Phrases and Writing Style", "Reduced Adverb Clauses"] },
            { title: "Wrap-up", items: ["Editing Practice", "Writing Practice", "Self-Assessment"] },
          ],
        },
      ],
    },
  ],
  appendices: [
    { label: "A", title: "Chapter Readings" },
    { label: "B", title: "Connecting Words and Transition Signals" },
    { label: "C", title: "Punctuation Rules" },
    { label: "D", title: "Correction Symbols" },
    { label: "E", title: "Research and Documentation of Sources" },
    { label: "F", title: "Peer Review / Writer's Self-Check Worksheets" },
  ],
};

const FREE_CHAPTERS = 3;

/* ─── Palette (per chapter, cycling) ────────────────────── */
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
];

/* ─── Part palette (3 parts) ────────────────────────────── */
const partPalette = [
  { accent: "#047857", bg: "#ecfdf5", border: "#a7f3d0", text: "#064e3b" },
  { accent: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", text: "#1e3a8a" },
  { accent: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe", text: "#4c1d95" },
];

/* ─── Count items in a chapter ──────────────────────────── */
function countItems(chapter) {
  return chapter.subsections.reduce((a, s) => a + s.items.length, 0);
}

/* ─── SubsectionBlock ────────────────────────────────────── */
function SubsectionBlock({ sub, sc, locked }) {
  const isWrap = sub.title === "Wrap-up";
  return (
    <div style={{ marginBottom: "13px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
        <div style={{
          width: "3px", height: "13px", borderRadius: "2px", flexShrink: 0,
          backgroundColor: locked ? "#d1d5db" : isWrap ? "#cbd5e1" : sc.accent,
        }} />
        <span style={{
          fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: locked ? "#c4c4c4" : isWrap ? "#94a3b8" : sc.accent,
        }}>
          {sub.title}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "10px" }}>
        {sub.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <div style={{
              minWidth: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
              marginTop: "6px",
              backgroundColor: locked ? "#e5e7eb" : isWrap ? "#cbd5e1" : sc.numBg,
              border: `1.5px solid ${locked ? "#d1d5db" : isWrap ? "#94a3b8" : sc.accent}`,
            }} />
            <span style={{
              fontSize: "12px", lineHeight: 1.5,
              color: locked ? "#c4c4c4" : isWrap ? "#6b7280" : "#374151",
              fontStyle: isWrap ? "italic" : "normal",
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── GRID CARD ─────────────────────────────────────────── */
function GridCard({ chapter, chapterIndex, sc, locked, href, isFree }) {
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
              minWidth: "52px", height: "32px", borderRadius: "8px", flexShrink: 0,
              backgroundColor: locked ? "#e5e7eb" : sc.numBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "10px", fontWeight: 800, letterSpacing: "-0.2px",
              color: locked ? "#9ca3af" : sc.text,
              paddingLeft: "8px", paddingRight: "8px",
            }}>
              Ch. {chapter.num}
            </div>
          </div>
          {locked
            ? <span style={{ fontSize: "14px" }}>🔒</span>
            : isFree
              ? <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>FREE</span>
              : null
          }
        </div>
        <h2 style={{ fontSize: "13px", fontWeight: 800, margin: "0 0 3px", lineHeight: 1.3, color: locked ? "#9ca3af" : sc.text }}>
          {chapter.title}
        </h2>
        <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          {chapter.subsections.length} subsections · {countItems(chapter)} items
        </p>
      </div>

      <div style={{ padding: "14px 16px 4px", flex: 1 }}>
        {chapter.subsections.map((sub, i) => (
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
          {locked ? "Locked" : "Open chapter"}
        </span>
        {!locked && <span style={{ fontSize: "16px", color: sc.accent }}>→</span>}
      </div>
    </Link>
  );
}

/* ─── HORIZONTAL ROW ─────────────────────────────────────── */
function HorizontalRow({ chapter, sc, locked, href, isFree }) {
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
          minWidth: "56px", height: "36px", borderRadius: "9px", flexShrink: 0,
          backgroundColor: locked ? "#e5e7eb" : sc.numBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: 800,
          color: locked ? "#9ca3af" : sc.text,
        }}>
          Ch. {chapter.num}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: locked ? "#9ca3af" : sc.text, margin: 0, lineHeight: 1.3 }}>
            {chapter.title}
          </p>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
            {chapter.subsections.length} subsections · {countItems(chapter)} items
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {!locked && isFree && (
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
                  {open ? "Hide content" : "Show content"}
                  <span style={{
                    fontSize: "9px",
                    display: "inline-block",
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
          padding: "16px 20px 16px 90px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "0 28px",
          backgroundColor: "#fafafa",
        }}>
          {chapter.subsections.map((sub, i) => (
            <SubsectionBlock key={i} sub={sub} sc={sc} locked={false} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Part header ───────────────────────────────────────── */
function PartHeader({ part, pc, chapterCount, itemCount }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "14px",
      backgroundColor: pc.bg,
      border: `1.5px solid ${pc.border}`,
      borderRadius: "12px",
      padding: "16px 22px",
      marginBottom: "16px",
    }}>
      <div style={{
        width: "42px", height: "42px", borderRadius: "10px",
        backgroundColor: pc.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px", flexShrink: 0,
      }}>
        {part.icon}
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, color: pc.accent, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Part {part.num}
        </p>
        <p style={{ fontSize: "16px", fontWeight: 800, color: pc.text, margin: 0, lineHeight: 1.2 }}>
          {part.title}
        </p>
        <p style={{ fontSize: "11px", color: "#9ca3af", margin: "3px 0 0" }}>
          {chapterCount} chapters · {itemCount} total items
        </p>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────── */
export default function LAW4Page() {
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

  /* Build a flat chapter list with global index for locking & palette */
  let globalChapterIndex = 0;
  const allChapters = bookData.parts.flatMap(part =>
    part.chapters.map(ch => ({ ...ch, partId: part.id, globalIndex: globalChapterIndex++ }))
  );
  const totalChapters = allChapters.length;
  const totalItems    = allChapters.reduce((a, ch) => a + countItems(ch), 0);

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
            <Link href="/english/writing" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Writing</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>LAW 4</span>
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
              LEVEL 4
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              {bookData.title} <span style={{ color: "#1d4ed8" }}>4</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px", flexWrap: "wrap" }}>
              {[
                { val: bookData.parts.length,  label: "Parts" },
                { val: totalChapters,          label: "Chapters" },
                { val: totalItems,             label: "Total topics" },
                { val: FREE_CHAPTERS,          label: "Free chapters", highlight: true },
              ].map(({ val, label, highlight }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: highlight ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(FREE_CHAPTERS / totalChapters) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                {FREE_CHAPTERS} of {totalChapters} unlocked
              </span>
            </div>
          </div>
        </div>

        {/* ── UPGRADE BANNER ── */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 20px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, lineHeight: 1.5 }}>
              The first {FREE_CHAPTERS} chapters are free.{" "}
              <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link>
              {" "}to unlock all {totalChapters} chapters.
            </p>
          </div>
        )}

        {/* ── LAYOUT TOGGLE ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, margin: 0 }}>
            {bookData.parts.length} Parts · {totalChapters} Chapters · {totalItems} Topics
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

        {/* ── CONTENT BY PART ── */}
        {bookData.parts.map((part, pi) => {
          const pc = partPalette[pi] || partPalette[0];
          const partItemCount = part.chapters.reduce((a, ch) => a + countItems(ch), 0);

          return (
            <div key={part.id} style={{ marginBottom: "40px" }}>
              <PartHeader part={part} pc={pc} chapterCount={part.chapters.length} itemCount={partItemCount} />

              {layout === "grid" ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
                  {part.chapters.map((chapter) => {
                    const ch    = allChapters.find(c => c.id === chapter.id);
                    const gi    = ch?.globalIndex ?? 0;
                    const sc    = palette[gi % palette.length];
                    const locked = !isLearner && gi >= FREE_CHAPTERS;
                    const isFree = gi < FREE_CHAPTERS;
                    const href  = locked ? "#" : `/english/writing/law4/${chapter.id}`;
                    return (
                      <GridCard
                        key={chapter.id}
                        chapter={chapter}
                        chapterIndex={gi}
                        sc={sc}
                        locked={locked}
                        href={href}
                        isFree={isFree}
                      />
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {part.chapters.map((chapter) => {
                    const ch    = allChapters.find(c => c.id === chapter.id);
                    const gi    = ch?.globalIndex ?? 0;
                    const sc    = palette[gi % palette.length];
                    const locked = !isLearner && gi >= FREE_CHAPTERS;
                    const isFree = gi < FREE_CHAPTERS;
                    const href  = locked ? "#" : `/english/writing/law4/${chapter.id}`;
                    return (
                      <HorizontalRow
                        key={chapter.id}
                        chapter={chapter}
                        sc={sc}
                        locked={locked}
                        href={href}
                        isFree={isFree}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* ── APPENDICES ── */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "14px",
            backgroundColor: "#f8fafc",
            border: "1.5px solid #e2e8f0",
            borderRadius: "12px",
            padding: "16px 22px",
            marginBottom: "16px",
          }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "10px",
              backgroundColor: "#64748b",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", flexShrink: 0,
            }}>
              📎
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Back Matter
              </p>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Appendices</p>
              <p style={{ fontSize: "11px", color: "#9ca3af", margin: "3px 0 0" }}>{bookData.appendices.length} reference appendices</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "10px" }}>
            {bookData.appendices.map((ap) => (
              <div key={ap.label} style={{
                display: "flex", alignItems: "center", gap: "12px",
                backgroundColor: "#ffffff", border: "1px solid #e5e7eb",
                borderRadius: "10px", padding: "12px 16px",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "7px", flexShrink: 0,
                  backgroundColor: "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 800, color: "#64748b",
                }}>
                  {ap.label}
                </div>
                <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, lineHeight: 1.4 }}>
                  {ap.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>
              Unlock all {totalChapters} chapters
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to every chapter across all three parts of Longman Academic Writing 4.
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
