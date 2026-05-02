import { notFound } from "next/navigation";
import { phrasalVerbUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson, buildSectionsFromUnits } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";
import IndexTable from "@/components/learn/IndexTable";

const COLUMNS = [
  { key: "verb",       label: "Phrasal Verb", width: "22%" },
  { key: "definition", label: "Definition"               },
  { key: "register",   label: "Register",     width: "14%" },
  { key: "example",    label: "Example",      italic: true },
];

export const generateStaticParams = async () =>
  phrasalVerbUnits.map(u => ({ unitSlug: u.slug }));

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = phrasalVerbUnits.find(u => u.slug === unitSlug);
  return unit ? { title: `${unit.title} — Phrasal Verbs` } : {};
}

export default async function PhrasalVerbUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = phrasalVerbUnits.find(u => u.slug === unitSlug);
  if (!unit) notFound();
  const MDXContent = await getMdxComponent(unit.path);
  const exData     = await loadUnitJson(unit.path, "exercises.json");
  const indexData  = await loadUnitJson(unit.path, "phrasal-verbs-index.json");
  const sections   = buildSectionsFromUnits(phrasalVerbUnits, "general-english/phrasal-verbs");
  return (
    <GenericUnitPage unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exData?.exercises ?? []}
      extraTab={{ id: "index", label: "Index",
        content: <IndexTable data={indexData?.phrasalVerbs ?? []} columns={COLUMNS} filterKey="register" /> }}
      sections={sections} bookLabel="Unified Phrasal Verbs"
      bookHref="/general-english/phrasal-verbs" accentColor="#16a34a" />
  );
}
