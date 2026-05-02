"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Collapsible section list for the Grammar overview page.
 *
 * Props:
 *   sections  SectionShape[]  — grouped unit data
 *
 * SectionShape: {
 *   id:    string,
 *   label: string,
 *   units: { slug, title, level, estimatedMinutes, completed? }[]
 * }
 */
export default function GrammarSectionAccordion({ sections = [] }) {
  const [open, setOpen] = useState(() => {
    // First section open by default
    const s = {};
    if (sections.length) s[sections[0].id] = true;
    return s;
  });

  function toggle(id) {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {sections.map(section => {
        const isOpen = !!open[section.id];
        return (
          <div key={section.id} style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            overflow: "hidden",
            background: "#fff",
          }}>
            {/* Section header */}
            <button
              onClick={() => toggle(section.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                background: isOpen ? "#f0fdf4" : "#fff",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: isOpen ? "#059669" : "#111827",
                }}>
                  {section.label}
                </span>
                <span style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  background: "#f3f4f6",
                  padding: "1px 8px",
                  borderRadius: 20,
                }}>
                  {section.units.length} {section.units.length === 1 ? "unit" : "units"}
                </span>
              </div>
              <span style={{
                fontSize: 14,
                color: "#9ca3af",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.15s",
              }}>▾</span>
            </button>

            {/* Unit rows */}
            {isOpen && (
              <div style={{ borderTop: "1px solid #e5e7eb" }}>
                {section.units.map((unit, i) => (
                  <Link
                    key={unit.slug}
                    href={`/general-english/grammar/${unit.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 18px 10px 28px",
                      textDecoration: "none",
                      borderBottom: i < section.units.length - 1 ? "1px solid #f3f4f6" : "none",
                      background: "#fff",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                  >
                    {/* Completion dot */}
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: unit.completed ? "#10b981" : "#e5e7eb",
                      flexShrink: 0,
                    }} />

                    {/* Title */}
                    <span style={{ flex: 1, fontSize: 14, color: "#1f2937", lineHeight: 1.4 }}>
                      {unit.title}
                    </span>

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                      <span style={badge}>{unit.level}</span>
                      <span style={{ ...badge, color: "#9ca3af" }}>⏱ {unit.estimatedMinutes}m</span>
                      <span style={{ fontSize: 14, color: "#d1d5db" }}>›</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const badge = {
  fontSize: 11,
  fontWeight: 600,
  color: "#374151",
  background: "#f3f4f6",
  padding: "2px 8px",
  borderRadius: 20,
};
