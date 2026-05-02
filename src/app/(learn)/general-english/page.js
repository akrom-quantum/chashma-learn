import Link from "next/link";
import { grammarUnits, wordSkillsUnits, vocabularyUnits, pronunciationUnits,
         collocationUnits, phrasalVerbUnits, idiomUnits, writingUnits,
         speakingUnits, peuEntries } from "@/velite";
import HowItWorks        from "@/components/general-english/HowItWorks";
import LevelGuide        from "@/components/general-english/LevelGuide";
import BookCard          from "@/components/general-english/BookCard";
import StudyPath         from "@/components/general-english/StudyPath";
import GEProgressSummary from "@/components/general-english/GEProgressSummary";

export const metadata = {
  title: "General English — Chashma Learn",
  description:
    "From foundational grammar to advanced academic writing — everything in one place.",
};

const BOOKS = [
  {
    icon: "📐", title: "Grammar",
    description: "49 units from A2 to C1 — merged Oxford Grammar Course.",
    unitCount: grammarUnits.length, levelRange: "A2–C1",
    href: "/general-english/grammar", accentColor: "#059669",
  },
  {
    icon: "📚", title: "Oxford Word Skills",
    description: "172 thematic vocabulary units across three source levels.",
    unitCount: wordSkillsUnits.length, levelRange: "A1–B2",
    href: "/general-english/word-skills", accentColor: "#7c3aed",
  },
  {
    icon: "🔤", title: "Vocabulary",
    description: "59 units covering people, society, work and abstract concepts.",
    unitCount: vocabularyUnits.length, levelRange: "B1–B2",
    href: "/general-english/vocabulary", accentColor: "#dc2626",
  },
  {
    icon: "🔊", title: "Pronunciation",
    description: "129 units from phonemes to intonation — includes IPA reference.",
    unitCount: pronunciationUnits.length, levelRange: "A2–C1",
    href: "/general-english/pronunciation", accentColor: "#0891b2",
  },
  {
    icon: "🔗", title: "Collocations",
    description: "55 units of high-frequency word pairs in context.",
    unitCount: collocationUnits.length, levelRange: "B1–B2",
    href: "/general-english/collocations", accentColor: "#d97706",
  },
  {
    icon: "⬆️", title: "Phrasal Verbs",
    description: "88 units organised by particle, verb and function.",
    unitCount: phrasalVerbUnits.length, levelRange: "B1–B2",
    href: "/general-english/phrasal-verbs", accentColor: "#16a34a",
  },
  {
    icon: "💬", title: "Idioms",
    description: "88 units from emotions and communication to classical references.",
    unitCount: idiomUnits.length, levelRange: "B1–C1",
    href: "/general-english/idioms", accentColor: "#b45309",
  },
  {
    icon: "✍️", title: "Academic Writing",
    description: "19 units across 7 phases — paragraph to full research paper.",
    unitCount: writingUnits.length, levelRange: "B1–C1",
    href: "/general-english/writing", accentColor: "#7c3aed",
  },
  {
    icon: "🗣️", title: "Speaking",
    description: "60 dialogue-based units — social expressions and everyday idioms.",
    unitCount: speakingUnits.length, levelRange: "B1–B2",
    href: "/general-english/speaking", accentColor: "#0284c7",
  },
  {
    icon: "📖", title: "Practical English Usage",
    description: "Michael Swan's 635-entry reference — grammar and vocabulary.",
    unitCount: 635, levelRange: "All levels",
    href: "/general-english/practical-english-usage", accentColor: "#3730a3",
  },
];

export default function GeneralEnglishHub() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

      {/* Section A — Hero */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 10 }}>
          <a href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>Home</a>
          {" › "}General English
        </div>
        <h1 style={{ fontSize: 38, fontWeight: 900, margin: "0 0 12px", color: "#111827", lineHeight: 1.2 }}>
          General English
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.7, maxWidth: 600 }}>
          From foundational grammar to advanced academic writing — everything in one place.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/general-english/grammar" style={ctaBtn("#059669")}>
            Start Learning
          </Link>
          <span style={{
            ...ctaBtn("#f3f4f6"),
            color: "#9ca3af", cursor: "default",
            position: "relative",
          }}>
            Take a Level Test
            <span style={{
              fontSize: 10, background: "#374151", color: "#fff",
              padding: "2px 6px", borderRadius: 4,
              position: "absolute", top: -8, right: -4,
            }}>Soon</span>
          </span>
        </div>
      </div>

      {/* Section F — Progress (authenticated users only, client component) */}
      <GEProgressSummary />

      {/* Section B — How it works */}
      <HowItWorks />

      {/* Section C — Level guide */}
      <LevelGuide />

      {/* Section D — Books grid */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px", color: "#111827" }}>
          All books
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
          {BOOKS.map(book => <BookCard key={book.href} {...book} />)}
        </div>
      </div>

      {/* Section E — Study paths */}
      <StudyPath />
    </div>
  );
}

function ctaBtn(bg) {
  return {
    display: "inline-block",
    padding: "11px 24px",
    background: bg,
    color: bg === "#f3f4f6" ? "#374151" : "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
  };
}
