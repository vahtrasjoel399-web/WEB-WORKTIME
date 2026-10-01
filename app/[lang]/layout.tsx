import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { dictionaries, isLocale, localePath, locales } from "../i18n";
import { SITE_URL } from "../site";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Light.woff2", weight: "300" },
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

type Params = Promise<{ lang: string }>;

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta, ogLocale } = dictionaries[lang];
  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: localePath(lang),
      languages: { ...Object.fromEntries(locales.map((l) => [l, localePath(l)])), "x-default": "/" },
    },
    robots: { index: true, follow: true },
    keywords: meta.keywords,
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: localePath(lang),
      locale: ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => dictionaries[l].ogLocale),
      siteName: "Tööaeg",
    },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  };
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Params }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={satoshi.variable}>
      <body>{children}</body>
    </html>
  );
}
