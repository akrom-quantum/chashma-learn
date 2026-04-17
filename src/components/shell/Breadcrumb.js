"use client";

// src/components/shell/Breadcrumb.js
import Link from "next/link";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "#6b7280" }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: "0 8px", color: "#d1d5db" }}>›</span>}
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: i === items.length - 1 ? "#111827" : "#6b7280",
                textDecoration: "none",
                fontWeight: i === items.length - 1 ? 600 : 400,
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "#111827", fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
