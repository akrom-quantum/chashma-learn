import UnitClient from "./UnitClient";

export default async function UnitPage({ params }) {
  const { subject, book, unit } = await params;
  return <UnitClient subject={subject} book={book} unitId={unit} />;
}
