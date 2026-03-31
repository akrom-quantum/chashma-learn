import Link from "next/link";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";

export const metadata = { title: "Present Perfect | General English | Chashma Learn" };

const relatedModules = [
  { icon: "history",    label: "Past Simple vs. Perfect",  href: "#" },
  { icon: "update",     label: "Duration Form: Since/For", href: "#" },
  { icon: "spellcheck", label: "Irregular V3 Mastery",     href: "#" },
];

export default function GrammarLessonPage() {
  return (
    <div className="bg-surface text-on-surface antialiased font-body">
      <TopNav />

      <div className="flex pt-16 min-h-screen">
        <SideNav />

        <main className="ml-64 flex-1 bg-surface min-h-screen">
          <div className="max-w-5xl mx-auto px-12 py-16">

            {/* ── Header ── */}
            <header className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
                  Intermediate B1
                </span>
                <span className="text-zinc-400 text-xs">•</span>
                <span className="text-zinc-500 text-xs font-medium">Unit 4: Temporal Relationships</span>
              </div>
              <h1 className="text-5xl font-extrabold text-on-surface tracking-tight mb-6">
                The Nuances of Present Perfect
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl font-light">
                Understanding how past actions impact the current moment through the lens of continuity and result.
              </p>
            </header>

            {/* ── Hero bento ── */}
            <div className="grid grid-cols-12 gap-6 mb-20">
              <div className="col-span-8 h-[400px] rounded-xl overflow-hidden shadow-2xl shadow-emerald-900/5 relative bg-emerald-900 flex items-end">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "120px", opacity: 0.08 }}>
                    auto_stories
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
                <div className="relative z-10 p-8 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2 block">
                    Lesson Overview
                  </span>
                  <h2 className="text-2xl font-bold">Bridging the Gap: Past to Present</h2>
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-6">
                <div className="flex-1 bg-primary text-on-primary p-8 rounded-xl flex flex-col justify-between">
                  <span className="material-symbols-outlined text-4xl opacity-50">auto_stories</span>
                  <div>
                    <p className="text-sm font-bold opacity-80 uppercase tracking-tighter mb-1">Learning Time</p>
                    <p className="text-3xl font-extrabold">12 mins</p>
                  </div>
                </div>
                <div className="flex-1 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between border border-emerald-900/5">
                  <span className="material-symbols-outlined text-4xl text-primary opacity-50">psychology</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter mb-1">Complexity</p>
                    <p className="text-3xl font-extrabold text-on-surface">Level 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Lesson content ── */}
            <div className="grid grid-cols-12 gap-16">

              {/* Main content */}
              <div className="col-span-7 space-y-12">

                {/* Formula */}
                <section>
                  <h3 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
                    <span className="w-1 h-6 bg-primary rounded-full" />
                    The Structural Formula
                  </h3>
                  <div className="bg-surface-container-lowest border border-outline-variant/15 p-8 rounded-lg shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-6 justify-center">
                      <div className="text-center">
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Subject</p>
                        <span className="text-2xl font-bold text-primary">S</span>
                      </div>
                      <span className="text-zinc-300 text-2xl font-light">+</span>
                      <div className="text-center">
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Auxiliary</p>
                        <span className="text-2xl font-bold text-primary italic">have / has</span>
                      </div>
                      <span className="text-zinc-300 text-2xl font-light">+</span>
                      <div className="text-center">
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Past Participle</p>
                        <span className="text-2xl font-bold text-primary">V3</span>
                      </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-wrap gap-4 justify-center">
                      <span className="px-4 py-2 bg-zinc-50 rounded text-sm text-zinc-600 font-medium">
                        I <span className="text-primary">have finished</span> my work.
                      </span>
                      <span className="px-4 py-2 bg-zinc-50 rounded text-sm text-zinc-600 font-medium">
                        She <span className="text-primary">has traveled</span> to Italy.
                      </span>
                    </div>
                  </div>
                </section>

                {/* Usage scenarios */}
                <section>
                  <h3 className="text-2xl font-bold text-on-surface mb-6">Usage Scenarios</h3>
                  <div className="space-y-6">
                    {[
                      {
                        num: "01",
                        title: "Recent Completed Actions",
                        body: "Used when an action was completed recently and its effect is still felt or relevant in the present.",
                        example: `"I have just lost my keys." (The result: I cannot enter my house now.)`,
                      },
                      {
                        num: "02",
                        title: "Life Experiences",
                        body: "Referencing experiences occurring at an unstated time before now. The focus is on the experience itself.",
                        example: `"Have you ever seen the Northern Lights?"`,
                      },
                      {
                        num: "03",
                        title: "Unfinished Time Periods",
                        body: "Used with time expressions like 'this week', 'today', or 'this year' when the period is not yet over.",
                        example: `"She has written three emails this morning."`,
                      },
                    ].map((item) => (
                      <div key={item.num} className="group p-6 hover:bg-surface-container-low rounded-xl transition-all duration-300">
                        <div className="flex gap-4">
                          <div className="text-primary font-bold text-lg">{item.num}</div>
                          <div>
                            <h4 className="font-bold text-on-surface mb-2">{item.title}</h4>
                            <p className="text-on-surface-variant leading-relaxed">{item.body}</p>
                            <p className="mt-4 text-emerald-800 font-medium italic">{item.example}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="col-span-5 space-y-8">

                {/* Tip */}
                <div className="bg-primary/5 p-8 rounded-xl border-l-4 border-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary">lightbulb</span>
                    <h4 className="text-emerald-900 font-extrabold tracking-tight">Linguist's Tip</h4>
                  </div>
                  <p className="text-emerald-900/80 leading-relaxed text-sm font-medium">
                    Avoid using specific time markers like{" "}
                    <span className="bg-primary/10 px-1 rounded">yesterday</span> or{" "}
                    <span className="bg-primary/10 px-1 rounded">last week</span> with the Present Perfect.
                    If you must specify 'when', switch to the Simple Past.
                  </p>
                </div>

                {/* Related modules */}
                <div className="bg-surface-container-low rounded-xl p-8">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Related Modules</h4>
                  <div className="space-y-4">
                    {relatedModules.map((mod) => (
                      <Link
                        key={mod.label}
                        href={mod.href}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">
                            {mod.icon}
                          </span>
                          <span className="text-sm font-bold text-zinc-700">{mod.label}</span>
                        </div>
                        <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Back to track card */}
                <div className="relative rounded-xl overflow-hidden bg-zinc-900 p-8 h-48 flex flex-col justify-end">
                  <div className="absolute inset-0 bg-emerald-900/60" />
                  <div className="relative z-10">
                    <h4 className="text-white font-bold mb-2">Back to Grammar Track</h4>
                    <Link
                      href="/english"
                      className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
                    >
                      Course Map <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer navigation ── */}
            <footer className="mt-24 pt-12 border-t border-zinc-100 flex items-center justify-between">
              <Link href="#" className="flex items-center gap-4 text-zinc-500 hover:text-primary transition-all group">
                <span className="material-symbols-outlined p-3 rounded-full bg-zinc-100 group-hover:bg-primary/10">
                  arrow_back
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Previous Lesson</p>
                  <p className="font-bold">Simple Past Foundations</p>
                </div>
              </Link>
              <Link href="#" className="flex items-center gap-4 text-primary hover:text-primary-dim transition-all group">
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Next Lesson</p>
                  <p className="font-bold">Present Perfect Continuous</p>
                </div>
                <span className="material-symbols-outlined p-3 rounded-full bg-primary text-on-primary shadow-lg shadow-primary/20 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
