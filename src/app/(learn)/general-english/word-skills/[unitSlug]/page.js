import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { wordSkillsUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson, buildSectionsFromUnits } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";
import IndexTable from "@/components/learn/IndexTable";

const VOCAB_COLUMNS = [
  { key: "word",        label: "Word",         width: "18%" },
  { key: "partOfSpeech",label: "POS",          width: "10%" },
  { key: "definition",  label: "Definition"               },
  { key: "example",     label: "Example",      italic: true },
  { key: "collocation", label: "Collocation"              },
];

export async function generateStaticParams() {
  return wordSkillsUnits.map(u => ({ unitSlug: u.slug }));
}

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = wordSkillsUnits.find(u => u.slug === unitSlug);
  if (!unit) return {};
  return { title: `${unit.title} — Oxford Word Skills` };
}

export default async function WordSkillsUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = wordSkillsUnits.find(u => u.slug === unitSlug);
  if (!unit) notFound();

  const MDXContent = await getMdxComponent(unit.path);
  const exData    = await loadUnitJson(unit.path, "exercises.json");
  const indexData = await loadUnitJson(unit.path, "vocabulary-index.json");

  const sections  = buildSectionsFromUnits(
    wordSkillsUnits.sort((a,b) => a.unit - b.unit),
    "general-english/word-skills",
    ["elementary", "intermediate", "upper-intermediate"].map(l =>
      wordSkillsUnits.filter(u => u.sourceLevel === l).map(u => u.section ?? l)
    ).flat()
  );

  // Simpler sidebar: group by sourceLevel
  const sideSections = ["elementary","intermediate","upper-intermediate"].map(lv => ({
    id: lv,
    label: lv.charAt(0).toUpperCase() + lv.slice(1),
    units: wordSkillsUnits.filter(u => u.sourceLevel === lv).sort((a,b) => a.unit - b.unit).map(u => ({
      id: u.slug, label: u.title,
      href: `/general-english/word-skills/${u.slug}`,
    })),
  }));

  return (
    <GenericUnitPage
      unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exData?.exercises ?? []}
      extraTab={{
        id: "index",
        label: "Vocabulary Index",
        content: (
          <IndexTable
            data={indexData?.words ?? []}
            columns={VOCAB_COLUMNS}
            filterKey="partOfSpeech"
          />
        ),
      }}
      sections={sideSections}
      bookLabel="Oxford Word Skills"
      bookHref="/general-english/word-skills"
      accentColor="#7c3aed"
    />
  );
}
