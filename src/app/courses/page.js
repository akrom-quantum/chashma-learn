import Link from "next/link";
import TopNav from "@/app/components/TopNav";
import SideNav from "@/app/components/SideNav";

export const metadata = { title: "Choose Your Path | Chashma Learn" };

const modes = [
  {
    href:    "/english",
    badge:   "Standard",
    badgeBg: "bg-white/90 text-emerald-900",
    title:   "General English",
    desc:    "Master the fundamentals of conversational and formal English for global communication and professional confidence.",
    features: ["Fluency & Pronunciation", "Business Correspondence", "Cultural Context Mastery"],
    btn:     "Begin Track",
    btnCls:  "bg-secondary-container text-on-secondary-container hover:bg-primary hover:text-on-primary",
    ring:    "",
    popular: false,
  },
  {
    href:    "/ielts",
    badge:   "Most Popular",
    badgeBg: "bg-primary text-on-primary",
    title:   "IELTS Academic",
    desc:    "Intensive preparation for high-stakes university admission. Focused on all four modules: Reading, Writing, Listening, Speaking.",
    features: ["Simulated Mock Exams", "Advanced Essay Frameworks", "Band 9 Model Answers"],
    btn:     "Enroll in IELTS",
    btnCls:  "bg-primary text-on-primary hover:bg-primary-dim shadow-md",
    ring:    "ring-2 ring-primary",
    popular: true,
  },
  {
    href:    "/sat",
    badge:   "New",
    badgeBg: "bg-tertiary text-on-tertiary",
    title:   "SAT Preparation",
    desc:    "Strategic mastery for US University admissions. Integrated verbal and mathematical reasoning with adaptive testing models.",
    features: ["Quantitative Reasoning", "Evidence-Based Reading", "Digital Exam Platform Training"],
    btn:     "Start SAT Prep",
    btnCls:  "bg-secondary-container text-on-secondary-container hover:bg-primary hover:text-on-primary",
    ring:    "",
    popular: false,
  },
];

export default function CoursesPage() {
  return (
    <div className="bg-background font-body text-on-surface antialiased">
      <TopNav />

      <div className="flex min-h-screen pt-16">
        <SideNav />

        <main className="ml-64 flex-1 p-12 bg-surface">

          {/* Header */}
          <header className="max-w-6xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold tracking-[0.1em] uppercase rounded-full mb-4">
              Course Selection
            </div>
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-4 leading-tight">
              Choose Your Path to Academic <br />Excellence.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl font-medium leading-relaxed">
              Select a curated learning mode designed by global academic experts. Each track offers
              a structured curriculum aimed at measurable growth.
            </p>
          </header>

          {/* Mode cards */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {modes.map((mode) => (
              <div
                key={mode.href}
                className={`group flex flex-col bg-surface-container-lowest rounded-xl ghost-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative ${mode.ring}`}
              >
                {/* Popular badge (top center) */}
                {mode.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg z-10">
                    Most Popular
                  </div>
                )}

                {/* Image area */}
                <div className="h-48 overflow-hidden relative bg-emerald-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "72px", opacity: 0.15 }}>
                    {mode.href === "/english" ? "language" : mode.href === "/ielts" ? "school" : "menu_book"}
                  </span>
                  <div className="absolute top-4 left-4">
                    <span className={`${mode.badgeBg} backdrop-blur px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase`}>
                      {mode.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-on-surface mb-2">{mode.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{mode.desc}</p>

                  <div className="space-y-3 mb-8 flex-1">
                    {mode.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                        <span className="text-sm font-medium">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={mode.href}
                    className={`w-full py-3 rounded font-bold text-center transition-all duration-300 ${mode.btnCls}`}
                  >
                    {mode.btn}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Footer meta */}
          <footer className="max-w-6xl mx-auto mt-20 pt-10 border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-on-surface-variant text-sm font-medium">
              Join students learning with Chashma Learn
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span>Accredited Curriculum</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                <span className="material-symbols-outlined text-lg">lock</span>
                <span>Secure Enrollment</span>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
