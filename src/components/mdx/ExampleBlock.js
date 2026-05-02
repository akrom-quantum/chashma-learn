export function ExampleBlock({ examples = [], title }) {
  if (examples.length === 0) return null;

  return (
    <div style={{ margin: "22px 0" }}>
      {title && (
        <p style={{
          fontSize: 11.5,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "#94a3b8",
          margin: "0 0 10px",
        }}>
          {title}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {examples.map((ex, i) => (
          <div key={i} style={{
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            background: ex.wrong ? "#fff1f2" : "#f8fafc",
            border: `1px solid ${ex.wrong ? "#fecaca" : "#e2e8f0"}`,
            borderRadius: 8,
            padding: "11px 16px",
          }}>
            <span style={{
              flexShrink: 0,
              fontSize: 13,
              fontWeight: 700,
              color: ex.wrong ? "#ef4444" : "#10b981",
              marginTop: 3,
              minWidth: 14,
            }}>
              {ex.wrong ? "✗" : "›"}
            </span>
            <div style={{ flex: 1 }}>
              <span style={{
                fontSize: 15.5,
                color: ex.wrong ? "#be123c" : "#1e293b",
                fontStyle: "italic",
                lineHeight: 1.7,
                textDecoration: ex.wrong ? "line-through" : "none",
                textDecorationColor: "#fca5a5",
              }}>
                {ex.sentence}
              </span>
              {ex.note && (
                <span style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 13.5,
                  color: "#64748b",
                  fontStyle: "normal",
                  lineHeight: 1.55,
                }}>
                  {ex.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExampleBlock;
