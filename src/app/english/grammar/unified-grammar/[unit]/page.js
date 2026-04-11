import UnitClient from "./UnitClient";

export const dynamic = "force-dynamic";

export default async function UnitPage({ params }) {
  const { subject, book, unit } = await params;

  return (
    <UnitClient
      subject={subject}
      bookId={book}
      unitId={unit}
    />
  );
}
