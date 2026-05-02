"use client";

import { useEffect, useState } from "react";

export default function RightTOC({ accentColor = "#059669", contentId = "shell-content" }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;
    const els = container.querySelectorAll("h2, h3");
    setHeadings(
      Array.from(els)
        .filter(el => el.id)
        .map(el => ({
          id: el.id,
          text: el.textContent.replace(/^#+\s*/, ""),
          level: el.tagName === "H2" ? 2 : 3,
        }))
    );
  }, [contentId]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-56px 0px -55% 0px", threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div>
      <p style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        color: "#9ca3af",
        margin: "0 0 10px",
      }}>
        On this page
      </p>
      <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {headings.map(({ id, text, level }) => {
          const active = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                display: "block",
                padding: "3px 0 3px 10px",
                marginLeft: level === 3 ? 10 : 0,
                fontSize: 12,
                lineHeight: 1.5,
                color: active ? accentColor : "#6b7280",
                fontWeight: active ? 600 : 400,
                textDecoration: "none",
                borderLeft: `2px solid ${active ? accentColor : "transparent"}`,
                transition: "color 0.1s, border-color 0.1s",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={text}
            >
              {text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
