"use client";

import Link from "next/link";

export default function BookCard({
  icon, title, description, unitCount, levelRange, href, accentColor = "#059669",
}) {
  return (
    <Link href={href} style={{
      display: "flex", flexDirection: "column", gap: 10,
      padding: "18px 20px", border: "1px solid #e5e7eb",
      borderRadius: 12, textDecoration: "none", background: "#fff",
      transition: "box-shadow 0.15s, border-color 0.15s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = accentColor + "60";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>Explore →</span>
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
          {description}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
        <span style={{
          fontSize: 11, fontWeight: 600,
          background: accentColor + "14", color: accentColor,
          padding: "2px 8px", borderRadius: 20,
        }}>
          {unitCount} units
        </span>
        <span style={{
          fontSize: 11, fontWeight: 600,
          background: "#f3f4f6", color: "#374151",
          padding: "2px 8px", borderRadius: 20,
        }}>
          {levelRange}
        </span>
      </div>
    </Link>
  );
}
