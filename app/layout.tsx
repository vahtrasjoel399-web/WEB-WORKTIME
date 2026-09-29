import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Tööaeg — tööaja arvestus ühes vaates",
  description: "Tööaja, töötajate, objektide ja aruannete haldus ühes selges rakenduses.",
  openGraph: {
    title: "Tööaeg — tööaja arvestus ühes vaates",
    description: "Tööaja, töötajate, objektide ja aruannete haldus ühes selges rakenduses.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
