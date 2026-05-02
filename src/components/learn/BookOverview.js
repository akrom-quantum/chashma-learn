import GrammarSectionAccordion from "@/components/grammar/GrammarSectionAccordion";

/**
 * Generic overview page for all General English books that use the
 * section-accordion layout (Vocabulary, Pronunciation, Collocations,
 * Phrasal Verbs, Idioms, Writing).
 */
export default function BookOverview({
  title,
  description,
  stats = [],
  sections = [],
  accentColor = "#059669",
  breadcrumb = "General English",
  children,            // optional: extra content above accordion (e.g. IPA reference)
}) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <nav style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
        <a href="/general-english" style={{ color: "#9ca3af", textDecoration: "none" }}>
          {breadcrumb}
        </a>
        {" › "}<span style={{ color: "#374151" }}>{title}</span>
      </nav>

      <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", color: "#111827" }}>
        {title}
      </h1>
      <p style={{ fontSize: 16, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.6 }}>
        {description}
      </p>

      {stats.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {stats.map(s => (
            <span key={s} style={{
              fontSize: 13, fontWeight: 600,
              background: accentColor + "14",
              color: accentColor,
              border: `1px solid ${accentColor}40`,
              padding: "4px 12px", borderRadius: 20,
            }}>
              {s}
            </span>
          ))}
        </div>
      )}

      {children}

      <GrammarSectionAccordion sections={sections} />
    </div>
  );
}
