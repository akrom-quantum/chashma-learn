"use client";

// src/components/shell/LeftSidebar.js
// Navigation sidebar — shows current product, current subject, current book's units.
// Data-driven from the content registry.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProduct, getSubject, getBook, listSubjectsForProduct, listUnitsForBook } from "@/content/registry";

export default function LeftSidebar({ open, product, subject, book }) {
  const pathname = usePathname();

  if (!open) return <aside />;

  const p = getProduct(product);
  const s = subject ? getSubject(product, subject) : null;
  const b = book ? getBook(product, subject, book) : null;
  const allSubjects = product ? listSubjectsForProduct(product) : [];
  const units = b ? listUnitsForBook(product, subject, book) : [];

  return (
    <aside style={{
      background: "#fff",
      borderRight: "1px solid #e5e7eb",
      padding: "24px 16px",
      overflowY: "auto",
      height: "calc(100vh - 57px)",
      position: "sticky",
      top: 57,
    }}>
      {p && (
        <>
          <div style={sectionLabel}>{p.title}</div>
          <div style={{ marginBottom: 20 }}>
            {allSubjects.map(sub => (
              <Link
                key={sub.id}
                href={`/${product}/${sub.id}`}
                style={{
                  ...navItem,
                  fontWeight: sub.id === subject ? 700 : 500,
                  color: sub.id === subject ? "#036c48" : "#374151",
                  background: sub.id === subject ? "#ecfdf5" : "transparent",
                }}
              >
                {sub.title}
              </Link>
            ))}
          </div>
        </>
      )}

      {b && units.length > 0 && (
        <>
          <div style={sectionLabel}>{b.title}</div>
          <div>
            {units.sort((a, z) => a.order - z.order).map(u => {
              const href = `/${product}/${subject}/books/${book}/${u.id}`;
              const active = pathname === href;
              return (
                <Link
                  key={u.id}
                  href={href}
                  style={{
                    ...navItem,
                    fontWeight: active ? 700 : 500,
                    color: active ? "#036c48" : "#374151",
                    background: active ? "#ecfdf5" : "transparent",
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontSize: 11, color: "#9ca3af", marginRight: 6 }}>
                    {String(u.order).padStart(2, "0")}
                  </span>
                  {u.meta?.title || u.id}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </aside>
  );
}

const sectionLabel = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  color: "#9ca3af",
  letterSpacing: 0.5,
  padding: "0 12px",
  marginBottom: 8,
};

const navItem = {
  display: "block",
  padding: "8px 12px",
  borderRadius: 6,
  textDecoration: "none",
  fontSize: 14,
  marginBottom: 2,
  transition: "background 0.1s",
};
