import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL } from "./site";

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Light.woff2", weight: "300" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="et" className={satoshi.variable}>
      <body>{children}</body>
    </html>
  );
}
