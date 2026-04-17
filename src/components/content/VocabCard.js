// src/components/content/VocabCard.js
// Inline vocabulary card used inside MDX content: <VocabCard word="..." pos="..." def="..." />

export default function VocabCard({ word, pos, def, example, pronunciation, collocations }) {
  return (
    <span style={{
      display: "inline-block",
      background: "#f0fdf4",
      border: "1px solid #a7f3d0",
      borderRadius: 8,
      padding: "12px 16px",
      margin: "8px 4px 8px 0",
      fontSize: 14,
      lineHeight: 1.5,
      maxWidth: 360,
      verticalAlign: "top",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <strong style={{ color: "#065f46", fontSize: 15 }}>{word}</strong>
        {pos && <em style={{ color: "#059669", fontSize: 12 }}>{pos}</em>}
        {pronunciation && (
          <span style={{ color: "#6b7280", fontSize: 12, fontFamily: "monospace" }}>
            /{pronunciation}/
          </span>
        )}
      </div>
      {def && <div style={{ color: "#1f2937", marginBottom: 4 }}>{def}</div>}
      {example && (
        <div style={{ color: "#4b5563", fontStyle: "italic", fontSize: 13 }}>
          “{example}”
        </div>
      )}
      {collocations && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280" }}>
          <strong>Collocations:</strong> {collocations}
        </div>
      )}
    </span>
  );
}
