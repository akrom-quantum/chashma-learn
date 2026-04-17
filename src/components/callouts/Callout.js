// src/components/callouts/Callout.js
// Renders Obsidian-style callouts. Invoked from MDX via the remarkObsidianCallouts
// plugin: > [!tip] Title\n> body  →  <Callout type="tip" title="Title">body</Callout>

const STYLES = {
  tip:      { border: "#10b981", bg: "#ecfdf5", icon: "💡", fg: "#065f46" },
  warning:  { border: "#f59e0b", bg: "#fffbeb", icon: "⚠",  fg: "#92400e" },
  info:     { border: "#3b82f6", bg: "#eff6ff", icon: "ℹ",  fg: "#1e40af" },
  example:  { border: "#8b5cf6", bg: "#f5f3ff", icon: "◈",  fg: "#5b21b6" },
  quote:    { border: "#6b7280", bg: "#f9fafb", icon: "❝",  fg: "#374151" },
  abstract: { border: "#0891b2", bg: "#ecfeff", icon: "✦",  fg: "#155e75" },
  success:  { border: "#10b981", bg: "#d1fae5", icon: "✓",  fg: "#065f46" },
  failure:  { border: "#ef4444", bg: "#fef2f2", icon: "✗",  fg: "#991b1b" },
  danger:   { border: "#dc2626", bg: "#fee2e2", icon: "⚡", fg: "#7f1d1d" },
  note:     { border: "#6366f1", bg: "#eef2ff", icon: "✎",  fg: "#3730a3" },
};

export default function Callout({ type = "note", title, children }) {
  const s = STYLES[type] || STYLES.note;
  return (
    <div style={{
      borderLeft: `4px solid ${s.border}`,
      background: s.bg,
      padding: "14px 18px",
      borderRadius: "4px 8px 8px 4px",
      margin: "16px 0",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: title || children ? 6 : 0,
        color: s.fg,
        fontWeight: 700,
        fontSize: 14,
        textTransform: "capitalize",
      }}>
        <span style={{ fontSize: 16 }}>{s.icon}</span>
        <span>{title || type}</span>
      </div>
      <div style={{ color: "#1f2937", fontSize: 15, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}
