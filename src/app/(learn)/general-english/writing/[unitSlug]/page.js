import { notFound } from "next/navigation";
import { writingUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS, loadUnitJson, buildSectionsFromUnits } from "@/lib/bookUtils";
import GenericUnitPage from "@/components/learn/GenericUnitPage";
import WritingPrompt from "@/components/writing/WritingPrompt";

export const generateStaticParams = async () =>
  writingUnits.map(u => ({ unitSlug: u.slug }));

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = writingUnits.find(u => u.slug === unitSlug);
  return unit ? { title: `${unit.title} — Academic Writing` } : {};
}

export default async function WritingUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = writingUnits.find(u => u.slug === unitSlug);
  if (!unit) notFound();
  const MDXContent = await getMdxComponent(unit.path);
  const exData     = await loadUnitJson(unit.path, "exercises.json");
  const promptData = await loadUnitJson(unit.path, "writing-prompt.json");
  const sections   = buildSectionsFromUnits(writingUnits, "general-english/writing");
  return (
    <GenericUnitPage unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exData?.exercises ?? []}
      extraTab={{ id: "writing-prompt", label: "Writing Prompt",
        content: <WritingPrompt prompt={promptData} /> }}
      sections={sections} bookLabel="Academic Writing"
      bookHref="/general-english/writing" accentColor="#7c3aed" />
  );
}
