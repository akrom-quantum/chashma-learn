"use client";
import { useState } from "react";
import Callout from "../components/Callout";
import Table from "../components/Table";
import { H2, H3, P, Bold, Em, Code } from "../components/Typography";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const meta = {
  title:     "There Is / There Are",
  level:     "Intermediate – Upper Intermediate",
  time:      "40 mins",
  questions: 45,
};

// ─── Table of Contents ────────────────────────────────────────────────────────

export const tocItems = [
  { id: "sec-a",   label: "A — The Core Structure",          level: 1 },
  { id: "sec-b",   label: "B — Full Form Tables",            level: 1 },
  { id: "sec-b1",  label: "B1 — Present",                   level: 2 },
  { id: "sec-b2",  label: "B2 — Past",                      level: 2 },
  { id: "sec-b3",  label: "B3 — Future",                    level: 2 },
  { id: "sec-b4",  label: "B4 — Perfect Forms",             level: 2 },
  { id: "sec-b5",  label: "B5 — Modal & Other",             level: 2 },
  { id: "sec-c",   label: "C — Agreement: The Core Rule",   level: 1 },
  { id: "sec-c1",  label: "C1 — 12 Classic Mistakes",       level: 2 },
  { id: "sec-d",   label: "D — There Is vs It Is",          level: 1 },
  { id: "sec-e",   label: "E — Advanced Constructions",     level: 1 },
  { id: "sec-e1",  label: "E1 — Seem / Appear",             level: 2 },
  { id: "sec-e2",  label: "E2 — Modal Verbs",               level: 2 },
  { id: "sec-e3",  label: "E3 — Adjectives",                level: 2 },
  { id: "sec-e4",  label: "E4 — Need / Point / Use",        level: 2 },
  { id: "sec-f",   label: "F — Formal vs Informal",         level: 1 },
  { id: "sec-g",   label: "G — Pronunciation Guide",        level: 1 },
  { id: "sec-ref", label: "Quick Reference",                level: 1 },
];

// ─── Topic ────────────────────────────────────────────────────────────────────

export function TopicContent() {
  return (
    <div>
      <Callout type="abstract" title="Unit Overview">
        <p style={{ margin: "0 0 10px" }}>The structure <Em>there + be</Em> allows speakers and writers to introduce new information naturally, signal what exists in a place or time, and frame the world before describing it in detail. Mastering this structure lifts writing from mechanical to genuinely fluent.</p>
        <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#0369a1" }}>By the end of this unit you will be able to:</p>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          {[
            "Use there is / there are correctly with singular and plural subjects in all major tenses",
            "Avoid the most common agreement errors involving collective nouns and indefinite subjects",
            "Distinguish clearly between there is (new information) and it is (known information)",
            "Use advanced impersonal constructions such as there seems to be and there appears to be",
            "Recognise and produce both formal and informal register variations",
          ].map((item, i) => <li key={i} style={{ marginBottom: "4px" }}>{item}</li>)}
        </ul>
      </Callout>
      <Callout type="quote"><em>"In the beginning, there was nothing — and it exploded."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Terry Pratchett</span></Callout>

      <H2 id="sec-a">Section A — The Core Structure: What there is Actually Does</H2>
      <P>The phrase <Em>there is</Em> (and all its forms) is used to <Bold>introduce</Bold> the existence of something — to tell the listener or reader that something exists, or is present, at a particular place or time.</P>
      <P>Think of <Em>there is</Em> as a spotlight: it shines a beam onto a new object and says <em>"Look — this exists."</em> Once the audience knows what you're talking about, you switch to <Em>it</Em> or <Em>the</Em> to discuss it further.</P>
      <Table headers={["Function","Example","Notes"]} rows={[
        ["Introduce existence","There is a crack in the wall.","New information — listener doesn't know yet"],
        ["Indicate presence","There are three candidates.","Points to the group as a fact"],
        ["Deny existence","There isn't much time.","Negative existence"],
        ["Question existence","Is there a pharmacy nearby?","Asking if something exists"],
      ]} />
      <Callout type="info" title="Key Insight">
        <Em>There</Em> in <Em>there is</Em> is <Bold>NOT a place adverb</Bold>. It has no meaning by itself — it is a grammatical subject placeholder. The real subject comes after the verb: <em>There is <strong>a problem</strong>.</em> The problem is the subject; <em>there</em> is a dummy word holding the grammatical position.
      </Callout>
      <Callout type="warning" title="Don't Confuse These Two Theres">
        • <em>"Is <strong>there</strong> a bank near here?"</em> — grammatical placeholder (<em>there is</em>)<br />
        • <em>"The bank is over <strong>there</strong>."</em> — place adverb (location)<br /><br />
        In speech, the place adverb <em>there</em> is stressed. The grammatical <em>there</em> is usually unstressed and often contracted: <em>there's</em>.
      </Callout>

      <H2 id="sec-b">Section B — Full Form Tables: All Tenses</H2>
      <H3 id="sec-b1">B1 — Present</H3>
      <Table headers={["—","Positive","Negative","Question"]} rows={[
        ["Singular","There is a queue.","There isn't a queue.","Is there a queue?"],
        ["Plural","There are delays.","There aren't any delays.","Are there any delays?"],
        ["Informal","There's some people outside.","—","—"],
      ]} />
      <H3 id="sec-b2">B2 — Past</H3>
      <Table headers={["—","Positive","Negative","Question"]} rows={[
        ["Singular","There was a warning.","There wasn't a warning.","Was there a warning?"],
        ["Plural","There were protests.","There weren't any protests.","Were there any protests?"],
      ]} />
      <H3 id="sec-b3">B3 — Future</H3>
      <Table headers={["—","Positive","Negative","Question"]} rows={[
        ["All subjects","There will be changes.","There won't be any changes.","Will there be changes?"],
      ]} />
      <H3 id="sec-b4">B4 — Perfect Forms</H3>
      <Table headers={["Tense","Example"]} rows={[
        ["Present Perfect","There has been a lot of progress recently."],
        ["Present Perfect (plural)","There have been several complaints."],
        ["Past Perfect","There had been no indication of a problem."],
      ]} />
      <H3 id="sec-b5">B5 — Modal & Other Structures</H3>
      <Table headers={["Structure","Example"]} rows={[
        ["Going to","There's going to be a storm tonight."],
        ["Modal + be","There may be delays. / There must be a mistake."],
        ["Seem / Appear","There seems to be a misunderstanding."],
      ]} />
      <Callout type="tip" title="Contraction Reminder">
        <em>There's</em> = <em>There is</em> (singular, present) — the most common spoken form.<br /><br />
        Note: <em>there's</em> is sometimes used informally before plurals (<em>"There's some people waiting"</em>), but in formal writing, always use <em>there are</em>.
      </Callout>

      <H2 id="sec-c">Section C — Agreement: The Essential Rule</H2>
      <P>The verb in a <Em>there + be</Em> construction agrees with the <Bold>real subject</Bold> — the noun that comes <Bold>after</Bold> the verb, not with <em>there</em>.</P>
      <Callout type="info" title="The Agreement Formula">
        <strong>there + verb + real subject</strong><br />The verb matches the real subject in number.
      </Callout>
      <Table headers={["Real Subject","Correct Form","Incorrect Form"]} rows={[
        ["a solution (singular)","There is a solution.","~~There are a solution.~~"],
        ["several issues (plural)","There are several issues.","~~There is several issues.~~"],
        ["no parking (uncountable)","There is no parking here.","~~There are no parking.~~"],
        ["a lot of people","There are a lot of people.","~~There is a lot of people.~~"],
        ["a number of errors","There are a number of errors.","~~There is a number of errors.~~"],
      ]} />
      <Callout type="warning" title="The Tricky Cases">
        • <Bold>Uncountable nouns always take singular:</Bold> <em>There is traffic. / There is violence.</em><br />
        • <Bold>"A lot of / plenty of" take plural when countable:</Bold> <em>There are a lot of questions.</em><br />
        • <Bold>"A number of" is always plural:</Bold> <em>There are a number of reasons.</em><br />
        • <Bold>"The number of" is always singular:</Bold> <em>The number of applicants is rising.</em>
      </Callout>

      <H3 id="sec-c1">C1 — 12 Classic Mistakes</H3>
      {[
        { wrong: "There is many advantages to this approach.",                   right: "There are many advantages to this approach.",                 note: "advantages is plural — the verb must be plural too." },
        { wrong: "A new policy. It is effective in reducing costs.",             right: "There is a new policy. It is effective in reducing costs.",   note: "There is introduces something new; it is refers back to something already mentioned." },
        { wrong: "There's over forty families affected by this. (formal)",       right: "There are over forty families affected by this.",              note: "In formal/written English, there's before a plural is non-standard." },
        { wrong: "In this city have a lot of problems with public transport.",   right: "In this city, there are a lot of problems with public transport.", note: "English uses there + be to introduce existence. Using have is a translation error." },
        { wrong: "Is a problem with the heating.",                               right: "There is a problem with the heating.",                         note: "English requires the dummy subject there — the verb cannot begin a statement without a subject." },
        { wrong: "There is a major strike last year.",                           right: "There was a major strike last year.",                          note: "Last year signals past time — use was/were." },
        { wrong: "There is the solution we need.",                               right: "The solution we need is a change in policy.",                  note: "There is introduces indefinite, new information. Definite subjects (with the) don't use this structure." },
        { wrong: "There has been many accidents on this road.",                  right: "There have been many accidents on this road.",                 note: "accidents is plural — use have been." },
        { wrong: "There seems a problem with the application.",                  right: "There seems to be a problem with the application.",            note: "Seem (and appear, tend) must be followed by to be in this construction." },
        { wrong: "There was arrived a new manager.",                             right: "A new manager arrived.",                                       note: "There + be is for existence, not for actions. Use a normal sentence." },
        { wrong: "Is there any good restaurants near here?",                     right: "Are there any good restaurants near here?",                    note: "restaurants is plural — the question form must be are there." },
        { wrong: "There is my laptop on the desk.",                              right: "My laptop is on the desk.",                                    note: "When the subject is specific and already known, use a normal sentence. There is is for new, indefinite information." },
      ].map((m, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Mistake #{i + 1}</p>
          <Callout type="failure" title="Wrong">{m.wrong}</Callout>
          <Callout type="success" title="Correct"><em>{m.right}</em><br /><span style={{ fontSize: "13px", color: "#374151" }}>→ {m.note}</span></Callout>
        </div>
      ))}

      <H2 id="sec-d">Section D — There Is vs It Is: The Critical Distinction</H2>
      <Table headers={["Feature","there is","it is"]} rows={[
        ["Function","Introduces new, indefinite information","Refers to something already known"],
        ["Subject","Indefinite (a, some, any, no)","Definite (the, this, that, pronoun)"],
        ["Discourse position","Appears first when introducing a topic","Appears after the topic is established"],
        ["Example","There is a report on your desk.","It is the Haines report — from last month."],
      ]} />
      <P><Bold>A practical test:</Bold> If you could replace the noun with "the thing we've just been talking about" and the sentence still makes sense, use <Em>it is</Em>. If the noun is brand new to the conversation, use <Em>there is</Em>.</P>
      <Callout type="example" title="Context Demonstration">
        1. <em>"There's a message for you at reception."</em> ← NEW information<br />
        2. <em>"It's from the Tokyo office."</em> ← Referring back to the message<br />
        3. <em>"It says there will be a delay in the shipment."</em> ← New detail inside<br />
        4. <em>"The delay is expected to last two weeks."</em> ← Describing what we know
      </Callout>
      <Callout type="warning" title="Common Register Trap">
        Learners often use <Em>it is</Em> to introduce new things because they translate from their native language. In many languages, the equivalent of "it is a problem" works for new information. In English, it sounds as if you and the listener already know which problem you mean.
      </Callout>

      <H2 id="sec-e">Section E — Advanced Impersonal Constructions</H2>
      <H3 id="sec-e1">E1 — With Seem / Appear</H3>
      <P>Used to express uncertainty or soften a claim — essential in academic and professional writing.</P>
      <Table headers={["Structure","Example","Register"]} rows={[
        ["There seems to be","There seems to be a fundamental flaw in the plan.","Formal / Academic"],
        ["There appears to be","There appears to be some confusion about the deadline.","Formal / Business"],
        ["There seemed to be","There seemed to be no easy solution.","Formal narrative"],
      ]} />
      <H3 id="sec-e2">E2 — With Modal Verbs</H3>
      <Table headers={["Structure","Meaning","Example"]} rows={[
        ["There may be","Possibility (neutral)","There may be additional costs involved."],
        ["There might be","Possibility (more tentative)","There might be a way around this."],
        ["There must be","Logical certainty","There must be a simpler explanation."],
        ["There can't be","Logical impossibility","There can't be two people with that name."],
        ["There could be","Hypothetical possibility","There could be serious consequences."],
        ["There should be","Expectation / obligation","There should be a formal review process."],
      ]} />
      <H3 id="sec-e3">E3 — With Adjectives: certain / likely / sure / bound</H3>
      <Table headers={["Structure","Example"]} rows={[
        ["There is certain to be","There is certain to be an inquiry after this incident."],
        ["There is likely to be","There is likely to be some resistance from the board."],
        ["There is bound to be","There is bound to be some confusion at first."],
        ["There is sure to be","There is sure to be a better offer on the market."],
      ]} />
      <H3 id="sec-e4">E4 — With Need / Point / Use / Sense</H3>
      <Table headers={["Structure","Example"]} rows={[
        ["There is no need to","There is no need to panic."],
        ["There is no point in","There is no point in arguing about it now."],
        ["There is no use in","There is no use in waiting any longer."],
        ["There is little sense in","There is little sense in delaying the decision further."],
      ]} />
      <Callout type="tip" title="Academic Writing Tip">
        In academic writing, <Em>there seems to be</Em> and <Em>there appears to be</Em> are preferred when drawing a conclusion from evidence rather than stating a fact. This is called <Bold>epistemic hedging</Bold>.<br /><br />
        • <em>There is a link between pollution and respiratory illness.</em> (states as fact)<br />
        • <em>There appears to be a link between pollution and respiratory illness.</em> (based on evidence — appropriately cautious)
      </Callout>

      <H2 id="sec-f">Section F — Formal vs Informal Register</H2>
      <Table headers={["Feature","Informal","Formal / Written"]} rows={[
        ["Contraction","There's a lot of problems.","There are a number of problems."],
        ["There's before plural","Widely used in speech","Avoided in formal writing"],
        ["Modal combinations","There might be something wrong.","There appears to be a discrepancy."],
        ["Hedging language","Maybe there's a reason.","There may well be an underlying cause."],
        ["Negative","There isn't any point.","There is little point in pursuing this course of action."],
      ]} />
      <Callout type="example" title="Same Idea, Two Registers">
        <strong>Informal (WhatsApp):</strong> <em>"Hey — there's loads of traffic on the ring road. There might be an accident or something."</em><br /><br />
        <strong>Formal (news report):</strong> <em>"There are significant delays on the ring road this evening. There appears to be a collision near Junction 7, and there is likely to be further disruption until the road is cleared."</em>
      </Callout>

      <H2 id="sec-g">Section G — Pronunciation Guide</H2>
      <Table headers={["Form","IPA","Tip"]} rows={[
        ["there is","/ðɛr ɪz/","Each word pronounced clearly — used in formal/careful speech"],
        ["there's","/ðɛrz/","Standard contraction — very common in speech"],
        ["there are","/ðɛr ɑː/","Second word often reduced: /ðərə/ in fast speech"],
        ["there was","/ðɛr wɒz/","was reduced to /wəz/ in natural speech"],
        ["there were","/ðɛr wɜː/","were often reduced: /ðə wə/ in fast speech"],
        ["there will be","/ðɛr wɪl biː/","Often contracted to there'll be /ðɛrl biː/ in speech"],
        ["is there","/ɪz ðɛr/","In questions — is is stressed, there unstressed"],
        ["there (place adverb)","/ðɛr/ (stressed)","Stressed — contrasts with unstressed grammatical there"],
      ]} />
      <Callout type="tip" title="Listening Skill">
        In fast natural speech, <em>"there's a"</em> sounds almost like <em>"thezza"</em> and <em>"there are some"</em> sounds like <em>"theresome."</em> Train your ear to catch this reduction — it appears constantly in podcasts, films, and real conversations.
      </Callout>

      <H2 id="sec-ref">Quick Reference 📋</H2>
      <Table headers={["Rule / Structure","Example","Note"]} rows={[
        ["Singular subject → there is","There is a solution.","Real subject = solution"],
        ["Plural subject → there are","There are two options.","Real subject = options"],
        ["Uncountable → there is","There is not enough evidence.","Uncountable always singular"],
        ["Past singular → there was","There was a fire last night.","Describing past existence"],
        ["Past plural → there were","There were three witnesses.","Plural in past"],
        ["Future → there will be","There will be consequences.","All persons/numbers — same form"],
        ["Present perfect → there has/have been","There have been delays.","Match the following noun"],
        ["New information → there is","There is a letter for you.","First mention"],
        ["Known information → it is","It is from your bank.","Referring back"],
        ["Formal uncertainty","There seems to be an error.","Hedging/softening"],
        ["Logical deduction","There must be a simpler way.","Modal + be"],
        ["Necessity","There is no need to apologise.","Fixed expressions"],
        ["Informal before plural","There's loads of options.","Spoken only — avoid in writing"],
      ]} />
      <Callout type="quote"><em>"There is always some madness in love. But there is also always some reason in madness."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Friedrich Nietzsche</span></Callout>
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────

function Ex1TenseCarousel() {
  const questions = [
    { id: 1,  prompt: "In 1970, ________ nothing but farmland where the Mirova South Quarter now stands.",                           answer: "there was",             hint: "Past singular — nothing is singular/uncountable" },
    { id: 2,  prompt: "By 1985, ________ a series of disputes over land ownership that delayed construction for years.",             answer: "there had been",        hint: "Past perfect — event before another past event" },
    { id: 3,  prompt: "In 1991, when the walls finally came down, ________ enormous optimism about the city's future.",              answer: "there was",             hint: "Past singular — enormous optimism is uncountable" },
    { id: 4,  prompt: "________ much investment in infrastructure at that time — the roads remained terrible. [NEGATIVE]",           answer: "There was not / There wasn't", hint: "Past negative singular — investment is uncountable" },
    { id: 5,  prompt: "Since the early 2000s, ________ a dramatic shift in housing policy.",                                         answer: "there has been",        hint: "Present perfect — change starting in the past with present relevance" },
    { id: 6,  prompt: "Today, ________ over fourteen thousand residents in the South Quarter.",                                       answer: "there are",             hint: "Present plural — over fourteen thousand residents" },
    { id: 7,  prompt: "However, ________ enough affordable units to meet demand — that is the central problem. [NEGATIVE]",          answer: "there are not / there aren't", hint: "Present negative plural — enough affordable units" },
    { id: 8,  prompt: "________ several protests outside City Hall this week alone.",                                                 answer: "There have been",       hint: "Present perfect plural — several protests" },
    { id: 9,  prompt: "City planners insist ________ a long-term solution in the works.",                                            answer: "there is",              hint: "Present singular — a long-term solution" },
    { id: 10, prompt: "Critics argue ________ real change until the funding model is reformed. [NEGATIVE]",                          answer: "there will not be / there won't be", hint: "Future negative — all subjects take same form" },
    { id: 11, prompt: "If the referendum passes, ________ significant new construction starting within three years.",                answer: "there will be",         hint: "Future positive — significant new construction" },
    { id: 12, prompt: "Whether ________ enough political will to push it through — that remains to be seen.",                        answer: "there is",              hint: "Present singular — enough political will (uncountable)" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const check = (id, val) => {
    const correct = questions.find(q => q.id === id).answer.toLowerCase();
    const input = (val || "").toLowerCase().trim();
    return correct.split(" / ").some(opt => input === opt.trim());
  };
  const score = submitted ? questions.filter(q => check(q.id, answers[q.id])).length : 0;
  return (
    <div>
      <Callout type="note" title="Exercise 1 — Tense Carousel 🎠">Fill in each blank with the correct form of <Em>there + be</Em>. Follow journalist <strong>Daria Kowalska</strong> reporting on the city of <strong>Mirova</strong> across the decades. Use full forms unless the sentence is clearly conversational.</Callout>
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
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span><button onClick={() => { setSubmitted(false); setAnswers({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

function Ex2AgreementPartA() {
  const questions = [
    { id: 1, prompt: "There ___ a significant lack of green space in the eastern districts.",   answer: "is",  hint: "lack is singular" },
    { id: 2, prompt: "There ___ numerous complaints from residents near the construction site.", answer: "are", hint: "complaints is plural" },
    { id: 3, prompt: "There ___ no shortage of data on this topic.",                            answer: "is",  hint: "shortage is singular (uncountable concept)" },
    { id: 4, prompt: "There ___ a number of factors contributing to the housing deficit.",       answer: "are", hint: "a number of factors = plural" },
    { id: 5, prompt: "There ___ very little transparency in the bidding process.",              answer: "is",  hint: "transparency is uncountable" },
    { id: 6, prompt: "There ___ three competing proposals currently under review.",             answer: "are", hint: "three competing proposals = plural" },
    { id: 7, prompt: "There ___ widespread concern about the relocation programme.",            answer: "is",  hint: "widespread concern is uncountable" },
    { id: 8, prompt: "There ___ some evidence to suggest that rents are stabilising.",          answer: "is",  hint: "evidence is uncountable" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const check = (id, val) => (val || "").toLowerCase().trim() === questions.find(q => q.id === id).answer.toLowerCase();
  const score = submitted ? questions.filter(q => check(q.id, answers[q.id])).length : 0;
  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 2A — Agreement: Select is or are">You are reviewing a draft report. Choose the correct verb form for each sentence.</Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${submitted ? (check(q.id, answers[q.id]) ? "#86efac" : "#fecdd3") : "#e5e7eb"}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
          <p style={{ fontSize: "14px", color: "#374151", marginBottom: "10px" }}><strong>{q.id}.</strong> {q.prompt}</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {["is", "are"].map(opt => {
              const chosen = answers[q.id] === opt;
              const correct = opt === questions.find(q2 => q2.id === q.id).answer;
              let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
              if (submitted && chosen && correct)  { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              if (submitted && chosen && !correct) { bg = "#fff1f2"; border = "#fecdd3"; color = "#dc2626"; }
              if (submitted && !chosen && correct) { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              return <button key={opt} onClick={() => !submitted && setAnswers({ ...answers, [q.id]: opt })}
                style={{ padding: "8px 20px", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: bg, color, fontWeight: chosen ? 700 : 400, fontSize: "14px", cursor: submitted ? "default" : "pointer" }}>{opt}</button>;
            })}
          </div>
          {submitted && <p style={{ marginTop: "8px", fontSize: "13px", color: "#6b7280" }}>— {q.hint}</p>}
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

function Ex4ThereOrIt() {
  const questions = [
    { id: 1, situation: "You're telling a friend about something you just noticed in the kitchen for the first time.", a: "There is a strange smell coming from the fridge.", b: "It is a strange smell coming from the fridge.", answer: "A", why: "The smell is new information — the listener doesn't know about it yet. Use there is to introduce it." },
    { id: 2, situation: "You've just mentioned a broken window. Now you're continuing: the window is old.", a: "There is very old.", b: "It is very old.", answer: "B", why: "The window was just mentioned — it refers back to something already known." },
    { id: 3, situation: "A journalist is opening a report about a city the reader has never heard of.", a: "There is a city in northern Slovakia called Banská Bystrica.", b: "It is a city in northern Slovakia called Banská Bystrica.", answer: "A", why: "The city is entirely new information to the reader — use there is to introduce it." },
    { id: 4, situation: "You've already told your colleague about the new regulation. Now you're adding: the regulation is stricter than last year's.", a: "There is stricter than last year's regulation.", b: "It is stricter than last year's regulation.", answer: "B", why: "The regulation was already mentioned — it refers back to it." },
    { id: 5, situation: "You are writing an academic essay and introducing new evidence for the first time.", a: "There is compelling evidence that urban density reduces carbon emissions.", b: "It is compelling evidence that urban density reduces carbon emissions.", answer: "A", why: "Introducing new evidence — it has not been presented before in the essay." },
    { id: 6, situation: "A character in a story is describing the time of an event the reader just read about.", a: "There was midnight.", b: "It was midnight.", answer: "B", why: "It (not there) is always used for time, weather, and distance: It was midnight. It is raining. It is 5 kilometres away." },
  ];
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 4 — There or It? 🎯">For each situation, choose Option A (<Em>there is/are/was/were</Em>) or Option B (<Em>it is/was</Em>). Write your choice and think about why.</Callout>
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
              return <button key={opt} onClick={() => !submitted && setSelected({ ...selected, [q.id]: opt })}
                style={{ padding: "12px 16px", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: bg, color, textAlign: "left", cursor: submitted ? "default" : "pointer", fontSize: "14px", fontWeight: isChosen ? 700 : 400 }}>
                <strong>{opt})</strong> {opt === "A" ? q.a : q.b}
              </button>;
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

export function PracticeContent() {
  return (
    <div>
      <Callout type="info" title="How to Use This Practice File">Work through exercises in order — they spiral from controlled recognition tasks to open production. <Bold>Do not look at the Answer Key until you have finished an entire exercise.</Bold> Understanding <Em>why</Em> is more valuable than knowing <Em>what</Em>.</Callout>
      <Callout type="quote"><em>"There is no shortcut to any place worth going."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Beverly Sills</span></Callout>
      <Ex1TenseCarousel />
      <Ex2AgreementPartA />
      <Ex4ThereOrIt />
      <div style={{ marginTop: "32px", padding: "20px 24px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>Exercises 2B, 3, 5, 6, 7 & 8</p>
        <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: 1.7 }}>Agreement Correction, Error Hospital, Dialogue Repair, Production, Reading Passage, and Free Writing require written responses. Complete them in your notebook.</p>
      </div>
    </div>
  );
}

const Unit2 = { meta, tocItems, TopicContent, PracticeContent };
export default Unit2;
