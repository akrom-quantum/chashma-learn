import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Chashma Learn",
  description: "Master English. Ace your exams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
