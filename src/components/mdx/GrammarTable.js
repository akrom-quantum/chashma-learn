export function GrammarTable({ headers = [], rows = [], caption, highlight = [] }) {
  return (
    <div style={{ overflowX: "auto", margin: "24px 0" }}>
      {caption && (
        <p style={{ fontSize: 12.5, color: "#6b7280", margin: "0 0 8px", fontStyle: "italic" }}>
          {caption}
        </p>
      )}
      <div style={{
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.06)",
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14.5,
          background: "#fff",
        }}>
          <thead>
            <tr style={{ background: "#1e293b" }}>
              {headers.map((h, i) => (
                <th key={i} style={{
                  padding: "11px 16px",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 11.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: h ? "#94a3b8" : "transparent",
                  whiteSpace: "nowrap",
                  borderBottom: "none",
                }}>
                  {h || "—"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const isHighlighted = highlight.includes(ri);
              const isEven = ri % 2 === 0;
              return (
                <tr key={ri} style={{
                  background: isHighlighted
                    ? "#f0fdf4"
                    : isEven ? "#fff" : "#f8fafc",
                  borderBottom: ri < rows.length - 1 ? "1px solid #f1f5f9" : "none",
                }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "11px 16px",
                      color: ci === 0 ? "#0f172a" : "#374151",
                      fontWeight: ci === 0 ? 500 : 400,
                      lineHeight: 1.65,
                      fontSize: 14.5,
                      verticalAlign: "top",
                      borderLeft: ci === 0 && isHighlighted
                        ? "3px solid #10b981"
                        : ci === 0 ? "3px solid transparent" : "none",
                    }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GrammarTable;
