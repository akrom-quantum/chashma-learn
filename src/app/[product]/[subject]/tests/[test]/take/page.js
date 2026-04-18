// src/app/[product]/[subject]/tests/[test]/take/page.js
// Test-taking interface. Loads test, delegates to TestRunner.

import { notFound } from "next/navigation";
import { getTest } from "@/content/registry";
import TestRunner from "@/components/content/TestRunner";

export const dynamic = "force-dynamic";

export default async function TestTakePage({ params }) {
  const { product, subject, test } = await params;
  const t = getTest(product, subject, test);
  if (!t) notFound();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px", fontFamily: "Manrope, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>{t.title}</h1>
      <TestRunner test={t} mode="full" />
    </main>
  );
}
