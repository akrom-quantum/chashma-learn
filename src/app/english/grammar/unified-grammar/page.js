import BookContentsClient from "./BookContentsClient";

export default async function BookContentsPage({ params }) {
  const { subject, book } = await params;
  return <BookContentsClient subject={subject} book={book} />;
}
