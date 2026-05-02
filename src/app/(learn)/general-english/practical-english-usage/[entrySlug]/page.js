import { notFound } from "next/navigation";
import { peuEntries } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS } from "@/lib/bookUtils";
import CompletionToggle from "@/components/content/CompletionToggle";
import RelatedEntries from "@/components/peu/RelatedEntries";
import EntryNav from "@/components/peu/EntryNav";
import ThreePanelShell from "@/components/shell/ThreePanelShell";
import Sidebar from "@/components/shell/Sidebar";

export async function generateStaticParams() {
  return peuEntries.map(e => ({ entrySlug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { entrySlug } = await params;
  const entry = peuEntries.find(e => e.slug === entrySlug);
  return entry ? { title: `Entry ${entry.entryNumber}: ${entry.title} — PEU` } : {};
}

export default async function PEUEntryPage({ params }) {
  const { entrySlug } = await params;
  const entry = peuEntries.find(e => e.slug === entrySlug);
  if (!entry) notFound();

  const MDXContent = await getMdxComponent(entry.path);

  const sorted = [...peuEntries].sort((a,b) => a.entryNumber - b.entryNumber);
  const idx    = sorted.findIndex(e => e.slug === entrySlug);
  const prev   = idx > 0 ? sorted[idx - 1] : null;
  const next   = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  // Related entries: same tags
  const related = peuEntries
    .filter(e => e.slug !== entry.slug && e.tags.some(t => entry.tags.includes(t)))
    .slice(0, 5);

  // Sidebar: grammar / vocabulary parts
  const sections = ["grammar", "vocabulary"].map(part => ({
    id: part,
    label: part === "grammar" ? "Part 1 — Grammar" : "Part 2 — Vocabulary",
    units: peuEntries.filter(e => e.part === part)
      .sort((a,b) => a.entryNumber - b.entryNumber)
      .map(e => ({ id: e.slug, label: `#${e.entryNumber} ${e.title}`, href: `/general-english/practical-english-usage/${e.slug}` })),
  }));

  return (
    <ThreePanelShell
      sidebar={<Sidebar bookLabel="Practical English Usage"
        bookHref="/general-english/practical-english-usage"
        sections={sections} accentColor="#3730a3" />}
      toc={related.length > 0 ? <RelatedEntries entries={related} /> : null}
      topbar={<span style={{ fontSize: 13, color: "#6b7280" }}>PEU › Entry {entry.entryNumber}</span>}
    >
      {/* Entry header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ background: "#f0f4ff", color: "#3730a3", fontSize: 12,
            fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
            Entry {entry.entryNumber}
          </span>
          <span style={{ background: "#f3f4f6", color: "#374151", fontSize: 12,
            fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
            {entry.part === "grammar" ? "Grammar" : "Vocabulary"}
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#111827" }}>
          {entry.title}
        </h1>
      </div>

      {/* MDX content */}
      <MDXContent components={MDX_COMPONENTS} />

      <CompletionToggle unitSlug={entry.slug} type="read" />
      <EntryNav prev={prev} next={next} />
    </ThreePanelShell>
  );
}
