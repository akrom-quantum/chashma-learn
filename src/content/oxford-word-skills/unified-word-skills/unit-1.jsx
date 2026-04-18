"use client";
import { useState } from "react";
import Callout from "@/components/callouts/Callout";
import Table from "@/components/content/Table";
import { H2, H3, P, Bold, Em } from "@/components/content/Typography";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const meta = {
  title:     "Vocabulary Learning Strategies",
  level:     "Intermediate – Upper Intermediate",
  time:      "40 mins",
  questions: 50,
};

// ─── Table of Contents ────────────────────────────────────────────────────────

export const tocItems = [
  { id: "sec-a",    label: "A — How to Learn New Words",       level: 1 },
  { id: "sec-b",    label: "B — Questions About Words",        level: 1 },
  { id: "sec-c",    label: "C — Reading Strategies",           level: 1 },
  { id: "sec-d",    label: "D — Speaking, Listening & Revision", level: 1 },
  { id: "sec-e",    label: "E — Meaning and Style",            level: 1 },
  { id: "sec-e1",   label: "E1 — Style: How Words Feel",       level: 2 },
  { id: "sec-f",    label: "F — Building Word Networks",       level: 1 },
  { id: "sec-f1",   label: "F1 — Collocations",               level: 2 },
  { id: "sec-f2",   label: "F2 — Word Families",              level: 2 },
  { id: "sec-f3",   label: "F3 — Mnemonics",                  level: 2 },
  { id: "sec-read", label: "📖 Reading Passage",               level: 1 },
  { id: "sec-ref",  label: "Quick Reference Card",             level: 1 },
];

// ─── Topic ────────────────────────────────────────────────────────────────────

export function TopicContent() {
  return (
    <div>
      <Callout type="quote">
        <em>"The limits of my language mean the limits of my world."</em><br />
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>— Ludwig Wittgenstein</span>
      </Callout>

      {/* SECTION A */}
      <H2 id="sec-a">A — How to Learn New Words</H2>
      <P>When you meet a new word, don't just underline it and move on. There are several things you can do to help it <Em>stick</Em>.</P>
      <Callout type="tip" title="What does 'stick' mean here?">
        When we say a word <Em>sticks</Em>, we mean it stays in your memory. It's a <Bold>figurative</Bold> use — imagine a word stuck to the wall of your brain like a sticky note.
      </Callout>
      <P>Here are some proven strategies:</P>
      <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
        {[
          <><Bold>Repeat words out loud</Bold> two or three times. This helps your mouth and ears work together to memorise the <Em>pronunciation</Em>.</>,
          <><Bold>Write new words in a notebook</Bold> — and keep a <Em>record</Em> of them. A word you write down is three times more likely to be remembered than one you only read.</>,
          <>Write the <Bold>meaning</Bold> in English <Em>or</Em> your own language — whichever works better for you.</>,
          <>Write an <Bold>example sentence</Bold> using the word. This shows you <Em>how</Em> to use it, not just what it means.</>,
          <>Think of <Bold>situations</Bold> where you might use the word. Context makes words real.</>,
        ].map((item, i) => <li key={i} style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "8px" }}>{item}</li>)}
      </ul>
      <Callout type="quote">
        <em>"Tell me and I forget. Teach me and I remember. Involve me and I learn."</em><br />
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>— Benjamin Franklin</span>
      </Callout>

      <H3>🔍 Glossary — Section A</H3>
      <Table headers={["Word", "Meaning", "Example"]} rows={[
        ["pronunciation", "how a word sounds when spoken", 'The pronunciation of "knight" surprises many learners.'],
        ["notebook", "a book you write in", "I keep a vocabulary notebook by my desk."],
        ["record (n)", "notes you keep to remember something", "She keeps a record of every new word she learns."],
        ["meaning", "what a word or phrase means", 'What\'s the meaning of "ambiguous"?'],
        ["situation", "the circumstances around an event", "Use formal language in a job interview situation."],
        ["out loud", "so that others can hear it", "Read the sentence out loud to practise pronunciation."],
      ]} />
      <Callout type="tip" title="SPOTLIGHT: thing(s)">
        We often use <Bold>thing(s)</Bold> when we don't know — or don't need — the exact word.<br /><br />
        • <em>What's that <Bold>thing</Bold> on your desk?</em><br />
        • <em>She said some interesting <Bold>things</Bold> about language learning.</em><br /><br />
        It's a powerful "placeholder" word. Don't be afraid to use it!
      </Callout>

      {/* SECTION B */}
      <H2 id="sec-b">B — Questions About Words</H2>
      <P>In class, in conversation, or while reading — you will often need to ask about words. Here are the most important questions and common mistakes to avoid.</P>
      <Table
        headers={["✅ Correct Question", "❌ Common Mistake", "Answer"]}
        rows={[
          ["What does awful mean?", "What means awful?", 'It means "terrible."'],
          ["What's this called in English?", "How do you call this?", "It's called a spoon."],
          ["How do you say fils in English?", "—", "Fils is French for son."],
          ["Could you explain 'no vacancies'?", "Could you explain me...?", "It means the hotel is full."],
          ["What's the difference between hello and hi?", "—", "Hi is more informal."],
          ["What's the opposite of big?", "—", "Small."],
          ["How do you pronounce tie?", "How do you say the pronunciation of...?", "It's like my."],
          ["How do you spell necessary?", "How do you write necessary?", "N-E-C-E-S-S-A-R-Y."],
        ]}
      />
      <Callout type="quote"><em>"A different language is a different vision of life."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Federico Fellini</span></Callout>
      <Callout type="tip" title='SPOTLIGHT: "Could you explain…?" vs "Could you explain me…?"'>
        In English, <Bold>explain</Bold> does NOT take a person directly after it.<br /><br />
        ✅ <em>Could you explain <Bold>this word</Bold>?</em><br />
        ✅ <em>Could you explain <Bold>it to me</Bold>?</em><br />
        ❌ <em>Could you explain me this word?</em><br /><br />
        Think of it this way: you explain <Em>things</Em>, not <Em>people</Em>.
      </Callout>

      <H3>🔍 Glossary — Section B</H3>
      <Table headers={["Word", "Meaning", "Note"]} rows={[
        ["mean (v)", "to have a particular meaning", '"What does X mean?" NOT "What means X?"'],
        ["explain", "to make something clear", "explain sth TO sb — NOT explain sb sth"],
        ["opposite", "completely different in meaning", "The opposite of happy is sad."],
        ["difference", "the way things are not the same", "What's the difference between...?"],
        ["pronounce", "to make the sound of a word", "How do you pronounce this?"],
        ["spell", "to write the letters of a word", "How do you spell your name?"],
      ]} />

      {/* SECTION C */}
      <H2 id="sec-c">C — Reading Strategies</H2>
      <Callout type="quote"><em>"Reading is to the mind what exercise is to the body."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Joseph Addison</span></Callout>
      <P>When you read in a foreign language, you don't need to understand <Em>every</Em> word. Your first goal is to grasp the <Bold>basic meaning</Bold>.</P>
      <ol style={{ paddingLeft: "20px", marginBottom: "20px" }}>
        {[
          <>Read the whole text once — even if there are words you don't <Em>recognise</Em>.</>,
          <><Bold>Go through</Bold> it again, this time focusing on unknown vocabulary.</>,
          <><Bold>Identify</Bold> the words that seem important.</>,
          <>Try to <Bold>guess</Bold> the meaning from the <Bold>context</Bold> — the words and sentences around the unknown word.</>,
          <>Use a dictionary if guessing doesn't work.</>,
          <><Bold>Keep a record</Bold> of the new words. Note if it's <Bold>formal</Bold> or <Bold>informal</Bold>, and whether it's followed by a particular preposition.</>,
          <>Write a <Bold>translation</Bold> if it helps — but sometimes it isn't necessary.</>,
        ].map((item, i) => <li key={i} style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "8px" }}>{item}</li>)}
      </ol>

      <H3>🔍 Glossary — Section C</H3>
      <Table headers={["Word", "Meaning", "Word family"]} rows={[
        ["foreign", "from another country", "a foreign language; a foreigner"],
        ["basic", "most important and necessary", "the basic meaning"],
        ["recognise", "to know what something is because you've seen it before", "Do you recognise this word?"],
        ["go through", "to read carefully from beginning to end", "Let's go through the text again."],
        ["identify", "to recognise and name something", "Can you identify the topic?"],
        ["guess", "to give an answer without being certain", "I had to guess the meaning."],
        ["context", "the surrounding words that help explain meaning", "Try to understand from context."],
        ["keep a record", "to write things down so you remember them", "Always keep a record of new words."],
        ["formal", "serious, official language", "Formal writing avoids contractions."],
        ["translation", "changing a text from one language to another", "Write a translation if it helps."],
      ]} />
      <Callout type="tip" title="SPOTLIGHT: formal vs informal">
        <Bold>Formal language</Bold> is used in academic writing, official letters, and professional situations. <Bold>Informal language</Bold> is used with friends, in text messages, and casual conversation.<br /><br />
        <Table headers={["Formal", "Informal"]} rows={[
          ["I was unable to attend.", "I couldn't make it."],
          ["Could you assist me?", "Can you help me out?"],
          ["I would like to inquire...", "I was wondering..."],
        ]} />
      </Callout>

      {/* SECTION D */}
      <H2 id="sec-d">D — Speaking, Listening & Revision</H2>
      <Callout type="quote"><em>"You don't have to be great to start, but you have to start to be great."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Zig Ziglar</span></Callout>
      <P>Learning vocabulary isn't a one-time event — it's a process. Here's what the research (and experience) says:</P>
      <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
        {[
          <>In conversations, <Bold>ask people to repeat</Bold> things you didn't understand.</>,
          <>Don't be afraid to <Bold>experiment</Bold> with new words — you learn by trying.</>,
          <><Bold>Making mistakes</Bold> is not failure; it's the most efficient path to improvement.</>,
          <><Bold>Revise</Bold> vocabulary regularly. Without revision, you may forget up to 80% of what you learned within a week.</>,
          <>There isn't one correct <Bold>method</Bold> — find what <Bold>works</Bold> for <Em>you</Em>.</>,
          <>Look for <Bold>opportunities</Bold> to use new vocabulary: in writing, in conversation, in your head.</>,
        ].map((item, i) => <li key={i} style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "8px" }}>{item}</li>)}
      </ul>

      <H3>🔍 Glossary — Section D</H3>
      <Table headers={["Word", "Noun form", "Meaning"]} rows={[
        ["repeat", "repetition", "say something again"],
        ["explain", "explanation", "make something clear"],
        ["pronounce", "pronunciation", "say a word correctly"],
        ["discuss", "discussion", "talk about something seriously"],
        ["revise", "revision", "study something again"],
        ["argue", "argument", "disagree with someone, often emotionally"],
      ]} />
      <Callout type="tip" title="SPOTLIGHT: conversation / discussion / argument">
        These three words are often confused.<br /><br />
        • A <Bold>conversation</Bold> is any talk between two or more people — casual and friendly.<br />
        • A <Bold>discussion</Bold> is more focused — you're talking <Em>about</Em> a specific topic seriously.<br />
        • An <Bold>argument</Bold> is a disagreement — people have different opinions, often with strong emotions.<br /><br />
        <em>We had a friendly <Bold>conversation</Bold> about the weather.</em><br />
        <em>We had a <Bold>discussion</Bold> about whether homework is useful.</em><br />
        <em>We had an <Bold>argument</Bold> about who should do the dishes.</em>
      </Callout>

      <Table headers={["Other words", "Meaning", "Example"]} rows={[
        ["function", "the purpose something has", "One function of context is to help you guess meaning."],
        ["opportunity", "a time when something is possible", "Use every opportunity to speak English."],
        ["experiment with", "try something to see what happens", "Experiment with new words in writing."],
        ["make mistakes", "get something wrong", "Don't be afraid to make mistakes."],
        ["method", "a way of doing something", "What's your method for learning vocabulary?"],
        ["work (v)", "to get the result you want", "Does this technique work for you?"],
      ]} />

      {/* SECTION E */}
      <H2 id="sec-e">E — Meaning and Style</H2>
      <P>As your English improves, you move beyond <Em>what</Em> words mean to <Em>how</Em> they mean it.</P>
      <Callout type="quote">
        <em>"The difference between the almost right word and the right word is really a large matter — it's the difference between the lightning bug and the lightning."</em><br />
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>— Mark Twain</span>
      </Callout>

      <H3>🔍 Glossary — Section E</H3>
      <Table headers={["Term", "Meaning", "Example"]} rows={[
        ["accurate", "exact and correct, without mistakes", 'Is it accurate to say "student" and "pupil" mean the same thing?'],
        ["synonymous", "having the same (or nearly the same) meaning", "Big and large are synonymous."],
        ["restricted", "controlled or limited in use", "Pupil has a more restricted meaning than student."],
        ["ambiguous", "not clear; can be understood in more than one way", "I saw the man with the telescope is ambiguous."],
        ["interpret", "to explain or understand the meaning of something", "You can interpret this sentence in two ways."],
        ["self-explanatory", "easy to understand without more explanation", 'The word "EXIT" is fairly self-explanatory.'],
        ["precise", "very clear and exact", "Could you give me a precise definition?"],
        ["virtually", "almost; nearly the same", "Soul and spirit are virtually synonymous."],
      ]} />
      <Callout type="tip" title="SPOTLIGHT: ambiguous sentences">
        Ambiguous sentences can mean two different things.<br /><br />
        • <em>I saw the man <Bold>with the telescope</Bold>.</em> → Did I use the telescope, or did the man have one?<br />
        • <em>She told her friend <Bold>she</Bold> was wrong.</em> → Who was wrong — she, or the friend?<br /><br />
        In academic writing, ambiguity is something to <Bold>avoid</Bold>. In literature and humour, it's often a tool!
      </Callout>

      <H3 id="sec-e1">Style: How Words Feel</H3>
      <Table headers={["Term", "Meaning", "Example"]} rows={[
        ["literal", "the basic, everyday meaning", "Gold literally means a yellow metal."],
        ["figurative", "a creative, non-basic meaning", "He has a heart of gold — he's kind."],
        ["metaphor", "describing something as if it were something else", "Time is money."],
        ["ironic", "saying the opposite of what you mean", '"Oh, great — another exam."'],
        ["slang", "very informal words, used by specific groups", "Knackered (British slang) = exhausted."],
        ["offensive", "rude in a way that upsets people", "Swear words are often offensive."],
        ["appropriate", "suitable or correct for the situation", "Is it appropriate to use slang in a job interview?"],
        ["disapproving", "showing that something is bad or wrong", 'Dictionaries often mark words as "disapproving."'],
      ]} />
      <Callout type="tip" title="SPOTLIGHT: literal vs figurative">
        One of the most important distinctions in advanced English!<br /><br />
        <Table headers={["Word", "Literal meaning", "Figurative meaning"]} rows={[
          ["flood", "a large amount of water", "a flood of messages = very many messages"],
          ["heart", "the organ in your chest", "heart of the matter = the most important part"],
          ["cold", "low in temperature", "a cold person = unfriendly, emotionally distant"],
          ["fire", "burning flames", "fire someone = to end their employment"],
        ]} />
      </Callout>

      {/* SECTION F */}
      <H2 id="sec-f">F — Building Word Networks</H2>
      <P>The most powerful vocabulary learners don't just collect individual words — they build <Bold>networks</Bold>.</P>
      <Callout type="quote"><em>"Words are like seeds — plant them with connections, and they'll grow into a forest."</em></Callout>

      <H3 id="sec-f1">Collocations</H3>
      <P>A <Bold>collocation</Bold> is a combination of words that naturally go together. Native speakers use them automatically.</P>
      <Table headers={["Strong collocations", "Weak / wrong combinations"]} rows={[
        ["make a mistake", "~~do a mistake~~"],
        ["keep a record", "~~do a record~~"],
        ["take notes", "~~make notes~~ (in British English, both are possible)"],
        ["do research", "~~make research~~"],
        ["have a conversation", "~~make a conversation~~"],
        ["give an explanation", "~~make an explanation~~"],
      ]} />
      <Callout type="tip" title="Why do collocations matter?">
        Even if your grammar is perfect and your vocabulary is wide, using wrong collocations sounds unnatural. A native speaker doesn't decide which verb goes with which noun — they just <Em>know</Em>. You can learn this too — but you must <Bold>record collocations</Bold>, not just individual words.
      </Callout>

      <H3 id="sec-f2">Word Families</H3>
      <P>Learning one word can teach you several. Here's a network built from <Bold>explain</Bold>:</P>
      <Table headers={["Form", "Example"]} rows={[
        ["explain (v)", "Can you explain this grammar rule?"],
        ["explanation (n)", "He gave a clear explanation."],
        ["explanatory (adj)", "Read the explanatory notes first."],
        ["self-explanatory (adj)", "The diagram is self-explanatory."],
        ["inexplicable (adj)", "Her anger was inexplicable."],
      ]} />

      <H3 id="sec-f3">Mnemonics: Memory Tricks</H3>
      <P>A <Bold>mnemonic</Bold> (pronounced: <Em>ni-MON-ik</Em>) is a memory device.</P>
      <Table headers={["Word", "Mnemonic trick"]} rows={[
        ["necessary (spelling)", "One Collar, two Socks: neCeSSary"],
        ["pronunciation", "Don't pronounce the o in pronUNciation"],
        ["ambiguous", "Imagine an ambulance going two directions at once"],
        ["figurative", "Figuratively speaking, a fig has layers of meaning"],
      ]} />

      {/* READING PASSAGE */}
      <H2 id="sec-read">📖 Reading Passage</H2>
      <P style={{ fontWeight: 700, color: "#111827", fontSize: "18px" }}>The Secret Life of Words</P>
      <P><em>Pay attention to the bold vocabulary items as you read.</em></P>

      <div style={{ backgroundColor: "#fafafa", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "28px 32px", marginBottom: "24px", lineHeight: 1.85, fontSize: "15px", color: "#374151" }}>
        <p style={{ marginBottom: "16px" }}>Every language learner reaches a moment of reckoning. You've spent months in class, filling notebooks with <strong>records</strong> of new words, carefully writing <strong>translations</strong> beside each entry. You can <strong>identify</strong> basic words in a text and <strong>recognise</strong> familiar phrases. And yet, when someone speaks to you quickly, you understand almost nothing.</p>
        <p style={{ marginBottom: "16px" }}>This is not failure. This is Stage Two — and it means you're ready for something deeper.</p>
        <p style={{ marginBottom: "16px" }}>The problem is that most vocabulary learning stops at <strong>meaning</strong>. We learn that <em>ambiguous</em> means "not clear" and think the job is done. But native speakers carry much more information about a word than its <strong>basic</strong> meaning. They know its <strong>register</strong> — whether it's <strong>formal</strong> or <strong>informal</strong>. They know its <strong>connotations</strong> — the feelings and associations it carries. They know its typical <strong>collocations</strong> — the other words it likes to live with.</p>
        <p style={{ marginBottom: "16px" }}>Consider the words <em>thin</em>, <em>slim</em>, <em>slender</em>, and <em>skinny</em>. They are all <strong>synonymous</strong> in one sense — they all describe someone who doesn't weigh much. But are they truly <strong>accurate</strong> synonyms? Not at all. <em>Slim</em> carries a positive connotation — we'd say a fashion model is <em>slim</em>. <em>Skinny</em> is often used in a <strong>disapproving</strong> or negative way. <em>Slender</em> sounds more poetic, even <strong>figurative</strong>. Calling someone <em>thin</em> is fairly neutral — but in the wrong <strong>context</strong>, it can feel like a criticism.</p>
        <p style={{ marginBottom: "16px" }}>This is why <strong>precise</strong> vocabulary matters. Language is not a list of labels attached to objects. It's a living system, full of nuance, irony, and metaphor. As the linguist David Crystal once noted, the word "nice" has changed its meaning so many times over the centuries that it originally meant "foolish" or "ignorant." Language is always moving.</p>
        <p style={{ marginBottom: "16px" }}>So how do you develop this deeper understanding? First, read widely and pay attention to <em>how</em> words are used, not just <em>what</em> they mean. Second, keep a record that goes beyond simple <strong>translation</strong> — note the <strong>register</strong>, note collocations, note whether the word is <strong>restricted</strong> in use or widely applicable. Third, <strong>experiment</strong> with new vocabulary in your own writing and speaking. Making mistakes is not something to avoid — it is, in the deepest sense, how human beings learn.</p>
        <p style={{ marginBottom: 0 }}>There is an old saying among language teachers: <em>"A word you've used three times belongs to you."</em> Write it. Say it <strong>out loud</strong>. Use it in a conversation. Then it will stop being a word on a list — and become part of how you think.</p>
      </div>

      <H3>Comprehension Questions</H3>
      <ol style={{ paddingLeft: "20px", marginBottom: "20px" }}>
        {[
          'What does the author mean by "Stage Two" in paragraph one?',
          "According to the passage, what do native speakers know about words that learners often miss?",
          "What is the difference between slim and skinny?",
          'Why does the author say "language is always moving"?',
          "What three things does the author suggest to develop deeper vocabulary understanding?",
          "Find a word in paragraph four that means 'a word or phrase used to describe something in a non-literal way.'",
        ].map((q, i) => <li key={i} style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "8px" }}>{q}</li>)}
      </ol>

      {/* QUICK REFERENCE */}
      <H2 id="sec-ref">📚 Quick Reference Card</H2>
      <Callout type="quote"><em>"Language is the road map of a culture. It tells you where its people come from and where they are going."</em><br /><span style={{ fontSize: "13px", color: "#9ca3af" }}>— Rita Mae Brown</span></Callout>
      <Table headers={["Strategy", "When to use it", "Why it works"]} rows={[
        ["Repeat out loud", "With every new word", "Combines audio + muscle memory"],
        ["Write example sentence", "When recording words", "Shows usage, not just meaning"],
        ["Guess from context", "While reading", "Builds inference skills"],
        ["Note collocations", "Always", "Makes your English sound natural"],
        ["Revise regularly", "Every 2–3 days", "Fights the forgetting curve"],
        ["Experiment with new words", "In speaking/writing", "Moves words from passive to active vocabulary"],
        ["Notice register", "With every new word", "Helps you choose the right word in context"],
      ]} />
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────

function Ex1Dialogue() {
  const blanks = ["meaning", "notebook", "record", "out loud", "pronunciation", "situation"];
  const questions = [
    { id: 1, prompt: 'B: "What\'s the _____ ?" (after A mentions a new word)', answer: "meaning",       hint: "What a word means" },
    { id: 2, prompt: 'A: "I always write these things in my _____ ."',          answer: "notebook",      hint: "A book you write vocabulary in" },
    { id: 3, prompt: 'B: "Do you keep a _____ of the grammar rules too?"',       answer: "record",        hint: "Notes you keep to remember something" },
    { id: 4, prompt: 'A: "I say them _____ when I\'m alone."',                   answer: "out loud",      hint: "So that others can hear" },
    { id: 5, prompt: 'A: "It really helps with _____ ."',                        answer: "pronunciation", hint: "How a word sounds when spoken" },
    { id: 6, prompt: 'B: "What _____ did you first hear \'superfluous\'?"',       answer: "situation",     hint: "The circumstances around an event" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const check = (id, val) => (val || "").toLowerCase().trim() === questions.find(q => q.id === id).answer.toLowerCase();
  const score = submitted ? questions.filter(q => check(q.id, answers[q.id])).length : 0;
  return (
    <div>
      <Callout type="note" title="Exercise 1 — Complete the Dialogue">
        Fill in the blanks using words from the box: <Bold>pronunciation · meaning · notebook · situation · record · out loud</Bold>
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
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span><button onClick={() => { setSubmitted(false); setAnswers({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

function Ex4LiteralOrFigurative() {
  const questions = [
    { id: 1, text: "She has a heart of gold.",             answer: "F", why: "Figurative — means she is very kind" },
    { id: 2, text: "The doctor listened to his heart.",    answer: "L", why: "Literal — the actual organ" },
    { id: 3, text: "There was a flood of complaints after the show.", answer: "F", why: "Figurative — a very large number of complaints" },
    { id: 4, text: "The town was destroyed by a flood.",   answer: "L", why: "Literal — actual water" },
    { id: 5, text: "He has a sharp mind.",                 answer: "F", why: "Figurative — very intelligent" },
    { id: 6, text: "Careful — that knife is sharp.",       answer: "L", why: "Literal — actually has a sharp edge" },
    { id: 7, text: "She drowned in work last week.",       answer: "F", why: "Figurative — overwhelmed by work" },
    { id: 8, text: "The child nearly drowned in the pool.", answer: "L", why: "Literal — nearly died in water" },
  ];
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? questions.filter(q => selected[q.id] === q.answer).length : 0;
  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 4 — Literal or Figurative?">
        Mark each underlined phrase as <Bold>L</Bold> (literal) or <Bold>F</Bold> (figurative).
      </Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px 20px", marginBottom: "10px" }}>
          <p style={{ fontSize: "14px", color: "#374151", marginBottom: "12px" }}><strong>{q.id}.</strong> {q.text}</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {["L", "F"].map(opt => {
              const chosen = selected[q.id] === opt;
              const correct = opt === q.answer;
              let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
              if (submitted && chosen && correct)  { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              if (submitted && chosen && !correct) { bg = "#fff1f2"; border = "#fecdd3"; color = "#dc2626"; }
              if (submitted && !chosen && correct) { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              return <button key={opt} onClick={() => !submitted && setSelected({ ...selected, [q.id]: opt })}
                style={{ padding: "8px 20px", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: bg, color, fontWeight: chosen ? 700 : 400, fontSize: "14px", cursor: submitted ? "default" : "pointer" }}>{opt}</button>;
            })}
          </div>
          {submitted && <p style={{ marginTop: "8px", fontSize: "13px", color: "#6b7280" }}>— {q.why}</p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
        {!submitted
          ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span><button onClick={() => { setSubmitted(false); setSelected({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

function Ex5Collocations() {
  const questions = [
    { id: 1, noun: "a mistake",      answer: "make",          options: ["make","do","keep","have"] },
    { id: 2, noun: "a record",       answer: "keep",          options: ["make","do","keep","have"] },
    { id: 3, noun: "research",       answer: "do",            options: ["make","do","keep","have"] },
    { id: 4, noun: "a conversation", answer: "have",          options: ["make","do","keep","have"] },
    { id: 5, noun: "revision",       answer: "do",            options: ["make","do","keep","have"] },
    { id: 6, noun: "a guess",        answer: "make",          options: ["make","do","keep","have"] },
    { id: 7, noun: "an experiment",  answer: "do",            options: ["make","do","keep","have"] },
    { id: 8, noun: "notes",          answer: "make / take",   options: ["make","take","do","keep"] },
  ];
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const check = (id) => {
    const q = questions.find(q => q.id === id);
    return q.answer.split(" / ").some(a => a.trim() === selected[id]);
  };
  const score = submitted ? questions.filter(q => check(q.id)).length : 0;
  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 5 — Collocations">Choose the correct verb: <Bold>make</Bold>, <Bold>keep</Bold>, <Bold>do</Bold>, or <Bold>have</Bold>.</Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${submitted ? (check(q.id) ? "#86efac" : "#fecdd3") : "#e5e7eb"}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "10px" }}>
          <p style={{ fontSize: "14px", color: "#374151", marginBottom: "10px" }}><strong>{q.id}.</strong> _____ {q.noun}</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {q.options.map(opt => {
              const chosen = selected[q.id] === opt;
              const correct = q.answer.split(" / ").some(a => a.trim() === opt);
              let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
              if (submitted && chosen && correct)  { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              if (submitted && chosen && !correct) { bg = "#fff1f2"; border = "#fecdd3"; color = "#dc2626"; }
              if (submitted && !chosen && correct) { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              return <button key={opt} onClick={() => !submitted && setSelected({ ...selected, [q.id]: opt })}
                style={{ padding: "8px 18px", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: bg, color, fontWeight: chosen ? 700 : 400, fontSize: "14px", cursor: submitted ? "default" : "pointer" }}>{opt}</button>;
            })}
          </div>
          {submitted && <p style={{ marginTop: "8px", fontSize: "13px", color: check(q.id) ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
            {check(q.id) ? "✓ Correct!" : `✗ Answer: ${q.answer}`}
          </p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
        {!submitted
          ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span><button onClick={() => { setSubmitted(false); setSelected({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

function Ex10ConversationDiscussionArgument() {
  const questions = [
    { id: 1, situation: "Two colleagues meet in the corridor and chat about the weekend.",               answer: "conversation", options: ["conversation","discussion","argument"] },
    { id: 2, situation: "A class debates whether social media is harmful to teenagers.",                  answer: "discussion",   options: ["conversation","discussion","argument"] },
    { id: 3, situation: "Two friends disagree loudly about whose fault an accident was.",                answer: "argument",     options: ["conversation","discussion","argument"] },
    { id: 4, situation: "A teacher and student talk about the student's progress.",                      answer: "conversation", options: ["conversation","discussion","argument"] },
    { id: 5, situation: "A couple shout at each other over unpaid bills.",                              answer: "argument",     options: ["conversation","discussion","argument"] },
  ];
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? questions.filter(q => selected[q.id] === q.answer).length : 0;
  return (
    <div style={{ marginTop: "32px" }}>
      <Callout type="note" title="Exercise 10 — Conversation / Discussion / Argument?">Choose the best word for each situation.</Callout>
      {questions.map((q) => (
        <div key={q.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
          <p style={{ fontSize: "14px", color: "#374151", fontStyle: "italic", marginBottom: "12px" }}>{q.id}. {q.situation}</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {q.options.map(opt => {
              const chosen = selected[q.id] === opt;
              const correct = opt === q.answer;
              let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
              if (submitted && chosen && correct)  { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              if (submitted && chosen && !correct) { bg = "#fff1f2"; border = "#fecdd3"; color = "#dc2626"; }
              if (submitted && !chosen && correct) { bg = "#f0fdf4"; border = "#86efac"; color = "#16a34a"; }
              return <button key={opt} onClick={() => !submitted && setSelected({ ...selected, [q.id]: opt })}
                style={{ padding: "8px 18px", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: bg, color, fontWeight: chosen ? 700 : 400, fontSize: "14px", cursor: submitted ? "default" : "pointer" }}>{opt}</button>;
            })}
          </div>
          {submitted && <p style={{ marginTop: "8px", fontSize: "13px", color: selected[q.id] === q.answer ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
            {selected[q.id] === q.answer ? "✓ Correct!" : `✗ Answer: ${q.answer}`}
          </p>}
        </div>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
        {!submitted
          ? <button onClick={() => setSubmitted(true)} style={{ padding: "11px 28px", backgroundColor: "#036c48", color: "#fff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Check Answers</button>
          : <><span style={{ fontSize: "15px", fontWeight: 700, color: "#036c48" }}>{score} / {questions.length} correct</span><button onClick={() => { setSubmitted(false); setSelected({}); }} style={{ padding: "11px 28px", backgroundColor: "#f3f4f6", color: "#374151", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>Try Again</button></>}
      </div>
    </div>
  );
}

export function PracticeContent() {
  return (
    <div>
      <Callout type="info" title="How to Use This Practice File">
        Work through exercises in order. <Bold>Do not check answers until you finish each exercise.</Bold> Read every explanation — even for correct answers.
      </Callout>
      <Ex1Dialogue />
      <Ex4LiteralOrFigurative />
      <Ex5Collocations />
      <Ex10ConversationDiscussionArgument />
      <div style={{ marginTop: "32px", padding: "20px 24px", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>Exercises 2, 3, 6, 7, 8, 9, 11 & 12</p>
        <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: 1.7 }}>Question formation, register rewriting, word families, vocabulary matching, ambiguity analysis, register choice, error correction, and free writing require written responses. Complete them in your notebook using the Answer Key in the unit file.</p>
      </div>
    </div>
  );
}

const Unit1 = { meta, tocItems, TopicContent, PracticeContent };
export default Unit1;
