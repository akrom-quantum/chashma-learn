const STEPS = [
  {
    icon: "📖",
    title: "Read",
    desc: "Work through clear grammar explanations, vocabulary tables and usage examples.",
  },
  {
    icon: "✏️",
    title: "Practice",
    desc: "Test yourself with fill-in-the-blank, multiple-choice and error-correction exercises.",
  },
  {
    icon: "📊",
    title: "Track",
    desc: "Mark units complete and watch your progress grow across every book.",
  },
];

export default function HowItWorks() {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px", color: "#111827" }}>
        How it works
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
      }}>
        {STEPS.map((step, i) => (
          <div key={step.title} style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{step.icon}</span>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "#ecfdf5", color: "#059669",
                fontSize: 12, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i + 1}
              </div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{step.title}</div>
            <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
