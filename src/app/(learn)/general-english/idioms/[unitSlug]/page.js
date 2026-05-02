import { notFound } from "next/navigation";
import { idiomUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson, buildSectionsFromUnits } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";
import IndexTable from "@/components/learn/IndexTable";

const COLUMNS = [
  { key: "idiom",   label: "Idiom",   width: "25%" },
  { key: "meaning", label: "Meaning"              },
  { key: "context", label: "Context", width: "18%" },
  { key: "example", label: "Example", italic: true },
];

export const generateStaticParams = async () =>
  idiomUnits.map(u => ({ unitSlug: u.slug }));

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = idiomUnits.find(u => u.slug === unitSlug);
  return unit ? { title: `${unit.title} — Idioms` } : {};
}

export default async function IdiomUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = idiomUnits.find(u => u.slug === unitSlug);
  if (!unit) notFound();
  const MDXContent = await getMdxComponent(unit.path);
  const exData     = await loadUnitJson(unit.path, "exercises.json");
  const indexData  = await loadUnitJson(unit.path, "idioms-index.json");
  const sections   = buildSectionsFromUnits(idiomUnits, "general-english/idioms");
  return (
    <GenericUnitPage unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exData?.exercises ?? []}
      extraTab={{ id: "index", label: "Index",
        content: <IndexTable data={indexData?.idioms ?? []} columns={COLUMNS} /> }}
      sections={sections} bookLabel="Unified Idioms"
      bookHref="/general-english/idioms" accentColor="#b45309" />
  );
}
