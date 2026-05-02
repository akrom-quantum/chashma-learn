"use client";

import { useState } from "react";

export default function UnitTabs({ tabs = [], panels = {}, defaultTab, accentColor = "#059669" }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #e5e7eb",
        marginBottom: 28,
        gap: 0,
      }}>
        {tabs.map(tab => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                padding: "10px 18px",
                background: "transparent",
                border: "none",
                borderBottom: isActive ? `2px solid ${accentColor}` : "2px solid transparent",
                marginBottom: -1,
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? accentColor : "#9ca3af",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.1s, border-color 0.1s",
                letterSpacing: "0.01em",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      {tabs.map(tab => (
        <div key={tab.id} style={{ display: tab.id === active ? "block" : "none" }}>
          {panels[tab.id]}
        </div>
      ))}
    </div>
  );
}
