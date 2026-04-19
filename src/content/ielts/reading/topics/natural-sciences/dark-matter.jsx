"use client";
import Callout from "@/components/callouts/Callout";
import Table from "@/components/content/Table";
import { H2, H3, P, Bold, Em } from "@/components/content/Typography";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const meta = {
  title:         "The Search for Dark Matter",
  level:         "B2-C1",
  time:          "15 min",
  category:      "natural-sciences",
  tags:          ["physics", "astronomy", "cosmology"],
  vocabIndex:    "dark-matter-vocab",
  estimatedBand: "6.5-7.5",
};

// ─── Table of Contents ────────────────────────────────────────────────────────

export const tocItems = [
  { id: "sec-passage",       label: "Passage",          level: 1 },
  { id: "sec-passage-1",     label: "Zwicky's Problem", level: 2 },
  { id: "sec-passage-2",     label: "Rubin's Evidence", level: 2 },
  { id: "sec-passage-3",     label: "What It Is",       level: 2 },
  { id: "sec-passage-4",     label: "The Search",       level: 2 },
  { id: "sec-passage-5",     label: "Alternatives",     level: 2 },
  { id: "sec-vocabulary",    label: "Key Vocabulary",   level: 1 },
  { id: "sec-collocations",  label: "Collocations",     level: 1 },
];

// ─── Topic ────────────────────────────────────────────────────────────────────

export function TopicContent() {
  return (
    <div>
      <Callout type="abstract" title="Reading Target">
        <p style={{ margin: 0 }}>
          A 7-paragraph passage on the history and mystery of dark matter. Practice tracking the shift from discovery (1930s) through evidence (1970s) to ongoing debate. Target band: <Bold>6.5–7.5</Bold>.
        </p>
      </Callout>

      <H2 id="sec-passage">Passage</H2>

      <H3 id="sec-passage-1">Zwicky's Problem</H3>
      <P>
        In the 1930s, Swiss astronomer Fritz Zwicky observed something peculiar about the Coma galaxy cluster. The galaxies within it were moving far too quickly to be held together by the gravitational pull of their visible mass. Based on what could be seen, the cluster should have flown apart long ago. Zwicky proposed that the cluster must contain a great deal of matter that could not be observed directly — he called it <Em>dunkle Materie</Em>, or dark matter. His contemporaries largely dismissed the idea.
      </P>

      <H3 id="sec-passage-2">Rubin's Evidence</H3>
      <P>
        For four decades, dark matter remained on the fringes of astrophysics. The turning point came in the 1970s, when American astronomer Vera Rubin made detailed measurements of how stars orbit within spiral galaxies. According to Newtonian gravity, stars on the outer edges of a galaxy should orbit more slowly than those near the centre — much as Pluto orbits the Sun more slowly than Mercury. Rubin found the opposite. Stars at the fringes of galaxies moved at roughly the same speed as stars near the centre, implying an enormous amount of unseen mass distributed throughout each galaxy. Her findings, together with independent gravitational lensing observations, made the existence of dark matter impossible to ignore.
      </P>

      <H3 id="sec-passage-3">What It Is</H3>
      <P>
        The question of <Em>what</Em> dark matter is, however, has proven stubbornly resistant to resolution. It does not emit, absorb, or reflect light in any detectable way, which is how it earned its name. It does not appear to interact with the electromagnetic force at all. Its only discernible effect is gravitational. Physicists have proposed a range of candidate particles — weakly interacting massive particles (WIMPs), axions, and sterile neutrinos among them — but decades of increasingly sensitive experiments have ruled out many of the most promising possibilities without confirming any.
      </P>

      <H3 id="sec-passage-4">The Search</H3>
      <P>
        Underground laboratories in Italy, China, Canada, and South Dakota house detectors built to catch dark matter particles on the rare occasion one might collide with an ordinary atom. These detectors must be shielded by kilometres of rock to block cosmic rays and other background noise. They must be cooled to temperatures near absolute zero to reduce thermal interference. And they must be monitored continuously for years to accumulate enough data to distinguish a genuine signal from chance events. Despite this effort, no unambiguous direct detection has yet been achieved.
      </P>

      <H3 id="sec-passage-5">Alternatives and the Bigger Picture</H3>
      <P>
        Some physicists have begun to question whether dark matter exists at all, at least in the form currently assumed. Alternative theories — most notably Modified Newtonian Dynamics, or MOND — propose that the laws of gravity themselves behave differently on galactic scales, eliminating the need for unseen matter. MOND successfully explains galaxy rotation curves without invoking any exotic particles, but it struggles to account for observations at larger scales, such as the cosmic microwave background and the behaviour of galaxy clusters. Most cosmologists still regard particle dark matter as the more robust explanation, though the alternative continues to attract serious attention.
      </P>

      <P>
        What is not in dispute is the scale of what is missing. Dark matter, along with an even more mysterious component known as dark energy, is thought to make up roughly 95 per cent of the total mass-energy content of the universe. The familiar matter that constitutes stars, planets, and people amounts to less than 5 per cent. The universe as humans have historically understood it is a small fraction of the universe as it actually appears to be. Nearly a century after Zwicky's observations, the composition of the overwhelming majority of reality remains unknown.
      </P>

      <H2 id="sec-vocabulary">Key Vocabulary</H2>
      <Table
        headers={["Word", "Part", "Meaning"]}
        rows={[
          ["peculiar",               "adj",      "strange or unusual"],
          ["contemporaries",         "n",        "people living or working at the same time as someone"],
          ["fringes",                "n",        "the edges or outermost parts of something"],
          ["stubbornly",             "adv",      "persistently; in a way that resists change"],
          ["discernible",            "adj",      "able to be detected or perceived clearly"],
          ["candidate",              "n",        "in science, a possible solution or entity being considered"],
          ["unambiguous",            "adj",      "not open to more than one interpretation; clear"],
          ["invoke",                 "v",        "to call on or refer to as a source of authority"],
          ["robust",                 "adj",      "strong and unlikely to fail under scrutiny"],
          ["composition",            "n",        "what something is made of"],
          ["in dispute",             "phrase",   "disagreed about"],
          ["resistant to resolution","phrase",   "difficult to solve or settle"],
          ["account for",            "phrasal v","to explain or be the cause of"],
          ["on the fringes of",      "phrase",   "at the margins of a field or community"],
          ["ruled out",              "phrasal v","eliminated as a possibility"],
        ]}
      />

      <H2 id="sec-collocations">Collocations to Note</H2>
      <Callout type="tip" title="Natural phrase patterns">
        <Em>impossible to ignore · distributed throughout · make up 95 per cent · attract serious attention · stars at the fringes of galaxies · detailed measurements of</Em>
      </Callout>
    </div>
  );
}

const Topic = { meta, tocItems, TopicContent };
export default Topic;
