import { pronunciationUnits } from "@/velite";
import { buildSectionsFromUnits } from "@/lib/bookUtils";
import BookOverview from "@/components/learn/BookOverview";
import IPAQuickReference from "@/components/pronunciation/IPAQuickReference";

export const metadata = { title: "Unified Pronunciation — Chashma Learn" };

export default function PronunciationOverview() {
  const sections = buildSectionsFromUnits(pronunciationUnits, "general-english/pronunciation");
  return (
    <BookOverview title="Unified Pronunciation"
      description="129 units covering sounds, stress, intonation and connected speech. Plus 4 appendices."
      stats={["129 units", "4 appendices", "18 sections", "A2 → C1"]}
      sections={sections} accentColor="#0891b2">
      <IPAQuickReference />
    </BookOverview>
  );
}
