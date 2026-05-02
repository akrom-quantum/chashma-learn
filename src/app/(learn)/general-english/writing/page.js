import { writingUnits } from "@/velite";
import { buildSectionsFromUnits } from "@/lib/bookUtils";
import BookOverview from "@/components/learn/BookOverview";
export const metadata = { title: "Academic Writing — Chashma Learn" };
export default function WritingOverview() {
  return <BookOverview title="Academic Writing"
    description="19 units across 7 phases — from paragraph structure to full academic essays."
    stats={["19 units", "7 phases", "B1 → C1", "Essay to Research Paper"]}
    sections={buildSectionsFromUnits(writingUnits, "general-english/writing")}
    accentColor="#7c3aed" />;
}
