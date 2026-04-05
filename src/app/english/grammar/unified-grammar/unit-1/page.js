"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const firebaseConfig = {
  apiKey:            "AIzaSyBD65CTP7Tx84l-qL-KT9pj3uMUOsLOCI4",
  authDomain:        "chashma-learn.firebaseapp.com",
  projectId:         "chashma-learn",
  storageBucket:     "chashma-learn.firebasestorage.app",
  messagingSenderId: "1059701555295",
  appId:             "1:1059701955295:web:104a64e41d60252a28dbea",
};

const app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db   = getFirestore(app, "chashma-learn");

// ─────────────────────────────────────────────────────────────
// REUSABLE JSX COMPONENTS FOR UNIT CONTENT
// Use these when converting your markdown to JSX
// ─────────────────────────────────────────────────────────────

export function Note({ children })    { return <div style={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", borderLeft: "4px solid #0284c7", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Note</p><div style={{ fontSize: "15px", color: "#0c4a6e", lineHeight: 1.7 }}>{children}</div></div>; }
export function Warning({ children }) { return <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderLeft: "4px solid #f59e0b", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#b45309", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>⚠️ Warning</p><div style={{ fontSize: "15px", color: "#78350f", lineHeight: 1.7 }}>{children}</div></div>; }
export function Tip({ children })     { return <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderLeft: "4px solid #16a34a", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>💡 Tip</p><div style={{ fontSize: "15px", color: "#14532d", lineHeight: 1.7 }}>{children}</div></div>; }
export function Info({ children })    { return <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #ddd6fe", borderLeft: "4px solid #7c3aed", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#6d28d9", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>ℹ️ Info</p><div style={{ fontSize: "15px", color: "#2e1065", lineHeight: 1.7 }}>{children}</div></div>; }
export function Danger({ children })  { return <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderLeft: "4px solid #dc2626", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#b91c1c", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>🚫 Important</p><div style={{ fontSize: "15px", color: "#7f1d1d", lineHeight: 1.7 }}>{children}</div></div>; }
export function Success({ children }) { return <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderLeft: "4px solid #036c48", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#036c48", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>✅ Correct</p><div style={{ fontSize: "15px", color: "#064e3b", lineHeight: 1.7 }}>{children}</div></div>; }
export function Failure({ children }) { return <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderLeft: "4px solid #dc2626", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#b91c1c", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>❌ Wrong</p><div style={{ fontSize: "15px", color: "#7f1d1d", lineHeight: 1.7 }}>{children}</div></div>; }
export function Abstract({ children }){ return <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #475569", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>📋 Overview</p><div style={{ fontSize: "15px", color: "#1e293b", lineHeight: 1.7 }}>{children}</div></div>; }
export function Example({ children }) { return <div style={{ backgroundColor: "#fdf4ff", border: "1px solid #f0abfc", borderLeft: "4px solid #a21caf", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#86198f", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>📌 Example</p><div style={{ fontSize: "15px", color: "#4a044e", lineHeight: 1.7 }}>{children}</div></div>; }

export function Quote({ children, author }) {
  return (
    <blockquote style={{ borderLeft: "3px solid #d1fae5", paddingLeft: "20px", margin: "24px 0", fontStyle: "italic" }}>
      <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.7 }}>{children}</p>
      {author && <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "8px", fontStyle: "normal", fontWeight: 600 }}>— {author}</p>}
    </blockquote>
  );
}

export function H2({ children }) { return <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px", marginTop: "40px", marginBottom: "16px", paddingBottom: "8px", borderBottom: "2px solid #f0fdf4" }}>{children}</h2>; }
export function H3({ children }) { return <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginTop: "28px", marginBottom: "12px" }}>{children}</h3>; }
export function P({ children })  { return <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.8, marginBottom: "16px" }}>{children}</p>; }
export function Bold({ children }){ return <strong style={{ fontWeight: 700, color: "#111827" }}>{children}</strong>; }
export function Em({ children })  { return <em style={{ fontStyle: "italic", color: "#374151" }}>{children}</em>; }
export function Code({ children }){ return <code style={{ backgroundColor: "#f3f4f6", padding: "2px 6px", borderRadius: "4px", fontSize: "14px", fontFamily: "monospace", color: "#036c48" }}>{children}</code>; }

export function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", margin: "20px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0fdf4", borderBottom: "2px solid #bbf7d0" }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#064e3b", fontSize: "13px" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid #f3f4f6", backgroundColor: ri % 2 === 0 ? "#ffffff" : "#fafafa" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 14px", color: "#374151", lineHeight: 1.5 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UL({ items }) {
  return (
    <ul style={{ margin: "12px 0 16px 0", paddingLeft: "0", listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px", fontSize: "15px", color: "#374151", lineHeight: 1.6 }}>
          <span style={{ color: "#036c48", fontWeight: 700, marginTop: "2px", flexShrink: 0 }}>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function OL({ items }) {
  return (
    <ol style={{ margin: "12px 0 16px 0", paddingLeft: "0", listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px", fontSize: "15px", color: "#374151", lineHeight: 1.6 }}>
          <span style={{ color: "#036c48", fontWeight: 700, minWidth: "24px", flexShrink: 0 }}>{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────
// UNIT REGISTRY — maps unit IDs to navigation data
// Add prev/next unit info for each unit here
// ─────────────────────────────────────────────────────────────
const unitRegistry = {
  "unit-1": { title: "Unit 1", prev: null,     next: "unit-2" },
  "unit-2": { title: "Unit 2", prev: "unit-1", next: "unit-3" },
  "unit-3": { title: "Unit 3", prev: "unit-2", next: "unit-4" },
  "unit-4": { title: "Unit 4", prev: "unit-3", next: "unit-5" },
  "unit-5": { title: "Unit 5", prev: "unit-4", next: "unit-6" },
  "unit-6": { title: "Unit 6", prev: "unit-5", next: "unit-7" },
  "unit-7": { title: "Unit 7", prev: "unit-6", next: "unit-8" },
  "unit-8": { title: "Unit 8", prev: "unit-7", next: null     },
};

// ─────────────────────────────────────────────────────────────
// CONTENT — paste your converted JSX content here
// Import from separate files once content grows large
// ─────────────────────────────────────────────────────────────
function TopicContent({ unitId }) {
  return (
    <div>
      <p style={{ fontSize: "14px", color: "#036c48", marginBottom: "16px" }}>
        Debug — unitId received: <strong>"{unitId}"</strong>
      </p>
      {unitId === "unit-1" ? (
        <p style={{ color: "green" }}>✅ Match found — content should render</p>
      ) : (
        <p style={{ color: "red" }}>❌ No match — unitId does not equal "unit-1"</p>
      )}
    </div>
  );
}

function PracticeContent({ unitId }) {
  // ── PASTE PRACTICE CONTENT BELOW FOR EACH UNIT ──
  if (unitId === "unit-1") {
  return (
    <div>
      <H2>Unit 1 — Practice File: BE: Forms, Functions & Mastery</H2>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "4px 12px", borderRadius: "999px" }}>Intermediate – Upper Intermediate</span>
        <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#f3f4f6", color: "#6b7280", padding: "4px 12px", borderRadius: "999px" }}>8 Exercises + Reading Passage + Full Answer Key</span>
      </div>

      <Info>
        <P><Bold>How to Use This Practice File:</Bold> Work through exercises in order. Each exercise focuses on a specific function or challenge from Unit 1. <Bold>Do not look at the Answer Key until you have completed the exercise.</Bold> When you check your answers, read the explanation — even for correct answers. The explanation tells you WHY, not just WHAT.</P>
      </Info>

      {/* EXERCISE 1 */}
      <H2>Exercise 1 — Choose the Correct Form 🎯</H2>
      <Note>
        <P>Complete each sentence with the correct form of <Em>be</Em>. Use the tense indicated in brackets.</P>
      </Note>

      <Example>
        <P>Context: The sentences below describe a young entrepreneur named <Bold>Layla</Bold> who is building her first startup.</P>
      </Example>

      <div style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", margin: "16px 0" }}>
        <OL items={[
          "Layla ____________ only 24 years old when she registered her first company. [PAST]",
          "At first, her office ____________ a tiny rented room above a bakery. [PAST]",
          "Her investors ____________ not particularly enthusiastic at the beginning. [PAST]",
          "Now, three years later, her team ____________ fifteen people strong. [PRESENT]",
          "____________ her product really as good as the reviews say? [PRESENT]",
          "She ____________ featured on three different podcasts this month. [PRESENT PERFECT]",
          "Two years ago, she ____________ barely able to cover her monthly expenses. [PAST]",
          'Her co-founder says: "The next six months ____________ the most critical of our journey." [FUTURE]',
          "The company's headquarters ____________ in Seoul at the moment, but a London office ____________ planned for next year. [PRESENT + FUTURE]",
          "Had Layla known how difficult it would ____________, she says she would still have started anyway. [INFINITIVE]",
          "Her parents ____________ sceptical at first, but now they ____________ her biggest supporters. [PAST + PRESENT]",
          "By the time the product launched, it ____________ in development for over eighteen months. [PAST PERFECT]",
        ]} />
      </div>

      <Quote author="Mark Twain">"The secret of getting ahead is getting started."</Quote>

      {/* EXERCISE 2 */}
      <H2>Exercise 2 — There Is / There Are: Agreement Challenge 📍</H2>

      <H3>Part A</H3>
      <Note><P>Complete each sentence with <Em>there is</Em>, <Em>there are</Em>, <Em>there was</Em>, <Em>there were</Em>, or <Em>there will be</Em>.</P></Note>

      <div style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", margin: "16px 0" }}>
        <OL items={[
          "____________ a stunning view of the river from my office window.",
          "____________ over two hundred applicants for the position, but only three made it to the final round.",
          "____________ no easy answers to this problem, and everyone in the room knew it.",
          "By tomorrow morning, ____________ a formal announcement from the CEO.",
          "When we arrived at the venue, ____________ nobody at the reception desk.",
          "____________ something unusual about the way he answered the question.",
          "____________ three serious errors in your first draft. Please revise before submitting.",
          "____________ a time when this technology simply didn't exist.",
          "____________ been significant progress since we last met. Let's review it together.",
          "How many languages ____________ in daily use in Singapore?",
        ]} />
      </div>

      <H3>Part B</H3>
      <Note><P>Five of the sentences below contain an error with <Em>there is/are</Em>. Find and correct them. Write ✔ if the sentence is correct.</P></Note>

      <div style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", margin: "16px 0" }}>
        <OL items={[
          "There's been three major changes to the syllabus this semester. → _______________",
          "Is there a vegetarian option on the menu tonight? → _______________",
          "There are some interesting news in today's briefing. → _______________",
          "There were a huge storm last night, and the roads are still flooded. → _______________",
          "There's a lot of work still to be done before the deadline. → _______________",
          "There are clearly a misunderstanding between the two departments. → _______________",
          "Were there any volunteers at the community event? → _______________",
        ]} />
      </div>

      {/* EXERCISE 3 */}
      <H2>Exercise 3 — Error Correction: Find and Fix 🔎</H2>
      <Note><P>Each sentence below contains exactly <Bold>ONE error</Bold> involving <Em>be</Em>. Underline the error and write the corrected sentence.</P></Note>

      <div style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", margin: "16px 0" }}>
        <OL items={[
          "The information about the new policy are not yet available on the website. → ✔ Corrected: _______________",
          "He don't be very communicative in meetings, which is becoming a problem. → ✔ Corrected: _______________",
          "I am agree that the current system is outdated and needs to be replaced. → ✔ Corrected: _______________",
          "Were you been working here when the previous director was in charge? → ✔ Corrected: _______________",
          "She is being very exhausted after the conference — she slept for twelve hours. → ✔ Corrected: _______________",
          "There is three candidates shortlisted, and we're interviewing them next week. → ✔ Corrected: _______________",
          "When was the last time you are in Paris for a business trip? → ✔ Corrected: _______________",
          "The advice they gave us were surprisingly practical and easy to follow. → ✔ Corrected: _______________",
          "I'm boring of hearing the same excuses every single time there's a deadline. → ✔ Corrected: _______________",
          "By the time you read this, the decision will already been made. → ✔ Corrected: _______________",
          "Where was you when the fire alarm went off at 3 p.m. yesterday? → ✔ Corrected: _______________",
          "The committee have been being very secretive about their plans for the restructuring. → ✔ Corrected: _______________",
        ]} />
      </div>

      <Quote author="Terry Pratchett">"The first draft is just you telling yourself the story."</Quote>

      {/* EXERCISE 4 */}
      <H2>Exercise 4 — State or Behaviour? 🧠</H2>
      <Note><P>Choose the correct option (A or B). Then write a brief explanation of <Bold>WHY</Bold> that option is correct.</P></Note>

      {[
        { num: 1, situation: "Your colleague, who is normally very polite, has just interrupted three people in a row.", a: "He is rude.", b: "He is being rude." },
        { num: 2, situation: "A friend asks why you look so pale and sluggish at work today.", a: "I am being tired.", b: "I am tired." },
        { num: 3, situation: "Your manager calls you into a meeting and you can tell she wants a decision today.", a: "She is impatient.", b: "She is being impatient." },
        { num: 4, situation: "A child who always causes trouble is, unusually, sitting quietly and listening.", a: "She is very well-behaved.", b: "She is being very well-behaved." },
        { num: 5, situation: "You are describing a permanent personality trait of your best friend to someone who has never met them.", a: "She is being incredibly kind.", b: "She is incredibly kind." },
        { num: 6, situation: "Your team member gives a brilliantly clear explanation during a difficult client call.", a: "He is being very articulate today.", b: "He is very articulate." },
      ].map((item) => (
        <div key={item.num} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "20px", margin: "12px 0", border: "1px solid #e5e7eb" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#036c48", marginBottom: "8px" }}>Situation {item.num}</p>
          <P>{item.situation}</P>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "4px" }}>A</p>
              <P>{item.a}</P>
            </div>
            <div style={{ flex: 1, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "4px" }}>B</p>
              <P>{item.b}</P>
            </div>
          </div>
          <div style={{ marginTop: "12px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "4px" }}>Your choice: ____ &nbsp;&nbsp; Why: _______________________________________________</p>
          </div>
        </div>
      ))}

      {/* EXERCISE 5 */}
      <H2>Exercise 5 — Dialogue Repair: Fix the Conversation 🗣️</H2>
      <Warning><P>Read the dialogue between <Bold>Mia</Bold> and <Bold>Reza</Bold>. It contains <Bold>10 errors</Bold> with <Em>be</Em> (marked with *). List the errors and their corrections in the table below.</P></Warning>

      <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "24px", margin: "16px 0" }}>
        <P><Bold>Mia:</Bold> "Reza, *are you being ready for the client call? It *is starts in ten minutes."</P>
        <P><Bold>Reza:</Bold> "Almost. *Was there any updates from the design team? I haven't checked my email."</P>
        <P><Bold>Mia:</Bold> "Yes — the slides *is now uploaded to the shared folder. Oh, and the client's name *are Dr. Hoffman, not Ms Hoffman."</P>
        <P><Bold>Reza:</Bold> "Got it. I *am agree that we should let her lead the first section. *Is her assistant going to being on the call too?"</P>
        <P><Bold>Mia:</Bold> "Apparently. There *is two people joining from their side — Dr. Hoffman and her project manager."</P>
        <P><Bold>Reza:</Bold> "Perfect. I *am boring of starting these calls with technical problems. Is everything working?"</P>
        <P><Bold>Mia:</Bold> "Everything *are fine. Let's go."</P>
      </div>

      <Table
        headers={["#", "Error", "Correction"]}
        rows={[
          ["1", "", ""], ["2", "", ""], ["3", "", ""], ["4", "", ""], ["5", "", ""],
          ["6", "", ""], ["7", "", ""], ["8", "", ""], ["9", "", ""], ["10", "", ""],
        ]}
      />

      <Quote author="Frank Smith">"Language is not a genetic gift, it is a social gift. Learning a new language is becoming a member of the club."</Quote>

      {/* EXERCISE 6 */}
      <H2>Exercise 6 — Question Formation: Real-World Scenarios ❓</H2>
      <Note><P>Using the information in brackets, write a complete and natural question using <Em>be</Em>.</P></Note>

      <div style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", margin: "16px 0" }}>
        <OL items={[
          "You want to know if the report is finished. [present] → _______________",
          "You want to know where your colleague was on Tuesday morning. [past] → _______________",
          "You're asking about the price of the conference ticket. [present] → _______________",
          "You want to confirm how long the flight will be. [future] → _______________",
          "You are a journalist asking a CEO how long they have been in the role. [present perfect] → _______________",
          "You are asking a friend why they looked so upset at lunch yesterday. [past + adjective] → _______________",
          "You want to know if there are any seats left at the back of the theatre. [present / there + be] → _______________",
          "You're calling a restaurant and want to confirm that it will be open on Sunday. [future] → _______________",
          "After a difficult project, you want to ask your team how they are feeling. [present + adjective] → _______________",
          "You read that a famous architect was born in your city. You want to confirm what year. [past + when/what year] → _______________",
        ]} />
      </div>

      {/* EXERCISE 7 */}
      <H2>Exercise 7 — Reading Passage: Analyse & Respond 📚</H2>
      <Info><P>Read the passage carefully. Complete the tasks that follow. The passage is written at <Bold>B2 level</Bold>.</P></Info>

      <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px", margin: "20px 0" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#064e3b", marginBottom: "6px" }}>THE QUIET REVOLUTION IN DISTANCE LEARNING</h3>
        <p style={{ fontSize: "13px", color: "#9ca3af", fontStyle: "italic", marginBottom: "20px" }}>How digital education is reshaping what it means to be a student</p>

        <P>Twenty years ago, the idea of earning a university degree without ever setting foot in a lecture hall was considered either impractical or suspicious. Today, it is neither. Online education <Bold>has been</Bold> one of the most significant transformations in the history of formal learning, and its pace of growth has been accelerating ever since the global disruptions of the early 2020s.</P>
        <P>What is particularly striking is not just that these programmes exist, but that they <Bold>are being taken</Bold> seriously by employers who were once openly sceptical. "In the past, I was embarrassed to mention that my qualification was online," says Hamid Sultani, a data analyst based in Toronto. "Now it's genuinely not an issue. My employers were impressed by the self-discipline it required, not concerned about where the lectures were held."</P>
        <P>Part of this shift is the result of major universities — institutions that <Bold>were long considered</Bold> the gatekeepers of legitimate education — entering the online space. Their presence <Bold>has been</Bold> transformative. When Oxford, MIT and the National University of Singapore are all offering fully online postgraduate programmes, the old stigma is simply harder to sustain.</P>
        <P>However, the experience of being a distance learner is not without its complications. Isolation is frequently cited as the greatest challenge. Unlike a traditional campus, where <Bold>there are</Bold> always opportunities for spontaneous conversation — in corridors, in cafeterias, between classes — the online environment requires deliberate effort to build community. "You have to be much more intentional," explains Dr. Leila Ahmadi, who <Bold>has been teaching</Bold> online since 2015. "It's not enough for the content to be good. The interaction has to be structured, because it's never going to be accidental."</P>
        <P>There is also the question of self-regulation. The traditional classroom has a built-in rhythm: there are fixed times when you <Bold>are expected to be</Bold> present, participate, and perform. Remove that structure, and you are left with something that sounds appealing — total flexibility — but that is, for many learners, genuinely difficult to manage. Research from several universities has shown that completion rates for purely self-paced online courses are significantly lower than for those <Bold>that are structured</Bold> around a cohort with regular deadlines.</P>
        <P>None of this is to say that the future of education is uncertain. What is clear is that the definition of being a student — what it looks like, where it happens, and what it demands — <Bold>has been</Bold> permanently altered. The question is no longer whether online education <Bold>is legitimate</Bold>, but how it can be done best.</P>
      </div>

      <H3>Task A — Classify the Use of Be</H3>
      <Note><P>Find each bold phrase and classify the use of <Em>be</Em>: <Bold>(M)</Bold> Main/linking verb · <Bold>(PA)</Bold> Passive auxiliary · <Bold>(PR)</Bold> Progressive auxiliary · <Bold>(PF)</Bold> Perfect auxiliary</P></Note>

      <Table
        headers={["#", "Phrase", "Classification"]}
        rows={[
          ["1",  '"has been one of the most significant transformations" (¶1)', ""],
          ["2",  '"are being taken seriously by employers" (¶2)',               ""],
          ["3",  '"were long considered the gatekeepers" (¶3)',                 ""],
          ["4",  '"has been transformative" (¶3)',                              ""],
          ["5",  '"there are always opportunities" (¶4)',                       ""],
          ["6",  '"has been teaching online since 2015" (¶4)',                  ""],
          ["7",  '"you are expected to be present" (¶5)',                       ""],
          ["8",  '"that are structured around a cohort" (¶5)',                  ""],
          ["9",  '"has been permanently altered" (¶6)',                         ""],
          ["10", '"whether online education is legitimate" (¶6)',               ""],
        ]}
      />

      <H3>Task B — Comprehension and Discussion</H3>
      <Note><P>Answer these questions in complete sentences. Pay attention to your use of <Em>be</Em> in every answer.</P></Note>

      <div style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", margin: "16px 0" }}>
        <OL items={[
          "According to the passage, what has been the most common employer attitude towards online qualifications, and how has it changed?",
          "What does Dr. Ahmadi mean when she says interaction has to be 'intentional' rather than 'accidental'?",
          'The passage mentions that "completion rates… are significantly lower" for self-paced courses. What does this suggest about how online programmes should be designed?',
          "In your own words, explain the 'built-in rhythm' of traditional education. Why is its absence challenging?",
          'The passage ends by saying the question "is no longer whether online education is legitimate, but how it can be done best." Do you agree?',
        ]} />
      </div>

      {/* EXERCISE 8 */}
      <H2>Exercise 8 — Free Writing Challenge ✏️</H2>
      <Warning>
        <P><Bold>Challenge Rules:</Bold> Write a short paragraph (80–120 words) on ONE of the prompts below. You must use at least <Bold>8 different forms of <Em>be</Em></Bold> — including at least one progressive and one passive form. Underline every use of <Em>be</Em> when you finish.</P>
      </Warning>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", margin: "16px 0" }}>
        {[
          { opt: "A", text: "Describe a person — real or fictional — whose job or role has changed significantly over the past ten years." },
          { opt: "B", text: "Describe a city, town, or neighbourhood you know well. Focus on what it was like in the past, what it is like now, and what it will be like in the future." },
          { opt: "C", text: "Describe an experience that was not what you expected it to be. What were your assumptions? What was the reality?" },
        ].map((p) => (
          <div key={p.opt} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#036c48", marginBottom: "8px" }}>Option {p.opt}</p>
            <P>{p.text}</P>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "#f9fafb", border: "1px dashed #d1d5db", borderRadius: "10px", padding: "24px", margin: "16px 0", minHeight: "160px" }}>
        <p style={{ fontSize: "13px", color: "#d1d5db" }}>Write your paragraph here...</p>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", margin: "16px 0" }}>
        {["Total uses of be: ____", "Progressive forms: ____", "Passive forms: ____", "Perfect forms: ____"].map((item) => (
          <div key={item} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", color: "#374151", fontWeight: 500 }}>
            {item}
          </div>
        ))}
      </div>

      <Quote author="Maya Angelou">"You can't use up creativity. The more you use, the more you have."</Quote>

      {/* ANSWER KEY */}
      <H2>✅ Answer Key & Explanations</H2>
      <Success><P>Reminder: Check your answers only after completing each exercise. Read every explanation — even for correct answers.</P></Success>

      <H3>Key — Exercise 1</H3>
      <Table
        headers={["#", "Answer", "Explanation"]}
        rows={[
          ["1",  "was",            "Past simple, singular subject (Layla)"],
          ["2",  "was",            "Past simple, singular (office)"],
          ["3",  "were not / weren't", "Past simple, plural (investors)"],
          ["4",  "is",             "Present simple, singular (team = collective noun)"],
          ["5",  "Is",             "Present yes/no question: be before subject"],
          ["6",  "has been",       "Present perfect — action completed recently, relevant now"],
          ["7",  "was",            "Past simple, singular"],
          ["8",  "will be",        "Future prediction, same for all subjects"],
          ["9",  "is … is",        '"headquarters is" (singular) + "office is planned" (future passive)'],
          ["10", "be",             'After modal "would" — always bare infinitive: "would be"'],
          ["11", "were … are",     "Past plural + present plural"],
          ["12", "had been",       "Past perfect: action completed before another past event (the launch)"],
        ]}
      />

      <H3>Key — Exercise 2 Part A</H3>
      <Table
        headers={["#", "Answer", "Explanation"]}
        rows={[
          ["1",  "There is",        'Singular: "a view"'],
          ["2",  "There were",      'Plural past: "over two hundred applicants"'],
          ["3",  "There are / were","\"no easy answers\" — plural"],
          ["4",  "there will be",   'Future: after "By tomorrow morning"'],
          ["5",  "there was",       'Past singular: "nobody" (grammatically singular)'],
          ["6",  "There was",       'Singular: "something"'],
          ["7",  "There are",       'Plural: "three serious errors"'],
          ["8",  "There was",       'Singular past: "a time"'],
          ["9",  "There has",       '"There has been" — present perfect: "significant progress" (uncountable singular)'],
          ["10", "are there",       'Question form: "How many languages are there …?" — plural'],
        ]}
      />

      <H3>Key — Exercise 2 Part B</H3>
      <Table
        headers={["#", "Answer", "Explanation"]}
        rows={[
          ["1", '❌ → "There have been three major changes…"', '"Three changes" = plural, needs "have been"'],
          ["2", "✔ Correct",                                  'Singular question — "Is there a vegetarian option?" ✔'],
          ["3", '❌ → "There is some interesting news…"',      '"News" is always singular'],
          ["4", '❌ → "There was a huge storm…"',              'Singular past: "a storm"'],
          ["5", "✔ Correct",                                  '"a lot of work" — uncountable, takes "there\'s" ✔'],
          ["6", '❌ → "There is clearly a misunderstanding…"', 'Singular: "a misunderstanding"'],
          ["7", "✔ Correct",                                  'Past plural question: "Were there any volunteers?" ✔'],
        ]}
      />

      <H3>Key — Exercise 3</H3>
      <Table
        headers={["#", "Correction", "Explanation"]}
        rows={[
          ["1",  '"The information… is not yet available"',       '"Information" is uncountable — always singular'],
          ["2",  'Remove "be" → "He isn\'t very communicative"',  "Never use do/does/did + be for negation"],
          ["3",  'Remove "am" → "I agree that…"',                '"Agree" is a full verb, not an adjective'],
          ["4",  'Remove "been" → "Were you working here when…"', '"Were you been" is impossible. Past progressive = were + -ing'],
          ["5",  '"exhausted" is a state → "She was very exhausted"', "Feelings and states cannot use progressive be"],
          ["6",  '"There are three candidates shortlisted"',      'Plural noun "three candidates" requires "are"'],
          ["7",  '"When were you last in Paris"',                 'Past question: "were you" not "was you"'],
          ["8",  '"The advice… was"',                            '"Advice" is uncountable — always singular'],
          ["9",  '"I\'m bored of / with hearing…"',              '"Boring" = causes boredom; "bored" = feeling boredom'],
          ["10", '"will already have been made"',                 "Future perfect: will + have + past participle"],
          ["11", '"Where were you…"',                            '"You" always takes "were", never "was"'],
          ["12", 'Remove "being" → "has been very secretive"',   '"have been being" is grammatically incorrect'],
        ]}
      />

      <H3>Key — Exercise 4</H3>
      <Table
        headers={["#", "Answer", "Explanation"]}
        rows={[
          ["1", "B — He is being rude.",          "He is usually polite (state). Right now he is doing something rude (behaviour = progressive)."],
          ["2", "B — I am tired.",                "Tiredness is a feeling/state. Never use 'being' with tired."],
          ["3", "B — She is being impatient.",    "She normally has a calm character. She is currently behaving impatiently."],
          ["4", "B — She is being well-behaved.", "This is unusual for her — a temporary behaviour, not her general character."],
          ["5", "B — She is incredibly kind.",    "Describing a permanent character trait = simple be, not progressive."],
          ["6", "A or B both possible",           '"He is being very articulate today" (behaviour) OR "He is very articulate" (general trait). "Today" suggests behaviour.'],
        ]}
      />

      <H3>Key — Exercise 5</H3>
      <Table
        headers={["#", "Error", "Correction", "Explanation"]}
        rows={[
          ["1",  '"are you being ready"',      '"are you ready"',         '"Ready" is a state, not a behaviour. No progressive be.'],
          ["2",  '"It is starts"',             '"It starts"',             'Simple present is needed — be is not required before "starts".'],
          ["3",  '"Was there any updates"',    '"Are there any updates"', '"Updates" is plural and refers to current state → present are.'],
          ["4",  '"the slides is now"',        '"the slides are now"',    '"Slides" is plural → are.'],
          ["5",  '"the client\'s name are"',   '"the client\'s name is"', '"Name" is singular → is.'],
          ["6",  '"I am agree"',               '"I agree"',               '"Agree" is a full verb. Never use be before it.'],
          ["7",  '"going to being"',           '"going to be"',           'After "going to", always use bare infinitive: be.'],
          ["8",  '"There is two people"',      '"There are two people"',  '"Two people" is plural → are.'],
          ["9",  '"I am boring"',              '"I am bored"',            '"Boring" = causes boredom. "Bored" = the feeling of boredom.'],
          ["10", '"Everything are fine"',      '"Everything is fine"',    '"Everything" is grammatically singular → is.'],
        ]}
      />

      <H3>Key — Exercise 6 (Model Answers)</H3>
      <Table
        headers={["#", "Model Answer"]}
        rows={[
          ["1",  "Is the report finished / ready?"],
          ["2",  "Where were you on Tuesday morning?"],
          ["3",  "How much is the conference ticket? / What is the price?"],
          ["4",  "How long will the flight be?"],
          ["5",  "How long have you been in this role / position?"],
          ["6",  "Why were you so upset at lunch yesterday?"],
          ["7",  "Are there any seats left at the back of the theatre?"],
          ["8",  "Will you be open on Sunday?"],
          ["9",  "How are you feeling? / How is everyone feeling?"],
          ["10", "What year was the architect born? / When was he/she born?"],
        ]}
      />

      <H3>Key — Exercise 7A: Classification</H3>
      <Table
        headers={["#", "Answer", "Explanation"]}
        rows={[
          ["1",  "PF — Perfect auxiliary",    '"has been" + noun = present perfect'],
          ["2",  "PA — Passive auxiliary",    '"is being taken" = passive progressive'],
          ["3",  "PA — Passive auxiliary",    '"were considered" = past passive'],
          ["4",  "PF — Perfect auxiliary",    '"has been" + adjective = present perfect'],
          ["5",  "M — Main/linking verb",     '"there are" introduces existence of opportunities'],
          ["6",  "PF — Perfect auxiliary",    '"has been teaching" = present perfect progressive'],
          ["7",  "M — Main/linking verb",     '"to be present" = infinitive of be as linking verb'],
          ["8",  "PA — Passive auxiliary",    '"are structured" = present passive'],
          ["9",  "PA + PF",                   '"has been permanently altered" = present perfect passive'],
          ["10", "M — Main/linking verb",     '"is legitimate" = be + adjective (linking)'],
        ]}
      />

      <Tip>
        <P><Bold>Exercises 7B & 8 are open-response.</Bold> When checking your work, focus on:</P>
        <UL items={[
          "✔ Correct form selection for each use of be (main verb, auxiliary, passive)",
          "✔ Subject-verb agreement (especially with there is/are and uncountable nouns)",
          "✔ Appropriate use of contractions (not at end of clause, not in formal writing)",
          "✔ Distinction between progressive be (behaviour) and simple be (state)",
        ]} />
      </Tip>

      <Quote author="Confucius">"It does not matter how slowly you go, as long as you do not stop."</Quote>

    </div>
  );
}
return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <p style={{ fontSize: "32px", marginBottom: "12px" }}>✍️</p>
      <p style={{ fontSize: "15px", color: "#9ca3af" }}>Practice exercises for this unit are coming soon.</p>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
// MAIN UNIT PAGE COMPONENT
// ─────────────────────────────────────────────────────────────
export default function UnitPage({ params }) {
  const subject = params?.subject || "";
const book    = params?.book    || "";
const unitId  = params?.unit    || "";
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("topic");
  console.log("ALL PARAMS:", JSON.stringify(params));

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          setRole(snap.exists() ? snap.data().role : "viewer");
        } catch { setRole("viewer"); }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Manrope', sans-serif" }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const isLearner  = role === "learner" || role === "admin" || role === "owner";
  const unitNum    = parseInt(unitId?.replace("unit-", "") || "1");
  const isFree     = unitNum <= 3;
  const locked     = !isLearner && !isFree;
  const unitNav    = unitRegistry[unitId] || {};

  if (locked) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "400px", padding: "40px" }}>
          <div style={{ width: "72px", height: "72px", backgroundColor: "#f3f4f6", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "32px" }}>🔒</div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>This unit is locked</h2>
          <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6, marginBottom: "28px" }}>
            Units 1–3 are free. Upgrade to Learner to unlock all units in this book.
          </p>
          <Link href="/dashboard" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
            Upgrade to Learner
          </Link>
          <br />
          <Link href={`/english/${subject}/${book}`} style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>
            ← Back to book contents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none" }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href={`/english/${subject}/${book}`} style={{ color: "#6b7280", textDecoration: "none" }}>Contents</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{unitRegistry[unitId]?.title || unitId}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {!isFree && (
              <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" }}>
                Learner
              </span>
            )}
            {isFree && (
              <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#fef9c3", color: "#854d0e", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" }}>
                Free
              </span>
            )}
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "88px 32px 80px" }}>

        {/* Unit header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
            {subject?.replace(/-/g, " ")} · {book?.replace(/-/g, " ")}
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#064e3b", letterSpacing: "-1px", lineHeight: 1.1 }}>
            {unitRegistry[unitId]?.title || unitId}
          </h1>
        </div>

        {/* Topic / Practice tabs */}
        <div style={{ display: "flex", gap: "4px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "4px", marginBottom: "36px", width: "fit-content" }}>
          {[
            { id: "topic",    label: "Topic",    icon: "📖" },
            { id: "practice", label: "Practice", icon: "✍️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "9px 22px", borderRadius: "7px", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 600, fontFamily: "'Manrope', sans-serif",
                display: "flex", alignItems: "center", gap: "7px",
                backgroundColor: activeTab === tab.id ? "#036c48" : "transparent",
                color: activeTab === tab.id ? "#ffffff" : "#6b7280",
                transition: "all 0.15s",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "40px 48px", minHeight: "400px" }}>
          {activeTab === "topic"    && <TopicContent    unitId={unitId} />}
          {activeTab === "practice" && <PracticeContent unitId={unitId} />}
        </div>

        {/* Previous / Next navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", gap: "16px" }}>
          {unitNav.prev ? (
            <Link
              href={`/english/${subject}/${book}/${unitNav.prev}`}
              style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px 20px", flex: 1 }}
            >
              <span style={{ fontSize: "20px", color: "#9ca3af" }}>←</span>
              <div>
                <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Previous</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{unitRegistry[unitNav.prev]?.title}</p>
              </div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {unitNav.next ? (
            <Link
              href={`/english/${subject}/${book}/${unitNav.next}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", textDecoration: "none", backgroundColor: "#036c48", border: "none", borderRadius: "10px", padding: "14px 20px", flex: 1 }}
            >
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", color: "#6ee7b7", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Next</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{unitRegistry[unitNav.next]?.title}</p>
              </div>
              <span style={{ fontSize: "20px", color: "#6ee7b7" }}>→</span>
            </Link>
          ) : (
            <Link
              href={`/english/${subject}/${book}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px 20px", flex: 1 }}
            >
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#036c48" }}>✓ Back to Contents</p>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
