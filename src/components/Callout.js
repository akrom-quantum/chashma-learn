const STYLES = {
  abstract: { bg: "#f0f9ff", border: "#bae6fd", icon: "📋", label: "Overview",  color: "#0369a1" },
  quote:    { bg: "#fafafa", border: "#e5e7eb", icon: "❝",  label: "Quote",     color: "#6b7280" },
  tip:      { bg: "#f0fdf4", border: "#86efac", icon: "💡", label: "Tip",       color: "#16a34a" },
  warning:  { bg: "#fffbeb", border: "#fde68a", icon: "⚠️", label: "Warning",   color: "#d97706" },
  info:     { bg: "#eff6ff", border: "#bfdbfe", icon: "ℹ️", label: "Info",      color: "#2563eb" },
  example:  { bg: "#f8fafc", border: "#cbd5e1", icon: "📝", label: "Example",   color: "#475569" },
  failure:  { bg: "#fff1f2", border: "#fecdd3", icon: "✗",  label: "Wrong",     color: "#e11d48" },
  success:  { bg: "#f0fdf4", border: "#86efac", icon: "✓",  label: "Correct",   color: "#16a34a" },
  danger:   { bg: "#fff1f2", border: "#fecdd3", icon: "🚨", label: "Danger",    color: "#e11d48" },
  note:     { bg: "#fafafa", border: "#e5e7eb", icon: "📌", label: "Note",      color: "#6b7280" },
};

export default function Callout({ type = "note", title, children }) {
  const s = STYLES[type] || STYLES.note;
  return (
    <div style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, borderLeft: `4px solid ${s.border}`, borderRadius: "8px", padding: "16px 20px", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: children ? "10px" : 0 }}>
        <span style={{ fontSize: "15px" }}>{s.icon}</span>
        <span style={{ fontSize: "13px", fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.4px" }}>{title || s.label}</span>
      </div>
      {children && <div style={{ fontSize: "14px", lineHeight: 1.75, color: "#374151" }}>{children}</div>}
    </div>
  );
}
