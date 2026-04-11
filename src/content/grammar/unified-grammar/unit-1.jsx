"use client";
import { useState } from "react";
import Callout from "@/components/unit/Callout";
import Table from "@/components/unit/Table";
import { H2, H3, P, Bold, Em, Code } from "@/components/unit/Typography";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const meta = {
  title:     "BE: Forms, Functions & Mastery",
  level:     "Intermediate – Upper Intermediate",
  time:      "45 mins",
  questions: 40,
};

// ─── Table of Contents ────────────────────────────────────────────────────────

export const tocItems = [
  { id: "sec-a",   label: "A — The Three Lives of Be",   level: 1 },
  { id: "sec-a1",  label: "A1 — Main / Linking Verb",    level: 2 },
  { id: "sec-a2",  label: "A2 — Auxiliary Verb",         level: 2 },
  { id: "sec-b",   label: "B — Complete Conjugation",    level: 1 },
  { id: "sec-b1",  label: "B1 — Present Simple",         level: 2 },
  { id: "sec-b2",  label: "B2 — Past Simple",            level: 2 },
  { id: "sec-b3",  label: "B3 — Future with Will",       level: 2 },
  { id: "sec-b4",  label: "B4 — Present Perfect",        level: 2 },
  { id: "sec-b5",  label: "B5 — Past Perfect",           level: 2 },
  { id: "sec-c",   label: "C — Contractions",            level: 1 },
  { id: "sec-c1",  label: "C1 — Contraction Map",        level: 2 },
  { id: "sec-d",   label: "D — Building Questions",      level: 1 },
  { id: "sec-d1",  label: "D1 — Question Words",         level: 2 },
  { id: "sec-e",   label: "E — There + Be",              level: 1 },
  { id: "sec-e1",  label: "E1 — Agreement",              level: 2 },
  { id: "sec-f",   label: "F — Progressive Structures",  level: 1 },
  { id: "sec-f1",  label: "F1 — States vs Behaviour",    level: 2 },
  { id: "sec-g",   label: "G — 12 Classic Mistakes",     level: 1 },
  { id: "sec-h",   label: "H — Pronunciation Guide",     level: 1 },
  { id: "sec-ref", label: "Quick Reference",             level: 1 },
];

// ─── Topic ────────────────────────────────────────────────────────────────────

export function TopicContent() {
  return (
    <div>
      <Callout type="abstract" title="Unit Overview">
        <p style={{ margin: "0 0 10px" }}>The verb <Em>be</Em> is the most frequently used word in English — and also the most irregular. Mastering <Em>be</Em> across all tenses separates an intermediate learner from a confident, accurate speaker.</p>
        <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#0369a1" }}>By the end of this unit you will:</p>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          {["Command all forms of be across present, past, future and perfect structures","Distinguish be as a main verb, linking verb, and auxiliary verb","Understand contracted vs full forms and when to use each","Avoid the 12 most common mistakes with be","Use be confidently in progressive, passive, and emphatic structures"].map((item, i) => <li key={i} style={{ marginBottom: "4px" }}>{item}</li>)}
        </ul>
      </Callout>
      <Callout type="quote"><em>"To be, or not to be — that is the question."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— William Shakespeare, Hamlet</span></Callout>

      <H2 id="sec-a">Section A — The Three Lives of Be 🔑</H2>
      <P>Unlike most English verbs, <Em>be</Em> can wear three completely different hats in the same sentence.</P>
      <H3 id="sec-a1">A1 — Be as a Main / Linking Verb</H3>
      <P>When <Em>be</Em> is the main verb, it links a subject to a description, identity, or location. Think of it as an <Bold>equals sign</Bold>.</P>
      <Table headers={["Function","Example","What be connects"]} rows={[["Identity","She is a software engineer.","Subject → Noun"],["Quality / Adjective","The presentation was impressive.","Subject → Adjective"],["Location","Your keys are in the drawer.","Subject → Place"],["Age","He was only nineteen when he wrote that.","Subject → Age"],["Measurement","The bridge is 400 metres long.","Subject → Measurement"],["Price / Value","These seats are £60 each.","Subject → Price"],["Existence (there + be)","There are three unread messages.","Introduces existence"]]} />
      <H3 id="sec-a2">A2 — Be as an Auxiliary Verb (Helper)</H3>
      <P>Here <Em>be</Em> does not carry the main meaning — it serves another verb.</P>
      <Table headers={["Purpose","Structure","Example"]} rows={[["Progressive tenses","be + -ing","They are reviewing the contract right now."],["Passive voice","be + past participle","The report was submitted on time."],["Future (going to)","be + going to + infinitive","We are going to launch in March."],["Passive progressive","be + being + past participle","The bridge is being repaired."]]} />

      <H2 id="sec-b">Section B — The Complete Conjugation of Be 📊</H2>
      <H3 id="sec-b1">B1 — Present Simple</H3>
      <Table headers={["Subject","Positive","Negative","Contracted Neg.","Question"]} rows={[["I","am","am not","I'm not ⚠️","Am I …?"],["You","are","are not","aren't","Are you …?"],["He / She / It","is","is not","isn't","Is he/she/it …?"],["We","are","are not","aren't","Are we …?"],["They","are","are not","aren't","Are they …?"]]} />
      <Callout type="warning" title="Special Note on 'amn't'">In standard English, <Bold>"amn't" does not exist.</Bold> The only contracted negative of "I am" is <Bold>"I'm not."</Bold></Callout>
      <H3 id="sec-b2">B2 — Past Simple</H3>
      <Table headers={["Subject","Positive","Negative","Contracted Neg.","Question"]} rows={[["I","was","was not","wasn't","Was I …?"],["You","were","were not","weren't","Were you …?"],["He / She / It","was","was not","wasn't","Was he/she/it …?"],["We","were","were not","weren't","Were we …?"],["They","were","were not","weren't","Were they …?"]]} />
      <H3 id="sec-b3">B3 — Future with Will</H3>
      <Table headers={["Subject","Positive","Contracted","Negative","Question"]} rows={[["All subjects","will be","I'll / you'll / he'll … be","will not be / won't be","Will … be?"]]} />
      <Callout type="tip"><Code>will be</Code> is the same for <Bold>all subjects</Bold>. No agreement change needed.</Callout>
      <H3 id="sec-b4">B4 — Present Perfect</H3>
      <Table headers={["Subject","Positive","Negative","Question"]} rows={[["I / You / We / They","have been","haven't been","Have … been?"],["He / She / It","has been","hasn't been","Has … been?"]]} />
      <Callout type="example"><em>She has been very patient with us.</em> &nbsp;•&nbsp; <em>Have you ever been to Istanbul?</em></Callout>
      <H3 id="sec-b5">B5 — Past Perfect</H3>
      <Table headers={["Subject","Positive","Negative","Question"]} rows={[["All subjects","had been","hadn't been","Had … been?"]]} />
      <Callout type="example"><em>By the time she arrived, the meeting had already been over for an hour.</em></Callout>

      <H2 id="sec-c">Section C — Contractions: When, Why & How ✍️</H2>
      <Table headers={["Use Contractions (spoken / informal)","Avoid Contractions (written / formal)","Never Contract Certain Forms"]} rows={[["Everyday conversation","Academic essays","End-of-sentence position:"],["Texting and messaging","Business reports",'"Yes, I am." NOT "Yes, I\'m."'],["Informal emails","Cover letters","Short answers always use full forms"],["Fiction and dialogue","Legal documents",""],["Speaking exams (natural speech)","Formal announcements",""]]} />
      <H3 id="sec-c1">C1 — The Full Contraction Map</H3>
      <Table headers={["Full Form","Contraction","Full Form","Contraction"]} rows={[["I am","I'm","I am not","I'm not"],["You are","You're","You are not","You aren't / You're not"],["He is","He's","He is not","He isn't / He's not"],["She is","She's","She is not","She isn't / She's not"],["It is","It's","It is not","It isn't / It's not"],["We are","We're","We are not","We aren't / We're not"],["They are","They're","They are not","They aren't / They're not"],["There is","There's","There is not","There isn't"],["There are","— (no standard contraction)","There are not","There aren't"],["was not / were not","—","was not / were not","wasn't / weren't"]]} />

      <H2 id="sec-d">Section D — Building Questions with Be ❓</H2>
      <Callout type="info" title="The Core Rule"><strong>STATEMENT:</strong> Subject + be + …<br /><strong>QUESTION:</strong> Be + Subject + … ?</Callout>
      <Table headers={["Tense","Statement","Question"]} rows={[["Present","The project is ready.","Is the project ready?"],["Present","You are the team leader.","Are you the team leader?"],["Past","The meeting was productive.","Was the meeting productive?"],["Past","They were informed in advance.","Were they informed in advance?"],["Future","The results will be published.","Will the results be published?"],["Pres. Perfect","She has been promoted.","Has she been promoted?"],["Past Perfect","The data had been corrupted.","Had the data been corrupted?"]]} />
      <H3 id="sec-d1">D1 — Question Words with Be</H3>
      <Table headers={["Question Word","Structure","Example"]} rows={[["Who","Who + is/are + subject?","Who is responsible for this section?"],["What","What + is/are + subject?","What are your main concerns?"],["Where","Where + is/are + subject?","Where were you during the call?"],["When","When + was/were + subject?","When was the deadline changed?"],["Why","Why + is/are/was/were + subject?","Why was the budget cut?"],["How","How + is/are + subject?","How is the new system working?"],["How long","How long + has/have + subject + been?","How long have you been in this role?"],["How old","How old + is/are + subject?","How old is the company?"]]} />

      <H2 id="sec-e">Section E — There + Be: Existence and Introduction 🌍</H2>
      <Callout type="info" title="Key Distinction"><strong>THERE + BE</strong> = introduces <Bold>existence</Bold> of something new<br /><strong>IT + BE</strong> = refers to something <Bold>already known</Bold>, or describes time/weather/distance</Callout>
      <Table headers={["There + be: new information","It + be: referring back"]} rows={[["There is a problem with your application.","It is a serious problem."],["There are 47 students in this class.","It is the largest class in the school."],["There was a long silence after the announcement.","It was an uncomfortable silence."],["Is there a pharmacy near here?","It's just around the corner."],["There will be three rounds of interviews.","It will be a challenging process."]]} />
      <H3 id="sec-e1">E1 — Agreement: there is vs there are</H3>
      <P>The verb agrees with the <Bold>noun that follows</Bold>, not with "there".</P>
      <Callout type="failure" title="Wrong">There is many options available.</Callout>
      <Callout type="success" title="Correct"><em>There are many options available.</em> → "options" is plural → use "are"</Callout>
      <Callout type="failure" title="Wrong">There are an interesting documentary on tonight.</Callout>
      <Callout type="success" title="Correct"><em>There is an interesting documentary on tonight.</em> → singular → use "is"</Callout>

      <H2 id="sec-f">Section F — Be in Progressive Structures ⏳</H2>
      <H3 id="sec-f1">F1 — States vs Behaviour</H3>
      <Callout type="example" title="Compare"><strong>"She is being very patient."</strong> → actively behaving patiently (behaviour)<br /><br /><strong>"She is patient."</strong> → permanent quality of her character (state)</Callout>
      <Table headers={["State (simple be = character)","Behaviour (progressive be = current action)"]} rows={[["He is very rude.","He is being very rude to the customer. ⚠️"],["She's usually careful.","She's being unusually careless with the data today."],["The children are quite well-behaved.","The children are being absolutely impossible this morning."]]} />
      <Callout type="danger" title="Cannot use progressive be for feelings">
        ❌ <em>"She is being depressed."</em> → ✅ <em>"She is depressed."</em><br />
        ❌ <em>"I'm being tired."</em> → ✅ <em>"I'm tired."</em>
      </Callout>

      <H2 id="sec-g">Section G — 12 Classic Mistakes with Be 🚨</H2>
      {[
        { wrong: "She don't be at home.",                               right: "She isn't at home.",                      note: "NEVER use do/does/did to negate be." },
        { wrong: "Are they be students?",                               right: "Are they students?",                      note: "NEVER add be after the question form of be." },
        { wrong: "There is many problems.",                             right: "There are many problems.",                note: "be agrees with the noun after it, not with 'there'." },
        { wrong: "I am agree with you.",                                right: "I agree with you.",                       note: '"Agree" is a full verb. Never use be + agree.' },
        { wrong: "He is very boring in class.",                         right: "He is very bored in class.",              note: "-ed = how a person feels; -ing = what causes the feeling." },
        { wrong: "I am boring of this routine.",                        right: "I am bored of / with this routine.",      note: '"Bored" not "boring" for personal feelings.' },
        { wrong: "The news are shocking.",                              right: "The news is shocking.",                   note: '"News" is always singular. Same: "information", "advice".' },
        { wrong: "She was being very tired yesterday.",                 right: "She was very tired yesterday.",           note: "States/feelings cannot be progressive." },
        { wrong: "I amn't sure about that.",                            right: "I'm not sure about that.",                note: '"amn\'t" does not exist in standard English.' },
        { wrong: "Where was you yesterday?",                            right: "Where were you yesterday?",               note: '"You" always takes "were", never "was".' },
        { wrong: "Is there a problems with the system?",                right: "Are there problems? / Is there a problem?", note: "Number must match: singular = is, plural = are." },
        { wrong: "The advice they gave us were surprisingly practical.", right: "The advice they gave us was surprisingly practical.", note: '"Advice" is uncountable — always singular.' },
      ].map((m, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Mistake #{i + 1}</p>
          <Callout type="failure" title="Wrong">{m.wrong}</Callout>
          <Callout type="success" title="Correct"><em>{m.right}</em><br /><span style={{ fontSize: "13px", color: "#374151" }}>→ {m.note}</span></Callout>
        </div>
      ))}

      <H2 id="sec-h">Section H — Pronunciation Guide 🎤</H2>
      <Table headers={["Word","IPA","Tip"]} rows={[["am","/æm/ → /əm/ (weak)",'Natural: "I\'m" /aɪm/ or "Whatəm I doing?"'],["are","/ɑː/ → /ə/ (weak)",'"You are" reduces to /ə/ in flow.'],["is","/ɪz/ → /z/ or /s/ (weak)",'After voiced: "he\'s" = /hiːz/. After voiceless: "it\'s" = /ɪts/'],["was","/wɒz/ → /wəz/ (weak)",'Reduces: "He was there" → /hiː wəz ðeə/'],["were","/wɜː/ → /wə/ (weak)",'"They were" → /ðeɪwə/. Strong form used for contrast.'],["isn't","/ɪzənt/",'Do NOT pronounce the "t" in natural speech.'],["wasn't","/wɒzənt/",'Not "woz-ant." Correct: /wɒzənt/'],["weren't","/wɜːnt/",'Rhymes with "burnt." NOT "we-rent".'],["being","/biːɪŋ/",'Two syllables: BEE-ing. Not "bean".'],["been","/biːn/ (British) / /bɪn/ (American)",'British: rhymes with "seen." American: rhymes with "bin."']]} />

      <H2 id="sec-ref">Quick Reference 📋</H2>
      <Table headers={["Rule / Structure","Example","Note"]} rows={[["be as main verb","She is a doctor.","Links subject to description/identity/location"],["be as auxiliary (progressive)","We are reviewing the data.","be + -ing verb"],["be as auxiliary (passive)","The form was submitted.","be + past participle"],["Present: I am","I'm ready. / Am I late?","Never 'I are' or 'I is'"],["Present: he/she/it is","She's not here.","Third-person singular always takes is"],["Present: you/we/they are","You aren't wrong.","Plural and you always take are"],["Past: I/he/she/it was","It wasn't difficult.","Only singular subjects take was"],["Past: you/we/they were","Where were you?","Plural and you always take were"],["Future: will be","It won't be easy.","Same for ALL subjects"],["Pres. perfect: have/has been","I have been here before.","have = I/you/we/they; has = he/she/it"],["there is + singular","There is a message.","Agreement with NOUN, not 'there'"],["there are + plural","There are five candidates.","Don't write 'there is five candidates'"],["Progressive be = behaviour","She is being patient.","Simple be for states; progressive for actions"],["Progressive be ❌ for feelings","I'm tired. NOT I'm being tired.","Tired, happy, sad = states"],["No do/does/did with be","She isn't ✅ NOT She doesn't be ❌","be makes its own negatives"],["news / advice / information","The news is ✅","These look plural but are grammatically singular"]]} />
      <Callout type="quote"><em>"The beginning of wisdom is the definition of terms."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Socrates</span></Callout>
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────

function Ex1() {
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
      <Callout type="note" title="Exercise 1 — Choose the Correct Form">Complete each sentence with the correct form of <Em>be</Em>. Follow the story of entrepreneur <strong>Layla</strong>.</Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${submitted ? (check(q.id, answers[q.id]) ? "#86efac" : "#fecdd3") : "#e5e7eb"}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
          <p style={{ fontSize: "14px", color: "#374151", marginBottom: "10px", lineHeight: 1.6 }}><strong>{q.id}.</strong> {q.prompt}</p>
          <input type="text" placeholder="Your answer…" value={answers[q.id] || ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} disabled={submitted}
            style={{ width: "100%", padding: "9px 13px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: submitted ? (check(q.id, answers[q.id]) ? "#f0fdf4" : "#fff1f2") : "#fafafa" }} />
          {submitted && <p style={{ marginTop: "8px", fontSize: "13px", fontWeight: 600, color: check(q.id, answers[q.id]) ? "#16a34a" : "#dc2626" }}>{check(q.id, answers[q.id]) ? "✓ Correct!" : `✗ Answer: ${q.answer}`}<span style={{ color: "#6b7280", fontWeight: 400, marginLeft: "8px" }}>— {q.hint}</span></p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
        {!submitted
          ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span><button onClick={() => { setSubmitted(false); setAnswers({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

function Ex4() {
  const questions = [
    { id: 1, situation: "Your colleague, normally very polite, has just interrupted three people in a row.", a: "He is rude.", b: "He is being rude.", answer: "B", why: "Normally polite (state). Right now doing something rude (behaviour = progressive)." },
    { id: 2, situation: "A friend asks why you look so pale and sluggish at work today.", a: "I am being tired.", b: "I am tired.", answer: "B", why: "Tiredness is a feeling/state. Never use 'being' with tired." },
    { id: 3, situation: "Your manager clearly wants a decision today.", a: "She is impatient.", b: "She is being impatient.", answer: "B", why: "She normally has a calm character. Currently behaving impatiently (behaviour)." },
    { id: 4, situation: "Describing a permanent personality trait of your best friend.", a: "She is being incredibly kind.", b: "She is incredibly kind.", answer: "B", why: "Permanent character trait = simple be, not progressive." },
  ];
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 4 — State or Behaviour?">Is <Em>be</Em> describing a <Bold>permanent state</Bold> or a <Bold>current behaviour</Bold>?</Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "14px", fontStyle: "italic" }}>Situation {q.id}: {q.situation}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["A","B"].map((opt) => {
              const isChosen = selected[q.id] === opt, isCorrect = opt === q.answer;
              let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
              if (submitted && isChosen && isCorrect)  { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              if (submitted && isChosen && !isCorrect) { bg = "#fff1f2"; border = "#fecdd3"; color = "#dc2626"; }
              if (submitted && !isChosen && isCorrect) { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              return <button key={opt} onClick={() => !submitted && setSelected({ ...selected, [q.id]: opt })} style={{ padding: "12px 16px", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: bg, color, textAlign: "left", cursor: submitted ? "default" : "pointer", fontSize: "14px", fontWeight: isChosen ? 700 : 400 }}><strong>{opt})</strong> {opt === "A" ? q.a : q.b}</button>;
            })}
          </div>
          {submitted && <p style={{ marginTop: "12px", fontSize: "13px", color: "#374151", backgroundColor: "#f9fafb", padding: "10px 14px", borderRadius: "8px" }}><strong>Why:</strong> {q.why}</p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        {!submitted ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <button onClick={() => { setSubmitted(false); setSelected({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button>}
      </div>
    </div>
  );
}

export function PracticeContent() {
  return (
    <div>
      <Callout type="info" title="How to Use This Practice File"><Bold>Do not check answers until you finish each exercise.</Bold> Read every explanation — even for correct answers. The explanation tells you <Em>WHY</Em>, not just WHAT.</Callout>
      <Ex1 />
      <Ex4 />
      <div style={{ marginTop: "32px", padding: "20px 24px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>Exercises 2, 3, 5, 6, 7 & 8</p>
        <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: 1.7 }}>Error Correction, Dialogue Repair, Question Formation, Reading Passage, and Free Writing require written responses. Complete them in your notebook.</p>
      </div>
    </div>
  );
}

const Unit1 = { meta, tocItems, TopicContent, PracticeContent };
export default Unit1;
