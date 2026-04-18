"use client";

// src/app/[product]/[subject]/drill/session/[sessionId]/page.js
// Active drill session — loads drillSession doc, pulls questions, renders TestRunner in drill mode.

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getTest } from "@/content/registry";
import TestRunner from "@/components/content/TestRunner";

export default function DrillSessionPage({ params }) {
  const { product, subject, sessionId } = use(params);
  const [session, setSession] = useState(null);
  const [questionsPackage, setQuestionsPackage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "drillSessions", sessionId));
        if (!snap.exists()) {
          setError("Session not found");
          return;
        }
        const data = snap.data();
        setSession(data);

        // Resolve question refs → actual question objects
        const questions = [];
        for (const ref of data.questionIds) {
          const test = getTest(product, subject, ref.testId);
          if (!test) continue;
          const passage = test.passages.find(p => p.id === ref.passageId);
          if (!passage) continue;
          const q = passage.questions.find(q => q.id === ref.questionId);
          if (q) questions.push({ ...q, _sourcePassage: passage.body });
        }

        // Build a synthetic "test" for the runner
        setQuestionsPackage({
          id: `drill-${sessionId}`,
          product,
          subject,
          type: "drill-seed",
          title: `Drill — ${data.filters.count} questions`,
          difficulty: "standard",
          status: "free",
          timeLimit: 600,
          passages: [{
            id: "drill-passage",
            title: "",
            body: "Drill mode — no passage shown. Answer each question independently.",
            questions: questions,
          }],
        });
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [sessionId, product, subject]);

  if (error) {
    return (
      <main style={wrap}>
        <p style={{ color: "#991b1b" }}>{error}</p>
        <Link href={`/${product}/${subject}/drill`} style={{ color: "#036c48" }}>← Back to drill setup</Link>
      </main>
    );
  }
  if (!questionsPackage) {
    return <main style={wrap}>Loading drill…</main>;
  }
  return (
    <main style={wrap}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{questionsPackage.title}</h1>
      <TestRunner test={questionsPackage} mode="drill" />
    </main>
  );
}

const wrap = { maxWidth: 900, margin: "0 auto", padding: "32px 24px", fontFamily: "Manrope, sans-serif" };
