import { idiomUnits } from "@/velite";
import { buildSectionsFromUnits } from "@/lib/bookUtils";
import BookOverview from "@/components/learn/BookOverview";
export const metadata = { title: "Unified Idioms — Chashma Learn" };
export default function IdiomsOverview() {
  return <BookOverview title="Unified Idioms"
    description="88 units across 20 thematic parts — from emotions to classical references."
    stats={["88 units", "20 parts", "B1 → C1"]}
    sections={buildSectionsFromUnits(idiomUnits, "general-english/idioms")}
    accentColor="#b45309" />;
}
