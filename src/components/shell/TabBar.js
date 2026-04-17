"use client";

// src/components/shell/TabBar.js
// Tab switcher for Book-Unit (Topic | Practice) and Topic-Page (Topic | Practice | Vocab-Index).

export default function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      display: "flex",
      gap: 4,
      borderBottom: "1px solid #e5e7eb",
      background: "#fff",
      borderRadius: "8px 8px 0 0",
      padding: "4px 4px 0",
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              background: "transparent",
              border: "none",
              padding: "12px 20px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#036c48" : "#6b7280",
              borderBottom: `3px solid ${isActive ? "#036c48" : "transparent"}`,
              marginBottom: -1,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
              transition: "all 0.1s",
            }}
          >
            {tab.label}
            {tab.completed && (
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
