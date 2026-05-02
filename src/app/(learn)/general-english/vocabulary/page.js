import { vocabularyUnits } from "@/velite";
import { buildSectionsFromUnits } from "@/lib/bookUtils";
import BookOverview from "@/components/learn/BookOverview";

export const metadata = { title: "Unified Vocabulary — Chashma Learn" };

export default function VocabularyOverview() {
  const sections = buildSectionsFromUnits(vocabularyUnits, "general-english/vocabulary");
  return (
    <BookOverview
      title="Unified Vocabulary"
      description="59 thematic units covering people, work, society, language and more."
      stats={["59 units", "15 sections", "B1 → B2"]}
      sections={sections}
      accentColor="#dc2626"
    />
  );
}
