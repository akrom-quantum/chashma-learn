/**
 * Generates MDX + JSON stubs for all General English books.
 * Skips files that already exist.
 * Run: node scripts/gen-all-books-stubs.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "src/content/general-english");

function title(folder) {
  // "01-the-human-body" → "The Human Body"
  return folder.replace(/^\d+-/, "").replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function write(p, content) {
  if (!existsSync(p)) { writeFileSync(p, content); return true; }
  return false;
}

function mdxStub({ slug, titleStr, level, cefr, minutes, extra = {}, unit, section = "" }) {
  const cefrYaml = JSON.stringify(cefr);
  const extras = Object.entries(extra).map(([k, v]) =>
    `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`
  ).join("\n");
  return `---
title: "${titleStr}"
slug: ${slug}
book: general-english
${section ? `section: ${section}\n` : ""}unit: ${unit}
level: ${level}
cefr: ${cefrYaml}
estimatedMinutes: ${minutes}
tags: []
premium: false${extras ? "\n" + extras : ""}
---

## Overview

Content for **${titleStr}** coming soon.

<Callout type="note">
This unit is a stub. Full lesson content will be added in a future update.
</Callout>
`;
}

let total = 0;

// ── 1. OXFORD WORD SKILLS (172 units) ────────────────────────────────────
{
  const book = path.join(ROOT, "word-skills");
  const cats = [
    "learning-language","numbers-time","people-body","feelings-personality",
    "natural-world","prepositions","everyday-life","home","food-drink",
    "transport-travel","places-towns","social-political","health",
    "verbs-core","adjectives-adverbs","word-building","hobbies-sport",
    "holidays-travel","communication","study-education","jobs-work",
    "business","social-english","discourse","phrasal-verbs-idioms",
    "news-media","written-english","abstract-concepts",
  ];
  // Known first 3 from brief
  const knownFolders = [
    "01-vocabulary-learning-strategies",
    "02-using-a-dictionary",
    "03-classroom-grammar-vocabulary",
  ];
  for (let n = 1; n <= 172; n++) {
    const pad = String(n).padStart(2, "0");
    const folder = knownFolders[n - 1] ?? `${pad}-word-skills-unit-${n}`;
    const slug = folder.replace(/^\d+-/, "");
    const src  = n <= 57 ? "elementary" : n <= 114 ? "intermediate" : "upper-intermediate";
    const lv   = n <= 57 ? "Elementary" : n <= 114 ? "Intermediate" : "Upper-Intermediate";
    const cefrArr = n <= 57 ? ["A1","A2"] : n <= 114 ? ["B1"] : ["B1","B2"];
    const cat  = cats[(n - 1) % cats.length];
    const dir  = path.join(book, folder);
    mkdirSync(dir, { recursive: true });
    const mdx = mdxStub({
      slug, titleStr: title(folder), level: lv, cefr: cefrArr,
      minutes: 25, unit: n,
      extra: { category: cat, sourceLevel: src },
    });
    if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
    if (write(path.join(dir, "exercises.json"),
      JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
  }
  console.log("✓ Word Skills");
}

// ── 2. VOCABULARY (59 units, 15 sections) ────────────────────────────────
{
  const book = path.join(ROOT, "vocabulary");
  const sections = [
    ["section-01-people", [
      "01-the-human-body","02-appearance-and-mannerisms","03-personality-and-character",
      "04-feelings-and-emotions","05-relationships-and-social-life",
    ], "B1", ["B1"], 30],
    ["section-02-life-stages", [
      "unit-06-family-structure","unit-07-growing-up-and-education",
      "unit-08-romance-marriage-partnership","unit-09-birth-death-life-milestones",
    ], "B1", ["B1"], 30],
    ["section-03-health", [
      "unit-10-health-and-common-illness","unit-11-medicine-technology-treatment",
      "unit-12-diet-fitness-lifestyle",
    ], "B1", ["B1"], 25],
    ["section-04-home-daily-life", [
      "unit-13-the-home-rooms-and-objects","unit-14-daily-routines-and-chores",
      "unit-15-food-cooking-eating-out","unit-16-clothes-and-fashion",
    ], "B1", ["B1"], 30],
    ["section-05-work-business", [
      "unit-17-jobs-and-workplace","unit-18-careers-professional-development",
      "unit-19-business-finance-economy","unit-20-running-company-office-life",
    ], "B1-B2", ["B1","B2"], 30],
    ["section-06-education", [
      "unit-21-school-education","unit-22-university-higher-education",
      "unit-23-study-skills-academic-language",
    ], "B1", ["B1"], 25],
    ["section-07-leisure", [
      "unit-24-sport-and-competitive-games","unit-25-music-and-performing-arts",
      "unit-26-cinema-theatre-literature","unit-27-free-time-hobbies-social-life",
    ], "B1", ["B1"], 25],
    ["section-08-travel", [
      "unit-28-transport-and-getting-around","unit-29-holidays-accommodation-sightseeing",
      "unit-30-air-travel-and-bookings",
    ], "B1", ["B1"], 25],
    ["section-09-natural-world", [
      "unit-31-physical-geography-landscape","unit-32-weather-and-climate",
      "unit-33-animals-and-natural-world","unit-34-environmental-problems",
    ], "B1", ["B1"], 25],
    ["section-10-towns-cities", [
      "unit-35-life-in-the-city","unit-36-life-in-the-country",
      "unit-37-countries-nationalities-languages",
    ], "B1", ["B1"], 25],
    ["section-11-society", [
      "unit-38-crime-and-the-law","unit-39-politics-and-public-institutions",
      "unit-40-media-press-tv-internet","unit-41-global-problems-and-conflict",
      "unit-42-money-and-personal-finance",
    ], "B2", ["B2"], 30],
    ["section-12-communication-technology", [
      "unit-43-phones-messaging-email","unit-44-computers-and-internet",
      "unit-45-social-media-and-online-life",
    ], "B1", ["B1"], 25],
    ["section-13-language-word-building", [
      "unit-46-prefixes-changing-meaning","unit-47-suffixes-forming-nouns-adjectives",
      "unit-48-compound-nouns-adjectives","unit-49-phrasal-verbs",
      "unit-50-collocations-fixed-phrases",
    ], "B1-B2", ["B1","B2"], 30],
    ["section-14-core-verbs", [
      "unit-51-have-make-do","unit-52-get-go-come",
      "unit-53-take-bring-give","unit-54-set-put-other-key-verbs",
    ], "B1", ["B1"], 25],
    ["section-15-grammar-function-words", [
      "unit-55-conjunctions-connecting-words","unit-56-time-sequence-manner",
      "unit-57-cause-contrast-condition","unit-58-uncountable-plural-collective-nouns",
      "unit-59-adjectives-adverbs-prepositions",
    ], "B1-B2", ["B1","B2"], 30],
  ];
  let unitNum = 1;
  for (const [sec, folders, lv, cefr, mins] of sections) {
    for (const folder of folders) {
      const dir = path.join(book, sec, folder);
      mkdirSync(dir, { recursive: true });
      const slug = folder.replace(/^unit-\d+-/, "").replace(/^\d+-/, "");
      const mdx = mdxStub({ slug, titleStr: title(folder.replace(/^unit-\d+-/, "")),
        level: lv, cefr, minutes: mins, unit: unitNum, section: sec });
      if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
      if (write(path.join(dir, "exercises.json"),
        JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
      if (write(path.join(dir, "vocabulary-index.json"),
        JSON.stringify({ unitSlug: slug, words: [] }, null, 2))) total++;
      unitNum++;
    }
  }
  console.log("✓ Vocabulary");
}

// ── 3. PRONUNCIATION (129 units + 4 appendices) ──────────────────────────
{
  const book = path.join(ROOT, "pronunciation");
  const sections = [
    ["appendix", [
      "a1-diagnostic-test","a2-sentence-stress-phrasebook",
      "a3-glossary","a4-further-reading",
    ], "B1-B2", ["B1","B2"], 20, true],
    ["section-01-sounds-phonemic-alphabet", [
      "01-introducing-letters-and-sounds","02-phonemic-alphabet-chart",
      "03-sound-pairs-minimal-pairs","04-from-spelling-to-sound","05-homophones",
    ], "A2-B1", ["A2","B1"], 25],
    ["section-02-vowel-sounds", [
      "06-vowels-ii-and-i","07-e-and-ae","08-a-and-ah","09-o-and-aw",
      "10-u-and-oo","11-er","12-ei-and-ai","13-oi","14-au-and-ou",
      "15-ia-and-ea","16-ua","17-vowel-length","18-vowels-in-unstressed-syllables",
    ], "B1", ["B1"], 25],
    ["section-03-consonant-sounds", [
      "19-p-and-b","20-t-and-d","21-k-and-g","22-f-and-v","23-th-sounds",
      "24-s-and-z","25-sh-and-zh","26-ch-and-dj","27-m-n-ng","28-l",
      "29-r","30-w-and-wh","31-y","32-h",
    ], "B1", ["B1"], 25],
    ["section-04-consonant-clusters", [
      "33-clusters-beginning","34-clusters-end","35-clusters-middle-across",
    ], "B1", ["B1"], 25],
    ["section-05-syllables", [
      "36-syllable-basics","37-syllables-s-endings",
      "38-syllables-ed-endings","39-words-losing-syllable",
    ], "B1", ["B1"], 20],
    ["section-06-word-stress", [
      "40-introducing-word-stress","41-two-syllable-nouns-adjectives",
      "42-two-syllable-verbs-prepositions","43-stress-three-syllable-words",
      "44-stress-four-syllable-words","45-stress-longer-words","46-stress-suffixes",
      "47-stress-prefixes","48-stress-compound-nouns","49-stress-compound-adjectives",
      "50-stress-numbers","51-stress-abbreviations","52-stress-loan-words",
    ], "B1", ["B1"], 25],
    ["section-07-sentence-stress-rhythm", [
      "53-introducing-sentence-stress","54-common-stress-patterns",
      "55-focus-words","56-stress-in-conversation","57-rhythm",
      "58-stress-in-lists","59-stress-contrasts","60-stress-revision",
      "61-stress-in-questions","62-stress-in-negatives",
    ], "B1-B2", ["B1","B2"], 25],
    ["section-08-weak-forms", [
      "63-weak-forms-function-words","64-weak-forms-auxiliaries",
      "65-weak-forms-prepositions","66-weak-forms-conjunctions",
      "67-weak-forms-pronouns","68-weak-forms-articles",
      "69-weak-forms-to","70-weak-forms-revision",
    ], "B1-B2", ["B1","B2"], 20],
    ["section-09-contractions-ellipsis", [
      "71-contracted-forms","72-ellipsis-near-ellipsis",
    ], "B1", ["B1"], 20],
    ["section-10-connected-speech", [
      "73-linking-sounds","74-linking-vowels","75-assimilation",
      "76-elision","77-intrusion","78-connected-speech-revision",
    ], "B2", ["B2"], 25],
    ["section-11-speech-units", [
      "79-breaking-speech-into-units","80-pausing",
      "81-speed","82-volume-and-voice-quality","83-speech-units-revision",
    ], "B2", ["B2"], 20],
    ["section-12-intonation", [
      "84-introducing-tones","85-fall","86-rise","87-fall-rise","88-rise-fall",
      "89-levels","90-choosing-tones-statements","91-choosing-tones-questions",
      "92-choosing-tones-instructions","93-choosing-tones-exclamations",
      "94-tones-in-conversation","95-tones-lists","96-tones-contrastive-stress",
      "97-tones-attitude","98-tones-new-old-information","99-tones-revision-1",
      "100-tones-revision-2","101-tones-revision-3","102-heads",
      "103-pre-heads","104-tails","105-intonation-long-utterances",
      "106-intonation-revision",
    ], "B2", ["B2"], 25],
    ["section-13-emphasis", [
      "107-emphatic-stress-introduction","108-emphatic-auxiliaries",
      "109-emphatic-pronouns","110-emphatic-adjectives",
      "111-emphasis-revision","112-adding-emphasis","113-reducing-emphasis",
    ], "B2", ["B2"], 25],
    ["section-14-conversation", [
      "114-understanding-conversation","115-turn-taking",
      "116-showing-understanding","117-asking-for-repetition",
      "118-filling-pauses","119-back-channelling","120-conversation-revision",
    ], "B2", ["B2"], 20],
    ["section-15-accents", [
      "121-accents-varieties","122-english-international-language",
      "123-guide-specific-languages",
    ], "B2", ["B2"], 20],
    ["section-16-foreign-words", [
      "124-foreign-words-in-english",
    ], "B1", ["B1"], 15],
    ["section-17-numbers-geography", [
      "125-pronouncing-numbers","126-pronouncing-geographical-names",
      "127-the-alphabet",
    ], "A2-B1", ["A2","B1"], 20],
    ["section-18-finding-out", [
      "128-using-dictionaries-for-pronunciation",
      "129-online-pronunciation-resources",
    ], "B1", ["B1"], 20],
  ];
  let unitNum = 1;
  for (const args of sections) {
    const [sec, folders, lv, cefr, mins, isApp] = args;
    for (const folder of folders) {
      const dir = path.join(book, sec, folder);
      mkdirSync(dir, { recursive: true });
      const slug = folder.replace(/^a\d+-/, "").replace(/^\d+-/, "");
      const mdx = mdxStub({ slug, titleStr: title(folder.replace(/^a\d+-/, "").replace(/^\d+-/, "")),
        level: lv, cefr, minutes: mins, unit: unitNum, section: sec,
        extra: isApp ? { isAppendix: true } : {} });
      if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
      if (!isApp || folder === "a1-diagnostic-test") {
        if (write(path.join(dir, "exercises.json"),
          JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
      }
      unitNum++;
    }
  }
  console.log("✓ Pronunciation");
}

// ── 4. COLLOCATIONS (55 units, 9 sections) ────────────────────────────────
{
  const book = path.join(ROOT, "collocations");
  const sections = [
    ["section-01-foundation", ["01-what-are-collocations","02-register-formal-informal-academic"], "B1", ["B1"], 25],
    ["section-02-grammatical-patterns", [
      "03-intensifying-softening-adverbs","04-high-frequency-verbs-make-do-have-take-go",
      "05-phrasal-verbs-as-collocations","06-metaphorical-collocations",
      "07-synonyms-confusable-words",
    ], "B1", ["B1"], 25],
    ["section-03-people-relationships", [
      "08-character-behaviour-personality","09-physical-appearance",
      "10-family-relationships-social-life","11-feelings-and-emotions",
      "12-youth-age-life-stages","13-criticising-and-praising",
    ], "B1", ["B1"], 25],
    ["section-04-leisure-lifestyle", [
      "14-housing-and-living-spaces","15-food-eating-drinking",
      "16-films-books-arts","17-music-and-performance",
      "18-sport-and-physical-activity","19-health-and-illness",
      "20-talking-and-conversation",
    ], "B1-B2", ["B1","B2"], 25],
    ["section-05-travel-environment", [
      "21-weather","22-travel-and-transport","23-countryside-and-nature",
      "24-towns-cities-urban-life","25-environment-and-global-problems",
    ], "B1", ["B1"], 25],
    ["section-06-work-business-study", [
      "26-work-and-employment","27-business-and-economics",
      "28-study-research-student-life","29-academic-writing-opinions-argument",
      "30-thoughts-ideas-beliefs","31-computers-and-technology",
    ], "B2", ["B2"], 30],
    ["section-07-society-law", [
      "32-news-and-current-affairs","33-law-crime-punishment",
      "34-money-and-personal-finance","35-social-issues",
      "36-war-conflict-peace",
    ], "B2", ["B2"], 25],
    ["section-08-basic-concepts", [
      "37-time-and-space","38-sound","39-distance-size-quantity",
      "40-colour-light-texture","41-taste-and-smell",
      "42-movement-speed-walking","43-change","44-ease-and-difficulty",
    ], "B1-B2", ["B1","B2"], 25],
    ["section-09-functions-communication", [
      "45-starting-and-finishing","46-success-failure-effort",
      "47-cause-and-effect","48-memory-senses-perception",
      "49-agreeing-disagreeing-discussing","50-beliefs-opinions-claims",
      "51-deciding-and-choosing","52-liking-disliking-preferences",
      "53-comparing-and-contrasting","54-describing-groups-and-amounts",
      "55-social-english-everyday-expressions",
    ], "B2", ["B2"], 25],
  ];
  let n = 1;
  for (const [sec, folders, lv, cefr, mins] of sections) {
    for (const folder of folders) {
      const dir = path.join(book, sec, folder);
      mkdirSync(dir, { recursive: true });
      const slug = folder.replace(/^\d+-/, "");
      const mdx = mdxStub({ slug, titleStr: title(folder), level: lv, cefr, minutes: mins, unit: n, section: sec });
      if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
      if (write(path.join(dir, "exercises.json"), JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
      if (write(path.join(dir, "collocations-index.json"), JSON.stringify({ unitSlug: slug, collocations: [] }, null, 2))) total++;
      n++;
    }
  }
  console.log("✓ Collocations");
}

// ── 5. PHRASAL VERBS (88 units, 9 sections) ──────────────────────────────
{
  const book = path.join(ROOT, "phrasal-verbs");
  const sections = [
    ["section-01-foundations", [
      "01-what-phrasal-verbs-are","02-meaning-of-phrasal-verbs",
      "03-grammar-of-phrasal-verbs","04-nouns-based-on-phrasal-verbs",
      "05-adjectives-based-on-phrasal-verbs","06-register-formal-vs-informal",
      "07-metaphor-in-phrasal-verbs","08-collocation-and-phrasal-verbs",
      "09-idioms-using-phrasal-verbs",
    ], "B1", ["B1"], 25],
    ["section-02-key-particles", [
      "10-up","11-out","12-off","13-on","14-in","15-down",
      "16-over","17-around-and-about","18-for-and-with",
      "19-through-and-back","20-into-and-away",
    ], "B1", ["B1"], 25],
    ["section-03-key-verbs", [
      "21-come","22-get","23-go","24-keep","25-look",
      "26-make","27-put","28-take",
    ], "B1-B2", ["B1","B2"], 25],
    ["section-04-concepts", [
      "29-time-spending-time","30-time-passing-of-time","31-location-places",
      "32-cause-and-effect","33-change","34-success-and-failure",
      "35-starting-and-finishing","36-actions-and-movement",
      "37-destroying-and-reacting","38-communication","39-memory",
      "40-conflict-and-violence","41-sound","42-size-and-number",
    ], "B1-B2", ["B1","B2"], 25],
    ["section-05-functions", [
      "43-describing-people-and-places","44-describing-public-events",
      "45-describing-situations","46-giving-and-getting-information",
      "47-solving-problems","48-decisions-and-plans","49-disagreeing",
      "50-agreeing","51-understanding-and-having-ideas","52-persuading",
      "53-praising-and-criticising","54-exclamations-and-warnings",
    ], "B2", ["B2"], 25],
    ["section-06-work-study-finance", [
      "55-classroom-and-learning","56-student-life-courses-exams",
      "57-lectures-and-seminars","58-reading-and-writing-academic",
      "59-work-jobs-and-career","60-work-being-busy",
      "61-money-salaries-bills-payments","62-money-buying-and-selling",
      "63-business","64-telephoning",
    ], "B2", ["B2"], 25],
    ["section-07-personal-life", [
      "65-feelings","66-relationships","67-relationships-problems",
      "68-secrets-and-conversations","69-stages-through-life",
      "70-health","71-the-body","72-sport","73-homes-and-daily-routines",
      "74-socialising","75-food-and-drink","76-clothing-and-appearance",
      "77-character-and-personal-qualities",
    ], "B1-B2", ["B1","B2"], 25],
    ["section-08-world-around-us", [
      "78-weather","79-travel","80-driving","81-technology",
      "82-computers","83-nature","84-news","85-crime","86-power-and-authority",
    ], "B2", ["B2"], 25],
    ["section-09-variety-evolution", [
      "87-american-and-australian-phrasal-verbs","88-new-phrasal-verbs",
    ], "B2", ["B2"], 20],
  ];
  let n = 1;
  for (const [sec, folders, lv, cefr, mins] of sections) {
    for (const folder of folders) {
      const dir = path.join(book, sec, folder);
      mkdirSync(dir, { recursive: true });
      const slug = folder.replace(/^\d+-/, "");
      const mdx = mdxStub({ slug, titleStr: title(folder), level: lv, cefr, minutes: mins, unit: n, section: sec });
      if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
      if (write(path.join(dir, "exercises.json"), JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
      if (write(path.join(dir, "phrasal-verbs-index.json"), JSON.stringify({ unitSlug: slug, phrasalVerbs: [] }, null, 2))) total++;
      n++;
    }
  }
  console.log("✓ Phrasal Verbs");
}

// ── 6. IDIOMS (88 units, 20 parts) ───────────────────────────────────────
{
  const book = path.join(ROOT, "idioms");
  const parts = [
    ["part-01-learning-about-idioms",  ["01-what-are-idioms","02-types-patterns-sources"], "B1", ["B1"], 25],
    ["part-02-emotions-inner-life",    ["03-happiness-and-sadness","04-anger","05-positive-feelings-situations","06-negative-feelings-situations"], "B1", ["B1"], 25],
    ["part-03-thinking-knowing",       ["07-knowing-and-understanding","08-experience-and-perception","09-memory"], "B1-B2", ["B1","B2"], 25],
    ["part-04-success-failure",        ["10-success-and-failure","11-having-problems","12-dealing-with-problems"], "B1-B2", ["B1","B2"], 25],
    ["part-05-communication",          ["13-communication-1-words-language","14-communication-2-expressing-yourself","15-conversational-responses","16-reacting-to-what-others-say","17-talking-advising-warning","18-talking-telling-stories","19-responding-agreeing-disagreeing","20-emphasising"], "B2", ["B2"], 25],
    ["part-06-opinions-arguments",     ["21-power-and-authority","22-structuring-talking-about-arguments","23-praise-and-criticism","24-opinions-on-people-actions","25-behaviour-and-attitudes"], "B2", ["B2"], 25],
    ["part-07-people-relationships",   ["26-people-character-behaviour","27-people-appearance","28-relationships-friends-family"], "B1-B2", ["B1","B2"], 25],
    ["part-08-work-business-money",    ["29-work","30-business-news","31-business-meetings","32-money"], "B2", ["B2"], 25],
    ["part-09-society-crime",          ["33-social-status","34-society","35-crime-and-punishment","36-daily-life"], "B2", ["B2"], 25],
    ["part-10-abstract-concepts",      ["37-necessity-and-desirability","38-probability-and-luck","39-effort","40-danger","41-human-relationships-general","42-size-and-position","43-speed-distance-intensity","44-life-and-experience-proverbs"], "B2", ["B2"], 25],
    ["part-11-time",                   ["45-time-1-past-and-future","46-time-2-clocks-and-frequency"], "B1-B2", ["B1","B2"], 20],
    ["part-12-natural-world",          ["47-the-elements","48-colour","49-animals-1-describing-people","50-animals-2-describing-situations","51-nature"], "B2", ["B2"], 25],
    ["part-13-clothes-food-domestic",  ["52-clothes","53-food","54-houses-and-household-objects"], "B2", ["B2"], 25],
    ["part-14-games-sport-conflict",   ["55-games-and-sport","56-weapons-and-war"], "B2", ["B2"], 20],
    ["part-15-transport-roads-sea",    ["57-roads","58-boats-and-sailing"], "B2", ["B2"], 20],
    ["part-16-science-arts",           ["59-science-technology-machines","60-music-and-theatre","61-films-plays-books"], "B2", ["B2"], 25],
    ["part-17-classical-cultural",     ["62-ancient-myths-history","63-shakespeare","64-literature"], "C1", ["C1"], 25],
    ["part-18-written-contexts",       ["65-idioms-in-journalism","66-idioms-in-advertising","67-idioms-in-formal-writing"], "C1", ["C1"], 25],
    ["part-19-keyword-idioms",         ["68-hand-finger-thumb","69-foot-heel-toe-leg","70-body-bones-shoulder-arm","71-the-head","72-face-hair-neck-chest","73-the-eyes","74-mouth-ear-lips-nose-teeth-tongue","75-the-heart","76-mind-brain-blood-guts","77-the-back"], "B2-C1", ["B2","C1"], 25],
    ["part-20-high-frequency-keyword", ["78-play-and-game","79-half-and-two","80-all-and-no","81-life-live-dead-death","82-hard-fall-own","83-good-and-bad","84-line-long-ground","85-act-action-activity","86-similes-like-and-as"], "B2-C1", ["B2","C1"], 25],
    // part-20 has only 9 listed; unit 87-88 are implied extras
  ];
  // Add 87 and 88 to last part
  parts[parts.length - 1][1].push("87-idiomatic-expressions-review", "88-advanced-idiomatic-usage");
  let n = 1;
  for (const [sec, folders, lv, cefr, mins] of parts) {
    for (const folder of folders) {
      const dir = path.join(book, sec, folder);
      mkdirSync(dir, { recursive: true });
      const slug = folder.replace(/^\d+-/, "");
      const mdx = mdxStub({ slug, titleStr: title(folder), level: lv, cefr, minutes: mins, unit: n, section: sec });
      if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
      if (write(path.join(dir, "exercises.json"), JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
      if (write(path.join(dir, "idioms-index.json"), JSON.stringify({ unitSlug: slug, idioms: [] }, null, 2))) total++;
      n++;
    }
  }
  console.log("✓ Idioms");
}

// ── 7. WRITING (19 units, 7 phases) ──────────────────────────────────────
{
  const book = path.join(ROOT, "writing");
  const phases = [
    ["phase-01-paragraph-foundations",  ["01-paragraph-structure","02-unity-and-coherence"], "B1", ["B1"], 40],
    ["phase-02-paragraph-mastery",      ["03-using-outside-sources","04-patterns-of-organization-1","05-patterns-of-organization-2"], "B1-B2", ["B1","B2"], 45],
    ["phase-03-essay-architecture",     ["06-from-paragraph-to-essay","07-the-thesis-statement","08-introductions-and-conclusions"], "B2", ["B2"], 45],
    ["phase-04-rhetorical-modes-1",     ["09-process-essays","10-cause-effect-essays","11-comparison-contrast-essays"], "B2", ["B2"], 50],
    ["phase-05-rhetorical-modes-2",     ["12-classification-essays","13-extended-definition-essays"], "B2", ["B2"], 50],
    ["phase-06-argumentation",          ["14-argumentative-essay-1-taking-position","15-argumentative-essay-2-concession-refutation","16-research-skills"], "B2-C1", ["B2","C1"], 55],
    ["phase-07-refinement",             ["17-sentence-structure","18-advanced-grammar","19-capstone-full-academic-essay"], "C1", ["C1"], 60],
  ];
  let n = 1;
  for (const [sec, folders, lv, cefr, mins] of phases) {
    for (const folder of folders) {
      const dir = path.join(book, sec, folder);
      mkdirSync(dir, { recursive: true });
      const slug = folder.replace(/^\d+-/, "");
      const mdx = mdxStub({ slug, titleStr: title(folder), level: lv, cefr, minutes: mins, unit: n, section: sec });
      if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
      if (write(path.join(dir, "exercises.json"), JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
      const wp = {
        unitSlug: slug,
        prompt: `Write a ${lv}-level academic text related to the topic of ${title(folder)}. Aim for 150–200 words.`,
        wordCountMin: 150, wordCountMax: 200, timeLimit: mins,
        criteria: ["Clear structure", "Appropriate vocabulary", "Correct grammar", "Coherent argument"],
      };
      if (write(path.join(dir, "writing-prompt.json"), JSON.stringify(wp, null, 2))) total++;
      n++;
    }
  }
  console.log("✓ Writing");
}

// ── 8. SPEAKING (30 social + 30 everyday = 60 units) ─────────────────────
{
  const book = path.join(ROOT, "speaking");
  const socialFolders = [
    "01-telephoning","02-saying-goodbye","03-making-introductions",
    "04-expressing-anxiety","05-apologizing","06-local-shopping",
    "07-high-street-shopping","08-special-greetings","09-giving-thanks",
    "10-wishing-people-well","11-greeting-people","12-discussing-intentions",
    "13-issuing-invitations","14-offering-help","15-asking-permission",
    "16-asking-directions","17-talking-about-weather","18-going-out-for-dinner",
    "19-expressing-sympathy","20-going-out-for-coffee","21-giving-warning",
    "22-expressing-likes-dislikes","23-seeking-holiday-advice",
    "24-expressing-uncertainty","25-visiting-the-doctor","26-expressing-pleasure",
    "27-failing-to-agree","28-telling-time-and-dates","29-paying-compliments",
    "30-making-appointments",
  ];
  const everydayFolders = [
    "01-the-day-out-that-never-happened","02-money-worries",
    "03-an-unexpected-holiday","04-just-a-rumour","05-why-no-noise",
    "06-will-it-rain","07-time-for-a-change","08-to-tell-or-not-to-tell",
    "09-how-to-avoid-decorating","10-no-holiday-from-family-bickering",
    "11-a-summer-holiday-abroad","12-a-break-from-studying",
    "13-consolation-for-failing","14-getting-the-sack",
    "15-mending-the-mower","16-looking-for-tennis-partner",
    "17-tackling-a-heating-problem","18-planning-a-birthday-surprise",
    "19-an-important-football-result","20-buying-a-birthday-gift",
    "21-disagreement-over-invitation","22-fixing-a-dental-appointment",
    "23-driving-to-the-country","24-car-problems",
    "25-deciding-on-vacation-job","26-discovering-a-cook-by-accident",
    "27-trouble-with-jack","28-where-to-go",
    "29-taking-care-of-a-friend","30-exam-worries",
  ];
  const subSections = [
    ["social-expressions",  socialFolders,   1, "B1",    ["B1"]],
    ["everyday-idioms",     everydayFolders, 31, "B1-B2", ["B1","B2"]],
  ];
  for (const [sub, folders, startN, lv, cefr] of subSections) {
    let n = startN;
    for (const folder of folders) {
      const dir = path.join(book, sub, folder);
      mkdirSync(dir, { recursive: true });
      const slug = folder.replace(/^\d+-/, "");
      const mdx = `---
title: "${title(folder)}"
slug: ${slug}
book: general-english
subSection: ${sub}
unit: ${n}
level: ${lv}
cefr: ${JSON.stringify(cefr)}
estimatedMinutes: 20
tags: []
premium: false
---

## Dialogue

<Callout type="note">
Dialogue content for **${title(folder)}** coming soon.
</Callout>
`;
      if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
      if (write(path.join(dir, "exercises.json"), JSON.stringify({ unitSlug: slug, exercises: [] }, null, 2))) total++;
      n++;
    }
  }
  console.log("✓ Speaking");
}

// ── 9. PRACTICAL ENGLISH USAGE (representative entries) ──────────────────
// Full 635 entries to be added as content. Here we create 5 grammar + 5 vocab entries.
{
  const book = path.join(ROOT, "practical-english-usage");
  const sampleEntries = [
    ["grammar/section-01-verbs/entry-001-irregular-verbs",          1,  "grammar", "section-01-verbs",          "Irregular Verbs"],
    ["grammar/section-01-verbs/entry-002-active-verb-tenses",       2,  "grammar", "section-01-verbs",          "Active Verb Tenses"],
    ["grammar/section-02-be-have-do/entry-017-be-general",          17, "grammar", "section-02-be-have-do",     "BE: General"],
    ["grammar/section-03-present-tenses/entry-030-present-simple",  30, "grammar", "section-03-present-tenses", "Present Simple"],
    ["grammar/section-05-past-perfect/entry-044-present-perfect",   44, "grammar", "section-05-past-perfect",   "Present Perfect: Basic Information"],
    ["vocabulary/section-29-vocabulary-areas/entry-321-vocabulary", 321, "vocabulary", "section-29-vocabulary-areas", "Vocabulary Areas"],
    ["vocabulary/section-29-vocabulary-areas/entry-322-register",   322, "vocabulary", "section-29-vocabulary-areas", "Register"],
    ["vocabulary/section-30-word-formation/entry-336-prefixes",     336, "vocabulary", "section-30-word-formation", "Prefixes"],
    ["vocabulary/section-31-word-problems-a-z/entry-352-a-an",      352, "vocabulary", "section-31-word-problems-a-z", "A/An"],
    ["vocabulary/section-31-word-problems-a-z/entry-353-above-over",353, "vocabulary", "section-31-word-problems-a-z", "Above and Over"],
  ];
  for (const [relPath, entryNum, part, sec, entryTitle] of sampleEntries) {
    const dir = path.join(book, relPath);
    mkdirSync(dir, { recursive: true });
    const slug = `entry-${String(entryNum).padStart(3,"0")}-${entryTitle.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+$/,"")}`;
    const mdx = `---
title: "${entryTitle}"
slug: ${slug}
entryNumber: ${entryNum}
part: ${part}
section: ${sec}
level: B1
tags: []
premium: false
---

## ${entryTitle}

Reference content for entry ${entryNum} coming soon.

<Callout type="note">
This is a reference entry. Full explanations, examples and usage notes will be added in a future update.
</Callout>
`;
    if (write(path.join(dir, "lesson.mdx"), mdx)) total++;
  }
  console.log("✓ PEU (10 representative entries)");
}

console.log(`\nTotal files created: ${total}`);
