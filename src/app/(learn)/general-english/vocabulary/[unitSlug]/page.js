import { notFound } from "next/navigation";
import { vocabularyUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson, buildSectionsFromUnits } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";
import IndexTable from "@/components/learn/IndexTable";

const COLUMNS = [
  { key: "word",        label: "Word",        width: "16%" },
  { key: "partOfSpeech",label: "POS",         width: "10%" },
  { key: "definition",  label: "Definition"              },
  { key: "example",     label: "Example",     italic: true },
  { key: "collocation", label: "Collocation"             },
];

export const generateStaticParams = async () =>
  vocabularyUnits.map(u => ({ unitSlug: u.slug }));

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = vocabularyUnits.find(u => u.slug === unitSlug);
  return unit ? { title: `${unit.title} — Vocabulary` } : {};
}

export default async function VocabularyUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = vocabularyUnits.find(u => u.slug === unitSlug);
  if (!unit) notFound();
  const MDXContent = await getMdxComponent(unit.path);
  const exData     = await loadUnitJson(unit.path, "exercises.json");
  const indexData  = await loadUnitJson(unit.path, "vocabulary-index.json");
  const sections   = buildSectionsFromUnits(vocabularyUnits, "general-english/vocabulary");
  return (
    <GenericUnitPage unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exData?.exercises ?? []}
      extraTab={{ id: "index", label: "Index",
        content: <IndexTable data={indexData?.words ?? []} columns={COLUMNS} filterKey="partOfSpeech" /> }}
      sections={sections} bookLabel="Unified Vocabulary"
      bookHref="/general-english/vocabulary" accentColor="#dc2626" />
  );
}
