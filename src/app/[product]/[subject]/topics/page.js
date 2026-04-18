// src/app/[product]/[subject]/topics/page.js
// Topics directory — lists all topic categories for the subject.

import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubject } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function TopicsPage({ params }) {
  const { product, subject } = await params;
  const s = getSubject(product, subject);
  if (!s) notFound();

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        <Link href={`/${product}`} style={{ color: "#036c48", textDecoration: "none" }}>{product}</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <Link href={`/${product}/${subject}`} style={{ color: "#036c48", textDecoration: "none" }}>{s.title}</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <span style={{ color: "#111827", fontWeight: 600 }}>Topics</span>
      </nav>

      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Topics</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Topic content for {s.title} will appear here once authored (Phase 1+).
      </p>
      <div style={{ padding: 40, background: "#f9fafb", borderRadius: 10, textAlign: "center", color: "#9ca3af" }}>
        No topics yet.
      </div>
    </main>
  );
}
