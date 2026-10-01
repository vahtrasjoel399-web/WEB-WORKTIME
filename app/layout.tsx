import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  keywords: ["tööaja arvestus", "tööaeg", "töötajate haldus", "tööaja tabel", "objektid", "aruanded"],
  title: "Tööaeg — tööaja arvestus ühes vaates",
  description: "Tööaja, töötajate, objektide ja aruannete haldus ühes selges rakenduses.",
  openGraph: {
    title: "Tööaeg — tööaja arvestus ühes vaates",
    description: "Tööaja, töötajate, objektide ja aruannete haldus ühes selges rakenduses.",
    type: "website",
    url: "/",
    locale: "et_EE",
    siteName: "Tööaeg",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="et" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
