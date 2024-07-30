import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Head from "next/head"; // Import Head component from next/head

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Heroes' Journey: Draft",
  description: "Make your party to defeat the villain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
