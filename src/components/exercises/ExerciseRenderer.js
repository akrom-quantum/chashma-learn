"use client";

import { useState } from "react";
import ExerciseShell from "./ExerciseShell";
import FillInBlank from "./FillInBlank";
import MultipleChoice from "./MultipleChoice";
import ErrorCorrection from "./ErrorCorrection";
import ScoreStrip from "./ScoreStrip";

export default function ExerciseRenderer({ exercises = [] }) {
  const [results, setResults] = useState({});

  function handleResult(id, isCorrect) {
    setResults(prev => ({ ...prev, [id]: isCorrect }));
  }

  const done    = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;

  return (
    <div>
      {exercises.map((ex, i) => (
        <ExerciseShell key={ex.id} number={i + 1} exercise={ex}>
          {ex.type === "fill-in-blank" && (
            <FillInBlank exercise={ex} onResult={r => handleResult(ex.id, r)} />
          )}
          {ex.type === "multiple-choice" && (
            <MultipleChoice exercise={ex} onResult={r => handleResult(ex.id, r)} />
          )}
          {ex.type === "error-correction" && (
            <ErrorCorrection exercise={ex} onResult={r => handleResult(ex.id, r)} />
          )}
          {!["fill-in-blank", "multiple-choice", "error-correction"].includes(ex.type) && (
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              Exercise type '{ex.type}' not yet implemented.
            </p>
          )}
        </ExerciseShell>
      ))}

      <ScoreStrip done={done} total={exercises.length} correct={correct} />
    </div>
  );
}
