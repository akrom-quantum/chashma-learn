// src/app/[product]/[subject]/tests/page.js
// Tests directory — shows all tests with filters, bookmarks, and status badges.

import Link from "next/link";
import { listTestsForSubject, getSubject } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function TestsPage({ params }) {
  const { product, subject } = await params;
  const s = getSubject(product, subject);
  const tests = listTestsForSubject(product, subject);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        <Link href={`/${product}/${subject}`} style={{ color: "#036c48", textDecoration: "none" }}>← {s?.title || subject}</Link>
      </nav>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Practice Tests</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Timed, scored, reviewable. Your attempts are saved automatically.
      </p>

      {tests.length === 0 ? (
        <div style={{ padding: 40, background: "#f9fafb", borderRadius: 10, textAlign: "center", color: "#9ca3af" }}>
          No practice tests yet. The test engine is ready — tests land in Phase 1.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
          {tests.map((t, i) => (
            <Link key={t.id} href={`/${product}/${subject}/tests/${t.id}`} style={testCard}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>#{String(i + 1).padStart(3, "0")}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: "2px 8px", borderRadius: 4,
                  background: t.status === "premium" ? "#fef3c7" : "#ecfdf5",
                  color: t.status === "premium" ? "#92400e" : "#065f46",
                }}>
                  {t.status.toUpperCase()}
                </span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>{t.title}</h3>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {t.passages.length} passages · {t.passages.reduce((n, p) => n + p.questions.length, 0)} questions
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

const testCard = {
  display: "block", padding: 20,
  background: "#fff", border: "1px solid #e5e7eb",
  borderRadius: 10, textDecoration: "none", color: "inherit",
};
