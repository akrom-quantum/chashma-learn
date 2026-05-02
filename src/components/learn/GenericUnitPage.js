"use client";

import ThreePanelShell from "@/components/shell/ThreePanelShell";
import Sidebar from "@/components/shell/Sidebar";
import RightTOC from "@/components/shell/RightTOC";
import UnitTabs from "@/components/content/UnitTabs";
import CompletionToggle from "@/components/content/CompletionToggle";
import ExerciseRenderer from "@/components/exercises/ExerciseRenderer";
import AuthGate from "@/components/learn/AuthGate";

export default function GenericUnitPage({
  unit,
  topicContent,
  exercises = [],
  extraTab = null,
  sections = [],
  bookLabel,
  bookHref = "#",
  accentColor = "#059669",
  showTOC = true,
}) {
  const tabs = [
    { id: "topic",    label: "Topic" },
    { id: "practice", label: "Practice" },
    ...(extraTab ? [{ id: extraTab.id, label: extraTab.label }] : []),
  ];

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
    ...(extraTab ? { [extraTab.id]: extraTab.content } : {}),
  };

  return (
    <ThreePanelShell
      sidebar={
        <Sidebar
          bookLabel={bookLabel}
          bookHref={bookHref}
          sections={sections}
          accentColor={accentColor}
        />
      }
      toc={showTOC ? <RightTOC accentColor={accentColor} /> : null}
      
    >
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          {unit.title}
        </h1>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
          {[unit.level, unit.estimatedMinutes && `${unit.estimatedMinutes} min`].filter(Boolean).join(" · ")}
        </p>
      </div>
      <UnitTabs tabs={tabs} panels={panels} defaultTab="topic" accentColor={accentColor} />
    </ThreePanelShell>
  );
}
