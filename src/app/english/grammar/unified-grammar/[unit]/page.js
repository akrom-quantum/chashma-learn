import UnitClient from "./UnitClient";

export const dynamic = "force-dynamic";

export default async function UnitPage({ params }) {
  const { unit } = await params;

  return (
    <UnitClient
      subject="grammar"
      bookId="unified-grammar"
      unitId={unit}
    />
  );
}
