"use client";

import { useState, useMemo } from "react";

/**
 * Shared filterable table for all Index tabs.
 * (Vocabulary, Collocations, Phrasal Verbs, Idioms)
 *
 * Props:
 *   data       object[]     — rows
 *   columns    ColDef[]     — column definitions
 *   filterKey  string|null  — row key to filter by (null = no filter)
 *
 * ColDef: { key: string, label: string, width?: string }
 */
export default function IndexTable({ data = [], columns = [], filterKey = null }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filterOptions = useMemo(() => {
    if (!filterKey) return [];
    const values = [...new Set(data.map(r => r[filterKey]).filter(Boolean))].sort();
    return values;
  }, [data, filterKey]);

  const rows = useMemo(() => {
    let out = data;
    if (filter !== "all" && filterKey) out = out.filter(r => r[filterKey] === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(r =>
        columns.some(c => String(r[c.key] ?? "").toLowerCase().includes(q))
      );
    }
    return out;
  }, [data, filter, filterKey, search, columns]);

  if (data.length === 0) {
    return (
      <p style={{ color: "#9ca3af", fontSize: 14, fontStyle: "italic", padding: "20px 0" }}>
        Index content coming soon.
      </p>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="search"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 180, padding: "7px 12px",
            border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14,
            outline: "none", fontFamily: "inherit",
          }}
        />
        {filterOptions.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>All</FilterPill>
            {filterOptions.map(opt => (
              <FilterPill key={opt} active={filter === opt} onClick={() => setFilter(opt)}>
                {opt}
              </FilterPill>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%", borderCollapse: "collapse", fontSize: 14,
          border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden",
        }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {columns.map(col => (
                <th key={col.key} style={{
                  padding: "10px 14px", textAlign: "left", fontWeight: 700,
                  fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4,
                  color: "#374151", borderBottom: "2px solid #e5e7eb",
                  width: col.width,
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: "16px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                  No results
                </td>
              </tr>
            ) : rows.map((row, i) => (
              <tr key={i} style={{
                background: i % 2 === 0 ? "#fff" : "#fafafa",
                borderBottom: i < rows.length - 1 ? "1px solid #f3f4f6" : "none",
              }}>
                {columns.map((col, ci) => (
                  <td key={col.key} style={{
                    padding: "9px 14px", color: "#1f2937",
                    fontWeight: ci === 0 ? 600 : 400, verticalAlign: "top",
                    fontStyle: col.italic ? "italic" : "normal",
                  }}>
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
        {rows.length} of {data.length} entries
      </p>
    </div>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 12px", fontSize: 12, fontWeight: active ? 700 : 500,
        border: `1px solid ${active ? "#059669" : "#d1d5db"}`,
        borderRadius: 20, background: active ? "#ecfdf5" : "#fff",
        color: active ? "#059669" : "#374151", cursor: "pointer",
        fontFamily: "inherit", transition: "all 0.1s",
      }}
    >
      {children}
    </button>
  );
}
