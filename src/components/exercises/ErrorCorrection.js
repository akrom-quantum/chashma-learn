"use client";

import { useState } from "react";

export default function ErrorCorrection({ exercise, onResult }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const normalise = s => s.trim().toLowerCase().replace(/\s+/g, " ");
  const correct = submitted && normalise(value) === normalise(exercise.answer);

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim() || submitted) return;
    setSubmitted(true);
    onResult?.(normalise(value) === normalise(exercise.answer));
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Wrong sentence */}
      <div style={{
        background: "#fef2f2",
        border: "1px solid #fca5a5",
        borderRadius: 6,
        padding: "10px 14px",
        marginBottom: 14,
        fontSize: 15,
        color: "#7f1d1d",
        fontStyle: "italic",
      }}>
        ✗ {exercise.question}
      </div>

      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
        Write the corrected sentence:
      </label>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={submitted}
        rows={2}
        style={{
          width: "100%",
          border: submitted
            ? `2px solid ${correct ? "#10b981" : "#ef4444"}`
            : "2px solid #d1d5db",
          borderRadius: 6,
          padding: "8px 12px",
          fontSize: 15,
          fontFamily: "inherit",
          resize: "vertical",
          outline: "none",
          background: submitted ? (correct ? "#ecfdf5" : "#fef2f2") : "#fff",
          color: "#111827",
          boxSizing: "border-box",
          marginBottom: 10,
        }}
      />

      {!submitted && (
        <button type="submit" style={submitBtn} disabled={!value.trim()}>
          Check
        </button>
      )}

      {submitted && (
        <div style={{
          padding: "10px 14px",
          borderRadius: 6,
          background: correct ? "#ecfdf5" : "#fef2f2",
          border: `1px solid ${correct ? "#86efac" : "#fca5a5"}`,
          fontSize: 14,
        }}>
          <div style={{ fontWeight: 700, color: correct ? "#166534" : "#991b1b", marginBottom: 4 }}>
            {correct ? "✓ Correct!" : `✗ Correct answer: ${exercise.answer}`}
          </div>
          {exercise.explanation && (
            <div style={{ color: "#374151", lineHeight: 1.5 }}>{exercise.explanation}</div>
          )}
        </div>
      )}
    </form>
  );
}

const submitBtn = {
  padding: "7px 18px",
  background: "#059669",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};
