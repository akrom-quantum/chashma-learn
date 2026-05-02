"use client";

import { useState } from "react";

export default function FillInBlank({ exercise, onResult }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const normalise = s => s.trim().toLowerCase();
  const correct = submitted && normalise(value) === normalise(exercise.answer);
  const wrong   = submitted && !correct;

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim() || submitted) return;
    setSubmitted(true);
    onResult?.(normalise(value) === normalise(exercise.answer));
  }

  const parts = exercise.sentence.split("___");

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: 16, color: "#1f2937", margin: "0 0 14px", lineHeight: 1.6 }}>
        {parts[0]}
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={submitted}
          placeholder="your answer"
          style={{
            display: "inline-block",
            border: submitted
              ? `2px solid ${correct ? "#10b981" : "#ef4444"}`
              : "2px solid #d1d5db",
            borderRadius: 6,
            padding: "2px 8px",
            fontSize: 15,
            width: 140,
            outline: "none",
            background: submitted ? (correct ? "#ecfdf5" : "#fef2f2") : "#fff",
            color: "#111827",
            fontFamily: "inherit",
            margin: "0 4px",
          }}
        />
        {parts[1]}
      </p>

      {!submitted && (
        <button type="submit" style={submitBtn} disabled={!value.trim()}>
          Check
        </button>
      )}

      {submitted && (
        <Feedback correct={correct} answer={exercise.answer} explanation={exercise.explanation} />
      )}
    </form>
  );
}

function Feedback({ correct, answer, explanation }) {
  return (
    <div style={{
      marginTop: 10,
      padding: "10px 14px",
      borderRadius: 6,
      background: correct ? "#ecfdf5" : "#fef2f2",
      border: `1px solid ${correct ? "#86efac" : "#fca5a5"}`,
      fontSize: 14,
    }}>
      <div style={{ fontWeight: 700, color: correct ? "#166534" : "#991b1b", marginBottom: 4 }}>
        {correct ? "✓ Correct!" : `✗ Answer: ${answer}`}
      </div>
      {explanation && <div style={{ color: "#374151", lineHeight: 1.5 }}>{explanation}</div>}
    </div>
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
