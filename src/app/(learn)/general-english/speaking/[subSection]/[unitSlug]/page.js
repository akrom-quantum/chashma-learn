import { notFound } from "next/navigation";
import { speakingUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";
import DialogueRenderer from "@/components/speaking/DialogueRenderer";

export async function generateStaticParams() {
  return speakingUnits.map(u => ({ subSection: u.subSection, unitSlug: u.slug }));
}

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = speakingUnits.find(u => u.slug === unitSlug);
  return unit ? { title: `${unit.title} — Speaking` } : {};
}

export default async function SpeakingUnitPage({ params }) {
  const { subSection, unitSlug } = await params;
  const unit = speakingUnits.find(u => u.slug === unitSlug && u.subSection === subSection);
  if (!unit) notFound();

  const MDXContent = await getMdxComponent(unit.path);
  const exData     = await loadUnitJson(unit.path, "exercises.json");

  const subLabel = subSection === "social-expressions" ? "Social Expressions" : "Everyday Idioms";
  const siblings = speakingUnits
    .filter(u => u.subSection === subSection)
    .sort((a,b) => a.unit - b.unit);

  const sections = [{
    id: subSection,
    label: subLabel,
    units: siblings.map(u => ({
      id: u.slug, label: u.title,
      href: `/general-english/speaking/${subSection}/${u.slug}`,
    })),
  }];

  return (
    <GenericUnitPage unit={unit}
      topicContent={<MDXContent components={{ ...MDX_COMPONENTS, DialogueRenderer }} />}
      exercises={exData?.exercises ?? []}
      sections={sections} bookLabel="Speaking"
      bookHref="/general-english/speaking" accentColor="#0284c7" />
  );
}
