"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ bookLabel, bookHref = "#", progress, sections = [], accentColor = "#059669" }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState({});

  function toggle(id) {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div style={{ padding: "16px 0 24px" }}>

      {/* Book label */}
      <div style={{ padding: "0 16px 12px" }}>
        <Link href={bookHref} style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#9ca3af",
          textDecoration: "none",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          display: "block",
        }}>
          {bookLabel}
        </Link>
        {progress && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
              <span>Progress</span>
              <span>{progress.done} / {progress.total}</span>
            </div>
            <div style={{ height: 3, background: "#f3f4f6", borderRadius: 2 }}>
              <div style={{
                height: 3, background: accentColor, borderRadius: 2,
                width: `${Math.round((progress.done / progress.total) * 100)}%`,
                transition: "width 0.3s",
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Sections */}
      {sections.map(section => {
        const isCollapsed = collapsed[section.id];
        return (
          <div key={section.id}>
            <button
              onClick={() => toggle(section.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {section.label}
              </span>
              <span style={{
                fontSize: 10, color: "#d1d5db",
                transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                transition: "transform 0.15s",
                display: "inline-block",
              }}>▾</span>
            </button>

            {!isCollapsed && (
              <div style={{ marginBottom: 4 }}>
                {section.units.map(unit => {
                  const active = pathname === unit.href;
                  return (
                    <Link
                      key={unit.id}
                      href={unit.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 16px 6px 20px",
                        fontSize: 13,
                        color: active ? accentColor : "#4b5563",
                        fontWeight: active ? 600 : 400,
                        textDecoration: "none",
                        background: active ? `${accentColor}0d` : "transparent",
                        borderLeft: `2px solid ${active ? accentColor : "transparent"}`,
                        lineHeight: 1.4,
                        transition: "background 0.1s",
                      }}
                    >
                      {unit.completed && (
                        <span style={{ fontSize: 10, color: accentColor, flexShrink: 0 }}>✓</span>
                      )}
                      <span style={{ flex: 1 }}>{unit.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
