"use client";

// src/app/[product]/[subject]/drill/page.js
// Drill setup — user picks question type, count, difficulty, then starts a session.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { listAllQuestionsForSubject } from "@/content/registry";

export default function DrillSetupPage({ params }) {
  const { product, subject } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [type, setType] = useState("mixed");
  const [count, setCount] = useState(20);
  const [difficulty, setDifficulty] = useState("all");
  const [availableTypes, setAvailableTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allQ = listAllQuestionsForSubject(product, subject);
    const types = [...new Set(allQ.map(q => q.type))];
    setAvailableTypes(types);
  }, [product, subject]);

  async function startDrill() {
    if (!user) {
      router.push("/login");
      return;
    }
    setLoading(true);

    const allQ = listAllQuestionsForSubject(product, subject);
    let pool = type === "mixed" ? allQ : allQ.filter(q => q.type === type);
    if (difficulty !== "all") {
      const d = parseInt(difficulty);
      pool = pool.filter(q => q.difficulty === d);
    }
    // Shuffle + take count
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    if (selected.length === 0) {
      alert("No questions match those filters.");
      setLoading(false);
      return;
    }

    try {
      const session = await addDoc(collection(db, "drillSessions"), {
        uid: user.uid,
        product,
        subject,
        filters: { type, count, difficulty },
        questionIds: selected.map(q => ({
          testId: q.testId,
          passageId: q.passageId,
          questionId: q.id,
        })),
        status: "active",
        createdAt: serverTimestamp(),
      });
      router.push(`/${product}/${subject}/drill/session/${session.id}`);
    } catch (e) {
      console.error(e);
      alert("Could not start drill. Try again.");
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        <Link href={`/${product}/${subject}`} style={{ color: "#036c48", textDecoration: "none" }}>← {subject}</Link>
      </nav>

      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Drill Mode</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Quick practice session. Pick a question type, pick a count, hit start.
      </p>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 24 }}>
        <Field label="Question type">
          <select value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
            <option value="mixed">Mixed (all types)</option>
            {availableTypes.map(t => <option key={t} value={t}>{t.replace(/-/g, " ")}</option>)}
          </select>
        </Field>

        <Field label="Number of questions">
          <select value={count} onChange={e => setCount(Number(e.target.value))} style={inputStyle}>
            {[5, 10, 20, 30, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </Field>

        <Field label="Difficulty">
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={inputStyle}>
            <option value="all">Any</option>
            <option value="1">1 — Easiest</option>
            <option value="2">2</option>
            <option value="3">3 — Medium</option>
            <option value="4">4</option>
            <option value="5">5 — Hardest</option>
          </select>
        </Field>

        <button
          onClick={startDrill}
          disabled={loading}
          style={{
            background: "#036c48", color: "#fff", border: "none",
            padding: "14px 24px", borderRadius: 8, width: "100%",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit", marginTop: 8,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Starting..." : "Start Drill"}
        </button>
      </div>

      {availableTypes.length === 0 && (
        <div style={{ marginTop: 24, padding: 20, background: "#fffbeb", borderRadius: 8, fontSize: 14, color: "#92400e" }}>
          No tests are registered for this subject yet. Drill mode needs question data — seed at least one test in Phase 1.
        </div>
      )}
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "block",
        fontSize: 13,
        fontWeight: 700,
        color: "#374151",
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 0.3,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  fontSize: 14,
  fontFamily: "inherit",
  background: "#fff",
};
