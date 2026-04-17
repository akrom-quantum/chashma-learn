"use client";

// src/components/shell/RightSidebar.js
// Sticky TOC that highlights the active heading via IntersectionObserver.

import { useEffect, useState } from "react";

export default function RightSidebar({ open, items = [] }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!open || items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [open, items]);

  if (!open) return <aside />;

  return (
    <aside style={{
      borderLeft: "1px solid #e5e7eb",
      padding: "24px 16px",
      position: "sticky",
      top: 57,
      height: "calc(100vh - 57px)",
      overflowY: "auto",
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        color: "#9ca3af",
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>On this page</div>
      <nav>
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              display: "block",
              padding: "4px 0 4px 12px",
              marginLeft: (item.level - 1) * 12,
              fontSize: 13,
              color: active === item.id ? "#036c48" : "#6b7280",
              textDecoration: "none",
              borderLeft: `2px solid ${active === item.id ? "#036c48" : "transparent"}`,
              fontWeight: active === item.id ? 600 : 400,
              transition: "all 0.1s",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
