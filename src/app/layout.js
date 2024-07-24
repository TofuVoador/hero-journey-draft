import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hero's Journey: Draft",
  description: "Make your party to defeat the villain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" class="dark bg-dark-background text-dark-text flex justify-center">
      <body className={inter.className}>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
