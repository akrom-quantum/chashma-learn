import UnitClient from "./UnitClient";

export default function UnitPage({ params }) {
  return (
    <UnitClient
      subject={params.subject}
      book={params.book}
      unitId={params.unit}
    />
  );
}
