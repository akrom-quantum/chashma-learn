"use client";

import { useState } from "react";

export default function MultipleChoice({ exercise, onResult }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = submitted && selected === exercise.correctIndex;

  function handleSubmit() {
    if (selected === null || submitted) return;
    setSubmitted(true);
    onResult?.(selected === exercise.correctIndex);
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: "#1f2937", margin: "0 0 14px", lineHeight: 1.6 }}>
        {exercise.question}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {exercise.options.map((opt, i) => {
          let bg = "#fff", border = "#d1d5db", color = "#374151";
          if (submitted) {
            if (i === exercise.correctIndex) { bg = "#ecfdf5"; border = "#10b981"; color = "#166534"; }
            else if (i === selected)          { bg = "#fef2f2"; border = "#ef4444"; color = "#991b1b"; }
          } else if (i === selected) {
            bg = "#eff6ff"; border = "#3b82f6"; color = "#1e40af";
          }
          return (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              style={{
                textAlign: "left",
                padding: "9px 14px",
                border: `2px solid ${border}`,
                borderRadius: 8,
                background: bg,
                color,
                fontSize: 15,
                cursor: submitted ? "default" : "pointer",
                fontFamily: "inherit",
                fontWeight: i === exercise.correctIndex && submitted ? 600 : 400,
                transition: "border-color 0.1s, background 0.1s",
              }}
            >
              <span style={{ marginRight: 10, fontWeight: 700 }}>
                {["A", "B", "C", "D"][i]}.
              </span>
              {opt}
              {submitted && i === exercise.correctIndex && " ✓"}
              {submitted && i === selected && i !== exercise.correctIndex && " ✗"}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button onClick={handleSubmit} style={submitBtn} disabled={selected === null}>
          Check
        </button>
      )}

      {submitted && exercise.explanation && (
        <div style={{
          padding: "10px 14px",
          borderRadius: 6,
          background: correct ? "#ecfdf5" : "#fef2f2",
          border: `1px solid ${correct ? "#86efac" : "#fca5a5"}`,
          fontSize: 14,
          color: "#374151",
          lineHeight: 1.5,
        }}>
          <span style={{ fontWeight: 700, color: correct ? "#166534" : "#991b1b" }}>
            {correct ? "✓ Correct! " : "✗ "}
          </span>
          {exercise.explanation}
        </div>
      )}
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
