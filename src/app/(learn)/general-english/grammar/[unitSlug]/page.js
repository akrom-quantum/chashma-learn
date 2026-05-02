import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { grammarUnits } from "@/velite";
import { getMdxComponent } from "@/lib/mdxUtils";
import { MDX_COMPONENTS } from "@/lib/bookUtils";
import UnitPage from "./UnitPage";

export async function generateStaticParams() {
  return grammarUnits.map((u) => ({ unitSlug: u.slug }));
}

export async function generateMetadata({ params }) {
  const { unitSlug } = await params;
  const unit = grammarUnits.find((u) => u.slug === unitSlug);
  if (!unit) return {};
  return { title: `${unit.title} — Grammar` };
}

export default async function GrammarUnitPage({ params }) {
  const { unitSlug } = await params;
  const unit = grammarUnits.find((u) => u.slug === unitSlug);
  if (!unit) notFound();

  const MDXContent = await getMdxComponent(unit.path);

  let exercises = [];
  try {
    const exFile = path.join(process.cwd(), "src/content", unit.path.replace("/lesson", "/exercises.json"));
    exercises = JSON.parse(await readFile(exFile, "utf-8")).exercises ?? [];
  } catch { /* no exercises */ }

  return (
    <UnitPage
      unit={unit}
      topicContent={<MDXContent components={MDX_COMPONENTS} />}
      exercises={exercises}
      allUnits={grammarUnits}
    />
  );
}
