import Link from "next/link";

const PATHS = [
  {
    id: "zero",
    label: "Build from zero",
    desc: "Complete grammar and vocabulary foundation.",
    color: "#059669",
    steps: [
      { title: "Grammar",      href: "/general-english/grammar"    },
      { title: "Word Skills",  href: "/general-english/word-skills" },
      { title: "Vocabulary",   href: "/general-english/vocabulary"  },
      { title: "Speaking",     href: "/general-english/speaking"    },
    ],
  },
  {
    id: "ielts",
    label: "IELTS preparation",
    desc: "Targeted path for exam readiness.",
    color: "#0284c7",
    steps: [
      { title: "Grammar",      href: "/general-english/grammar"      },
      { title: "Collocations", href: "/general-english/collocations"  },
      { title: "Vocabulary",   href: "/general-english/vocabulary"    },
      { title: "Writing",      href: "/general-english/writing"       },
    ],
  },
  {
    id: "academic",
    label: "Academic English",
    desc: "University and professional writing track.",
    color: "#7c3aed",
    steps: [
      { title: "Grammar",       href: "/general-english/grammar"       },
      { title: "Writing",       href: "/general-english/writing"        },
      { title: "Collocations",  href: "/general-english/collocations"   },
      { title: "Vocabulary",    href: "/general-english/vocabulary"     },
    ],
  },
];

export default function StudyPath() {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px", color: "#111827" }}>
        Study paths
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {PATHS.map(path => (
          <div key={path.id} style={{
            border: "1px solid #e5e7eb", borderRadius: 12,
            padding: "18px 20px", background: "#fff",
          }}>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{path.label}</span>
              <span style={{ fontSize: 13, color: "#9ca3af", marginLeft: 10 }}>{path.desc}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {path.steps.map((step, i) => (
                <div key={step.title} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Link href={step.href} style={{
                    padding: "5px 14px",
                    background: path.color + "14",
                    color: path.color,
                    border: `1px solid ${path.color}30`,
                    borderRadius: 20, fontSize: 13, fontWeight: 600,
                    textDecoration: "none",
                  }}>
                    {step.title}
                  </Link>
                  {i < path.steps.length - 1 && (
                    <span style={{ color: "#d1d5db", fontSize: 14 }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
