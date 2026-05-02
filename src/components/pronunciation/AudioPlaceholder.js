export default function AudioPlaceholder({ description }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "#f9fafb", border: "1px dashed #d1d5db",
      borderRadius: 8, padding: "12px 16px", margin: "12px 0",
    }}>
      <span style={{ fontSize: 22, flexShrink: 0 }}>🔊</span>
      <div>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>
          Audio: {description || "example pronunciation"}
        </span>
        <span style={{
          display: "inline-block", marginLeft: 10, fontSize: 11,
          background: "#e5e7eb", color: "#6b7280",
          padding: "1px 8px", borderRadius: 20,
        }}>
          Phase 2
        </span>
      </div>
    </div>
  );
}
