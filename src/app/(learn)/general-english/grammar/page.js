import { grammarUnits } from "@/velite";
import GrammarSectionAccordion from "@/components/grammar/GrammarSectionAccordion";

export const metadata = {
  title: "Unified Grammar — Chashma Learn",
  description:
    "49 units from A2 to C1 — Oxford English Grammar Course, all three levels in one sequence.",
};

// Section display order and labels
const SECTION_ORDER = [
  ["section-01-be-and-have",            "Section 1 — BE and HAVE"],
  ["section-02-present-tenses",         "Section 2 — Present Tenses"],
  ["section-03-future",                 "Section 3 — Future"],
  ["section-04-past-tenses",            "Section 4 — Past Tenses"],
  ["section-05-perfect-tenses",         "Section 5 — Perfect Tenses"],
  ["section-06-modal-verbs",            "Section 6 — Modal Verbs"],
  ["section-07-passives",               "Section 7 — Passives"],
  ["section-08-questions-negatives",    "Section 8 — Questions and Negatives"],
  ["section-09-infinitives-ing",        "Section 9 — Infinitives and -ING"],
  ["section-10-special-verb-structures","Section 10 — Special Verb Structures"],
  ["section-11-articles",               "Section 11 — Articles"],
  ["section-12-determiners",            "Section 12 — Determiners"],
  ["section-13-pronouns-possessives",   "Section 13 — Pronouns and Possessives"],
  ["section-14-nouns",                  "Section 14 — Nouns"],
  ["section-15-adjectives-adverbs",     "Section 15 — Adjectives and Adverbs"],
  ["section-16-comparison",             "Section 16 — Comparison"],
  ["section-17-conjunctions",           "Section 17 — Conjunctions"],
  ["section-18-conditionals",           "Section 18 — Conditionals"],
  ["section-19-relative-clauses",       "Section 19 — Relative Clauses"],
  ["section-20-indirect-speech",        "Section 20 — Indirect Speech"],
  ["section-21-prepositions",           "Section 21 — Prepositions"],
  ["section-22-spoken-grammar",         "Section 22 — Spoken Grammar"],
];

function buildSections(units) {
  const bySection = {};
  for (const u of units) {
    if (!bySection[u.section]) bySection[u.section] = [];
    bySection[u.section].push(u);
  }

  return SECTION_ORDER
    .filter(([id]) => bySection[id])
    .map(([id, label]) => ({
      id,
      label,
      units: bySection[id]
        .sort((a, b) => a.unit - b.unit)
        .map(u => ({
          slug: u.slug,
          title: u.title,
          level: u.level,
          estimatedMinutes: u.estimatedMinutes,
          completed: false, // Phase 5: replace with Supabase progress
        })),
    }));
}

export default function GrammarOverviewPage() {
  const sections = buildSections(grammarUnits);
  const totalMinutes = grammarUnits.reduce((s, u) => s + u.estimatedMinutes, 0);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <nav style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
          <a href="/general-english" style={{ color: "#9ca3af", textDecoration: "none" }}>
            General English
          </a>
          {" › "}
          <span style={{ color: "#374151" }}>Grammar</span>
        </nav>

        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", color: "#111827" }}>
          Unified Grammar
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.6 }}>
          Merged Oxford English Grammar Course — Basic, Intermediate, Advanced. One continuous
          sequence from A2 to C1.
        </p>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            `${grammarUnits.length} units`,
            "22 sections",
            "A2 → C1",
            `~${Math.round(totalMinutes / 60)}h total`,
          ].map(stat => (
            <span key={stat} style={{
              fontSize: 13,
              fontWeight: 600,
              background: "#f0fdf4",
              color: "#166534",
              border: "1px solid #bbf7d0",
              padding: "4px 12px",
              borderRadius: 20,
            }}>
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* Section accordion */}
      <GrammarSectionAccordion sections={sections} />
    </div>
  );
}
