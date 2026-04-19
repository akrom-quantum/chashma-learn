"use client";
import Callout from "@/components/callouts/Callout";
import Table from "@/components/content/Table";
import { H2, H3, P, Bold, Em, Code } from "@/components/content/Typography";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const meta = {
  title:        "Multiple Choice",
  level:        "B1–C2",
  time:         "12 min",
  product:      "ielts",
  subject:      "reading",
  questionType: "multiple-choice",
};

// ─── Table of Contents ────────────────────────────────────────────────────────

export const tocItems = [
  { id: "sec-intro",      label: "Overview",              level: 1 },
  { id: "sec-tested",     label: "What's Being Tested",   level: 1 },
  { id: "sec-strategy",   label: "Strategy",              level: 1 },
  { id: "sec-distractors",label: "Distractor Patterns",   level: 1 },
  { id: "sec-example",    label: "Worked Example",        level: 1 },
  { id: "sec-time",       label: "Time Budget",           level: 1 },
  { id: "sec-mistakes",   label: "Common Mistakes",       level: 1 },
];

// ─── Topic ────────────────────────────────────────────────────────────────────

export function TopicContent() {
  return (
    <div>
      <Callout type="abstract" title="Question Type Overview">
        <p style={{ margin: "0 0 10px" }}>
          You're given a question or an incomplete statement and four options (A, B, C, D). Pick the one that matches the passage. Some variants give five options (pick two) or seven options (pick three) — the instructions will tell you.
        </p>
        <p style={{ margin: 0, fontWeight: 600 }}>
          Multiple Choice looks like the easiest question type. It isn't. Three of the four options will look plausible, and at least two will use words directly from the passage to trap you.
        </p>
      </Callout>

      <H2 id="sec-tested">What's Being Tested</H2>
      <P>
        Detailed understanding of a specific part of the passage. Your ability to reject <Bold>distractors</Bold> — options that sound right but aren't. Whether you're matching <Bold>meaning</Bold> or just matching <Bold>words</Bold>.
      </P>
      <Callout type="info" title="Passage Order">
        Multiple Choice questions appear in the <Bold>same order as the information in the passage</Bold>. Q21 comes before Q22 in the text. Use this to narrow your search.
      </Callout>

      <H2 id="sec-strategy">Strategy</H2>

      <H3 id="sec-strategy-1">1. Read the question stem first. Underline the key noun.</H3>
      <P>
        Not the whole question — the one thing being asked about. <Em>"According to the writer, the main reason for X was…"</Em> → underline X.
      </P>

      <H3 id="sec-strategy-2">2. Scan the passage for that noun or its synonym.</H3>
      <P>Don't read. Scan. Your eye is looking for one thing.</P>

      <H3 id="sec-strategy-3">3. Read the sentence, plus the one before and the one after.</H3>
      <P>The answer is almost always in this three-sentence window.</P>

      <H3 id="sec-strategy-4">4. Cover the options. Predict the answer in your own words.</H3>
      <P>
        This is the step 90% of students skip. If you read the options first, they colonize your thinking. Predict first, then match.
      </P>

      <H3 id="sec-strategy-5">5. Eliminate, don't select.</H3>
      <P>
        Cross out options that are clearly wrong. When two remain, re-read the passage sentence. The correct answer will paraphrase it. The distractor will repeat its words while twisting the meaning.
      </P>

      <H2 id="sec-distractors">The Four Distractor Patterns</H2>
      <P>Memorize these. Every wrong answer is one of them.</P>

      <Callout type="warning" title="Pattern 1 — Word match, meaning mismatch">
        The option uses vocabulary directly from the passage but says something the passage doesn't.<br />
        <Bold>Passage:</Bold> <Em>"Solar panels have become cheaper, but installation costs remain high."</Em><br />
        <Bold>Trap option:</Bold> <Em>"Solar panels are expensive."</Em> (The panels aren't — the installation is.)
      </Callout>

      <Callout type="warning" title="Pattern 2 — Too extreme">
        The option is right in spirit but uses absolute language (<Em>always</Em>, <Em>never</Em>, <Em>all</Em>, <Em>impossible</Em>) where the passage uses hedged language (<Em>often</Em>, <Em>tends to</Em>, <Em>most</Em>).
      </Callout>

      <Callout type="warning" title="Pattern 3 — Partially true">
        Half of the option matches the passage. The other half adds or changes something. One wrong word invalidates the whole option.
      </Callout>

      <Callout type="warning" title="Pattern 4 — True, but not the answer">
        The option is a true statement found in the passage — just not the answer to <Bold>this specific question</Bold>. Always re-check: <Em>"Does this answer what's actually being asked?"</Em>
      </Callout>

      <H2 id="sec-example">Worked Example</H2>

      <Callout type="example" title="Passage Extract">
        <Em>"The Roman road network, often cited as the foundation of European infrastructure, was built primarily for military purposes. Though merchants later benefited enormously from these roads, Roman engineers designed them to allow legions to move quickly between provinces, not to stimulate trade."</Em>
      </Callout>

      <P>
        <Bold>Question:</Bold> According to the passage, why were Roman roads originally built?
      </P>

      <Table
        headers={["Option", "Text"]}
        rows={[
          ["A", "To help merchants transport goods across Europe."],
          ["B", "To establish Europe's infrastructure."],
          ["C", "To enable rapid movement of military forces."],
          ["D", "To connect distant Roman provinces."],
        ]}
      />

      <P>Working through it:</P>

      <Callout type="failure" title="A — Pattern 4">
        True (merchants did benefit) but the passage explicitly says this was <Em>later</Em>, not the original purpose. Rejected.
      </Callout>

      <Callout type="failure" title="B — Pattern 2">
        "Foundation of European infrastructure" appears in the passage, but the phrase describes what the roads became, not why they were built. Rejected.
      </Callout>

      <Callout type="failure" title="D — Pattern 3">
        The roads did connect provinces, but the passage says movement between provinces was for <Bold>legions</Bold> — the province-connection is a consequence, not the purpose. Too vague.
      </Callout>

      <Callout type="success" title="C — Correct">
        Paraphrases <Em>"allow legions to move quickly between provinces."</Em>
      </Callout>

      <H2 id="sec-time">Time Budget</H2>
      <P>
        60–90 seconds per question. If you're at 90 seconds and still torn between two options, pick the one closer to your original prediction and move on. You'll lose more marks agonizing than you will guessing.
      </P>

      <H2 id="sec-mistakes">Common Mistakes</H2>
      <Callout type="danger" title="Five ways to lose this question">
        <ul style={{ margin: "4px 0 0", paddingLeft: "20px" }}>
          <li style={{ marginBottom: "6px" }}><Bold>Reading all options before the passage</Bold> — you prime yourself to accept distractors.</li>
          <li style={{ marginBottom: "6px" }}><Bold>Picking the option with most passage-like vocabulary</Bold> — usually a trap.</li>
          <li style={{ marginBottom: "6px" }}><Bold>Changing your answer at the end</Bold> — first, prediction-based instincts are right more often than second-guesses.</li>
          <li style={{ marginBottom: "6px" }}><Bold>Getting stuck on one question</Bold> — Multiple Choice is worth one mark. So is every other question.</li>
          <li style={{ marginBottom: 0 }}><Bold>Leaving 2-of-5 or 3-of-7 variants blank</Bold> — each correct choice is worth one mark independently.</li>
        </ul>
      </Callout>

      <Callout type="tip" title="The 2-out-of-5 and 3-out-of-7 variants">
        When asked to pick two (or three) answers, each correct choice is worth one mark independently. If you get one right and one wrong, you get one mark — not zero. <Bold>Never leave these blank.</Bold>
      </Callout>
    </div>
  );
}

// ─── Practice ────────────────────────────────────────────────────────────────
// Guides don't have practice exercises (practice lives in Tests + Drill).
// Omitting PracticeContent tells PageShell not to render the Practice tab.

const Guide = { meta, tocItems, TopicContent };
export default Guide;
