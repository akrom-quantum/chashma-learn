// src/app/[product]/[subject]/guides/[guide]/page.js
// Guide-Page (Shape 3) — scaffold.

import Link from "next/link";
import { getGuide } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function GuideDetail({ params }) {
  const { product, subject, guide } = await params;
  const g = getGuide(product, subject, guide);

  if (!g) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
        <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
          <Link href={`/${product}/${subject}/guides`} style={{ color: "#036c48", textDecoration: "none" }}>← Guides</Link>
        </nav>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Guide not yet authored</h1>
        <p style={{ color: "#6b7280" }}>
          <code>{product}/{subject}/guides/{guide}</code> is not registered.
        </p>
      </main>
    );
  }

  return <div>Guide: {g.meta?.title}</div>;
}
