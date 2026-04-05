"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── Data ───────────────────────────────────────────────── */
const SOURCES_KEY = {
  "LAWS 4": "Longman Academic Writing Series 4",
  "LAWS 5": "Longman Academic Writing Series 5",
  WAE: "Writing Academic English",
  CSW: "Cambridge Study Writing",
  IW4: "Inside Writing 4",
  "50S": "50 Steps to Improving Your Academic Writing",
};

const phases = [
  {
    id: "phase-1", num: 1, title: "Paragraph Foundations",
    color: { accent: "#0369a1", light: "#f0f9ff", border: "#bae6fd", text: "#0c4a6e", badge: "#dbeafe" },
    units: [
      {
        id: "unit-01", num: "01", title: "Paragraph Structure",
        goal: "Master the internal structure of an academic paragraph. Understand how topic sentences, supporting sentences, and concluding sentences work together as a unified whole.",
        concept: "A paragraph discusses one and only one main idea. Its three parts — topic sentence, supporting sentences, and concluding sentence — work as a system: the topic sentence makes a promise, the supporting sentences fulfill it, and the concluding sentence closes it.",
        keyTopics: [
          "The three parts of a paragraph: topic sentence, supporting sentences, concluding sentence",
          "The topic sentence: complete sentence, topic + controlling idea, not too general / not too specific",
          "Position of topic sentences: first vs. last placement",
          "Word families: building vocabulary through related word forms",
          "Supporting sentences: examples, facts, statistics, quotations",
          "Opinions vs. facts vs. specific supporting details",
          "The concluding sentence and end-of-paragraph signals",
          "The six-step writing process",
        ],
        grammarFocus: "Subject-verb agreement; sentence boundaries; avoiding fragments; common word endings (-ate, -ive, -ful, -ly, -tion)",
        practiceTasks: [
          "Analyze a model paragraph: identify all three structural parts",
          "Choose best topic sentences: label too general / too specific / incomplete / best",
          "Identify topic and controlling idea in given sentences",
          "Write topic sentences for given paragraphs",
          "Classify supporting details: O / F-NP / SSD",
          "Write concluding sentences using end-of-paragraph signals",
          "Apply all six writing process steps to produce a final paragraph (10–15 sentences)",
          "Timed writing: 30-minute paragraph",
        ],
        mainSource: "LAWS 4 — Chapter 1",
        supplementary: [
          { code: "WAE", ref: "Chapter 1", note: "Paragraph Structure: Three Parts, Topic Sentence, Supporting Sentences, Concluding Sentence" },
          { code: "CSW", ref: "Unit 1", note: "The Academic Writing Process; distinguishing academic and personal styles; grammar of academic discourse" },
          { code: "IW4", ref: "Unit 4", note: "Music and Memory: Supporting Ideas; Developing Paragraphs" },
          { code: "50S", ref: "Unit D, Steps 3–5", note: "Characteristics of a good paragraph; What to include in an introduction; What to include in a conclusion" },
        ],
        topic: {
          subject: "Human Biology — Sleep Science",
          main: "How sleep deprivation silently undermines cognitive performance",
          subtopics: [
            "Sleep mechanisms and the brain's prefrontal cortex",
            "Memory consolidation during sleep cycles",
            "Performance degradation: reaction time and judgment",
            "The surgeon and the student — real-world cases",
            "Public health consequences of chronic sleep deprivation",
          ],
        },
      },
      {
        id: "unit-02", num: "02", title: "Unity and Coherence",
        goal: "Distinguish between unity (every sentence serves the controlling idea) and coherence (sentences flow logically). Learn the four tools that create coherent academic prose.",
        concept: "Unity means a paragraph has no off-topic sentences. Coherence means the sentences connect smoothly and logically. Both qualities are required — a paragraph can be unified but still incoherent, or coherent but unfocused.",
        keyTopics: [
          "Unity: identifying and removing off-topic sentences",
          "Coherence: the four tools — transition signals, repetition of key nouns, consistent pronouns, logical order",
          "Transition signals by category: addition, contrast, cause/effect, example, time, conclusion",
          "Pronoun reference and noun substitution",
          "Logical order: time order, space order, order of importance",
        ],
        grammarFocus: "Pronoun-antecedent agreement; transition expressions with correct punctuation (semicolons vs. commas); parallel structure in lists",
        practiceTasks: [
          "Identify and remove unity violations in given paragraphs",
          "Fill in appropriate transition signals in gapped paragraphs",
          "Rearrange scrambled sentences into a coherent paragraph",
          "Label transitions by category",
          "Rewrite an incoherent paragraph using all four coherence tools",
          "Write a coherent paragraph using minimum 5 different transition types",
        ],
        mainSource: "LAWS 4 — Chapter 2",
        supplementary: [
          { code: "WAE", ref: "Chapter 2", note: "Unity and Coherence: Repetition of Key Nouns; Consistent Pronouns; Transition Signals; Logical Order" },
          { code: "CSW", ref: "Unit 9", note: "The Whole Academic Text: S-P-S-E structure; language of coherence and connection" },
          { code: "IW4", ref: "Unit 6", note: "Everyday Economics: Cause and Effect; Supporting with Reason" },
          { code: "50S", ref: "Unit F, Steps 3–5", note: "How can I make my writing more coherent? How can I make my writing more cohesive? What linking devices can I use?" },
        ],
        topic: {
          subject: "Economics — Inequality",
          main: "How income inequality erodes social trust and community cohesion",
          subtopics: [
            "Defining economic inequality and how it is measured",
            "The relationship between wealth gaps and interpersonal trust",
            "Psychological effects of inequality on communities",
            "Comparative data across high- and low-inequality countries",
            "Policy responses and their measured social outcomes",
          ],
        },
      },
    ],
  },
  {
    id: "phase-2", num: 2, title: "Paragraph Mastery",
    color: { accent: "#7c3aed", light: "#faf5ff", border: "#ede9fe", text: "#4c1d95", badge: "#ede9fe" },
    units: [
      {
        id: "unit-03", num: "03", title: "Using Outside Sources",
        subtitle: "Quotation, Paraphrase, Summary, Citation",
        goal: "Learn to use outside sources ethically and effectively. Master the distinction between quoting, paraphrasing, and summarizing — and know when to use each.",
        concept: "Academic writing does not simply present personal opinions — it positions a writer's ideas within a larger conversation of scholarship. Using sources correctly means giving credit, maintaining your own voice, and integrating evidence seamlessly.",
        keyTopics: [
          "Plagiarism: what it is and why it matters",
          "Correct citation formats: in-text (APA) and reference list",
          "Direct quotations: reporting verbs and phrases, punctuation rules",
          "Changing direct quotations to indirect quotations",
          "Paraphrasing: read → understand → look away → rewrite in your own words",
          "The difference between weak paraphrase and true paraphrase",
          "Summarizing: extracting the main idea only",
          "Using quotations, paraphrases, and summaries as support",
        ],
        grammarFocus: "Reporting verbs (argues, claims, suggests, demonstrates, states, notes, observes); passive for distancing (it has been shown that, research suggests that); tense consistency in reported speech",
        practiceTasks: [
          "Identify plagiarism in 5 student examples and explain why each is wrong",
          "Convert 5 direct quotations to indirect quotations",
          "Paraphrase 5 academic sentences without looking at the original",
          "Write a 100-word summary of a provided paragraph",
          "Compare: original text / weak paraphrase / strong paraphrase — label and explain",
          "Write 2 body paragraphs integrating a quotation, a paraphrase, and a statistic with APA citation",
        ],
        mainSource: "LAWS 4 — Chapter 3",
        supplementary: [
          { code: "WAE", ref: "Chapter 3 + Chapter 8", note: "Supporting Details: Facts, Quotations, Statistics; Paraphrase and Summary" },
          { code: "CSW", ref: "Unit 10", note: "Plagiarism; Creating citations; In your own words: Paraphrase and Summary; Authorial identity" },
          { code: "IW4", ref: "Unit 7", note: "Borrowing or Stealing? Using Sources; Using Quotations" },
          { code: "50S", ref: "Unit A, Steps 3–5", note: "What is plagiarism? How can I use other people's ideas? How can I reference properly?" },
        ],
        topic: {
          subject: "Technology — Artificial Intelligence",
          main: "AI diagnostic tools in healthcare: capability, accuracy, and ethical implications",
          subtopics: [
            "How AI diagnostic tools work (machine learning, pattern recognition)",
            "Accuracy rates compared to human physicians in radiology and pathology",
            "Ethical concerns: algorithmic bias, accountability, patient consent",
            "Privacy and data collection issues in medical AI systems",
            "Expert medical and research perspectives on integration",
          ],
        },
      },
      {
        id: "unit-04", num: "04", title: "Patterns of Organization I",
        subtitle: "Listing Order, Time Order, Process Order",
        goal: "Learn how to organize paragraphs using listing order, chronological/time order, and process description. Recognize which organizational pattern suits which communicative purpose.",
        concept: "Ideas do not all organize themselves the same way. A paragraph about reasons for a trend requires listing order. A paragraph about a historical sequence requires time order. A paragraph explaining how something works requires process order. Choosing the right pattern is a structural decision that shapes everything that follows.",
        keyTopics: [
          "Listing order: facts or reasons with no time relationship; transition signals (first, second, also, in addition, finally)",
          "Time order: events in chronological sequence; past tense consistency; time markers",
          "Process order: directive (how to do) vs. informative (how something works)",
          "Signal words for each pattern",
          "Imperative mood for directive process writing",
          "Passive voice introduction for informative/scientific process",
        ],
        grammarFocus: "Imperative mood for directive process; past tense consistency in time-order paragraphs; passive voice introduction (is + past participle); if/when conditional clauses for warnings in process writing",
        practiceTasks: [
          "Classify 10 paragraph prompts by most appropriate organizational pattern",
          "Fill in transition signals in gapped listing-order paragraphs",
          "Arrange scrambled time-order sentences into correct sequence",
          "Identify whether a process paragraph is directive or informative",
          "Write a listing-order paragraph (150 words)",
          "Write a process paragraph explaining how something works (150–180 words)",
        ],
        mainSource: "LAWS 4 — Chapter 4 (Part 1: Listing and Time/Process Order)",
        supplementary: [
          { code: "WAE", ref: "Chapter 5", note: "Chronological Order: Process Essays; Thesis Statements for Process; Transition Signals" },
          { code: "CSW", ref: "Unit 7", note: "Describing processes and products; Language for writing about processes; Nominalisations" },
          { code: "IW4", ref: "Unit 3", note: "A Powerful Force: Writing a Proposal; Writing a Synopsis — process-based writing" },
          { code: "50S", ref: "Unit D, Step 1", note: "What different types of academic writing are there?" },
        ],
        topic: {
          subject: "Biology — Life Sciences",
          main: "How vaccines are developed from initial discovery to public deployment",
          subtopics: [
            "The drug discovery phase: identifying candidate compounds",
            "Clinical trial phases: Phase I, II, and III testing",
            "The regulatory approval process: how agencies evaluate evidence",
            "mRNA technology as a new type of vaccine development process",
            "The timeline from laboratory research to mass vaccination campaign",
          ],
        },
      },
      {
        id: "unit-05", num: "05", title: "Patterns of Organization II",
        subtitle: "Comparison/Contrast and Cause/Effect",
        goal: "Master two of the most frequently required organizational patterns in academic writing: comparison/contrast and cause/effect. Learn both block and point-by-point structures for comparison, and causal chain vs. multiple-cause structures for effect.",
        concept: "Some ideas are best understood next to each other (comparison/contrast). Others are best understood as chains of consequence (cause/effect). Both patterns require deliberate structural choice — not just content knowledge but organizational thinking.",
        keyTopics: [
          "Comparison/contrast: block method vs. point-by-point method",
          "Choosing between block and point-by-point deliberately",
          "Similarity and difference signal language",
          "Comparative adjectives and adverbs",
          "Cause/effect: multiple causes → one effect; one cause → multiple effects; causal chain",
          "Causal language: lead to, result in, contribute to, be responsible for, stem from",
          "Distinguishing immediate causes from underlying/root causes",
          "Hedging causal claims: may, might, appear to",
        ],
        grammarFocus: "Comparative and superlative structures; parallel grammatical forms (noun vs. noun, -ing vs. -ing); contrast conjunctions (while, whereas, although); causal conjunctions (because, since, therefore, as a result, consequently)",
        practiceTasks: [
          "Create block AND point-by-point outlines for the same topic — evaluate which is more effective and why",
          "Label sentences as showing similarity, difference, cause, or effect",
          "Map a cause/effect chain diagram for a given topic before writing",
          "Write a comparison/contrast paragraph using point-by-point structure (200 words)",
          "Write a cause/effect paragraph (180–200 words)",
          "Identify and correct 5 oversimplified or false causal claims",
        ],
        mainSource: "LAWS 4 — Chapter 4 (Part 2: Comparison/Contrast and Cause/Effect)",
        supplementary: [
          { code: "WAE", ref: "Chapter 6 + Chapter 7", note: "Cause/Effect Essays: Block Organization; Chain Organization; Comparison/Contrast Essays: Point-by-Point; Block" },
          { code: "CSW", ref: "Unit 3", note: "Exploring comparison and contrast structures; Language of comparison and contrast" },
          { code: "IW4", ref: "Unit 6", note: "Everyday Economics: Cause and Effect; Supporting with Reason" },
          { code: "50S", ref: "Unit G, Steps 4–5", note: "How can I compare and contrast different ideas? What language should I use to interpret tables and graphs?" },
        ],
        topic: {
          subject: "Environment — Pollution and Waste",
          main: "The causes and cascading effects of microplastic contamination in ocean ecosystems",
          subtopics: [
            "Sources of microplastics: industrial waste, consumer products, agricultural runoff",
            "How microplastics enter and travel through the marine food chain",
            "Effects on marine wildlife: ingestion, entanglement, reproductive damage",
            "Effects on human health through contaminated seafood",
            "Comparison: countries with strong vs. weak plastic regulation — measurable outcomes",
          ],
        },
      },
    ],
  },
  {
    id: "phase-3", num: 3, title: "Essay Architecture",
    color: { accent: "#0f766e", light: "#f0fdfa", border: "#99f6e4", text: "#134e4a", badge: "#ccfbf1" },
    units: [
      {
        id: "unit-06", num: "06", title: "From Paragraph to Essay",
        goal: "Understand how paragraph-level skills scale up to full essay structure. See and apply the parallel between paragraph architecture and essay architecture.",
        concept: "An essay is a paragraph scaled up. The topic sentence becomes the thesis statement. Each body paragraph functions as an expanded supporting sentence. The concluding paragraph echoes the conclusion sentence. Understanding this parallel makes the transition from paragraph to essay writer natural rather than overwhelming.",
        keyTopics: [
          "Essay structure: introductory paragraph, body paragraphs, concluding paragraph",
          "The parallel between paragraph parts and essay parts",
          "How body paragraphs function as expanded topic sentences",
          "Transitions between paragraphs (not just within them)",
          "Essay outlining: formal vs. informal outline",
          "Patterns of organization and how they shape essay structure",
        ],
        grammarFocus: "Present tense for general statements; sentence variety in longer texts; avoiding repetitive paragraph openings",
        practiceTasks: [
          "Label all structural components of 2 model essays",
          "Convert a well-developed paragraph into a 3-paragraph mini-essay",
          "Write a formal essay outline: thesis + 3 topic sentences + concluding idea",
          "Identify how each body paragraph connects to the thesis",
          "Diagram the parallel structure: paragraph parts vs. essay parts",
        ],
        mainSource: "LAWS 4 — Chapter 4 (Parts of an Essay; Patterns of Organization; Outlines)",
        supplementary: [
          { code: "WAE", ref: "Chapter 4", note: "From Paragraph to Essay: Introductory Paragraph; Body Paragraphs; Concluding Paragraph; Essay Outlining" },
          { code: "LAWS 5", ref: "Chapter 1", note: "Expository Essays: Clear Thesis Statement; Topic Sentences; Strong Conclusion" },
          { code: "CSW", ref: "Unit 9", note: "S-P-S-E: Focus on structure; S-P-S-E in the Introduction" },
          { code: "50S", ref: "Unit D, Steps 1–2", note: "What different types of academic writing are there? How is text organized in academic writing?" },
        ],
        topic: {
          subject: "Education — Learning and Teaching",
          main: "How different educational systems around the world approach student assessment",
          subtopics: [
            "Assessment types: standardized exams, portfolios, continuous evaluation",
            "European vs. North American vs. East Asian assessment models compared",
            "The relationship between assessment design and actual learning outcomes",
            "Technology's emerging role in assessment",
            "Educational equity: how assessment systems advantage or disadvantage different groups",
          ],
        },
      },
      {
        id: "unit-07", num: "07", title: "The Thesis Statement",
        goal: "Write strong, arguable, specific thesis statements. Understand what makes a thesis effective and how it controls the entire essay.",
        concept: "The thesis statement is a promise to the reader. It names the topic, states a specific controlling angle, and commits the writer to proving a claim — not merely describing a subject. Every body paragraph must fulfill this promise. A weak thesis produces a weak essay no matter how strong the supporting paragraphs are.",
        keyTopics: [
          "Thesis vs. topic: the critical difference",
          "Characteristics of a strong thesis: specific, arguable, unified",
          "Problems to avoid: too broad, too narrow, too many ideas, factual statement, announcement",
          "Single-point vs. multi-point thesis statements",
          "Parallel structure in multi-point thesis statements",
          "Testing a thesis: the 'so what?' and 'could someone disagree?' tests",
          "Position of thesis in the introductory paragraph",
        ],
        grammarFocus: "Parallel grammatical structure in multi-point thesis statements; avoiding 'I will discuss...' and 'This essay will show...' constructions; hedging language when appropriate",
        practiceTasks: [
          "Evaluate 10 thesis statements: label strong / too broad / too narrow / factual / announcement",
          "Rewrite 5 weak thesis statements into strong ones",
          "Write thesis statements for 5 different essay prompts",
          "Test each thesis: apply the 'so what?' and 'could someone disagree?' challenge",
          "Write a full introductory paragraph (150 words) built around one of your thesis statements",
        ],
        mainSource: "LAWS 4 — Chapter 4 (Organization and Thesis Statements section)",
        supplementary: [
          { code: "WAE", ref: "Chapter 4", note: "Thesis Statement; Thesis Statement Pitfalls; Logical Division of Ideas; Thesis Statements for Logical Division" },
          { code: "LAWS 5", ref: "Chapter 1 + Chapter 9", note: "A Clear Thesis Statement; Developing an Effective Thesis Statement" },
          { code: "CSW", ref: "Unit 8", note: "What is an argument? Language of argument" },
          { code: "50S", ref: "Unit C, Step 5", note: "What is a thesis statement and how do I write one?" },
        ],
        topic: {
          subject: "Environment — Climate Change",
          main: "The debate over individual vs. corporate responsibility for reducing carbon emissions",
          subtopics: [
            "Carbon cycle disruption and its measurable human causes",
            "Comparative carbon footprints: individuals vs. corporations — the data",
            "Feedback loops and tipping points: why urgency matters",
            "Policy instruments: carbon pricing, cap and trade, personal carbon budgets",
            "Scientific consensus and future projections under different scenarios",
          ],
        },
      },
      {
        id: "unit-08", num: "08", title: "Introductions and Conclusions",
        goal: "Write compelling introductions using five distinct hook techniques. Write conclusions that synthesize and close — without simply repeating what came before.",
        concept: "The introduction and conclusion are the reader's entry and exit points. A strong introduction earns attention and states a clear thesis. A strong conclusion synthesizes the argument and leaves the reader with something to carry away. Both fail when they are treated as formalities rather than as active rhetorical choices.",
        keyTopics: [
          "Introduction structure: funnel (general → specific → thesis)",
          "Five hook types: anecdote, surprising statistic, rhetorical question, definition, quotation",
          "Background information: how much is enough",
          "Conclusion functions: synthesize, not summarize; close, not repeat",
          "Three conclusion strategies: call to action, prediction, recommendation",
          "End-of-essay signals and their appropriate register",
          "What a conclusion must never do: introduce new ideas",
        ],
        grammarFocus: "Present tense for generalizations in introductions; hedging language for predictions in conclusions (could, might, may well); modal verbs for recommendations (should, ought to, must)",
        practiceTasks: [
          "Identify the hook type in 6 model introductions",
          "Write 3 different hook types for the same thesis statement",
          "Analyze 3 conclusions: identify the strategy used and evaluate its effectiveness",
          "Identify and rewrite a flawed conclusion that introduces new ideas",
          "Write a complete introduction + conclusion pair for an essay outline from Unit 7",
        ],
        mainSource: "LAWS 4 — Chapter 4 (The Introductory Paragraph; The Concluding Paragraph)",
        supplementary: [
          { code: "WAE", ref: "Chapter 4", note: "Funnel Introduction; Attention-Getting Introduction; Thesis Statement; The Concluding Paragraph" },
          { code: "LAWS 5", ref: "Chapter 1", note: "A Strong Conclusion" },
          { code: "CSW", ref: "Unit 9", note: "S-P-S-E in the Introduction; language of coherence and connection" },
          { code: "IW4", ref: "Unit 10", note: "Digging through History: Introductions and Conclusions" },
          { code: "50S", ref: "Unit D, Steps 4–5", note: "What should be included in my introduction? What should be included in my conclusion?" },
        ],
        topic: {
          subject: "Technology — Internet and Digital Communication",
          main: "Whether social media platforms should be legally required to remove misinformation",
          subtopics: [
            "The scale and speed of online misinformation: documented cases and data",
            "How algorithmic news feeds amplify false content",
            "The tension between free speech and public harm",
            "What existing regulation in different countries looks like",
            "Platform responsibility vs. government regulation: the core debate",
          ],
        },
      },
    ],
  },
  {
    id: "phase-4", num: 4, title: "Rhetorical Modes I",
    color: { accent: "#b45309", light: "#fffbeb", border: "#fde68a", text: "#78350f", badge: "#fef3c7" },
    units: [
      {
        id: "unit-09", num: "09", title: "Process Essays",
        goal: "Write clear, logically sequenced process essays. Distinguish between directive process (how to do something) and informative process (how something works).",
        concept: "Process essays explain sequence. The directive process teaches the reader to perform something — the reader is an actor. The informative process explains how something operates — the reader is an observer. Each requires different language choices, especially regarding imperative mood and passive voice.",
        keyTopics: [
          "Directive vs. informative process: choosing the right type for the purpose",
          "Thesis statements for process essays: what the process is + why it matters",
          "Body paragraphs in a process essay: each step fully explained",
          "Transition signals for chronological order (first, next, then, after that, once, finally, at this point)",
          "Warnings and conditions in process writing (if/when clauses)",
          "Passive voice in scientific and informative process description",
          "When to use passive vs. active in process writing",
        ],
        grammarFocus: "Passive voice construction (is/are + past participle; is/are being + past participle); imperative mood for directive process; if/when conditional clauses for warnings; sequence adverbials and their punctuation",
        practiceTasks: [
          "Classify 8 process prompts as directive or informative",
          "Rewrite 5 active-voice process sentences in appropriate passive voice",
          "Identify missing or out-of-order steps in a flawed process paragraph",
          "Write a process paragraph using passive voice for a scientific process (150 words)",
          "Write a full process essay (400–500 words)",
          "Peer test: follow another student's directive process instructions literally — identify gaps",
        ],
        mainSource: "LAWS 4 — Chapter 5",
        supplementary: [
          { code: "WAE", ref: "Chapter 5", note: "Chronological Order: Process Essays; Thesis Statements for Process Essay; Transition Signals for Chronological Order" },
          { code: "LAWS 5", ref: "Chapter 3", note: "Process Essays: Organization; Introductory and Body and Concluding Paragraphs; Outlining; Transitions between Steps" },
          { code: "CSW", ref: "Unit 7", note: "Describing processes and products; Language for writing about processes; Nominalisations; Writing the Methods section" },
          { code: "IW4", ref: "Unit 5", note: "R U Txting in Class? Old-New Information; Summarizing Data; Passive Voice" },
          { code: "50S", ref: "Unit G, Step 2", note: "How can I show cause and effect? (process sequencing)" },
        ],
        topic: {
          subject: "Natural Sciences — Biology",
          main: "How the human immune system recognizes and responds to a new pathogen",
          subtopics: [
            "First contact: how the innate immune system detects an invader",
            "The adaptive immune response: B cells, T cells, and antibody production",
            "Memory formation: how the immune system prepares for future encounters",
            "How vaccines exploit this natural process",
            "The timeline from exposure to full immune response",
          ],
        },
      },
      {
        id: "unit-10", num: "10", title: "Cause/Effect Essays",
        goal: "Write essays that analyze causes, effects, or both. Build logical causal chains. Avoid oversimplification and the post hoc fallacy. Use hedging language appropriately.",
        concept: "Causal analysis is one of the most intellectually demanding essay modes because it requires not just identifying what happened but explaining why — and that explanation must be logically defensible, properly hedged, and clearly distinguished from mere correlation.",
        keyTopics: [
          "Three cause/effect structures: multiple causes → one effect; one cause → multiple effects; causal chain",
          "Block organization: all causes, then all effects",
          "Chain organization: cause → effect → cause → effect",
          "Causal language: lead to, result in, contribute to, be responsible for, stem from, be due to",
          "Distinguishing immediate from underlying/root causes",
          "Post hoc fallacy: correlation does not equal causation",
          "Hedging uncertain causality: may, might, could, appear to, seem to",
        ],
        grammarFocus: "Causal conjunctions and transitions; subordinate clauses of reason (because, since, as); result clauses (so...that, such...that); hedging modal verbs; contrast between active and passive in causal sentences",
        practiceTasks: [
          "Draw causal chain diagrams for 3 given topics before writing",
          "Identify and correct 5 sentences containing oversimplified or false causal claims",
          "Label given sentences as showing cause or effect",
          "Identify whether a model essay uses block or chain organization",
          "Write a cause/effect essay (450–550 words) on a social or scientific topic",
          "Self-edit: verify every causal claim is logically justified and appropriately hedged",
        ],
        mainSource: "LAWS 4 — Chapter 6",
        supplementary: [
          { code: "WAE", ref: "Chapter 6", note: "Cause/Effect Essays: Block Organization; Chain Organization; Cause and Effect Signal Words and Phrases" },
          { code: "LAWS 5", ref: "Chapter 4", note: "Cause/Effect Essays: Chain Organization; Block Organization; Distinguishing Cause and Effect; Using Parallelism" },
          { code: "CSW", ref: "Unit 6", note: "Writing about events in time; Connecting events in a text" },
          { code: "IW4", ref: "Unit 6", note: "Everyday Economics: Cause and Effect; Supporting with Reason" },
          { code: "50S", ref: "Unit G, Step 2", note: "How can I show cause and effect?" },
        ],
        topic: {
          subject: "Environment — Climate Change",
          main: "The causes and cascading societal effects of accelerating global temperature rise",
          subtopics: [
            "Carbon cycle disruption: human vs. natural causes — the evidence",
            "Feedback loops: how warming accelerates further warming",
            "Immediate effects: extreme weather events, sea level rise, ice sheet loss",
            "Underlying effects: food insecurity, mass migration, geopolitical instability",
            "Tipping points: thresholds beyond which change becomes self-sustaining",
          ],
        },
      },
      {
        id: "unit-11", num: "11", title: "Comparison/Contrast Essays",
        goal: "Extend paragraph-level comparison skills to full essay length. Practice both block and point-by-point organization. Choose between them deliberately based on subject complexity.",
        concept: "Comparison/contrast essays reveal something about both subjects that could not be seen by examining either one alone. The choice of organizational method is not arbitrary — block works for simpler comparisons; point-by-point works better for complex, multi-aspect comparisons.",
        keyTopics: [
          "Scaling comparison from paragraph to essay level",
          "Block method: all of Subject A, then all of Subject B",
          "Point-by-point method: alternating between A and B on each point",
          "Choosing deliberately: what makes each method stronger in different contexts",
          "Thesis for comparison essays: states both subjects + the basis of comparison",
          "Balanced treatment: both subjects must receive equal development",
          "Transitions specific to comparison and contrast",
          "Concluding with a justified preference or synthesis",
        ],
        grammarFocus: "Comparative and superlative structures; parallel grammatical forms (noun vs. noun; -ing vs. -ing); contrast conjunctions (while, whereas, although, even though); comparison signals (similarly, likewise, in the same way)",
        practiceTasks: [
          "Create block AND point-by-point outlines for the same topic — then argue which is more effective",
          "Analyze a model essay: identify the organizational method and label all comparison/contrast transitions",
          "Identify and correct faulty parallel structure in 8 comparison sentences",
          "Write a comparison/contrast essay (450–550 words) using point-by-point structure",
          "Peer review: check for balance, transitions, and parallel structure",
        ],
        mainSource: "LAWS 4 — Chapter 7",
        supplementary: [
          { code: "WAE", ref: "Chapter 7", note: "Comparison/Contrast Essays: Point-by-Point Organization; Block Organization; Comparison and Contrast Signal Words" },
          { code: "LAWS 5", ref: "Chapter 8", note: "Argumentative Essays: Block and Point-by-Point comparison framework" },
          { code: "CSW", ref: "Unit 3", note: "Exploring comparison and contrast structures; Language of comparison and contrast; Using comparisons to evaluate and recommend" },
          { code: "IW4", ref: "Unit 10", note: "Digging through History: Comparing and Contrasting Sources; Introductions and Conclusions" },
          { code: "50S", ref: "Unit G, Step 4", note: "How can I compare and contrast different ideas?" },
        ],
        topic: {
          subject: "Education — Learning Models",
          main: "Traditional classroom learning compared to online learning across key dimensions",
          subtopics: [
            "Social interaction and community building in each model",
            "Flexibility, access, and geographic equity",
            "Learning outcomes: what peer-reviewed research shows",
            "Cost structures: student, institutional, and national perspectives",
            "The emerging hybrid/blended model as a synthesis of both",
          ],
        },
      },
    ],
  },
  {
    id: "phase-5", num: 5, title: "Rhetorical Modes II",
    color: { accent: "#15803d", light: "#f0fdf4", border: "#bbf7d0", text: "#14532d", badge: "#dcfce7" },
    units: [
      {
        id: "unit-12", num: "12", title: "Classification Essays",
        goal: "Write essays that categorize information systematically. Apply a single, consistent organizing principle across mutually exclusive categories.",
        concept: "Classification imposes order on complexity. It is not simply sorting — it requires identifying a single principle that governs all categories, ensuring the categories do not overlap, and ensuring all items fit within the system. A classification essay reveals how the writer understands the structure of a subject.",
        keyTopics: [
          "Classification: one organizing principle, mutually exclusive categories",
          "How to choose an organizing principle deliberately",
          "Avoiding overlapping categories",
          "Category signal language: can be divided into, fall into, belong to, are classified as",
          "Thesis for classification essays: names subject + states organizing principle + previews categories",
          "Body paragraph structure for classification essays",
          "Concluding paragraph: what the classification reveals",
        ],
        grammarFocus: "Passive voice for classification systems (can be divided into, are classified as); relative clauses for defining categories; parallel structure in listing categories",
        practiceTasks: [
          "Identify the organizing principle in 5 given classification systems",
          "Identify overlapping categories in 3 flawed classification paragraphs and explain the problem",
          "Design a classification system for a given topic: choose principle, name categories, justify",
          "Write a classification thesis statement for 5 different topics",
          "Write a full classification essay (400–500 words)",
          "Evaluate: does the classification reveal something meaningful, or is it merely decorative?",
        ],
        mainSource: "LAWS 5 — Chapter 2",
        supplementary: [
          { code: "WAE", ref: "Chapter 4", note: "Logical Division of Ideas — the closest WAE equivalent to classification" },
          { code: "CSW", ref: "Unit 2", note: "Recognising categories and classifications; The language of classification" },
          { code: "IW4", ref: "Unit 1", note: "Energy Drinks: Supporting an Argument; Counterarguments (classification of evidence types)" },
          { code: "50S", ref: "Unit D, Step 1", note: "What different types of academic writing are there?" },
        ],
        topic: {
          subject: "Psychology — Mental Health",
          main: "Classifying the major categories of anxiety disorders by their defining features and mechanisms",
          subtopics: [
            "Generalized Anxiety Disorder: diffuse, chronic worry without a specific trigger",
            "Social Anxiety Disorder: fear of social evaluation and its behavioral consequences",
            "Specific Phobias: disproportionate fear of defined objects or situations",
            "Post-Traumatic Stress Disorder: anxiety rooted in past traumatic experience",
            "The spectrum model vs. categorical model debate in clinical psychology",
          ],
        },
      },
      {
        id: "unit-13", num: "13", title: "Extended Definition Essays",
        goal: "Write essays that establish precise, nuanced meanings for complex or contested concepts. Go beyond dictionary definitions to explore how a term functions, what it excludes, and why defining it carefully matters.",
        concept: "Some concepts resist simple definition — not because they are vague, but because they are complex, contested, or discipline-specific. Extended definition essays use multiple strategies to build a complete understanding: formal definition, negation, comparison, example, etymology, and function.",
        keyTopics: [
          "Formal one-sentence definition: term + genus + differentia",
          "Extended definition strategies: negation, comparison, example, etymology, function, historical development",
          "How to choose which strategies to combine",
          "Thesis for extended definition essays: why this concept needs careful definition",
          "The place of definition in academic text",
          "Reduced relative clauses in formal definitions",
          "Operational definitions: how a concept is measured or applied in a specific field",
        ],
        grammarFocus: "Relative clauses for formal definitions (which, that, who); reduced relative clauses; passive voice in formal definitions; hedging language for contested definitions (may be defined as, is generally understood to mean)",
        practiceTasks: [
          "Write formal one-sentence definitions using genus + differentia for 5 academic terms",
          "Identify which definition strategy each model sentence uses",
          "Write an extended definition paragraph (200 words) going beyond a dictionary definition",
          "Analyze which definition strategy a model text uses and evaluate its effectiveness",
          "Write a full extended definition essay (400–500 words) on a contested academic concept",
        ],
        mainSource: "LAWS 5 — Chapter 5",
        supplementary: [
          { code: "WAE", ref: "Chapter 4", note: "Thesis Statement section — defining concepts in academic writing" },
          { code: "CSW", ref: "Unit 4", note: "The Clarity Principle; Language of definition; Reduced relative clauses; Extended definitions; The place of definition in academic text" },
          { code: "IW4", ref: "Unit 9", note: "Robots and Smart Machines: Discussing Two Sides of an Issue; Delayed Thesis (defining intelligence)" },
          { code: "50S", ref: "Unit G, Step 3", note: "How should I define unfamiliar words and phrases?" },
        ],
        topic: {
          subject: "Technology — Artificial Intelligence",
          main: "Defining 'intelligence' in artificial systems — where the boundaries lie and why the definition matters",
          subtopics: [
            "Classical definitions of intelligence from cognitive science and philosophy",
            "The Turing Test: what it tests and what it fails to test",
            "Narrow AI vs. General AI vs. Superintelligence — how each is formally defined",
            "Machine learning vs. human learning: key definitional distinctions",
            "Why the definition of AI intelligence carries significant ethical and legal consequences",
          ],
        },
      },
    ],
  },
  {
    id: "phase-6", num: 6, title: "Argumentation and Research",
    color: { accent: "#dc2626", light: "#fef2f2", border: "#fecaca", text: "#7f1d1d", badge: "#fee2e2" },
    units: [
      {
        id: "unit-14", num: "14", title: "The Argumentative Essay I",
        subtitle: "Taking a Position",
        goal: "Write a clear argumentative essay that takes and defends a position using logical reasoning, credible evidence, and sound structure. Understand the difference between opinion and argument.",
        concept: "Argument is not merely having an opinion — it is the structured, evidence-based defense of a position in response to a genuine question on which reasonable people disagree. An argumentative essay makes a claim, provides evidence, shows how the evidence supports the claim, and anticipates objections.",
        keyTopics: [
          "Claim types: fact claims, value claims, policy claims",
          "Evidence types and their relative strength: statistics, expert opinion, examples, facts",
          "Logical fallacies to avoid: ad hominem, straw man, slippery slope, false dichotomy, post hoc, hasty generalization",
          "The elements of an argumentative essay: claim, evidence, reasoning, counterargument",
          "Thesis statement for argumentative essays: clear, debatable, specific",
          "Statistics as support: how to cite, interpret, and avoid misusing data",
          "Introductory paragraph for argumentative essays: establishing the controversy",
          "Organizing arguments: strongest point first or last — a strategic choice",
        ],
        grammarFocus: "Modal verbs for degrees of certainty (must, should, ought to, could, might); hedging language (appears to, seems to, suggests that); reporting verbs for evidence; boosting language for strong claims (clearly, undeniably, it is evident that)",
        practiceTasks: [
          "Identify claim type, evidence type, and reasoning in 5 argument paragraphs",
          "Name the logical fallacy in 8 flawed argument examples",
          "Evaluate evidence: rank 5 pieces of evidence for the same claim from weakest to strongest — justify ranking",
          "Analyze a statistic: identify how it is being used and whether the use is valid",
          "Write an argument essay outline: thesis + 3 evidence-backed body paragraphs",
          "Write a full argumentative essay (500–600 words)",
        ],
        mainSource: "LAWS 4 — Chapter 8",
        supplementary: [
          { code: "WAE", ref: "Chapter 9", note: "Argumentative Essays: Organization; Introductory Paragraph; Thesis Statement" },
          { code: "LAWS 5", ref: "Chapter 8", note: "Argumentative Essays: Block and Point-by-Point; Introductory Paragraphs; Body Paragraphs; Knowing Your Audience; Finding Support" },
          { code: "CSW", ref: "Unit 8", note: "What is an argument? The language of argument; The Results and Discussion sections; The Relevance Principle" },
          { code: "IW4", ref: "Unit 1", note: "Energy Drinks: Supporting an Argument; Counterarguments" },
          { code: "50S", ref: "Unit E, Step 5", note: "How can I strengthen my argument?" },
        ],
        topic: {
          subject: "Health and Medicine — Public Health",
          main: "Should governments mandate vaccination programs for preventable diseases?",
          subtopics: [
            "The case for mandatory vaccination: herd immunity data, disease eradication history",
            "The case against: individual autonomy, religious exemptions, public trust concerns",
            "Statistical evidence from countries with different vaccination policy approaches",
            "Expert medical and legal perspectives on mandate effectiveness",
            "The difference between mandate and incentive-based policy models",
          ],
        },
      },
      {
        id: "unit-15", num: "15", title: "The Argumentative Essay II",
        subtitle: "Concession and Refutation",
        goal: "Strengthen argumentative essays by acknowledging counterarguments and refuting them effectively. Understand that concession is a sign of intellectual strength — not weakness.",
        concept: "Ignoring counterarguments does not make them disappear — it makes the writer look uninformed. Acknowledging the strongest version of an opposing view and then dismantling it with superior evidence is the mark of a mature academic arguer.",
        keyTopics: [
          "Concession: acknowledging genuine validity in an opposing view",
          "Refutation: dismantling the counterargument with stronger evidence or logic",
          "Concession language: although, while it is true that, admittedly, granted that, it may be true that",
          "Refutation structure: concede → but/however → stronger evidence",
          "Placement of concession/refutation paragraph: before or after main arguments — strategic choice",
          "How to choose which counterarguments to address",
          "Contrast signals for refutation: however, nevertheless, even so, on the other hand",
          "Problem/solution as a related argumentative structure",
        ],
        grammarFocus: "Concessive conjunctions and adverbial clauses (although, even though, while, whereas); contrast signals with correct punctuation; modal verbs for qualified concession (it may be true that, there may be some merit in)",
        practiceTasks: [
          "Write concession-refutation paragraphs for 3 given counterarguments",
          "Evaluate 3 student refutations: identify which is most effective and explain why",
          "Revise a previously written argumentative essay to add a concession-refutation paragraph",
          "Identify concession language and refutation language in a model essay",
          "Write a complete argumentative essay with concession-refutation integrated (550–650 words)",
        ],
        mainSource: "LAWS 4 — Chapter 8 (Expansion section: Rebutting an Argument)",
        supplementary: [
          { code: "WAE", ref: "Chapter 9", note: "Argumentative Essays — full chapter" },
          { code: "LAWS 5", ref: "Chapter 8 + Chapter 6", note: "Responding to Counterarguments; Research the Counterarguments; Problem/Solution Essays: Organization; Body Paragraphs; Synthesizing Sources" },
          { code: "CSW", ref: "Unit 5", note: "The Honesty Principle; Language of generalisation; Hedging generalisations; Boosting generalisations" },
          { code: "IW4", ref: "Unit 9", note: "Robots and Smart Machines: Discussing Two Sides of an Issue; Delayed Thesis" },
          { code: "50S", ref: "Unit E, Steps 3–4", note: "When should I use cautious or tentative language? How can I make my writing more complex?" },
        ],
        topic: {
          subject: "Urban Development — Housing",
          main: "Is urban densification the most effective solution to the affordable housing crisis?",
          subtopics: [
            "The affordable housing crisis: scale, causes, and who it affects most",
            "The case for densification: land use efficiency, transit access, reduced construction costs per unit",
            "The strongest counterargument: infrastructure strain, community disruption, accelerated gentrification",
            "Refutation: evidence from cities that managed densification without displacement",
            "Alternative approaches and why densification still holds structural advantages",
          ],
        },
      },
      {
        id: "unit-16", num: "16", title: "Research Skills",
        subtitle: "Evaluating Sources, Paraphrase, Summary, Citation",
        goal: "Develop the research skills needed for academic integrity: finding and evaluating sources, paraphrasing accurately, summarizing fairly, and citing in APA format.",
        concept: "Research writing is not a collection of other people's ideas — it is your argument, supported by carefully chosen evidence from credible sources. The writer's voice must remain present and in control. Sources serve the argument; the argument does not serve the sources.",
        keyTopics: [
          "Source evaluation: the CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose)",
          "Types of sources: primary, secondary, peer-reviewed, grey literature",
          "Paraphrase: the three-step method (read → understand → look away → rewrite)",
          "The difference between weak paraphrase and true paraphrase",
          "Summary vs. paraphrase: what each captures and when to use each",
          "Direct quotation: when it is stronger than paraphrase — and when it is not",
          "APA in-text citation: author-date format, multiple authors, no author",
          "APA reference list: journal articles, books, websites",
          "Synthesizing multiple sources: weaving, not listing",
          "Avoiding plagiarism: intentional vs. unintentional",
        ],
        grammarFocus: "Reporting verbs (argues, claims, suggests, demonstrates, states, notes, observes, contends); passive for distancing (it has been demonstrated that, research indicates that); tense shifts between direct and indirect speech",
        practiceTasks: [
          "Evaluate 5 sources using CRAAP criteria — write a one-sentence verdict for each",
          "Paraphrase 5 academic sentences without looking at the original after first reading",
          "Write a 100-word summary of a provided academic paragraph",
          "Compare: original text / weak paraphrase / strong paraphrase — label and explain the difference",
          "Write 3 body paragraphs integrating at least 2 sources each with in-text APA citation",
          "Identify plagiarism in 5 student examples — name the type and explain the problem",
        ],
        mainSource: "LAWS 4 — Chapter 3 + Appendix E; LAWS 5 — Chapter 9",
        supplementary: [
          { code: "WAE", ref: "Chapter 8 + Appendix E", note: "Paraphrase and Summary; Research and Documentation of Sources" },
          { code: "CSW", ref: "Unit 10", note: "Plagiarism and how to avoid it; Creating citations; In your own words: Paraphrase and Summary; Authorial identity" },
          { code: "IW4", ref: "Unit 7", note: "Borrowing or Stealing? Using Sources; Using Quotations" },
          { code: "50S", ref: "Unit A, Steps 3–5 + Unit B, Steps 1–3", note: "What is plagiarism? How can I use other people's ideas? How do I choose source material? What critical thinking skills do I need?" },
        ],
        topic: {
          subject: "Sociology — Social Structures",
          main: "How social media platforms have reshaped political participation among young adults",
          subtopics: [
            "Data on young adult political engagement before and after major social media platforms",
            "Echo chambers: how algorithmic feeds shape political attitudes",
            "Case studies: movements organized via social media (Arab Spring, #MeToo, climate activism)",
            "Academic debate: does social media increase or fragment political participation?",
            "Synthesizing conflicting research sources on the same question",
          ],
        },
      },
    ],
  },
  {
    id: "phase-7", num: 7, title: "Refinement and Mastery",
    color: { accent: "#1d4ed8", light: "#eff6ff", border: "#bfdbfe", text: "#1e3a8a", badge: "#dbeafe" },
    units: [
      {
        id: "unit-17", num: "17", title: "Sentence Structure",
        subtitle: "Types of Sentences, Parallelism, Sentence Problems",
        goal: "Build grammatical accuracy and stylistic sophistication at the sentence level. Understand simple, compound, complex, and compound-complex sentences.",
        concept: "Sentence-level writing quality is not separate from argumentative quality — it is an expression of it. A writer who cannot vary sentence structure, maintain parallelism, and avoid fragments and run-ons cannot fully express complex ideas. Sentence craft is the surface through which thinking becomes visible.",
        keyTopics: [
          "Independent and dependent clauses: the building blocks of all sentence types",
          "Simple sentences: one independent clause",
          "Compound sentences: two independent clauses joined by FANBOYS or semicolons",
          "Complex sentences: independent + dependent clause; subordinating conjunctions",
          "Compound-complex sentences: combining compound and complex structures",
          "Sentence types and writing style: when to use each type",
          "Parallelism: with coordinators (and, or, but) and correlative conjunctions (both/and, not only/but also, either/or)",
          "Five sentence problems: fragments, choppy sentences, run-on sentences, comma splices, stringy sentences",
          "Sentence variety as a mark of advanced academic prose",
        ],
        grammarFocus: "FANBOYS coordinators and their punctuation; subordinating conjunctions and comma placement; correlative conjunctions and parallel form; semicolons and conjunctive adverbs; identifying and repairing fragments, run-ons, comma splices",
        practiceTasks: [
          "Label sentences as simple, compound, complex, or compound-complex",
          "Combine 10 pairs of simple sentences into complex or compound sentences",
          "Identify and correct 10 sentence fragments",
          "Identify and correct 8 run-on sentences and comma splices",
          "Rewrite 5 choppy paragraph sections using varied sentence types",
          "Correct parallelism errors in 8 sentences",
          "Write a paragraph demonstrating all four sentence types",
        ],
        mainSource: "LAWS 4 — Chapter 9 + Chapter 10",
        supplementary: [
          { code: "WAE", ref: "Chapter 10 + Chapter 11", note: "Types of Sentences: Clauses; Simple; Compound; Complex; Compound-Complex; Parallelism; Sentence Fragments; Choppy Sentences; Run-On Sentences; Stringy Sentences" },
          { code: "LAWS 5", ref: "Chapter 3 + Chapter 4", note: "Run-on and Comma-Spliced Sentences; Choppy and Stringy Sentences; Using Parallelism" },
          { code: "CSW", ref: "Unit 1", note: "Grammar of academic discourse" },
          { code: "50S", ref: "Unit F, Steps 1–2", note: "How can I write a good sentence? How can I make my writing more emphatic?" },
        ],
        topic: {
          subject: "Astronomy and Cosmology — The Universe",
          main: "What gravitational waves reveal about the universe and why their detection was a landmark event",
          subtopics: [
            "What gravitational waves are and how Einstein's general relativity predicted them",
            "The LIGO detector and the technical challenge of measuring infinitesimally small distortions",
            "The 2015 detection: what colliding black holes sound like as a wave",
            "What gravitational wave astronomy reveals that electromagnetic astronomy cannot",
            "Future detectors and the next generation of cosmic observation",
          ],
        },
      },
      {
        id: "unit-18", num: "18", title: "Advanced Grammar",
        subtitle: "Noun Clauses, Adverb Clauses, Adjective Clauses, Participial Phrases",
        goal: "Master the four advanced grammatical structures that characterize sophisticated academic prose: noun clauses, adverb clauses, adjective clauses, and participial phrases.",
        concept: "Advanced grammar is not decoration — it is precision. A relative clause can pack three sentences of information into one. A participial phrase can show simultaneous action and logical relationship in a single compact structure. These structures are tools for thinking more precisely on the page.",
        keyTopics: [
          "Noun clauses: that-clauses; if/whether clauses; question clauses; sentences beginning with it",
          "Special verb tenses in that-clauses",
          "Adverb clauses: time, place, reason, result, purpose, contrast, conditional",
          "Adjective clauses: relative pronouns as subjects, objects, possessives, objects of prepositions",
          "Restrictive vs. nonrestrictive adjective clauses and their punctuation",
          "Participial phrases: reduced adjective clauses; present and past participial phrases; perfect form",
          "Position and punctuation of participial phrases",
          "Reduced adverb clauses",
        ],
        grammarFocus: "Relative pronouns (who, whom, whose, which, that) and their correct selection; that-clause verb tense patterns; participial phrase position (initial, medial, final) and comma rules; avoiding dangling modifiers in participial phrases",
        practiceTasks: [
          "Identify and label clause type in 15 sentences from academic texts",
          "Combine sentence pairs using the specified clause type",
          "Reduce 8 adjective clauses to participial phrases",
          "Correct 6 incorrectly punctuated adjective clauses",
          "Identify and correct 5 dangling modifiers",
          "Write a paragraph using minimum 5 different clause/phrase structures, labeled",
        ],
        mainSource: "LAWS 4 — Chapters 11–14",
        supplementary: [
          { code: "WAE", ref: "Chapters 12–15", note: "Noun Clauses; Adverb Clauses (all types); Adjective Clauses (all types); Participial Phrases (all types)" },
          { code: "LAWS 5", ref: "Chapter 5", note: "Grammar: Noun Clauses; Adjective Clauses" },
          { code: "CSW", ref: "Unit 4 + Unit 7", note: "Reduced relative clauses; Nominalisations" },
          { code: "IW4", ref: "Unit 2", note: "Can Computers Be Creative? Reduced Adjective Clauses" },
          { code: "50S", ref: "Unit E, Step 4", note: "How can I make my writing more complex?" },
        ],
        topic: {
          subject: "Arts, Language and Culture — Linguistics",
          main: "How endangered languages carry irreplaceable knowledge and why their loss is irreversible",
          subtopics: [
            "The scale of language endangerment: how many languages are at risk and why",
            "What languages encode that translation cannot capture: ecological, spatial, and cultural knowledge",
            "Case study: indigenous languages containing centuries of agricultural and environmental data",
            "Language preservation efforts: documentary linguistics and community-led revival programs",
            "The relationship between language loss, cultural identity, and intergenerational knowledge transfer",
          ],
        },
      },
      {
        id: "unit-19", num: "19", title: "Capstone: The Full Academic Essay",
        goal: "Synthesize all skills from Units 1–18 into one independently produced, well-argued, well-sourced, well-revised academic essay. This is the culminating performance task of the entire curriculum.",
        concept: "The capstone essay is not a test — it is a demonstration. Every skill practiced across 18 units converges here: structural control, thesis construction, evidence integration, source citation, sentence variety, concession and refutation, revision, and self-assessment. The process matters as much as the product.",
        keyTopics: [
          "All skills from Units 1–18 integrated into a single sustained performance",
          "Self-assessment rubric: Thesis, Structure, Argument, Concession/Refutation, Source Integration, Sentence Variety, Grammar",
          "10-day capstone process: planning → drafting → global revision → line-editing → final draft → proofreading",
          "Capstone requirements: 600–800 words; full five-part essay; minimum 3 APA-cited sources",
          "Source integration requirements: 1 direct quotation, 1 paraphrase, 1 statistic",
          "Revision evidence: submit first draft + final draft + 200-word self-assessment reflection",
        ],
        grammarFocus: "All grammar from Units 17–18 applied in extended prose: sentence variety, parallel structure, clause types, participial phrases, modal verbs, reporting verbs",
        practiceTasks: [
          "Day 1: Choose topic; evaluate and select minimum 3 credible sources",
          "Day 2: Write essay outline — thesis + body paragraph topics + counterargument placement",
          "Days 3–4: Write first full draft",
          "Day 5: Global revision using checklist (thesis, structure, argument, support, unity, coherence)",
          "Day 6: Peer or self line-edit (grammar, punctuation, sentence variety, citation accuracy)",
          "Days 7–8: Write final draft incorporating all revision decisions",
          "Day 9: Final proofread — check every sentence, every citation, every transition",
          "Day 10: Submit final draft + first draft + self-assessment reflection (200 words)",
        ],
        mainSource: "LAWS 4 — All chapters; LAWS 5 — Chapter 8 + Chapter 9",
        supplementary: [
          { code: "WAE", ref: "Chapter 9 + Appendix A", note: "Argumentative Essays; The Process of Academic Writing: all four steps" },
          { code: "CSW", ref: "Unit 10", note: "Structure of the research report; Creating citations; Paraphrase and Summary; Authorial identity" },
          { code: "IW4", ref: "Unit 8", note: "A Business Case Analysis: Problem and Solution; Evaluation" },
          { code: "50S", ref: "Unit J, Steps 1–5", note: "Proofreading importance; Proofreading strategies; Common grammar mistakes; How to write an abstract; Final checks" },
        ],
        topic: {
          subject: "Student's Choice",
          main: "Any topic from the Topic Reference File — student selects based on interest and available sources",
          subtopics: [],
        },
      },
    ],
  },
];

/* ─── Curriculum Map ────────────────────────────────────── */
const curriculumMap = [
  { phase: 1, units: "1–2",   focus: "Paragraph Foundations" },
  { phase: 2, units: "3–5",   focus: "Paragraph Mastery" },
  { phase: 3, units: "6–8",   focus: "Essay Architecture" },
  { phase: 4, units: "9–11",  focus: "Rhetorical Modes I" },
  { phase: 5, units: "12–13", focus: "Rhetorical Modes II" },
  { phase: 6, units: "14–16", focus: "Argumentation and Research" },
  { phase: 7, units: "17–19", focus: "Refinement and Mastery" },
];

const phaseColors = [
  "#0369a1","#7c3aed","#0f766e","#b45309","#15803d","#dc2626","#1d4ed8",
];

/* ─── Abbreviation badge ─────────────────────────────────── */
const codeColors = {
  "LAWS 4": { bg: "#dbeafe", text: "#1e3a8a" },
  "LAWS 5": { bg: "#ede9fe", text: "#4c1d95" },
  WAE:      { bg: "#d1fae5", text: "#065f46" },
  CSW:      { bg: "#fef3c7", text: "#78350f" },
  IW4:      { bg: "#fce7f3", text: "#831843" },
  "50S":    { bg: "#fee2e2", text: "#7f1d1d" },
};

function CodeBadge({ code }) {
  const c = codeColors[code] || { bg: "#f1f5f9", text: "#374151" };
  return (
    <span style={{
      fontSize: "9px", fontWeight: 800, letterSpacing: "0.4px",
      padding: "2px 6px", borderRadius: "4px",
      backgroundColor: c.bg, color: c.text,
      whiteSpace: "nowrap", flexShrink: 0,
    }}>
      {code}
    </span>
  );
}

/* ─── Unit Row ───────────────────────────────────────────── */
function UnitRow({ unit, color, isLast }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: `1px solid ${open ? color.border : "#e5e7eb"}`,
      borderRadius: "12px",
      overflow: "hidden",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxShadow: open ? `0 4px 16px ${color.accent}18` : "0 1px 3px rgba(0,0,0,0.05)",
      marginBottom: isLast ? 0 : "10px",
    }}>

      {/* ── Header row ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "16px 20px",
        backgroundColor: open ? color.light : "#ffffff",
        transition: "background-color 0.2s",
      }}>

        {/* Unit number */}
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
          backgroundColor: open ? color.badge : "#f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 800,
          color: open ? color.text : "#6b7280",
          transition: "all 0.2s",
        }}>
          {unit.num}
        </div>

        {/* Titles */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
            <p style={{
              fontSize: "14px", fontWeight: 800,
              color: open ? color.text : "#1e293b",
              margin: 0, lineHeight: 1.3,
              transition: "color 0.2s",
            }}>
              Unit {unit.num} — {unit.title}
            </p>
            {unit.subtitle && (
              <span style={{ fontSize: "11px", color: "#94a3b8", fontStyle: "italic" }}>
                {unit.subtitle}
              </span>
            )}
          </div>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "3px 0 0", lineHeight: 1.4 }}>
            {unit.topic.subject}
          </p>
        </div>

        {/* Right: topic tag + toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span style={{
            fontSize: "10px", fontWeight: 700,
            backgroundColor: open ? color.badge : "#f1f5f9",
            color: open ? color.text : "#6b7280",
            padding: "3px 10px", borderRadius: "999px",
            transition: "all 0.2s",
          }}>
            {unit.keyTopics.length} topics
          </span>

          <button
            onClick={() => setOpen(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "11px", fontWeight: 700,
              color: open ? color.text : color.accent,
              backgroundColor: open ? color.badge : "#f9fafb",
              border: `1px solid ${open ? color.border : "#e5e7eb"}`,
              borderRadius: "8px", padding: "6px 14px",
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >
            {open ? "Hide details" : "Show details"}
            <span style={{
              fontSize: "8px", display: "inline-block",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.22s",
            }}>▼</span>
          </button>
        </div>
      </div>

      {/* ── Expanded panel ── */}
      {open && (
        <div style={{
          borderTop: `1px solid ${color.border}`,
          backgroundColor: "#fafafa",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
          }}>

            {/* LEFT COLUMN */}
            <div style={{
              padding: "20px 24px",
              borderRight: `1px solid ${color.border}`,
              display: "flex", flexDirection: "column", gap: "20px",
            }}>

              {/* Unit Goal */}
              <div>
                <SectionLabel color={color}>Unit Goal</SectionLabel>
                <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  {unit.goal}
                </p>
              </div>

              {/* Core Concept */}
              <div>
                <SectionLabel color={color}>Core Concept</SectionLabel>
                <blockquote style={{
                  margin: 0,
                  padding: "12px 14px",
                  backgroundColor: color.light,
                  borderLeft: `3px solid ${color.accent}`,
                  borderRadius: "0 6px 6px 0",
                }}>
                  <p style={{ fontSize: "12px", color: color.text, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                    {unit.concept}
                  </p>
                </blockquote>
              </div>

              {/* Key Topics */}
              <div>
                <SectionLabel color={color}>Key Topics</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {unit.keyTopics.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{
                        width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                        backgroundColor: color.accent, marginTop: "6px", opacity: 0.7,
                      }} />
                      <span style={{ fontSize: "12px", color: "#374151", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grammar Focus */}
              <div>
                <SectionLabel color={color}>Grammar Focus</SectionLabel>
                <p style={{ fontSize: "12px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  {unit.grammarFocus}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{
              padding: "20px 24px",
              display: "flex", flexDirection: "column", gap: "20px",
            }}>

              {/* Practice Tasks */}
              <div>
                <SectionLabel color={color}>Practice Tasks</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {unit.practiceTasks.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{
                        minWidth: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                        backgroundColor: color.badge,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", fontWeight: 800, color: color.text,
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ fontSize: "12px", color: "#374151", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div>
                <SectionLabel color={color}>Sources</SectionLabel>
                <div style={{
                  backgroundColor: color.light,
                  border: `1px solid ${color.border}`,
                  borderRadius: "8px",
                  padding: "10px 12px",
                  marginBottom: "10px",
                }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: color.text, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                    Main Source
                  </p>
                  <p style={{ fontSize: "12px", color: "#374151", margin: 0, fontWeight: 600 }}>
                    {unit.mainSource}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {unit.supplementary.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <CodeBadge code={s.code} />
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>{s.ref}</span>
                        <span style={{ fontSize: "11px", color: "#6b7280" }}> — {s.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Writing Topic */}
              <div>
                <SectionLabel color={color}>Writing Topic</SectionLabel>
                <div style={{
                  backgroundColor: color.light,
                  border: `1px solid ${color.border}`,
                  borderRadius: "8px",
                  padding: "12px 14px",
                }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: color.accent, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                    {unit.topic.subject}
                  </p>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: color.text, margin: "0 0 8px", lineHeight: 1.4 }}>
                    {unit.topic.main}
                  </p>
                  {unit.topic.subtopics.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      {unit.topic.subtopics.map((st, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                          <span style={{ fontSize: "9px", color: color.accent, marginTop: "4px" }}>›</span>
                          <span style={{ fontSize: "11px", color: "#4b5563", lineHeight: 1.5 }}>{st}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Section label ──────────────────────────────────────── */
function SectionLabel({ color, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
      <div style={{ width: "3px", height: "12px", borderRadius: "2px", backgroundColor: color.accent }} />
      <span style={{
        fontSize: "10px", fontWeight: 800, letterSpacing: "0.6px",
        textTransform: "uppercase", color: color.accent,
      }}>
        {children}
      </span>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function UnifiedWritingBookPage() {
  const [expandedPhases, setExpandedPhases] = useState({ 0: true });

  const togglePhase = (idx) => {
    setExpandedPhases(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const expandAll = () => {
    const all = {};
    phases.forEach((_, i) => { all[i] = true; });
    setExpandedPhases(all);
  };

  const collapseAll = () => setExpandedPhases({});

  const totalUnits = phases.reduce((a, p) => a + p.units.length, 0);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        backgroundColor: "rgba(255,255,255,0.96)",
        borderBottom: "1px solid #f3f4f6",
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/ielts" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>IELTS</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/ielts/writing" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Writing</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>Unified Writing Book</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── BOOK HEADER ── */}
        <div style={{ marginBottom: "36px" }}>
          <span style={{
            display: "inline-block", fontSize: "11px", fontWeight: 700,
            backgroundColor: "#d1fae5", color: "#065f46",
            padding: "3px 10px", borderRadius: "999px", marginBottom: "12px", letterSpacing: "0.3px",
          }}>
            INTEGRATED CURRICULUM
          </span>
          <h1 style={{ fontSize: "30px", fontWeight: 800, color: "#1e293b", letterSpacing: "-0.5px", lineHeight: 1.2, margin: "0 0 8px" }}>
            Unified Writing Book
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 20px", lineHeight: 1.6, maxWidth: "620px" }}>
            A comprehensive 19-unit academic writing curriculum synthesizing six major textbooks into a single progressive course — from paragraph foundations to full research papers.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
            {[
              { val: 7,          label: "Phases" },
              { val: totalUnits, label: "Units" },
              { val: 6,          label: "Source books" },
            ].map(({ val, label }) => (
              <div key={label} style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "10px 20px",
              }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#1e293b", lineHeight: 1, margin: 0 }}>{val}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: "3px 0 0" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Source legend */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {Object.entries(SOURCES_KEY).map(([code, full]) => {
              const c = codeColors[code] || { bg: "#f1f5f9", text: "#374151" };
              return (
                <div key={code} style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  padding: "4px 10px",
                }}>
                  <span style={{
                    fontSize: "9px", fontWeight: 800,
                    backgroundColor: c.bg, color: c.text,
                    padding: "2px 5px", borderRadius: "3px",
                  }}>{code}</span>
                  <span style={{ fontSize: "11px", color: "#6b7280" }}>{full}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CURRICULUM MAP ── */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "32px",
        }}>
          <p style={{ fontSize: "12px", fontWeight: 800, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 14px" }}>
            Curriculum Map
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {curriculumMap.map((row) => (
              <div key={row.phase} style={{
                backgroundColor: "#f8fafc",
                border: `1px solid ${phaseColors[row.phase - 1]}30`,
                borderTop: `3px solid ${phaseColors[row.phase - 1]}`,
                borderRadius: "8px",
                padding: "10px 10px 8px",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "10px", fontWeight: 800, color: phaseColors[row.phase - 1], margin: "0 0 3px" }}>
                  Phase {row.phase}
                </p>
                <p style={{ fontSize: "10px", color: "#6b7280", margin: "0 0 4px" }}>Units {row.units}</p>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#374151", margin: 0, lineHeight: 1.3 }}>
                  {row.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXPAND / COLLAPSE ALL ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600, margin: 0 }}>
            {phases.length} Phases · {totalUnits} Units
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { label: "Expand all", action: expandAll },
              { label: "Collapse all", action: collapseAll },
            ].map(({ label, action }) => (
              <button key={label} onClick={action} style={{
                fontSize: "11px", fontWeight: 700,
                color: "#6b7280", backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "6px", padding: "5px 14px",
                cursor: "pointer",
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── PHASES ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {phases.map((phase, pi) => {
            const isOpen = !!expandedPhases[pi];
            return (
              <div key={phase.id}>
                {/* Phase header */}
                <button
                  onClick={() => togglePhase(pi)}
                  style={{
                    width: "100%", textAlign: "left",
                    display: "flex", alignItems: "center", gap: "12px",
                    backgroundColor: "transparent", border: "none",
                    cursor: "pointer", padding: "0 0 12px", marginBottom: "4px",
                    borderBottom: `2px solid ${isOpen ? phase.color.accent : "#e5e7eb"}`,
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
                    backgroundColor: isOpen ? phase.color.accent : "#f1f5f9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 800,
                    color: isOpen ? "#ffffff" : "#6b7280",
                    transition: "all 0.2s",
                  }}>
                    {phase.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: "16px", fontWeight: 800, margin: 0, lineHeight: 1.2,
                      color: isOpen ? phase.color.text : "#374151",
                      transition: "color 0.2s",
                    }}>
                      Phase {phase.num} — {phase.title}
                    </p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
                      {phase.units.length} {phase.units.length === 1 ? "unit" : "units"}
                    </p>
                  </div>
                  <span style={{
                    fontSize: "11px", fontWeight: 700,
                    color: isOpen ? phase.color.accent : "#9ca3af",
                    backgroundColor: isOpen ? phase.color.badge : "#f3f4f6",
                    padding: "4px 12px", borderRadius: "999px",
                    transition: "all 0.2s",
                  }}>
                    {isOpen ? "▲ Collapse" : "▼ Expand"}
                  </span>
                </button>

                {/* Units */}
                {isOpen && (
                  <div style={{ paddingLeft: "4px" }}>
                    {phase.units.map((unit, ui) => (
                      <UnitRow
                        key={unit.id}
                        unit={unit}
                        color={phase.color}
                        isLast={ui === phase.units.length - 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
