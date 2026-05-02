import { notFound } from "next/navigation";
import { pronunciationUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson, buildSectionsFromUnits } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";

export const generateStaticParams = async () =>
  pronunciationUnits.map(u => ({ unitSlug: u.slug }));

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = pronunciationUnits.find(u => u.slug === unitSlug);
  return unit ? { title: `${unit.title} — Pronunciation` } : {};
}

export default async function PronunciationUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = pronunciationUnits.find(u => u.slug === unitSlug);
  if (!unit) notFound();
  const MDXContent = await getMdxComponent(unit.path);
  const exData     = await loadUnitJson(unit.path, "exercises.json");
  const sections   = buildSectionsFromUnits(pronunciationUnits, "general-english/pronunciation");
  return (
    <GenericUnitPage unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exData?.exercises ?? []}
      sections={sections} bookLabel="Unified Pronunciation"
      bookHref="/general-english/pronunciation" accentColor="#0891b2" />
  );
}
