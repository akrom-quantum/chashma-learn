// src/app/[product]/[subject]/books/[book]/page.js
// Book contents — list of units as cards.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook, listUnitsForBook } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function BookPage({ params }) {
  const { product, subject, book } = await params;
  const b = getBook(product, subject, book);
  if (!b) notFound();

  const units = listUnitsForBook(product, subject, book).sort((a, z) => a.order - z.order);

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        <Link href={`/${product}`} style={{ color: "#036c48", textDecoration: "none" }}>{product}</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <Link href={`/${product}/${subject}`} style={{ color: "#036c48", textDecoration: "none" }}>{subject}</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <span style={{ color: "#111827", fontWeight: 600 }}>{b.title}</span>
      </nav>

      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>{b.title}</h1>
      {b.description && <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 8 }}>{b.description}</p>}

      {b.source?.length > 0 && (
        <details style={{ marginBottom: 32, fontSize: 13, color: "#6b7280" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>Source books</summary>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            {b.source.map((src, i) => <li key={i} style={{ marginBottom: 4 }}>{src}</li>)}
          </ul>
        </details>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
        {units.map(u => {
          const href = `/${product}/${subject}/books/${book}/${u.id}`;
          return (
            <Link key={u.id} href={href} style={{
              display: "block", padding: 20,
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 10, textDecoration: "none", color: "inherit",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: "#036c48",
                  background: "#ecfdf5", padding: "2px 8px", borderRadius: 4,
                }}>
                  Unit {u.order}
                </span>
                {u.meta?.level && (
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{u.meta.level}</span>
                )}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: "#111827" }}>
                {u.meta?.title || u.id}
              </h3>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {u.meta?.time && <>⏱ {u.meta.time}</>}
                {u.meta?.questions && <> · {u.meta.questions} questions</>}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
