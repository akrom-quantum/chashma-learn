"use client";

import { useState, useEffect, useRef } from "react";

export default function WritingPrompt({ prompt }) {
  const key = `writing-draft:${prompt?.unitSlug}`;
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const draft = localStorage.getItem(key);
    if (draft) setText(draft);
  }, [key]);

  function handleChange(e) {
    setText(e.target.value);
    setSaved(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      localStorage.setItem(key, e.target.value);
      setSaved(true);
    }, 800);
  }

  if (!prompt) return null;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const inRange = words >= prompt.wordCountMin && words <= prompt.wordCountMax;
  const over    = words > prompt.wordCountMax;

  return (
    <div>
      {/* Prompt box */}
      <div style={{
        background: "#fffbeb", border: "1px solid #fde68a",
        borderRadius: 8, padding: "16px 18px", marginBottom: 20,
      }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
          <Badge label="Words" value={`${prompt.wordCountMin}–${prompt.wordCountMax}`} />
          <Badge label="Time" value={`${prompt.timeLimit} min`} />
        </div>
        <p style={{ fontSize: 15, color: "#1f2937", margin: 0, lineHeight: 1.7 }}>
          {prompt.prompt}
        </p>
      </div>

      {/* Criteria */}
      {prompt.criteria?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", margin: "0 0 8px" }}>
            Assessment criteria:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
            {prompt.criteria.map((c, i) => (
              <li key={i} style={{ fontSize: 14, color: "#374151" }}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={text}
        onChange={handleChange}
        rows={12}
        placeholder="Write your response here…"
        style={{
          width: "100%", boxSizing: "border-box",
          border: "2px solid #d1d5db", borderRadius: 8,
          padding: "12px 14px", fontSize: 15, fontFamily: "inherit",
          lineHeight: 1.7, resize: "vertical", outline: "none",
          borderColor: over ? "#ef4444" : inRange ? "#10b981" : "#d1d5db",
          transition: "border-color 0.15s",
        }}
      />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontSize: 13, fontWeight: 700,
            color: over ? "#ef4444" : inRange ? "#059669" : "#6b7280",
          }}>
            {words} words
          </span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            target: {prompt.wordCountMin}–{prompt.wordCountMax}
          </span>
          {saved && <span style={{ fontSize: 12, color: "#9ca3af" }}>Draft saved</span>}
        </div>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>
          Phase 3: AI feedback coming soon
        </span>
      </div>
    </div>
  );
}

function Badge({ label, value }) {
  return (
    <span style={{ fontSize: 12 }}>
      <span style={{ color: "#92400e", fontWeight: 700 }}>{label}: </span>
      <span style={{ color: "#1f2937" }}>{value}</span>
    </span>
  );
}
