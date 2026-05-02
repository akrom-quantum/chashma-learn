import { defineConfig, defineCollection, s } from 'velite'

// ── Shared base schema fields ──────────────────────────────────────────────
const baseUnit = {
  title: s.string(),
  slug: s.string(),
  unit: s.number(),
  level: s.string(),
  cefr: s.array(s.string()),
  estimatedMinutes: s.number(),
  tags: s.array(s.string()).default([]),
  premium: s.boolean().default(false),
  path: s.path(),
}

// ── Collections ────────────────────────────────────────────────────────────

const GrammarUnit = defineCollection({
  name: 'GrammarUnit',
  pattern: 'general-english/grammar/**/lesson.mdx',
  schema: s.object({ ...baseUnit, section: s.string() }),
})

const WordSkillsUnit = defineCollection({
  name: 'WordSkillsUnit',
  pattern: 'general-english/word-skills/**/lesson.mdx',
  schema: s.object({
    ...baseUnit,
    category: s.string(),
    sourceLevel: s.enum(['elementary', 'intermediate', 'upper-intermediate']),
  }),
})

const VocabularyUnit = defineCollection({
  name: 'VocabularyUnit',
  pattern: 'general-english/vocabulary/**/lesson.mdx',
  schema: s.object({ ...baseUnit, section: s.string() }),
})

const PronunciationUnit = defineCollection({
  name: 'PronunciationUnit',
  pattern: 'general-english/pronunciation/**/lesson.mdx',
  schema: s.object({
    ...baseUnit,
    section: s.string(),
    isAppendix: s.boolean().default(false),
  }),
})

const CollocationUnit = defineCollection({
  name: 'CollocationUnit',
  pattern: 'general-english/collocations/**/lesson.mdx',
  schema: s.object({ ...baseUnit, section: s.string() }),
})

const PhrasalVerbUnit = defineCollection({
  name: 'PhrasalVerbUnit',
  pattern: 'general-english/phrasal-verbs/**/lesson.mdx',
  schema: s.object({ ...baseUnit, section: s.string() }),
})

const IdiomUnit = defineCollection({
  name: 'IdiomUnit',
  pattern: 'general-english/idioms/**/lesson.mdx',
  schema: s.object({ ...baseUnit, section: s.string() }),
})

const WritingUnit = defineCollection({
  name: 'WritingUnit',
  pattern: 'general-english/writing/**/lesson.mdx',
  schema: s.object({ ...baseUnit, section: s.string() }),
})

const SpeakingUnit = defineCollection({
  name: 'SpeakingUnit',
  pattern: 'general-english/speaking/**/lesson.mdx',
  schema: s.object({
    ...baseUnit,
    subSection: s.enum(['social-expressions', 'everyday-idioms']),
  }),
})

const PEUEntry = defineCollection({
  name: 'PEUEntry',
  pattern: 'general-english/practical-english-usage/**/lesson.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.string(),
    entryNumber: s.number(),
    part: s.enum(['grammar', 'vocabulary']),
    section: s.string(),
    level: s.string().optional(),
    tags: s.array(s.string()).default([]),
    premium: s.boolean().default(false),
    path: s.path(),
  }),
})

export default defineConfig({
  root: 'src/content',
  output: {
    data: 'src/velite',
    assets: 'public/static/velite',
    base: '/static/velite/',
    clean: true,
  },
  collections: {
    grammarUnits:      GrammarUnit,
    wordSkillsUnits:   WordSkillsUnit,
    vocabularyUnits:   VocabularyUnit,
    pronunciationUnits: PronunciationUnit,
    collocationUnits:  CollocationUnit,
    phrasalVerbUnits:  PhrasalVerbUnit,
    idiomUnits:        IdiomUnit,
    writingUnits:      WritingUnit,
    speakingUnits:     SpeakingUnit,
    peuEntries:        PEUEntry,
  },
})
