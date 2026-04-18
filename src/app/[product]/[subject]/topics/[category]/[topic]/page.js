// src/app/[product]/[subject]/topics/[category]/[topic]/page.js
// Topic-Page (Shape 2). Scaffold — full rendering lands with Phase 1 content.

import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopic, getSubject, getProduct } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function TopicPage({ params }) {
  const { product, subject, category, topic } = await params;
  const t = getTopic(product, subject, category, topic);

  if (!t) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
        <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
          <Link href={`/${product}/${subject}/topics`} style={{ color: "#036c48", textDecoration: "none" }}>
            ← Topics
          </Link>
        </nav>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Topic not yet authored</h1>
        <p style={{ color: "#6b7280" }}>
          <code>{product}/{subject}/{category}/{topic}</code> is not registered. Author the MDX file and register it in the content registry.
        </p>
      </main>
    );
  }

  // Real rendering: same PageShell pattern as UnitClient once topics land
  return <div>Topic: {t.meta?.title}</div>;
}
