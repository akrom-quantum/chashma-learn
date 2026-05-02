const VARIANTS = {
  note:      { border: "#6366f1", bg: "#f5f3ff", icon: "✎",  fg: "#4338ca", label: "Note" },
  tip:       { border: "#10b981", bg: "#f0fdf4", icon: "💡", fg: "#047857", label: "Tip" },
  warning:   { border: "#f59e0b", bg: "#fffbeb", icon: "⚠",  fg: "#b45309", label: "Warning" },
  important: { border: "#ef4444", bg: "#fff1f2", icon: "⚡", fg: "#be123c", label: "Important" },
  example:   { border: "#8b5cf6", bg: "#faf5ff", icon: "◈",  fg: "#7c3aed", label: "Example" },
  abstract:  { border: "#0891b2", bg: "#f0f9ff", icon: "✦",  fg: "#0e7490", label: "Overview" },
  quote:     { border: "#cbd5e1", bg: "transparent", icon: "❝", fg: "#64748b", label: "Quote" },
  info:      { border: "#3b82f6", bg: "#eff6ff", icon: "ℹ",  fg: "#1d4ed8", label: "Info" },
  success:   { border: "#10b981", bg: "#f0fdf4", icon: "✓",  fg: "#047857", label: "Correct" },
  failure:   { border: "#f87171", bg: "#fff1f2", icon: "✗",  fg: "#be123c", label: "Wrong" },
  danger:    { border: "#dc2626", bg: "#fff1f2", icon: "🚨", fg: "#991b1b", label: "Danger" },
};

export function Callout({ type = "note", title, children }) {
  const v = VARIANTS[type] ?? VARIANTS.note;

  if (type === "quote") {
    return (
      <div style={{
        borderLeft: "3px solid #e2e8f0",
        padding: "6px 0 6px 20px",
        margin: "22px 0",
        color: "#64748b",
        fontStyle: "italic",
        fontSize: 16,
        lineHeight: 1.75,
      }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{
      borderLeft: `3px solid ${v.border}`,
      background: v.bg,
      padding: "16px 20px",
      borderRadius: "2px 10px 10px 2px",
      margin: "22px 0",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        marginBottom: 9,
        color: v.fg,
        fontWeight: 700,
        fontSize: 11.5,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
      }}>
        <span style={{ fontSize: 13 }}>{v.icon}</span>
        <span>{title ?? v.label}</span>
      </div>
      <div style={{ color: "#1e293b", fontSize: 15.5, lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

export default Callout;
