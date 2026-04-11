"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";

// ─── Callout Components (Obsidian-style) ─────────────────────────────────────

const CALLOUT_STYLES = {
  abstract: { bg: "#f0f9ff", border: "#bae6fd", icon: "📋", label: "Overview",   labelColor: "#0369a1" },
  quote:    { bg: "#fafafa", border: "#e5e7eb", icon: "❝",  label: "Quote",      labelColor: "#6b7280" },
  tip:      { bg: "#f0fdf4", border: "#86efac", icon: "💡", label: "Tip",        labelColor: "#16a34a" },
  warning:  { bg: "#fffbeb", border: "#fde68a", icon: "⚠️", label: "Warning",    labelColor: "#d97706" },
  info:     { bg: "#eff6ff", border: "#bfdbfe", icon: "ℹ️", label: "Info",       labelColor: "#2563eb" },
  example:  { bg: "#f8fafc", border: "#cbd5e1", icon: "📝", label: "Example",    labelColor: "#475569" },
  failure:  { bg: "#fff1f2", border: "#fecdd3", icon: "✗",  label: "Wrong",      labelColor: "#e11d48" },
  success:  { bg: "#f0fdf4", border: "#86efac", icon: "✓",  label: "Correct",    labelColor: "#16a34a" },
  danger:   { bg: "#fff1f2", border: "#fecdd3", icon: "🚨", label: "Danger",     labelColor: "#e11d48" },
  note:     { bg: "#fafafa", border: "#e5e7eb", icon: "📌", label: "Note",       labelColor: "#6b7280" },
};

function Callout({ type = "note", title, children }) {
  const s = CALLOUT_STYLES[type] || CALLOUT_STYLES.note;
  return (
    <div style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, borderLeft: `4px solid ${s.border}`, borderRadius: "8px", padding: "16px 20px", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: children ? "10px" : 0 }}>
        <span style={{ fontSize: "15px" }}>{s.icon}</span>
        <span style={{ fontSize: "13px", fontWeight: 700, color: s.labelColor, textTransform: "uppercase", letterSpacing: "0.4px" }}>
          {title || s.label}
        </span>
      </div>
      {children && <div style={{ fontSize: "14px", lineHeight: 1.75, color: "#374151" }}>{children}</div>}
    </div>
  );
}

function H2({ id, children }) {
  return <h2 id={id} style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "16px", marginTop: "40px", letterSpacing: "-0.5px", borderBottom: "2px solid #f3f4f6", paddingBottom: "10px", scrollMarginTop: "80px" }}>{children}</h2>;
}
function H3({ id, children }) {
  return <h3 id={id} style={{ fontSize: "17px", fontWeight: 700, color: "#1f2937", marginBottom: "12px", marginTop: "28px", scrollMarginTop: "80px" }}>{children}</h3>;
}
function P({ children })    { return <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "16px" }}>{children}</p>; }
function Bold({ children })  { return <strong style={{ fontWeight: 700, color: "#111827" }}>{children}</strong>; }
function Em({ children })    { return <em style={{ fontStyle: "italic", color: "#036c48" }}>{children}</em>; }
function Code({ children })  { return <code style={{ fontFamily: "monospace", backgroundColor: "#f3f4f6", padding: "2px 7px", borderRadius: "5px", fontSize: "13px", color: "#be185d" }}>{children}</code>; }

function Table({ headers = [], rows = [] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "24px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "480px" }}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i} style={{ padding: "10px 16px", backgroundColor: "#f9fafb", fontWeight: 700, color: "#374151", textAlign: "left", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa" }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "10px 16px", color: "#374151", verticalAlign: "top" }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { id: "sec-a",   label: "A — The Three Lives of Be",    level: 1 },
  { id: "sec-a1",  label: "A1 — Main / Linking Verb",     level: 2 },
  { id: "sec-a2",  label: "A2 — Auxiliary Verb",          level: 2 },
  { id: "sec-b",   label: "B — Complete Conjugation",     level: 1 },
  { id: "sec-b1",  label: "B1 — Present Simple",          level: 2 },
  { id: "sec-b2",  label: "B2 — Past Simple",             level: 2 },
  { id: "sec-b3",  label: "B3 — Future with Will",        level: 2 },
  { id: "sec-b4",  label: "B4 — Present Perfect",         level: 2 },
  { id: "sec-b5",  label: "B5 — Past Perfect",            level: 2 },
  { id: "sec-c",   label: "C — Contractions",             level: 1 },
  { id: "sec-c1",  label: "C1 — Contraction Map",         level: 2 },
  { id: "sec-d",   label: "D — Building Questions",       level: 1 },
  { id: "sec-d1",  label: "D1 — Question Words",          level: 2 },
  { id: "sec-e",   label: "E — There + Be",               level: 1 },
  { id: "sec-e1",  label: "E1 — Agreement",               level: 2 },
  { id: "sec-f",   label: "F — Progressive Structures",   level: 1 },
  { id: "sec-f1",  label: "F1 — States vs Behaviour",     level: 2 },
  { id: "sec-g",   label: "G — 12 Classic Mistakes",      level: 1 },
  { id: "sec-h",   label: "H — Pronunciation Guide",      level: 1 },
  { id: "sec-ref", label: "Quick Reference",              level: 1 },
];

function TableOfContents() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    TOC_ITEMS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <aside style={{ width: "216px", flexShrink: 0, position: "sticky", top: "80px", alignSelf: "flex-start", maxHeight: "calc(100vh - 100px)", overflowY: "auto", paddingLeft: "20px" }}>
      <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" }}>On This Page</p>
      <nav>
        {TOC_ITEMS.map(s => (
          <a key={s.id} href={`#${s.id}`}
            onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ display: "block", paddingLeft: s.level === 2 ? "12px" : "0", paddingTop: "5px", paddingBottom: "5px", fontSize: s.level === 2 ? "12px" : "13px", fontWeight: active === s.id ? 700 : s.level === 1 ? 600 : 400, color: active === s.id ? "#036c48" : s.level === 1 ? "#374151" : "#9ca3af", textDecoration: "none", borderLeft: active === s.id ? "2px solid #036c48" : "2px solid transparent", transition: "all 0.15s", lineHeight: 1.5 }}>
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

// ─── TOPIC CONTENT ────────────────────────────────────────────────────────────

function TopicContent({ onMarkRead, isRead }) {
  return (
    <div>
      <Callout type="abstract" title="Unit Overview">
        <p style={{ margin: "0 0 10px" }}>The verb <Em>be</Em> is the most frequently used word in English — and also the most irregular. Mastering <Em>be</Em> across all tenses and functions separates an intermediate learner from a confident, accurate speaker.</p>
        <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#0369a1" }}>By the end of this unit you will:</p>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          {["Command all forms of be across present, past, future and perfect structures","Distinguish be as a main verb, linking verb, and auxiliary verb","Understand contracted vs full forms and when to use each","Avoid the 12 most common mistakes with be at intermediate/upper-intermediate level","Use be confidently in progressive, passive, and emphatic structures"].map((item, i) => <li key={i} style={{ marginBottom: "4px" }}>{item}</li>)}
        </ul>
      </Callout>

      <Callout type="quote">
        <em>"To be, or not to be — that is the question."</em><br />
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>— William Shakespeare, Hamlet</span>
      </Callout>

      <H2 id="sec-a">Section A — The Three Lives of Be 🔑</H2>
      <P>Unlike most English verbs, <Em>be</Em> can wear three completely different hats in the same sentence.</P>

      <H3 id="sec-a1">A1 — Be as a Main / Linking Verb</H3>
      <P>When <Em>be</Em> is the main verb, it links a subject to a description, identity, or location. Think of it as an <Bold>equals sign</Bold>.</P>
      <Table headers={["Function","Example","What be connects"]} rows={[["Identity","She is a software engineer.","Subject → Noun"],["Quality / Adjective","The presentation was impressive.","Subject → Adjective"],["Location","Your keys are in the drawer.","Subject → Place"],["Age","He was only nineteen when he wrote that.","Subject → Age"],["Measurement","The bridge is 400 metres long.","Subject → Measurement"],["Price / Value","These seats are £60 each.","Subject → Price"],["Existence (there + be)","There are three unread messages.","Introduces existence"]]} />

      <H3 id="sec-a2">A2 — Be as an Auxiliary Verb (Helper)</H3>
      <P>Here <Em>be</Em> does not carry the main meaning — it serves another verb. You cannot drop it without breaking the sentence.</P>
      <Table headers={["Purpose","Structure","Example"]} rows={[["Progressive tenses","be + -ing","They are reviewing the contract right now."],["Passive voice","be + past participle","The report was submitted on time."],["Future (going to)","be + going to + infinitive","We are going to launch in March."],["Passive progressive","be + being + past participle","The bridge is being repaired."]]} />

      <H2 id="sec-b">Section B — The Complete Conjugation of Be 📊</H2>
      <P>English has only one verb that changes this dramatically across tenses. Study these tables to notice the patterns.</P>

      <H3 id="sec-b1">B1 — Present Simple</H3>
      <Table headers={["Subject","Positive","Negative","Contracted Neg.","Question"]} rows={[["I","am","am not","I'm not ⚠️","Am I …?"],["You","are","are not","aren't","Are you …?"],["He / She / It","is","is not","isn't","Is he/she/it …?"],["We","are","are not","aren't","Are we …?"],["They","are","are not","aren't","Are they …?"]]} />
      <Callout type="warning" title="Special Note on 'amn't'">
        In standard British and American English, <Bold>"amn't" does not exist.</Bold> The only contracted negative of "I am" is <Bold>"I'm not."</Bold><br /><br />
        In speech, informal questions use <Em>"Aren't I?"</Em>. In Scottish and Irish English, "amn't" is occasionally used — but avoid it in formal writing or exams.
      </Callout>

      <H3 id="sec-b2">B2 — Past Simple</H3>
      <Table headers={["Subject","Positive","Negative","Contracted Neg.","Question"]} rows={[["I","was","was not","wasn't","Was I …?"],["You","were","were not","weren't","Were you …?"],["He / She / It","was","was not","wasn't","Was he/she/it …?"],["We","were","were not","weren't","Were we …?"],["They","were","were not","weren't","Were they …?"]]} />

      <H3 id="sec-b3">B3 — Future with Will</H3>
      <Table headers={["Subject","Positive","Contracted","Negative","Question"]} rows={[["All subjects","will be","I'll / you'll / he'll … be","will not be / won't be","Will … be?"]]} />
      <Callout type="tip"><Code>will be</Code> is the same for <Bold>all subjects</Bold>. No agreement change needed — this makes future <Em>be</Em> considerably simpler.</Callout>

      <H3 id="sec-b4">B4 — Present Perfect</H3>
      <Table headers={["Subject","Positive","Negative","Question"]} rows={[["I / You / We / They","have been","haven't been","Have … been?"],["He / She / It","has been","hasn't been","Has … been?"]]} />
      <Callout type="example"><em>She has been very patient with us.</em> &nbsp;•&nbsp; <em>Have you ever been to Istanbul?</em></Callout>

      <H3 id="sec-b5">B5 — Past Perfect</H3>
      <Table headers={["Subject","Positive","Negative","Question"]} rows={[["All subjects","had been","hadn't been","Had … been?"]]} />
      <Callout type="example"><em>By the time she arrived, the meeting had already been over for an hour.</em></Callout>

      <H2 id="sec-c">Section C — Contractions: When, Why & How ✍️</H2>
      <P>Contractions are not laziness — they are the <Bold>natural rhythm of English</Bold>. Using full forms where a native speaker would use contractions sounds unnatural and even cold.</P>
      <Table headers={["Use Contractions (spoken / informal)","Avoid Contractions (written / formal)","Never Contract Certain Forms"]} rows={[["Everyday conversation","Academic essays","End-of-sentence position:"],["Texting and messaging","Business reports",'"Yes, I am." NOT "Yes, I\'m."'],["Informal emails","Cover letters","Short answers always use full forms"],["Fiction and dialogue","Legal documents",""],["Speaking exams (natural speech)","Formal announcements",""]]} />

      <H3 id="sec-c1">C1 — The Full Contraction Map</H3>
      <Table headers={["Full Form","Contraction","Full Form","Contraction"]} rows={[["I am","I'm","I am not","I'm not"],["You are","You're","You are not","You aren't / You're not"],["He is","He's","He is not","He isn't / He's not"],["She is","She's","She is not","She isn't / She's not"],["It is","It's","It is not","It isn't / It's not"],["We are","We're","We are not","We aren't / We're not"],["They are","They're","They are not","They aren't / They're not"],["There is","There's","There is not","There isn't"],["There are","— (no standard contraction)","There are not","There aren't"],["was not / were not","—","was not / were not","wasn't / weren't"]]} />

      <H2 id="sec-d">Section D — Building Questions with Be ❓</H2>
      <P>Forming questions with <Em>be</Em> is structurally simpler than with most other verbs because <Bold>be does NOT use do/does/did.</Bold></P>
      <Callout type="info" title="The Core Rule">
        <strong>STATEMENT:</strong> Subject + be + …<br />
        <strong>QUESTION:</strong> Be + Subject + … ?
      </Callout>
      <Table headers={["Tense","Statement","Question"]} rows={[["Present","The project is ready.","Is the project ready?"],["Present","You are the team leader.","Are you the team leader?"],["Past","The meeting was productive.","Was the meeting productive?"],["Past","They were informed in advance.","Were they informed in advance?"],["Future","The results will be published.","Will the results be published?"],["Pres. Perfect","She has been promoted.","Has she been promoted?"],["Past Perfect","The data had been corrupted.","Had the data been corrupted?"]]} />

      <H3 id="sec-d1">D1 — Question Words with Be</H3>
      <Table headers={["Question Word","Structure","Example"]} rows={[["Who","Who + is/are + subject?","Who is responsible for this section?"],["What","What + is/are + subject?","What are your main concerns?"],["Where","Where + is/are + subject?","Where were you during the call?"],["When","When + was/were + subject?","When was the deadline changed?"],["Why","Why + is/are/was/were + subject?","Why was the budget cut?"],["How","How + is/are + subject?","How is the new system working?"],["How long","How long + has/have + subject + been?","How long have you been in this role?"],["How old","How old + is/are + subject?","How old is the company?"]]} />

      <H2 id="sec-e">Section E — There + Be: Existence and Introduction 🌍</H2>
      <Callout type="info" title="Key Distinction">
        <strong>THERE + BE</strong> = introduces <Bold>existence</Bold> of something new to the listener<br />
        <strong>IT + BE</strong> = refers to something <Bold>already known</Bold>, or describes time/weather/distance
      </Callout>
      <Table headers={["There + be: new information","It + be: referring back"]} rows={[["There is a problem with your application.","It is a serious problem."],["There are 47 students in this class.","It is the largest class in the school."],["There was a long silence after the announcement.","It was an uncomfortable silence."],["Is there a pharmacy near here?","It's just around the corner."],["There will be three rounds of interviews.","It will be a challenging process."]]} />

      <H3 id="sec-e1">E1 — Agreement: there is vs there are</H3>
      <P>The verb agrees with the <Bold>noun that follows</Bold>, not with "there".</P>
      <Callout type="failure" title="Wrong">There is many options available.</Callout>
      <Callout type="success" title="Correct"><em>There are many options available.</em> → "options" is plural → use "are"</Callout>
      <Callout type="failure" title="Wrong">There are an interesting documentary on tonight.</Callout>
      <Callout type="success" title="Correct"><em>There is an interesting documentary on tonight.</em> → "a documentary" is singular → use "is"</Callout>
      <Callout type="warning" title="Informal Spoken Exception">
        In fast informal speech, <Em>"there's"</Em> is often used with plural nouns by native speakers.<br /><br />
        • <em>"There's a few things I want to discuss."</em> (spoken — acceptable)<br />
        • <em>"There are a few things I want to discuss."</em> (always correct in writing)
      </Callout>

      <H2 id="sec-f">Section F — Be in Progressive Structures ⏳</H2>
      <H3 id="sec-f1">F1 — States vs Behaviour: The Key Distinction</H3>
      <Callout type="example" title="Compare these two sentences">
        <strong>"She is being very patient."</strong> → actively behaving patiently right now (behaviour)<br /><br />
        <strong>"She is patient."</strong> → permanent quality of her character (state)
      </Callout>
      <Table headers={["State (simple be = character)","Behaviour (progressive be = current action)"]} rows={[["He is very rude.","He is being very rude to the customer. ⚠️"],["She's usually careful.","She's being unusually careless with the data today."],["The children are quite well-behaved.","The children are being absolutely impossible this morning."],["You're selfish.","You're being selfish by not sharing the credit."],["I'm not silly.","I wasn't being silly — I was making a serious suggestion."]]} />
      <Callout type="danger" title="Adjectives that CANNOT be used with progressive be">
        Feelings as states: <em>depressed, tired, excited, worried, happy, sad</em><br /><br />
        ❌ <em>"She is being depressed."</em> → ✅ <em>"She is depressed."</em><br />
        ❌ <em>"I'm being tired."</em> → ✅ <em>"I'm tired."</em>
      </Callout>

      <H2 id="sec-g">Section G — 12 Classic Mistakes with Be 🚨</H2>
      {[
        { wrong: "She don't be at home.",                               right: "She isn't at home.",                             note: "NEVER use do/does/did to negate be." },
        { wrong: "Are they be students?",                               right: "Are they students?",                             note: "NEVER add be after the question form of be." },
        { wrong: "There is many problems.",                             right: "There are many problems.",                       note: "be agrees with the noun after it, not with 'there'." },
        { wrong: "I am agree with you.",                                right: "I agree with you.",                              note: '"Agree" is a full verb. Never use be + agree.' },
        { wrong: "He is very boring in class.",                         right: "He is very bored in class.",                     note: "-ed = how a person feels; -ing = what causes the feeling." },
        { wrong: "I am boring of this routine.",                        right: "I am bored of / with this routine.",             note: '"Bored" not "boring" for personal feelings.' },
        { wrong: "The news are shocking.",                              right: "The news is shocking.",                          note: '"News" is always singular. Same: "information", "advice".' },
        { wrong: "She was being very tired yesterday.",                 right: "She was very tired yesterday.",                  note: "States/feelings cannot be progressive." },
        { wrong: "I amn't sure about that.",                            right: "I'm not sure about that.",                       note: '"amn\'t" does not exist in standard English.' },
        { wrong: "Where was you yesterday?",                            right: "Where were you yesterday?",                      note: '"You" always takes "were", never "was".' },
        { wrong: "Is there a problems with the system?",                right: "Are there problems? / Is there a problem?",      note: "Number must match: singular = is, plural = are." },
        { wrong: "The advice they gave us were surprisingly practical.",right: "The advice they gave us was surprisingly practical.", note: '"Advice" is uncountable — always singular.' },
      ].map((m, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Mistake #{i + 1}</p>
          <Callout type="failure" title="Wrong">{m.wrong}</Callout>
          <Callout type="success" title="Correct"><em>{m.right}</em><br /><span style={{ fontSize: "13px", color: "#374151" }}>→ {m.note}</span></Callout>
        </div>
      ))}

      <H2 id="sec-h">Section H — Pronunciation Guide 🎤</H2>
      <Table headers={["Word","IPA","Tip"]} rows={[["am","/æm/ → /əm/ (weak)",'Natural: "I\'m" /aɪm/ or "Whatəm I doing?"'],["are","/ɑː/ → /ə/ (weak)",'"You are" reduces to /ə/ in flow.'],["is","/ɪz/ → /z/ or /s/ (weak)",'After voiced: "he\'s" = /hiːz/. After voiceless: "it\'s" = /ɪts/'],["was","/wɒz/ → /wəz/ (weak)",'Reduces: "He was there" → /hiː wəz ðeə/'],["were","/wɜː/ → /wə/ (weak)",'"They were" → /ðeɪwə/. Strong form used for contrast.'],["isn't","/ɪzənt/",'Do NOT pronounce the "t" in natural speech.'],["wasn't","/wɒzənt/",'Not "woz-ant." Correct: /wɒzənt/'],["weren't","/wɜːnt/",'Rhymes with "burnt." NOT "we-rent".'],["being","/biːɪŋ/",'Two syllables: BEE-ing. Not "bean".'],["been","/biːn/ (British) / /bɪn/ (American)",'British: rhymes with "seen." American: rhymes with "bin."']]} />

      <H2 id="sec-ref">Quick Reference — All Rules at a Glance 📋</H2>
      <Table headers={["Rule / Structure","Example","Note"]} rows={[["be as main verb","She is a doctor.","Links subject to description/identity/location"],["be as auxiliary (progressive)","We are reviewing the data.","be + -ing verb"],["be as auxiliary (passive)","The form was submitted.","be + past participle"],["Present: I am","I'm ready. / Am I late?","Never 'I are' or 'I is'"],["Present: he/she/it is","She's not here.","Third-person singular always takes is"],["Present: you/we/they are","You aren't wrong.","Plural and you always take are"],["Past: I/he/she/it was","It wasn't difficult.","Only singular subjects take was"],["Past: you/we/they were","Where were you?","Plural and you always take were"],["Future: will be","It won't be easy.","Same for ALL subjects"],["Pres. perfect: have/has been","I have been here before.","have = I/you/we/they; has = he/she/it"],["there is + singular","There is a message.","Agreement with NOUN, not 'there'"],["there are + plural","There are five candidates.","Don't write 'there is five candidates'"],["Progressive be = behaviour","She is being patient.","Simple be for states; progressive for actions"],["Progressive be ❌ for feelings","I'm tired. NOT I'm being tired.","Tired, happy, sad = states"],["No do/does/did with be","She isn't ✅ NOT She doesn't be ❌","be makes its own negatives"],["Contraction: end of clause","Yes, I am. NOT Yes, I'm.","Never contract at end of clause"],["be + agree ❌","I agree. NOT I am agree.","agree, belong, matter = full verbs"],["news / advice / information","The news is ✅","These look plural but are grammatically singular"]]} />

      <Callout type="quote">
        <em>"The beginning of wisdom is the definition of terms."</em><br />
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>— Socrates</span>
      </Callout>

      {/* Mark as Read */}
      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "2px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          {isRead ? "✓ You have completed this topic." : "Finished reading? Mark this topic as complete."}
        </p>
        <button onClick={onMarkRead} disabled={isRead}
          style={{ padding: "12px 28px", backgroundColor: isRead ? "#d1fae5" : "#036c48", color: isRead ? "#16a34a" : "#ffffff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: isRead ? "default" : "pointer" }}>
          {isRead ? "✓ Topic Completed" : "Mark as Read"}
        </button>
      </div>
    </div>
  );
}

// ─── PRACTICE CONTENT ────────────────────────────────────────────────────────

function Ex1ChooseForm() {
  const questions = [
    { id: 1,  prompt: "Layla ________ only 24 years old when she registered her first company.",                        answer: "was",        hint: "Past simple, singular subject" },
    { id: 2,  prompt: "At first, her office ________ a tiny rented room above a bakery.",                              answer: "was",        hint: "Past simple, singular (office)" },
    { id: 3,  prompt: "Her investors ________ not particularly enthusiastic at the beginning.",                         answer: "were",       hint: "Past simple, plural (investors)" },
    { id: 4,  prompt: "Now, three years later, her team ________ fifteen people strong.",                               answer: "is",         hint: "Present simple, singular collective noun" },
    { id: 5,  prompt: "________ her product really as good as the reviews say?",                                        answer: "Is",         hint: "Present yes/no question: be before subject" },
    { id: 6,  prompt: "She ________ featured on three different podcasts this month.",                                  answer: "has been",   hint: "Present perfect — recent action relevant now" },
    { id: 7,  prompt: "Two years ago, she ________ barely able to cover her monthly expenses.",                         answer: "was",        hint: "Past simple, singular" },
    { id: 8,  prompt: "The next six months ________ the most critical of our journey.",                                answer: "will be",    hint: "Future prediction, same for all subjects" },
    { id: 9,  prompt: "The headquarters ________ in Seoul; a London office ________ planned for next year.",            answer: "is / is",    hint: "Singular present + future passive" },
    { id: 10, prompt: "Had Layla known how difficult it would ________, she says she would still have started anyway.", answer: "be",         hint: "After modal 'would' — bare infinitive" },
    { id: 11, prompt: "Her parents ________ sceptical at first, but now they ________ her biggest supporters.",         answer: "were / are", hint: "Past plural + present plural" },
    { id: 12, prompt: "By the time the product launched, it ________ in development for over eighteen months.",         answer: "had been",   hint: "Past perfect: completed before another past event" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const check = (id, val) => (val || "").toLowerCase().trim() === questions.find(q => q.id === id).answer.toLowerCase();
  const score = submitted ? questions.filter(q => check(q.id, answers[q.id])).length : 0;

  return (
    <div>
      <Callout type="note" title="Exercise 1 — Choose the Correct Form">
        Complete each sentence with the correct form of <Em>be</Em>. Follow the story of entrepreneur <strong>Layla</strong> across different time periods.
      </Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${submitted ? (check(q.id, answers[q.id]) ? "#86efac" : "#fecdd3") : "#e5e7eb"}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
          <p style={{ fontSize: "14px", color: "#374151", marginBottom: "10px", lineHeight: 1.6 }}><strong>{q.id}.</strong> {q.prompt}</p>
          <input type="text" placeholder="Your answer…" value={answers[q.id] || ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} disabled={submitted}
            style={{ width: "100%", padding: "9px 13px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: submitted ? (check(q.id, answers[q.id]) ? "#f0fdf4" : "#fff1f2") : "#fafafa" }} />
          {submitted && <p style={{ marginTop: "8px", fontSize: "13px", fontWeight: 600, color: check(q.id, answers[q.id]) ? "#16a34a" : "#dc2626" }}>
            {check(q.id, answers[q.id]) ? "✓ Correct!" : `✗ Answer: ${q.answer}`}
            <span style={{ color: "#6b7280", fontWeight: 400, marginLeft: "8px" }}>— {q.hint}</span>
          </p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
        {!submitted
          ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span>
              <button onClick={() => { setSubmitted(false); setAnswers({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

function Ex2ThereIs() {
  const questions = [
    { id: 1,  prompt: "________ a stunning view of the river from my office window.",          answer: "There is"      },
    { id: 2,  prompt: "________ over two hundred applicants for the position.",                answer: "There were"    },
    { id: 3,  prompt: "________ no easy answers to this problem.",                            answer: "There are"     },
    { id: 4,  prompt: "By tomorrow morning, ________ a formal announcement from the CEO.",    answer: "there will be" },
    { id: 5,  prompt: "When we arrived at the venue, ________ nobody at the reception desk.", answer: "there was"     },
    { id: 6,  prompt: "________ something unusual about the way he answered the question.",   answer: "There was"     },
    { id: 7,  prompt: "________ three serious errors in your first draft.",                   answer: "There are"     },
    { id: 8,  prompt: "________ a time when this technology simply didn't exist.",            answer: "There was"     },
    { id: 9,  prompt: "________ been significant progress since we last met.",                answer: "There has"     },
    { id: 10, prompt: "How many languages ________ in daily use in Singapore?",              answer: "are there"     },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const check = (id, val) => (val || "").toLowerCase().trim() === questions.find(q => q.id === id).answer.toLowerCase();
  const score = submitted ? questions.filter(q => check(q.id, answers[q.id])).length : 0;

  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 2 — There Is / There Are">
        Complete with <Em>there is, there are, there was, there were,</Em> or <Em>there will be</Em>.
      </Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${submitted ? (check(q.id, answers[q.id]) ? "#86efac" : "#fecdd3") : "#e5e7eb"}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
          <p style={{ fontSize: "14px", color: "#374151", marginBottom: "10px" }}><strong>{q.id}.</strong> {q.prompt}</p>
          <input type="text" placeholder="Your answer…" value={answers[q.id] || ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} disabled={submitted}
            style={{ width: "100%", padding: "9px 13px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: submitted ? (check(q.id, answers[q.id]) ? "#f0fdf4" : "#fff1f2") : "#fafafa" }} />
          {submitted && <p style={{ marginTop: "8px", fontSize: "13px", fontWeight: 600, color: check(q.id, answers[q.id]) ? "#16a34a" : "#dc2626" }}>
            {check(q.id, answers[q.id]) ? "✓ Correct!" : `✗ Answer: ${q.answer}`}
          </p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
        {!submitted
          ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span>
              <button onClick={() => { setSubmitted(false); setAnswers({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

function Ex4StateOrBehaviour() {
  const questions = [
    { id: 1, situation: "Your colleague, normally very polite, has just interrupted three people in a row.",  a: "He is rude.",               b: "He is being rude.",              answer: "B", why: "Normally polite (state). Right now doing something rude (behaviour = progressive)." },
    { id: 2, situation: "A friend asks why you look so pale and sluggish at work today.",                    a: "I am being tired.",         b: "I am tired.",                    answer: "B", why: "Tiredness is a feeling/state. Never use 'being' with tired." },
    { id: 3, situation: "Your manager clearly wants a decision today.",                                      a: "She is impatient.",         b: "She is being impatient.",        answer: "B", why: "She normally has a calm character. Currently behaving impatiently (behaviour)." },
    { id: 4, situation: "A child who always causes trouble is, unusually, sitting quietly.",                 a: "She is very well-behaved.", b: "She is being very well-behaved.",answer: "B", why: "Unusual for her — temporary behaviour, not general character." },
    { id: 5, situation: "Describing a permanent personality trait of your best friend.",                     a: "She is being incredibly kind.", b: "She is incredibly kind.",     answer: "B", why: "Permanent character trait = simple be, not progressive." },
    { id: 6, situation: "Your team member gives a brilliantly clear explanation today.",                     a: "He is being very articulate today.", b: "He is very articulate.", answer: "A", why: '"Today" suggests temporary behaviour — progressive be is appropriate.' },
  ];
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 4 — State or Behaviour?">
        Choose the correct option. Is <Em>be</Em> describing a <Bold>permanent state</Bold> or a <Bold>current behaviour</Bold>?
      </Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "14px", fontStyle: "italic" }}>Situation {q.id}: {q.situation}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["A", "B"].map((opt) => {
              const isChosen = selected[q.id] === opt;
              const isCorrect = opt === q.answer;
              let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
              if (submitted && isChosen && isCorrect)  { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              if (submitted && isChosen && !isCorrect) { bg = "#fff1f2"; border = "#fecdd3"; color = "#dc2626"; }
              if (submitted && !isChosen && isCorrect) { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              return (
                <button key={opt} onClick={() => !submitted && setSelected({ ...selected, [q.id]: opt })}
                  style={{ padding: "12px 16px", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: bg, color, textAlign: "left", cursor: submitted ? "default" : "pointer", fontSize: "14px", fontWeight: isChosen ? 700 : 400 }}>
                  <strong>{opt})</strong> {opt === "A" ? q.a : q.b}
                </button>
              );
            })}
          </div>
          {submitted && <p style={{ marginTop: "12px", fontSize: "13px", color: "#374151", backgroundColor: "#f9fafb", padding: "10px 14px", borderRadius: "8px" }}><strong>Why:</strong> {q.why}</p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        {!submitted
          ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <button onClick={() => { setSubmitted(false); setSelected({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button>}
      </div>
    </div>
  );
}

function PracticeContent({ onMarkDone, isDone }) {
  return (
    <div>
      <Callout type="info" title="How to Use This Practice File">
        Work through exercises in order. <Bold>Do not check answers until you finish each exercise.</Bold> Read every explanation — even for correct answers. The explanation tells you <Em>WHY</Em>, not just WHAT.
      </Callout>
      <Ex1ChooseForm />
      <Ex2ThereIs />
      <Ex4StateOrBehaviour />
      <div style={{ marginTop: "32px", padding: "20px 24px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>Exercises 3, 5, 6, 7 & 8</p>
        <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: 1.7 }}>Error Correction, Dialogue Repair, Question Formation, Reading Passage, and Free Writing require written responses. Complete them in your notebook.</p>
      </div>
      <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "2px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          {isDone ? "✓ Practice marked as complete." : "Finished all exercises? Mark practice as complete."}
        </p>
        <button onClick={onMarkDone} disabled={isDone}
          style={{ padding: "12px 28px", backgroundColor: isDone ? "#d1fae5" : "#036c48", color: isDone ? "#16a34a" : "#ffffff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: isDone ? "default" : "pointer" }}>
          {isDone ? "✓ Practice Completed" : "Mark as Done"}
        </button>
      </div>
    </div>
  );
}

// ─── Unit Metadata ────────────────────────────────────────────────────────────

const UNIT_META = {
  "unit-1": { title: "BE: Forms, Functions & Mastery", level: "Intermediate – Upper Intermediate", time: "45 mins", questions: 40 },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UnitClient({ subject, bookId, unitId }) {
  const { user } = useAuth();
  const [activeTab,        setActiveTab]        = useState("topic");
  const [showLeft,         setShowLeft]          = useState(true);
  const [showRight,        setShowRight]         = useState(true);
  const [topicRead,        setTopicRead]         = useState(false);
  const [practiceDone,     setPracticeDone]      = useState(false);
  const [saving,           setSaving]            = useState(false);

  const meta         = UNIT_META[unitId] || { title: unitId, level: "—", time: "—", questions: 0 };
  const subjectLabel = subject ? subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, " ") : "English";
  const bookLabel    = bookId  ? bookId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "Book";
  const unitLabel    = unitId  ? unitId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "Unit";

  // Load progress
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "progress", user.uid, bookId, unitId)).then(snap => {
      if (snap.exists()) {
        setTopicRead(!!snap.data().topicCompleted);
        setPracticeDone(!!snap.data().practiceCompleted);
      }
    }).catch(() => {});
  }, [user, bookId, unitId]);

  const saveProgress = async (updates) => {
    if (!user) return;
    setSaving(true);
    try { await setDoc(doc(db, "progress", user.uid, bookId, unitId), { ...updates, updatedAt: new Date() }, { merge: true }); }
    catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleMarkRead = async () => { setTopicRead(true);    await saveProgress({ topicCompleted: true,    topicCompletedAt:    new Date() }); };
  const handleMarkDone = async () => { setPracticeDone(true); await saveProgress({ practiceCompleted: true, practiceCompletedAt: new Date() }); };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 20px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            {/* Left sidebar toggle */}
            <button onClick={() => setShowLeft(v => !v)} title={showLeft ? "Hide sidebar" : "Show sidebar"}
              style={{ width: "34px", height: "34px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: showLeft ? "#d1fae5" : "#f9fafb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px", color: showLeft ? "#036c48" : "#9ca3af" }}>menu</span>
            </button>
            <Link href="/" style={{ fontSize: "17px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px", flexShrink: 0 }}>Chashma Learn</Link>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", color: "#9ca3af", overflow: "hidden" }}>
              <span style={{ color: "#e5e7eb" }}>›</span>
              <Link href={`/english/${subject}`} style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>Grammar</Link>
              <span style={{ color: "#e5e7eb" }}>›</span>
              <Link href={`/english/${subject}/${bookId}`} style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>Unified Grammar</Link>
              <span style={{ color: "#e5e7eb" }}>›</span>
              <span style={{ color: "#374151", fontWeight: 600, whiteSpace: "nowrap" }}>{unitLabel}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {saving && <span style={{ fontSize: "12px", color: "#9ca3af" }}>Saving…</span>}
            {topicRead    && <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px" }}>Topic ✓</span>}
            {practiceDone && <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px" }}>Practice ✓</span>}
            {/* Right TOC toggle */}
            <button onClick={() => setShowRight(v => !v)} title={showRight ? "Hide contents" : "Show contents"}
              style={{ width: "34px", height: "34px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: showRight ? "#d1fae5" : "#f9fafb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px", color: showRight ? "#036c48" : "#9ca3af" }}>toc</span>
            </button>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", paddingTop: "64px" }}>

        {/* LEFT SIDEBAR */}
        {showLeft && (
          <aside style={{ width: "260px", flexShrink: 0, height: "calc(100vh - 64px)", position: "sticky", top: "64px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>language</span>
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>General English</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{subjectLabel}</p>
                </div>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
              {[
                { icon: "menu_book",            label: "Oxford Word Skills", href: "/english/oxford-word-skills" },
                { icon: "spellcheck",           label: "Grammar",            href: "/english/grammar"            },
                { icon: "translate",            label: "Vocabulary",         href: "/english/vocabulary"         },
                { icon: "record_voice_over",    label: "Pronunciation",      href: "/english/pronunciation"      },
                { icon: "link",                 label: "Collocations",       href: "/english/collocations"       },
                { icon: "format_list_bulleted", label: "Phrasal Verbs",      href: "/english/phrasal-verbs"      },
                { icon: "auto_stories",         label: "Idioms",             href: "/english/idioms"             },
                { icon: "edit_note",            label: "Writing",            href: "/english/writing"            },
              ].map((tab) => {
                const isActive = subject && tab.href.includes(subject);
                return (
                  <Link key={tab.href} href={tab.href}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", marginBottom: "2px", textDecoration: "none", backgroundColor: isActive ? "#d1fae5" : "transparent", color: isActive ? "#036c48" : "#6b7280", fontWeight: isActive ? 700 : 500, fontSize: "14px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{tab.icon}</span>
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #f3f4f6" }}>
              <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
                All Modes
              </Link>
            </div>
          </aside>
        )}

        {/* MAIN + RIGHT TOC */}
        <div style={{ flex: 1, display: "flex", minWidth: 0, padding: "48px", gap: "0", alignItems: "flex-start" }}>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, maxWidth: showRight && activeTab === "topic" ? "680px" : "860px", minWidth: 0 }}>

            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{meta.level}</span>
            </div>

            <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "32px" }}>{meta.title}</h1>

            <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
              {[{ icon: "schedule", label: "Learning Time", value: meta.time }, { icon: "quiz", label: "Exercises", value: `${meta.questions}+` }].map((m) => (
                <div key={m.label} style={{ flex: 1, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>{m.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{m.label}</p>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "#111827" }}>{m.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "4px", backgroundColor: "#f3f4f6", borderRadius: "10px", padding: "4px", marginBottom: "40px", width: "fit-content" }}>
              {[{ id: "topic", label: "Topic", icon: "menu_book" }, { id: "practice", label: "Practice", icon: "edit" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 700, backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent", color: activeTab === tab.id ? "#036c48" : "#9ca3af", boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{tab.icon}</span>
                  {tab.label}
                  {tab.id === "topic"    && topicRead    && <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#036c48" }} />}
                  {tab.id === "practice" && practiceDone && <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#036c48" }} />}
                </button>
              ))}
            </div>

            {activeTab === "topic"    && <TopicContent    onMarkRead={handleMarkRead} isRead={topicRead}    />}
            {activeTab === "practice" && <PracticeContent onMarkDone={handleMarkDone} isDone={practiceDone} />}
          </div>

          {/* RIGHT TOC */}
          {showRight && activeTab === "topic" && <TableOfContents />}
        </div>
      </div>
    </div>
  );
}
