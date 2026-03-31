import Link from "next/link";
import TopNav from "@/app/components/TopNav";
import SideNav from "@/app/components/SideNav";

export default function HomePage() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased">
      <TopNav />

      <main className="pt-16 flex min-h-screen">
        <SideNav />

        <div className="flex-1 md:ml-64 bg-surface">

          {/* ── HERO ── */}
          <section className="relative px-12 py-24 overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">

              {/* Left copy */}
              <div className="lg:w-1/2 space-y-8 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.15em]">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  The Elite Standard in Learning
                </div>
                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.05]">
                  Chashma{" "}
                  <span className="text-primary italic">Learn</span>
                </h1>
                <p className="text-lg text-on-surface-variant leading-relaxed max-w-lg font-light">
                  Experience a curated academic journey designed for high-achievers.
                  Master the English language through our signature pedagogical framework.
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href="/courses"
                    className="signature-gradient text-on-primary px-8 py-4 rounded font-bold tracking-tight shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
                  >
                    Start Learning
                  </Link>
                  <Link
                    href="/courses"
                    className="text-on-surface font-semibold px-8 py-4 rounded border-b border-transparent hover:border-primary transition-all"
                  >
                    View Curriculum
                  </Link>
                </div>
              </div>

              {/* Right image */}
              <div className="lg:w-1/2 relative">
                <div className="w-full aspect-square rounded-lg overflow-hidden ghost-border shadow-2xl bg-emerald-50 flex items-center justify-center">
                  <div className="text-center p-12">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: "96px", opacity: 0.15 }}>
                      auto_stories
                    </span>
                  </div>
                </div>
                {/* Floating metric card */}
                <div className="absolute -bottom-6 -left-6 glass-nav p-6 rounded-lg ghost-border shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-950">98%</p>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Pass Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FEATURED MODES ── */}
          <section className="px-12 py-24 bg-surface-container-low">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div className="max-w-xl">
                  <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4">
                    Master Your Future
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed">
                    Select a specialized track designed by world-class linguists and academic examiners.
                  </p>
                </div>
                <Link href="/courses" className="text-primary font-bold text-sm flex items-center gap-2 group">
                  Explore All Tracks
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* General English — wide card */}
                <div className="md:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden ghost-border group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="p-10 flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 block">
                          Foundational
                        </span>
                        <h3 className="text-3xl font-bold text-on-surface mb-4">General English</h3>
                        <p className="text-on-surface-variant mb-8 font-light leading-relaxed">
                          Elevate your conversational and professional communication through immersive contextual learning modules.
                        </p>
                      </div>
                      <Link href="/english" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                        Begin Track <span className="material-symbols-outlined">arrow_forward</span>
                      </Link>
                    </div>
                    <div className="w-full md:w-72 h-48 md:h-full bg-emerald-900 flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-outlined text-white" style={{ fontSize: "80px", opacity: 0.2 }}>
                        language
                      </span>
                    </div>
                  </div>
                </div>

                {/* IELTS */}
                <div className="md:col-span-4 bg-surface-container-lowest p-10 rounded-xl ghost-border flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-3">IELTS Academic</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Comprehensive strategies for the International English Language Testing System.
                    </p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-zinc-100 flex items-center justify-between">
                    <Link href="/ielts" className="text-xs font-bold text-primary">View Track</Link>
                    <span className="material-symbols-outlined text-zinc-300">arrow_outward</span>
                  </div>
                </div>

                {/* SAT */}
                <div className="md:col-span-4 bg-primary rounded-xl p-10 flex flex-col justify-between text-on-primary group cursor-pointer hover:opacity-95 transition-opacity">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">SAT Preparation</h3>
                    <p className="text-primary-container text-sm leading-relaxed opacity-80">
                      Precision-engineered curriculum for the SAT Evidence-Based Reading and Writing sections.
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-white w-2/3" />
                    </div>
                    <p className="text-[10px] mt-2 font-bold uppercase tracking-widest opacity-60">
                      High Performance Track
                    </p>
                  </div>
                </div>

                {/* Authority bento */}
                <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-xl ghost-border flex items-center gap-12">
                  <div className="w-1/3 aspect-[4/5] rounded overflow-hidden bg-zinc-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-zinc-300" style={{ fontSize: "64px" }}>
                      menu_book
                    </span>
                  </div>
                  <div className="flex-1 space-y-6">
                    <h3 className="text-3xl font-bold text-on-surface">Curated by Experts</h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      Our pedagogical materials are refined through years of classroom teaching, IELTS instruction, and SAT mentorship.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
                        <span className="text-xs font-semibold">Verified Materials</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">update</span>
                        <span className="text-xs font-semibold">Weekly Updates</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── QUOTE ── */}
          <section className="px-12 py-32 bg-surface">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <span className="material-symbols-outlined text-primary text-5xl opacity-20">format_quote</span>
              <h2 className="text-3xl italic font-light text-on-surface leading-snug">
                "Chashma Learn doesn't just teach English; it provides the linguistic precision
                required for global leadership. The curriculum is flawlessly structured for the modern professional."
              </h2>
              <div className="pt-8">
                <p className="font-bold text-on-surface uppercase tracking-widest text-sm">Dr. Eleanor Vance</p>
                <p className="text-on-surface-variant text-xs mt-1 uppercase tracking-tighter">
                  Former Head of Applied Linguistics, Oxford
                </p>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="px-12 py-24 bg-surface-container-high border-t border-zinc-200/50">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <span className="text-2xl font-bold text-emerald-900 tracking-tighter">Chashma Learn</span>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Empowering the next generation of global scholars through linguistic mastery.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-on-surface">Academy</h4>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  {["Courses", "Scholarships", "Methodology", "Faculty"].map((item) => (
                    <li key={item}><Link href="#" className="hover:text-primary transition-colors">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-on-surface">Support</h4>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  {["Help Center", "Admissions", "Privacy Policy", "Terms of Service"].map((item) => (
                    <li key={item}><Link href="#" className="hover:text-primary transition-colors">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-on-surface">Journal</h4>
                <p className="text-xs text-on-surface-variant">
                  Subscribe to our academic newsletter for insights on linguistic evolution.
                </p>
                <div className="flex">
                  <input
                    className="bg-white border-none rounded-l text-xs w-full focus:ring-1 focus:ring-primary h-10 px-4"
                    placeholder="Email Address"
                    type="email"
                  />
                  <button className="bg-primary text-on-primary px-4 rounded-r h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>send</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              <p>© 2025 Chashma Learn. All Rights Reserved.</p>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
