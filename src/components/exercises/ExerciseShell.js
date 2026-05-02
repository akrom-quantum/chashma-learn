const TYPE_LABELS = {
  "fill-in-blank":   "Fill in the blank",
  "multiple-choice": "Multiple choice",
  "error-correction": "Error correction",
  "matching":        "Matching",
};

export default function ExerciseShell({ number, exercise, children }) {
  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: "20px 22px",
      background: "#fff",
      marginBottom: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{
          background: "#f3f4f6",
          color: "#374151",
          fontWeight: 700,
          fontSize: 12,
          padding: "2px 10px",
          borderRadius: 20,
        }}>
          {number}
        </span>
        <span style={{ fontSize: 12, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.4 }}>
          {TYPE_LABELS[exercise.type] ?? exercise.type}
        </span>
      </div>

      {exercise.instruction && (
        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 12px", fontStyle: "italic" }}>
          {exercise.instruction}
        </p>
      )}

      {children}
    </div>
  );
}
