"use client";

// src/components/content/TestRunner.js
// Phase 0 scaffold. Full three-mode engine (full-test, single-question, drill) lands in Phase 1.
// This stub proves the shell renders and Firestore attempt writes work end-to-end.

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

export default function TestRunner({ test, mode = "full" }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  if (!test) {
    return <div style={placeholderStyle}>No test loaded.</div>;
  }

  const allQuestions = test.passages.flatMap(p =>
    p.questions.map(q => ({ ...q, passageId: p.id }))
  );

  function handleAnswer(qId, value) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: value }));
  }

  async function handleSubmit() {
    if (submitted) return;
    let correct = 0;
    for (const q of allQuestions) {
      const given = answers[q.id];
      const expected = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      if (given && given.toString().trim().toLowerCase() === expected.toString().trim().toLowerCase()) {
        correct++;
      }
    }
    const final = {
      correct,
      total: allQuestions.length,
      percent: Math.round((correct / allQuestions.length) * 100),
    };
    setScore(final);
    setSubmitted(true);

    if (user) {
      try {
        const attempt = await addDoc(collection(db, "attempts"), {
          uid: user.uid,
          testId: test.id,
          mode,
          product: test.product,
          subject: test.subject,
          startedAt: serverTimestamp(),
          completedAt: serverTimestamp(),
          score: final,
        });
        // Write per-question answers to subcollection
        const answersRef = collection(db, "attempts", attempt.id, "answers");
        for (const q of allQuestions) {
          const given = answers[q.id] || null;
          const expected = Array.isArray(q.answer) ? q.answer[0] : q.answer;
          const isCorrect = given && given.toString().trim().toLowerCase() === expected.toString().trim().toLowerCase();
          await addDoc(answersRef, {
            questionId: q.id,
            selected: given,
            correct: !!isCorrect,
            type: q.type,
            skill: q.skill || null,
            difficulty: q.difficulty || 3,
          });
        }
      } catch (e) {
        console.error("Failed to write attempt:", e);
      }
    }
  }

  return (
    <div>
      {test.passages.map(p => (
        <div key={p.id} style={{ marginBottom: 32 }}>
          {p.title && <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{p.title}</h2>}
          <div style={{ background: "#f9fafb", padding: 20, borderRadius: 8, marginBottom: 16, whiteSpace: "pre-wrap" }}>
            {p.body}
          </div>
          {p.questions.map((q, i) => (
            <QuestionBlock
              key={q.id}
              q={q}
              number={i + 1}
              value={answers[q.id]}
              onChange={v => handleAnswer(q.id, v)}
              submitted={submitted}
            />
          ))}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length === 0}
          style={primaryBtn}
        >
          Submit Test
        </button>
      ) : (
        <div style={{ padding: 20, background: "#ecfdf5", borderRadius: 8 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#065f46" }}>
            Score: {score.correct} / {score.total} ({score.percent}%)
          </div>
          <div style={{ color: "#047857", marginTop: 4, fontSize: 14 }}>
            Attempt saved. Detailed review coming in Phase 1.
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionBlock({ q, number, value, onChange, submitted }) {
  const expected = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const isCorrect = submitted && value && value.toString().trim().toLowerCase() === expected.toString().trim().toLowerCase();

  return (
    <div style={{
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      background: "#fff",
      border: `1px solid ${submitted ? (isCorrect ? "#10b981" : "#ef4444") : "#e5e7eb"}`,
    }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        {number}. {q.prompt}
      </div>
      {q.options ? (
        <div>
          {q.options.map(opt => (
            <label key={opt} style={{
              display: "block",
              padding: "6px 10px",
              borderRadius: 4,
              cursor: submitted ? "default" : "pointer",
              background: value === opt ? "#ecfdf5" : "transparent",
            }}>
              <input
                type="radio"
                name={q.id}
                checked={value === opt}
                onChange={() => onChange(opt)}
                disabled={submitted}
                style={{ marginRight: 8 }}
              />
              {opt}
            </label>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          disabled={submitted}
          style={{
            width: "100%", padding: "8px 12px",
            border: "1px solid #d1d5db", borderRadius: 6,
            fontFamily: "inherit", fontSize: 14,
          }}
        />
      )}
      {submitted && (
        <div style={{ marginTop: 6, fontSize: 13, color: isCorrect ? "#065f46" : "#991b1b" }}>
          {isCorrect ? "✓ Correct" : `✗ Correct answer: ${expected}`}
          {q.explanation && (
            <div style={{ marginTop: 4, color: "#6b7280" }}>{q.explanation}</div>
          )}
        </div>
      )}
    </div>
  );
}

const placeholderStyle = { padding: 24, textAlign: "center", color: "#6b7280" };
const primaryBtn = {
  background: "#036c48", color: "#fff", border: "none",
  padding: "12px 24px", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
};
