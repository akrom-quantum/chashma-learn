const LEVELS = [
  { level: "Beginner",         cefr: "A1–A2", books: "Oxford Word Skills (Elementary)" },
  { level: "Pre-Intermediate", cefr: "A2–B1", books: "Grammar, Word Skills (Int.), Pronunciation" },
  { level: "Intermediate",     cefr: "B1",    books: "Grammar, Vocabulary, Collocations, Phrasal Verbs" },
  { level: "Upper-Int.",       cefr: "B1–B2", books: "Collocations, Phrasal Verbs, Idioms, Writing" },
  { level: "Advanced",         cefr: "C1+",   books: "Idioms, Writing (Capstone), PEU reference" },
];

export default function LevelGuide() {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 16px", color: "#111827" }}>
        Find your level
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%", borderCollapse: "collapse", fontSize: 14,
          border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden",
        }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Level", "CEFR", "Recommended books"].map(h => (
                <th key={h} style={{
                  padding: "10px 16px", textAlign: "left",
                  fontWeight: 700, fontSize: 12, textTransform: "uppercase",
                  letterSpacing: 0.4, color: "#374151", borderBottom: "2px solid #e5e7eb",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((row, i) => (
              <tr key={row.level} style={{
                background: i % 2 === 0 ? "#fff" : "#fafafa",
                borderBottom: i < LEVELS.length - 1 ? "1px solid #f3f4f6" : "none",
              }}>
                <td style={{ padding: "10px 16px", fontWeight: 600, color: "#111827" }}>{row.level}</td>
                <td style={{ padding: "10px 16px" }}>
                  <span style={{
                    background: "#ecfdf5", color: "#059669",
                    fontSize: 12, fontWeight: 700,
                    padding: "2px 8px", borderRadius: 20,
                  }}>
                    {row.cefr}
                  </span>
                </td>
                <td style={{ padding: "10px 16px", color: "#374151" }}>{row.books}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
