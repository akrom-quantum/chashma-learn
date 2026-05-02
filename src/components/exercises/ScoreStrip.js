export default function ScoreStrip({ done, total, correct }) {
  if (done === 0) return null;
  const pct = Math.round((correct / total) * 100);
  const all = done === total;

  return (
    <div style={{
      marginTop: 24,
      padding: "14px 18px",
      background: all ? (pct >= 70 ? "#ecfdf5" : "#fef2f2") : "#f9fafb",
      border: `1px solid ${all ? (pct >= 70 ? "#86efac" : "#fca5a5") : "#e5e7eb"}`,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
          {all ? `Score: ${correct} / ${total} (${pct}%)` : `${done} / ${total} answered`}
        </div>
        <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3 }}>
          <div style={{
            height: 6,
            borderRadius: 3,
            width: `${Math.round((correct / total) * 100)}%`,
            background: pct >= 70 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444",
            transition: "width 0.3s",
          }} />
        </div>
      </div>
      {all && (
        <span style={{ fontSize: 24 }}>
          {pct >= 70 ? "🎉" : pct >= 50 ? "📚" : "💪"}
        </span>
      )}
    </div>
  );
}
