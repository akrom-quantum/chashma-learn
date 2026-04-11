export default function Table({ headers = [], rows = [] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "24px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "480px" }}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i} style={{ padding: "10px 16px", backgroundColor: "#f9fafb", fontWeight: 700, color: "#374151", textAlign: "left", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa" }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "10px 16px", color: "#374151", verticalAlign: "top" }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
