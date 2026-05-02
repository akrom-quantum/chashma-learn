import { collocationUnits } from "@/velite";
import { buildSectionsFromUnits } from "@/lib/bookUtils";
import BookOverview from "@/components/learn/BookOverview";
export const metadata = { title: "Unified Collocations — Chashma Learn" };
export default function CollocationsOverview() {
  return <BookOverview title="Unified Collocations"
    description="55 units from high-frequency word pairs to academic register."
    stats={["55 units", "9 sections", "B1 → B2"]}
    sections={buildSectionsFromUnits(collocationUnits, "general-english/collocations")}
    accentColor="#d97706" />;
}
