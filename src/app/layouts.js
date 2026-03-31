import "./globals.css";

export const metadata = {
  title: "Chashma Learn",
  description: "Master English. Ace your exams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
