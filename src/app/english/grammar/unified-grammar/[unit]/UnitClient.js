"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Reusable style components ───────────────────────────────────────────────

export function Note({ children })    { return <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#166534", lineHeight: 1.7 }}>{children}</div>; }
export function Warning({ children }) { return <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#92400e", lineHeight: 1.7 }}>{children}</div>; }
export function Tip({ children })     { return <div style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid #036c48", borderRadius: "0 10px 10px 0", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#166534", lineHeight: 1.7 }}>{children}</div>; }
export function Info({ children })    { return <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#1e40af", lineHeight: 1.7 }}>{children}</div>; }
export function Danger({ children })  { return <div style={{ backgroundColor: "#fff1f2", border: "1px solid #fecdd3", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#9f1239", lineHeight: 1.7 }}>{children}</div>; }
export function Success({ children }) { return <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#14532d", lineHeight: 1.7 }}>{children}</div>; }
export function Abstract({ children }){ return <div style={{ backgroundColor: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#6b21a8", lineHeight: 1.7 }}>{children}</div>; }
export function Example({ children }) { return <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #64748b", borderRadius: "0 10px 10px 0", padding: "16px 20px", marginBottom: "20px", fontSize: "14px", color: "#334155", lineHeight: 1.7 }}>{children}</div>; }
export function Quote({ children })   { return <blockquote style={{ borderLeft: "4px solid #036c48", margin: "0 0 20px", padding: "12px 20px", fontSize: "15px", fontStyle: "italic", color: "#374151", lineHeight: 1.7 }}>{children}</blockquote>; }
export function H2({ children })      { return <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", marginBottom: "16px", marginTop: "40px", letterSpacing: "-0.5px" }}>{children}</h2>; }
export function H3({ children })      { return <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "12px", marginTop: "28px" }}>{children}</h3>; }
export function P({ children })       { return <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "16px" }}>{children}</p>; }
export function Bold({ children })    { return <strong style={{ fontWeight: 700, color: "#111827" }}>{children}</strong>; }
export function Em({ children })      { return <em style={{ fontStyle: "italic", color: "#036c48" }}>{children}</em>; }
export function Code({ children })    { return <code style={{ fontFamily: "monospace", backgroundColor: "#f3f4f6", padding: "2px 7px", borderRadius: "5px", fontSize: "13px", color: "#be185d" }}>{children}</code>; }

export function UL({ items = [] }) {
  return (
    <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: "14px", color: "#374151", lineHeight: 1.8, marginBottom: "6px" }}>{item}</li>
      ))}
    </ul>
  );
}

export function OL({ items = [] }) {
  return (
    <ol style={{ paddingLeft: "20px", marginBottom: "20px" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: "14px", color: "#374151", lineHeight: 1.8, marginBottom: "6px" }}>{item}</li>
      ))}
    </ol>
  );
}

export function Table({ headers = [], rows = [] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "24px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "10px 16px", backgroundColor: "#f3f4f6", fontWeight: 700, color: "#374151", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 16px", color: "#374151" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Content registry ─────────────────────────────────────────────────────────
// Add new units here. Each entry has topic (JSX) and practice (component).

function TopicContent({ unitId }) {
  if (unitId === "unit-1") {
    return (
      <div>
        <H2>The Present Perfect Tense</H2>
        <P>The present perfect connects a past action to the present moment. It emphasizes the <Bold>result</Bold> or <Bold>relevance</Bold> of something that happened at an unspecified time before now.</P>

        <Tip>
          <strong>Quick Formula:</strong> Subject + <Em>have / has</Em> + Past Participle (V3)
        </Tip>

        <H3>When to Use It</H3>
        <UL items={[
          "Recent actions whose results are still felt: \"I have lost my keys.\"",
          "Life experiences at an unspecified time: \"She has visited Japan.\"",
          "Unfinished time periods: \"We have had three meetings this week.\""
        ]} />

        <H3>Common Signal Words</H3>
        <Table
          headers={["Signal Word", "Example"]}
          rows={[
            ["just",  "I have just finished."],
            ["already", "She has already left."],
            ["yet", "Have you eaten yet?"],
            ["ever / never", "Have you ever tried sushi?"],
            ["since / for", "I have lived here for 10 years."],
          ]}
        />

        <Warning>
          Do <Bold>not</Bold> use specific past time markers (yesterday, last week, in 2005) with the present perfect. Switch to Simple Past instead.
        </Warning>

        <Example>
          ✗ &quot;I have seen him <Em>yesterday</Em>.&quot;<br />
          ✓ &quot;I <Bold>saw</Bold> him yesterday.&quot;
        </Example>

        <H3>Present Perfect vs. Simple Past</H3>
        <P>The key question: <Bold>does the time matter?</Bold> If yes, use Simple Past. If the focus is the result or experience, use Present Perfect.</P>

        <Note>
          Think of it this way: Simple Past tells a story. Present Perfect reports a current situation.
        </Note>
      </div>
    );
  }

  // Default: unit content not written yet
  return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#d1d5db", display: "block", marginBottom: "16px" }}>construction</span>
      <p style={{ fontSize: "16px", color: "#9ca3af", fontWeight: 600 }}>Content coming soon</p>
      <p style={{ fontSize: "13px", color: "#d1d5db", marginTop: "8px" }}>Unit ID: {unitId}</p>
    </div>
  );
}

function PracticeContent({ unitId }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (unitId === "unit-1") {
    const questions = [
      { id: 1, prompt: "I ______ (visit) Paris three times.", answer: "have visited" },
      { id: 2, prompt: "She ______ (not finish) her homework yet.", answer: "has not finished" },
      { id: 3, prompt: "______ you ever ______ (eat) sushi?", answer: "Have / eaten" },
      { id: 4, prompt: "We ______ (live) here since 2015.", answer: "have lived" },
    ];

    return (
      <div>
        <H2>Practice: Fill in the Blanks</H2>
        <P>Complete each sentence using the Present Perfect form of the verb given.</P>

        {questions.map((q) => (
          <div key={q.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "20px 24px", marginBottom: "16px" }}>
            <p style={{ fontSize: "15px", color: "#374151", marginBottom: "12px", lineHeight: 1.6 }}>{q.id}. {q.prompt}</p>
            <input
              type="text"
              placeholder="Your answer..."
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: submitted
                  ? answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase()
                    ? "2px solid #22c55e"
                    : "2px solid #ef4444"
                  : "1px solid #e5e7eb",
                fontSize: "14px",
                color: "#111827",
                outline: "none",
                boxSizing: "border-box",
                backgroundColor: submitted
                  ? answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase()
                    ? "#f0fdf4"
                    : "#fff1f2"
                  : "#ffffff",
              }}
              disabled={submitted}
            />
            {submitted && (
              <p style={{ marginTop: "8px", fontSize: "13px", color: answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase() ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                {answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase()
                  ? "✓ Correct!"
                  : `✗ Correct answer: ${q.answer}`}
              </p>
            )}
          </div>
        ))}

        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              style={{ padding: "12px 28px", backgroundColor: "#036c48", color: "#ffffff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}
            >
              Check Answers
            </button>
          ) : (
            <button
              onClick={() => { setSubmitted(false); setAnswers({}); }}
              style={{ padding: "12px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#d1d5db", display: "block", marginBottom: "16px" }}>construction</span>
      <p style={{ fontSize: "16px", color: "#9ca3af", fontWeight: 600 }}>Practice exercises coming soon</p>
    </div>
  );
}

// ─── Unit metadata ─────────────────────────────────────────────────────────────

const UNIT_META = {
  "unit-1": { title: "The Present Perfect Tense", level: "Intermediate B1", time: "12 mins", questions: 4 },
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function UnitClient({ subject, bookId, unitId }) {
  const [activeTab, setActiveTab] = useState("topic");
  const meta = UNIT_META[unitId] || { title: unitId, level: "—", time: "—", questions: 0 };

  const subjectLabel = subject
    ? subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, " ")
    : "English";

  const bookLabel = bookId
    ? bookId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Book";

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px" }}>
            Chashma Learn
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/courses" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Courses</Link>
            <Link href="/login" style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", paddingTop: "64px" }}>

        {/* SIDEBAR */}
        <aside style={{ width: "260px", height: "calc(100vh - 64px)", position: "fixed", left: 0, top: "64px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", padding: "24px 0" }}>
          <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>language</span>
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>General English</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{subjectLabel}</p>
              </div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
            {[
              { icon: "menu_book",            label: "Oxford Word Skills", href: "/english/oxford"         },
              { icon: "spellcheck",           label: "Grammar",            href: "/english/grammar"        },
              { icon: "translate",            label: "Vocabulary",         href: "/english/vocabulary"     },
              { icon: "record_voice_over",    label: "Pronunciation",      href: "/english/pronunciation"  },
              { icon: "link",                 label: "Collocations",       href: "/english/collocations"   },
              { icon: "format_list_bulleted", label: "Phrasal Verbs",      href: "/english/phrasal-verbs"  },
              { icon: "auto_stories",         label: "Idioms",             href: "/english/idioms"         },
              { icon: "edit_note",            label: "Writing",            href: "/english/writing"        },
            ].map((tab) => {
              const isActive = subject && tab.href.includes(subject);
              return (
                <Link key={tab.href} href={tab.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", marginBottom: "2px", textDecoration: "none", backgroundColor: isActive ? "#d1fae5" : "transparent", color: isActive ? "#036c48" : "#6b7280", fontWeight: isActive ? 700 : 500, fontSize: "14px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{tab.icon}</span>
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: "16px 20px", borderTop: "1px solid #f3f4f6" }}>
            <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
              All Modes
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ marginLeft: "260px", flex: 1, padding: "48px", maxWidth: "860px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "13px", color: "#9ca3af" }}>
            <Link href={`/english/${subject}`} style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>{subjectLabel}</Link>
            <span>›</span>
            <Link href={`/english/${subject}/${bookId}`} style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>{bookLabel}</Link>
            <span>›</span>
            <span style={{ color: "#374151", fontWeight: 600 }}>{unitId}</span>
          </div>

          {/* Level badge */}
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {meta.level}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "38px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "32px" }}>
            {meta.title}
          </h1>

          {/* Meta cards */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
            {[
              { icon: "schedule",   label: "Learning Time", value: meta.time },
              { icon: "quiz",       label: "Exercises",     value: `${meta.questions} Questions` },
            ].map((m) => (
              <div key={m.label} style={{ flex: 1, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>{m.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{m.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 800, color: "#111827" }}>{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "#f3f4f6", borderRadius: "10px", padding: "4px", marginBottom: "40px", width: "fit-content" }}>
            {[
              { id: "topic",    label: "Topic",    icon: "menu_book" },
              { id: "practice", label: "Practice", icon: "edit"      },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px", borderRadius: "8px", border: "none",
                  cursor: "pointer", fontSize: "14px", fontWeight: 700,
                  backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
                  color: activeTab === tab.id ? "#036c48" : "#9ca3af",
                  boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "topic"    && <TopicContent    unitId={unitId} />}
          {activeTab === "practice" && <PracticeContent unitId={unitId} />}

        </main>
      </div>
    </div>
  );
}
