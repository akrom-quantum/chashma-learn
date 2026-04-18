// src/app/[product]/[subject]/tests/[test]/page.js
// Test detail — shows test info, lets user start/resume.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getTest } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function TestDetailPage({ params }) {
  const { product, subject, test } = await params;
  const t = getTest(product, subject, test);
  if (!t) notFound();

  const totalQuestions = t.passages.reduce((n, p) => n + p.questions.length, 0);
  const minutes = Math.round(t.timeLimit / 60);

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        <Link href={`/${product}/${subject}/tests`} style={{ color: "#036c48", textDecoration: "none" }}>← All tests</Link>
      </nav>

      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>{t.title}</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <Pill>{t.type}</Pill>
        <Pill>{t.difficulty}</Pill>
        <Pill>{t.status}</Pill>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          <Stat label="Passages" value={t.passages.length} />
          <Stat label="Questions" value={totalQuestions} />
          <Stat label="Time" value={`${minutes} min`} />
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Before you start</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#4b5563", fontSize: 14, lineHeight: 1.8 }}>
            <li>The timer starts when you click Start Test.</li>
            <li>Your answers are auto-saved per question.</li>
            <li>You can't pause once started — simulate real test conditions.</li>
            <li>Score and detailed review available immediately after submission.</li>
          </ul>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link
          href={`/${product}/${subject}/tests/${test}/take`}
          style={{
            flex: 1,
            background: "#036c48",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 8,
            textAlign: "center",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Start Test
        </Link>
        <Link
          href={`/${product}/${subject}/drill?type=mixed&count=10`}
          style={{
            background: "#fff",
            color: "#036c48",
            border: "1px solid #036c48",
            padding: "14px 24px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Drill Instead
        </Link>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "#6b7280", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>{value}</div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span style={{
      fontSize: 12,
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: 4,
      background: "#f3f4f6",
      color: "#374151",
      textTransform: "uppercase",
      letterSpacing: 0.3,
    }}>
      {children}
    </span>
  );
}
