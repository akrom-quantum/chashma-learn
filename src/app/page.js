import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f0a] text-white overflow-hidden">

      {/* Background grid pattern */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Glow orb */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, #16a34a, transparent 70%)' }} />

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="3" fill="white"/>
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">Chashma Learn</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#subjects" className="text-sm text-zinc-400 hover:text-white transition-colors">Subjects</Link>
          <Link href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</Link>
          <Link href="/login" className="text-sm bg-emerald-600 hover:bg-emerald-500 transition-colors px-4 py-2 rounded-lg font-medium">
            Sign In
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-20 pb-32 text-center">

        <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Now accepting students
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Master English.<br />
          <span className="text-emerald-400">Ace your exams.</span>
        </h1>

        <p className="text-zinc-400 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Structured lessons, real practice materials, and expert guidance for General English, IELTS, and SAT.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/login" className="bg-emerald-600 hover:bg-emerald-500 transition-all px-8 py-4 rounded-xl font-semibold text-white text-base shadow-lg shadow-emerald-900/50 hover:shadow-emerald-800/50 hover:-translate-y-0.5">
            Start Learning
          </Link>
          <Link href="#subjects" className="border border-zinc-700 hover:border-zinc-500 transition-colors px-8 py-4 rounded-xl font-medium text-zinc-300 text-base">
            Browse Subjects
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-20 pt-12 border-t border-zinc-800/50">
          {[
            { number: "3", label: "Subjects" },
            { number: "100+", label: "Lessons" },
            { number: "IELTS & SAT", label: "Exam Focus" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.number}</div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBJECTS */}
      <section id="subjects" className="relative z-10 max-w-6xl mx-auto px-8 pb-32">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose your path</h2>
          <p className="text-zinc-400 text-lg">Every subject is carefully structured from foundations to exam level.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* General English */}
          <div className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-emerald-800 transition-all duration-300 rounded-2xl p-8 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 group-hover:bg-emerald-950 transition-colors flex items-center justify-center mb-6 text-2xl">
              📖
            </div>
            <h3 className="text-xl font-semibold mb-3">General English</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Build a strong foundation with grammar, vocabulary, reading, and writing skills for everyday and academic use.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Grammar", "Vocabulary", "Writing", "Reading"].map(tag => (
                <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <Link href="/login" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors">
              Explore lessons →
            </Link>
          </div>

          {/* IELTS — featured */}
          <div className="group relative bg-emerald-950/40 border border-emerald-800/60 hover:border-emerald-600 transition-all duration-300 rounded-2xl p-8 hover:-translate-y-1">
            <div className="absolute top-4 right-4 text-xs bg-emerald-600 text-white px-3 py-1 rounded-full font-medium">Popular</div>
            <div className="w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center mb-6 text-2xl">
              🎯
            </div>
            <h3 className="text-xl font-semibold mb-3">IELTS Preparation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Complete preparation for all four IELTS skills — Reading, Writing, Listening, and Speaking — with Band 9 model answers.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Reading", "Writing", "Listening", "Speaking"].map(tag => (
                <span key={tag} className="text-xs bg-emerald-900/60 text-emerald-400 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <Link href="/login" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors">
              Explore lessons →
            </Link>
          </div>

          {/* SAT */}
          <div className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-emerald-800 transition-all duration-300 rounded-2xl p-8 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 group-hover:bg-emerald-950 transition-colors flex items-center justify-center mb-6 text-2xl">
              ✏️
            </div>
            <h3 className="text-xl font-semibold mb-3">SAT Preparation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Master the Digital SAT Reading and Writing section with strategy-focused lessons and timed practice questions.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Reading", "Writing", "Strategy", "Timed Practice"].map(tag => (
                <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <Link href="/login" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors">
              Explore lessons →
            </Link>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-8 pb-32">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Built by a teacher, for learners</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Chashma Learn is a curated platform with hand-crafted materials developed through years of teaching IELTS and SAT. Every lesson is designed for clarity, depth, and real results.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <span className="text-zinc-500 text-sm">© 2025 Chashma Learn</span>
          <span className="text-zinc-600 text-sm">All rights reserved</span>
        </div>
      </footer>

    </main>
  );
}
