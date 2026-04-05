"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── Book data ─────────────────────────────────────────── */
const bookData = {
  id:      "law-5",
  title:   "Longman Academic Writing Series",
  level:   "5 — Essays to Research Papers",
  authors: "Alan Meyers",
  cover:   "/books/law-5.jpg",
  chapters: [
    {
      id: "chapter-01", num: "01", title: "Expository Essays", icon: "📄",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to expository writing" },
            { label: "Analyzing the Model" },
            { label: "Noticing Vocabulary: Negative Prefixes" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "A Clear Thesis Statement" },
            { label: "Topic Sentences" },
            { label: "A Strong Conclusion" },
          ],
        },
        {
          title: "Grammar",
          items: [
            { label: "Using Articles" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "The Writing Process" },
            { label: "Applying Vocabulary: Using Negative Prefixes" },
            { label: "Writing Assignment: A Personal Essay about the Writing Experience" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: An Opening Paragraph for a Personal Essay" },
            { label: "Complete the Personal Essay" },
          ],
        },
      ],
    },
    {
      id: "chapter-02", num: "02", title: "Classification Essays", icon: "🗂️",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to classification essays" },
            { label: "Analyzing the Model" },
            { label: "Noticing Vocabulary: Collocations" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "Introductory Paragraph" },
            { label: "Body Paragraphs" },
            { label: "Concluding Paragraph" },
          ],
        },
        {
          title: "Unity & Coherence",
          items: [
            { label: "Unity" },
            { label: "Coherence" },
          ],
        },
        {
          title: "Grammar",
          items: [
            { label: "Using Quantifiers" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Planning, Observing, and Note Taking" },
            { label: "Conducting Surveys and Administering Questionnaires" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Collocations" },
            { label: "Writing Assignment: A Classification Essay from Survey Data" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: Two Paragraphs Based on Survey Data" },
            { label: "Observing Other People" },
          ],
        },
      ],
    },
    {
      id: "chapter-03", num: "03", title: "Process Essays", icon: "⚙️",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to process writing" },
            { label: "Analyzing the Model" },
            { label: "Noticing Vocabulary: Irregular Plurals from Latin and Greek" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "Introductory Paragraph" },
            { label: "Body Paragraphs" },
            { label: "Concluding Paragraph" },
            { label: "Outlining" },
          ],
        },
        {
          title: "Sentence Structure",
          items: [
            { label: "Run-on and Comma-Spliced Sentences" },
            { label: "Choppy and Stringy Sentences" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Making Transitions between Steps in a Process" },
          ],
        },
        {
          title: "Writing a Summary and an Abstract",
          items: [
            { label: "Procedure for Summarizing an Article" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Irregular Plurals from Latin and Greek" },
            { label: "Writing Assignment: A Process Essay about an Experiment" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: A Paragraph Summary of the Writing Model" },
            { label: "Write a Scientific Process Essay" },
          ],
        },
      ],
    },
    {
      id: "chapter-04", num: "04", title: "Cause / Effect Essays", icon: "🔗",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to cause/effect writing" },
            { label: "Analyzing the Models" },
            { label: "Noticing Vocabulary: Phrasal Verbs" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "Chain Organization" },
            { label: "Block Organization" },
            { label: "Distinguishing between Cause and Effect" },
          ],
        },
        {
          title: "Sentence Structure",
          items: [
            { label: "Using Parallelism" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Conducting Research" },
          ],
        },
        {
          title: "Quoting from Outside Sources",
          items: [
            { label: "Punctuating Quotations" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Phrasal Verbs" },
            { label: "Writing Assignment: A Cause / Effect Essay about a Historical Event" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: A Paragraph Summary of a Writing Model" },
            { label: "Examining Alternatives" },
          ],
        },
      ],
    },
    {
      id: "chapter-05", num: "05", title: "Extended Definition Essays", icon: "📖",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to extended definition writing" },
            { label: "Analyzing the Model" },
            { label: "Noticing Vocabulary: Synonyms, 1" },
          ],
        },
        {
          title: "Grammar",
          items: [
            { label: "Noun Clauses" },
            { label: "Adjective Clauses" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "Three Ways to Define a Term" },
            { label: "Expanding on a Definition" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Paraphrasing Material from Sources" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Synonyms, 1" },
            { label: "Writing Assignment: An Extended Definition Essay about a Concept" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: Paraphrase a Paragraph from the Writing Model" },
            { label: "Writing a Definition" },
          ],
        },
      ],
    },
    {
      id: "chapter-06", num: "06", title: "Problem / Solution Essays", icon: "💡",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to problem/solution writing" },
            { label: "Analyzing the Model" },
            { label: "Noticing Vocabulary: Adverbial Intensifiers" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "Introductory Paragraph" },
            { label: "Body Paragraphs" },
            { label: "Concluding Paragraph" },
          ],
        },
        {
          title: "Grammar",
          items: [
            { label: "Forming Adverbial Phrases" },
            { label: "Eliminating Dangling Modifiers" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Researching a Topic in Multiple Sources" },
            { label: "Synthesizing Material from Sources" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Adverbial Intensifiers" },
            { label: "Writing Assignment: A Problem / Solution Essay about Education" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: A Summary of a Writing Model" },
            { label: "Complete the Essay" },
          ],
        },
      ],
    },
    {
      id: "chapter-07", num: "07", title: "Summary / Response Essays", icon: "💬",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to summary/response writing" },
            { label: "Analyzing the Model" },
            { label: "Noticing Vocabulary: Words Related to Cultural Change" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "The Summary" },
            { label: "The Response" },
          ],
        },
        {
          title: "Grammar",
          items: [
            { label: "Using Passive and Active Voice Appropriately" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Writing the Opening Summary" },
            { label: "Writing the Response" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Words Related to Cultural Change" },
            { label: "Writing Assignment: A Summary / Response Essay on Culture" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: Summarize and Respond to a Passage on Culture" },
            { label: "Research and Respond" },
          ],
        },
      ],
    },
    {
      id: "chapter-08", num: "08", title: "Argumentative Essays", icon: "⚖️",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to argumentative writing" },
            { label: "Analyzing the Models" },
            { label: "Noticing Vocabulary: Synonyms, 2" },
          ],
        },
        {
          title: "Grammar",
          items: [
            { label: "Modal Verbs" },
            { label: "Phrasal Modals" },
            { label: "Subjunctive Mode" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "Block Organization" },
            { label: "Point-by-Point Organization" },
            { label: "The Introductory Paragraph(s)" },
            { label: "Body Paragraphs" },
            { label: "Concluding Paragraph" },
          ],
        },
        {
          title: "Planning Your Argument",
          items: [
            { label: "Knowing Your Audience" },
            { label: "Responding to Counterarguments" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Finding Support for Your Argument" },
            { label: "Research the Counterarguments" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Synonyms, 2" },
            { label: "Writing Assignment: An Argumentative Essay on a Controversial Topic" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: A Short Argumentative Essay" },
            { label: "Taking the Opposite Position" },
          ],
        },
      ],
    },
    {
      id: "chapter-09", num: "09", title: "Research Papers", icon: "🔬",
      subsections: [
        {
          title: "Introduction & Analysis",
          items: [
            { label: "Introduction to research papers" },
            { label: "Analyzing the Model" },
            { label: "Noticing Vocabulary: Antonyms" },
          ],
        },
        {
          title: "Organization",
          items: [
            { label: "Point-by-Point Organization" },
            { label: "Source-by-Source Organization" },
          ],
        },
        {
          title: "Grammar",
          items: [
            { label: "Sequence of Tenses" },
          ],
        },
        {
          title: "Preparation for Writing",
          items: [
            { label: "Narrowing Your Focus" },
            { label: "Developing an Effective Thesis Statement" },
            { label: "Documenting Research" },
          ],
        },
        {
          title: "Writing Process & Assignment",
          items: [
            { label: "Applying Vocabulary: Using Antonyms" },
            { label: "Writing Assignment: A Research Paper of Five or More Pages" },
            { label: "Self-Assessment" },
          ],
        },
        {
          title: "Expansion",
          items: [
            { label: "Timed Writing: A Two-Paragraph Response to an Article" },
            { label: "Evaluating Sources" },
          ],
        },
      ],
    },
  ],
  appendices: [
    { id: "app-a", label: "Appendix A", title: "Writing Guides" },
    { id: "app-b", label: "Appendix B", title: "Connecting Words and Transition Signals" },
    { id: "app-c", label: "Appendix C", title: "Article Usage" },
    { id: "app-d", label: "Appendix D", title: "Common Phrasal Verbs" },
    { id: "app-e", label: "Appendix E", title: "Commonly Confused Words" },
    { id: "app-f", label: "Appendix F", title: "Commonly Misspelled Words" },
    { id: "app-g", label: "Appendix G", title: "Documenting Sources with MLA and APA Formats" },
    { id: "app-h", label: "Appendix H", title: "Correction Symbols" },
    { id: "app-i", label: "Appendix I", title: "Peer Review / Writer's Self-Check Worksheets" },
  ],
};

/* ─── Palette (matching existing site system) ───────────── */
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
];

/* ─── Helpers ────────────────────────────────────────────── */
function countItems(chapter) {
  return chapter.subsections.reduce((a, s) => a + s.items.length, 0);
}

/* ─── SubsectionBlock ────────────────────────────────────── */
function SubsectionBlock({ sub, sc, locked }) {
  const isExpansion = sub.title === "Expansion";
  const isAssignment = sub.title === "Writing Process & Assignment";
  const isMuted = isExpansion || isAssignment;
  return (
    <div style={{ marginBottom: "13px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
        <div style={{
          width: "3px", height: "13px", borderRadius: "2px", flexShrink: 0,
          backgroundColor: locked ? "#d1d5db" : isMuted ? "#cbd5e1" : sc.accent,
        }} />
        <span style={{
          fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: locked ? "#c4c4c4" : isMuted ? "#94a3b8" : sc.accent,
        }}>
          {sub.title}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "10px" }}>
        {sub.items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <div style={{
              minWidth: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
              marginTop: "6px",
              backgroundColor: locked ? "#e5e7eb" : isMuted ? "#cbd5e1" : sc.accent,
              opacity: locked ? 0.5 : 0.7,
            }} />
            <span style={{
              fontSize: "12px", lineHeight: 1.5,
              color: locked ? "#c4c4c4" : isMuted ? "#6b7280" : "#374151",
              fontStyle: isMuted ? "italic" : "normal",
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── GRID CARD ─────────────────────────────────────────── */
function GridCard({ chapter, sc, href }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex", flexDirection: "column",
        backgroundColor: "#ffffff",
        border: `1px solid ${sc.border}`,
        borderRadius: "14px", overflow: "hidden",
        textDecoration: "none",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.18s, transform 0.18s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{
        backgroundColor: sc.bg,
        borderBottom: `1px solid ${sc.border}`,
        padding: "14px 16px 12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
              backgroundColor: sc.numBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 800, letterSpacing: "-0.3px",
              color: sc.text,
            }}>
              {chapter.num}
            </div>
            <span style={{ fontSize: "18px" }}>{chapter.icon}</span>
          </div>
        </div>
        <h2 style={{ fontSize: "13px", fontWeight: 800, margin: "0 0 3px", lineHeight: 1.3, color: sc.text }}>
          Chapter {chapter.num}: {chapter.title}
        </h2>
        <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          {chapter.subsections.length} sections · {countItems(chapter)} topics
        </p>
      </div>
      <div style={{ padding: "14px 16px 4px", flex: 1 }}>
        {chapter.subsections.map((sub, i) => (
          <SubsectionBlock key={i} sub={sub} sc={sc} locked={false} />
        ))}
      </div>
      <div style={{
        padding: "10px 16px",
        borderTop: `1px solid ${sc.border}`,
        backgroundColor: sc.bg,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: sc.accent }}>Open chapter</span>
        <span style={{ fontSize: "16px", color: sc.accent }}>→</span>
      </div>
    </Link>
  );
}

/* ─── HORIZONTAL ROW ─────────────────────────────────────── */
function HorizontalRow({ chapter, sc, href }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: `1px solid ${open ? sc.border : "#e5e7eb"}`,
      borderRadius: "12px", overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 20px",
        backgroundColor: open ? sc.bg : "#ffffff",
        transition: "background-color 0.2s",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
          backgroundColor: sc.numBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 800,
          color: sc.text,
        }}>
          {chapter.num}
        </div>
        <span style={{ fontSize: "20px", flexShrink: 0 }}>{chapter.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: sc.text, margin: 0, lineHeight: 1.3 }}>
            {chapter.title}
          </p>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
            {chapter.subsections.length} sections · {countItems(chapter)} topics
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
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
            {open ? "Hide topics" : "Show topics"}
            <span style={{
              fontSize: "9px", display: "inline-block",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}>▼</span>
          </button>
          <Link href={href} style={{
            fontSize: "11px", fontWeight: 700,
            color: "#ffffff", backgroundColor: sc.accent,
            borderRadius: "6px", padding: "5px 13px",
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Open →
          </Link>
        </div>
      </div>
      {open && (
        <div style={{
          borderTop: `1px solid ${sc.border}`,
          padding: "16px 20px 16px 70px",
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

/* ─── Appendices Section ─────────────────────────────────── */
function AppendicesSection() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Appendices & Reference</h2>
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            fontSize: "11px", fontWeight: 700,
            color: "#64748b", backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: "6px",
            padding: "5px 12px", cursor: "pointer",
          }}
        >
          {open ? "Collapse" : "Show all"}
        </button>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "8px",
      }}>
        {bookData.appendices.map((app, i) => (
          <div
            key={app.id}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "12px 14px",
              display: "flex", alignItems: "center", gap: "10px",
            }}
          >
            <div style={{
              width: "30px", height: "30px", borderRadius: "7px", flexShrink: 0,
              backgroundColor: "#f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "10px", fontWeight: 800, color: "#64748b",
            }}>
              {String.fromCharCode(65 + i)}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 1px", fontWeight: 600 }}>
                {app.label}
              </p>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#374151", margin: 0, lineHeight: 1.3 }}>
                {app.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function LAW5ContentsPage() {
  const [layout, setLayout] = useState("grid");

  const totalTopics = bookData.chapters.reduce((a, ch) => a + countItems(ch), 0);

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
            <Link href="/ielts" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>IELTS</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/ielts/writing" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Writing</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>LAW 5</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── BOOK HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "36px" }}>
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "1px solid #d1d5db" }}>
            <img
              src={bookData.cover}
              alt={bookData.title}
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
              ADVANCED
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#0c4a6e", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#1d4ed8", marginBottom: "2px" }}>Level 5 — Essays to Research Papers</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px", flexWrap: "wrap" }}>
              {[
                { val: bookData.chapters.length,      label: "Chapters" },
                { val: totalTopics,                   label: "Total topics" },
                { val: bookData.appendices.length,    label: "Appendices" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "#0c4a6e", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {["Essays", "Research", "Grammar", "Vocabulary", "Writing Process"].map(tag => (
                <span key={tag} style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#dbeafe", color: "#1e3a8a", padding: "3px 10px", borderRadius: "999px" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── LAYOUT TOGGLE ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, margin: 0 }}>
            {bookData.chapters.length} Chapters · {totalTopics} Topics
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
                color: layout === key ? "#0c4a6e" : "#6b7280",
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
            {bookData.chapters.map((chapter, ci) => {
              const sc   = palette[ci] || palette[0];
              const href = `/ielts/writing/law-5/${chapter.id}`;
              return <GridCard key={chapter.id} chapter={chapter} sc={sc} href={href} />;
            })}
          </div>
        )}

        {/* ── HORIZONTAL LAYOUT ── */}
        {layout === "horizontal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {bookData.chapters.map((chapter, ci) => {
              const sc   = palette[ci] || palette[0];
              const href = `/ielts/writing/law-5/${chapter.id}`;
              return <HorizontalRow key={chapter.id} chapter={chapter} sc={sc} href={href} />;
            })}
          </div>
        )}

        {/* ── APPENDICES ── */}
        <AppendicesSection />

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
