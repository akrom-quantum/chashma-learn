import { notFound } from "next/navigation";
import { collocationUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson, buildSectionsFromUnits } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";
import IndexTable from "@/components/learn/IndexTable";

const COLUMNS = [
  { key: "collocation", label: "Collocation", width: "30%" },
  { key: "type",        label: "Type",        width: "15%" },
  { key: "example",     label: "Example",     italic: true },
];

export const generateStaticParams = async () =>
  collocationUnits.map(u => ({ unitSlug: u.slug }));

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = collocationUnits.find(u => u.slug === unitSlug);
  return unit ? { title: `${unit.title} — Collocations` } : {};
}

export default async function CollocationUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = collocationUnits.find(u => u.slug === unitSlug);
  if (!unit) notFound();
  const MDXContent = await getMdxComponent(unit.path);
  const exData     = await loadUnitJson(unit.path, "exercises.json");
  const indexData  = await loadUnitJson(unit.path, "collocations-index.json");
  const sections   = buildSectionsFromUnits(collocationUnits, "general-english/collocations");
  return (
    <GenericUnitPage unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exData?.exercises ?? []}
      extraTab={{ id: "index", label: "Index",
        content: <IndexTable data={indexData?.collocations ?? []} columns={COLUMNS} filterKey="type" /> }}
      sections={sections} bookLabel="Unified Collocations"
      bookHref="/general-english/collocations" accentColor="#d97706" />
  );
}
