/**
 * Renders a structured dialogue.
 *
 * Props:
 *   lines  DialogueLine[]
 *   glossary  { expression, explanation }[]  — optional
 *
 * DialogueLine: { speaker: "A"|"B", text: string, highlight?: string[] }
 */
export default function DialogueRenderer({ lines = [], glossary = [] }) {
  if (lines.length === 0) {
    return (
      <p style={{ color: "#9ca3af", fontSize: 14, fontStyle: "italic" }}>
        Dialogue content coming soon.
      </p>
    );
  }

  return (
    <div>
      {/* Dialogue */}
      <div style={{
        border: "1px solid #e5e7eb", borderRadius: 10,
        overflow: "hidden", marginBottom: 20,
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, padding: "12px 16px",
            background: line.speaker === "A" ? "#fff" : "#f9fafb",
            borderBottom: i < lines.length - 1 ? "1px solid #f3f4f6" : "none",
            alignItems: "flex-start",
          }}>
            <span style={{
              flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
              background: line.speaker === "A" ? "#dbeafe" : "#dcfce7",
              color: line.speaker === "A" ? "#1e40af" : "#166534",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700,
            }}>
              {line.speaker}
            </span>
            <span style={{ fontSize: 15, color: "#1f2937", lineHeight: 1.65 }}>
              {line.text}
            </span>
          </div>
        ))}
      </div>

      {/* Glossary */}
      {glossary.length > 0 && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", margin: "0 0 10px" }}>
            Key expressions
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {glossary.map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "8px 12px",
                background: "#f9fafb", borderRadius: 6, fontSize: 14,
              }}>
                <span style={{ fontWeight: 700, color: "#1e40af", minWidth: 140 }}>
                  {item.expression}
                </span>
                <span style={{ color: "#374151" }}>{item.explanation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
