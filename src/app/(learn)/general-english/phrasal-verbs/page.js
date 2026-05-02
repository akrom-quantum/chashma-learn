import { phrasalVerbUnits } from "@/velite";
import { buildSectionsFromUnits } from "@/lib/bookUtils";
import BookOverview from "@/components/learn/BookOverview";
export const metadata = { title: "Unified Phrasal Verbs — Chashma Learn" };
export default function PhrasalVerbsOverview() {
  return <BookOverview title="Unified Phrasal Verbs"
    description="88 units covering particles, key verbs, concepts, functions and registers."
    stats={["88 units", "9 sections", "B1 → B2"]}
    sections={buildSectionsFromUnits(phrasalVerbUnits, "general-english/phrasal-verbs")}
    accentColor="#16a34a" />;
}
