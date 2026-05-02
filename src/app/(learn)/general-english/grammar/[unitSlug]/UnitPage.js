"use client";

import ThreePanelShell from "@/components/shell/ThreePanelShell";
import Sidebar from "@/components/shell/Sidebar";
import RightTOC from "@/components/shell/RightTOC";
import UnitTabs from "@/components/content/UnitTabs";
import CompletionToggle from "@/components/content/CompletionToggle";
import ExerciseRenderer from "@/components/exercises/ExerciseRenderer";
import AuthGate from "@/components/learn/AuthGate";

export default function UnitPage({ unit, topicContent, exercises, allUnits }) {
  const sections = buildSections(allUnits);

  const panels = {
    topic: (
      <div>
        {topicContent}
        <CompletionToggle unitSlug={unit.slug} type="read" />
      </div>
    ),
    practice: (
      <AuthGate>
        <div>
          {exercises.length > 0
            ? <ExerciseRenderer exercises={exercises} />
            : <p style={{ color: "#9ca3af", fontSize: 15, fontStyle: "italic" }}>No exercises for this unit yet.</p>
          }
          <CompletionToggle unitSlug={unit.slug} type="done" />
        </div>
      </AuthGate>
    ),
  };

  return (
    <ThreePanelShell
      sidebar={
        <Sidebar
          bookLabel="Unified Grammar"
          bookHref="/general-english/grammar"
          sections={sections}
          accentColor="#059669"
        />
      }
      toc={<RightTOC accentColor="#059669" />}
      topbar={null}
    >
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          {unit.title}
        </h1>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
          {[unit.level, unit.estimatedMinutes && `${unit.estimatedMinutes} min`].filter(Boolean).join(" · ")}
        </p>
      </div>
      <UnitTabs
        tabs={[{ id: "topic", label: "Topic" }, { id: "practice", label: "Practice" }]}
        panels={panels}
        defaultTab="topic"
        accentColor="#059669"
      />
    </ThreePanelShell>
  );
}

function buildSections(units) {
  const map = {};
  for (const u of units) {
    if (!map[u.section]) map[u.section] = { id: u.section, label: formatLabel(u.section), units: [] };
    map[u.section].units.push({ id: u.slug, label: u.title, href: `/general-english/grammar/${u.slug}` });
  }
  return Object.values(map).map(s => ({
    ...s,
    units: s.units.sort((a, b) => a.id.localeCompare(b.id)),
  }));
}

function formatLabel(id) {
  return id
    .replace(/^section-(\d+)-/, (_, n) => `Section ${parseInt(n)} — `)
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}
